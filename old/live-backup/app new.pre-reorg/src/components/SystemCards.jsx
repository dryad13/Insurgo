import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../content.js';

const viewOnce = { once: true, margin: '-80px 0px' };

export default function SystemCards() {
  const { eyebrow, title, cards } = CONTENT.systems;
  const [[index, direction], setIndex] = useState([0, 0]);
  const current = cards[index];

  function paginate(nextDirection) {
    setIndex(([prev]) => {
      const next = (prev + nextDirection + cards.length) % cards.length;
      return [next, nextDirection];
    });
  }

  function goTo(target) {
    if (target === index) return;
    setIndex([target, target > index ? 1 : -1]);
  }

  return (
    <section id="systems" className="section">
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
            style={{ whiteSpace: 'pre-line' }}
          >
            {title}
          </motion.h2>
        </div>

        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              marginBottom: 12,
            }}
          >
            <span className="mono tabular" style={{ fontSize: 11, color: 'var(--text-quaternary)' }}>
              {String(index + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => paginate(-1)}
                aria-label="Previous system"
                style={{ padding: '8px 12px' }}
              >
                ←
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => paginate(1)}
                aria-label="Next system"
                style={{ padding: '8px 12px' }}
              >
                →
              </button>
            </div>
          </div>

          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.article
              key={current.title}
              className="card"
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 36 : -36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -36 : 36 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80) paginate(-1);
                if (info.offset.x < -80) paginate(1);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 280 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: 'var(--text-tertiary)',
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {current.label}
                </span>
                <span className="mono tabular" style={{ fontSize: 11, color: 'var(--text-quaternary)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="h3">{current.title}</h3>
              <p className="body" style={{ color: 'var(--text-tertiary)' }}>
                {current.description}
              </p>

              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 6,
                  paddingTop: 16,
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                {current.outcomes.map((o) => (
                  <span key={o} className="pill">
                    {o}
                  </span>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              marginTop: 14,
            }}
          >
            {cards.map((c, i) => (
              <button
                key={c.title}
                type="button"
                aria-label={`Go to ${c.title}`}
                onClick={() => goTo(i)}
                style={{
                  width: i === index ? 22 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: '1px solid var(--border-standard)',
                  background: i === index ? 'var(--accent)' : 'rgba(255,255,255,0.12)',
                  transition: 'all 160ms ease',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
