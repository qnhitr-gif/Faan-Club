'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { GUEST_QUESTIONS, MEMBER_QUESTIONS } from '@/components/practice/DailyLock';
import { useDrillSession } from '@/lib/useDrillSession';
import { DailyLock } from '@/components/practice/DailyLock';
import type { TileFace, SuitedValue } from '@/lib/tiles';
import { Tile } from '@/components/Tile';
import { calculateShanten } from '@/lib/shanten';
import { calculateUkeire, evaluateDiscards } from '@/lib/ukeire';
import { saveProgress, loadProgress, clearProgress } from '@/lib/drillProgress';
import { saveDailyStat } from '@/lib/drillDailyStats';

// ── tokens ─────────────────────────────────────────────────────────────────────
const R    = '#b8302a';
const G8   = '#1c4a2a';
const G7   = '#235836';
const INK  = '#16170f';
const INK2 = '#2C2A26';
const INK3 = '#7a7a6a';
const RICE = '#faf6ec';
const PW   = '#fcfaf3';
const FF_D = 'var(--font-display), Georgia, serif';
const FF_S = 'var(--font-serif), Georgia, serif';
const FF_M = 'var(--font-mono), monospace';

// ── Tile index helpers ────────────────────────────────────────────────────────

function indexToFace(idx: number): TileFace {
  if (idx <= 8)  return { suit: 'character', value: (idx + 1) as SuitedValue };
  if (idx <= 17) return { suit: 'dot',       value: (idx - 8)  as SuitedValue };
  if (idx <= 26) return { suit: 'bamboo',    value: (idx - 17) as SuitedValue };
  const winds   = ['east', 'south', 'west', 'north'] as const;
  if (idx <= 30) return { suit: 'wind',   value: winds[idx - 27] };
  const dragons = ['red', 'green', 'white'] as const;
  return           { suit: 'dragon', value: dragons[idx - 31] };
}

function tileShortName(idx: number): string {
  if (idx <= 8)  return `${idx + 1} Character`;
  if (idx <= 17) return `${idx - 8} Dot`;
  if (idx <= 26) return `${idx - 17} Bamboo`;
  const w = ['East Wind', 'South Wind', 'West Wind', 'North Wind'];
  if (idx <= 30) return w[idx - 27];
  return ['Red Dragon', 'Green Dragon', 'White Dragon'][idx - 31];
}

// ── Wall / deck helpers ───────────────────────────────────────────────────────

function indicesToCounts(tiles: number[]): number[] {
  const c = new Array(34).fill(0);
  for (const t of tiles) c[t]++;
  return c;
}

function drawFromWall(wall: number[]): number | null {
  const total = wall.reduce((s, c) => s + c, 0);
  if (total === 0) return null;
  let r = Math.floor(Math.random() * total);
  for (let i = 0; i < 34; i++) {
    if (r < wall[i]) return i;
    r -= wall[i];
  }
  return null;
}

function buildStartingHand(): { hand: number[]; wall: number[] } {
  const allTiles: number[] = [];
  for (let i = 0; i < 34; i++) for (let c = 0; c < 4; c++) allTiles.push(i);

  for (let attempt = 0; attempt < 300; attempt++) {
    const deck = allTiles.slice();
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    const hand = deck.slice(0, 13).sort((a, b) => a - b);
    const counts = indicesToCounts(hand);
    const shanten = calculateShanten(counts);
    if (shanten < 1 || shanten > 3) continue;
    const wall = counts.map((c) => 4 - c);
    return { hand, wall };
  }

  while (true) {
    const deck = allTiles.slice();
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    const hand = deck.slice(0, 13).sort((a, b) => a - b);
    const counts = indicesToCounts(hand);
    if (calculateShanten(counts) <= 0) continue;
    const wall = counts.map((c) => 4 - c);
    return { hand, wall };
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface RoundState {
  hand: number[];
  drawn: number;
  wall: number[];
  drawCount: number;
  discards: number[];
  optimalCount: number;
  totalDiscards: number;
}

interface Feedback {
  discarded: number;
  ukeire: number;
  ukireTiles: number[];
  shanten: number;
  bestDiscard: number;
  bestUkeire: number;
  bestShanten: number;
  isOptimal: boolean;
  efficiency: number;
}

interface RoundResult {
  draws: number;
  efficiency: number;
}

const GUEST_KEY    = 'faan-drills-daily';
const MEMBER_KEY   = 'faan-tile-drill-daily';
const STATS_KEY    = 'faan-tile-drill-last-stats';
const PROGRESS_KEY = 'faan-tile-drill';

function saveLastStats(results: RoundResult[]): void {
  if (typeof window === 'undefined' || results.length === 0) return;
  const avgEff   = Math.round(results.reduce((s, r) => s + r.efficiency, 0) / results.length);
  const avgDraws = Math.round((results.reduce((s, r) => s + r.draws, 0) / results.length) * 10) / 10;
  try { localStorage.setItem(STATS_KEY, JSON.stringify({ avgDraws, avgEfficiency: avgEff })); } catch {}
}
function loadLastStats(): { avgDraws: number; avgEfficiency: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function tileLockProps(results: RoundResult[]) {
  const hasLive = results.length > 0;
  const persisted = hasLive ? null : loadLastStats();
  const avgEff = hasLive
    ? Math.round(results.reduce((s, r) => s + r.efficiency, 0) / results.length)
    : (persisted?.avgEfficiency ?? 0);
  const avgDraws = hasLive
    ? Math.round((results.reduce((s, r) => s + r.draws, 0) / results.length) * 10) / 10
    : (persisted?.avgDraws ?? 0);
  const hasStats = hasLive || persisted !== null;
  return {
    stat1: { label: 'Avg efficiency',    value: hasStats ? `${avgEff}%`      : '—', sub: 'last session' },
    stat2: { label: 'Avg draws to ready', value: hasStats ? String(avgDraws) : '—', sub: 'last session' },
  };
}

// ── Tenpai decomposition ──────────────────────────────────────────────────────

interface TenpaiDecomp { melds: number[][]; pair: number[] | null; partial: number[]; }

function extractNMelds(counts: number[], n: number): number[][] | null {
  if (n === 0) return [];
  let i = 0;
  while (i < 34 && counts[i] === 0) i++;
  if (i >= 34) return null;
  if (counts[i] >= 3) {
    counts[i] -= 3;
    const rest = extractNMelds(counts, n - 1);
    counts[i] += 3;
    if (rest !== null) return [[i, i, i], ...rest];
  }
  if (i < 27 && i % 9 <= 6 && counts[i + 1] > 0 && counts[i + 2] > 0) {
    counts[i]--; counts[i + 1]--; counts[i + 2]--;
    const rest = extractNMelds(counts, n - 1);
    counts[i]++; counts[i + 1]++; counts[i + 2]++;
    if (rest !== null) return [[i, i + 1, i + 2], ...rest];
  }
  return null;
}

function isValidPartial(a: number, b: number): boolean {
  if (a === b) return true; // pair wait
  if (a >= 27 || b >= 27) return false; // honours can't form sequences
  if (Math.floor(a / 9) !== Math.floor(b / 9)) return false; // different suits
  const diff = b - a;
  return diff === 1 || diff === 2; // side/edge or kanchan
}

function decomposeTenpai(hand: number[]): TenpaiDecomp | null {
  const base = new Array(34).fill(0);
  for (const t of hand) base[t]++;

  for (let p = 0; p < 34; p++) {
    if (base[p] < 2) continue;
    base[p] -= 2;
    for (let a = 0; a < 34; a++) {
      if (base[a] === 0) continue;
      base[a]--;
      for (let b = a; b < 34; b++) {
        if (base[b] === 0) continue;
        if (!isValidPartial(a, b)) continue;
        base[b]--;
        const melds = extractNMelds(base.slice(), 3);
        if (melds) { base[b]++; base[a]++; base[p] += 2; return { melds, pair: [p, p], partial: [a, b] }; }
        base[b]++;
      }
      base[a]++;
    }
    base[p] += 2;
  }

  for (let a = 0; a < 34; a++) {
    if (base[a] === 0) continue;
    base[a]--;
    const melds = extractNMelds(base.slice(), 4);
    if (melds) { base[a]++; return { melds, pair: null, partial: [a] }; }
    base[a]++;
  }

  return null;
}

function waitLabel(partial: number[]): string {
  if (partial.length === 1) return 'Pair wait';
  const [a, b] = partial;
  if (a === b) return 'Pair wait';
  if (a >= 27 || b >= 27 || Math.floor(a / 9) !== Math.floor(b / 9)) return 'Wait';
  if (b - a === 1) return (a % 9 === 0 || b % 9 === 8) ? 'Edge wait' : 'Side wait';
  if (b - a === 2) return 'Closed wait';
  return 'Wait';
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Snapshot { round: RoundState; feedback: Feedback | null; isTenpai: boolean; }

export function TileDrill({ userId }: { userId?: string | null }) {
  const [roundIdx, setRoundIdx]           = useState(0);
  const [results, setResults]             = useState<RoundResult[]>([]);
  const [round, setRound]                 = useState<RoundState | null>(null);
  const [feedback, setFeedback]           = useState<Feedback | null>(null);
  const [isTenpai, setIsTenpai]           = useState(false);
  const [history, setHistory]             = useState<Snapshot[]>([]);
  const [locked, setLocked]               = useState(false);
  const [lockResults, setLockResults]     = useState<RoundResult[]>([]);
  const [checkingFinish, setCheckingFinish] = useState(false);
  const [roundRecorded, setRoundRecorded] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);

  const uid = userId ?? null;
  const rounds = uid ? MEMBER_QUESTIONS : GUEST_QUESTIONS;
  const effectiveKey = uid ? MEMBER_KEY : GUEST_KEY;
  const { local, member, reload, record } = useDrillSession(effectiveKey, uid);

  useEffect(() => {
    if (!locked) return;
    reload().then(({ isLocked }) => {
      if (!isLocked) { setLocked(false); setRoundIdx(0); setResults([]); setHistory([]); }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  useEffect(() => {
    loadProgress(PROGRESS_KEY, uid).then(saved => {
      const s = saved as { roundIdx: number; results: RoundResult[] } | null;
      if (s) { setRoundIdx(s.roundIdx); setResults(s.results); }
      setProgressLoaded(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!progressLoaded) return;
    if (roundIdx > 0 || results.length > 0) saveProgress(PROGRESS_KEY, uid, { roundIdx, results });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIdx, results]);

  useEffect(() => {
    if (!progressLoaded) return;
    if (roundIdx >= rounds) return;
    if (history.length > roundIdx) return;
    reload().then(({ isLocked }) => {
      if (isLocked) { setLocked(true); return; }
      const { hand, wall } = buildStartingHand();
      const drawn = drawFromWall(wall);
      if (drawn === null) return;
      const newWall = wall.slice();
      newWall[drawn]--;
      setRound({ hand, drawn, wall: newWall, drawCount: 1, discards: [], optimalCount: 0, totalDiscards: 0 });
      setFeedback(null);
      setIsTenpai(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIdx, progressLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (roundIdx < rounds || results.length === 0 || roundRecorded) return;
    saveLastStats(results);
    const avgEff   = Math.round(results.reduce((s, r) => s + r.efficiency, 0) / results.length);
    const avgDraws = Math.round((results.reduce((s, r) => s + r.draws, 0) / results.length) * 10) / 10;
    saveDailyStat('faan-tile-drill', uid, { avgEfficiency: avgEff, avgDraws });
    clearProgress(PROGRESS_KEY, uid);
    setRoundRecorded(true);
    setCheckingFinish(true);
    record().then(({ isLocked: l }) => {
      if (l) { setLockResults(results); setLocked(true); }
      setCheckingFinish(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIdx, results]);

  if (checkingFinish) return <div style={{ minHeight: 400 }} aria-hidden />;

  if (locked) {
    return <DailyLock userId={uid} noun="questions" completedQuestions={rounds} {...tileLockProps(lockResults)} />;
  }

  if (roundIdx >= rounds) {
    return (
      <Summary
        results={results}
        local={local}
        member={member}
        userId={uid}
        onRestart={() => {
          reload().then(({ isLocked }) => {
            if (isLocked) {
              setLockResults(results); setLocked(true); return;
            }
            clearProgress(PROGRESS_KEY, uid); setResults([]); setHistory([]); setRoundIdx(0); setRoundRecorded(false);
          });
        }}
      />
    );
  }

  if (!round) return <div style={{ minHeight: 400 }} aria-hidden />;

  const isTsumo = isTenpai && feedback === null;

  function discard(tileIdx: number) {
    if (!round || isTenpai) return;

    let newHand: number[];
    if (tileIdx === round.drawn) {
      newHand = round.hand.slice();
    } else {
      const pos = round.hand.indexOf(tileIdx);
      newHand = [...round.hand.slice(0, pos), ...round.hand.slice(pos + 1), round.drawn].sort((a, b) => a - b);
    }

    const counts = indicesToCounts(newHand);
    const shanten = calculateShanten(counts);
    const { count, tiles } = calculateUkeire(counts, round.wall);
    const counts14 = indicesToCounts([...round.hand, round.drawn]);
    const options = evaluateDiscards(counts14, round.wall);
    const best = options[0];
    const tolerance = Math.max(2, Math.round(best.ukeire * 0.15));
    const isOptimal = shanten === best.shanten && (tileIdx === best.discard || best.ukeire - count <= tolerance);

    const newDiscards = [...round.discards, tileIdx];
    const newOptimal = round.optimalCount + (isOptimal ? 1 : 0);
    const newTotal = round.totalDiscards + 1;
    const efficiency = Math.round((newOptimal / newTotal) * 100);

    const fb: Feedback = { discarded: tileIdx, ukeire: count, ukireTiles: tiles, shanten, bestDiscard: best.discard, bestUkeire: best.ukeire, bestShanten: best.shanten, isOptimal, efficiency };

    if (shanten <= 0) {
      setResults((prev) => [...prev, { draws: round.drawCount, efficiency }]);
      setIsTenpai(true);
      setFeedback(fb);
      setRound({ ...round, hand: newHand, discards: newDiscards, optimalCount: newOptimal, totalDiscards: newTotal });
      return;
    }

    // Auto-draw next tile immediately
    const nextDrawn = drawFromWall(round.wall);
    if (nextDrawn === null) {
      setFeedback(fb);
      setRound({ ...round, hand: newHand, discards: newDiscards, optimalCount: newOptimal, totalDiscards: newTotal });
      setRoundIdx((n) => n + 1);
      return;
    }
    const newWall = round.wall.slice();
    newWall[nextDrawn]--;
    const newDrawCount = round.drawCount + 1;

    // Check tsumo on new draw
    const counts14new = indicesToCounts([...newHand, nextDrawn]);
    if (calculateShanten(counts14new) < 0) {
      setResults((prev) => [...prev, { draws: newDrawCount, efficiency }]);
      setIsTenpai(true);
    } else {
      setIsTenpai(false);
    }

    setFeedback(fb);
    setRound({ ...round, hand: newHand, drawn: nextDrawn, wall: newWall, drawCount: newDrawCount, discards: newDiscards, optimalCount: newOptimal, totalDiscards: newTotal });
  }

  function nextRound() {
    if (round) setHistory(h => [...h, { round, feedback, isTenpai }]);
    setRoundIdx((n) => n + 1);
  }

  function prevRound() {
    if (roundIdx === 0) return;
    const prev = history[roundIdx - 1];
    if (!prev) return;
    setRound(prev.round);
    setFeedback(prev.feedback);
    setIsTenpai(prev.isTenpai);
    setHistory(h => h.slice(0, roundIdx - 1));
    setResults(r => r.slice(0, roundIdx - 1));
    setRoundIdx(n => n - 1);
  }

  const tileSet     = isTenpai ? round.hand : [...round.hand, round.drawn];
  const shanten     = calculateShanten(indicesToCounts(isTenpai ? round.hand : tileSet));
  const inputLocked = isTenpai;

  return (
    <div>

      {/* ── Description ── */}
      <p style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 16, color: INK2, marginBottom: 32 }}>
        Discard to maximise your outs — tile efficiency is a foundation, not the whole game. Sharpen your base reads here.
      </p>

      {/* ── Hand area ── */}
      <div style={{
        background: PW,
        border: '1px solid rgba(28,74,42,0.12)',
        borderRadius: 12, padding: '24px 28px 24px',
        marginBottom: 20,
      }}>

        {/* Progress + meta row */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: INK3 }}>Question</span>
              <span style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 22, color: R, lineHeight: 1 }}>{roundIdx + 1}</span>
              <span style={{ fontFamily: FF_M, fontSize: 10, color: INK3 }}>/ {rounds}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3 }}>
                Draw <span style={{ color: INK2 }}>{round.drawCount}</span>
              </span>
              {roundIdx > 0 && (
                <button type="button" onClick={prevRound} style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  ← Back
                </button>
              )}
              <button type="button" onClick={nextRound} style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Skip →
              </button>
            </div>
          </div>
          <div style={{ height: 2, background: 'rgba(28,74,42,0.08)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: G7, borderRadius: 2, width: `${(roundIdx / rounds) * 100}%`, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Prompt + shanten */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <p style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 15, color: isTsumo ? G7 : inputLocked ? INK3 : INK2, margin: 0 }}>
            {isTsumo ? 'Winning draw — tsumo!' : inputLocked ? 'Your hand after discard.' : 'Discard one tile to maximise your outs.'}
          </p>
          <ShantenBadge shanten={shanten} />
        </div>

        <style>{`
          @keyframes tilefloat {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-7px); }
          }
          .tile-btn:not(:disabled):hover {
            animation: tilefloat 0.6s ease-in-out infinite;
            cursor: pointer;
          }
        `}</style>

        {/* Tiles row */}
        {isTenpai ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <TenpaiMelds hand={round.hand} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={nextRound}
                autoFocus
                style={{
                  padding: '9px 24px', borderRadius: 7, background: G7,
                  color: '#F5F0E3', fontFamily: FF_M, fontSize: 11,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer',
                }}
              >
                {roundIdx + 1 === rounds ? 'Finish' : 'Next question →'}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
            {/* Standing hand */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {round.hand.map((idx, pos) => (
                <button
                  key={`h-${pos}-${idx}`}
                  type="button"
                  aria-label={`Discard ${tileShortName(idx)}`}
                  onClick={() => discard(idx)}
                  className="tile-btn"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block' }}
                >
                  <Tile face={indexToFace(idx) as TileFace} size="md" />
                </button>
              ))}
            </div>

            {/* Drawn tile */}
            <div key={round.drawn} style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <div style={{ width: 1, height: 72, background: 'rgba(28,74,42,0.2)', alignSelf: 'center' }} aria-hidden />
              <div>
                <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: G7, marginBottom: 6, textAlign: 'center' }}>
                  Draw
                </div>
                <button
                  type="button"
                  aria-label={`Discard drawn tile ${tileShortName(round.drawn)}`}
                  onClick={() => discard(round.drawn)}
                  className="tile-btn"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block' }}
                >
                  <Tile face={indexToFace(round.drawn) as TileFace} size="md" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Feedback + discard river ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>

        {/* Left — feedback */}
        <div>
          {isTsumo && !feedback && (
            <TsumoPanel drawn={round.drawn} results={results} />
          )}
          {feedback && (
            <FeedbackPanel feedback={feedback} isTenpai={isTenpai} />
          )}
        </div>

        {/* Right — discard river */}
        <DiscardRiver discards={round.discards} />
      </div>

    </div>
  );
}

// ── Tenpai melds display ──────────────────────────────────────────────────────

function TenpaiMelds({ hand }: { hand: number[] }) {
  const decomp = useMemo(() => decomposeTenpai(hand), [hand]);
  if (!decomp) {
    return (
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {hand.map((idx, i) => <Tile key={i} face={indexToFace(idx) as TileFace} size="md" />)}
      </div>
    );
  }
  const { melds, pair, partial } = decomp;
  const label = waitLabel(partial);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, flexWrap: 'wrap' }}>
      {melds.map((meld, i) => (
        <div key={i} style={{ display: 'flex', gap: 3 }}>
          {meld.map((t, j) => <Tile key={j} face={indexToFace(t) as TileFace} size="md" />)}
        </div>
      ))}
      {pair && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3 }}>Pair</div>
          <div style={{ display: 'flex', gap: 3 }}>
            {pair.map((t, j) => <Tile key={j} face={indexToFace(t) as TileFace} size="md" />)}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: G7 }}>{label}</div>
        <div style={{
          display: 'flex', gap: 3, padding: 4,
          borderRadius: 10,
          background: 'rgba(184,134,11,0.1)',
          boxShadow: '0 0 0 2px #b8860b, 0 4px 14px rgba(184,134,11,0.3)',
        }}>
          {partial.map((t, j) => (
            <Tile key={j} face={indexToFace(t) as TileFace} size="md" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Shanten badge ─────────────────────────────────────────────────────────────

function ShantenBadge({ shanten }: { shanten: number }) {
  if (shanten < 0) {
    return (
      <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, background: 'rgba(28,74,42,0.1)', color: G7 }}>
        Tsumo!
      </span>
    );
  }
  if (shanten === 0) {
    return (
      <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, background: 'rgba(28,74,42,0.1)', color: G7 }}>
        Tenpai — ready
      </span>
    );
  }
  const label = shanten === 1 ? '1 tile from ready' : `${shanten} tiles from ready`;
  const bg = shanten === 1 ? 'rgba(184,48,42,0.08)' : 'rgba(28,74,42,0.06)';
  const color = shanten === 1 ? R : INK3;
  return (
    <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, background: bg, color }}>
      {label}
    </span>
  );
}

// ── Tsumo banner ──────────────────────────────────────────────────────────────

function TsumoPanel({ drawn, results }: { drawn: number; results: RoundResult[] }) {
  return (
    <div style={{
      background: 'rgba(28,74,42,0.05)', border: '1px solid rgba(28,74,42,0.2)',
      borderRadius: 10, padding: '18px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Tile face={indexToFace(drawn) as TileFace} size="sm" />
        <span style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 15, color: G7 }}>
          Winning draw!
        </span>
      </div>
      {results.length > 0 && (
        <div>
          <span style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 28, color: G7, lineHeight: 1 }}>
            {results[results.length - 1].efficiency}%
          </span>
          <span style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, display: 'block', marginTop: 2 }}>
            efficiency
          </span>
        </div>
      )}
    </div>
  );
}

// ── Feedback panel ────────────────────────────────────────────────────────────

function FeedbackPanel({ feedback, isTenpai }: { feedback: Feedback; isTenpai: boolean }) {
  const { isOptimal } = feedback;

  const borderColor = isTenpai
    ? 'rgba(28,74,42,0.25)'
    : isOptimal
      ? 'rgba(28,74,42,0.2)'
      : 'rgba(184,48,42,0.2)';

  const bgColor = isTenpai || isOptimal
    ? 'rgba(28,74,42,0.04)'
    : 'rgba(184,48,42,0.04)';

  return (
    <div style={{ background: bgColor, border: `1px solid ${borderColor}`, borderRadius: 10, padding: '18px 20px' }}>

      {/* Verdict */}
      {isTenpai ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Tile face={indexToFace(feedback.discarded) as TileFace} size="sm" />
            <span style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 14, color: G7 }}>Ready hand!</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 28, color: G7, lineHeight: 1 }}>
              {feedback.efficiency}%
            </div>
            <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginTop: 2 }}>
              efficiency
            </div>
          </div>
        </div>
      ) : isOptimal ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Tile face={indexToFace(feedback.discarded) as TileFace} size="sm" />
          <span style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 14, color: G7 }}>
            Best discard ✓
          </span>
        </div>
      ) : (
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Tile face={indexToFace(feedback.discarded) as TileFace} size="sm" />
            <span style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 13, color: INK2 }}>
              You discarded {tileShortName(feedback.discarded)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 10, borderTop: '1px solid rgba(184,48,42,0.1)' }}>
            <Tile face={indexToFace(feedback.bestDiscard) as TileFace} size="sm" />
            <span style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 13, color: INK2 }}>
              {feedback.bestShanten < feedback.shanten
                ? <>Better: discard <strong style={{ fontStyle: 'normal', color: INK }}>{tileShortName(feedback.bestDiscard)}</strong> to move closer to ready</>
                : <>Better: discard <strong style={{ fontStyle: 'normal', color: INK }}>{tileShortName(feedback.bestDiscard)}</strong> — {feedback.bestUkeire} outs vs your {feedback.ukeire}</>
              }
            </span>
          </div>
        </div>
      )}

      {/* Outs */}
      <div style={{ paddingTop: 12, borderTop: '1px solid rgba(28,74,42,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
          <span style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 22, color: G7, lineHeight: 1 }}>
            {feedback.ukeire}
          </span>
          <span style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: INK3 }}>
            {isTenpai ? 'winning tiles' : 'outs in wall'}
          </span>
        </div>
        {feedback.ukireTiles.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {feedback.ukireTiles.map((idx) => (
              <Tile key={idx} face={indexToFace(idx) as TileFace} size="sm" />
            ))}
          </div>
        ) : (
          <p style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 13, color: INK3 }}>
            No useful tiles remain in the wall.
          </p>
        )}
      </div>
    </div>
  );
}

// ── Discard river ─────────────────────────────────────────────────────────────

function DiscardRiver({ discards }: { discards: number[] }) {
  if (discards.length === 0) return (
    <div style={{
      border: '1px dashed rgba(28,74,42,0.15)', borderRadius: 10, padding: '18px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80,
    }}>
      <span style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 13, color: INK3 }}>
        Discards will appear here
      </span>
    </div>
  );

  return (
    <div style={{
      border: '1px solid rgba(28,74,42,0.1)', borderRadius: 10, padding: '18px 20px',
      background: PW,
    }}>
      <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 12 }}>
        Discards
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {discards.map((idx, i) => (
          <div key={i} style={{ opacity: 0.45 }}>
            <Tile face={indexToFace(idx) as TileFace} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Summary ───────────────────────────────────────────────────────────────────

function tierMessage(avg: number): string {
  if (avg <= 2) return 'Sharp — you read tenpai paths almost instantly.';
  if (avg <= 4) return 'Efficient — solid discard decisions throughout.';
  if (avg <= 6) return 'Good progress — keep spotting the connected tiles.';
  if (avg <= 9) return 'Room to improve — focus on pairs and partial runs.';
  return 'Study the meld shapes and come back for another session.';
}

function Summary({ results, onRestart, local, member, userId }: { results: RoundResult[]; onRestart: () => void; local: number; member: number; userId: string | null }) {
  const total = results.length;
  const avg = total === 0 ? 0 : Math.round((results.reduce((s, r) => s + r.draws, 0) / total) * 10) / 10;
  const best = Math.min(...results.map((r) => r.draws));
  const avgEfficiency = total === 0 ? 0 : Math.round(results.reduce((s, r) => s + r.efficiency, 0) / total);

  return (
    <div style={{ maxWidth: 680 }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: R, flexShrink: 0 }} />
          <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: G8 }}>
            Session complete
          </span>
          <div style={{ height: 1, width: 32, background: '#c8d8c9' }} />
        </div>
        <h2 style={{ fontFamily: FF_S, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>
          Here's how you <em style={{ fontStyle: 'italic', color: G7 }}>did.</em>
        </h2>
        <p style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 16, color: INK2 }}>
          {tierMessage(avg)}
        </p>
      </div>

      {/* Headline stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Avg draws to ready', value: String(avg), sub: `best: ${best} draw${best !== 1 ? 's' : ''}` },
          { label: 'Discard efficiency', value: `${avgEfficiency}%`, sub: 'optimal discards' },
        ].map(s => (
          <div key={s.label} style={{ background: PW, border: '1px solid rgba(28,74,42,0.12)', borderRadius: 10, padding: '20px 22px' }}>
            <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 8 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 48, color: G7, lineHeight: 1, marginBottom: 4 }}>
              {s.value}
            </div>
            <div style={{ fontFamily: FF_M, fontSize: 10, color: INK3 }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Per-round bars */}
      <div style={{ background: PW, border: '1px solid rgba(28,74,42,0.12)', borderRadius: 10, padding: '20px 22px', marginBottom: 28 }}>
        <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 16 }}>
          Round breakdown
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {results.map((r, i) => {
            const maxDraws = Math.max(...results.map((x) => x.draws), 1);
            const pct = (r.draws / maxDraws) * 100;
            const isBest = r.draws === best;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontFamily: FF_M, fontSize: 10, color: INK3, width: 56, flexShrink: 0 }}>
                  Q{i + 1}
                </div>
                <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(28,74,42,0.08)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 2,
                    background: isBest ? G7 : 'rgba(28,74,42,0.3)',
                    width: `${pct}%`,
                    transition: 'width 0.4s ease',
                  }} />
                </div>
                <div style={{ fontFamily: FF_M, fontSize: 10, color: INK3, width: 100, textAlign: 'right', flexShrink: 0 }}>
                  {r.draws} draws · {r.efficiency}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tier note */}
      <div style={{
        background: 'rgba(28,74,42,0.04)', border: '1px solid rgba(28,74,42,0.12)',
        borderRadius: 8, padding: '14px 18px', marginBottom: 28,
        fontFamily: FF_S, fontStyle: 'italic', fontSize: 14, color: INK2, lineHeight: 1.6,
      }}>
        <strong style={{ fontStyle: 'normal', color: G8 }}>Note:</strong> tile efficiency is a foundation, not the whole game. In Hong Kong mahjong, chasing a high-value hand sometimes means holding tiles that hurt your efficiency — sacrificing speed for faan.
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          type="button"
          onClick={onRestart}
          style={{
            padding: '10px 24px', borderRadius: 8, background: G7,
            color: '#F5F0E3', fontFamily: FF_M, fontSize: 11,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            border: 'none', cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
