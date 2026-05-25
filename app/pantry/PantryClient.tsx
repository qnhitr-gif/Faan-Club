'use client';

import { useMemo, useState } from 'react';
import { Tile } from '@/components/Tile';
import { GLOSSARY, CATEGORY_LABELS, type GlossaryCategory } from '@/lib/glossary';

const FILTERS: Array<{ id: GlossaryCategory | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'tile', label: 'Tiles' },
  { id: 'term', label: 'Terms' },
  { id: 'call', label: 'Calls' },
  { id: 'scoring', label: 'Scoring' },
];

export default function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<GlossaryCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter((e) => {
      if (filter !== 'all' && e.category !== filter) return false;
      if (!q) return true;
      return (
        e.english.toLowerCase().includes(q) ||
        e.chinese?.includes(q) ||
        e.pinyin?.toLowerCase().includes(q) ||
        e.definition.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
      <header style={{ paddingTop: 64, paddingBottom: 40 }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1c4a2a' }}>
            Pantry
          </span>
          <div style={{ height: 1, width: 40, background: '#c8d8c9', flexShrink: 0 }} />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(40px, 5vw, 72px)',
          fontWeight: 500, lineHeight: 1.05,
          letterSpacing: '-0.02em', color: '#16170f',
          marginBottom: 16,
        }}>
          Every word,{' '}
          <em style={{ fontStyle: 'italic', color: '#1c4a2a' }}>two languages.</em>
        </h1>

        <p style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 20, lineHeight: 1.65, color: '#2C2A26', maxWidth: 560,
          marginBottom: 0,
        }}>
          Tiles, calls, and the terms you'll hear at the table — in English and Chinese.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-3">
        <input
          type="search"
          placeholder="Search English, Chinese, or pinyin…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 py-2 rounded-md hairline-strong border bg-elev text-body text-primary placeholder:text-tertiary focus:outline-none focus:border-brand-green"
        />
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1 rounded-md text-ui hairline-strong border transition-colors ${
                filter === f.id
                  ? 'bg-brand-green text-brand-cream border-brand-green'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {filtered.map((e) => (
          <li key={e.id} className="rounded-lg p-4 bg-elev hairline-strong border flex gap-4 items-start">
            <div className="shrink-0 w-12 flex justify-center pt-0.5">
              {e.tile ? (
                <Tile face={e.tile} size="sm" />
              ) : (
                <span className="inline-block w-10 h-10 rounded-md bg-info text-tertiary text-ui flex items-center justify-center">
                  {CATEGORY_LABELS[e.category][0]}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <h2 className="font-sans text-h3 font-medium text-primary">{e.english}</h2>
                {e.chinese && (
                  <span className="font-serif text-body text-secondary">
                    {e.chinese}
                    {e.pinyin && <span className="text-tertiary"> · {e.pinyin}</span>}
                  </span>
                )}
                <span className="text-ui text-tertiary ml-auto">{CATEGORY_LABELS[e.category]}</span>
              </div>
              <p className="text-body text-secondary mt-1">{e.definition}</p>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-body text-tertiary text-center py-12">
            No matches. Try a different word.
          </li>
        )}
      </ul>
    </div>
  );
}
