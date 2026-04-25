import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

function getPrefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

const draw = (delay = 0, duration = 1.5) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration, ease: 'easeInOut' },
      opacity: { delay, duration: 0.3 },
    },
  },
});

/**
 * Full-viewport preloader. Rendered via portal to `document.body` so it always
 * sits above the app (z-index) and is not clipped by #root. Auto-hide only
 * after a minimum visible time — including when prefers-reduced-motion is on
 * (we used to use 0ms there, which looked like a single flash and “nothing
 * displayed”).
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  // Read once so path animations match timing on first paint (no one-frame wrong mode).
  const [reducedMotion] = useState(getPrefersReducedMotion);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hideAfterMs = reducedMotion ? 1800 : 4000;
    let cancelled = false;

    // Two rAFs: wait for paint so the layer is actually visible before the timer.
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        timeoutRef.current = window.setTimeout(() => {
          if (!cancelled) setVisible(false);
        }, hideAfterMs);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [reducedMotion]);

  const layer = (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2147483646,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // Fallback in case --bg-canvas is late; matches styles.css
            background: 'var(--bg-canvas, #0a0a0f)',
            pointerEvents: 'auto',
            isolation: 'isolate',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(251,12,12,0.08) 0%, rgba(149,7,7,0.03) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.25 : 2, ease: 'easeOut' }}
          />

          <motion.div
            style={{ position: 'relative', zIndex: 1, transformOrigin: 'center center' }}
            initial={{ rotate: 0 }}
            animate={reducedMotion ? { rotate: 0 } : { rotate: 360 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 30, ease: 'linear', repeat: Infinity }
            }
          >
            <motion.svg
              width="140"
              height="140"
              viewBox="0 0 120 120"
              fill="none"
              initial="hidden"
              animate="visible"
            >
              <defs>
                <linearGradient id="preGrad" x1="60" y1="113" x2="60" y2="7" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#950707" />
                  <stop offset="0.9999" stopColor="#FB0C0C" />
                </linearGradient>
                <linearGradient id="preGradWhite" x1="59.5" y1="77.5" x2="59.5" y2="43.5" gradientUnits="userSpaceOnUse">
                  <stop offset="0.145" stopColor="white" />
                  <stop offset="0.475" stopColor="#CFCFCF" />
                  <stop offset="1" stopColor="#999999" />
                </linearGradient>
                <linearGradient id="preGradWhite2" x1="59.5" y1="85.5" x2="59.5" y2="35.5" gradientUnits="userSpaceOnUse">
                  <stop offset="0.145" stopColor="white" />
                  <stop offset="0.475" stopColor="#CFCFCF" />
                  <stop offset="1" stopColor="#999999" />
                </linearGradient>
                <filter id="preGlow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.path
                d="M60 116.5C64.8665 116.5 69.5461 115.82 74.0049 114.675C74.4271 114.621 74.8632 114.512 75.2998 114.333C99.0233 107.642 116.5 85.8618 116.5 60C116.5 44.3623 110.102 30.203 99.8174 19.9697C99.6459 19.7681 99.362 19.4617 98.9619 19.168C88.8247 9.49109 75.1108 3.5 60 3.5C28.8441 3.5 3.5 28.8441 3.5 60C3.5 76.096 10.3044 90.5968 21.1143 100.883C21.4163 101.258 21.8021 101.635 22.2871 101.956C32.2884 110.952 45.4886 116.5 60 116.5ZM49.8438 14.9912C53.1307 14.2362 56.5221 13.8125 60 13.8125C69.4169 13.8125 78.1643 16.6678 85.4746 21.5449L45.6543 35.4688L49.8438 14.9912ZM15.6094 47.4023C19.0766 35.2011 27.4438 25.0575 38.4521 19.2227L30.2256 59.4385L15.6094 47.4023ZM76.2168 35.709L94.4717 29.3262C101.755 37.4976 106.188 48.2359 106.188 60C106.188 60.9643 106.154 61.9215 106.095 62.8711L76.2168 35.709ZM39.2324 66.8594L43.2451 47.2393L65.1445 39.583L80.084 53.1621L75.335 75.459L57.0693 81.5508L39.2324 66.8594ZM13.1553 45.5322C13.1695 45.5389 13.1865 45.5451 13.2041 45.5537C13.2094 45.5563 13.2146 45.5604 13.2207 45.5635C13.1948 45.5508 13.1728 45.5403 13.1553 45.5322ZM26.5186 91.7314C18.6522 83.4412 13.8125 72.28 13.8125 60C13.8125 59.7609 13.8155 59.522 13.8203 59.2832L45.5273 85.3955L26.5186 91.7314ZM88.9189 61.1934L103.75 74.6768C99.8112 86.3895 91.3053 96.0139 80.3496 101.42L88.9189 61.1934ZM60 106.188C51.2141 106.188 42.9962 103.72 35.9941 99.4414L72.8408 87.1582L68.9873 105.256C66.0612 105.853 63.0636 106.188 60 106.188Z"
                stroke="url(#preGrad)"
                strokeWidth="2"
                filter="url(#preGlow)"
                variants={draw(0, reducedMotion ? 0.6 : 2)}
              />

              <motion.path
                d="M43 65.5L46.5 50L64 43.5L76 54.5L72 72.5L57.5 77.5L43 65.5Z"
                stroke="url(#preGradWhite)"
                strokeWidth="1"
                filter="url(#preGlow)"
                variants={draw(0.5, reducedMotion ? 0.4 : 1.2)}
              />

              <motion.path
                d="M35 68L40 44.5L66 35.5L84 52L78.5 78L56 85.5L35 68Z"
                stroke="url(#preGradWhite2)"
                strokeWidth="1"
                filter="url(#preGlow)"
                variants={draw(0.3, reducedMotion ? 0.4 : 1.5)}
              />

              {[
                'M27.5 87.5L38 84',
                'M68 93L66 102',
                'M91 68L99.5 75.5',
                'M93.5 33.5L83.5 37',
                'M53 18L50.5 30',
                'M19.5 46.5L28 53',
              ].map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke="#FB0C0C"
                  strokeWidth="1"
                  filter="url(#preGlow)"
                  variants={draw(0.8 + i * 0.1, reducedMotion ? 0.25 : 0.6)}
                />
              ))}
            </motion.svg>
          </motion.div>

          <motion.p
            className="mono"
            style={{
              marginTop: 40,
              fontSize: 11,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0.1 : 0.8, duration: reducedMotion ? 0.2 : 1 }}
          >
            Initializing Systems
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(layer, document.body);
}
