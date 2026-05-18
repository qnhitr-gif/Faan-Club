'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { BrandMark } from './BrandMark';
import { createClient } from '@/lib/supabase/client';
import { logout } from '@/app/login/actions';
import type { User } from '@supabase/supabase-js';

function userInitials(user: User): string {
  const name = user.user_metadata?.full_name as string | undefined;
  if (name) return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  return (user.email?.[0] ?? '?').toUpperCase();
}

function userDisplayName(user: User): string {
  return (user.user_metadata?.full_name as string | undefined)
    ?? user.email?.split('@')[0]
    ?? user.email
    ?? '?';
}

export function Header({ initialUser }: { initialUser: User | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [user, setUser] = useState<User | null>(initialUser);
  const pathname = usePathname();
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setUser(initialUser); }, [initialUser]);

  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c4a2a] bg-[#235836]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center text-brand-cream">
          <BrandMark />
          <span style={{ display: 'block', width: 1, height: 16, background: 'rgba(245,240,225,0.4)', marginLeft: 8, marginRight: 8 }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.22px', lineHeight: 1, color: '#faf6ec', fontVariationSettings: "'SOFT' 50, 'opsz' 144" } as React.CSSProperties}>
            Faan <em style={{ fontStyle: 'italic' }}>Club</em>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-[16px]">
          <NavLink href="/cookbook">Cookbook</NavLink>
          <NavLink href="/kitchen">Kitchen</NavLink>
          <NavLink href="/open-tables">Open Tables</NavLink>
          <NavLink href="/side-dish">Side Dish</NavLink>
          <NavLink href="/pantry">Pantry</NavLink>
          {!user && (
            <Link
              href="/login"
              aria-label="Log in"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(245,240,225,0.15)',
                border: '1.5px solid rgba(184,134,11,0.7)',
                color: '#f5f0e1',
                transition: 'background 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,240,225,0.25)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,134,11,1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,240,225,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,134,11,0.7)'; }}
            >
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </Link>
          )}
          {user && (
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropOpen(o => !o)}
                aria-label="Account menu"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, borderRadius: '50%',
                  background: dropOpen ? 'rgba(245,240,225,0.25)' : 'rgba(245,240,225,0.15)',
                  border: `1.5px solid ${dropOpen ? 'rgba(184,134,11,1)' : 'rgba(184,134,11,0.7)'}`,
                  fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
                  color: '#f5f0e1', letterSpacing: '0.02em',
                  cursor: 'pointer', flexShrink: 0,
                  transition: 'background 0.15s, border-color 0.15s',
                }}
              >
                {userInitials(user)}
              </button>
              {dropOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: '#fcfaf3', border: '1px solid rgba(28,74,42,0.15)',
                  borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  minWidth: 160, overflow: 'hidden', zIndex: 100,
                }}>
                  <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid rgba(28,74,42,0.08)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a7a6a' }}>
                      {userDisplayName(user)}
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setDropOpen(false)}
                    style={{
                      display: 'block', padding: '10px 14px',
                      fontFamily: 'var(--font-serif)', fontSize: 14, color: '#16170f',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(28,74,42,0.05)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    Profile
                  </Link>
                  <form action={logout}>
                    <input type="hidden" name="next" value="/" />
                    <button
                      type="submit"
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '10px 14px', borderTop: '1px solid rgba(28,74,42,0.08)',
                        fontFamily: 'var(--font-serif)', fontSize: 14, color: '#b8302a',
                        background: 'none', border: 'none', cursor: 'pointer',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(184,48,42,0.05)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      Sign out
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="text-brand-cream/70 hover:text-brand-cream p-1"
          >
            {mobileOpen ? (
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#1c4a2a] bg-[#235836] px-6 py-4 flex flex-col gap-1"
        >
          <Link href="/cookbook" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 font-medium text-[15px] text-brand-cream/80 hover:text-brand-cream rounded transition-colors">Cookbook</Link>
          <Link href="/kitchen" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 font-medium text-[15px] text-brand-cream/80 hover:text-brand-cream rounded transition-colors">Kitchen</Link>
          <div className="h-px bg-brand-cream/10 my-1" />
          <Link href="/open-tables" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 font-medium text-[15px] text-brand-cream/80 hover:text-brand-cream rounded transition-colors">Open Tables</Link>
          <Link href="/side-dish" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 font-medium text-[15px] text-brand-cream/80 hover:text-brand-cream rounded transition-colors">Side Dish</Link>
          <Link href="/pantry" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 font-medium text-[15px] text-brand-cream/80 hover:text-brand-cream rounded transition-colors">Pantry</Link>
          <div className="h-px bg-brand-cream/10 my-1" />
          {user ? (
            <>
              <Link href="/profile" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 font-medium text-[15px] text-brand-cream/80 hover:text-brand-cream rounded transition-colors">
                Profile ({userInitials(user)})
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="w-full text-left px-3 py-2.5 font-medium text-[15px] text-brand-cream/80 hover:text-brand-cream rounded transition-colors"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 font-medium text-[15px] text-brand-cream/80 hover:text-brand-cream rounded transition-colors">
              Log in
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
  exact,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{ fontFamily: 'var(--font-display)', fontVariationSettings: "'SOFT' 50, 'opsz' 144" } as React.CSSProperties}
      className={`px-3 py-1.5 font-medium transition-colors hover:underline hover:decoration-white hover:underline-offset-4 ${
        isActive ? 'text-brand-cream' : 'text-brand-cream/70 hover:text-brand-cream'
      }`}
    >
      {children}
    </Link>
  );
}
