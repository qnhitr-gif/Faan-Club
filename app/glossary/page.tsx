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
    <div className="max-w-prose mx-auto px-6 md:px-10 py-12">
      <header className="mb-8">
        <div className="text-ui text-tertiary uppercase tracking-wide mb-2">Glossary</div>
        <h1 className="font-serif text-h1 font-medium mb-3">Every term, in two languages.</h1>
        <p className="font-serif italic text-lead text-secondary">
          Tiles, calls, and the words you'll hear at the table.
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
