'use client';

import { useEffect, useMemo, useState } from 'react';
import type { TileFace } from '@/lib/tiles';
import { Tile } from '@/components/Tile';
import { QUESTIONS, SUIT_LABEL, TIER_NAMES, type Question, type QuizTier } from './quiz-questions';
import { GUEST_QUESTIONS, MEMBER_QUESTIONS } from '@/components/practice/DailyLock';
import { useDrillSession } from '@/lib/useDrillSession';
import { DailyLock } from '@/components/practice/DailyLock';
import { saveProgress, loadProgress, clearProgress } from '@/lib/drillProgress';
import { saveDailyStat } from '@/lib/drillDailyStats';

// ── tokens ─────────────────────────────────────────────────────────────────────
const R    = '#b8302a';
const G8   = '#1c4a2a';
const G7   = '#235836';
const INK  = '#16170f';
const INK2 = '#2C2A26';
const INK3 = '#7a7a6a';
const PW   = '#fcfaf3';
const FF_D = 'var(--font-display), Georgia, serif';
const FF_S = 'var(--font-serif), Georgia, serif';
const FF_M = 'var(--font-mono), monospace';

// ── Daily limit ───────────────────────────────────────────────────────────────
const GUEST_KEY  = 'faan-drills-daily';
const MEMBER_KEY = 'faan-pattern-quiz-daily';
const STATS_KEY    = 'faan-pattern-quiz-last-stats';
const PROGRESS_KEY = 'faan-pattern-quiz';

function saveLastStats(correct: number, total: number): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STATS_KEY, JSON.stringify({ correct, total })); } catch {}
}
function loadLastStats(): { correct: number; total: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function patternLockProps(history: AnswerRecord[]) {
  const liveCorrect = history.filter(h => h.correct).length;
  const liveTotal   = history.length;
  const persisted   = liveTotal > 0 ? null : loadLastStats();
  const correctCount = liveTotal > 0 ? liveCorrect : (persisted?.correct ?? 0);
  const total        = liveTotal > 0 ? liveTotal   : (persisted?.total   ?? GUEST_QUESTIONS);
  const accuracy     = Math.round((correctCount / total) * 100);
  return {
    stat1: { label: 'Correct',  value: String(correctCount), sub: `out of ${total}` },
    stat2: { label: 'Accuracy', value: `${accuracy}%`,       sub: 'last session'    },
  };
}

// ── Session builder ───────────────────────────────────────────────────────────
const TIERS: QuizTier[] = [1, 2, 3, 4, 5];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildSession(n: number): Question[] {
  return shuffle(QUESTIONS).slice(0, n);
}

interface AnswerRecord { qid: string; tier: QuizTier; chosen: number; correct: boolean; }
interface Snapshot { idx: number; chosen: number | null; history: AnswerRecord[]; streak: number; }

// ── Component ─────────────────────────────────────────────────────────────────

export function PatternQuiz({ userId }: { userId?: string | null }) {
  const [session, setSession]             = useState<Question[] | null>(null);
  const [idx, setIdx]                     = useState(0);
  const [chosen, setChosen]               = useState<number | null>(null);
  const [history, setHistory]             = useState<AnswerRecord[]>([]);
  const [streak, setStreak]               = useState(0);
  const [snapshots, setSnapshots]         = useState<Snapshot[]>([]);
  const [locked, setLocked]               = useState(false);
  const [lockHistory, setLockHistory]     = useState<AnswerRecord[]>([]);
  const [checkingFinish, setCheckingFinish] = useState(false);

  const uid = userId ?? null;
  const questionsPerSession = uid ? MEMBER_QUESTIONS : GUEST_QUESTIONS;
  const effectiveKey = uid ? MEMBER_KEY : GUEST_KEY;
  const { local, member, reload, record } = useDrillSession(effectiveKey, uid);

  useEffect(() => {
    Promise.all([reload(), loadProgress(PROGRESS_KEY, uid)]).then(([{ isLocked: l }, saved]) => {
      if (l) { setLocked(true); return; }
      const s = saved as { idx: number; session: Question[]; history: AnswerRecord[] } | null;
      if (s) { setIdx(s.idx); setSession(s.session); setHistory(s.history); }
      else { setSession(buildSession(questionsPerSession)); }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!locked) return;
    reload().then(({ isLocked: l }) => {
      if (!l) { setLocked(false); setSession(buildSession(questionsPerSession)); }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  if (locked) return <DailyLock userId={uid} noun="questions" completedQuestions={questionsPerSession} {...patternLockProps(lockHistory)} />;
  if (!session) return <div style={{ minHeight: 400 }} aria-hidden />;

  const finished = idx >= session.length;
  const q = finished ? null : session[idx];
  const correctCount = history.filter(h => h.correct).length;
  const total = session.length;

  function pick(i: number) {
    if (chosen !== null || !q) return;
    const isCorrect = i === q.correct;
    const newHistory: AnswerRecord[] = [...history, { qid: q.id, tier: q.tier, chosen: i, correct: isCorrect }];
    setChosen(i);
    setStreak(s => isCorrect ? s + 1 : 0);
    setHistory(newHistory);
    saveProgress(PROGRESS_KEY, uid, { idx, session: session!, history: newHistory });
  }

  function next() {
    const newIdx = idx + 1;
    const isLast = newIdx >= session!.length;
    setSnapshots(s => [...s, { idx, chosen, history, streak }]);
    setIdx(newIdx);
    setChosen(null);
    if (!isLast) saveProgress(PROGRESS_KEY, uid, { idx: newIdx, session: session!, history });
    if (isLast) {
      if (checkingFinish) return;
      const h = history;
      const correct = h.filter(r => r.correct).length;
      saveLastStats(correct, session!.length);
      saveDailyStat('faan-pattern-quiz', uid, { correct, total: session!.length, accuracy: Math.round((correct / session!.length) * 100) });
      clearProgress(PROGRESS_KEY, uid);
      setCheckingFinish(true);
      record().then(({ isLocked: l }) => {
        if (l) { setLockHistory(h); setLocked(true); }
        setCheckingFinish(false);
      });
    }
  }

  function prev() {
    if (snapshots.length === 0) return;
    const snap = snapshots[snapshots.length - 1];
    setIdx(snap.idx);
    setChosen(snap.chosen);
    setHistory(snap.history);
    setStreak(snap.streak);
    setSnapshots(s => s.slice(0, -1));
  }

  function restart() {
    reload().then(({ isLocked: l }) => {
      if (l) {
        saveLastStats(correctCount, total);
        setLockHistory(history);
        setLocked(true);
        return;
      }
      clearProgress(PROGRESS_KEY, uid);
      setSession(buildSession(questionsPerSession));
      setIdx(0); setChosen(null); setHistory([]); setStreak(0);
      setSnapshots([]);
    });
  }

  if (checkingFinish) return <div style={{ minHeight: 400 }} aria-hidden />;

  if (finished) {
    return <Summary history={history} total={total} onRestart={restart} local={local} member={member} userId={uid} />;
  }

  return (
    <div>
      {/* Description */}
      <p style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 16, color: INK2, marginBottom: 32 }}>
        Pick the tile that completes this shape into valid mahjong melds.
      </p>

      {/* Question card */}
      <div style={{ background: PW, border: '1px solid rgba(28,74,42,0.12)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>

        {/* Progress row — Back · bar · counter · Next all on one line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          {snapshots.length > 0 && (
            <button type="button" onClick={prev} style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, background: 'none', border: '1px solid rgba(28,74,42,0.2)', borderRadius: 5, padding: '4px 10px', cursor: 'pointer', flexShrink: 0 }}>
              ← Back
            </button>
          )}
          <div style={{ flex: 1, height: 2, background: 'rgba(28,74,42,0.08)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: G7, borderRadius: 2, width: `${(idx / total) * 100}%`, transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 13, color: INK3, flexShrink: 0 }}>
            {idx + 1} / {total}
          </div>
          <button
            type="button"
            onClick={chosen !== null ? next : undefined}
            style={{
              fontFamily: FF_M, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
              background: chosen !== null ? G8 : 'rgba(28,74,42,0.15)',
              color: chosen !== null ? '#faf6ec' : INK3,
              border: 'none', borderRadius: 5, padding: '4px 12px',
              cursor: chosen !== null ? 'pointer' : 'default',
              flexShrink: 0, transition: 'background 0.2s, color 0.2s',
            }}
          >
            {idx + 1 === total ? 'Finish' : 'Next →'}
          </button>
        </div>

        {/* Pattern label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 4, background: 'rgba(28,74,42,0.08)', color: G8 }}>
            {q!.pattern}
          </span>
          <span style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 13, color: INK3 }}>
            {q!.target} · {SUIT_LABEL[q!.suit]}
          </span>
        </div>

        {/* Tiles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
          {q!.tiles.map((v, i) => (
            <Tile key={i} face={{ suit: q!.suit, value: v } as TileFace} size="md" />
          ))}
          <UnknownSlot />
        </div>

        {/* Answer options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
          {q!.opts.map((opt, i) => {
            const state = chosen === null ? 'idle' : i === q!.correct ? 'correct' : i === chosen ? 'wrong' : 'idle';
            return (
              <AnswerButton key={i} label={opt} state={state} onClick={() => pick(i)} disabled={chosen !== null} />
            );
          })}
        </div>

        {/* Explanation (inline, so the hand stays visible) */}
        {chosen !== null && (
          <div style={{ marginTop: 16 }}>
            <ExplanationPanel q={q!} chosen={chosen} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function UnknownSlot() {
  return (
    <span
      role="img"
      aria-label="Unknown tile"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 60, height: 84, borderRadius: 6,
        border: '2px dashed rgba(28,74,42,0.3)',
        background: 'rgba(28,74,42,0.04)',
        fontFamily: FF_S, fontSize: 32, color: G7,
      }}
    >
      ?
    </span>
  );
}

function AnswerButton({ label, state, onClick, disabled }: { label: string; state: 'idle' | 'correct' | 'wrong'; onClick: () => void; disabled: boolean }) {
  const styles = {
    idle:    { bg: 'rgba(28,74,42,0.04)', border: 'rgba(28,74,42,0.14)', color: INK },
    correct: { bg: 'rgba(28,74,42,0.1)',  border: G7,                   color: G7  },
    wrong:   { bg: 'rgba(184,48,42,0.06)', border: R,                   color: R   },
  }[state];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%', textAlign: 'left',
        padding: '12px 16px', borderRadius: 8,
        border: `1px solid ${styles.border}`,
        background: styles.bg, color: styles.color,
        fontFamily: FF_S, fontSize: 14,
        cursor: disabled && state === 'idle' ? 'not-allowed' : disabled ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'border-color 0.15s, background 0.15s',
        opacity: disabled && state === 'idle' ? 0.5 : 1,
      }}
    >
      <span>{label}</span>
      {state === 'correct' && <span style={{ fontFamily: FF_M, fontSize: 10 }}>✓</span>}
      {state === 'wrong'   && <span style={{ fontFamily: FF_M, fontSize: 10 }}>✗</span>}
    </button>
  );
}

function ExplanationPanel({ q, chosen }: { q: Question; chosen: number }) {
  const isCorrect = chosen === q.correct;
  return (
    <div style={{
      background: isCorrect ? 'rgba(28,74,42,0.04)' : 'rgba(184,48,42,0.04)',
      border: `1px solid ${isCorrect ? 'rgba(28,74,42,0.2)' : 'rgba(184,48,42,0.2)'}`,
      borderRadius: 10, padding: '18px 22px',
    }}>
      <p style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 14, color: isCorrect ? G7 : R, marginBottom: 12 }}>
        {isCorrect ? 'Correct.' : `Not quite — the answer is ${q.answer}.`}
      </p>
      <p style={{ fontFamily: FF_S, fontSize: 14, color: INK2, lineHeight: 1.7, marginBottom: 12 }}>{q.exp}</p>
      <div style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginBottom: 8 }}>Meld breakdown</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {q.splits.map((s, i) => (
          <li key={i} style={{ fontFamily: FF_M, fontSize: 12, color: INK2 }}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

// ── Summary ───────────────────────────────────────────────────────────────────

function Summary({ history, total, onRestart, local, member, userId }: { history: AnswerRecord[]; total: number; onRestart: () => void; local: number; member: number; userId: string | null }) {
  const correctCount = history.filter(h => h.correct).length;
  const accuracy = Math.round((correctCount / total) * 100);

  const byTier = useMemo(() => {
    const map = new Map<QuizTier, { right: number; total: number }>();
    for (const t of TIERS) map.set(t, { right: 0, total: 0 });
    for (const h of history) {
      const m = map.get(h.tier)!;
      m.total += 1;
      if (h.correct) m.right += 1;
    }
    return map;
  }, [history]);

  const weakest = useMemo(() => {
    let worst: { tier: QuizTier; acc: number } | null = null;
    for (const tier of TIERS) {
      const m = byTier.get(tier)!;
      if (m.total === 0) continue;
      const acc = m.right / m.total;
      if (worst === null || acc < worst.acc) worst = { tier, acc };
    }
    return worst?.acc === 1 ? null : worst?.tier ?? null;
  }, [byTier]);

  return (
    <div style={{ maxWidth: 680 }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: R, flexShrink: 0 }} />
          <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: G8 }}>Session complete</span>
          <div style={{ height: 1, width: 32, background: '#c8d8c9' }} />
        </div>
        <h2 style={{ fontFamily: FF_S, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>
          Here's how you <em style={{ fontStyle: 'italic', color: G7 }}>did.</em>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Correct', value: String(correctCount), sub: `out of ${total}` },
          { label: 'Accuracy', value: `${accuracy}%`, sub: 'of questions' },
        ].map(s => (
          <div key={s.label} style={{ background: PW, border: '1px solid rgba(28,74,42,0.12)', borderRadius: 10, padding: '20px 22px' }}>
            <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 48, color: G7, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontFamily: FF_M, fontSize: 10, color: INK3 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {weakest !== null && (
        <div style={{ background: 'rgba(28,74,42,0.04)', border: '1px solid rgba(28,74,42,0.12)', borderRadius: 8, padding: '14px 18px', marginBottom: 28, fontFamily: FF_S, fontStyle: 'italic', fontSize: 14, color: INK2, lineHeight: 1.6 }}>
          Focus on <strong style={{ fontStyle: 'normal', color: G8 }}>Tier {weakest}</strong> — {TIER_NAMES[weakest]}.
        </div>
      )}

    </div>
  );
}
