import Link from 'next/link';

interface ChapterNavProps {
  prev?: { slug: string; title: string; number: number };
  next?: { slug: string; title: string; number: number };
}

export function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <nav className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3">
      {prev ? (
        <Link
          href={`/cookbook/${prev.slug}`}
          className="rounded-lg p-4 hairline-strong border bg-elev hover:border-secondary"
        >
          <div className="text-ui text-tertiary">← Chapter {prev.number}</div>
          <div className="font-sans text-h3 font-medium text-primary">{prev.title}</div>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/cookbook/${next.slug}`}
          className="rounded-lg p-4 hairline-strong border text-right bg-info hover:border-secondary"
        >
          <div className="text-ui text-brand-green">Chapter {next.number} →</div>
          <div className="font-sans text-h3 font-medium text-primary">{next.title}</div>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
