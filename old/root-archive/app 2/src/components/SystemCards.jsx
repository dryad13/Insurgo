import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTENT } from '../content';
import SectionWrapper from './ui/SectionWrapper';
import GlassPanel from './ui/GlassPanel';

/* SVG icons with stroke-draw capability */
function AgentIcon({ progress }) {
  const pathLength = useTransform(progress, [0, 1], [0, 1]);
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" strokeWidth="1.5">
      <motion.circle cx="20" cy="20" r="14" stroke="rgba(251,12,12,0.4)" style={{ pathLength }} />
      <motion.circle cx="20" cy="20" r="6" stroke="#FB0C0C" style={{ pathLength }} />
      <motion.line x1="20" y1="6" x2="20" y2="2" stroke="rgba(251,12,12,0.6)" style={{ pathLength }} />
      <motion.line x1="20" y1="38" x2="20" y2="34" stroke="rgba(251,12,12,0.6)" style={{ pathLength }} />
      <motion.line x1="6" y1="20" x2="2" y2="20" stroke="rgba(251,12,12,0.6)" style={{ pathLength }} />
      <motion.line x1="38" y1="20" x2="34" y2="20" stroke="rgba(251,12,12,0.6)" style={{ pathLength }} />
    </svg>
  );
}

function WorkflowIcon({ progress }) {
  const pathLength = useTransform(progress, [0, 1], [0, 1]);
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" strokeWidth="1.5">
      <motion.rect x="4" y="4" width="12" height="12" rx="3" stroke="rgba(0,240,255,0.5)" style={{ pathLength }} />
      <motion.rect x="24" y="24" width="12" height="12" rx="3" stroke="rgba(0,240,255,0.5)" style={{ pathLength }} />
      <motion.line x1="16" y1="10" x2="24" y2="30" stroke="rgba(0,240,255,0.3)" strokeDasharray="3 2" style={{ pathLength }} />
      <motion.circle cx="30" cy="10" r="4" stroke="rgba(0,240,255,0.4)" style={{ pathLength }} />
      <motion.circle cx="10" cy="30" r="4" stroke="rgba(0,240,255,0.4)" style={{ pathLength }} />
    </svg>
  );
}

function DataIcon({ progress }) {
  const pathLength = useTransform(progress, [0, 1], [0, 1]);
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" strokeWidth="1.5">
      <motion.ellipse cx="20" cy="10" rx="14" ry="5" stroke="rgba(251,12,12,0.4)" style={{ pathLength }} />
      <motion.ellipse cx="20" cy="20" rx="14" ry="5" stroke="rgba(251,12,12,0.3)" style={{ pathLength }} />
      <motion.ellipse cx="20" cy="30" rx="14" ry="5" stroke="rgba(251,12,12,0.2)" style={{ pathLength }} />
      <motion.line x1="6" y1="10" x2="6" y2="30" stroke="rgba(251,12,12,0.2)" style={{ pathLength }} />
      <motion.line x1="34" y1="10" x2="34" y2="30" stroke="rgba(251,12,12,0.2)" style={{ pathLength }} />
    </svg>
  );
}

const iconComponents = [AgentIcon, WorkflowIcon, DataIcon];

function ScrollCard({ card, index }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start 0.5'],
  });

  const cardOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0, 0.6], [60, 0]);
  const iconProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const IconComponent = iconComponents[index];

  return (
    <div ref={cardRef}>
      <motion.div style={{ opacity: cardOpacity, y: cardY }}>
        <GlassPanel hover className="flex flex-col h-full">
          {/* Icon with stroke animation */}
          <div className="mb-6">
            <IconComponent progress={iconProgress} />
          </div>

          {/* Label pill */}
          <span className="inline-block self-start px-3 py-1 rounded-full text-xs tracking-wider uppercase border border-white/10 text-white/40 mb-4 font-secondary">
            {card.label}
          </span>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
            {card.description}
          </p>

          {/* Outcomes — stagger in */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {card.outcomes.map((o, j) => (
              <motion.span
                key={j}
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [0.5 + j * 0.1, 0.65 + j * 0.1],
                    [0, 1]
                  ),
                }}
                className="text-xs px-2 py-1 rounded-md bg-red-glow/[0.07] text-red-glow/70 border border-red-glow/10"
              >
                {o}
              </motion.span>
            ))}
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}

export default function SystemCards() {
  const titleRef = useRef(null);
  const { scrollYProgress: titleProgress } = useScroll({
    target: titleRef,
    offset: ['start end', 'start 0.7'],
  });
  const titleOpacity = useTransform(titleProgress, [0, 1], [0, 1]);
  const titleY = useTransform(titleProgress, [0, 1], [20, 0]);

  return (
    <SectionWrapper id="systems">
      <div ref={titleRef}>
        <motion.h2
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-3xl md:text-4xl font-bold text-center mb-14 gradient-text-red"
        >
          {CONTENT.systems.title}
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {CONTENT.systems.cards.map((card, i) => (
          <ScrollCard key={i} card={card} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
