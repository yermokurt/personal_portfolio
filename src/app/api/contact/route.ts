import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import disposableDomains from "disposable-email-domains";

// Input validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

// Initialize Upstash Rate Limiting if credentials exist
let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"), // 5 requests per 10 minutes sliding window
      analytics: true,
      prefix: "@upstash/ratelimit/portfolio-contact",
    });
  } catch (err) {
    // Sanitized logging: do not log raw exceptions containing potential endpoint details
    console.error("[Contact API] Error initializing Upstash Redis connection.");
  }
} else {
  console.warn("[Contact API] Upstash Redis credentials not supplied. Skipping rate limiting.");
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting check
    const ip = (request as any).ip || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    if (ratelimit) {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        console.warn(`[Contact API] Rate limit triggered for client IP: ${ip}`); // sanitized server log
        return NextResponse.json(
          { success: false, message: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    }

    // 2. Parse and validate body parameters using Zod
    const body = await request.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const errorMsg = result.error.issues[0]?.message || "Validation failed.";
      return NextResponse.json(
        { success: false, message: errorMsg },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // 3. Disposable Domain reputation check
    const emailDomain = email.split("@")[1]?.toLowerCase();
    if (emailDomain && disposableDomains.includes(emailDomain)) {
      console.warn(`[Contact API] Blocked disposable domain registration attempt: ${emailDomain}`);
      return NextResponse.json(
        { success: false, message: "Temporary email addresses are not allowed." },
        { status: 400 }
      );
    }

    // 4. Secure email dispatch (Resend API)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      // Graceful fallback for local development or manual test setups
      console.info(`[Contact API] [SIMULATED] Dispatch successful to yermokurt8@gmail.com.
Name: ${name}
Email: ${email}
Subject: "${subject}"
Message: "${message}"`);
      return NextResponse.json({
        success: true,
        message: "Message sent successfully! (Simulation Mode)",
      });
    }

    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // default sender for Resend onboarding key
      to: "yermokurt8@gmail.com",
      subject: `New Portfolio Message: ${subject}`,
      text: `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    if (error) {
      console.error("[Contact API] Resend payload error:", error.message);
      return NextResponse.json(
        { success: false, message: "Email dispatch failed. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! Thank you.",
    });

  } catch (error: any) {
    // Sanitized server logging: never dump keys, connection URLs, or full stack traces back to client
    console.error("[Contact API] Safe Error: Failed to process contact request.", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
