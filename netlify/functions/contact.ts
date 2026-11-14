import type { Config } from "@netlify/functions";
import { Resend } from "resend";

import {
  CONTACT_EMAIL_FALLBACK,
  CONTACT_RECAPTCHA_ACTION,
  validateContactForm,
} from "../../src/lib/contact";

type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  recaptchaToken?: unknown;
};

const json = (body: unknown, status = 200) =>
  Response.json(body, { status });

const getClientIp = (request: Request): string | undefined => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return (
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-real-ip") ??
    undefined
  );
};

const verifyRecaptcha = async (
  token: string,
  remoteIp?: string,
): Promise<{ ok: true } | { ok: false; status: number; error: string }> => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("RECAPTCHA_SECRET_KEY is not set.");
    return {
      ok: false,
      status: 500,
      error: "Server configuration error.",
    };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  let data: RecaptchaVerifyResponse;
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );
    data = (await response.json()) as RecaptchaVerifyResponse;
  } catch (error) {
    console.error("reCAPTCHA verification request failed:", error);
    return {
      ok: false,
      status: 502,
      error: "Unable to verify reCAPTCHA. Please try again.",
    };
  }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");
  const score = data.score ?? 0;

  if (
    !data.success ||
    data.action !== CONTACT_RECAPTCHA_ACTION ||
    Number.isNaN(minScore) ||
    score < minScore
  ) {
    console.error("reCAPTCHA verification failed:", {
      success: data.success,
      action: data.action,
      errorCodes: data["error-codes"],
    });
    return {
      ok: false,
      status: 403,
      error: "reCAPTCHA verification failed. Please try again.",
    };
  }

  return { ok: true };
};

export default async (request: Request) => {
  let payload: ContactRequestBody;
  try {
    payload = (await request.json()) as ContactRequestBody;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const name = typeof payload.name === "string" ? payload.name : "";
  const email = typeof payload.email === "string" ? payload.email : "";
  const message = typeof payload.message === "string" ? payload.message : "";
  const recaptchaToken =
    typeof payload.recaptchaToken === "string" ? payload.recaptchaToken : "";

  if (!recaptchaToken) {
    return json({ error: "reCAPTCHA token is missing." }, 400);
  }

  const validationError = validateContactForm({ name, email, message });
  if (validationError) {
    return json({ error: validationError }, 400);
  }

  const recaptchaResult = await verifyRecaptcha(
    recaptchaToken,
    getClientIp(request),
  );
  if (!recaptchaResult.ok) {
    return json(
      { error: recaptchaResult.error },
      recaptchaResult.status,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  let from = process.env.RESEND_FROM_EMAIL || "Mubarek Portfolio <onboarding@resend.dev>";
  // Resend rejects unverified sender domains like @gmail.com on the API level
  if (from.includes("@gmail.com") || from.includes("example.com")) {
    from = "Mubarek Portfolio <onboarding@resend.dev>";
  }

  const adminEmail = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL_FALLBACK;

  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable.");
    return json({ error: "Server configuration error." }, 500);
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  try {
    const resend = new Resend(apiKey);

    // 1. Send the notification to the site owner (Mubarek)
    const { error: adminError } = await resend.emails.send({
      from,
      to: adminEmail,
      replyTo: trimmedEmail,
      subject: `New Message from ${trimmedName} (Portfolio)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #050816; color: #ffffff; border-radius: 12px; border: 1px solid #1f293d;">
          <h2 style="color: #915eff; margin-top: 0;">New Contact Form Message</h2>
          <hr style="border: 0; border-top: 1px solid #232631; margin: 16px 0;" />
          <p style="font-size: 16px; margin: 8px 0;"><strong>Sender Name:</strong> ${trimmedName}</p>
          <p style="font-size: 16px; margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${trimmedEmail}" style="color: #915eff;">${trimmedEmail}</a></p>
          <div style="margin-top: 20px;">
            <p style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">Message:</p>
            <div style="background: #151030; padding: 16px; border-radius: 8px; color: #f3f3f3; white-space: pre-wrap; line-height: 1.6; border-left: 4px solid #915eff;">
              ${trimmedMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </div>
          </div>
          <hr style="border: 0; border-top: 1px solid #232631; margin: 24px 0 16px 0;" />
          <p style="font-size: 12px; color: #aaa6c3; margin: 0;">
            You can directly click <strong>Reply</strong> in your email client to respond to ${trimmedName}.
          </p>
        </div>
      `,
    });

    if (adminError) {
      console.error("Resend send failed:", adminError);
      return json(
        { error: "Failed to send message. Please try again." },
        502,
      );
    }

    // 2. Optional: If a custom verified domain is used, send a thank you confirmation to the visitor
    if (!from.includes("onboarding@resend.dev")) {
      try {
        await resend.emails.send({
          from,
          to: trimmedEmail,
          replyTo: adminEmail,
          subject: "Thank you for reaching out!",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #050816; color: #ffffff; border-radius: 12px;">
              <h2 style="color: #915eff; margin-top: 0;">Hi ${trimmedName},</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #f3f3f3;">
                Thank you for getting in touch! I have received your message and will get back to you as soon as possible.
              </p>
              <div style="background: #151030; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #915eff;">
                <p style="margin: 0; font-size: 14px; color: #aaa6c3;"><strong>Your Message:</strong></p>
                <p style="margin: 8px 0 0 0; color: #f3f3f3; white-space: pre-wrap;">${trimmedMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
              </div>
              <p style="font-size: 14px; color: #aaa6c3; margin-top: 24px;">
                Best regards,<br />
                <strong style="color: #ffffff;">Mubarek Ali</strong>
              </p>
            </div>
          `,
        });
      } catch (visitorMailError) {
        // Log but don't fail the request since the owner already received the message
        console.warn("Could not send visitor confirmation receipt:", visitorMailError);
      }
    }
  } catch (error) {
    console.error("Unexpected error while sending email:", error);
    return json(
      { error: "Failed to send message. Please try again." },
      500,
    );
  }

  return json({ ok: true });
};

export const config: Config = {
  path: "/api/contact",
  method: "POST",
};
