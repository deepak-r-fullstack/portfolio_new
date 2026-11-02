import { useRef, useState } from 'react'
import { agentGuardStory } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { AppWindow, SectionIntro, StatusPill, type Status } from './ui'

/*
 * Scroll idea #1 — "Watch AgentGuard work".
 * The product window stays pinned (CSS sticky = native scroll, no scrolljacking)
 * while the step text scrolls past. Whichever step is in view drives the window.
 * Reduced motion: no pinning, each step shows its own window snapshot.
 */

const stepStatus: Status[] = ['running', 'pending', 'approved', 'undone']

// Audit trail grows as the story moves forward; [text, step it appears at]
const auditEntries: [string, number][] = [
  ['Agent requested delete_records', 0],
  ['Paused: matched rule "bulk delete"', 1],
  ['Approved in Slack by ops manager', 2],
  ['Executed: 500 records deleted', 2],
  ['Undone: 500 records restored', 3],
]

const StoryWindow = ({ step }: { step: number }) => (
  <AppWindow title="AgentGuard, run #1042">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <p className="text-base font-semibold">CRM agent</p>
      <StatusPill status={stepStatus[step]} />
    </div>
    <p className="mt-3 rounded-card border border-line bg-canvas px-3 py-2 font-code text-xs break-words md:text-sm">
      crm.delete_records({'{'} filter: "inactive", count: 500 {'}'})
    </p>

    {/* Context row changes with the step */}
    <div className="mt-3 min-h-12 text-sm">
      {step === 0 && <p className="text-muted">Agent is about to call the tool.</p>}
      {step === 1 && <p className="text-pending">Rule: deleting more than 100 records needs a person.</p>}
      {step === 2 && (
        <p className="text-approved">Ops manager tapped Approve in #approvals on Slack.</p>
      )}
      {step === 3 && (
        <div className="flex items-center justify-between gap-3">
          <p className="text-ink">Wrong call? Roll it back.</p>
          <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-canvas">Undo</span>
        </div>
      )}
    </div>

    <p className="mt-4 mb-2 text-xs text-muted">Audit trail</p>
    <ol className="space-y-1.5 border-l border-line pl-3 text-sm">
      {auditEntries.map(([text, at]) => (
        <li
          key={text}
          className={`motion-safe:transition-opacity motion-safe:duration-300 ${
            step >= at ? 'opacity-100' : 'opacity-0'
          } ${at === step ? 'text-ink' : 'text-muted'}`}
          aria-hidden={step < at}
        >
          {text}
        </li>
      ))}
    </ol>
  </AppWindow>
)

const StepText = ({ index, heading, body }: { index: number; heading: string; body: string }) => (
  <div className="flex gap-4">
    <span
      aria-hidden="true"
      className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line text-sm font-semibold"
    >
      {index + 1}
    </span>
    <div>
      <h3 className="text-xl">{heading}</h3>
      <p className="mt-2 max-w-prose text-base text-muted md:text-lg">{body}</p>
    </div>
  </div>
)

export const AgentGuardStory = () => {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const stepsRef = useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      if (reduced) return
      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 65%',
          end: 'bottom 65%',
          onToggle: (self) => self.isActive && setStep(i),
        })
      })
    },
    { scope: stepsRef, dependencies: [reduced] },
  )

  return (
    <section id="work" aria-labelledby="story-heading" className="mx-auto max-w-page px-4 py-16 md:px-8 md:py-24">
      <SectionIntro
        id="story-heading"
        heading="AgentGuard: a pause button for AI agents"
        lead="AI agents can now delete data and move money. My open-source project makes them ask first. Scroll to watch one request."
      />

      {reduced ? (
        // Reduced motion: every step with its own snapshot, nothing moves
        <ol className="space-y-14">
          {agentGuardStory.map((s, i) => (
            <li key={s.heading} className="grid gap-6 md:grid-cols-2 md:items-center">
              <StepText index={i} {...s} />
              <StoryWindow step={i} />
            </li>
          ))}
        </ol>
      ) : (
        <div className="grid md:grid-cols-2 md:gap-16">
          {/* Window: sticky under the 64px header; first on phone, right on desktop */}
          <div className="sticky top-20 z-10 self-start bg-canvas pb-4 md:order-2 md:top-[18vh] md:bg-transparent md:pb-0">
            <StoryWindow step={step} />
            {/* Phone only: the step text sits under the window, so the window never hides it */}
            <div className="mt-5 min-h-40 md:hidden" aria-hidden="true">
              <StepText index={step} {...agentGuardStory[step]} />
            </div>
          </div>
          {/*
            Desktop: the visible step list. Phone: invisible scroll spacers that
            drive the step (text still read by screen readers).
          */}
          <ol ref={stepsRef} className="md:order-1">
            {agentGuardStory.map((s, i) => (
              <li
                key={s.heading}
                data-step
                className={`flex min-h-[55vh] items-center md:min-h-[75vh] motion-safe:transition-opacity motion-safe:duration-300 ${
                  step === i ? 'md:opacity-100' : 'md:opacity-40'
                }`}
              >
                <div className="sr-only md:not-sr-only">
                  <StepText index={i} {...s} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}

