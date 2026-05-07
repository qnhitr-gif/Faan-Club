import Link from 'next/link';
import { Tile } from '@/components/Tile';
import { Card } from '@/components/Card';
import type { TileFace } from '@/lib/tiles';

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pt-14 md:pt-24 pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <p className="text-ui text-tertiary uppercase tracking-widest mb-4">Hong Kong Mahjong</p>
            <h1 className="font-serif font-medium tracking-tight mb-5"
                style={{ fontSize: 'clamp(34px, 5vw, 52px)', lineHeight: 1.1 }}>
              Learn mahjong,<br />one hand at a time.
            </h1>
            <p className="font-serif italic text-lead text-secondary mb-8" style={{ maxWidth: '38ch' }}>
              A patient, visual guide to Hong Kong mahjong — from the first
              tile to the winning hand.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="inline-flex items-center px-5 py-2.5 rounded-md bg-brand-green text-brand-cream text-ui font-medium hover:bg-brand-greenDeep transition-colors"
              >
                Start learning
              </Link>
              <Link
                href="/practice/setup"
                className="inline-flex items-center px-5 py-2.5 rounded-md hairline-strong border text-primary text-ui font-medium hover:bg-info transition-colors"
              >
                Interactive room →
              </Link>
            </div>
          </div>

          {/* Tile fan */}
          <div className="hidden md:flex justify-end pr-4">
            <div className="relative" style={{ width: 280, height: 210 }}>
              <div className="absolute" style={{ left: 0,   top: 80,  transform: 'rotate(-14deg)' }}>
                <Tile size="lg" face={{ suit: 'wind', value: 'west' }} />
              </div>
              <div className="absolute" style={{ left: 52,  top: 32,  transform: 'rotate(-6deg)' }}>
                <Tile size="lg" face={{ suit: 'wind', value: 'north' }} />
              </div>
              <div className="absolute" style={{ left: 112, top: 16,  transform: 'rotate(2deg)' }}>
                <Tile size="lg" face={{ suit: 'wind', value: 'east' }} />
              </div>
              <div className="absolute" style={{ left: 174, top: 46,  transform: 'rotate(11deg)' }}>
                <Tile size="lg" face={{ suit: 'wind', value: 'south' }} />
              </div>
              <div className="absolute" style={{ left: 90,  top: 112, transform: 'rotate(-4deg)', opacity: 0.55 }}>
                <Tile size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What this covers ── */}
      <section className="border-y border-brand-green/20 bg-brand-green/5">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-14">
          <p className="text-ui text-tertiary uppercase tracking-widest mb-8">What this covers</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <Feature
              tile={{ suit: 'bamboo', value: 1 }}
              title="The 144 tiles"
              body="Learn the four suits, winds, dragons, flowers, and seasons — and how they form sets and pairs."
            />
            <Feature
              tile={{ suit: 'wind', value: 'east' }}
              title="The table"
              body="From shuffling to dealing to the first draw, follow every step of setup in real time."
            />
            <Feature
              tile={{ suit: 'dragon', value: 'green' }}
              title="Reading a hand"
              body="Spot pairs, sets, and bonus tiles. Practice figuring out what to keep and what to discard."
            />
          </div>
        </div>
      </section>

      {/* ── Three ways in ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-14 md:py-16">
        <p className="text-ui text-tertiary uppercase tracking-widest mb-6">Three ways in</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            href="/learn"
            eyebrow="Learn"
            title="Read the chapters"
            description="Start with what a tile is and finish knowing how a hand wins."
            meta="8 chapters · ~25 min"
          />
          <Card
            href="/practice/setup"
            eyebrow="Interactive room"
            title="Walk through setup"
            description="Pick a seat, roll the dice, deal a hand, then follow the first round — step by step."
            meta="Interactive · 3 steps"
            accent
          />
          <Card
            href="/practice"
            eyebrow="Practice"
            title="Tile efficiency drill"
            description="Draw a random hand, analyze your tiles, and work out the best discard."
            meta="Drill mode"
          />
        </div>
      </section>
    </div>
  );
}

function Feature({ tile, title, body }: { tile: TileFace; title: string; body: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="shrink-0 mt-0.5">
        <Tile face={tile} size="sm" />
      </div>
      <div>
        <h3 className="font-sans text-h3 font-medium text-primary mb-1">{title}</h3>
        <p className="text-body text-secondary">{body}</p>
      </div>
    </div>
  );
}
