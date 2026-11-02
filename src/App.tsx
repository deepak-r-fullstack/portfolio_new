import { AgentGuardStory } from './components/AgentGuardStory'
import { ArchitectureStack } from './components/ArchitectureStack'
import { CareerJourney } from './components/CareerJourney'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'

/* Page order follows DESIGN.md §4 */
const App = () => (
  <>
    <a
      href="#work"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
    >
      Skip to my work
    </a>
    <Header />
    <main>
      <Hero />
      <AgentGuardStory />
      <CareerJourney />
      <ArchitectureStack />
      <Projects />
    </main>
    <Contact />
  </>
)

export default App
