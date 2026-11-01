# Design rulebook — deepak.sritaraksolutions.in

Every section of this site must follow these rules. If a rule blocks a good idea,
change the rule here first, then build. Do not break it quietly in code.

---

## 1. What this page is

| | |
|---|---|
| **Who it is for** | Recruiters and hiring managers (first), freelance clients (second) |
| **Its one job** | In about 60 seconds, show: who Deepak is, what he builds, proof it works, how to contact him |
| **Big idea** | "The pause button for AI agents." The page borrows the look of an approval system: a request is *pending* (amber), then *approved* (green) or *blocked* (red). |
| **Signature moment** | The amber "pending approval" state. It is the one bold thing on the page. Everything else stays calm. |

---

## 2. Colors (two themes)

All colors live in `src/styles/tokens.css`. **Never type a hex code anywhere else.**
Use the Tailwind names in the right-hand column.

| Role | Light | Dark | Tailwind name | Use it for |
|---|---|---|---|---|
| Canvas | `#F2F4F6` | `#10151C` | `bg-canvas` | Page background |
| Surface | `#FFFFFF` | `#18202A` | `bg-surface` | Panels, app window |
| Ink | `#17202B` | `#E8ECF1` | `text-ink` | Headings, body text |
| Muted | `#556170` | `#9AA6B4` | `text-muted` | Secondary text, captions |
| Line | `#D9DEE4` | `#2A3441` | `border-line` | Borders, timeline track |
| Pending (signature) | `#8F5A00` | `#F0B23E` | `pending` | Pending state, focus ring, the one accent |
| Approved | `#1F7A50` | `#3DBE84` | `approved` | Approved state only |
| Blocked | `#B33A28` | `#E5644F` | `blocked` | Blocked / error state only |

Rules:
- **Green and red are status colors only.** Never use them for decoration or buttons.
- **Amber is the only accent.** Max one amber element per screen, except inside the AgentGuard story.
- No gradients as decoration. No glow effects.
- Every text color must pass contrast **AA (4.5 : 1)** on canvas and surface in both themes. `npm run check:contrast` tests this.

### Theme switching
- First visit: follow the visitor's phone/computer setting (`prefers-color-scheme`).
- A toggle in the header lets them switch. The choice is saved in `localStorage` (wrapped in `try/catch`, because some browsers block it).
- A tiny script in `index.html` sets the theme **before** the page paints, so there is no white flash in dark mode.

---

## 3. Fonts

| Role | Font | Why |
|---|---|---|
| Headings | **Bricolage Grotesque** (600–700, self-hosted) | Has character, a little technical, not the usual Inter/Poppins |
| Body and UI | **Instrument Sans** (400, 500, 600) | Very readable on phones |
| Code (inside the app window only) | **JetBrains Mono** (400) | Only where real code or logs are shown |

Type scale (ratio 1.25). Use these sizes only:

| Token | Size | Use |
|---|---|---|
| `text-xs` | 13px | Fine print |
| `text-sm` | 14px | Captions, chips |
| `text-base` | 16px | Body (minimum on phones) |
| `text-lg` | 20px | Lead paragraph |
| `text-xl` | 25px | Card titles |
| `text-2xl` | 31px | Section headings (phone) |
| `text-3xl` | 39px | Section headings (desktop) |
| `text-display` | clamp 44px → 76px | Hero name line only |

Rules:
- Line length under **70 characters** (`max-w-prose`).
- Body line-height 1.6, headings 1.1.
- **No ALL CAPS labels.** No small label above every heading.
- **Do not color or italicize one word** inside a headline.

---

## 4. Layout and spacing

- Spacing scale: **4px steps** (Tailwind default: 1 = 4px). Section gaps: `py-24` desktop, `py-16` phone.
- Max content width: **1120px**, centered, with **16px side padding** on phones.
- Text is **left-aligned**. Only the hero may center if it reads better.
- Corner radius by importance, not one size for all:
  - App window: `rounded-window` (16px)
  - Cards and steps: `rounded-card` (10px)
  - Chips and status pills: `rounded-full`
- Shadows: only the app window has a shadow (`shadow-window`). Cards use a border, not a shadow.
- Design **phone first** (390px wide), then widen.

Page order:

```
┌─ Header: name · theme toggle · Email · Resume ───────────┐
│  Hero: who I am in one line + live "pending" card        │
├─ #1 AgentGuard story (pinned app window, 4 steps) ───────┤
├─ #2 Career journey (line draws, numbers count up) ───────┤
├─ #3 Architecture (layers separate on scroll) ────────────┤
├─ Projects: AgentGuard (live), AgentReplay (npm) ─────────┤
└─ Contact: email, LinkedIn, GitHub (no phone number) ─────┘
```

---

## 5. Motion rules

Motion exists only to **explain**, never to decorate.

| Allowed | Not allowed |
|---|---|
| One hero load moment (the pending card appears) | Fade-and-slide-up on every section |
| Scroll-scrubbed motion in sections #1, #2, #3 only | Hover animations on every card |
| Pinning with **native scroll** (GSAP ScrollTrigger `pin`) | Scrolljacking: taking over the wheel, snapping pages, changing scroll speed |
| Counting numbers in #2 | Parallax backgrounds, cursor followers, particles |

Technical rules:
- Use **GSAP + ScrollTrigger** via `useGSAP()` (auto cleanup). Animate only `transform` and `opacity` (smooth on cheap phones).
- Wrap all motion in `gsap.matchMedia()`:
  - `(prefers-reduced-motion: no-preference)` → full motion.
  - `(prefers-reduced-motion: reduce)` → **no motion**. Show every step's final state, stacked, fully readable.
- Pin length: desktop up to `+=300%`, phone max `+=200%`. Long pins feel stuck on phones.
- Content must make sense **with JavaScript off**: all text is in the HTML; animation only moves it.
- Easing: `power2.out` for one-off moments, `none` for scroll-scrubbed motion. Durations 200–600ms.

---

## 6. Words on the page

- Sentence case everywhere. Plain words. Active voice.
- Buttons say exactly what happens: "Email Deepak", "Open AgentGuard", "Download resume".
- No `→` after button text. No `A · B · C` meta strings. No "WORD — fragment" labels.
- Name: **Deepak R**. Use **"StratumCare"** (not NueAssist) for that platform.
- **No phone number** on the page.
- All text lives in `src/data/content.ts`. Never invent facts: if a date or number is unknown, leave it out.

---

## 7. Quality checks (run before every push)

| Command | What it checks |
|---|---|
| `npm run check:contrast` | Every text/background pair in both themes passes AA |
| `npm run check:visual` | Screenshots at desktop (1440×900) and phone (390×844), light and dark, plus reduced motion, at each scroll step. Saved to `checks/screenshots/` |
| `npm run build` | TypeScript and build have no errors |

Before calling a section "done", look at its screenshots and confirm:
1. Readable on phone, nothing cut off, no sideways scroll.
2. Both themes look right.
3. Reduced-motion version shows all content.
4. Keyboard focus is visible (amber ring).
5. Only one amber accent per screen (outside the story).
