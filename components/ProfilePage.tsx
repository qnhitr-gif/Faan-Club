'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { loadDailyStats, compute7DayAvg, computeStreak, migrateLegacyDrillStats } from '@/lib/drillDailyStats';
import { BOROUGHS } from '@/lib/clubs';
import { loadMyVibeTags } from '@/lib/vibeTags';

/* ── Design tokens ────────────────────────────────────────────────── */
const G8   = '#1c4a2a';
const G7   = '#235836';
const R    = '#b8302a';
const GOLD = '#b8860b';
const INK  = '#16170f';
const INK2 = '#2C2A26';
const INK3 = '#7a7a6a';
const PW   = '#fcfaf3';
const SAND = '#e8e2d4';
const FF_D = 'var(--font-display), Georgia, serif';
const FF_S = 'var(--font-serif), Georgia, serif';
const FF_M = 'var(--font-mono), monospace';

/* ── Drill configs ────────────────────────────────────────────────── */
const DRILL_CONFIGS = [
  { id: 'tile-efficiency',  name: 'Tile Efficiency',  href: '/kitchen/drills/tile-efficiency',  dailyKey: 'faan-tile-drill',   avgMetric: 'avgEfficiency' },
  { id: 'pattern-building', name: 'Pattern Building', href: '/kitchen/drills/pattern-building', dailyKey: 'faan-pattern-quiz', avgMetric: 'accuracy'      },
  { id: 'faan-calculation', name: 'Faan Calculation', href: '/kitchen/drills/fan-calculation',  dailyKey: 'faan-fan-quiz',     avgMetric: 'accuracy'      },
];

interface DrillStat { avg7: string | null; streak: number; }

const SAVED_SEATS_MOCK = [
  { name: 'Flushing Mahjong Circle', borough: 'Queens',   day: 'Saturdays' },
  { name: 'Brooklyn Tile Club',      borough: 'Brooklyn', day: 'Thursdays' },
];

function boroughLabel(id: string): string {
  return BOROUGHS.find(b => b.id === id)?.label ?? id;
}

/* ── Helpers ──────────────────────────────────────────────────────── */
function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function displayName(user: User): string {
  return (user.user_metadata?.full_name as string | undefined)
    ?? user.email?.split('@')[0]
    ?? 'Faan Player';
}

/* ── Sub-components ───────────────────────────────────────────────── */
function Avatar({ name }: { name: string }) {
  return (
    <div style={{
      width: 72, height: 72, borderRadius: '50%',
      background: G8, color: PW,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FF_D, fontSize: 26, fontWeight: 700,
      border: `3px solid ${GOLD}`, flexShrink: 0,
    }}>
      {initials(name)}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.2em', color: INK3, textTransform: 'uppercase' }}>
          {title}
        </span>
        <div style={{ flex: 1, height: 1, background: SAND }} />
      </div>
      {children}
    </div>
  );
}


function DrillCard({ config, stat }: { config: typeof DRILL_CONFIGS[0]; stat: DrillStat | null }) {
  const hasData = stat !== null && (stat.avg7 !== null || stat.streak > 0);
  return (
    <Link href={config.href} style={{ textDecoration: 'none', display: 'block' }}>
    <div style={{
      background: PW, border: '1px solid rgba(28,74,42,0.12)',
      borderRadius: 11, padding: '18px 20px', marginBottom: 10,
      transition: 'border-color 0.15s',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(28,74,42,0.3)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(28,74,42,0.12)'; }}
    >
      <div style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: INK3, marginBottom: 14 }}>
        {config.name}
      </div>
      {hasData ? (
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: FF_M, fontSize: 10, color: INK3, marginBottom: 2 }}>7-day avg</div>
            <div style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 32, color: G7, lineHeight: 1 }}>
              {stat!.avg7 ?? '—'}
            </div>
          </div>
          <div style={{ width: 1, height: 44, background: SAND, margin: '0 18px' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: FF_M, fontSize: 10, color: INK3, marginBottom: 2 }}>Streak</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, justifyContent: 'flex-end' }}>
              <div style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 32, color: GOLD, lineHeight: 1 }}>
                {stat!.streak}
              </div>
              <div style={{ fontFamily: FF_M, fontSize: 10, color: INK3 }}>
                {stat!.streak === 1 ? 'day' : 'days'}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 13, color: INK3 }}>
          No sessions yet — complete a drill to see your stats.
        </div>
      )}
    </div>
    </Link>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span style={{
      background: 'rgba(28,74,42,0.06)', color: G7,
      border: '1px solid rgba(28,74,42,0.15)', borderRadius: 20,
      padding: '3px 10px', fontSize: 11,
      fontFamily: FF_M, letterSpacing: '0.06em', whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function ClubCard({ club, showTags }: { club: { name: string; borough: string; day?: string; tags?: string[] }; showTags: boolean }) {
  return (
    <div style={{
      background: PW, border: '1px solid rgba(28,74,42,0.12)',
      borderRadius: 11, padding: '14px 18px', marginBottom: 10,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: FF_S, fontSize: 15, fontWeight: 500, color: INK }}>{club.name}</span>
        <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.1em', color: INK3 }}>{club.borough}</span>
      </div>
      {club.day && (
        <span style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 13, color: G7 }}>{club.day}</span>
      )}
      {showTags && club.tags && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {club.tags.map(t => <Tag key={t} label={t} />)}
        </div>
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div style={{ textAlign: 'center', color: INK3, fontStyle: 'italic', fontFamily: FF_S, fontSize: 14, padding: '24px 0' }}>
      {text}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '7px 11px',
  border: '1px solid rgba(28,74,42,0.2)', borderRadius: 7,
  fontFamily: FF_S, fontSize: 14,
  background: PW, color: INK,
  outline: 'none', boxSizing: 'border-box',
};

/* ── Main component ───────────────────────────────────────────────── */
export function ProfilePage({ user }: { user: User }) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(displayName(user));
  const [drillStats, setDrillStats] = useState<Record<string, DrillStat | null>>({});
  const [visitedClubs, setVisitedClubs] = useState<{ name: string; borough: string; tags: string[] }[]>([]);

  const [newEmail, setNewEmail]               = useState('');
  const [emailMsg, setEmailMsg]               = useState<{ text: string; ok: boolean } | null>(null);
  const [savingEmail, setSavingEmail]         = useState(false);

  const [newPassword, setNewPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg]         = useState<{ text: string; ok: boolean } | null>(null);
  const [savingPassword, setSavingPassword]   = useState(false);
  const [savingName, setSavingName]           = useState(false);

  const email = user.email ?? '';
  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  useEffect(() => {
    loadMyVibeTags(user.id).then(entries =>
      setVisitedClubs(entries.map(e => ({ name: e.club_name, borough: boroughLabel(e.borough), tags: e.tags })))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    migrateLegacyDrillStats();
    Promise.all(
      DRILL_CONFIGS.map(async (c) => {
        const entries = await loadDailyStats(c.dailyKey, user.id, 7);
        const avg = compute7DayAvg(entries, c.avgMetric);
        const streak = computeStreak(entries, new Set<string>());
        return { id: c.id, avg7: avg !== null ? `${avg}%` : null, streak };
      })
    ).then(results => {
      const stats: Record<string, DrillStat> = {};
      for (const r of results) stats[r.id] = { avg7: r.avg7, streak: r.streak };
      setDrillStats(stats);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveName() {
    setSavingName(true);
    await createClient().auth.updateUser({ data: { full_name: name } });
    setSavingName(false);
    setEditMode(false);
  }

  async function saveEmail() {
    if (!newEmail || newEmail === email) { setEmailMsg({ text: 'Enter a new email address.', ok: false }); return; }
    setSavingEmail(true); setEmailMsg(null);
    const { error } = await createClient().auth.updateUser({ email: newEmail });
    setSavingEmail(false);
    if (error) { setEmailMsg({ text: error.message, ok: false }); }
    else { setEmailMsg({ text: 'Check your new email for a confirmation link.', ok: true }); setNewEmail(''); }
  }

  async function savePassword() {
    if (!newPassword) { setPasswordMsg({ text: 'Enter a new password.', ok: false }); return; }
    if (newPassword.length < 8) { setPasswordMsg({ text: 'Password must be at least 8 characters.', ok: false }); return; }
    if (newPassword !== confirmPassword) { setPasswordMsg({ text: 'Passwords do not match.', ok: false }); return; }
    setSavingPassword(true); setPasswordMsg(null);
    const { error } = await createClient().auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) { setPasswordMsg({ text: error.message, ok: false }); }
    else { setPasswordMsg({ text: 'Password updated.', ok: true }); setNewPassword(''); setConfirmPassword(''); }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px 80px' }}>

      {/* Profile header */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 48 }}>
        <Avatar name={name} />
        <div style={{ flex: 1 }}>
          {editMode ? (
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ ...inputStyle, width: '100%' }}
              placeholder="Display name"
              autoFocus
            />
          ) : (
            <>
              <div style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 26, color: INK, lineHeight: 1.1, marginBottom: 3 }}>
                {name}
              </div>
              <div style={{ fontFamily: FF_M, fontSize: 11, letterSpacing: '0.1em', color: INK3, marginBottom: 2 }}>
                {email}
              </div>
              <div style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.08em', color: INK3 }}>
                Member since {memberSince}
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => editMode ? saveName() : setEditMode(true)}
          disabled={savingName}
          style={{
            background: editMode ? G7 : 'transparent',
            color: editMode ? PW : G7,
            border: `1px solid ${editMode ? G7 : 'rgba(28,74,42,0.3)'}`,
            borderRadius: 7, padding: '7px 16px',
            fontFamily: FF_M, fontSize: 10, letterSpacing: '0.1em',
            textTransform: 'uppercase', cursor: savingName ? 'default' : 'pointer',
            opacity: savingName ? 0.6 : 1, flexShrink: 0,
          }}
        >
          {savingName ? 'Saving…' : editMode ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Account settings — only shown in edit mode */}
      {editMode && <>
        <Section title="Email">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: INK3, display: 'block', marginBottom: 5 }}>
                New email
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder={email}
                style={inputStyle}
              />
            </div>
            {emailMsg && (
              <div style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 13, color: emailMsg.ok ? G7 : R }}>
                {emailMsg.text}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={saveEmail}
                disabled={savingEmail}
                style={{
                  background: G7, color: PW, border: 'none', borderRadius: 7,
                  padding: '8px 20px', fontFamily: FF_M, fontSize: 10,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: savingEmail ? 'default' : 'pointer', opacity: savingEmail ? 0.6 : 1,
                }}
              >
                {savingEmail ? 'Saving…' : 'Update email'}
              </button>
              <button
                onClick={() => { setEditMode(false); setName(displayName(user)); setNewEmail(''); setEmailMsg(null); setNewPassword(''); setConfirmPassword(''); setPasswordMsg(null); }}
                style={{
                  background: 'transparent', color: INK3, border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: 7, padding: '8px 20px', fontFamily: FF_M, fontSize: 10,
                  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Section>

        <Section title="Password">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: INK3, display: 'block', marginBottom: 5 }}>
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: INK3, display: 'block', marginBottom: 5 }}>
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                style={inputStyle}
              />
            </div>
            {passwordMsg && (
              <div style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 13, color: passwordMsg.ok ? G7 : R }}>
                {passwordMsg.text}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={savePassword}
                disabled={savingPassword}
                style={{
                  background: G7, color: PW, border: 'none', borderRadius: 7,
                  padding: '8px 20px', fontFamily: FF_M, fontSize: 10,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: savingPassword ? 'default' : 'pointer', opacity: savingPassword ? 0.6 : 1,
                }}
              >
                {savingPassword ? 'Saving…' : 'Update password'}
              </button>
              <button
                onClick={() => { setEditMode(false); setName(displayName(user)); setNewEmail(''); setEmailMsg(null); setNewPassword(''); setConfirmPassword(''); setPasswordMsg(null); }}
                style={{
                  background: 'transparent', color: INK3, border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: 7, padding: '8px 20px', fontFamily: FF_M, fontSize: 10,
                  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Section>
      </>}

      {/* Drill scores */}
      <Section title="Your chops">
        {DRILL_CONFIGS.map(c => <DrillCard key={c.id} config={c} stat={drillStats[c.id] ?? null} />)}
      </Section>

      {/* Saved seats */}
      <Section title="Saved seats">
        {SAVED_SEATS_MOCK.length > 0
          ? SAVED_SEATS_MOCK.map(c => <ClubCard key={c.name} club={c} showTags={false} />)
          : <EmptyState text="No saved seats yet. Browse Open Tables to find your table." />
        }
      </Section>

      {/* Tables visited */}
      <Section title="Tables you've visited">
        {visitedClubs.length > 0
          ? visitedClubs.map(c => <ClubCard key={c.name + c.borough} club={c} showTags={true} />)
          : <EmptyState text="Tag a club after your first visit and it'll show up here." />
        }
      </Section>

    </div>
  );
}
