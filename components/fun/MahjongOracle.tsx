'use client';

import { useRef, useState } from 'react';
import { Tile } from '@/components/Tile';
import type { TileFace, SuitedValue } from '@/lib/tiles';

// ── Tile pool ─────────────────────────────────────────────────────────────────
const NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as SuitedValue[];

const TILE_POOL: TileFace[] = [
  ...NUMS.map((v) => ({ suit: 'character' as const, value: v })),
  ...NUMS.map((v) => ({ suit: 'dot' as const, value: v })),
  ...NUMS.map((v) => ({ suit: 'bamboo' as const, value: v })),
];

// ── Response copy ─────────────────────────────────────────────────────────────
type Bucket = 'take' | 'leave' | 'hmmm';

const RESPONSES: Record<Bucket, string[]> = {
  take: [
    'The winds are in your favour. Hold it close.',
    'East confirms what your gut already knows.',
    'This tile completes the shape. Keep it.',
    'A clear run — trust the pattern.',
    'The table agrees. Take it.',
    'Fortune favours the decisive. Claim it.',
    'Your hand speaks plainly. This fits.',
    'Twelve seasons have not changed this wisdom: keep it.',
    'The wall gives, and wisdom receives.',
    'This is no coincidence — the tile belongs with you.',
    'Keep it. The pung will reveal itself.',
    'A natural draw. Let the meld form.',
    'The spirits of the four winds nod in unison.',
    'Hold this tile like you hold a secret.',
    'Yes. Without hesitation.',
  ],
  leave: [
    'Discard without regret.',
    'The tile is not yours to keep today.',
    'Release it — another shape waits.',
    'The wall will provide. This one is not for you.',
    'A wise discard is half a win.',
    'Let it go. Your hand breathes easier.',
    'This tile serves your opponent better. Drop it.',
    'The south wind blows it away from you.',
    'Cast it into the river. Do not look back.',
    'Trust the count — this tile is excess.',
    'Leave it. The pattern you seek has no room for this.',
    'Even the dragon knows when to retreat.',
    'Your hand is stronger without it.',
    'Not every tile is a gift. Discard and move on.',
    'The table will take what you release.',
  ],
  hmmm: [
    'The oracle sees two paths, both veiled.',
    'Even the East wind hesitates here.',
    'This question has no clean answer — only options.',
    'The tiles are silent on this one.',
    'Consult your gut; the oracle abstains.',
    'A fog settles over the table.',
    'Ask again after the next draw.',
    'The moment is unclear. The wall knows more than we do.',
    'Both choices carry the same weight tonight.',
    'The oracle shrugs — and that is an answer too.',
    'Uncertainty is not the same as error.',
    'The wind changes. Ask again.',
    'There is wisdom in waiting.',
    'The pung forms and dissolves in the same breath.',
    'Even the ancients found this one tricky.',
  ],
};

// 44 % take · 42 % leave · 14 % hmmm
const WEIGHTS: [Bucket, number][] = [['take', 0.44], ['leave', 0.42], ['hmmm', 0.14]];

function weightedBucket(): Bucket {
  const r = Math.random();
  let acc = 0;
  for (const [b, w] of WEIGHTS) { acc += w; if (r < acc) return b; }
  return 'take';
}

function pickTile(lastIdx: number | null): { face: TileFace; idx: number } {
  const indices = TILE_POOL.map((_, i) => i).filter((i) => i !== lastIdx);
  const idx = indices[Math.floor(Math.random() * indices.length)];
  return { face: TILE_POOL[idx], idx };
}

function pickResponse(bucket: Bucket, recent: string[]): string {
  const pool = RESPONSES[bucket].filter((l) => !recent.includes(l));
  const src = pool.length > 0 ? pool : RESPONSES[bucket];
  return src[Math.floor(Math.random() * src.length)];
}

// ── Verdict styles ────────────────────────────────────────────────────────────
const VERDICT: Record<Bucket, { label: string; color: string; glowColor: string }> = {
  take:  { label: 'Keep it',    color: '#235836', glowColor: 'rgba(35,88,54,0.45)' },
  leave: { label: 'Discard it', color: '#b8302a', glowColor: 'rgba(184,48,42,0.35)' },
  hmmm:  { label: 'Unclear',    color: '#8A6A00', glowColor: 'rgba(138,106,0,0.30)' },
};

// ── Component ─────────────────────────────────────────────────────────────────
interface OracleResult { face: TileFace; bucket: Bucket; response: string }

export function MahjongOracle() {
  const [result, setResult]             = useState<OracleResult | null>(null);
  const [asked, setAsked]               = useState(false);
  const [animating, setAnimating]       = useState(false);
  const [verdictVisible, setVerdictVisible] = useState(false);

  const lastIdxRef      = useRef<number | null>(null);
  const recentRefs = useRef<Record<Bucket, string[]>>({ take: [], leave: [], hmmm: [] });

  function ask() {
    if (animating) return;
    const { face, idx } = pickTile(lastIdxRef.current);
    const bucket = weightedBucket();
    const recent = recentRefs.current[bucket];
    const response = pickResponse(bucket, recent);

    lastIdxRef.current = idx;
    recentRefs.current[bucket] = [...recent.slice(-2), response];

    setAnimating(true);
    setVerdictVisible(false);
    setResult({ face, bucket, response });
    setAsked(true);

    setTimeout(() => setVerdictVisible(true), 350);
    setTimeout(() => setAnimating(false), 450);
  }

  const v = result ? VERDICT[result.bucket] : null;

  return (
    <div className="flex flex-col items-center gap-8">

      {/* Orb ---------------------------------------------------------------- */}
      <button
        type="button"
        aria-label="Ask the Mahjong Oracle"
        onClick={ask}
        disabled={animating}
        className={[
          'relative rounded-full select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-4',
          animating ? 'scale-95' : 'hover:scale-[1.03] active:scale-[0.97]',
          'transition-all duration-200',
        ].join(' ')}
        style={{ width: 220, height: 220 }}
      >
        {/* Dark green orb */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at 40% 35%, #2d6b44 0%, #1c4a2a 45%, #111f16 100%)',
            boxShadow: `0 0 0 1.5px #1c4a2a, 0 12px 40px ${v ? v.glowColor : 'rgba(35,88,54,0.30)'}, inset 0 2px 8px rgba(255,255,255,0.10)`,
            transition: 'box-shadow 0.4s ease',
          }}
        />
        {/* Gloss */}
        <span
          aria-hidden
          className="absolute inset-[8px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 38% 28%, rgba(255,255,255,0.14) 0%, transparent 60%)' }}
        />
        {/* Tile */}
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {result ? (
            <span className={`transition-opacity duration-200 ${verdictVisible ? 'opacity-100' : 'opacity-0'}`}>
              <Tile face={result.face} size="lg" />
            </span>
          ) : (
            <span className="opacity-30">
              <Tile face={{ suit: 'character', value: 5 }} size="lg" />
            </span>
          )}
        </span>
      </button>

      {/* Prompt ------------------------------------------------------------ */}
      <p
        className="text-tertiary -mt-4 tracking-widest"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase' }}
      >
        {!asked ? 'Tap to ask the oracle' : 'Tap again to ask'}
      </p>

      {/* Verdict ------------------------------------------------------------ */}
      <div
        className={`flex flex-col items-center gap-4 transition-all duration-300 ${
          verdictVisible && result ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        aria-live="polite"
        aria-atomic="true"
        style={{ minHeight: 100 }}
      >
        {result && v && (
          <>
            {/* Label with flanking lines */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 opacity-25" style={{ background: v.color }} />
              <span
                className="tracking-[0.2em]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  color: v.color,
                }}
              >
                {v.label}
              </span>
              <div className="h-px w-8 opacity-25" style={{ background: v.color }} />
            </div>

            {/* Response */}
            <p
              className="text-center text-primary leading-relaxed"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, maxWidth: 300 }}
            >
              {result.response}
            </p>
          </>
        )}
      </div>

    </div>
  );
}
