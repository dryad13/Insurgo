import { motion } from 'framer-motion';
import { CONTENT } from '../content';
import SectionWrapper from './ui/SectionWrapper';
import NeonButton from './ui/NeonButton';

export default function FinalCTA() {
  return (
    <SectionWrapper id="contact">
      <div className="text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          <span className="gradient-text-red">{CONTENT.cta.headline}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-lg leading-relaxed mb-10"
        >
          {CONTENT.cta.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
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
