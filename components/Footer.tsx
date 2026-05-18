import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Footer() {
  return (
    <footer style={{ background: '#F5F0E1' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ height: 1, background: 'rgba(28,74,42,0.15)' }} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#b8302a', opacity: 0.5 }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#8A8678',
            }}>
              Hong Kong rules · 144 tiles
            </span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {[
              { href: '/contact', label: 'Get in touch' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#8A8678',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </footer>
  );
}
