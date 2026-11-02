import { useRef } from 'react'
import { career, careerStats } from '../data/content'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'
import { SectionIntro } from './ui'

/*
 * Scroll idea #2 — career journey.
 * The timeline line draws itself as you scroll (scrubbed), and the numbers
 * count up once when they come into view. Final values are in the HTML,
 * so reduced motion / no JavaScript still shows everything.
 */
export const CareerJourney = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // Line grows with scroll position
        gsap.fromTo(
          '[data-line-fill]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 70%', scrub: true },
          },
        )

        // Each stop's dot fills in when the line reaches it
        gsap.utils.toArray<HTMLElement>('[data-stop-dot]').forEach((dot) => {
          gsap.fromTo(
            dot,
            { backgroundColor: 'var(--canvas)' },
            {
              backgroundColor: 'var(--ink)',
              duration: 0.2,
              scrollTrigger: { trigger: dot, start: 'top 70%', toggleActions: 'play none none reverse' },
            },
          )
        })

        // Numbers count up once
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count)
          const counter = { value: 0 }
          gsap.to(counter, {
            value: target,
            duration: 1,
            ease: 'power2.out',
            snap: { value: 1 },
            onUpdate: () => {
              el.textContent = String(counter.value)
            },
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      aria-labelledby="career-heading"
      className="border-y border-line bg-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-page px-4 md:px-8">
        <SectionIntro
          id="career-heading"
          heading="How I got here"
          lead="From a diploma in Karnataka to leading a US healthcare platform team."
        />

        <dl className="mb-14 grid gap-6 sm:grid-cols-3">
          {careerStats.map((stat) => (
            <div key={stat.label} className="flex flex-col border-l-2 border-ink pl-4">
              <dt className="order-2 text-sm text-muted">{stat.label}</dt>
              <dd className="order-1 font-display text-3xl font-bold" data-count={stat.value}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <ol data-timeline className="relative space-y-12 pl-10 md:pl-14">
          {/* Track + fill, both 2px; fill scales from the top */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-line md:left-[11px]" />
          <span
            aria-hidden="true"
            data-line-fill
            className="absolute top-2 bottom-2 left-[7px] w-0.5 origin-top bg-ink md:left-[11px]"
          />

          {career.map((stop) => (
            <li key={stop.place} className="relative">
              <span
                aria-hidden="true"
                data-stop-dot
                className="absolute top-1.5 -left-10 size-4 rounded-full border-2 border-ink bg-ink md:-left-14 md:size-6"
              />
              {stop.period && <p className="text-sm text-muted">{stop.period}</p>}
              <h3 className="mt-1 text-xl">{stop.role}</h3>
              <p className="mt-1 text-base font-medium">{stop.place}</p>
              <ul className="mt-3 max-w-prose space-y-1.5 text-base text-muted">
                {stop.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
