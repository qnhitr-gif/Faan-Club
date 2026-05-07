import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { listChapters, getChapter, getNeighbors } from '@/lib/chapters';
import { Tile } from '@/components/Tile';
import { TileRow } from '@/components/TileRow';
import { Callout } from '@/components/Callout';
import { ChapterNav } from '@/components/ChapterNav';

const mdxComponents = {
  Tile,
  TileRow,
  Callout,
  h1: (props: any) => (
    <h1 {...props} className="font-serif text-h1 font-medium mt-2 mb-6 tracking-tight" />
  ),
  h2: (props: any) => (
    <h2 {...props} className="font-sans text-h2 font-medium mt-10 mb-3 text-primary" />
  ),
  h3: (props: any) => (
    <h3 {...props} className="font-sans text-h3 font-medium mt-8 mb-2 text-primary" />
  ),
  p: (props: any) => <p {...props} className="text-body text-primary mb-4" />,
  em: (props: any) => <em {...props} className="font-serif italic" />,
  ul: (props: any) => <ul {...props} className="list-disc pl-5 mb-4 text-body text-primary" />,
  ol: (props: any) => <ol {...props} className="list-decimal pl-5 mb-4 text-body text-primary" />,
  li: (props: any) => <li {...props} className="mb-1.5" />,
  a: (props: any) => <a {...props} className="underline decoration-brand-green underline-offset-2 hover:text-brand-green" />,
  strong: (props: any) => <strong {...props} className="font-medium text-primary" />,
};

export function generateStaticParams() {
  return listChapters().map((c) => ({ slug: c.slug }));
}

export default function ChapterPage({ params }: { params: { slug: string } }) {
  const chapter = getChapter(params.slug);
  if (!chapter) notFound();
  const { prev, next } = getNeighbors(params.slug);
  const all = listChapters();

  return (
    <div className="max-w-prose mx-auto px-6 md:px-10 py-8">
      <div className="flex items-center justify-between mb-8 text-ui text-tertiary">
        <nav aria-label="Breadcrumb">
          <Link href="/learn" className="hover:text-primary">Learn</Link>
          <span className="mx-1.5">›</span>
          <span className="text-secondary">Chapter {chapter.number}: {chapter.title.toLowerCase()}</span>
        </nav>
        <div>Chapter {chapter.number} of {all.length}</div>
      </div>

      <article className="max-w-article">
        <header className="mb-8">
          <div className="text-ui text-tertiary mb-2">Chapter {chapter.number}</div>
          <h1 className="font-serif text-h1 font-medium tracking-tight mb-3">{chapter.title}</h1>
          <p className="font-serif italic text-lead text-secondary">{chapter.description}</p>
        </header>
        <div>
          <MDXRemote source={chapter.source} components={mdxComponents as any} options={{ blockJS: false }} />
        </div>
      </article>

      <ChapterNav
        prev={prev ? { slug: prev.slug, title: prev.title, number: prev.number } : undefined}
        next={next ? { slug: next.slug, title: next.title, number: next.number } : undefined}
      />
    </div>
  );
}
