import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Philosophy from './components/Philosophy.jsx';
import SystemCards from './components/SystemCards.jsx';
import SystemFlow from './components/SystemFlow.jsx';
import BuilderMindset from './components/BuilderMindset.jsx';
import ChatShowcase from './components/ChatShowcase.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <SystemCards />
        <SystemFlow />
        <BuilderMindset />
        <ChatShowcase />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
