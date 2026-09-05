"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";

type ContactFormValues = ContactFormData;
type ContactField = keyof ContactFormValues;

const contactFields: ContactField[] = ["name", "email", "subject", "message"];
const emptyValues: ContactFormValues = { name: "", email: "", subject: "", message: "" };
const contactDraftStore = (() => {
  let draft: ContactFormValues = { ...emptyValues };
  return {
    read: () => ({ ...draft }),
    update: (field: ContactField, value: string) => {
      draft = { ...draft, [field]: value };
    },
    clear: () => {
      draft = { ...emptyValues };
    },
  };
})();

type Feedback = {
  type: "idle" | "success" | "error";
  message: string;
};

export default function ContactApp() {
  const [feedback, setFeedback] = useState<Feedback>({ type: "idle", message: "" });
  const requestController = useRef<AbortController | null>(null);
  const requestId = useRef(0);
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ defaultValues: contactDraftStore.read() });

  useEffect(
    () => () => {
      requestId.current += 1;
      requestController.current?.abort();
    },
    [],
  );

  const clearFeedback = () => {
    if (feedback.type !== "idle") setFeedback({ type: "idle", message: "" });
  };

  const saveDraft = (field: ContactField) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      contactDraftStore.update(field, event.target.value);
      clearFeedback();
    };

  const submitContact = async (values: ContactFormValues) => {
    clearErrors();
    setFeedback({ type: "idle", message: "" });

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && contactFields.includes(field as ContactField)) {
          setError(field as ContactField, { type: "validation", message: issue.message });
        }
      }

      const firstInvalidField = contactFields.find((field) =>
        parsed.error.issues.some((issue) => issue.path[0] === field),
      );
      if (firstInvalidField) window.requestAnimationFrame(() => setFocus(firstInvalidField));
      return;
    }

    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    const currentRequestId = ++requestId.current;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: controller.signal,
      });
      const body = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (currentRequestId !== requestId.current) return;
      if (!response.ok || !body?.success) {
        setFeedback({
          type: "error",
          message: body?.message ?? "Your message could not be sent. Please try again.",
        });
        return;
      }

      contactDraftStore.clear();
      reset(emptyValues);
      setFeedback({
        type: "success",
        message: body.message ?? "Your message was sent successfully.",
      });
    } catch (error) {
      if (currentRequestId !== requestId.current || (error instanceof DOMException && error.name === "AbortError")) {
        return;
      }
      setFeedback({
        type: "error",
        message: "The contact service is unavailable. Please try again.",
      });
    }
  };

  return (
    <section className="os-app os-contact-app" aria-labelledby="os-contact-title">
      <div className="os-content-frame os-contact-frame"><header className="os-app-header">
        <div>
          <p className="os-eyebrow">Start a conversation</p>
          <h1 id="os-contact-title">Contact</h1>
          <p className="os-app-intro">
            Share what you’re building, the problem you need to solve, and how Kurt can help.
          </p>
        </div>
      </header>

      <form
        className="os-contact-form"
        onSubmit={(event) => {
          void handleSubmit((values) => submitContact(values))(event);
        }}
        noValidate
      >
        <div className="os-form-grid">
          <div className="os-field">
            <label htmlFor="os-contact-name">Name</label>
            <input
              id="os-contact-name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "os-contact-name-error" : undefined}
              {...register("name", { onChange: saveDraft("name") })}
            />
            {errors.name ? <p id="os-contact-name-error" className="os-field-error">{errors.name.message}</p> : null}
          </div>

          <div className="os-field">
            <label htmlFor="os-contact-email">Email</label>
            <input
              id="os-contact-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={254}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "os-contact-email-error" : undefined}
              {...register("email", { onChange: saveDraft("email") })}
            />
            {errors.email ? <p id="os-contact-email-error" className="os-field-error">{errors.email.message}</p> : null}
          </div>
        </div>

        <div className="os-field">
          <label htmlFor="os-contact-subject">Subject</label>
          <input
            id="os-contact-subject"
            type="text"
            required
            maxLength={150}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "os-contact-subject-error" : undefined}
            {...register("subject", { onChange: saveDraft("subject") })}
          />
          {errors.subject ? <p id="os-contact-subject-error" className="os-field-error">{errors.subject.message}</p> : null}
        </div>

        <div className="os-field">
          <label htmlFor="os-contact-message">Message</label>
          <textarea
            id="os-contact-message"
            rows={7}
            required
            maxLength={5000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "os-contact-message-error" : undefined}
            {...register("message", { onChange: saveDraft("message") })}
          />
          {errors.message ? <p id="os-contact-message-error" className="os-field-error">{errors.message.message}</p> : null}
        </div>

        <div className="os-form-footer">
          <button className="os-button os-button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send message"}
          </button>
          <p
            className={`os-form-feedback os-form-feedback-${feedback.type}`}
            role={feedback.type === "error" ? "alert" : "status"}
            aria-live={feedback.type === "error" ? "assertive" : "polite"}
          >
            {feedback.message}
          </p>
        </div>
      </form></div>
    </section>
  );
}
