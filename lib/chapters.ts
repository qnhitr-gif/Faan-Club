import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface ChapterMeta {
  number: number;
  slug: string;
  title: string;
  description: string;
  readingTime: string;
}

export interface Chapter extends ChapterMeta {
  source: string;
}

const CONTENT_DIR = '/Users/louietran/mahjong-school/content/learn';

export function listChapters(): ChapterMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  const chapters = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { data } = matter(raw);
    return {
      number: data.number as number,
      slug: data.slug as string,
      title: data.title as string,
      description: data.description as string,
      readingTime: data.readingTime as string,
    };
  });
  return chapters.sort((a, b) => a.number - b.number);
}

export function getChapter(slug: string): Chapter | null {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      return {
        number: data.number,
        slug: data.slug,
        title: data.title,
        description: data.description,
        readingTime: data.readingTime,
        source: content,
      };
    }
  }
  return null;
}

export function getNeighbors(slug: string): {
  prev?: ChapterMeta;
  next?: ChapterMeta;
} {
  const all = listChapters();
  const idx = all.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}
