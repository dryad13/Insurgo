/*
 * Content for Insurgo v2.
 * Same narrative as v1 — rewritten slightly to fit the new tone:
 * "precision over spectacle", less marketing fluff, more systems language.
 */

export const CONTENT = {
  nav: {
    links: [
      { label: 'Philosophy', href: '#philosophy' },
      { label: 'Systems', href: '#systems' },
      { label: 'Flow', href: '#flow' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: { label: 'Book a call', href: '#contact' },
  },

  hero: {
    eyebrow: 'Systems engineering',
    headline: 'Autonomous systems\nfor modern businesses.',
    subheadline:
      'We design and build the infrastructure that replaces repetitive operational work — across lead handling, customer communication, and internal workflows.',
    primaryCta: { label: 'Explore systems', href: '#systems' },
    secondaryCta: { label: 'Talk to Insurgo', href: '#contact' },
  },

  philosophy: {
    eyebrow: 'Philosophy',
    title: 'If a process repeats, it should be automated.',
    paragraphs: [
      'Most businesses still rely on manual processes to grow — answering leads, following up, managing workflows, and stitching together tools that don\'t scale.',
      'We believe this is broken.',
    ],
    closing: [
      'Instead of adding more people to solve problems, we engineer systems that solve them once — and run continuously.',
      'This is not marketing. This is growth infrastructure.',
    ],
  },

  systems: {
    eyebrow: 'What we build',
    title: 'Three core systems.\nOne operating principle.',
    cards: [
      {
        label: 'Lead systems',
        title: 'Autonomous inbound conversion',
        description:
          'AI agents that handle inbound calls, qualify leads, and schedule bookings without human intervention.',
        outcomes: ['Inbound capture', 'Conversational qualification', 'Automated booking'],
      },
      {
        label: 'Workflow Logic',
        title: 'Internal operations infrastructure',
        description:
          'Systems that eliminate repetitive workflows across support, operations, and internal processes.',
        outcomes: ['Event-driven triggers', 'Scoped task execution', 'Audit trail by default'],
      },
      {
        label: 'Data Infrastructure',
        title: 'Tracking & analytics systems',
        description:
          'Conversion-focused commerce infrastructure and custom intelligence pipelines for decision-making.',
        outcomes: ['Source-of-truth pipelines', 'Live dashboards', 'Tracking that survives changes'],
      },
    ],
  },

  flow: {
    eyebrow: 'Example',
    title: 'How the system runs',
    intro:
      'The moment a lead lands, the system fires — qualifies, books, logs, follows up. No delays. No missed opportunities. No manual effort.',
    steps: [
      { id: '01', label: 'Lead comes in' },
      { id: '02', label: 'AI agent responds instantly' },
      { id: '03', label: 'Gathers context' },
      { id: '04', label: 'Books appointment' },
      { id: '05', label: 'Logs data & triggers follow-up' },
    ],
  },

  builder: {
    eyebrow: 'Built by a systems thinker',
    title: 'Fewer moving parts. More leverage per part.',
    paragraphs: [
      'Insurgo is built from hands-on experimentation across AI, automation, commerce, and data systems.',
      'Every system is designed from first principles — not templates, not playbooks.',
    ],
    stack: ['AI', 'Automation', 'Commerce', 'Data'],
    stackResult: 'Unified system',
  },

  chat: {
    eyebrow: 'Try it',
    title: 'Talk to the system',
    intro:
      'Instead of reading about what we do — experience it. Describe your business and the system will suggest an architecture.',
    placeholder: 'Describe your business — we\'ll propose a system.',
    prompts: [
      'How can I automate lead follow-up?',
      'What system would improve my e-commerce operations?',
      'Can AI qualify my inbound leads?',
    ],
    sampleResponse:
      'One possible architecture:\n\nInbound inquiry → AI qualification → intent scoring → CRM sync → appointment booking → automated follow-up\n\nThis removes the bottleneck between a lead arriving and an agent handling it.',
  },

  cta: {
    eyebrow: 'Next step',
    headline: 'Replace manual work with systems.',
    subtext:
      'Whether you need autonomous lead handling, workflow automation, or revenue infrastructure — Insurgo engineers the system behind it.',
    primary: { label: 'Start a conversation', href: 'mailto:hello@insurgo.systems' },
    secondary: { label: 'View architecture', href: '#flow' },
  },

  footer: {
    tagline: 'Autonomous systems for modern businesses.',
    columns: [
      {
        heading: 'Product',
        links: [
          { label: 'Philosophy', href: '#philosophy' },
          { label: 'Systems', href: '#systems' },
          { label: 'Flow', href: '#flow' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'Contact', href: '#contact' },
          { label: 'Email', href: 'mailto:hello@insurgo.systems' },
        ],
      },
    ],
    copyright: '© Insurgo Systems. All rights reserved.',
  },
};
