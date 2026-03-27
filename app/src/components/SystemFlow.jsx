import { motion } from 'framer-motion';
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

export default function SystemFlow() {
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
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 px-6 py-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-red-glow/30 hover:bg-red-glow/[0.03] transition-all duration-300"
              >
                <span className="text-red-glow/60">{flowIcons[step.icon]}</span>
                <span className="text-white/70 text-sm font-medium">{step.label}</span>
                <span className="ml-auto text-xs text-white/20 font-secondary">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>

              {i < CONTENT.flow.steps.length - 1 && <FlowConnector height={32} />}
            </div>
          ))}
        </div>

        {/* Closing */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-lg font-semibold text-white text-glow-red"
        >
          {CONTENT.flow.closing}
        </motion.p>
      </GlassPanel>
    </SectionWrapper>
  );
}
