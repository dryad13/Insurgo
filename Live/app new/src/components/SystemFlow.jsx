import { motion } from 'framer-motion';
import { CONTENT } from '../content.js';

const viewOnce = { once: true, margin: '-80px 0px' };

export default function SystemFlow() {
  const { eyebrow, title, intro, steps } = CONTENT.flow;

  return (
    <section id="flow" className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.015) 50%, transparent 100%)' }}>
      <div className="container">
        <div className="section-heading">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.div>
          <motion.h2
            className="display"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="body-lg"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ color: 'var(--text-tertiary)', maxWidth: '60ch' }}
          >
            {intro}
          </motion.p>
        </div>

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gap: 0,
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewOnce}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: 24,
                padding: '20px 0',
                borderBottom:
                  i === steps.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div
                className="mono tabular"
                style={{
                  fontSize: 12,
                  color: 'var(--text-quaternary)',
                  letterSpacing: '0.05em',
                }}
              >
                {step.id}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    boxShadow: '0 0 10px var(--accent-focus)',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 'clamp(16px, 2.2vw, 20px)',
                    fontWeight: 510,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.2px',
                  }}
                >
                  {step.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
