import { motion } from 'framer-motion';
import { CONTENT } from '../content';
import SectionWrapper from './ui/SectionWrapper';
import GlassPanel from './ui/GlassPanel';

const icons = [
  /* AI Agents — brain/signal */
  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="20" cy="20" r="14" className="text-red-glow/40" />
    <circle cx="20" cy="20" r="6" className="text-red-glow" />
    <line x1="20" y1="6" x2="20" y2="2" className="text-red-glow/60" />
    <line x1="20" y1="38" x2="20" y2="34" className="text-red-glow/60" />
    <line x1="6" y1="20" x2="2" y2="20" className="text-red-glow/60" />
    <line x1="38" y1="20" x2="34" y2="20" className="text-red-glow/60" />
  </svg>,
  /* Workflow Logic — connected nodes */
  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="4" width="12" height="12" rx="3" className="text-cyan-glow/50" />
    <rect x="24" y="24" width="12" height="12" rx="3" className="text-cyan-glow/50" />
    <line x1="16" y1="10" x2="24" y2="30" className="text-cyan-glow/30" strokeDasharray="3 2" />
    <circle cx="30" cy="10" r="4" className="text-cyan-glow/40" />
    <circle cx="10" cy="30" r="4" className="text-cyan-glow/40" />
  </svg>,
  /* Data Infrastructure — data flow */
  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="20" cy="10" rx="14" ry="5" className="text-red-glow/40" />
    <ellipse cx="20" cy="20" rx="14" ry="5" className="text-red-glow/30" />
    <ellipse cx="20" cy="30" rx="14" ry="5" className="text-red-glow/20" />
    <line x1="6" y1="10" x2="6" y2="30" className="text-red-glow/20" />
    <line x1="34" y1="10" x2="34" y2="30" className="text-red-glow/20" />
  </svg>,
];

export default function SystemCards() {
  return (
    <SectionWrapper id="systems">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5 }}
        style={{ willChange: 'transform, opacity' }}
        className="text-3xl md:text-4xl font-bold text-center mb-14 gradient-text-red"
      >
        {CONTENT.systems.title}
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {CONTENT.systems.cards.map((card, i) => (
          <GlassPanel key={i} hover className="flex flex-col">
            {/* Icon */}
            <div className="mb-6">{icons[i]}</div>

            {/* Label pill */}
            <span className="inline-block self-start px-3 py-1 rounded-full text-xs tracking-wider uppercase border border-white/10 text-white/40 mb-4 font-secondary">
              {card.label}
            </span>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-3">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
              {card.description}
            </p>

            {/* Outcomes */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {card.outcomes.map((o, j) => (
                <span
                  key={j}
                  className="text-xs px-2 py-1 rounded-md bg-red-glow/[0.07] text-red-glow/70 border border-red-glow/10"
                >
                  {o}
                </span>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
    </SectionWrapper>
  );
}
