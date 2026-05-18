import type { Metadata } from 'next';
import { Newsreader, JetBrains_Mono, Fraunces } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeScript } from '@/components/ThemeScript';
import { Analytics } from '@vercel/analytics/next';
import { createClient } from '@/lib/supabase/server';
import '@/styles/globals.css';

const serif = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://faanclub.vercel.app'),
  title: {
    default: 'Faan Club',
    template: '%s · Faan Club',
  },
  description: 'A patient guide to Hong Kong mahjong, taught at the table. Learn the rules, practice with drills, and find a club near you.',
  keywords: ['mahjong', 'Hong Kong mahjong', 'learn mahjong', 'mahjong rules', 'Cantonese mahjong', 'HK mahjong'],
  openGraph: {
    type: 'website',
    siteName: 'Faan Club',
    title: 'Faan Club — Learn Hong Kong Mahjong, One Bite at a Time',
    description: 'A patient guide to Hong Kong mahjong, taught at the table. 14 chapters from beginner to advanced.',
    url: 'https://faanclub.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faan Club — Learn Hong Kong Mahjong, One Bite at a Time',
    description: 'A patient guide to Hong Kong mahjong, taught at the table. 14 chapters from beginner to advanced.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className={`${GeistSans.variable} ${serif.variable} ${mono.variable} ${display.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-surface text-primary min-h-screen flex flex-col">
        <Header initialUser={user} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
