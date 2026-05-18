import { createClient } from '@/lib/supabase/client';

function today(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
}

function daysAgo(n: number): string {
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  d.setDate(d.getDate() - n);
  return d.toLocaleDateString('en-CA');
}

// ── Guest: localStorage rolling window ───────────────────────────────────────

function localKey(drillKey: string) { return `drill-daily-${drillKey}`; }

function localSave(drillKey: string, stats: object) {
  try {
    const raw = localStorage.getItem(localKey(drillKey));
    const arr: Array<{ date: string; stats: object }> = raw ? JSON.parse(raw) : [];
    const idx = arr.findIndex(e => e.date === today());
    if (idx >= 0) arr[idx] = { date: today(), stats };
    else arr.push({ date: today(), stats });
    // Keep last 30 days
    const cutoff = daysAgo(30);
    localStorage.setItem(localKey(drillKey), JSON.stringify(arr.filter(e => e.date >= cutoff)));
  } catch {}
}

function localLoad(drillKey: string, days: number): Array<{ date: string; stats: object }> {
  try {
    const raw = localStorage.getItem(localKey(drillKey));
    if (!raw) return [];
    const arr: Array<{ date: string; stats: object }> = JSON.parse(raw);
    const cutoff = daysAgo(days - 1);
    return arr.filter(e => e.date >= cutoff);
  } catch { return []; }
}

// ── Member: Supabase ──────────────────────────────────────────────────────────

async function supabaseSave(drillKey: string, userId: string, stats: object) {
  const supabase = createClient();
  await supabase.from('drill_stats').upsert(
    { user_id: userId, drill_key: drillKey, date: today(), stats },
    { onConflict: 'user_id,drill_key,date' }
  );
}

async function supabaseLoad(drillKey: string, userId: string, days: number): Promise<Array<{ date: string; stats: object }>> {
  const supabase = createClient();
  const { data } = await supabase
    .from('drill_stats')
    .select('date, stats')
    .eq('user_id', userId)
    .eq('drill_key', drillKey)
    .gte('date', daysAgo(days - 1))
    .order('date', { ascending: true });
  return (data ?? []) as Array<{ date: string; stats: object }>;
}

// ── One-time migration from legacy last-stats keys ────────────────────────────

const LEGACY_MIGRATIONS = [
  {
    dailyKey: 'faan-tile-drill',
    legacyKey: 'faan-tile-drill-last-stats',
    transform: (raw: string): object => {
      const { avgEfficiency, avgDraws } = JSON.parse(raw);
      return { avgEfficiency, avgDraws };
    },
  },
  {
    dailyKey: 'faan-pattern-quiz',
    legacyKey: 'faan-pattern-quiz-last-stats',
    transform: (raw: string): object => {
      const { correct, total } = JSON.parse(raw);
      return { correct, total, accuracy: Math.round((correct / total) * 100) };
    },
  },
  {
    dailyKey: 'faan-fan-quiz',
    legacyKey: 'faan-fan-quiz-last-stats',
    transform: (raw: string): object => {
      const { correct, total } = JSON.parse(raw);
      return { correct, total, accuracy: Math.round((correct / total) * 100) };
    },
  },
];

export function migrateLegacyDrillStats(): void {
  if (typeof window === 'undefined') return;
  for (const m of LEGACY_MIGRATIONS) {
    try {
      const existing = localStorage.getItem(localKey(m.dailyKey));
      const arr: Array<{ date: string; stats: object }> = existing ? JSON.parse(existing) : [];
      if (arr.some(e => e.date === today())) continue;
      const legacyRaw = localStorage.getItem(m.legacyKey);
      if (!legacyRaw) continue;
      localSave(m.dailyKey, m.transform(legacyRaw));
    } catch {}
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function saveDailyStat(drillKey: string, userId: string | null, stats: object): Promise<void> {
  localSave(drillKey, stats);
  if (userId) await supabaseSave(drillKey, userId, stats);
}

export async function loadDailyStats(drillKey: string, userId: string | null, days = 7): Promise<Array<{ date: string; stats: object }>> {
  if (userId) {
    const rows = await supabaseLoad(drillKey, userId, days);
    if (rows.length > 0) return rows;
    // Fall back to localStorage if Supabase has no data (e.g. table not yet created)
  }
  return localLoad(drillKey, days);
}

// ── Aggregations ──────────────────────────────────────────────────────────────

export function compute7DayAvg(entries: Array<{ date: string; stats: object }>, metric: string): number | null {
  const vals = entries
    .map(e => (e.stats as Record<string, number>)[metric])
    .filter((v): v is number => typeof v === 'number');
  if (vals.length === 0) return null;
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
}

export function computeStreak(entries: Array<{ date: string }>, allDates: Set<string>): number {
  const dates = new Set(entries.map(e => e.date).concat([...allDates]));
  let streak = 0;
  for (let i = 0; ; i++) {
    if (dates.has(daysAgo(i))) streak++;
    else break;
  }
  return streak;
}
