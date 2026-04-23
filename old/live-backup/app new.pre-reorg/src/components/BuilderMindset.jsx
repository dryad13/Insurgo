import { motion } from 'framer-motion';
import { CONTENT } from '../content.js';

const viewOnce = { once: true, margin: '-80px 0px' };

export default function BuilderMindset() {
  const { eyebrow, title, paragraphs, stack, stackResult } = CONTENT.builder;

  return (
    <section className="section">
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 48,
          alignItems: 'center',
        }}
      >
        {/* Copy */}
        <div>
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 16 }}
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

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {paragraphs.map((p, i) => (
              <p key={i} className="body" style={{ color: 'var(--text-tertiary)' }}>
                {p}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Stack diagram */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewOnce}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            padding: 24,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-standard)',
            borderRadius: 'var(--r-panel)',
          }}
        >
          {stack.map((item, i) => (
            <div
              key={item}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr auto',
                gap: 12,
                alignItems: 'center',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--r-md)',
              }}
            >
              <span
                className="mono tabular"
                style={{ fontSize: 11, color: 'var(--text-quaternary)' }}
              >
                0{i + 1}
              </span>
              <span style={{ fontSize: 15, fontWeight: 510, color: 'var(--text-primary)' }}>
                {item}
              </span>
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 6px var(--accent-focus)',
                }}
              />
            </div>
          ))}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '14px 16px',
              marginTop: 4,
              background: 'var(--accent-tint)',
              border: '1px solid var(--border-accent)',
              borderRadius: 'var(--r-md)',
              color: 'var(--accent-active)',
              fontSize: 13,
              fontWeight: 510,
              letterSpacing: '-0.1px',
            }}
          >
            <span className="mono" style={{ fontSize: 11, opacity: 0.7 }}>
              ↓ result
            </span>
            {stackResult}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
