import { ThemeToggle } from './components/ThemeToggle'

/*
 * TEMPORARY harness preview — proves tokens, fonts, themes and the visual
 * checker work. Replaced by the real page sections in the next step.
 */
const swatches = ['canvas', 'surface', 'ink', 'muted', 'line', 'pending', 'approved', 'blocked'] as const

const typeScale = [
  ['text-display', 'Deepak R'],
  ['text-3xl', 'Section heading on desktop'],
  ['text-2xl', 'Section heading on phone'],
  ['text-xl', 'Card title'],
  ['text-lg', 'Lead paragraph that introduces a section in one or two lines.'],
  ['text-base', 'Body text. Plain words, short lines, sentence case.'],
  ['text-sm', 'Caption or chip text'],
] as const

const App = () => (
  <main className="mx-auto max-w-page px-4 py-10 md:px-8">
    <header className="mb-12 flex items-center justify-between">
      <p className="font-display text-xl font-bold">Design harness preview</p>
      <ThemeToggle />
    </header>

    <section className="mb-16">
      <h2 className="mb-6 text-2xl md:text-3xl">Colors</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {swatches.map((name) => (
          <div key={name} className="rounded-card border border-line bg-surface p-3">
            <div className="mb-2 h-14 rounded-md border border-line" style={{ background: `var(--${name})` }} />
            <p className="text-sm text-muted">{name}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-16">
      <h2 className="mb-6 text-2xl md:text-3xl">Type scale</h2>
      <div className="space-y-4">
        {typeScale.map(([size, sample]) => (
          <div key={size} className="border-b border-line pb-3">
            <p className={`${size} ${size.match(/display|3xl|2xl|xl$/) ? 'font-display font-bold leading-tight' : ''}`}>{sample}</p>
            <p className="text-xs text-muted">{size}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="mb-6 text-2xl md:text-3xl">Status and app window</h2>
      <div className="rounded-window bg-surface p-5 shadow-window">
        <p className="mb-4 font-code text-sm text-muted">agent.delete_records(count: 500)</p>
        <div className="flex flex-wrap gap-2 text-sm font-medium">
          <span className="rounded-full bg-pending-soft px-3 py-1 text-pending">Waiting for approval</span>
          <span className="rounded-full bg-approved-soft px-3 py-1 text-approved">Approved</span>
          <span className="rounded-full bg-blocked-soft px-3 py-1 text-blocked">Blocked</span>
        </div>
      </div>
    </section>
  </main>
)

export default App
