import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Subtle preloader: the Insurgo logo fades for
 * ~600ms before the app reveals. Respects prefers-reduced-motion (skipped).
 *
 * NOT the v1 full-screen loader — no spinning rings, no tron grid, no delay
 * beyond the first paint.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setVisible(false), reduce ? 0 : 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-canvas)',
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.img
              src="/logo.svg"
              alt="Insurgo"
              animate={{
                opacity: [0.85, 1, 0.85],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                height: 112,
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 18px rgba(251, 12, 12, 0.24))',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
