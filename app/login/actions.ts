'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/** Only allow relative paths on the same origin — blocks open redirect attacks */
function safeRedirectPath(next: string | null | undefined): string {
  if (!next) return '/';
  if (/^\/(?!\/)/.test(next)) return next;
  return '/';
}

export async function login(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  if (error) return { error: error.message }
  redirect(safeRedirectPath(formData.get('next') as string))
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  if (error) return { error: error.message }
  redirect(safeRedirectPath(formData.get('next') as string))
}

export async function logout(formData: FormData) {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect(safeRedirectPath(formData.get('next') as string))
}
