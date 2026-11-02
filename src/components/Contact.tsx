import { profile } from '../data/content'
import { ButtonLink } from './ui'

/** Contact: email first, then LinkedIn and GitHub. No phone number by choice. */
export const Contact = () => (
  <footer aria-labelledby="contact-heading" className="border-t border-line bg-surface">
    <div className="mx-auto max-w-page px-4 py-16 md:px-8 md:py-24">
      <h2 id="contact-heading" className="max-w-prose text-2xl md:text-3xl">
        Hiring for a full-stack or AI product role? Let's talk.
      </h2>
      <p className="mt-4 max-w-prose text-lg text-muted">
        Email is the fastest way to reach me.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={`mailto:${profile.email}`} variant="primary">
          Email Deepak
        </ButtonLink>
        <ButtonLink href={profile.linkedin}>LinkedIn</ButtonLink>
        <ButtonLink href={profile.github}>GitHub</ButtonLink>
        {profile.resumeUrl && <ButtonLink href={profile.resumeUrl}>Download resume</ButtonLink>}
      </div>
      <p className="mt-6 text-sm text-muted">{profile.email}</p>
      <p className="mt-16 text-sm text-muted">© {new Date().getFullYear()} {profile.name}</p>
    </div>
  </footer>
)
