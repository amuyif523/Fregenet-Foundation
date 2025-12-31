import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  organization?: string;
  email?: string;
  topic?: string;
  message?: string;
};

export async function POST(request: Request) {
  const data = (await request.json()) as Payload;
  const { name, organization, email, topic, message } = data;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const record = {
    name,
    organization,
    email,
    topic,
    message
  };

  try {
    if (process.env.CONTACT_WEBHOOK_URL) {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      });
    }
    console.info("[contact inquiry]", record);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact inquiry error]", error);
    return NextResponse.json({ error: "Unable to submit inquiry right now." }, { status: 500 });
  }
}
