import { motion } from 'framer-motion';
import { CONTENT } from '../content';
import SectionWrapper from './ui/SectionWrapper';
import GlassPanel from './ui/GlassPanel';

export default function BuilderMindset() {
  const { builder } = CONTENT;

  return (
    <SectionWrapper>
      <GlassPanel>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text side */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-8 gradient-text-red"
            >
              {builder.title}
            </motion.h2>

            <div className="space-y-4 text-white/60 leading-relaxed">
              {builder.paragraphs.map((p, i) => (
                <p key={i} className={i >= 2 ? 'text-white/80 font-medium' : ''}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Stack visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            {builder.stack.map((item, i) => (
              <motion.div
                key={item}
                initial={{ width: '60%' }}
                whileInView={{ width: `${70 + i * 8}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 text-sm font-medium"
              >
                {item}
              </motion.div>
            ))}

            {/* Convergence arrow */}
            <div className="flex justify-center py-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-glow">
                <path d="M12 5v14m0 0l-5-5m5 5l5-5" />
              </svg>
            </div>

            {/* Unified result */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="px-5 py-4 rounded-xl border border-red-glow/30 bg-red-glow/[0.05] text-white font-semibold text-center glow-red animate-pulse-glow"
            >
              → {builder.stackResult}
            </motion.div>
          </motion.div>
        </div>
      </GlassPanel>
    </SectionWrapper>
  );
}
