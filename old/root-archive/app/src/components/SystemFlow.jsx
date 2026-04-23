import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTENT } from '../content';
import SectionWrapper from './ui/SectionWrapper';
import GlassPanel from './ui/GlassPanel';
import FlowConnector from './ui/FlowConnector';

const flowIcons = {
  signal: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20v-8m0 0l-4 4m4-4l4 4M4 8l4-4 4 4 4-4 4 4" />
    </svg>
  ),
  bot: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <circle cx="9" cy="14" r="1.5" fill="currentColor" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" />
      <line x1="12" y1="4" x2="12" y2="8" />
      <circle cx="12" cy="3" r="1" />
    </svg>
  ),
  filter: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="3,4 21,4 14,13 14,20 10,22 10,13" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </svg>
  ),
  sync: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12a8 8 0 0114.93-4M20 12a8 8 0 01-14.93 4" />
      <path d="M19 4v4h-4M5 20v-4h4" />
    </svg>
  ),
};

function FlowNode({ step, index, total }) {
  const nodeRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ['start end', 'start 0.55'],
  });

  const nodeOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const nodeX = useTransform(
    scrollYProgress,
    [0, 0.8],
    [index % 2 === 0 ? -40 : 40, 0]
  );

  /* Step number pulses red once visible */
  const glowOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <div ref={nodeRef}>
      <motion.div
        style={{ opacity: nodeOpacity, x: nodeX }}
        className="flex items-center gap-4 px-6 py-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-red-glow/30 hover:bg-red-glow/[0.03] transition-all duration-300"
      >
        <span className="text-red-glow/60">{flowIcons[step.icon]}</span>
        <span className="text-white/70 text-sm font-medium">{step.label}</span>
        <motion.span
          style={{ opacity: glowOpacity }}
          className="ml-auto text-xs text-red-glow font-secondary text-glow-red"
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </motion.div>

      {index < total - 1 && <FlowConnector height={32} />}
    </div>
  );
}

export default function SystemFlow() {
  const closingRef = useRef(null);
  const { scrollYProgress: closingProgress } = useScroll({
    target: closingRef,
    offset: ['start end', 'start 0.7'],
  });
  const closingOpacity = useTransform(closingProgress, [0, 1], [0, 1]);

  return (
    <SectionWrapper>
      <GlassPanel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-14 gradient-text-red"
        >
          {CONTENT.flow.title}
        </motion.h2>

        {/* Flow nodes */}
        <div className="max-w-md mx-auto">
          {CONTENT.flow.steps.map((step, i) => (
            <FlowNode
              key={i}
              step={step}
              index={i}
              total={CONTENT.flow.steps.length}
            />
          ))}
        </div>

        {/* Closing */}
        <div ref={closingRef}>
          <motion.p
            style={{ opacity: closingOpacity }}
            className="text-center mt-12 text-lg font-semibold text-white text-glow-red"
          >
            {CONTENT.flow.closing}
          </motion.p>
        </div>
      </GlassPanel>
    </SectionWrapper>
  );
}
