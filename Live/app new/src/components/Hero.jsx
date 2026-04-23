import { motion } from 'framer-motion';
import { CONTENT } from '../content.js';

export default function Hero() {
  const { eyebrow, headline, subheadline, primaryCta, secondaryCta } = CONTENT.hero;

  return (
    <section
      id="top"
      className="section"
      style={{ paddingTop: 'clamp(96px, 14vw, 176px)', position: 'relative' }}
    >
      <div className="container" style={{ textAlign: 'center', maxWidth: 1000 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
          style={{ marginBottom: 20 }}
        >
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl"
          style={{ whiteSpace: 'pre-line' }}
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="body-lg"
          style={{
            marginTop: 24,
            maxWidth: '60ch',
            color: 'var(--text-tertiary)',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            marginTop: 40,
            justifyContent: 'center',
          }}
        >
          <a href={primaryCta.href} className="btn btn-primary btn-arrow">
            {primaryCta.label}
          </a>
          <a href={secondaryCta.href} className="btn btn-ghost">
            {secondaryCta.label}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            marginTop: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            justifyContent: 'center',
            color: 'var(--text-quaternary)',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
          }}
        >
          <span className="pill pill-dot">Live</span>
          <span>Built at the intersection of AI, automation &amp; commerce.</span>
        </motion.div>
      </div>

      {/* subtle architectural grid — single layer, very low opacity */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          opacity: 0.35,
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 30%, black 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 60% at 50% 30%, black 0%, transparent 75%)',
          backgroundImage:
            'linear-gradient(to right, var(--border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </section>
  );
}
