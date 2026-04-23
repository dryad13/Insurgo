import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTENT } from '../content';
import SectionWrapper from './ui/SectionWrapper';
import NeonButton from './ui/NeonButton';

export default function FinalCTA() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.4'],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0, 0.35], [30, 0]);
  const subtextOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const buttonsOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const buttonsY = useTransform(scrollYProgress, [0.4, 0.7], [20, 0]);

  return (
    <SectionWrapper id="contact">
      <div ref={sectionRef} className="text-center max-w-3xl mx-auto">
        <motion.h2
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          <span className="gradient-text-red">{CONTENT.cta.headline}</span>
        </motion.h2>

        <motion.p
          style={{ opacity: subtextOpacity }}
          className="text-white/50 text-lg leading-relaxed mb-10"
        >
          {CONTENT.cta.subtext}
        </motion.p>

        <motion.div
          style={{ opacity: buttonsOpacity, y: buttonsY }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <NeonButton variant="primary" href="#ai">
            {CONTENT.cta.buttons[0]}
          </NeonButton>
          <NeonButton variant="secondary" href="#systems">
            {CONTENT.cta.buttons[1]}
          </NeonButton>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
