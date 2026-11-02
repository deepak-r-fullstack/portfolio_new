import { profile } from '../data/content'
import { ThemeToggle } from './ThemeToggle'

export const Header = () => (
  <header className="sticky top-0 z-30 border-b border-line bg-canvas/90 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-3 px-4 md:px-8">
      <a href="#top" className="font-display text-lg font-bold">
        {profile.name}
      </a>
      <nav aria-label="Main" className="flex items-center gap-2 md:gap-3">
        <a href="#work" className="hidden px-2 text-base text-muted hover:text-ink sm:inline">
          My work
        </a>
        {profile.resumeUrl && (
          <a href={profile.resumeUrl} className="hidden px-2 text-base text-muted hover:text-ink sm:inline">
            Resume
          </a>
        )}
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-sm font-medium text-canvas hover:opacity-90"
        >
          Email me
        </a>
        <ThemeToggle />
      </nav>
    </div>
  </header>
)
