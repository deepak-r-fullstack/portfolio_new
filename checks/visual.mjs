// ==========================================================================
// Visual check — screenshots the built site the way real visitors see it:
//   desktop 1440x900 and phone 390x844, light and dark theme,
//   full motion and reduced motion, at every scroll step.
// It also FAILS on: sideways scroll, console errors, missing fonts.
// Screenshots go to checks/screenshots/<case>/NN.png  (DESIGN.md §7)
//
// Run: npm run check:visual            (builds first, then serves dist/)
//      npm run check:visual -- phone   (only cases whose name includes "phone")
// ==========================================================================
import { spawn } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { chromium } from 'playwright'

const PORT = 4179
const BASE_URL = `http://localhost:${PORT}/`
const OUT_DIR = new URL('./screenshots/', import.meta.url).pathname
const filter = process.argv[2] ?? ''

const viewports = {
  desktop: { width: 1440, height: 900 },
  phone: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
}

const cases = []
for (const [device, viewport] of Object.entries(viewports))
  for (const theme of ['light', 'dark'])
    for (const motion of ['full', 'reduced'])
      cases.push({ name: `${device}-${theme}-${motion}`, viewport, theme, motion })

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// ---- Serve the production build ------------------------------------------
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' })
for (let i = 0; i < 40; i++) {
  try {
    if ((await fetch(BASE_URL)).ok) break
  } catch {}
  await wait(250)
}

rmSync(OUT_DIR, { recursive: true, force: true })
// Uses Playwright's own Chromium. If that isn't installed (npx playwright install chromium),
// point CHROME_PATH at any Chrome, e.g. CHROME_PATH=/usr/bin/google-chrome
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined })
const problems = []

for (const c of cases.filter((x) => x.name.includes(filter))) {
  const { isMobile, hasTouch, deviceScaleFactor, ...size } = c.viewport
  const context = await browser.newContext({
    viewport: size,
    isMobile,
    hasTouch,
    deviceScaleFactor: deviceScaleFactor ?? 1,
    reducedMotion: c.motion === 'reduced' ? 'reduce' : 'no-preference',
    colorScheme: c.theme,
  })
  const page = await context.newPage()
  page.on('console', (m) => m.type() === 'error' && problems.push(`${c.name}: console error: ${m.text()}`))
  page.on('pageerror', (e) => problems.push(`${c.name}: page error: ${e.message}`))

  // Saved theme wins over OS setting, so set it explicitly for each case
  await context.addInitScript((t) => localStorage.setItem('theme', t), c.theme)
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  // A font counts only if one of its faces actually finished loading
  const fontsOk = await page.evaluate(() =>
    ['Bricolage Grotesque Variable', 'Instrument Sans'].every((family) =>
      [...document.fonts].some((f) => f.family.replace(/"/g, '') === family && f.status === 'loaded'),
    ),
  )
  if (!fontsOk) problems.push(`${c.name}: web fonts did not load (falling back to system font)`)

  const dir = `${OUT_DIR}${c.name}/`
  mkdirSync(dir, { recursive: true })

  // Scroll in steps of 60% of the screen so pinned scenes are caught mid-way
  const step = Math.round(size.height * 0.6)
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  let n = 0
  for (let y = 0; y <= total; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
    await wait(350) // let scrubbed animations settle
    await page.screenshot({ path: `${dir}${String(n++).padStart(2, '0')}.png` })

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    if (overflow > 0) problems.push(`${c.name}: sideways scroll of ${overflow}px at y=${y}`)
  }
  console.log(`  ${c.name}: ${n} screenshots`)
  await context.close()
}

await browser.close()
server.kill()

const unique = [...new Set(problems)]
console.log(unique.length ? `\nProblems:\n  ${unique.join('\n  ')}` : '\nNo problems found.')
console.log(`Screenshots: ${OUT_DIR}`)
process.exit(unique.length ? 1 : 0)
