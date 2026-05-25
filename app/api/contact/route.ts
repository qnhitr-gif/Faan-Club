import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL) {
    console.error('Contact form: RESEND_API_KEY or NOTIFY_EMAIL not set');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: 'Faan Club <onboarding@resend.dev>',
    to: process.env.NOTIFY_EMAIL,
    replyTo: email,
    subject: subject ? `Contact: ${subject}` : `Contact from ${name}`,
    text: [
      `From: ${name} <${email}>`,
      `Subject: ${subject || '—'}`,
      ``,
      `Message:`,
      message,
    ].join('\n'),
  });

  if (error) {
    console.error('Resend error (contact):', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
