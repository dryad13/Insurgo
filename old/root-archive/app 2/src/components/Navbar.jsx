import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../content';
import NeonButton from './ui/NeonButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${scrolled || menuOpen
          ? 'bg-[rgba(10,10,15,0.85)] backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 relative">
        <div className="flex-1 flex items-center">
          <div className="hidden md:flex items-center gap-8">
            {CONTENT.nav.links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 py-2 pr-2 cursor-pointer outline-none"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
          </button>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <img
            src="/logo.svg"
            alt="Insurgo"
            className="h-6 md:h-8 w-auto drop-shadow-[0_0_15px_rgba(251,12,12,0.3)]"
          />
        </div>

        <div className="flex-1 flex items-center justify-end">
          <NeonButton variant="primary" href="#ai">
            {CONTENT.nav.cta}
          </NeonButton>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/5"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              {CONTENT.nav.links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-white/50 hover:text-white transition-colors py-2"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
