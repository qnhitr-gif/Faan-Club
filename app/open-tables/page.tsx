'use client';

import { useEffect, useState } from 'react';
import { BOROUGHS, STYLE_META, type Borough, type Club } from '@/lib/clubs';
import { createClient } from '@/lib/supabase/client';
import { VIBE_TAGS, saveVibeTags, loadMyClubVibes, loadBoroughVibes, aggregateVibes } from '@/lib/vibeTags';

// ── tokens ────────────────────────────────────────────────────────────────────
const T = {
  green900: '#2a5c3e',             // active borough button bg
  green800: '#1c4a2a',             // button borders
  green700: '#235836',             // button backgrounds (always green)
  green700t: 'var(--accent-green-deep)',  // green as text colour (dark-mode aware)
  green800t: 'var(--accent-green-text)',  // green as text colour (dark-mode aware)
  green200: '#c8d8c9',
  green100: '#dde6d6',
  green50:  '#eef0e2',
  paper:    'var(--bg)',
  paper2:   'var(--bg-card)',
  paperW:   'var(--bg-elev)',
  ink:      'var(--text-heading)',
  ink2:     'var(--text-primary)',
  ink3:     'var(--text-tertiary)',
  red:      '#b8302a',
};


// ── Style pill ────────────────────────────────────────────────────────────────
function StylePill({ style }: { style: 'hk' | 'riichi' | 'american' }) {
  const m = STYLE_META[style];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 4,
      fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
      fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
      background: m.bg, color: m.text,
      border: `1px solid ${m.color}22`,
    }}>
      {m.label}
    </span>
  );
}

// ── Club row ──────────────────────────────────────────────────────────────────
function ClubRow({ club, index, userId, borough, vibes, onVibeSaved }: { club: Club; index: number; userId: string | null; borough: Borough; vibes: { tag: string; count: number }[]; onVibeSaved: () => void }) {
  const [editOpen, setEditOpen] = useState(false);
  const [editSubmitted, setEditSubmitted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const [vibeOpen, setVibeOpen]       = useState(false);
  const [selected, setSelected]       = useState<Set<string>>(new Set());
  const [loadingVibes, setLoadingVibes] = useState(false);
  const [saving, setSaving]           = useState(false);
  const [vibeSaved, setVibeSaved]     = useState(false);

  async function openVibes() {
    if (!userId) return;
    setVibeOpen(true);
    setLoadingVibes(true);
    const existing = await loadMyClubVibes(userId, club.name, borough);
    setSelected(new Set(existing));
    setLoadingVibes(false);
  }

  function toggleTag(tag: string) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  async function saveVibes() {
    if (!userId) return;
    setSaving(true);
    await saveVibeTags(userId, club.name, borough, Array.from(selected));
    setSaving(false);
    setVibeSaved(true);
    onVibeSaved();
    setTimeout(() => { setVibeOpen(false); setVibeSaved(false); }, 1800);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '8px 11px', border: `1.5px solid ${T.green200}`,
    borderRadius: 6, fontSize: 13, fontFamily: 'inherit',
    color: T.ink, background: T.paperW,
  };

  async function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const updateNote = (form.querySelector('textarea') as HTMLTextAreaElement)?.value ?? '';
    const emailInput = (form.querySelector('input[type="email"]') as HTMLInputElement)?.value ?? '';
    await fetch('/api/edit-club', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clubName: club.name, updateNote, yourEmail: emailInput }),
    });
    setEditSubmitted(true);
    setTimeout(() => { setEditOpen(false); setEditSubmitted(false); }, 3500);
  }

  return (
    <div
      style={{
        borderTop: `1px solid var(--border-tertiary)`,
        padding: '20px 8px',
        transition: 'background 0.15s',
        position: 'relative',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(28,74,42,0.04)'; setHovered(true); }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; setHovered(false); }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>

        {/* Index + style pills */}
        <div style={{
          width: 36, flexShrink: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', gap: 8,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 16,
            color: T.ink3, letterSpacing: '0.05em',
            userSelect: 'none',
          }}>
            {index + 1}
          </span>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Name row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
            <span style={{
              fontFamily: 'var(--font-serif)', fontSize: 20,
              fontStyle: 'italic', fontWeight: 500,
              color: T.green700t, lineHeight: 1.2,
            }}>
              {club.name}
            </span>
            {club.styles.map(s => <StylePill key={s} style={s} />)}
          </div>

          {/* Metadata */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: T.ink3, letterSpacing: '0.05em',
            marginBottom: 8,
          }}>
            {club.loc}
            {club.price && <span style={{ color: T.green700t }}> · {club.price}</span>}
          </div>

          {/* Description */}
          <p style={{
            fontSize: 16, lineHeight: 1.7,
            color: T.ink2, margin: 0,
            fontFamily: 'var(--font-serif)',
          }}>
            {club.desc}
          </p>

          {/* Community vibe tags + Vibe button — revealed on hover */}
          {(vibes.length > 0 || userId) && !vibeOpen && (
            <div style={{
              overflow: 'hidden',
              maxHeight: hovered ? 80 : 0,
              opacity: hovered ? 1 : 0,
              marginTop: hovered ? 12 : 0,
              transition: 'max-height 0.22s ease, opacity 0.18s ease, margin-top 0.22s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                {vibes.slice(0, 4).map(({ tag, count }) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '3px 10px', borderRadius: 20,
                      background: 'rgba(28,74,42,0.06)',
                      border: `1px solid ${T.green200}`,
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      letterSpacing: '0.05em', color: T.green700t,
                    }}
                  >
                    {tag}
                    <span style={{ color: T.ink3, fontSize: 9 }}>· {count}</span>
                  </span>
                ))}
                {userId && (
                  <button
                    onClick={openVibes}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '3px 10px', borderRadius: 20, cursor: 'pointer',
                      border: `1px dashed ${T.green200}`,
                      background: 'transparent',
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      letterSpacing: '0.05em', color: T.ink3,
                      transition: 'all 0.12s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = T.green700t; e.currentTarget.style.borderColor = T.green700; }}
                    onMouseLeave={e => { e.currentTarget.style.color = T.ink3; e.currentTarget.style.borderColor = T.green200; }}
                  >
                    <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Vibe
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{
          flexShrink: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'flex-end',
          gap: 8, minWidth: 140,
        }}>
          {/* Session note */}
          {club.session && (
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: T.green700t, background: T.green50,
              padding: '3px 8px', borderRadius: 4,
              border: `1px solid ${T.green200}`,
            }}>
              {club.session}
            </div>
          )}

          {/* Instagram pill */}
          {club.insta && (
            <a
              href={`https://instagram.com/${club.insta}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: T.ink3, textDecoration: 'none',
                padding: '3px 8px', borderRadius: 4,
                border: `1px solid ${T.green200}`,
                background: T.paperW,
                letterSpacing: '0.04em',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = T.green700t; e.currentTarget.style.borderColor = T.green700; }}
              onMouseLeave={e => { e.currentTarget.style.color = T.ink3; e.currentTarget.style.borderColor = T.green200; }}
            >
              <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @{club.insta}
            </a>
          )}

        </div>
      </div>

      {/* Pencil — bottom-right on hover */}
      {!editOpen && !vibeOpen && (
        <button
          onClick={() => setEditOpen(true)}
          title="Request to edit"
          style={{
            position: 'absolute', bottom: 16, right: 8,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, border: 'none',
            background: 'transparent', cursor: 'pointer', color: T.ink3,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = T.green700t; }}
          onMouseLeave={e => { e.currentTarget.style.color = T.ink3; }}
        >
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      )}

      {/* Inline vibe picker */}
      {vibeOpen && (
        <div style={{ marginTop: 16, paddingLeft: 48 }}>
          {vibeSaved ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={T.green700t} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span style={{ fontSize: 13, color: T.green700t, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Vibes saved.</span>
            </div>
          ) : (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink3, marginBottom: 12 }}>
                How would you describe this table?
              </div>
              {loadingVibes ? (
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: T.ink3 }}>Loading…</div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
                  {VIBE_TAGS.map(tag => {
                    const on = selected.has(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        style={{
                          padding: '5px 12px', borderRadius: 20,
                          fontFamily: 'var(--font-mono)', fontSize: 10,
                          letterSpacing: '0.06em',
                          cursor: 'pointer',
                          border: `1px solid ${on ? T.green700 : T.green200}`,
                          background: on ? T.green700 : T.paperW,
                          color: on ? '#F5F0E3' : T.ink3,
                          transition: 'all 0.12s',
                        }}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={saveVibes}
                  disabled={saving || loadingVibes}
                  style={{
                    padding: '7px 16px', borderRadius: 6, fontSize: 12,
                    cursor: saving ? 'default' : 'pointer',
                    background: T.green700, border: 'none', color: '#fff',
                    opacity: saving ? 0.7 : 1,
                    fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                  }}
                >
                  {saving ? 'Saving…' : 'Save vibes'}
                </button>
                {selected.size > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelected(new Set())}
                    style={{ padding: '7px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', background: 'transparent', border: `1px solid ${T.green200}`, color: T.ink3 }}
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setVibeOpen(false)}
                  style={{ padding: '7px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', background: 'transparent', border: `1px solid ${T.green200}`, color: T.ink3 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Inline edit form */}
      {editOpen && (
        <div style={{ marginTop: 16, paddingLeft: 48 }}>
          {editSubmitted ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={T.green700t} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span style={{ fontSize: 13, color: T.green700t, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Thanks — we'll review and update the listing.</span>
            </div>
          ) : (
            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: T.ink3, marginBottom: 4 }}>What needs updating?</label>
                <textarea rows={2} placeholder={`e.g. ${club.name} now meets on Tuesdays…`} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: T.ink3, marginBottom: 4 }}>Your email</label>
                  <input type="email" placeholder="you@example.com" style={inputStyle} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" onClick={() => setEditOpen(false)} style={{ padding: '8px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer', background: 'transparent', border: `1.5px solid ${T.green200}`, color: T.ink3 }}>Cancel</button>
                  <button type="submit" style={{ padding: '8px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer', background: T.green700, border: 'none', color: '#fff' }}>Send</button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

// ── Submit form ───────────────────────────────────────────────────────────────
function SubmitForm({ onClose }: { onClose: () => void }) {
  const [selectedStyles, setSelectedStyles] = useState<Set<'hk' | 'riichi' | 'american'>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggleStyle(s: 'hk' | 'riichi' | 'american') {
    setSelectedStyles(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? '';
    await fetch('/api/submit-club', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        website: get('website'),
        instagram: get('instagram'),
        description: get('description'),
        location: get('location'),
        price: get('price'),
        styles: Array.from(selectedStyles),
        yourName: get('yourName'),
        yourEmail: get('yourEmail'),
        preferredContact: get('preferredContact'),
      }),
    });
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => onClose(), 3500);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '9px 12px', border: `1.5px solid ${T.green200}`,
    borderRadius: 6, fontSize: 13, fontFamily: 'inherit',
    color: T.ink, background: T.paperW,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    color: T.ink3, marginBottom: 5,
  };

  if (submitted) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 0' }}>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={T.green700t} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      <span style={{ fontSize: 14, color: T.green700t, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Thanks — we'll review and add it to the list.</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label style={labelStyle}>Website</label><input name="website" type="url" placeholder="https://yourclub.com" style={inputStyle} /></div>
        <div><label style={labelStyle}>Instagram</label><input name="instagram" type="text" placeholder="@yourhandle" style={inputStyle} /></div>
      </div>
      <div><label style={labelStyle}>Description</label><textarea name="description" rows={3} placeholder="What you play, when you meet, what the vibe is." style={{ ...inputStyle, resize: 'vertical' }} /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label style={labelStyle}>Location or neighborhood</label><input name="location" type="text" placeholder="e.g. Williamsburg or various venues" style={inputStyle} /></div>
        <div><label style={labelStyle}>Price per session</label><input name="price" type="text" placeholder="e.g. Free, $10, ticketed" style={inputStyle} /></div>
      </div>
      <div>
        <label style={labelStyle}>Mahjong style</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['hk', 'riichi', 'american'] as const).map(s => {
            const m = STYLE_META[s];
            const sel = selectedStyles.has(s);
            return (
              <button key={s} type="button" onClick={() => toggleStyle(s)} style={{
                padding: '4px 12px', borderRadius: 4, fontSize: 11,
                fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase',
                cursor: 'pointer', fontWeight: 600,
                border: `1px solid ${sel ? m.color : T.green200}`,
                background: sel ? m.bg : 'transparent',
                color: sel ? m.text : T.ink3,
              }}>{m.label}</button>
            );
          })}
        </div>
      </div>
      <div style={{ height: 1, background: T.green200 }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div><label style={labelStyle}>Your name</label><input name="yourName" type="text" placeholder="First and last name" style={inputStyle} /></div>
        <div><label style={labelStyle}>Your email</label><input name="yourEmail" type="email" placeholder="you@example.com" style={inputStyle} /></div>
        <div><label style={labelStyle}>Preferred contact</label><input name="preferredContact" type="text" placeholder="e.g. email, DM on Instagram" style={inputStyle} /></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button type="button" onClick={onClose} style={{ padding: '9px 18px', borderRadius: 6, fontSize: 13, cursor: 'pointer', background: 'transparent', border: `1.5px solid ${T.green200}`, color: T.ink3 }}>Cancel</button>
        <button type="submit" disabled={loading} style={{ padding: '9px 18px', borderRadius: 6, fontSize: 13, cursor: loading ? 'default' : 'pointer', background: T.green700, border: 'none', color: '#fff', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Sending…' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CommunityPage() {
  const [activeBorough, setActiveBorough] = useState<Borough>('manhattan');
  const [formOpen, setFormOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [communityVibes, setCommunityVibes] = useState<Record<string, { tag: string; count: number }[]>>({});
  const [allClubs, setAllClubs] = useState<Record<Borough, Club[]>>({ manhattan: [], brooklyn: [], queens: [], bronx: [], 'staten-island': [] });

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('clubs').select('*').eq('active', true).then(({ data }) => {
      if (!data) return;
      const grouped: Record<Borough, Club[]> = { manhattan: [], brooklyn: [], queens: [], bronx: [], 'staten-island': [] };
      for (const row of data) {
        const b = row.borough as Borough;
        if (grouped[b]) grouped[b].push({ name: row.name, styles: row.styles ?? [], loc: row.loc, price: row.price, desc: row.description, insta: row.insta, session: row.session });
      }
      setAllClubs(grouped);
    });
  }, []);

  useEffect(() => {
    loadBoroughVibes(activeBorough).then(rows => setCommunityVibes(aggregateVibes(rows)));
  }, [activeBorough]);

  const activeMeta = BOROUGHS.find(b => b.id === activeBorough)!;
  const clubs = allClubs[activeBorough];

  function handleBoroughClick(id: Borough) {
    setActiveBorough(id);
    setFormOpen(false);
  }

  return (
    <div style={{ background: T.paper, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px 120px' }}>

        {/* ── Page header ── */}
        <header style={{ paddingTop: 64, paddingBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: T.red, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.green800t }}>
              Community
            </span>
            <div style={{ height: 1, width: 40, background: T.green200, flexShrink: 0 }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-8 md:gap-12 items-start">
            {/* Left: title + lede */}
            <div>
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 500, lineHeight: 1.05,
                letterSpacing: '-0.02em', color: T.ink,
                marginBottom: 16,
              }}>
                Find your table{' '}
                <em style={{ color: T.green700t, fontStyle: 'italic' }}>in New York.</em>
              </h1>
              <p style={{
                fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                fontSize: 19, lineHeight: 1.65, color: T.ink2,
                maxWidth: 480,
              }}>
                Clubs and meetups across the five boroughs.
              </p>
            </div>

            {/* Right: city note */}
            <div style={{ paddingTop: 4 }}>
              <div style={{ display: 'flex', gap: 14 }}>
                {/* Thin rule */}
                <div style={{ width: 1, background: T.green200, flexShrink: 0, marginTop: 2 }} />
                {/* Content */}
                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: T.green700t, display: 'block', marginBottom: 8,
                  }}>
                    Note:
                  </span>
                  <p style={{
                    fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                    fontSize: 16, lineHeight: 1.75,
                    color: T.ink3, margin: 0,
                  }}>
                    Locations listed are for social events only. For corporate or private event inquiries, reach out to each club directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Borough rail ── */}
        <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${T.green200}` }}>
          <div className="flex min-w-max">
          {BOROUGHS.map((b, i) => {
            const count = allClubs[b.id].length;
            const isActive = b.id === activeBorough;
            // Mixed italic/roman: first word italic, rest roman
            const parts = b.label.split(' ');
            const italic = parts[0];
            const rest = parts.slice(1).join(' ');
            return (
              <button
                key={b.id}
                onClick={() => handleBoroughClick(b.id)}
                style={{
                  flex: 1,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '18px 22px 20px',
                  background: isActive ? T.green900 : T.paper,
                  border: 'none',
                  borderLeft: i > 0 ? `1px solid ${T.green200}` : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(28,74,42,0.04)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = T.paper; }}
              >
                {/* Top: index + count */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: isActive ? 'rgba(245,240,225,0.5)' : T.ink3,
                    letterSpacing: '0.08em',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {count > 0 ? (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      background: isActive ? 'rgba(245,240,225,0.15)' : T.green100,
                      color: isActive ? 'rgba(245,240,225,0.8)' : T.ink3,
                      padding: '2px 7px', borderRadius: 99,
                      letterSpacing: '0.04em',
                    }}>
                      {count} {count === 1 ? 'club' : 'clubs'}
                    </span>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isActive ? 'rgba(245,240,225,0.3)' : T.green200 }}>—</span>
                  )}
                </div>

                {/* Borough name + rail */}
                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'stretch' }}>
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(18px, 2vw, 26px)',
                    fontWeight: 400, lineHeight: 1.1,
                    color: isActive ? '#F5F0E1' : T.ink,
                  }}>
                    <em style={{ fontStyle: 'italic' }}>{italic}</em>
                    {rest && <span style={{ fontStyle: 'normal' }}>{' '}{rest}</span>}
                  </div>
                  {isActive && (
                    <div style={{
                      height: 2, background: '#F5F0E1',
                      borderRadius: 99, marginTop: 10,
                    }} />
                  )}
                </div>
              </button>
            );
          })}
          </div>
        </div>

        {/* ── Results header ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 0 20px',
          borderBottom: `1px solid ${T.green200}`,
          marginBottom: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500, color: T.ink }}>
              {activeMeta.label}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.ink3 }}>
              — {clubs.length} {clubs.length === 1 ? 'club' : 'clubs'}
            </span>
          </div>

        </div>

        {/* ── Club list ── */}
        {clubs.length > 0 ? (
          <div>
            {clubs.map((club, i) => (
              <ClubRow
                key={club.name} club={club} index={i}
                userId={userId} borough={activeBorough}
                vibes={communityVibes[club.name] ?? []}
                onVibeSaved={() => loadBoroughVibes(activeBorough).then(rows => setCommunityVibes(aggregateVibes(rows)))}
              />
            ))}
          </div>
        ) : (
          <div style={{ padding: '48px 0', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: T.ink3 }}>
            No clubs listed yet in {activeMeta.label}.
          </div>
        )}

        {/* ── Submit CTA ── */}
        <div style={{ marginTop: 48 }}>
          {!formOpen ? (
            <div style={{
              border: `1.5px dashed ${T.green200}`,
              borderRadius: 10, padding: '28px 32px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 500, color: T.ink, marginBottom: 4 }}>
                  Run a club in New York?
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.ink3, letterSpacing: '0.05em' }}>
                  Get listed — it&apos;s free and takes two minutes.
                </div>
              </div>
              <button
                onClick={() => setFormOpen(true)}
                style={{
                  padding: '9px 20px', borderRadius: 6,
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  background: T.green700, border: 'none', color: '#fff',
                  flexShrink: 0,
                }}
              >
                + Submit a club
              </button>
            </div>
          ) : (
            <div style={{
              border: `1.5px solid ${T.green200}`,
              borderRadius: 10, padding: '28px 32px',
              background: T.paperW,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.green700t }}>
                  Submit a club
                </span>
                <button onClick={() => setFormOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.ink3, fontSize: 18, lineHeight: 1 }}>×</button>
              </div>
              <SubmitForm onClose={() => setFormOpen(false)} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
