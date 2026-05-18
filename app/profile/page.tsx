import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProfilePage } from '@/components/ProfilePage';

export const metadata = { title: 'Profile — Faan Club' };

export default async function Profile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/profile');
  return <ProfilePage user={user} />;
}
