import { createClient } from '@/lib/supabase/client';

function today(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
}

function localSave(key: string, data: object) {
  try { localStorage.setItem(key + '-prog', JSON.stringify({ date: today(), data })); } catch {}
}
function localLoad(key: string): object | null {
  try {
    const raw = localStorage.getItem(key + '-prog');
    if (!raw) return null;
    const p = JSON.parse(raw);
    return p.date === today() ? p.data : null;
  } catch { return null; }
}
function localClear(key: string) {
  try { localStorage.removeItem(key + '-prog'); } catch {}
}

async function supabaseSave(key: string, userId: string, data: object) {
  const supabase = createClient();
  await supabase.from('drill_progress').upsert(
    { user_id: userId, drill_key: key, date: today(), data, updated_at: new Date().toISOString() },
    { onConflict: 'user_id,drill_key,date' }
  );
}

async function supabaseLoad(key: string, userId: string): Promise<object | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from('drill_progress')
    .select('data')
    .eq('user_id', userId)
    .eq('drill_key', key)
    .eq('date', today())
    .maybeSingle();
  return (data as { data: object } | null)?.data ?? null;
}

async function supabaseClear(key: string, userId: string) {
  const supabase = createClient();
  await supabase.from('drill_progress')
    .delete()
    .eq('user_id', userId)
    .eq('drill_key', key)
    .eq('date', today());
}

export async function saveProgress(key: string, userId: string | null, data: object): Promise<void> {
  localSave(key, data);
  if (userId) await supabaseSave(key, userId, data);
}

export async function loadProgress(key: string, userId: string | null): Promise<object | null> {
  if (userId) return supabaseLoad(key, userId);
  return localLoad(key);
}

export function clearProgress(key: string, userId: string | null): void {
  localClear(key);
  if (userId) supabaseClear(key, userId);
}
