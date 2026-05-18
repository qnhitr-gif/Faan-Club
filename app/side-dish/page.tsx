import type { Metadata } from 'next';
import { MahjongOracle } from '@/components/fun/MahjongOracle';

export const metadata: Metadata = {
  title: 'Side Dish — Faan Club',
};

export default function FunCornerPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-16">

      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 64, marginBottom: 20 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1c4a2a' }}>
          Fun corner
        </span>
        <div style={{ height: 1, width: 40, background: '#c8d8c9', flexShrink: 0 }} />
      </div>

      {/* Description */}
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.5, color: '#44463a', margin: '0 0 64px', fontWeight: 400, letterSpacing: '-0.01em' }}>
        No scoring, no rules — just mahjong magic.
      </p>

      {/* Oracle */}
      <section aria-labelledby="oracle-heading" className="flex flex-col items-center">
        <h2
          id="oracle-heading"
          className="font-serif font-medium text-center mb-2"
          style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.02em' }}
        >
          The Oracle
        </h2>
        <p className="text-secondary text-center mb-12" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16 }}>
          Should you keep that tile, or let it go?
        </p>
        <MahjongOracle />
      </section>

    </div>
  );
}
