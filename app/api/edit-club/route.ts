import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { clubName, updateNote, yourEmail } = body;

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not set');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const { error } = await supabase.from('club_edit_requests').insert({
    club_name:   clubName || null,
    update_note: updateNote || null,
    your_email:  yourEmail || null,
  });

  if (error) {
    console.error('Supabase error (edit-club):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Faan Club <onboarding@resend.dev>',
      to: process.env.NOTIFY_EMAIL,
      subject: `Club edit request — ${clubName || 'Unknown'}`,
      text: [
        `Club: ${clubName || '—'}`,
        `Email: ${yourEmail || '—'}`,
        ``,
        `What needs updating:`,
        updateNote || '—',
      ].join('\n'),
    }).catch(e => console.error('Resend error (edit-club):', e));
  }

  return NextResponse.json({ ok: true });
}
