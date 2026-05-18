'use client';

import { useState } from 'react';
import { StepPills } from '@/components/StepPills';
import type { WindValue } from '@/lib/tiles';
import { PickSeats, WindTile } from './PickSeats';
import { DealHands, DealHandsAction, useDealHands } from './DealHands';
import { Dice, rollDie, type DiceValues } from './Dice';
import { PrimaryButton } from './PrimaryButton';
import { BuildWallsDisplay, BuildWallsAction, useBuildWalls } from './BuildWalls';

type SetupStep = 'pick-seats' | 'build-walls' | 'deal-hands';

const STEPS: Array<{ id: SetupStep; label: string }> = [
  { id: 'pick-seats',  label: 'Pick seats' },
  { id: 'build-walls', label: 'Build walls' },
  { id: 'deal-hands',  label: 'Deal hands' },
];

const INSTRUCTIONS: Record<SetupStep, { title: string; body: string }> = {
  'pick-seats': {
    title: 'Take your seat.',
    body:
      'Roll the dice. The total decides your wind — East, South, West, or North — and places you at the table. The other three winds follow counter-clockwise.',
  },
  'build-walls': {
    title: 'Shuffle and build.',
    body:
      'Players shuffle all tiles face-down, then each builds a wall in front of them — 18 tiles wide and 2 tiles high.',
  },
  'deal-hands': {
    title: 'Roll, then deal.',
    body:
      'Roll the dice to choose where the wall breaks. Then deal four tiles at a time, clockwise from East. East ends with 14 tiles; everybody else with 13.',
  },
};

const WIND_LABELS: Record<WindValue, string> = { east: 'East', south: 'South', west: 'West', north: 'North' };
const PLAYER_NUMS: Record<WindValue, number> = { east: 1, south: 2, west: 3, north: 4 };
const CCW_ORDER: WindValue[] = ['east', 'south', 'west', 'north'];

function seatFromSum(sum: number): WindValue {
  return CCW_ORDER[(4 - ((sum - 1) % 4)) % 4];
}

function seatExplanation(sum: number, seat: WindValue): string {
  const pos = (sum - 1) % 4 + 1; // 1=you, 2=right, 3=across, 4=left
  const playerNum = PLAYER_NUMS[seat];
  const wind = WIND_LABELS[seat];

  const posLabel =
    pos === 1 ? 'yourself'
    : pos === 2 ? 'the player to your right'
    : pos === 3 ? 'the player across from you'
    : 'the player to your left';

  if (pos === 1) {
    return `You rolled ${sum}. Count anti-clockwise starting from yourself — you are 1, the player to your right is 2, and so on. Count ${sum} lands back on yourself. You are East — player 1.`;
  }

  return `You rolled ${sum}. Count anti-clockwise starting from yourself — you are 1, the player to your right is 2, and so on. Count ${sum} lands on ${posLabel}. They are East — player 1. You are player ${playerNum} — ${wind}.`;
}

export function SetupStepper({ onComplete }: { onComplete?: () => void } = {}) {
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

  const canContinue =
    step === 'pick-seats' ? Boolean(yourSeat) :
    step === 'build-walls' ? true :
    dealReady;

  function handleRoll() {
    const d: DiceValues = [rollDie(), rollDie(), rollDie()];
    setDice(d);
    setYourSeat(seatFromSum(d[0] + d[1] + d[2]));
  }

  function next() {
    const i = STEPS.findIndex((s) => s.id === step);
    if (i < STEPS.length - 1) setStep(STEPS[i + 1].id);
  }
  // true when already at the very beginning of step 1 — nothing to go back to
  const atStart = step === 'pick-seats' && yourSeat === null;

  function back() {
    if (step === 'pick-seats') {
      // during step 1: reset to beginning
      setYourSeat(null);
      setDice(null);
      return;
    }
    if (step === 'build-walls') {
      if (buildWallsState.shuffleCount === 0 && !buildWallsState.wallsBuilt) {
        // already at beginning of step 2 → end of step 1 (seat chosen)
        setStep('pick-seats');
      } else {
        // during step 2 → reset to beginning
        buildWallsState.reset();
      }
      return;
    }
    if (step === 'deal-hands') {
      if (dealState.phase === 'await-roll') {
        // already at beginning of step 3 → end of step 2 (walls built)
        setStep('build-walls');
      } else {
        // during step 3 → reset to beginning
        dealState.resetDeal();
        setDealReady(false);
      }
      return;
    }
  }
  function reset() {
    setStep('pick-seats');
    setYourSeat(null);
    setDice(null);
    setDealReady(false);
    buildWallsState.reset();
    dealState.resetDeal();
  }

  const diceSum = dice ? dice[0] + dice[1] + dice[2] : null;

  return (
    <div>
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <StepPills steps={STEPS} current={step} />
          <button
            type="button"
            onClick={reset}
            title="Reset"
            aria-label="Reset"
            className="text-tertiary hover:text-primary transition-colors p-1 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>
      </header>

      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: '#2C2A26', marginBottom: 24 }} aria-live="polite">
        {INSTRUCTIONS[step].title} {INSTRUCTIONS[step].body}
      </p>

      {step === 'pick-seats' ? (
        <div className="mb-6">
          <div className="rounded-lg bg-elev hairline-strong border px-6 pt-10 pb-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 min-w-0 md:min-h-[483px]">
              <PickSeats yourSeat={yourSeat} />
            </div>
            <div className="w-full md:w-[180px] shrink-0 md:self-stretch border-t md:border-t-0 md:border-l border-brand-green/20 pt-4 md:pt-0 md:pl-5 flex flex-col gap-3">
              {!yourSeat ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="text-ui font-medium text-primary text-[13px]">Roll to assign seats</div>
                    <button type="button" onClick={back} disabled={atStart} className="text-ui text-[11px] text-tertiary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed">←</button>
                  </div>
                  <button
                    type="button"
                    onClick={handleRoll}
                    className="hover:opacity-75 transition-opacity cursor-pointer self-start"
                    aria-label="Roll dice to assign seats"
                  >
                    <Dice values={dice} size={22} />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="text-ui font-medium text-primary text-[13px]">Click &ldquo;Back&rdquo; to re-roll</div>
                    <button type="button" onClick={back} disabled={atStart} className="text-ui text-[11px] text-tertiary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed">←</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="opacity-40" aria-label="Rolled dice">
                      <Dice values={dice} size={22} />
                    </div>
                    {diceSum && <span className="text-ui font-medium text-primary">{diceSum}</span>}
                  </div>
                </>
              )}
              <div className="border-t border-brand-green/20 pt-1">
                <p className="text-[11px] text-secondary leading-relaxed">
                  {!yourSeat
                    ? 'Roll to randomly assign seats. The dice total maps to a wind — East, South, West, or North — placing you at the table.'
                    : seatExplanation(diceSum!, yourSeat)
                  }
                </p>
              </div>
              <div className="flex-1 min-h-0" />
              <div className="border-t border-brand-green/20 pt-2">
                <PrimaryButton onClick={next} disabled={!canContinue}>Continue</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      ) : step === 'build-walls' && yourSeat ? (
        <div className="mb-6">
          <div className="rounded-lg bg-elev hairline-strong border px-6 pt-10 pb-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 min-w-0 md:min-h-[483px]">
              <BuildWallsDisplay yourSeat={yourSeat} state={buildWallsState} />
            </div>
            <div className="w-full md:w-[180px] shrink-0 md:self-stretch border-t md:border-t-0 md:border-l border-brand-green/20 pt-4 md:pt-0 md:pl-5 flex flex-col">
              <BuildWallsAction
                state={buildWallsState}
                onContinue={next}
                back={back}
              />
            </div>
          </div>
        </div>
      ) : step === 'deal-hands' && yourSeat ? (
        <div className="mb-6">
          <div className="rounded-lg bg-elev hairline-strong border px-6 pt-10 pb-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 min-w-0 md:min-h-[483px]">
              <DealHands yourSeat={yourSeat} state={dealState} />
            </div>
            <div className="w-full md:w-[180px] shrink-0 md:self-stretch border-t md:border-t-0 md:border-l border-brand-green/20 pt-4 md:pt-0 md:pl-5 flex flex-col">
              <DealHandsAction state={dealState}
                back={<button type="button" onClick={back} disabled={atStart} className="text-ui text-[11px] text-tertiary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed">←</button>}
                footer={
                  dealReady ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#235836', margin: 0 }}>Setup complete ✓</p>
                      {onComplete && (
                        <button
                          type="button"
                          onClick={onComplete}
                          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'none', border: 'none', padding: 0, color: '#7a7a6a', cursor: 'pointer', textAlign: 'left' }}
                        >
                          0-point game →
                        </button>
                      )}
                    </div>
                  ) : (
                    <PrimaryButton onClick={next} disabled={!canContinue}>Continue</PrimaryButton>
                  )
                }
 />
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}
