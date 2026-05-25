'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { useSearchParams } from 'next/navigation'
import { login, signup } from './actions'

const PERKS = [
  {
    icon: '◎',
    title: '10 questions per drill',
    desc: 'Guests get 5. Members get the full set — enough reps to actually build the habit.',
  },
  {
    icon: '◈',
    title: 'Track your progress',
    desc: 'Pick up where you left off. Your chapter progress and drill history are saved across sessions.',
  },
  {
    icon: '⬡',
    title: 'Community features',
    desc: 'Tag clubs in Open Tables, leave vibes, and help other players find their table.',
  },
]

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/'

  async function handleAction(action: typeof login, formData: FormData) {
    const result = await action(formData)
    if (result?.error) setError(result.error)
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'stretch' }}>

      {/* ── Left: value prop ── */}
      <div style={{
        flex: '1 1 0', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '64px 60px', background: '#235836',
        borderRight: '1px solid rgba(255,255,255,0.08)',
      }} className="hidden md:flex">

        <div style={{ maxWidth: 400 }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(245,240,225,0.6)' }}>
              Free account
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.1,
            letterSpacing: '-0.025em', color: '#faf6ec',
            marginBottom: 12,
            fontVariationSettings: "'SOFT' 50, 'opsz' 144",
          } as CSSProperties}>
            Learn more,<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(245,240,225,0.7)' }}>track everything.</em>
          </h2>

          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: 16, lineHeight: 1.65,
            color: 'rgba(245,240,225,0.7)', marginBottom: 44,
          }}>
            Takes ten seconds. No credit card, no nonsense.
          </p>

          {/* Perks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {PERKS.map((p) => (
              <div key={p.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(245,240,225,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, color: 'rgba(245,240,225,0.7)',
                  border: '1px solid rgba(245,240,225,0.12)',
                }}>
                  {p.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em',
                    color: '#faf6ec', marginBottom: 4,
                  }}>
                    {p.title}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-serif)', fontSize: 13, lineHeight: 1.6,
                    color: 'rgba(245,240,225,0.6)',
                  }}>
                    {p.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: form ── */}
      <div style={{
        flex: '1 1 0', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        padding: '64px 40px', background: '#faf6ec',
      }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 28,
            letterSpacing: '-0.02em', color: '#16170f', marginBottom: 6, textAlign: 'center',
            fontVariationSettings: "'SOFT' 50, 'opsz' 144",
          } as CSSProperties}>
            Welcome back
          </h1>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 15, color: '#7a7a6a',
            textAlign: 'center', marginBottom: 32,
          }}>
            Log in or create an account.
          </p>

          {error && (
            <div style={{
              marginBottom: 16, padding: '10px 14px', borderRadius: 8,
              background: 'rgba(184,48,42,0.06)', border: '1px solid rgba(184,48,42,0.2)',
              fontFamily: 'var(--font-serif)', fontSize: 14, color: '#b8302a',
            }}>
              {error}
            </div>
          )}

          <div style={{
            borderRadius: 12, border: '1px solid rgba(28,74,42,0.15)',
            background: '#fcfaf3', padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="hidden" name="next" value={next} />
              <div>
                <label htmlFor="email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a7a6a', marginBottom: 6 }}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  style={{
                    width: '100%', padding: '9px 12px', borderRadius: 8,
                    border: '1px solid rgba(28,74,42,0.2)', background: '#faf6ec',
                    fontFamily: 'var(--font-serif)', fontSize: 14, color: '#16170f',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a7a6a', marginBottom: 6 }}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '9px 12px', borderRadius: 8,
                    border: '1px solid rgba(28,74,42,0.2)', background: '#faf6ec',
                    fontFamily: 'var(--font-serif)', fontSize: 14, color: '#16170f',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
                <button
                  formAction={(fd) => handleAction(login, fd)}
                  style={{
                    flex: 1, padding: '10px 16px', borderRadius: 8,
                    background: '#235836', color: '#f5f0e1',
                    fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 500,
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  Log in
                </button>
                <button
                  formAction={(fd) => handleAction(signup, fd)}
                  style={{
                    flex: 1, padding: '10px 16px', borderRadius: 8,
                    background: 'transparent', color: '#16170f',
                    fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 500,
                    border: '1px solid rgba(28,74,42,0.25)', cursor: 'pointer',
                  }}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>

          {/* Mobile perks hint */}
          <p style={{
            marginTop: 24, textAlign: 'center',
            fontFamily: 'var(--font-serif)', fontSize: 13, color: '#7a7a6a',
          }} className="md:hidden">
            Members get 10 drill questions, progress tracking, and community features.
          </p>
        </div>
      </div>

    </div>
  )
}
