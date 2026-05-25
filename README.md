# Faan Club

**A patient guide to Hong Kong mahjong, taught at the table.**

Live at [faanclub.co](https://faanclub.co)

---

## What it is

Faan Club is an interactive learning site for Hong Kong-style mahjong. Instead of a wall of rules, it teaches through animated deal sequences, step-by-step drills, and playable game walkthroughs — the way you'd actually learn sitting at a table.

### Features

- **Cookbook** — 14 chapters from setup to advanced scoring, written in plain English
- **Drills** — pattern recognition and scoring exercises to build fluency
- **Interactive games** — animated walkthroughs of full games (0-point and 3-point minimum), with a scripted deal sequence showing where tiles come from, flowers, and replacements
- **Setup stepper** — walks a new player through picking seats, building walls, rolling dice, and dealing hands with live tile animations
- **Open Tables** — find places to play near you
- **Dark mode** — because late-night mahjong sessions are real

---

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | Newsreader, JetBrains Mono, Fraunces |
| Auth & DB | Supabase |
| Email | Resend |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## Running locally

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, etc.

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
app/
  cookbook/       # 14-chapter learning guide (MDX)
  kitchen/        # Practice section
    drills/       # Pattern & scoring drills
    games/        # Interactive game walkthroughs
  open-tables/    # Find clubs & venues
  pantry/         # Reference glossary
components/
  practice/       # Game animations, deal stepper, tile components
  tile/           # Tile rendering
lib/              # Supabase client, auth helpers, saved games
content/          # MDX chapter content
```

---

## Status

Active development. Feedback welcome — open an issue or reach out via [faanclub.co/contact](https://faanclub.co/contact).
