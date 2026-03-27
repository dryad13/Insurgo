import { motion } from 'framer-motion';

export default function NeonButton({ children, variant = 'primary', onClick, href }) {
  const base =
    'relative inline-flex items-center justify-center px-7 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer';

  const styles = {
    primary:
      'text-white glow-red hover:glow-red-strong',
    secondary:
      'border border-red-glow/30 text-white hover:border-red-glow/60 hover:glow-red bg-transparent',
    cyan: 'border border-cyan-glow/30 text-cyan-glow hover:border-cyan-glow/60 hover:glow-cyan bg-transparent',
  };

  const Component = href ? 'a' : 'button';

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Component
        className={`${base} ${styles[variant]}`}
        onClick={onClick}
        href={href}
        style={
          variant === 'primary'
            ? { background: 'linear-gradient(135deg, #FB0C0C, #950707)' }
            : undefined
        }
      >
        {children}
      </Component>
    </motion.div>
  );
}
