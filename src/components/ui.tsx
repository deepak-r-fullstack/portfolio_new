import type { ReactNode } from 'react'

/* Small shared building blocks. Colors come only from tokens (DESIGN.md §2). */

export type Status = 'running' | 'pending' | 'approved' | 'blocked' | 'undone'

const statusStyle: Record<Status, { label: string; className: string }> = {
  running: { label: 'Running', className: 'bg-canvas text-muted border border-line' },
  pending: { label: 'Waiting for approval', className: 'bg-pending-soft text-pending' },
  approved: { label: 'Approved', className: 'bg-approved-soft text-approved' },
  blocked: { label: 'Blocked', className: 'bg-blocked-soft text-blocked' },
  undone: { label: 'Undone', className: 'bg-canvas text-ink border border-line' },
}

export const StatusPill = ({ status }: { status: Status }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap ${statusStyle[status].className}`}
  >
    <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
    {statusStyle[status].label}
  </span>
)

/** The one element with a shadow: a product window frame. */
export const AppWindow = ({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) => (
  <div className={`overflow-hidden rounded-window border border-line bg-surface shadow-window ${className}`}>
    <div className="flex items-center gap-2 border-b border-line px-4 py-3">
      <span aria-hidden="true" className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
      </span>
      <p className="text-sm text-muted">{title}</p>
    </div>
    <div className="p-4 md:p-5">{children}</div>
  </div>
)

/** Section heading + optional lead paragraph, left aligned. */
export const SectionIntro = ({ id, heading, lead }: { id: string; heading: string; lead?: string }) => (
  <div className="mb-10 max-w-prose md:mb-14">
    <h2 id={id} className="text-2xl md:text-3xl">
      {heading}
    </h2>
    {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
  </div>
)

/** Text link styled as a button. Primary = ink fill, secondary = outline. */
export const ButtonLink = ({
  href,
  children,
  variant = 'secondary',
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
}) => {
  const isExternal = href.startsWith('http')
  const style =
    variant === 'primary'
      ? 'bg-ink text-canvas hover:opacity-90'
      : 'border border-line text-ink hover:bg-surface'

  return (
    <a
      href={href}
      {...(isExternal && { target: '_blank', rel: 'noreferrer' })}
      className={`inline-flex min-h-11 items-center rounded-full px-5 text-base font-medium transition-colors ${style}`}
    >
      {children}
    </a>
  )
}
