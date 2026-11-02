import { useRef, useState } from 'react'
import { heroRequest, profile } from '../data/content'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'
import { AppWindow, ButtonLink, StatusPill, type Status } from './ui'

/**
 * Hero: who Deepak is + a live "pending approval" card the visitor can act on.
 * The card's entrance is the page's single load animation (DESIGN.md §5).
 */
export const Hero = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('pending')

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.from(cardRef.current, { y: 24, opacity: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' })
    })
  })

  const decided = status !== 'pending'

  return (
    <section id="top" aria-labelledby="hero-heading" className="mx-auto max-w-page px-4 pt-14 pb-20 md:px-8 md:pt-24 md:pb-28">
      <div className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
        <div>
          <h1 id="hero-heading" className="text-display">
            {profile.name}
          </h1>
          <p className="mt-3 font-display text-xl font-semibold md:text-2xl">{profile.title}</p>
          <p className="mt-6 max-w-prose text-lg text-muted">{profile.intro}</p>
          <p className="mt-3 text-base text-muted">{profile.location}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#work" variant="primary">
              See how I build
            </ButtonLink>
            <ButtonLink href={profile.linkedin}>LinkedIn</ButtonLink>
          </div>
        </div>

        <div ref={cardRef}>
          <AppWindow title="AgentGuard">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-base font-semibold">{heroRequest.agent}</p>
              <StatusPill status={status} />
            </div>
            <p className="mt-4 font-code text-sm break-words">
              {heroRequest.action}({heroRequest.detail})
            </p>
            <p className="mt-2 text-sm text-muted">{heroRequest.rule}</p>

            <div className="mt-5 flex flex-wrap gap-2" aria-live="polite">
              {decided ? (
                <>
                  <p className="text-sm text-muted">
                    {status === 'approved' ? 'Refund sent and logged.' : 'Refund stopped and logged.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('pending')}
                    className="ml-auto text-sm font-medium text-ink underline underline-offset-4"
                  >
                    Try again
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setStatus('approved')}
                    className="min-h-10 rounded-full bg-ink px-4 text-sm font-medium text-canvas hover:opacity-90"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('blocked')}
                    className="min-h-10 rounded-full border border-line px-4 text-sm font-medium hover:bg-canvas"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </AppWindow>
          <p className="mt-3 text-sm text-muted">This card is live. Approve or reject the agent's request.</p>
        </div>
      </div>
    </section>
  )
}
