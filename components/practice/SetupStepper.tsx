'use client';

import { useState } from 'react';
import { StepPills } from '@/components/StepPills';
import type { WindValue } from '@/lib/tiles';
import { PickSeats, WindTile } from './PickSeats';
import { DealHands, DealHandsAction, useDealHands } from './DealHands';
import { RoundDemo, RoundDemoAction, useRoundDemo } from './RoundDemo';
import { Dice, rollDie, type DiceValues } from './Dice';

type SetupStep = 'pick-seats' | 'deal-hands' | 'first-round';

const STEPS: Array<{ id: SetupStep; label: string }> = [
  { id: 'pick-seats',  label: 'Pick seats' },
  { id: 'deal-hands',  label: 'Deal hands' },
  { id: 'first-round', label: 'First round' },
];

const INSTRUCTIONS: Record<SetupStep, { title: string; body: string }> = {
  'pick-seats': {
    title: 'Pick a seat.',
    body:
      'Four wind tiles are face-down in the center. Click any one to draw your seat. The other three winds settle around the table counter-clockwise.',
  },
  'deal-hands': {
    title: 'Roll, then deal.',
    body:
      'Roll the dice to choose where the wall breaks. Then deal four tiles at a time, clockwise from East. East ends with 14 tiles; everybody else with 13.',
  },
  'first-round': {
    title: 'Watch the first round.',
    body:
      'Step through a scripted round: players draw from the front wall, reveal flowers, and draw replacements from the back.',
  },
};

const WIND_LABELS: Record<WindValue, string> = { east: 'East', south: 'South', west: 'West', north: 'North' };
const PLAYER_NUMS: Record<WindValue, number> = { east: 1, south: 2, west: 3, north: 4 };
const CCW_ORDER: WindValue[] = ['east', 'south', 'west', 'north'];

function seatFromSum(sum: number): WindValue {
  return CCW_ORDER[(4 - ((sum - 1) % 4)) % 4];
}

export function SetupStepper() {
  const [step, setStep] = useState<SetupStep>('pick-seats');
  const [yourSeat, setYourSeat] = useState<WindValue | null>(null);
  const [dice, setDice] = useState<DiceValues | null>(null);
  const [dealReady, setDealReady] = useState(false);

  const roundDemoState = useRoundDemo();

  const dealState = useDealHands({
    yourSeat: yourSeat ?? 'east',
    onComplete: () => setDealReady(true),
    onReset: () => setDealReady(false),
  });

  const canContinue =
    step === 'pick-seats' ? Boolean(yourSeat) :
    step === 'deal-hands' ? dealReady :
    true;

  function handleRoll() {
    const d: DiceValues = [rollDie(), rollDie(), rollDie()];
    setDice(d);
    setYourSeat(seatFromSum(d[0] + d[1] + d[2]));
  }

  function next() {
    const i = STEPS.findIndex((s) => s.id === step);
    if (i < STEPS.length - 1) setStep(STEPS[i + 1].id);
  }
  function back() {
    const i = STEPS.findIndex((s) => s.id === step);
    // In step 2 with dice already rolled, just reset back to unrolled state
    if (step === 'deal-hands' && dealState.phase !== 'await-roll') {
      dealState.resetDeal();
      setDealReady(false);
      return;
    }
    if (i > 0) {
      if (step === 'first-round') {
        // Going back from step 3 → step 2: keep seat/dice, just reset deal/round progress
        dealState.resetDeal();
        roundDemoState.resetRound();
        setDealReady(false);
        setStep('deal-hands');
        return;
      }
      setYourSeat(null);
      setDice(null);
      setDealReady(false);
      dealState.resetDeal();
      setStep(STEPS[i - 1].id);
    } else {
      setYourSeat(null);
      setDice(null);
      setDealReady(false);
      dealState.resetDeal();
    }
  }
  function reset() {
    setStep('pick-seats');
    setYourSeat(null);
    setDice(null);
    setDealReady(false);
    dealState.resetDeal();
    roundDemoState.resetRound();
  }

  const diceSum = dice ? dice[0] + dice[1] + dice[2] : null;

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-8">
      <header className="mb-6 flex items-center justify-between gap-4">
        <nav aria-label="Breadcrumb" className="text-ui text-tertiary">
          <span className="text-secondary">Interactive room</span>
          <span className="mx-1.5">›</span>
          <span>Setup walkthrough</span>
        </nav>
        <button
          type="button"
          onClick={reset}
          className="text-ui text-tertiary hover:text-primary"
        >
          Reset
        </button>
      </header>

      <div className="mb-6">
        <StepPills steps={STEPS} current={step} />
      </div>

      <div className="mb-6" aria-live="polite">
        <h2 className="font-serif text-h1 font-medium mb-2">{INSTRUCTIONS[step].title}</h2>
        <p className="font-serif italic text-lead text-secondary">{INSTRUCTIONS[step].body}</p>
      </div>

      {step === 'pick-seats' ? (
        <div className="flex gap-4 items-start mb-6">
          <div className="flex-1 rounded-lg bg-elev hairline-strong border p-4 md:p-6">
            <PickSeats yourSeat={yourSeat} />
          </div>
          <div className="self-stretch bg-elev border border-brand-green/20 rounded-xl px-4 flex flex-col items-start gap-3 min-w-[190px] pt-[84px] md:pt-[92px] pb-4">
            {!yourSeat ? (
              <>
                <div className="text-ui font-medium text-primary text-[13px] whitespace-nowrap">Roll to assign seats</div>
                <button
                  type="button"
                  onClick={handleRoll}
                  className="hover:opacity-75 transition-opacity cursor-pointer"
                  aria-label="Roll dice to assign seats"
                >
                  <Dice values={dice} size={22} />
                </button>
              </>
            ) : (
              <>
                <div className="text-ui font-medium text-primary text-[13px] whitespace-nowrap">Click &ldquo;Back&rdquo; to re-roll</div>
                <div className="flex items-center gap-3">
                  <div className="opacity-40" aria-label="Rolled dice">
                    <Dice values={dice} size={22} />
                  </div>
                  {diceSum && <span className="text-ui font-medium text-primary">{diceSum}</span>}
                </div>
              </>
            )}
            <div className="mt-auto">
              <button
                type="button"
                onClick={next}
                disabled={!canContinue}
                className="px-4 py-2 rounded-md bg-brand-green text-brand-cream text-ui font-medium hover:bg-brand-greenDeep disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          </div>
        </div>
      ) : step === 'deal-hands' && yourSeat ? (
        <div className="flex gap-4 items-start mb-6">
          <div className="flex-1 rounded-lg bg-elev hairline-strong border p-4 md:p-6">
            <DealHands yourSeat={yourSeat} state={dealState} />
          </div>
          <DealHandsAction state={dealState} footer={
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className="px-4 py-2 rounded-md bg-brand-green text-brand-cream text-ui font-medium hover:bg-brand-greenDeep disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          } />
        </div>
      ) : (
        <div className="flex gap-4 items-start mb-6">
          <div className="flex-1 rounded-lg bg-elev hairline-strong border p-4 md:p-6">
            {step === 'first-round' && yourSeat && <RoundDemo yourSeat={yourSeat} state={roundDemoState} />}
          </div>
          {step === 'first-round' && <RoundDemoAction state={roundDemoState} footer={
            <button
              type="button"
              onClick={reset}
              disabled={!roundDemoState.isComplete}
              className="px-4 py-2 rounded-md bg-brand-green text-brand-cream text-ui font-medium hover:bg-brand-greenDeep disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Restart tutorial →
            </button>
          } />}
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={back}
          className="px-4 py-2 rounded-md text-ui text-secondary hover:text-primary"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
