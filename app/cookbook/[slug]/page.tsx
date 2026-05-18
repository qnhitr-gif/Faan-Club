import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { listChapters, getChapter, getNeighbors } from '@/lib/chapters';
import { Tile } from '@/components/Tile';
import { TileRow } from '@/components/TileRow';
import { Callout } from '@/components/Callout';
import { ChapterNav } from '@/components/ChapterNav';
import {
  Section,
  Pillars, Pillar, Stages, Stage, Compare, CompareSide,
  SafeSequences, DangerScale, Checklist, WaitPattern, QuickRef, FiveBlockDiagram,
} from '@/components/learn/StrategyParts';
import {
  ScoringSection,
  PatternGrid, PatternCard,
  RareHandGrid, RareHandCard,
  HonorGrid, HonorCard,
  WinMethods, WinMethod,
  PayoutRules, FaanScale,
} from '@/components/learn/ScoringParts';
import { GameFlow, WelcomeIntro, Split, SplitCol, MissionBlock } from '@/components/learn/WelcomeParts';
import { CallCosts } from '@/components/learn/CallStrategyParts';
import { TenpaiOutsChapter } from '@/components/learn/TenpaiOutsChapter';
import { TileEfficiencyChapter } from '@/components/learn/TileEfficiencyChapter';
import { InGameStrategyChapter } from '@/components/learn/InGameStrategyChapter';
import { ReadingTheTableChapter } from '@/components/learn/ReadingTheTableChapter';
import { HandSelectionChapter } from '@/components/learn/HandSelectionChapter';
import { WelcomeChapter } from '@/components/learn/WelcomeChapter';
import { WinningHand, MeldGrid, MeldCard } from '@/components/learn/HandParts';
import { TilesChapter } from '@/components/learn/TilesChapter';
import { HowARoundFlows } from '@/components/learn/HowARoundFlows';
import { ChapterHeader } from '@/components/learn/ChapterHeader';
import { TurnLoop } from '@/components/learn/TurnLoop';

const mdxComponents = {
  Tile,
  TileRow,
  Callout,
  TilesChapter,
  Section,
  Pillars, Pillar, Stages, Stage, Compare, CompareSide,
  SafeSequences, DangerScale, Checklist, WaitPattern, QuickRef, FiveBlockDiagram,
  PatternGrid, PatternCard,
  RareHandGrid, RareHandCard,
  HonorGrid, HonorCard,
  WinMethods, WinMethod,
  PayoutRules, FaanScale,
  GameFlow, WelcomeIntro, Split, SplitCol, MissionBlock,
  WelcomeChapter,
  HowARoundFlows,
  TurnLoop,
  TwoCol: ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, margin: '24px 0' }}>{children}</div>
  ),
  WinningHand, MeldGrid, MeldCard,
  ChapterHeader,
  CallCosts,
  TenpaiOutsChapter,
  TileEfficiencyChapter,
  InGameStrategyChapter,
  ReadingTheTableChapter,
  HandSelectionChapter,
  ScoringSection,
  h1: (props: any) => (
    <h1 {...props} className="font-serif text-h1 font-medium mt-2 mb-6 tracking-tight" />
  ),
  h2: (props: any) => (
    <h2 {...props} className="font-serif text-[26px] leading-tight font-medium mt-14 mb-4 pt-5 text-primary tracking-tight border-t border-brand-green/30" />
  ),
  h3: (props: any) => (
    <h3 {...props} className="font-sans text-h3 font-medium mt-8 mb-2 text-primary" />
  ),
  p: (props: any) => <p {...props} className="text-body text-primary mb-4" />,
  em: (props: any) => <em {...props} className="font-serif italic" />,
  ul: (props: any) => <ul {...props} className="list-disc pl-5 mb-4 text-body text-primary" />,
  ol: (props: any) => <ol {...props} className="list-decimal pl-5 mb-4 text-body text-primary" />,
  li: (props: any) => <li {...props} className="mb-1.5" />,
  a: (props: any) => <a {...props} className="underline decoration-brand-green underline-offset-2 hover:text-brand-green" />,
  strong: (props: any) => <strong {...props} className="font-medium text-primary" />,
  table: (props: any) => <div className="overflow-x-auto mb-6"><table {...props} className="w-full text-body border-collapse" /></div>,
  thead: (props: any) => <thead {...props} className="border-b border-brand-green/30" />,
  tbody: (props: any) => <tbody {...props} />,
  tr: (props: any) => <tr {...props} className="border-b border-brand-green/10" />,
  th: (props: any) => <th {...props} className="text-left py-2 pr-4 text-ui font-medium text-secondary" />,
  td: (props: any) => <td {...props} className="py-2 pr-4 text-primary" />,
};

export function generateStaticParams() {
  return listChapters().map((c) => ({ slug: c.slug }));
}

export default function ChapterPage({ params }: { params: { slug: string } }) {
  const chapter = getChapter(params.slug);
  if (!chapter) notFound();
  const { prev, next } = getNeighbors(params.slug);
  const all = listChapters();

  return (
    <div style={{ background: '#faf6ec', flex: 1, minHeight: '100vh' }}>
      {/* Breadcrumb strip */}
      <div className="crumb-strip">
        <div className="crumb">
          <nav aria-label="Breadcrumb">
            <Link href="/cookbook">Cookbook</Link>
            <span className="sep">›</span>
            <span className="here">Chapter {chapter.number}: {chapter.title}</span>
          </nav>
          <div className="right">
            {prev && <Link href={`/cookbook/${prev.slug}`}>← {prev.title}</Link>}
            {next && <Link href={`/cookbook/${next.slug}`}>{next.title} →</Link>}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
      <div>
        <article style={{ maxWidth: 1080, margin: '0 auto' }}>
          {!chapter.hideHeader && (
            <header style={{ paddingTop: 32, paddingBottom: 20 }}>
              {/* Eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1c4a2a' }}>
                  Chapter {String(chapter.number).padStart(2, '0')}
                </span>
                <div style={{ height: 1, width: 40, background: '#c8d8c9', flexShrink: 0 }} />
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 6.5vw, 96px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#16170f', marginBottom: 20, fontVariationSettings: "'SOFT' 50, 'opsz' 144", fontOpticalSizing: 'none' } as any}>
                {chapter.title}
              </h1>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, lineHeight: 1.65, color: '#2C2A26' }}>
                {chapter.description}
              </p>
            </header>
          )}
          <div>
            <MDXRemote source={chapter.source} components={mdxComponents as any} options={{ blockJS: false }} />
          </div>
        </article>

        {/* Chapter footer nav */}
        {!chapter.hideFooter && <footer style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid rgba(35,88,54,0.15)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Prev */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7a6a', marginBottom: 8 }}>
              ← PREVIOUS
            </div>
            {prev ? (
              <Link href={`/cookbook/${prev.slug}`} style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500, color: '#1c4a2a', textDecoration: 'none', display: 'block' }}>
                Chapter {String(prev.number).padStart(2, '0')} → {prev.title}
              </Link>
            ) : (
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, color: '#7a7a6a' }}>
                (this is the first chapter)
              </span>
            )}
          </div>
          {/* Next */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#235836', marginBottom: 8 }}>
              NEXT CHAPTER →
            </div>
            {next ? (
              <Link href={`/cookbook/${next.slug}`} style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500, color: '#1c4a2a', textDecoration: 'none', display: 'block', textAlign: 'right' }}>
                Chapter {String(next.number).padStart(2, '0')} → {next.title}
              </Link>
            ) : (
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, color: '#7a7a6a' }}>
                (this is the last chapter)
              </span>
            )}
          </div>
        </footer>}

      </div>
    </div>
  </div>
  );
}
