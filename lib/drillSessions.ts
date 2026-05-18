import { createClient } from '@/lib/supabase/client'

export const LOCAL_LIMIT  = 1   // 1 session (5 questions) per day for guests
export const MEMBER_BONUS = 1

const GUEST_LIMIT         = LOCAL_LIMIT
export const MEMBER_LIMIT = 1   // 1 session (10 questions) per day for members

function getESTDate(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
}

function localRead(storageKey: string): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return 0
    const { date, count } = JSON.parse(raw)
    return date === getESTDate() ? (count ?? 0) : 0
  } catch { return 0 }
}

function localWrite(storageKey: string, count: number): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(storageKey, JSON.stringify({ date: getESTDate(), count }))
  } catch {}
}

async function supabaseRead(storageKey: string, userId: string): Promise<number> {
  const supabase = createClient()
  const { data } = await supabase
    .from('drill_sessions')
    .select('count')
    .eq('user_id', userId)
    .eq('drill_key', storageKey)
    .eq('date', getESTDate())
    .maybeSingle()
  return data?.count ?? 0
}

async function supabaseWrite(storageKey: string, userId: string, count: number): Promise<void> {
  const supabase = createClient()
  await supabase
    .from('drill_sessions')
    .upsert(
      { user_id: userId, drill_key: storageKey, date: getESTDate(), count },
      { onConflict: 'user_id,drill_key,date' }
    )
}

// Returns { local, member } where:
//   guest:  local = localStorage count (0–5),  member = 0
//   member: local = Supabase count (0–15),     member = 0
export async function fetchCounts(storageKey: string, userId: string | null): Promise<{ local: number; member: number }> {
  if (!userId) return { local: localRead(storageKey), member: 0 }
  return { local: await supabaseRead(storageKey, userId), member: 0 }
}

// guest: locked at 5 | member: locked at 15
export function checkLocked(local: number, _member: number, userId: string | null): boolean {
  return local >= (userId ? MEMBER_LIMIT : GUEST_LIMIT)
}

// Records a session and returns updated counts.
export async function recordSession(storageKey: string, userId: string | null): Promise<{ local: number; member: number }> {
  if (!userId) {
    const local = localRead(storageKey)
    if (local >= GUEST_LIMIT) return { local, member: 0 }
    localWrite(storageKey, local + 1)
    return { local: local + 1, member: 0 }
  }
  const current = await supabaseRead(storageKey, userId)
  if (current >= MEMBER_LIMIT) return { local: current, member: 0 }
  const next = current + 1
  await supabaseWrite(storageKey, userId, next)
  return { local: next, member: 0 }
}
