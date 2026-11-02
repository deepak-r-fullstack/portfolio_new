# Deepak R — portfolio

Personal portfolio for **deepak.sritaraksolutions.in**. React + TypeScript + Tailwind CSS + GSAP, built with Vite.

## Run locally

```bash
npm install
npm run dev
```

## Where things live

| What | Where |
|---|---|
| All page text | `src/data/content.ts` |
| Colors, fonts (light + dark) | `src/styles/tokens.css` |
| Design rules | `DESIGN.md` |
| Scroll sections | `src/components/AgentGuardStory.tsx`, `CareerJourney.tsx`, `ArchitectureStack.tsx` |

## Checks (run before pushing)

```bash
npm run check:contrast   # text readable in both themes
npm run check:visual     # screenshots: desktop + phone, light + dark, motion + reduced motion
```

If Playwright's browser isn't installed, run `npx playwright install chromium`,
or point at your Chrome: `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run check:visual`.

## Deploy

Every push to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`).
