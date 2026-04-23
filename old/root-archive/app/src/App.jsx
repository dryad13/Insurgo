import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './components/Preloader';
import ParticleNetwork from './components/three/ParticleNetwork';
import Navbar from './components/Navbar';
import HeroLogo from './components/HeroLogo';
import Philosophy from './components/Philosophy';
import SystemCards from './components/SystemCards';
import SystemFlow from './components/SystemFlow';
import BuilderMindset from './components/BuilderMindset';
import ChatShowcase from './components/ChatShowcase';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const PRELOADER_ONLY = false;

export default function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    if (!PRELOADER_ONLY) setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <ParticleNetwork />
          <Navbar />
          <main>
            <HeroLogo />
            <Philosophy />
            <SystemCards />
            <SystemFlow />
            <BuilderMindset />
            <ChatShowcase />
            <FinalCTA />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
