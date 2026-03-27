import { motion } from 'framer-motion';
import { CONTENT } from '../content';
import SectionWrapper from './ui/SectionWrapper';
import GlassPanel from './ui/GlassPanel';

export default function Philosophy() {
  const { philosophy } = CONTENT;

  return (
    <SectionWrapper id="philosophy">
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
              {philosophy.title}
            </motion.h2>

            <div className="space-y-4 text-white/60 leading-relaxed">
              {philosophy.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <p className="text-xl md:text-2xl font-semibold text-white text-glow-red py-4">
                {philosophy.highlight}
              </p>

              {philosophy.closing.map((p, i) => (
                <p
                  key={i}
                  className={
                    i >= 1 ? 'text-white/80 font-medium' : ''
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Visual side — manual vs autonomous */}
          <div className="relative">
            {/* Manual (dim, scattered) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-3 mb-8"
            >
              <p className="text-xs uppercase tracking-widest text-white/30 mb-4 font-secondary">
                Manual Process
              </p>
              {['Answer call', 'Check CRM', 'Write email', 'Follow up', 'Update sheet'].map(
                (task, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-white/20 text-sm"
                    style={{ marginLeft: `${i * 12}px` }}
                  >
                    {task}
                  </div>
                )
              )}
            </motion.div>

            {/* Arrow */}
            <div className="flex justify-center my-4">
              <span className="text-2xl text-red-glow text-glow-red">↓</span>
            </div>

            {/* Autonomous (connected, glowing) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <p className="text-xs uppercase tracking-widest text-cyan-glow/50 mb-4 font-secondary">
                Autonomous System
              </p>
              <div className="px-4 py-3 rounded-xl border border-red-glow/20 bg-red-glow/[0.05] text-white/70 text-sm glow-red text-center">
                One system handles everything
              </div>
            </motion.div>
          </div>
        </div>
      </GlassPanel>
    </SectionWrapper>
  );
}
