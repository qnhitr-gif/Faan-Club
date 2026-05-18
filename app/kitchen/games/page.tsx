import { GamesRoom } from '@/components/practice/GamesRoom';
import { createClient } from '@/lib/supabase/server';

export const metadata = { title: 'Interactive games — Kitchen — Faan Club' };

export default async function GamesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return <GamesRoom userId={user?.id ?? null} />;
}
