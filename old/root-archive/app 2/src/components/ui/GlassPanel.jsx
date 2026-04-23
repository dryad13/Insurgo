import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GlassPanel({ children, className = '', hover = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.7'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`
        glass relative overflow-hidden rounded-2xl p-6 md:p-10 lg:p-12
        ${hover ? 'glass-hover transition-all duration-300 cursor-pointer hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-red-glow/[0.08] blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  );
}
