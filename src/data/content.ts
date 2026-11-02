/*
 * All words on the page live here (DESIGN.md §6).
 * Rule: only facts Deepak has confirmed. If a date or number is unknown,
 * leave the field out — the UI hides anything empty.
 */

export const profile = {
  name: 'Deepak R',
  title: 'Full-stack technical lead',
  intro:
    'I build React and Node.js products for healthcare and transportation, and tools that keep AI agents from doing damage.',
  location: 'Based in Bengaluru, open to remote roles',
  email: 'ravideep1771@gmail.com',
  linkedin: 'https://www.linkedin.com/in/deepak-r-fullstack',
  github: 'https://github.com/deepak-r-fullstack',
  // TODO(Deepak): put your resume PDF in /public with this exact name to show the button
  resumeUrl: '',
}

/* ---------- Hero: the "pending approval" card ---------- */
export const heroRequest = {
  agent: 'Support agent',
  action: 'refund_order',
  detail: '₹18,400 to order #4821',
  rule: 'Refunds over ₹10,000 need a manager',
}

/* ---------- #1 AgentGuard story (scroll steps) ---------- */
export type StoryStep = {
  heading: string
  body: string
}

export const agentGuardStory: StoryStep[] = [
  {
    heading: 'An AI agent tries something risky',
    body: 'A CRM agent decides to clean up old contacts and calls delete on 500 records. Without a guard, they are gone.',
  },
  {
    heading: 'AgentGuard pauses it',
    body: 'The call matches a policy: deleting more than 100 records needs a person. The agent waits instead of acting.',
  },
  {
    heading: 'A manager approves in Slack',
    body: 'The request lands in Slack with the reason and the exact change. One tap approves or rejects it.',
  },
  {
    heading: 'Mistake? Undo in one click',
    body: 'Every step is in the audit trail. If the approval was wrong, Undo restores the 500 records.',
  },
]

/* ---------- #2 Career journey ---------- */
export type CareerStop = {
  period?: string
  role: string
  place: string
  points: string[]
}

export const careerStats = [
  { value: 7, suffix: '', label: 'years building software' },
  { value: 6, suffix: '', label: 'people on the team I led' },
  { value: 3, suffix: '', label: 'industries: healthcare, transport, public safety' },
]

export const career: CareerStop[] = [
  {
    role: 'Diploma, then B.E. Computer Science',
    place: 'Bapuji Institute of Engineering & Technology, Davanagere',
    period: '2014 – 2017',
    points: ['Joined the B.E. in the second year through lateral entry after a three-year diploma.'],
  },
  {
    // TODO(Deepak): add your Navjoy start/end dates as `period`
    role: 'Senior engineer, then tech lead',
    place: 'Navjoy',
    points: [
      'Built HCBS, transportation and public safety platforms.',
      'Shipped scheduling, report generation, a public API and digital signatures.',
    ],
  },
  {
    role: 'Technical lead',
    place: 'StratumCare',
    period: 'Jul 2026 – Oct 2026',
    points: [
      'Led a team of six: three developers and three testers, US and India.',
      'Owned AWS infrastructure, EVV integrations, mobile and billing.',
    ],
  },
  {
    role: 'Building',
    place: 'AgentGuard and AgentReplay',
    period: 'Now',
    points: ['Open-source safety tools for AI agents: approvals, audit trail, replay and undo.'],
  },
]

/* ---------- #3 Architecture layers (top to bottom) ---------- */
export type ArchLayer = {
  name: string
  tech: string
  job: string
}

export const architecture: ArchLayer[] = [
  { name: 'Your AI agent', tech: 'MCP or SDK', job: 'Asks before it acts' },
  { name: 'Policy engine', tech: 'Node.js + Express', job: 'Decides: allow, pause or block' },
  { name: 'Approvals', tech: 'React dashboard + Slack', job: 'A person says yes or no' },
  { name: 'Audit trail', tech: 'MongoDB Atlas', job: 'Records every step, powers undo' },
]

/* ---------- Projects ---------- */
export type Project = {
  name: string
  summary: string
  stack: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    name: 'AgentGuard',
    summary: 'Approvals, audit trail and undo for AI agents. Works over MCP, with approvals in Slack.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Slack API', 'MCP'],
    links: [
      { label: 'Open AgentGuard', href: 'https://agentguard.sritaraksolutions.in' },
      { label: 'View code', href: 'https://github.com/deepak-r-fullstack/agentguard' },
    ],
  },
  {
    name: 'AgentReplay',
    summary: 'Replay a failed AI agent run, fix it, and turn the failure into a test. Companion to AgentGuard.',
    stack: ['TypeScript', 'Node.js', 'npm package'],
    links: [
      { label: 'View on npm', href: 'https://www.npmjs.com/package/@sritarak/agentreplay' },
      { label: 'View code', href: 'https://github.com/deepak-r-fullstack/agent_replay' },
    ],
  },
]
