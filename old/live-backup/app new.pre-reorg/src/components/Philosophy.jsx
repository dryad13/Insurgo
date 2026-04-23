import { motion } from 'framer-motion';
import { CONTENT } from '../content.js';

const viewOnce = { once: true, margin: '-80px 0px' };

export default function Philosophy() {
  const { eyebrow, title, paragraphs, closing } = CONTENT.philosophy;
  return (
    <section id="philosophy" className="section">
      <div className="container" style={{ maxWidth: 880 }}>
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
            <p key={i} className="body-lg" style={{ color: 'var(--text-secondary)' }}>
              {p}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewOnce}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {closing.map((p, i) => (
            <p key={i} className="body" style={{ color: 'var(--text-tertiary)' }}>
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
