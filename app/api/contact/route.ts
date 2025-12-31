import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  organization: z.string().max(160).optional().nullable(),
  email: z.string().email(),
  topic: z.string().max(160).optional().nullable(),
  message: z.string().min(10).max(4000)
});

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX = 5; // per window
const rateLimitMap = new Map<string, number[]>();

function getIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entries = rateLimitMap.get(ip) || [];
  const recent = entries.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

async function sendMail(to: string, subject: string, text: string) {
  const transport = nodemailer.createTransport({
    host: requireEnv("SMTP_HOST"),
    port: Number(requireEnv("SMTP_PORT")),
    secure: false,
    auth: {
      user: requireEnv("SMTP_USER"),
      pass: requireEnv("SMTP_PASS")
    }
  });

  const from = requireEnv("CONTACT_FROM");
  const mailOptions = { from, to, subject, text };

  const attempts = 3;
  for (let i = 1; i <= attempts; i++) {
    try {
      await transport.sendMail(mailOptions);
      return;
    } catch (error) {
      if (i === attempts) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 300 * i));
    }
  }
}

export async function POST(request: Request) {
  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }

  const { name, organization, email, topic, message } = parsed.data;
  const adminTo = process.env.CONTACT_TO || process.env.CONTACT_FROM;

  if (!adminTo) {
    return NextResponse.json({ error: "Intake configuration missing." }, { status: 500 });
  }

  const summary = [
    `Name: ${name}`,
    `Email: ${email}`,
    organization ? `Organization: ${organization}` : null,
    topic ? `Topic: ${topic}` : null,
    "",
    message
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await sendMail(adminTo, `New inquiry: ${topic || "Contact form"}`, summary);

    if (process.env.CONTACT_WEBHOOK_URL) {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip, name, organization, email, topic, message })
      });
    }

    // Confirmation email (best effort)
    try {
      await sendMail(
        email,
        "We received your inquiry",
        "Thank you for reaching out to the Fregenet Foundation. We have received your message and will reply within three business days."
      );
    } catch (err) {
      console.warn("[contact confirmation email failed]", err);
    }

    console.info("[contact inquiry]", { ip, name, organization, email, topic });
    return NextResponse.json({ ok: true, message: "Received. We will reply within three business days." });
  } catch (error) {
    console.error("[contact inquiry error]", error);
    return NextResponse.json({ error: "Unable to submit inquiry right now." }, { status: 500 });
  }
}
