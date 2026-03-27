import { motion } from 'framer-motion';

export default function GlassPanel({ children, className = '', hover = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`
        glass rounded-2xl p-8 md:p-12
        ${hover ? 'glass-hover transition-all duration-300 cursor-pointer hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
