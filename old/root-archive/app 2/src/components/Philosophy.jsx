import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTENT } from '../content';
import SectionWrapper from './ui/SectionWrapper';
import GlassPanel from './ui/GlassPanel';

export default function Philosophy() {
  const { philosophy } = CONTENT;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end 0.6'],
  });

  /* Staggered paragraph reveals tied to scroll */
  const p1Opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const p2Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const p3Opacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const highlightOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const highlightScale = useTransform(scrollYProgress, [0.35, 0.5], [0.95, 1]);
  const closingOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  /* Manual -> Autonomous transition */
  const manualOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const manualY = useTransform(scrollYProgress, [0.1, 0.3], [20, 0]);
  const arrowOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const autoOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const autoScale = useTransform(scrollYProgress, [0.6, 0.75], [0.9, 1]);

  const manualTasks = ['Answer call', 'Check CRM', 'Write email', 'Follow up', 'Update sheet'];

  return (
    <SectionWrapper id="philosophy">
      <div ref={sectionRef}>
        <GlassPanel>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Text side */}
            <div>
              <motion.h2
                style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]) }}
                className="text-3xl md:text-4xl font-bold mb-8 gradient-text-red"
              >
                {philosophy.title}
              </motion.h2>

              <div className="space-y-4 text-white/60 leading-relaxed">
                {philosophy.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    style={{ opacity: [p1Opacity, p2Opacity, p3Opacity][i] }}
                  >
                    {p}
                  </motion.p>
                ))}

                <motion.p
                  style={{ opacity: highlightOpacity, scale: highlightScale }}
                  className="text-xl md:text-2xl font-semibold text-white text-glow-red py-4"
                >
                  {philosophy.highlight}
                </motion.p>

                <motion.div style={{ opacity: closingOpacity }} className="space-y-4">
                  {philosophy.closing.map((p, i) => (
                    <p key={i} className={i >= 1 ? 'text-white/80 font-medium' : ''}>
                      {p}
                    </p>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Visual side — manual vs autonomous */}
            <div className="relative">
              {/* Manual (dim, scattered) */}
              <motion.div
                style={{ opacity: manualOpacity, y: manualY }}
                className="space-y-3 mb-8"
              >
                <p className="text-xs uppercase tracking-widest text-white/30 mb-4 font-secondary">
                  Manual Process
                </p>
                {manualTasks.map((task, i) => (
                  <motion.div
                    key={i}
                    className="px-4 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-white/20 text-sm"
                    style={{
                      marginLeft: `${i * 12}px`,
                      opacity: useTransform(
                        scrollYProgress,
                        [0.12 + i * 0.04, 0.2 + i * 0.04],
                        [0, 1]
                      ),
                    }}
                  >
                    {task}
                  </motion.div>
                ))}
              </motion.div>

              {/* Arrow */}
              <motion.div
                className="flex justify-center my-4"
                style={{ opacity: arrowOpacity }}
              >
                <span className="text-2xl text-red-glow text-glow-red">↓</span>
              </motion.div>

              {/* Autonomous (connected, glowing) */}
              <motion.div
                style={{ opacity: autoOpacity, scale: autoScale }}
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
      </div>
    </SectionWrapper>
  );
}
