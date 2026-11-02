import { useRef } from 'react'
import { architecture } from '../data/content'
import { gsap, IS_PHONE, MOTION_OK, useGSAP } from '../lib/gsap'
import { SectionIntro } from './ui'

/*
 * Scroll idea #3 — "exploding" architecture (the Apple AirPods-style moment).
 * Drawn with CSS 3D planes instead of an image sequence: no heavy downloads,
 * sharp on every screen, and it follows the light/dark theme.
 * The section pins while the layers lift apart; labels appear one by one.
 * Reduced motion: shown already separated, nothing pins.
 */

// Distance between planes when fully separated (px)
const GAP_OPEN = { phone: 46, desktop: 78 }
const GAP_CLOSED = 10

export const ArchitectureStack = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motionOk: MOTION_OK, phone: IS_PHONE }, (ctx) => {
        const { motionOk, phone } = ctx.conditions as { motionOk: boolean; phone: boolean }
        if (!motionOk) return
        const gap = phone ? GAP_OPEN.phone : GAP_OPEN.desktop
        const planes = gsap.utils.toArray<HTMLElement>('[data-plane]')
        const labels = gsap.utils.toArray<HTMLElement>('[data-label]')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: phone ? 'top 72px' : 'top 12%',
            end: phone ? '+=140%' : '+=200%', // DESIGN.md §5: phone pins stay short
            pin: true,
            scrub: true,
          },
        })

        // Start stacked tight, labels hidden
        planes.forEach((plane, i) => gsap.set(plane, { z: (planes.length - 1 - i) * GAP_CLOSED }))
        gsap.set(labels, { opacity: 0.15 })

        // Lift apart (top layer travels furthest), then reveal labels top-down
        planes.forEach((plane, i) => {
          tl.to(plane, { z: (planes.length - 1 - i) * gap, ease: 'none', duration: 1 }, 0)
        })
        labels.forEach((label, i) => {
          tl.to(label, { opacity: 1, ease: 'none', duration: 0.3 }, 0.4 + i * 0.25)
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} aria-labelledby="arch-heading" className="mx-auto max-w-page px-4 py-16 md:px-8 md:py-24">
      <SectionIntro
        id="arch-heading"
        heading="What's inside AgentGuard"
        lead="Four layers, each with one job. Scroll to pull them apart."
      />

      <div ref={pinRef} className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
        {/* 3D stack — size comes from CSS vars so phone and desktop differ */}
        <div
          aria-hidden="true"
          className="relative mx-auto h-[300px] w-full [--plane:150px] [--gap:46px] md:h-[440px] md:[--plane:230px] md:[--gap:78px] [perspective:1400px]"
        >
          <div className="absolute top-1/2 left-1/2 [transform:translate(-50%,-30%)_rotateX(58deg)_rotateZ(-42deg)] [transform-style:preserve-3d]">
            {architecture.map((layer, i) => (
              <div
                key={layer.name}
                data-plane
                className={`absolute -top-[calc(var(--plane)/2)] -left-[calc(var(--plane)/2)] flex size-[var(--plane)] items-end justify-start rounded-card border-2 bg-surface p-2.5 md:p-4 ${
                  i === 1 ? 'border-pending' : 'border-line'
                }`}
                // Default = separated, so reduced motion / no JS shows the open state
                style={{ transform: `translateZ(calc(var(--gap) * ${architecture.length - 1 - i}))` }}
              >
                {/* Name on the near edge, so it stays visible under the layer above */}
                <span className="font-display text-xs font-bold md:text-base">{layer.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Labels, same order as planes: top to bottom */}
        <ol className="space-y-3 md:space-y-6">
          {architecture.map((layer, i) => (
            <li key={layer.name} data-label className="flex gap-3 md:gap-4">
              <span
                aria-hidden="true"
                className={`mt-2 h-0.5 w-5 shrink-0 md:w-8 ${i === 1 ? 'bg-pending' : 'bg-ink'}`}
              />
              <div>
                <h3 className="text-base md:text-xl">
                  {layer.name}
                  <span className="ml-2 text-sm font-normal text-muted">{layer.tech}</span>
                </h3>
                <p className="text-sm text-muted md:mt-1 md:text-base">{layer.job}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
