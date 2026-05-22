# PRD: Freecash Quests Page — Case Study Rebuild
**For:** Claude Code  
**Project type:** Static React site (Next.js), deployed to GitHub Pages  
**Purpose:** A polished, interactive reproduction of a redesigned Quests page for a product design case study. Only the Quests page is in scope. All other navigation links should display a non-intrusive "Case Study Only" notice instead of navigating away.

---

## 1. Context & Goal

This is a portfolio case study for a UI/Product Design role. The original Quests page on freecash.com is minimal and underutilizes the concept. The redesign introduces a structured gamified quest system with visible progression, reward clarity, and animated interactions — with the goal of improving user retention (D1, D7, D30).

The deliverable is a **real, hosted website** that a hiring manager can open in a browser and experience. It must feel premium, polished, and interactive — not a static screenshot. The wow factor comes from the **quality of motion and micro-interactions**, not just visual design.

---

## 2. Tech Stack

Mirror the actual Freecash stack as closely as possible:

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js** (React) | Confirmed from DevTools (`__next` chunks, Next.js routing) |
| UI Library | **Chakra UI v2** | Confirmed from DevTools (`chakra-ui-dark` class, `--chakra-*` CSS variables) |
| Animation | **Framer Motion** | Chakra-compatible, best-in-class for the interaction quality needed |
| Font | **Poppins** (Google Fonts) | Confirmed from Freecash design system docs |
| Hosting | **GitHub Pages** via `next export` | Static export, free, no backend needed |
| Language | **TypeScript** | Professional standard, matches likely Freecash codebase |

---

## 3. Design System — Freecash Brand Tokens

Apply these exactly. Do not invent colors or fonts.

### Colors

```
Background (page):        #141523
Background (containers):  #252539
Elevated surface:         #525266  (used to elevate/highlight atoms)
Brand green (primary):    #01D676
Brand green (hover):      #00BF66
Brand green (light text): #71FFC0
White:                    #FFFFFF
Muted text:               #A9A9CA
Gold (tickets/rewards):   #FFC700
Gold gradient:            #FFC700 → #FFE177
Silver:                   #E3E3E3 → #A6A6A6
Bronze:                   #FFCC95 → #E77C0B
Error/destructive:        #DE2C2C
Warning:                  #FFC700
Overlay:                  rgba(20, 21, 35, 0.6)
```

### Typography

Font family: **Poppins** (weights: 400, 500, 600, 700)  
Letter spacing on all headings: **2%**

| Token | Size | Line height |
|---|---|---|
| Heading sm | 24px | 36px |
| Heading xs | 20px | 30px |
| Text xl | 18px | 27px |
| Text lg | 16px | 24px |
| Text md | 14px | 21px |
| Text sm | 12px | 18px |
| Text xs | 10px | 15px |

---

## 4. Page Structure

The page reproduces the Freecash app shell and populates the Quests section with the redesigned content.

### 4.1 App Shell (Non-interactive chrome)

**Top Navigation Bar** — dark background (`#1D1E30`), full width:
- Left: Freecash logo (SVG or styled text — "FREE" bold green, "CASH" white)
- Center nav links: Earn · My Offers · Cashout · **Rewards** (active, green underline)
- Right: coin balance chip (`$0`), avatar circle, notification bell icon
- Clicking any nav link (except Rewards) → triggers the Case Study Modal (see Section 7)

**No sidebar needed** — this is a full-width content page.

### 4.2 Page Header

Inside the main content area:
- Page title: "Quests" with a green quest icon (use an emoji 🧩 or lucide icon as placeholder) + a "NEW" badge (green pill)
- Subtitle/description: brief explanation of what Quests are and how Lottery Tickets work
- **Stats bar**: two chips displayed horizontally:
  - 🎟 `150 Tickets` (gold color)
  - ✅ `5 Quests completed` (green color)

### 4.3 Quest Grid — Main Content

A responsive grid of Quest cards. On desktop: 5 columns. On tablet: 3 columns. On mobile: 2 columns.

**Quest data (use this exact content):**

*Engagement Quests (Row 1 — shown first, most important):*
```
1. Explorer       — "Complete 1/4 tasks"          — +100 🎟  — progress: 25%
2. Form's Slayer  — "Complete 8/2 Forms"           — +90 🎟   — progress: 60%
3. Adventurer     — "Try 8/3 categories"           — +90 🎟   — progress: 40%
4. Streak Builder — "Login for 8/7 days"           — +70 🎟   — progress: 85%
5. Key Holder     — "Unlock a new app"             — +50 🎟   — progress: 0%
```

*Milestone Quests (Row 2):*
```
6. Popular        — "Invite a friend"              — +50 🎟   — not started
7. Speed Runner   — "Finish 8/3 tasks in a row"   — +80 🎟   — not started
8. Cashout        — "First withdrawal"             — +50 🎟   — not started
9. Big Earner     — "Withdraw $50"                 — +100 🎟  — not started
10. High Roller   — "Withdraw $100"                — +200 🎟  — not started
```

*Social Quests (Row 3 — labeled "Social" with a section divider):*
```
11. Instagram  — "Follow us there!"  — Completed ✅
12. TikTok     — "Follow us there!"  — Completed ✅
13. X          — "Follow us there!"  — Completed ✅
14. YouTube    — "Subscribe!"        — Completed ✅
15. Discord    — "Join community!"   — Completed ✅
```

**Quest Card anatomy:**
- Dark container (`#252539`), rounded corners (12px), subtle border (`#33334D`)
- Illustrated icon at top center — **placeholder circle with emoji** (assets will be swapped in later; see Section 9 for handoff notes)
- Quest name (bold, white, 14px)
- Subtitle/task description (muted, 12px, `#A9A9CA`)
- Reward chip: gold ticket icon + `+N` amount
- For quests with progress: circular progress ring (green, shows % completion)
- For completed quests: green "Completed" button (filled, non-clickable)
- For locked/not-started quests: greyed-out state

---

## 5. Animations & Interactions

This is the most important section. The animations are what create the "wow" effect. Implement all of these with Framer Motion.

### 5.1 Page Load (Staggered Reveal)
- Stats bar fades + slides up from below (delay 0.1s)
- Quest cards animate in one by one left-to-right, top-to-bottom with a stagger of 0.05s per card
- Each card: fade in + slight scale from 0.92 → 1.0 + translateY from 20px → 0
- Duration per card: 0.4s, ease: `easeOut`

### 5.2 Card Hover (Subtle)
- Card lifts: `translateY(-4px)`, box shadow expands to a soft green glow (`0 8px 32px rgba(1, 214, 118, 0.15)`)
- The quest icon scales up slightly: `scale(1.08)`, duration 0.2s
- The reward chip brightens slightly
- Smooth transition on all: `duration: 0.2s, ease: easeInOut`

### 5.3 Card Click — Quest Detail Drawer (Juicy)
Clicking any non-completed card opens a **bottom drawer / modal** with:
- Backdrop blur overlay (`backdrop-filter: blur(8px)`)
- Drawer slides up from bottom with a spring animation (`type: spring, stiffness: 300, damping: 30`)
- Inside the drawer:
  - Large version of the quest icon (animated entrance: bounces in with spring)
  - Quest name + full description
  - Progress bar (animated fill — bar fills from 0 to current % on mount, duration 0.8s, ease `easeOut`)
  - Reward info (tickets + what they're used for)
  - A CTA button ("Start Quest" or "Continue Quest") in brand green
  - Close button (X) top right
- Drawer closes with a slide-down + fade out animation

### 5.4 Completed Quest — Sparkle Effect
- Completed quest cards have a subtle idle shimmer animation on the green "Completed" badge (CSS keyframe shimmer, loops every 3s)
- On hover, a small burst of 5–6 particle dots (green + gold) emanates from the card center using Framer Motion's `AnimatePresence` — particles fly outward and fade

### 5.5 Stats Bar Counter
- On page load, the ticket count (150) and quest count (5) count up from 0 using a number animation (duration 1.2s, ease `easeOut`)

### 5.6 Circular Progress Rings
- On page load (after the card appears), the SVG stroke-dashoffset animates from 0% to the actual progress value
- Duration: 0.8s per ring, staggered slightly after the card entrance

---

## 6. Mobile Version

Implement full responsive behavior. The mobile layout is a first-class experience, not an afterthought.

### Mobile breakpoint: < 768px

- Navigation collapses to: logo left + hamburger icon right (hamburger opens the Case Study Modal when tapped, with a note that the menu is not part of this case study)
- Stats bar stacks vertically or wraps to 2 chips per row
- Quest grid: **2 columns**
- Quest cards: slightly more compact padding
- Quest detail: opens as a full-screen bottom sheet (100% width, ~85% height, with a drag handle at top)
- All animations preserved — slightly reduced motion scale for performance

### Responsive grid:
```
Desktop (>1024px):  5 columns, gap: 16px
Tablet (768–1024px): 3 columns, gap: 12px  
Mobile (<768px):    2 columns, gap: 10px
```

---

## 7. Case Study Modal

When any navigation link (other than Rewards) or any external link is clicked, show a centered modal:

**Content:**
```
🎨  This is a Case Study

This interactive prototype was created as part of a 
product design challenge for Freecash.

Only the Quests page is in scope for this concept. 
The rest of the site navigation is not part of this prototype.

[Got it]  button — closes modal
```

**Styling:**
- Dark background modal (`#252539`), rounded (16px), max-width 400px
- Soft backdrop overlay
- Entrance: scale from 0.9 + fade in, spring animation
- The "Got it" button uses the brand green

---

## 8. Footer

Simple footer matching Freecash style:
- Dark background, muted text
- Logo left
- Three link columns: Freecash / Resources / Business (links are dummies — clicking opens Case Study Modal)
- "Case Study — Not a real product" note in small muted text at the very bottom

---

## 9. Asset Handoff Notes

Quest card illustrations need to be replaced with exported assets. The current implementation uses emoji placeholders. To swap in real assets:
- Export each quest icon from Figma as a 120×120px PNG with transparent background
- Name them: `explorer.png`, `forms-slayer.png`, `adventurer.png`, etc.
- Drop into `/public/quest-icons/`
- The `<QuestCard>` component accepts an `iconSrc` prop — replace the emoji with `<Image src={iconSrc} />`

---

## 10. GitHub Pages Deployment

Set up the project for static export and GitHub Pages hosting:

1. In `next.config.js`:
```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}
```

2. In `package.json`, add:
```json
"deploy": "next build && touch out/.nojekyll && gh-pages -d out"
```

3. Install: `npm install --save-dev gh-pages`

4. Add a `CNAME` file in `/public` if using a custom domain (optional)

5. In the GitHub repo: Settings → Pages → Source: `gh-pages` branch

---

## 11. File Structure

```
/
├── public/
│   ├── quest-icons/        ← drop exported PNGs here
│   └── .nojekyll
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── QuestCard.tsx
│   │   ├── QuestGrid.tsx
│   │   ├── QuestDrawer.tsx
│   │   ├── StatsBar.tsx
│   │   ├── CircularProgress.tsx
│   │   ├── ParticleBurst.tsx
│   │   └── CaseStudyModal.tsx
│   ├── data/
│   │   └── quests.ts       ← all quest data as typed constants
│   ├── theme/
│   │   └── index.ts        ← Chakra UI theme extension with Freecash tokens
│   └── pages/
│       └── index.tsx       ← main page
├── next.config.js
└── package.json
```

---

## 12. Component Specs

### `QuestCard` props
```ts
interface Quest {
  id: string;
  name: string;
  description: string;
  reward: number;           // ticket count
  progress?: number;        // 0–100, undefined = not started
  completed?: boolean;
  iconEmoji: string;        // placeholder until real assets added
  iconSrc?: string;         // optional real asset path
  category: 'engagement' | 'milestone' | 'social';
}
```

### `CaseStudyModal`
- Exported as a global context/hook: `useCaseStudyModal()`
- `openModal()` callable from any component
- Persists across navigation

---

## 13. Quality Bar

Before considering this done, verify:
- [ ] All 15 quest cards render correctly with proper data
- [ ] Staggered entrance animation plays on first load
- [ ] Hover states work on all cards (lift + glow + icon scale)
- [ ] Clicking a card opens the drawer with progress bar animation
- [ ] Completed cards show sparkle on hover
- [ ] Stats bar counts up on load
- [ ] Progress rings animate on card entrance
- [ ] Case Study Modal appears when clicking any non-Rewards nav item
- [ ] Mobile layout renders correctly at 375px width
- [ ] Mobile bottom sheet opens full-screen with drag handle
- [ ] Page looks correct on Chrome, Safari, Firefox
- [ ] Deployed to GitHub Pages and accessible via public URL

---

## 14. What NOT to build

- No backend, no API calls, no auth
- No real Freecash account integration
- No other pages (Earn, My Offers, Cashout) — just the shell nav
- No cookie banners, analytics, or tracking
- Keep bundle size reasonable — no unnecessary dependencies
