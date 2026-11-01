// ==========================================================================
// Contrast check — every text color must pass WCAG AA on canvas and surface,
// in both themes. Reads colors straight from src/styles/tokens.css, so the
// check can never drift from the real tokens. (DESIGN.md §2)
// Run: npm run check:contrast
// ==========================================================================
import { readFileSync } from 'node:fs'

const AA_TEXT = 4.5 // normal text
const AA_UI = 3 // large text, icons, borders of controls

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8')

// Pull "--name: #hex" pairs out of one CSS block
const readBlock = (selector) => {
  const start = css.indexOf(selector)
  const block = css.slice(start, css.indexOf('}', start))
  const colors = {}
  for (const [, name, hex] of block.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)) colors[name] = hex
  return colors
}

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const light = readBlock(':root {')
const dark = { ...light, ...readBlock(":root[data-theme='dark']") }

// [foreground, minimum ratio]
const textPairs = [
  ['ink', AA_TEXT],
  ['muted', AA_TEXT],
  ['pending', AA_TEXT],
  ['approved', AA_TEXT],
  ['blocked', AA_TEXT],
  ['line', 1.2], // decorative divider only: just needs to be visible
]

let failed = 0
for (const [themeName, colors] of [['light', light], ['dark', dark]]) {
  console.log(`\n${themeName} theme`)
  for (const bg of ['canvas', 'surface']) {
    for (const [fg, min] of textPairs) {
      const r = ratio(colors[fg], colors[bg])
      const ok = r >= min
      if (!ok) failed++
      console.log(`  ${ok ? 'pass' : 'FAIL'}  ${fg.padEnd(9)} on ${bg.padEnd(8)} ${r.toFixed(2)} : 1  (needs ${min})`)
    }
  }
}

console.log(failed ? `\n${failed} pair(s) failed.` : '\nAll pairs pass.')
process.exit(failed ? 1 : 0)
