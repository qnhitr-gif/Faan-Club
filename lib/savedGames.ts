import { createClient } from '@/lib/supabase/client'

export async function saveGameCompletion(
  userId: string,
  gameKey: string,
  winner: string,
  winFan: number,
  winBy: string,
): Promise<void> {
  const supabase = createClient()
  await supabase.from('game_completions').insert({
    user_id: userId,
    game_key: gameKey,
    winner,
    win_fan: winFan,
    win_by: winBy,
  })
}
