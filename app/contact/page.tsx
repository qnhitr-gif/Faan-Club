'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 13px',
    border: '1px solid rgba(28,74,42,0.12)',
    borderRadius: 7,
    fontSize: 14,
    fontFamily: 'inherit',
    color: 'var(--text-primary)',
    background: '#faf7ee',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: 'var(--text-tertiary)',
    marginBottom: 6,
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 40px 100px' }}>

        {/* ── Header ── */}
        <header style={{ paddingTop: 64, paddingBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-green-text)' }}>
              Get in touch
            </span>
            <div style={{ height: 1, width: 40, background: '#c8d8c9', flexShrink: 0 }} />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--text-heading)',
              marginBottom: 16,
            }}
          >
            Say{' '}
            <em style={{ color: 'var(--accent-green-deep)', fontStyle: 'italic' }}>hello.</em>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 20,
              lineHeight: 1.65,
              color: 'var(--text-primary)',
              maxWidth: 680,
            }}
          >
            This site is a one-person project. If something helped you learn,
            something's wrong, or you just want to talk mahjong — drop a note.
            I&apos;d love to hear from you.
          </p>
        </header>

        {/* ── Form ── */}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          {/* Name + Email */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Your name</label>
              <input type="text" placeholder="First and last name" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Your email</label>
              <input type="email" placeholder="you@example.com" style={inputStyle} />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label style={labelStyle}>Subject</label>
            <input type="text" placeholder="What's this about?" style={inputStyle} />
          </div>

          {/* Message */}
          <div>
            <label style={labelStyle}>Message</label>
            <textarea
              placeholder="Your message…"
              rows={5}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Submit row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16 }}>
            {submitted && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#235836" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontSize: 13, color: 'var(--accent-green-deep)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                  Sent — talk soon 🙂
                </span>
              </div>
            )}
            <button
              type="submit"
              disabled={submitted}
              style={{
                padding: '10px 24px',
                borderRadius: 7,
                fontSize: 14,
                fontWeight: 500,
                cursor: submitted ? 'default' : 'pointer',
                background: submitted ? '#C8D8C9' : '#235836',
                border: 'none',
                color: submitted ? '#6A8F72' : '#ffffff',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              Send message
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
