import { motion } from 'framer-motion';
import { CONTENT } from '../content';
import NeonButton from './ui/NeonButton';
import SectionWrapper from './ui/SectionWrapper';

export default function HeroLogo() {
  return (
    <SectionWrapper className="pt-32 md:pt-40 pb-10 md:pb-16">
      <div className="flex flex-col items-center text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl"
        >
          <span className="gradient-text-red">{CONTENT.hero.headline}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
        >
          {CONTENT.hero.subheadline}
        </motion.p>

        {/* Micro line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-4 text-sm text-cyan-glow/60 tracking-widest uppercase font-secondary"
        >
          {CONTENT.hero.micro}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <NeonButton variant="primary" href="#systems">
            {CONTENT.hero.ctas[0]}
          </NeonButton>
          <NeonButton variant="secondary" href="#ai">
            {CONTENT.hero.ctas[1]}
          </NeonButton>
        </motion.div>

        {/* Animated flow preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3 text-xs text-white/40 tracking-wide"
        >
          {['Lead', 'AI Response', 'Qualify', 'Book', 'Sync'].map(
            (step, i) => (
              <span key={step} className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03]">
                  {step}
                </span>
                {i < 4 && (
                  <span className="text-red-glow text-glow-red">→</span>
                )}
              </span>
            )
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
