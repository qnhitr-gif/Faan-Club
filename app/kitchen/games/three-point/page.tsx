import { ThreePtRoom } from '@/components/practice/ThreePtRoom';
import { createClient } from '@/lib/supabase/server';

export const metadata = { title: '3-point min game — Kitchen — Faan Club' };

export default async function ThreePtPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return <ThreePtRoom userId={user?.id ?? null} />;
}
