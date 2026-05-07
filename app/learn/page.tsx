import Link from 'next/link';
import { listChapters } from '@/lib/chapters';

export default function LearnIndex() {
  const chapters = listChapters();
  return (
    <div className="max-w-prose mx-auto px-6 md:px-10 py-12">
      <header className="mb-10">
        <div className="text-ui text-tertiary uppercase tracking-wide mb-2">Learn</div>
        <h1 className="font-serif text-h1 font-medium mb-3">Eight chapters, in order.</h1>
        <p className="font-serif italic text-lead text-secondary">
          You can read them top-to-bottom, or jump around. Each one stands on its own.
        </p>
      </header>

      <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {chapters.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/learn/${c.slug}`}
              className="block rounded-lg p-5 hairline-strong border bg-elev hover:border-secondary transition-colors h-full"
            >
              <div className="text-ui text-tertiary mb-1">Chapter {c.number}</div>
              <h2 className="font-sans text-h2 font-medium mb-1.5 text-primary">{c.title}</h2>
              <p className="text-body text-secondary">{c.description}</p>
              <div className="text-ui text-tertiary mt-3">{c.readingTime}</div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
