import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    website, instagram, description, location, price,
    styles, yourName, yourEmail, preferredContact,
  } = body;

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not set');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const { error } = await supabase.from('club_submissions').insert({
    website:           website || null,
    instagram:         instagram || null,
    description:       description || null,
    location:          location || null,
    price:             price || null,
    styles:            styles ?? [],
    your_name:         yourName || null,
    your_email:        yourEmail || null,
    preferred_contact: preferredContact || null,
  });

  if (error) {
    console.error('Supabase error (submit-club):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Faan Club <onboarding@resend.dev>',
      to: process.env.NOTIFY_EMAIL,
      subject: `New club submission — ${yourName || 'Anonymous'}`,
      text: [
        `Name: ${yourName || '—'}`,
        `Email: ${yourEmail || '—'}`,
        `Location: ${location || '—'}`,
        `Website: ${website || '—'}`,
        `Instagram: ${instagram || '—'}`,
        `Styles: ${(styles ?? []).join(', ') || '—'}`,
        `Price: ${price || '—'}`,
        `Preferred contact: ${preferredContact || '—'}`,
        ``,
        `Description:`,
        description || '—',
      ].join('\n'),
    }).catch(e => console.error('Resend error (submit-club):', e));
  }

  return NextResponse.json({ ok: true });
}
