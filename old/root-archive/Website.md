Build a premium, modern landing page for a company called “Insurgo”.

Context:
Insurgo is not a traditional marketing agency. It is a systems engineering studio that builds autonomous AI-powered systems for modern businesses. Its philosophy is to replace repetitive manual growth and operational work with engineered systems using AI, automation, data pipelines, and commerce infrastructure.

Brand story:
The name “Insurgo” comes from the idea of rising against the fluff and inefficiency of the marketing industry. The brand stands against manual bottlenecks, shallow agency jargon, and repetitive human-heavy workflows. It believes that if a process repeats, it should probably be automated.

Primary positioning:
“Autonomous Systems for Modern Businesses”

Supporting positioning:
“We design AI-powered systems that replace manual growth operations — from lead conversion to customer support.”

Target feel:
Clean, modern, dynamic, premium, technical, minimal.
Think Apple x Linear x modern AI lab.
The site should feel alive, intelligent, and sharp — not corporate, not noisy, not template-ish.

Tech requirements:
- Build this as a single-page React component/page
- Use Tailwind CSS
- Make it production-quality
- Use subtle motion and transitions
- Use Framer Motion for tasteful animations
- No heavy gradients everywhere; keep it elegant
- Make it responsive and especially polished on mobile
- Add soft glow, blur, and flow-line / systems-inspired visuals in the background
- Use rounded-xl or 2xl cards, soft shadows, good spacing
- Avoid clutter
- Keep the code clean and componentized where sensible

Color system:
- Main background: white (#FFFFFF)
- Primary brand color: #4A267C
- Accent usage should be tasteful and modern
- Text: near-black / dark neutral
- Light section backgrounds can use very soft neutral or lavender-tinted surfaces
- The attached Insurgo logo exists already and should be used in the header/hero
- IMPORTANT: assume the logo file will be available locally; leave a clean placeholder import or a clear comment showing where to plug the logo asset in

Typography:
- Clean modern sans-serif feel
- Strong but elegant hierarchy
- Large confident headlines
- Comfortable reading width
- Minimalistic, polished UI copy layout

Page objective:
The landing page should explain what Insurgo is, communicate the philosophy, show what kinds of systems it builds, and prominently feature an AI chat-style section where visitors can interact with “Insurgo AI”.

Structure the page with these sections:

1. Header / Navbar
- Minimal top nav
- Left: Insurgo logo
- Right: simple nav links like Philosophy, Systems, AI, Contact
- CTA button: “Talk to Insurgo AI”
- Sticky or semi-sticky navbar with subtle backdrop blur on scroll

2. Hero Section
Headline:
“Autonomous Systems for Modern Businesses”

Subheadline:
“We design AI-powered systems that replace manual growth operations — from lead conversion to customer support.”

Micro line:
“Built at the intersection of AI, automation, and commerce.”

CTAs:
- “Explore Systems”
- “Talk to Insurgo AI”

Hero design notes:
- Strong visual hierarchy
- On one side, text and CTA
- On the other side, create a premium systems-inspired visual: abstract flow map, connected nodes, intelligent signal lines, or a chat/system orchestration panel
- Use motion subtly so the page feels dynamic
- Include a short animated system flow somewhere in hero, such as:
  Lead comes in → AI responds → Qualifies → Books → Syncs data

3. Philosophy / Story Section
Section title:
“Why Insurgo Exists”

Copy:
“Most businesses today still rely on manual processes to grow — answering leads, following up, managing workflows, and stitching together tools that don’t scale.

We believe this is broken.

Insurgo was built on a simple principle:

If a process repeats, it should be automated.

Instead of adding more people to solve problems, we engineer systems that solve them once — and run continuously.

This is not marketing.
This is growth infrastructure.”

Design:
- Elegant editorial layout
- Could pair text with a side panel showing “manual work” transitioning into “autonomous system”
- Make this section feel like a manifesto, but concise and premium

4. Systems / Service Cards Section
Section title:
“What We Build”

Create 3 premium cards:
A. Autonomous Lead Systems
“AI agents that handle inbound calls, qualify leads, and schedule bookings — without human intervention.”

B. AI Automation Infrastructure
“Systems that eliminate repetitive workflows across support, operations, and internal processes.”

C. Revenue & Data Systems
“Conversion-focused commerce infrastructure and custom intelligence pipelines for decision-making.”

Design:
- Responsive 3-card grid
- Interactive hover states
- Slight lift/glow on hover
- Each card should have a minimal icon or visual motif
- Add short micro labels like AI Agents, Workflow Logic, Data Infrastructure

5. Flagship System Flow Section
Section title:
“A Glimpse Into the System”

Show a visually strong system flow:
Lead comes in
↓
AI agent responds instantly
↓
Qualifies the customer
↓
Books appointment
↓
Logs data and triggers follow-up

Closing line:
“No delays. No missed opportunities. No manual effort.”

Design:
- Make this feel like a modern orchestration diagram
- Use cards, connectors, animated arrows, or node-based layout
- Should look impressive but still clean

6. Builder Mindset / Identity Section
Section title:
“Built by a Systems Thinker”

Copy:
“Insurgo is built from hands-on experimentation across AI, automation, commerce, and data systems.

Every system is designed from first principles — not templates, not playbooks.

The goal isn’t more tools.
The goal is fewer moving parts, working intelligently together.”

Design:
- More personal and grounded
- Could use two-column layout
- One side text, one side a clean stack visualization like:
  AI
  Automation
  Commerce
  Data
  → Unified System

7. AI Chat Showcase Section
This is one of the most important sections.

Section title:
“Talk to the System”

Intro copy:
“Instead of reading about what we do — experience it.

Ask anything about automation, AI systems, or your business workflow.”

Build a polished GPT/Gemini-inspired chat UI panel directly into the page.
It does not need real backend functionality yet, but it should look real and premium.

Requirements for the chat UI:
- Beautiful chat container
- Clean message bubbles or minimal modern response blocks
- Input field at bottom
- Placeholder text:
  “Describe your business — I’ll suggest a system.”
- Include example starter prompts as clickable pills:
  - “How can I automate lead follow-up?”
  - “What system would improve my ecommerce operations?”
  - “Can AI qualify my inbound leads?”
- Simulate a sample assistant response from “Insurgo AI”

Sample assistant response:
“Here’s one possible system:

Inbound inquiry
→ AI qualification
→ intent scoring
→ CRM sync
→ appointment booking
→ automated follow-up

This reduces response time and removes manual lead handling bottlenecks.”

Design notes:
- Must feel premium and interactive
- Slight purple glow when focused
- Typing indicator or subtle animated dots welcome
- Make this section a visual centerpiece

8. Final CTA Section
Headline:
“Replace manual work with systems.”

Subtext:
“Whether you need autonomous lead handling, workflow automation, or revenue infrastructure, Insurgo is built to engineer the system behind it.”

Buttons:
- “Start a Conversation”
- “View System Architecture”

9. Footer
- Clean, minimal
- Insurgo logo or wordmark
- Short line:
  “Autonomous systems for modern businesses.”
- Simple nav / contact placeholders

Design rules:
- Keep everything spacious
- Use motion tastefully, never excessively
- Avoid generic startup-site clichés
- Avoid stock-photo feel
- Use abstract UI, system diagrams, glow, grids, subtle lines, and premium product-design language
- Maintain a strong sense of confidence and technical clarity

Extra implementation guidance:
- Create reusable section wrappers
- Use a max-width container
- Add subtle background details like radial gradients, grid fades, or thin connector lines
- Ensure mobile layout is not cramped
- Preserve strong visual rhythm between sections
- Make buttons and chat UI feel especially polished
- Use semantic HTML where possible
- Comment the code clearly

Also add a constant or object near the top for the page copy so the content can be edited easily later.

