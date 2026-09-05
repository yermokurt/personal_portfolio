import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import disposableDomains from "disposable-email-domains";
import { contactSchema } from "@/lib/contact-schema";

const MAX_BODY_BYTES = 12_000;
const isProduction = process.env.NODE_ENV === "production";

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
  } catch {
    // Sanitized logging: do not log raw exceptions containing potential endpoint details
    console.error("[Contact API] Error initializing Upstash Redis connection.");
  }
} else {
  console.warn("[Contact API] Upstash Redis credentials not supplied. Skipping rate limiting.");
}

export async function POST(request: NextRequest) {
  try {
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ success: false, message: "Content type must be application/json." }, { status: 415 });
    }

    const requestOrigin = request.headers.get("origin");
    if (requestOrigin && requestOrigin !== new URL(request.url).origin) {
      return NextResponse.json({ success: false, message: "Origin is not allowed." }, { status: 403 });
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, message: "Message payload is too large." }, { status: 413 });
    }

    // 1. IP Rate Limiting check
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (ratelimit) {
      try {
        const { success } = await ratelimit.limit(ip);
        if (!success) {
          console.warn("[Contact API] Rate limit triggered.");
          return NextResponse.json(
            { success: false, message: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }
      } catch {
        console.error("[Contact API] Rate limiting check failed.");
        if (isProduction) {
          return NextResponse.json({ success: false, message: "Contact service is temporarily unavailable." }, { status: 503 });
        }
      }
    } else if (isProduction) {
      return NextResponse.json({ success: false, message: "Contact service is temporarily unavailable." }, { status: 503 });
    }

    // Parse a bounded payload before validating its fields.
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, message: "Message payload is too large." }, { status: 413 });
    }
    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ success: false, message: "Request body must contain valid JSON." }, { status: 400 });
    }
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

    // Secure email dispatch (Resend API)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      if (!isProduction && process.env.CONTACT_SIMULATION_MODE === "true") {
        console.info("[Contact API] Simulated contact dispatch.");
        return NextResponse.json({ success: true, message: "Message accepted in local simulation mode." });
      }
      return NextResponse.json({ success: false, message: "Contact service is not configured." }, { status: 503 });
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
      console.error("[Contact API] Resend rejected the contact request.");
      return NextResponse.json(
        { success: false, message: "Email dispatch failed. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! Thank you.",
    });

  } catch (error: unknown) {
    // Sanitized server logging: never dump keys, connection URLs, or full stack traces back to client
    console.error("[Contact API] Failed to process contact request.", error instanceof SyntaxError ? "invalid-json" : "unhandled");
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
