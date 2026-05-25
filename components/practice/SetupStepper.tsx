'use client';

import { useState, useEffect } from 'react';
import type { WindValue } from '@/lib/tiles';
import { PickSeats } from './PickSeats';
import { DealHands, useDealHands } from './DealHands';
import { Dice, rollDie, type DiceValues } from './Dice';
import { PrimaryButton } from './PrimaryButton';
import { BuildWallsDisplay, useBuildWalls } from './BuildWalls';

export type SetupStep = 'pick-seats' | 'build-walls' | 'break-wall' | 'deal-hands';

export const SETUP_STEPS: Array<{ id: SetupStep; label: string }> = [
  { id: 'pick-seats',  label: 'Roll seats' },
  { id: 'build-walls', label: 'Build walls' },
  { id: 'break-wall',  label: 'Break the wall' },
  { id: 'deal-hands',  label: 'Deal hands' },
];

const INSTRUCTIONS: Record<SetupStep, { title: string; body: string }> = {
  'pick-seats': {
    title: 'Take your seat.',
    body: 'Roll the dice. The total decides your wind — East, South, West, or North — and places you at the table. The other three winds follow counter-clockwise.',
  },
  'build-walls': {
    title: 'Shuffle and build.',
    body: 'Players shuffle all tiles face-down, then each builds a wall in front of them — 18 tiles wide and 2 tiles high.',
  },
  'break-wall': {
    title: 'Break the wall.',
    body: 'East rolls again. The total maps to a wall and a position along it — that gap is where dealing begins.',
  },
  'deal-hands': {
    title: 'Roll, then deal.',
    body: 'Deal four tiles at a time, clockwise from East. East ends with 14 tiles; everybody else with 13.',
  },
};

const WIND_LABELS: Record<WindValue, string> = { east: 'East', south: 'South', west: 'West', north: 'North' };
const PLAYER_NUMS: Record<WindValue, number> = { east: 1, south: 2, west: 3, north: 4 };
const CCW_ORDER: WindValue[] = ['east', 'south', 'west', 'north'];

function seatFromSum(sum: number): WindValue {
  // East=1,5,9,13,17 · South=2,6,10,14,18 · West=3,7,11,15 · North=4,8,12,16
  return CCW_ORDER[(sum - 1) % 4];
}

function seatExplanation(sum: number, seat: WindValue): string {
  const pos = (sum - 1) % 4 + 1;
  const wind = WIND_LABELS[seat];
  return `Player 1 rolls. Count counter-clockwise starting from Player 1 — Player 1 is 1, Player 2 is 2, and so on. Roll of ${sum} lands on Player ${pos} — they become ${wind}.`;
}

interface SetupStepperProps {
  onComplete?: () => void;
  onStepChange?: (step: SetupStep, index: number) => void;
}

const CN_WIND: Record<WindValue, string> = { east: '東', south: '南', west: '西', north: '北' };

// East=1,5,9,13,17 · South=2,6,10,14,18 · West=3,7,11,15 · North=4,8,12,16
const WIND_TOTALS: Record<WindValue, number[]> = {
  east:  [1, 5, 9, 13, 17],
  south: [2, 6, 10, 14, 18],
  west:  [3, 7, 11, 15],
  north: [4, 8, 12, 16],
};

export function SetupStepper({ onComplete, onStepChange }: SetupStepperProps = {}) {
  const [step, setStep] = useState<SetupStep>('pick-seats');
  const [yourSeat, setYourSeat] = useState<WindValue | null>(null);
  const [dice, setDice] = useState<DiceValues | null>(null);
  const [dealReady, setDealReady] = useState(false);

  const buildWallsState = useBuildWalls();
  const dealState = useDealHands({
    yourSeat: yourSeat ?? 'east',
    onComplete: () => setDealReady(true),
    onReset: () => setDealReady(false),
  });

  // report step changes up to parent (for nav pill display)
  useEffect(() => {
    const index = SETUP_STEPS.findIndex(s => s.id === step);
    onStepChange?.(step, index);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const canContinue =
    step === 'pick-seats'  ? Boolean(yourSeat) :
    step === 'build-walls' ? true :
    step === 'break-wall'  ? dealState.phase === 'await-deal' :
    dealReady;

  function handleRoll() {
    const d: DiceValues = [rollDie(), rollDie(), rollDie()];
    setDice(d);
    setYourSeat(seatFromSum(d[0] + d[1] + d[2]));
  }

  function next() {
    const i = SETUP_STEPS.findIndex((s) => s.id === step);
    if (i < SETUP_STEPS.length - 1) setStep(SETUP_STEPS[i + 1].id);
  }

  const atStart = step === 'pick-seats' && yourSeat === null;

  function back() {
    if (step === 'pick-seats') { setYourSeat(null); setDice(null); return; }
    if (step === 'build-walls') {
      if (buildWallsState.shuffleCount === 0 && !buildWallsState.wallsBuilt) setStep('pick-seats');
      else buildWallsState.reset();
      return;
    }
    if (step === 'break-wall') {
      if (dealState.phase === 'await-roll') setStep('build-walls');
      else dealState.resetDeal();
      return;
    }
    if (step === 'deal-hands') {
      if (dealState.phase === 'await-deal') { setStep('break-wall'); return; }
      dealState.resetDeal();
      setDealReady(false);
      setStep('break-wall');
      return;
    }
  }

  const diceSum = dice ? dice[0] + dice[1] + dice[2] : null;

  return (
    <div>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: '#2C2A26', marginBottom: 24 }} aria-live="polite">
        {INSTRUCTIONS[step].title} {INSTRUCTIONS[step].body}
      </p>

      {step === 'pick-seats' ? (
        <div className="mb-3">
          <div className="rounded-lg bg-elev hairline-strong border px-6 pt-5 pb-6 flex flex-col md:flex-row gap-6 items-start" style={{ overflow: 'visible' }}>
            {/* Board */}
            <div className="flex-1 min-w-0 w-full md:w-auto md:min-h-[360px] overflow-visible">
              {/* Eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b8302a', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7a7a6a' }}>Table wind: East · Scripted round</span>
              </div>
              <PickSeats yourSeat={yourSeat} />
            </div>
            {/* Panel */}
            <div className="w-full md:w-[260px] shrink-0 md:self-stretch border-t md:border-t-0 md:border-l border-brand-green/20 pt-5 md:pt-0 md:pl-6 flex flex-col">
              {/* Eyebrow */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9d9d8a', marginBottom: 8 }}>
                Step 1 of 4 · Roll the dice
              </div>
              {/* Heading */}
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 500, lineHeight: 1.1, color: '#16170f', marginBottom: 10, letterSpacing: '-0.01em' }}>
                Roll to <em style={{ fontStyle: 'italic', color: '#1c4a2a' }}>assign seats</em>
              </h2>
              {/* Lede */}
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, color: '#44463a', marginBottom: 16 }}>
                Player 1 rolls three dice. Count counter-clockwise from Player 1 — the total lands on a player, who becomes East. The other winds follow from there.
              </p>

              {/* Roll card (shown after rolling) */}
              {yourSeat && diceSum ? (
                <div style={{ background: '#fcfaf3', border: '1px solid rgba(28,74,42,0.14)', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d9d8a' }}>Your roll</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', color: '#9d9d8a' }}>
                      {(() => { const d = new Date(); return `${d.getFullYear()}·${String(d.getMonth()+1).padStart(2,'0')}·${String(d.getDate()).padStart(2,'0')}`; })()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <Dice values={dice} size={36} />
                    <button type="button" onClick={handleRoll}
                      style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: '#7a7a6a', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}
                      className="hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M2 8a6 6 0 1 0 1.76-4.24"/><path d="M2 2v4h4"/>
                      </svg>
                      Roll again
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 600, color: '#16170f', lineHeight: 1 }}>{diceSum}</span>
                    <span style={{ color: '#9d9d8a', fontSize: 18, lineHeight: 1 }}>→</span>
                    <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 24, fontWeight: 700, color: '#235836', lineHeight: 1 }}>{CN_WIND[yourSeat]}</span>
                    <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, color: '#1c4a2a', lineHeight: 1 }}>{WIND_LABELS[yourSeat]}</em>
                  </div>
                </div>
              ) : (
                /* Dice roll button before rolling */
                <div style={{ marginBottom: 14 }}>
                  <button type="button" onClick={handleRoll}
                    className="hover:opacity-75 transition-opacity cursor-pointer"
                    aria-label="Roll dice to assign seats">
                    <Dice values={dice} size={38} />
                  </button>
                </div>
              )}

              {/* Wind legend grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                border: '1px solid rgba(28,74,42,0.14)',
                borderRadius: 8,
                overflow: 'hidden',
                marginBottom: 16,
              }}>
                {(['east', 'south', 'west', 'north'] as WindValue[]).map((w, i) => {
                  const isHit = yourSeat === w;
                  return (
                    <div key={w} style={{
                      background: isHit ? 'rgba(28,74,42,0.07)' : '#fcfaf3',
                      padding: '9px 6px',
                      textAlign: 'center',
                      borderRight: i < 3 ? '1px solid rgba(28,74,42,0.12)' : 'none',
                    }}>
                      <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 20, fontWeight: 700, color: isHit ? '#1c4a2a' : '#44463a', marginBottom: 3, lineHeight: 1 }}>
                        {CN_WIND[w]}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9d9d8a', marginBottom: 5 }}>
                        {WIND_LABELS[w]}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#7a7a6a', lineHeight: 1.6 }}>
                        {WIND_TOTALS[w].join(', ')}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex-1 min-h-0" />

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 14, borderTop: '1px solid rgba(28,74,42,0.1)' }}>
                {yourSeat ? (
                  <button type="button" onClick={back}
                    style={{ fontFamily: 'var(--font-serif)', fontSize: 12, color: '#7a7a6a', background: 'none', border: '1px solid rgba(28,74,42,0.2)', borderRadius: 6, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', flexShrink: 0, transition: 'border-color 0.15s, color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,74,42,0.45)'; (e.currentTarget as HTMLElement).style.color = '#235836'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,74,42,0.2)'; (e.currentTarget as HTMLElement).style.color = '#7a7a6a'; }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M10 3L5 8l5 5"/>
                    </svg>
                    Back
                  </button>
                ) : <span />}
                <div style={{ flex: 1 }}>
                  <PrimaryButton onClick={next} disabled={!canContinue}>Continue →</PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : step === 'build-walls' && yourSeat ? (
        <div className="mb-3">
          <div className="rounded-lg bg-elev hairline-strong border px-6 pt-5 pb-4 flex flex-col md:flex-row gap-6 items-start" style={{ overflow: 'visible' }}>
            <div className="flex-1 min-w-0 w-full md:w-auto md:min-h-[360px]" style={{ overflow: 'visible' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b8302a', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7a7a6a' }}>Table wind: East · Scripted round</span>
              </div>
              <BuildWallsDisplay yourSeat={yourSeat} state={buildWallsState} />
            </div>
            <div className="w-full md:w-[260px] shrink-0 md:self-stretch border-t md:border-t-0 md:border-l border-brand-green/20 pt-5 md:pt-0 md:pl-6 flex flex-col">
              {/* Eyebrow */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9d9d8a', marginBottom: 8 }}>
                Step 2 of 4 · Shuffle &amp; build
              </div>
              {/* Heading */}
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 500, lineHeight: 1.1, color: '#16170f', marginBottom: 10, letterSpacing: '-0.01em' }}>
                Build the <em style={{ fontStyle: 'italic', color: '#1c4a2a' }}>walls</em>
              </h2>
              {/* Lede */}
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, color: '#44463a', marginBottom: 16 }}>
                Shuffle all tiles face-down — click the pile to mix. Each player builds a wall 18 tiles wide and 2 high in front of them.
              </p>
              {/* Content */}
              {buildWallsState.wallsBuilt ? (
                <div style={{ background: '#fcfaf3', border: '1px solid rgba(28,74,42,0.14)', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d9d8a', marginBottom: 6 }}>Status</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: '#235836', fontWeight: 500 }}>4 walls · 18 × 2 ✓</div>
                </div>
              ) : (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                    {[1, 2, 3].map(n => (
                      <div key={n} style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: buildWallsState.shuffleCount >= n ? '#1c4a2a' : 'rgba(28,74,42,0.08)',
                        border: `1px solid ${buildWallsState.shuffleCount >= n ? '#1c4a2a' : 'rgba(28,74,42,0.18)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: buildWallsState.shuffleCount >= n ? '#faf6ec' : '#9d9d8a' }}>{n}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: '#7a7a6a', lineHeight: 1.5, margin: 0 }}>
                    {buildWallsState.shuffleCount < 3
                      ? `Click the tile pile ${3 - buildWallsState.shuffleCount} more time${3 - buildWallsState.shuffleCount > 1 ? 's' : ''} to shuffle.`
                      : 'Ready to build.'}
                  </p>
                </div>
              )}
              <div className="flex-1 min-h-0" />
              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 14, borderTop: '1px solid rgba(28,74,42,0.1)' }}>
                <button type="button" onClick={back}
                  style={{ fontFamily: 'var(--font-serif)', fontSize: 12, color: '#7a7a6a', background: 'none', border: '1px solid rgba(28,74,42,0.2)', borderRadius: 6, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', flexShrink: 0, transition: 'border-color 0.15s, color 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,74,42,0.45)'; (e.currentTarget as HTMLElement).style.color = '#235836'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,74,42,0.2)'; (e.currentTarget as HTMLElement).style.color = '#7a7a6a'; }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M10 3L5 8l5 5"/>
                  </svg>
                  Back
                </button>
                <div style={{ flex: 1 }}>
                  {buildWallsState.wallsBuilt
                    ? <PrimaryButton onClick={next}>Continue →</PrimaryButton>
                    : <PrimaryButton onClick={buildWallsState.buildWalls} disabled={!buildWallsState.canBuild}>Build walls</PrimaryButton>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : step === 'break-wall' && yourSeat ? (
        <div className="mb-3">
          <div className="rounded-lg bg-elev hairline-strong border px-6 pt-5 pb-4 flex flex-col md:flex-row gap-6 items-start" style={{ overflow: 'visible' }}>
            <div className="flex-1 min-w-0 w-full md:w-auto md:min-h-[360px]" style={{ overflow: 'visible' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b8302a', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7a7a6a' }}>Table wind: East · Scripted round</span>
              </div>
              <DealHands yourSeat={yourSeat} state={dealState} />
            </div>
            <div className="w-full md:w-[260px] shrink-0 md:self-stretch border-t md:border-t-0 md:border-l border-brand-green/20 pt-5 md:pt-0 md:pl-6 flex flex-col">
              {/* Eyebrow */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9d9d8a', marginBottom: 8 }}>
                Step 3 of 4 · Break the wall
              </div>
              {/* Heading */}
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 500, lineHeight: 1.1, color: '#16170f', marginBottom: 10, letterSpacing: '-0.01em' }}>
                Break the <em style={{ fontStyle: 'italic', color: '#1c4a2a' }}>wall</em>
              </h2>
              {/* Lede */}
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, color: '#44463a', marginBottom: 16 }}>
                East rolls again. The total maps to a wall and a position — that gap is where dealing begins.
              </p>
              {/* Roll card or dice button */}
              {dealState.phase !== 'await-roll' && dealState.diceSum > 0 ? (
                <div style={{ background: '#fcfaf3', border: '1px solid rgba(28,74,42,0.14)', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d9d8a' }}>East&apos;s roll</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <Dice values={dealState.dice} size={36} />
                    <button type="button" onClick={dealState.roll}
                      style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: '#7a7a6a', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}
                      className="hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M2 8a6 6 0 1 0 1.76-4.24"/><path d="M2 2v4h4"/>
                      </svg>
                      Roll again
                    </button>
                  </div>
                  {dealState.breakInfo && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 600, color: '#16170f', lineHeight: 1 }}>{dealState.diceSum}</span>
                        <span style={{ color: '#9d9d8a', fontSize: 18, lineHeight: 1 }}>→</span>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: '#235836', fontWeight: 500 }}>{WIND_LABELS[dealState.breakInfo.wall]} wall · pos {dealState.breakInfo.pos}</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 12, lineHeight: 1.6, color: '#7a7a6a', margin: 0 }}>
                        {(() => {
                          const sum = dealState.diceSum;
                          const wallPos = (sum - 1) % 4 + 1;
                          const wallName = WIND_LABELS[dealState.breakInfo!.wall];
                          const pos = dealState.breakInfo!.pos;
                          const relLabel = wallPos === 1 ? "East's own wall" : wallPos === 2 ? "the wall to East's right" : wallPos === 3 ? "the wall across" : "the wall to East's left";
                          return `East counts anti-clockwise — ${sum} lands on ${relLabel} (${wallName}). Count ${pos} tiles from the right end to find the gap. Dealing starts from there.`;
                        })()}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div style={{ marginBottom: 14 }}>
                  <button type="button" onClick={dealState.roll}
                    className="hover:opacity-75 transition-opacity cursor-pointer"
                    aria-label="Roll dice to break the wall">
                    <Dice values={dealState.dice} size={38} />
                  </button>
                </div>
              )}
              <div className="flex-1 min-h-0" />
              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 14, borderTop: '1px solid rgba(28,74,42,0.1)' }}>
                <button type="button" onClick={back}
                  style={{ fontFamily: 'var(--font-serif)', fontSize: 12, color: '#7a7a6a', background: 'none', border: '1px solid rgba(28,74,42,0.2)', borderRadius: 6, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', flexShrink: 0, transition: 'border-color 0.15s, color 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,74,42,0.45)'; (e.currentTarget as HTMLElement).style.color = '#235836'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,74,42,0.2)'; (e.currentTarget as HTMLElement).style.color = '#7a7a6a'; }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M10 3L5 8l5 5"/>
                  </svg>
                  Back
                </button>
                <div style={{ flex: 1 }}>
                  <PrimaryButton onClick={next} disabled={!canContinue}>Continue →</PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : step === 'deal-hands' && yourSeat ? (
        <div className="mb-3">
          <div className="rounded-lg bg-elev hairline-strong border px-6 pt-5 pb-4 flex flex-col md:flex-row gap-6 items-start" style={{ overflow: 'visible' }}>
            <div className="flex-1 min-w-0 w-full md:w-auto md:min-h-[360px]" style={{ overflow: 'visible' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b8302a', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7a7a6a' }}>Table wind: East · Scripted round</span>
              </div>
              <DealHands yourSeat={yourSeat} state={dealState} />
            </div>
            <div className="w-full md:w-[260px] shrink-0 md:self-stretch border-t md:border-t-0 md:border-l border-brand-green/20 pt-5 md:pt-0 md:pl-6 flex flex-col">
              {/* Eyebrow */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9d9d8a', marginBottom: 8 }}>
                Step 4 of 4 · Deal hands
              </div>
              {/* Heading */}
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 500, lineHeight: 1.1, color: '#16170f', marginBottom: 10, letterSpacing: '-0.01em' }}>
                Deal the <em style={{ fontStyle: 'italic', color: '#1c4a2a' }}>hands</em>
              </h2>
              {/* Lede */}
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, color: '#44463a', marginBottom: 16 }}>
                Four tiles at a time, clockwise from East. East ends with 14 tiles; everyone else with 13.
              </p>
              {/* Status card */}
              <div style={{ background: '#fcfaf3', border: '1px solid rgba(28,74,42,0.14)', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
                {dealState.phase === 'await-deal' && dealState.breakInfo && (
                  <>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d9d8a', marginBottom: 6 }}>Break point</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 500, color: '#235836' }}>
                      {WIND_LABELS[dealState.breakInfo.wall]} wall · pos {dealState.breakInfo.pos}
                    </div>
                  </>
                )}
                {dealState.phase === 'dealing' && (
                  <>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d9d8a', marginBottom: 6 }}>Now dealing</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 500, color: '#16170f' }}>{dealState.dealStep > 0 ? `Step ${dealState.dealStep}` : '—'}</div>
                  </>
                )}
                {dealState.phase === 'dealt' && (
                  <>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d9d8a', marginBottom: 6 }}>Status</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 500, color: '#235836' }}>All tiles dealt ✓</div>
                  </>
                )}
              </div>
              <div className="flex-1 min-h-0" />
              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 14, borderTop: '1px solid rgba(28,74,42,0.1)' }}>
                <button type="button" onClick={back}
                  style={{ fontFamily: 'var(--font-serif)', fontSize: 12, color: '#7a7a6a', background: 'none', border: '1px solid rgba(28,74,42,0.2)', borderRadius: 6, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', flexShrink: 0, transition: 'border-color 0.15s, color 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,74,42,0.45)'; (e.currentTarget as HTMLElement).style.color = '#235836'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,74,42,0.2)'; (e.currentTarget as HTMLElement).style.color = '#7a7a6a'; }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M10 3L5 8l5 5"/>
                  </svg>
                  Back
                </button>
                <div style={{ flex: 1 }}>
                  {dealState.phase === 'await-deal' && <PrimaryButton onClick={dealState.startDeal}>Start dealing</PrimaryButton>}
                  {dealState.phase === 'dealing'    && <PrimaryButton onClick={dealState.nextStep}>Keep dealing</PrimaryButton>}
                  {dealState.phase === 'dealt'      && onComplete && <PrimaryButton onClick={onComplete}>0-point game →</PrimaryButton>}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Notes strip */}
      <div style={{
        marginTop: 32,
        paddingTop: 24,
        borderTop: '1px solid rgba(28,74,42,0.12)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px 40px',
      }}>
        {[
          {
            head: 'Why dice',
            body: 'Rolling removes individual bias. Nobody picks their own seat — the dice decide, randomly and fairly, every time.',
          },
          {
            head: 'The wind order',
            body: 'Seats are named East, South, West, North — always counter-clockwise from East. East is the dealer for the first hand.',
          },
          {
            head: 'Rounds rotate',
            body: 'After each hand, the dealer wind passes counter-clockwise. When East returns to the same player, one full round is complete.',
          },
        ].map(({ head, body }) => (
          <div key={head} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#235836', flexShrink: 0, display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1c4a2a' }}>{head}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.65, color: '#44463a', margin: 0 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
