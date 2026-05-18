import { createClient } from '@/lib/supabase/client';

export const VIBE_TAGS = [
  'Friendly crowd',
  'Great for beginners',
  'Competitive',
  'Lively table',
  'Best snacks',
  'Late nights',
  'Teaching-friendly',
  'Regular meetups',
  'Cash games',
  'Tournament play',
] as const;

export type VibeTag = typeof VIBE_TAGS[number];

export interface ClubVibeEntry {
  club_name: string;
  borough: string;
  tags: string[];
}

export async function saveVibeTags(
  userId: string,
  clubName: string,
  borough: string,
  tags: string[],
): Promise<void> {
  const supabase = createClient();
  if (tags.length === 0) {
    await supabase
      .from('club_vibe_tags')
      .delete()
      .eq('user_id', userId)
      .eq('club_name', clubName)
      .eq('borough', borough);
  } else {
    await supabase.from('club_vibe_tags').upsert(
      { user_id: userId, club_name: clubName, borough, tags, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,club_name,borough' },
    );
  }
}

export async function loadMyClubVibes(userId: string, clubName: string, borough: string): Promise<string[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('club_vibe_tags')
    .select('tags')
    .eq('user_id', userId)
    .eq('club_name', clubName)
    .eq('borough', borough)
    .single();
  return (data?.tags ?? []) as string[];
}

export async function loadBoroughVibes(borough: string): Promise<{ club_name: string; tags: string[] }[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('club_vibe_tags')
    .select('club_name, tags')
    .eq('borough', borough);
  return (data ?? []) as { club_name: string; tags: string[] }[];
}

export function aggregateVibes(rows: { club_name: string; tags: string[] }[]): Record<string, { tag: string; count: number }[]> {
  const clubMap: Record<string, Record<string, number>> = {};
  for (const row of rows) {
    if (!clubMap[row.club_name]) clubMap[row.club_name] = {};
    for (const tag of row.tags) {
      clubMap[row.club_name][tag] = (clubMap[row.club_name][tag] ?? 0) + 1;
    }
  }
  const result: Record<string, { tag: string; count: number }[]> = {};
  for (const [club, tagCounts] of Object.entries(clubMap)) {
    result[club] = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }
  return result;
}

export async function loadMyVibeTags(userId: string): Promise<ClubVibeEntry[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('club_vibe_tags')
    .select('club_name, borough, tags')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  return (data ?? []) as ClubVibeEntry[];
}
