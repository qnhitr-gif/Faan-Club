import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { BrandMark } from './BrandMark';

export function Header() {
  return (
    <header className="hairline border-b">
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <BrandMark />
          <span className="font-serif text-h3 font-medium">Mahjong 101</span>
        </Link>
        <nav className="flex items-center gap-1 text-ui">
          <NavLink href="/learn">Learn</NavLink>
          <NavLink href="/practice/setup">Interactive room</NavLink>
          <NavLink href="/practice">Practice</NavLink>
          <NavLink href="/glossary">Glossary</NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-md text-secondary hover:text-primary hover:bg-info transition-colors"
    >
      {children}
    </Link>
  );
}
