import { motion } from 'framer-motion';
import { CONTENT } from '../content.js';

const viewOnce = { once: true, margin: '-80px 0px' };

export default function FinalCTA() {
  const { eyebrow, headline, subtext, primary, secondary } = CONTENT.cta;

  return (
    <section className="section" style={{ paddingBottom: 'clamp(48px, 8vw, 96px)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewOnce}
          transition={{ duration: 0.6 }}
          style={{
            padding: 'clamp(32px, 6vw, 64px)',
            background:
              'linear-gradient(180deg, rgba(251,12,12,0.08) 0%, rgba(251,12,12,0.02) 100%)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--r-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 16,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* very subtle accent glow in the corner */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -120,
              right: -120,
              width: 320,
              height: 320,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(251,12,12,0.22) 0%, transparent 60%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />

          <div className="eyebrow">{eyebrow}</div>
          <h2 className="display" style={{ maxWidth: '16ch' }}>
            {headline}
          </h2>
          <p
            className="body-lg"
            style={{ color: 'var(--text-tertiary)', maxWidth: '60ch' }}
          >
            {subtext}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <a href={primary.href} className="btn btn-primary btn-arrow">
              {primary.label}
            </a>
            <a href={secondary.href} className="btn btn-ghost">
              {secondary.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
