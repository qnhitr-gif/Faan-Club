'use client';

import { useEffect, useState } from 'react';
import { GUEST_QUESTIONS, MEMBER_QUESTIONS } from '@/components/practice/DailyLock';
import { useDrillSession } from '@/lib/useDrillSession';
import { DailyLock as SharedDailyLock } from '@/components/practice/DailyLock';
import { Tile } from '@/components/Tile';
import type { TileFace } from '@/lib/tiles';
import { generateFanQuestion, type GeneratedFanQuestion, type ConditionType, type Condition } from './fan-quiz-generator';
import { saveProgress, loadProgress, clearProgress } from '@/lib/drillProgress';
import { saveDailyStat } from '@/lib/drillDailyStats';

/* ── Design tokens ────────────────────────────────────────────────── */
const R    = '#b8302a';
const G7   = '#235836';
const G8   = '#1c4a2a';
const INK  = '#16170f';
const INK2 = '#2C2A26';
const INK3 = '#7a7a6a';
const PW   = '#fcfaf3';
const FF_D = 'var(--font-display), Georgia, serif';
const FF_S = 'var(--font-serif), Georgia, serif';
const FF_M = 'var(--font-mono), monospace';

/* ── Daily limit ──────────────────────────────────────────────────── */
const GUEST_KEY  = 'faan-drills-daily';
const MEMBER_KEY = 'faan-fan-quiz-daily';

function fanLockProps(history: AnswerRecord[]) {
  const liveTotal   = history.length;
  const liveCorrect = history.filter(h => h.correct).length;
  const persisted   = liveTotal > 0 ? null : loadLastStats();
  const correctCount = liveTotal > 0 ? liveCorrect : (persisted?.correct ?? 0);
  const total        = liveTotal > 0 ? liveTotal   : (persisted?.total   ?? GUEST_QUESTIONS);
  const accuracy     = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const hasStats     = liveTotal > 0 || persisted !== null;
  return {
    stat1: { label: 'Correct',  value: hasStats ? String(correctCount) : '—', sub: hasStats ? `out of ${total}` : 'no data yet' },
    stat2: { label: 'Accuracy', value: hasStats ? `${accuracy}%`       : '—', sub: 'last session' },
  };
}

const STATS_KEY    = 'faan-fan-quiz-last-stats';
const PROGRESS_KEY = 'faan-fan-quiz';
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


/* ── Types ────────────────────────────────────────────────────────── */
interface AnswerRecord {
  chosen: number;
  correct: boolean;
}

interface Snapshot {
  qIdx: number;
  chosen: number | null;
  history: AnswerRecord[];
}

/* ── Tier message ─────────────────────────────────────────────────── */
function tierMessage(correct: number, total: number): string {
  const pct = correct / total;
  if (pct >= 0.9) return 'Excellent — you read faan like a regular at the table.';
  if (pct >= 0.7) return 'Strong session — most patterns are second nature.';
  if (pct >= 0.5) return 'Good progress — keep drilling the special hands.';
  if (pct >= 0.3) return 'Worth another pass through the faan rules.';
  return 'Brush up on the scoring chapter and try again.';
}

/* ── Summary screen ───────────────────────────────────────────────── */
function Summary({
  history,
  total,
  onRestart,
  limitReached,
  local,
  member,
  userId,
}: {
  history: AnswerRecord[];
  total: number;
  onRestart: () => void;
  limitReached: boolean;
  local: number;
  member: number;
  userId: string | null;
}) {
  const correctCount = history.filter((h) => h.correct).length;
  const wrongCount   = total - correctCount;
  const accuracy     = Math.round((correctCount / total) * 100);

  const barMax = Math.max(correctCount, wrongCount, 1);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: FF_S, fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>
          Session <em style={{ fontStyle: 'italic', color: G7 }}>complete.</em>
        </div>
        <div style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 17, color: INK2 }}>
          Here&apos;s how you did.
        </div>
      </div>

      {/* Big stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Correct */}
        <div style={{ background: PW, border: '1px solid rgba(28,74,42,0.14)', borderRadius: 10, padding: '24px 20px' }}>
          <div style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 12 }}>
            Correct
          </div>
          <div style={{ fontFamily: FF_D, fontSize: 52, fontWeight: 600, color: G7, lineHeight: 1, marginBottom: 12 }}>
            {correctCount}
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(28,74,42,0.08)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 2, background: G7, width: `${(correctCount / barMax) * 100}%`, transition: 'width 0.6s ease' }} />
          </div>
        </div>

        {/* Wrong */}
        <div style={{ background: PW, border: '1px solid rgba(28,74,42,0.14)', borderRadius: 10, padding: '24px 20px' }}>
          <div style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 12 }}>
            Wrong
          </div>
          <div style={{ fontFamily: FF_D, fontSize: 52, fontWeight: 600, color: R, lineHeight: 1, marginBottom: 12 }}>
            {wrongCount}
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(184,48,42,0.08)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 2, background: R, width: `${(wrongCount / barMax) * 100}%`, transition: 'width 0.6s ease' }} />
          </div>
        </div>

        {/* Accuracy */}
        <div style={{ background: PW, border: '1px solid rgba(28,74,42,0.14)', borderRadius: 10, padding: '24px 20px' }}>
          <div style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 12 }}>
            Accuracy
          </div>
          <div style={{ fontFamily: FF_D, fontSize: 52, fontWeight: 600, color: INK, lineHeight: 1, marginBottom: 12 }}>
            {accuracy}%
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(22,23,15,0.08)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 2, background: INK2, width: `${accuracy}%`, transition: 'width 0.6s ease' }} />
          </div>
        </div>
      </div>

      {/* Tier note */}
      <div style={{
        background: 'rgba(35,88,54,0.05)',
        border: '1px solid rgba(35,88,54,0.15)',
        borderRadius: 8, padding: '14px 18px',
        fontFamily: FF_S, fontStyle: 'italic',
        fontSize: 15, color: INK2, marginBottom: 32,
      }}>
        {tierMessage(correctCount, total)}
      </div>

    </div>
  );
}

/* ── Condition chips ─────────────────────────────────────────────── */
const CHIP_COLORS: Record<ConditionType, { bg: string; border: string; labelColor: string; valueColor: string }> = {
  default:   { bg: 'rgba(28,74,42,0.05)',  border: 'rgba(28,74,42,0.18)',  labelColor: INK3,    valueColor: INK2 },
  open:      { bg: 'rgba(28,74,42,0.05)',  border: 'rgba(28,74,42,0.18)',  labelColor: INK3,    valueColor: INK2 },
  win:       { bg: 'rgba(186,117,23,0.08)', border: 'rgba(186,117,23,0.35)', labelColor: '#7A4A0C', valueColor: '#5A3506' },
  flower:    { bg: 'rgba(29,158,117,0.08)', border: 'rgba(29,158,117,0.35)', labelColor: '#0E6A4D', valueColor: '#0A4E38' },
  concealed: { bg: 'rgba(143,163,188,0.12)', border: 'rgba(143,163,188,0.5)', labelColor: '#566A87', valueColor: '#324562' },
};

function ConditionsPanel({ conditions }: { conditions: Condition[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }} role="group" aria-label="Hand conditions">
      {conditions.map((c, i) => {
        const s = CHIP_COLORS[c.type];
        return (
          <span
            key={i}
            style={{
              display: 'inline-flex', alignItems: 'baseline', gap: 6,
              padding: '4px 10px', borderRadius: 999,
              background: s.bg, border: `1px solid ${s.border}`,
            }}
          >
            <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: s.labelColor }}>
              {c.label}
            </span>
            <span style={{ fontFamily: FF_S, fontWeight: 500, fontSize: 13, color: s.valueColor }}>
              {c.value}
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* ── Hand display ────────────────────────────────────────────────── */
function HandDisplay({ groups }: { groups: TileFace[][] }) {
  return (
    <div
      style={{
        borderRadius: 8,
        background: 'rgba(250,246,236,0.6)',
        border: '1px solid rgba(28,74,42,0.1)',
        padding: '12px 14px',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', gap: '6px 8px',
      }}
      aria-label="Winning hand"
    >
      {groups.map((group, gi) => (
        <div key={gi} style={{ display: 'flex', gap: 2 }}>
          {group.map((face, ti) => (
            <Tile key={ti} face={face} size="md" />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Answer button ───────────────────────────────────────────────── */
function AnswerButton({
  label,
  state,
  onClick,
  disabled,
}: {
  label: string;
  state: 'idle' | 'correct' | 'wrong' | 'disabled';
  onClick: () => void;
  disabled: boolean;
}) {
  const base: React.CSSProperties = {
    width: '100%', textAlign: 'left',
    padding: '12px 16px', borderRadius: 8,
    fontFamily: FF_S, fontSize: 15, fontWeight: 500,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.15s, border-color 0.15s',
    border: '1px solid',
  };

  const stateStyles: Record<typeof state, React.CSSProperties> = {
    idle: {
      background: PW,
      borderColor: 'rgba(28,74,42,0.18)',
      color: INK2,
    },
    correct: {
      background: 'rgba(35,88,54,0.08)',
      borderColor: G7,
      color: G8,
    },
    wrong: {
      background: 'rgba(184,48,42,0.07)',
      borderColor: R,
      color: R,
    },
    disabled: {
      background: 'rgba(250,250,246,0.5)',
      borderColor: 'rgba(28,74,42,0.1)',
      color: INK3,
      opacity: 0.6,
    },
  };

  const tag = state === 'correct' ? '✓ Correct' : state === 'wrong' ? '✗ Wrong' : null;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={state === 'correct' || state === 'wrong'}
      aria-label={`Answer option: ${label}`}
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...stateStyles[state] }}
    >
      <span>{label}</span>
      {tag && (
        <span style={{ fontFamily: FF_M, fontSize: 11, letterSpacing: '0.05em', flexShrink: 0 }}>
          {tag}
        </span>
      )}
    </button>
  );
}

/* ── Breakdown panel ─────────────────────────────────────────────── */
function BreakdownPanel({ q, chosen }: { q: GeneratedFanQuestion; chosen: number }) {
  const isCorrect = chosen === q.correct;
  return (
    <div style={{
      marginTop: 16,
      borderRadius: 8, padding: '16px 18px',
      background: isCorrect ? 'rgba(35,88,54,0.06)' : 'rgba(184,48,42,0.05)',
      border: `1px solid ${isCorrect ? 'rgba(35,88,54,0.25)' : 'rgba(184,48,42,0.25)'}`,
    }}>
      {/* Header */}
      <div style={{
        fontFamily: FF_M, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: isCorrect ? G7 : R, marginBottom: 14,
      }}>
        {isCorrect ? 'Correct' : `Not quite — the answer is ${q.opts[q.correct].replace('fan', 'faan')}`}
      </div>

      {/* Fan breakdown — two sections */}
      {(['hand', 'condition'] as const).map(cat => {
        const items = q.breakdown.filter(b => b.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} style={{ marginBottom: 12 }}>
            <div style={{
              fontFamily: FF_M, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: INK3, marginBottom: 7,
            }}>
              {cat === 'hand' ? 'Hand' : 'How they won'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {items.map((b, i) => b.fan === 0 ? (
                <div key={i} style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 12, color: INK3 }}>
                  * {b.item}
                </div>
              ) : (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontFamily: FF_S, fontSize: 14, lineHeight: 1.4, color: INK2 }}>
                    {b.item}
                  </span>
                  <span style={{ fontFamily: FF_M, fontSize: 13, flexShrink: 0, color: INK }}>
                    +{b.fan}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Total */}
      <div style={{
        marginTop: 14, paddingTop: 12,
        borderTop: `1px solid ${isCorrect ? 'rgba(35,88,54,0.2)' : 'rgba(184,48,42,0.2)'}`,
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: FF_M, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: INK3 }}>
          Total
        </span>
        <span style={{ fontFamily: FF_D, fontSize: 26, fontWeight: 600, color: INK, letterSpacing: '-0.02em' }}>
          {q.total} <span style={{ fontFamily: FF_S, fontSize: 15, fontWeight: 400, color: INK2 }}>faan</span>
        </span>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export function FanQuiz({ userId }: { userId?: string | null }) {
  const [questions, setQuestions]   = useState<GeneratedFanQuestion[] | null>(null);
  const [qIdx, setQIdx]             = useState(0);
  const [chosen, setChosen]         = useState<number | null>(null);
  const [history, setHistory]       = useState<AnswerRecord[]>([]);
  const [snaps, setSnaps]           = useState<Snapshot[]>([]);
  const [locked, setLocked]             = useState(false);
  const [lockHistory, setLockHistory]   = useState<AnswerRecord[]>([]);
  const [finished, setFinished]         = useState(false);
  const [checkingFinish, setCheckingFinish] = useState(false);

  const uid = userId ?? null;
  const questionsPerSession = uid ? MEMBER_QUESTIONS : GUEST_QUESTIONS;
  const effectiveKey = uid ? MEMBER_KEY : GUEST_KEY;
  const { local, member, reload, record } = useDrillSession(effectiveKey, uid);

  function buildSession(): GeneratedFanQuestion[] {
    const qs: GeneratedFanQuestion[] = [];
    for (let i = 0; i < questionsPerSession; i++) {
      const prev = qs[qs.length - 1];
      qs.push(generateFanQuestion(prev?.handType));
    }
    return qs;
  }

  useEffect(() => {
    Promise.all([reload(), loadProgress(PROGRESS_KEY, uid)]).then(([{ isLocked: l }, saved]) => {
      if (l) { setLocked(true); return; }
      const s = saved as { qIdx: number; questions: GeneratedFanQuestion[]; history: AnswerRecord[] } | null;
      if (s) { setQIdx(s.qIdx); setQuestions(s.questions); setHistory(s.history); }
      else { setQuestions(buildSession()); }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!locked) return;
    reload().then(({ isLocked: l }) => {
      if (!l) { setLocked(false); setQuestions(buildSession()); }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  if (locked) return <SharedDailyLock userId={uid} noun="questions" completedQuestions={questionsPerSession} {...fanLockProps(lockHistory)} />;
  if (!questions) return <div style={{ minHeight: 400 }} aria-hidden />;

  if (checkingFinish) return <div style={{ minHeight: 400 }} aria-hidden />;

  if (finished) {
    return (
      <Summary
        history={history}
        total={questions.length}
        onRestart={() => {
          reload().then(({ isLocked: l }) => {
            if (l) {
              setLockHistory(history);
              setLocked(true);
              return;
            }
            clearProgress(PROGRESS_KEY, uid);
            setQuestions(buildSession());
            setQIdx(0); setChosen(null); setHistory([]); setSnaps([]);
            setFinished(false);
          });
        }}
        limitReached={false}
        local={local}
        member={member}
        userId={uid}
      />
    );
  }

  const q = questions[qIdx];
  const progress = ((qIdx + (chosen !== null ? 1 : 0)) / questions.length) * 100;

  function pickAnswer(i: number) {
    if (chosen !== null) return;
    const newHistory = [...history, { chosen: i, correct: i === q.correct }];
    setChosen(i);
    setHistory(newHistory);
    saveProgress(PROGRESS_KEY, uid, { qIdx, questions, history: newHistory });
  }

  function nextQuestion() {
    if (!questions || qIdx + 1 >= questions.length) {
      if (checkingFinish) return;
      const h = history;
      const correct = h.filter(r => r.correct).length;
      saveLastStats(correct, h.length);
      saveDailyStat('faan-fan-quiz', uid, { correct, total: h.length, accuracy: Math.round((correct / h.length) * 100) });
      clearProgress(PROGRESS_KEY, uid);
      setCheckingFinish(true);
      record().then(({ isLocked: l }) => {
        if (l) { setLockHistory(h); setLocked(true); }
        else { setFinished(true); }
        setCheckingFinish(false);
      });
      return;
    }
    const nextIdx = qIdx + 1;
    setSnaps([...snaps, { qIdx, chosen, history: [...history] }]);
    setQIdx(nextIdx);
    setChosen(null);
    saveProgress(PROGRESS_KEY, uid, { qIdx: nextIdx, questions, history });
  }

  function prevQuestion() {
    if (snaps.length === 0) return;
    const prev = snaps[snaps.length - 1];
    setSnaps(snaps.slice(0, -1));
    setQIdx(prev.qIdx); setChosen(prev.chosen); setHistory(prev.history);
  }

  const canGoBack = snaps.length > 0;

  return (
    <div>
      {/* Description */}
      <p style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: INK2, marginBottom: 32 }}>
        Look at the winning hand, weigh the conditions, and choose the right faan count.
      </p>

      {/* Question card */}
      <div style={{
        background: PW,
        border: '1px solid rgba(28,74,42,0.14)',
        borderRadius: 12, padding: '28px 28px 24px',
        marginBottom: 32,
      }}>

        {/* Progress row — Back · bar · counter · Next all on one line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          {canGoBack && (
            <button
              type="button"
              onClick={prevQuestion}
              style={{
                fontFamily: FF_M, fontSize: 10, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: INK3,
                background: 'none', border: '1px solid rgba(28,74,42,0.2)',
                borderRadius: 5, padding: '4px 10px', cursor: 'pointer', flexShrink: 0,
              }}
            >
              ← Back
            </button>
          )}
          <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(28,74,42,0.08)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 2, background: G7, width: `${progress}%`, transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 13, color: INK3, flexShrink: 0 }}>
            {qIdx + 1} / {questions.length}
          </div>
          <button
            type="button"
            onClick={chosen !== null ? nextQuestion : undefined}
            style={{
              fontFamily: FF_M, fontSize: 10, letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: chosen !== null ? G8 : 'rgba(28,74,42,0.15)',
              color: chosen !== null ? '#faf6ec' : INK3,
              border: 'none', borderRadius: 5,
              padding: '4px 12px', cursor: chosen !== null ? 'pointer' : 'default',
              flexShrink: 0, transition: 'background 0.2s, color 0.2s',
            }}
          >
            {qIdx + 1 === questions.length ? 'Finish' : 'Next →'}
          </button>
        </div>

        {/* Conditions */}
        <ConditionsPanel conditions={q.conditions} />

        {/* Hand */}
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <HandDisplay groups={q.groups} />
        </div>

        {/* Question label */}
        <div style={{ fontFamily: FF_S, fontWeight: 500, fontSize: 15, color: INK, marginBottom: 14 }}>
          How many faan is this hand worth?
        </div>

        {/* Answer options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} role="radiogroup" aria-label="Faan options">
          {q.opts.map((opt, i) => (
            <AnswerButton
              key={i}
              label={opt}
              state={
                chosen === null
                  ? 'idle'
                  : i === q.correct
                    ? 'correct'
                    : i === chosen
                      ? 'wrong'
                      : 'disabled'
              }
              onClick={() => pickAnswer(i)}
              disabled={chosen !== null}
            />
          ))}
        </div>

        {/* Breakdown (revealed after answering) */}
        {chosen !== null && <BreakdownPanel q={q} chosen={chosen} />}
      </div>
    </div>
  );
}
