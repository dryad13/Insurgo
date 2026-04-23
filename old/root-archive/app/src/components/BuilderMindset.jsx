import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTENT } from '../content';
import SectionWrapper from './ui/SectionWrapper';
import GlassPanel from './ui/GlassPanel';

function StackBar({ item, index, sectionProgress }) {
  /* Each bar grows progressively as you scroll through the section */
  const barWidth = useTransform(
    sectionProgress,
    [0.15 + index * 0.08, 0.4 + index * 0.08],
    ['30%', `${70 + index * 8}%`]
  );
  const barOpacity = useTransform(
    sectionProgress,
    [0.1 + index * 0.06, 0.25 + index * 0.06],
    [0, 1]
  );

  return (
    <motion.div
      style={{ width: barWidth, opacity: barOpacity }}
      className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 text-sm font-medium"
    >
      {item}
    </motion.div>
  );
}

export default function BuilderMindset() {
  const { builder } = CONTENT;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end 0.6'],
  });

  /* Text reveals */
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const titleX = useTransform(scrollYProgress, [0, 0.15], [-20, 0]);

  /* Convergence arrow + unified result */
  const arrowOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const resultOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const resultScale = useTransform(scrollYProgress, [0.65, 0.8], [0.9, 1]);

  return (
    <SectionWrapper>
      <div ref={sectionRef}>
        <GlassPanel>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Text side */}
            <div>
              <motion.h2
                style={{ opacity: titleOpacity, x: titleX }}
                className="text-3xl md:text-4xl font-bold mb-8 gradient-text-red"
              >
                {builder.title}
              </motion.h2>

              <div className="space-y-4 text-white/60 leading-relaxed">
                {builder.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    style={{
                      opacity: useTransform(
                        scrollYProgress,
                        [0.1 + i * 0.07, 0.22 + i * 0.07],
                        [0, 1]
                      ),
                    }}
                    className={i >= 2 ? 'text-white/80 font-medium' : ''}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Stack visualization */}
            <div className="space-y-3">
              {builder.stack.map((item, i) => (
                <StackBar
                  key={item}
                  item={item}
                  index={i}
                  sectionProgress={scrollYProgress}
                />
              ))}

              {/* Convergence arrow */}
              <motion.div
                className="flex justify-center py-2"
                style={{ opacity: arrowOpacity }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-red-glow"
                >
                  <path d="M12 5v14m0 0l-5-5m5 5l5-5" />
                </svg>
              </motion.div>

              {/* Unified result — snaps in with glow */}
              <motion.div
                style={{ opacity: resultOpacity, scale: resultScale }}
                className="px-5 py-4 rounded-xl border border-red-glow/30 bg-red-glow/[0.05] text-white font-semibold text-center glow-red"
              >
                → {builder.stackResult}
              </motion.div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </SectionWrapper>
  );
}
