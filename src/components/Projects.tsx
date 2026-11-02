import { projects } from '../data/content'
import { ButtonLink, SectionIntro } from './ui'

/** Plain, fast project list: no motion here on purpose (DESIGN.md §5). */
export const Projects = () => (
  <section aria-labelledby="projects-heading" className="mx-auto max-w-page px-4 py-16 md:px-8 md:py-24">
    <SectionIntro id="projects-heading" heading="Try them yourself" lead="Both are live and open source." />

    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <article key={project.name} className="flex flex-col rounded-card border border-line bg-surface p-6">
          <h3 className="text-xl">{project.name}</h3>
          <p className="mt-3 text-base text-muted">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full border border-line px-3 py-1 text-sm">
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3 pt-2 md:mt-auto">
            {project.links.map((link, i) => (
              <ButtonLink key={link.href} href={link.href} variant={i === 0 ? 'primary' : 'secondary'}>
                {link.label}
              </ButtonLink>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>
)
