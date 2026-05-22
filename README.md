# Freecash Quests — Case Study

A product design case study reimagining the Freecash Quests page as a polished, gamified quest system with visible progression, reward clarity, and animated micro-interactions.

This is a **front-end prototype only** — no backend, no real account integration. Only the Quests page is in scope; other navigation links open a small "Case Study" notice.

## Tech stack

- **Next.js 14** (Pages Router, static export)
- **TypeScript**
- **Chakra UI v2** with a custom theme matching Freecash brand tokens
- **Framer Motion** for animations
- **Poppins** (Google Fonts)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
```

Static files are exported to `/out`.

## What's animated

- Staggered card entrance on page load
- Hover lift + soft green glow + icon scale on quest cards
- Circular progress rings animate from 0% to value
- Stats bar counts up from 0
- Quest detail drawer slides up with spring animation; progress bar fills on mount
- Shimmer + particle burst on completed quest cards
