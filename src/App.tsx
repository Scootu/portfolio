import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopNav } from './components/TopNav';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { About } from './components/About';
import { Philosophy } from './components/Philosophy';
import { Projects } from './components/Projects';
import { DemAiProject } from './components/DemAiProject';
import { MechanicShopProject } from './components/MechanicShopProject';
import { Terminal } from './components/Terminal';
import { Services } from './components/Services';
import { Writing } from './components/Writing';
import { Proof } from './components/Proof';
import { Contact } from './components/Contact';
import { ContactPage } from './components/ContactPage';
import { PortfolioFooter } from './components/PortfolioFooter';
import { StatusBar } from './components/StatusBar';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeSection, setActiveSection] = useState('home');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const isDemAiPage = currentPath === '/projects/dem-ai';
  const isMechanicShopPage = currentPath === '/projects/mechanic-shop';
  const isContactPage = currentPath === '/contact';

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Dark Mode Sync
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handlePathChange = () => setCurrentPath(window.location.pathname);

    window.addEventListener('popstate', handlePathChange);
    window.addEventListener('portfolio:navigation', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
      window.removeEventListener('portfolio:navigation', handlePathChange);
    };
  }, []);

  useEffect(() => {
    if (isDemAiPage || isMechanicShopPage || isContactPage) return;

    const scrollToHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        window.scrollTo({ top: 0, behavior: 'auto' });
        setActiveSection('home');
        return;
      }

      const element = document.getElementById(hash);
      if (!element) return;

      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'auto' });
      setActiveSection(hash);
    };

    window.setTimeout(scrollToHash, 0);
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [currentPath, isContactPage, isDemAiPage, isMechanicShopPage]);

  // Scroll Spy Implementation
  useEffect(() => {
    const sections = ['home', 'problem', 'about', 'philosophy', 'projects', 'terminal', 'services', 'writing', 'proof', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger initially
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scanline overlay for that retro systems look */}
      <div className="scanlines-overlay" />

      {/* Navigation */}
      <TopNav 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        activeSection={isDemAiPage || isMechanicShopPage ? 'projects' : isContactPage ? 'contact' : activeSection}
      />

      {/* Page Content */}
      <main style={{ marginTop: '64px', minHeight: 'calc(100vh - 64px - 45px)' }}>
        <AnimatePresence mode="wait">
          {isDemAiPage ? (
            <motion.div
              key="dem-ai"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <DemAiProject />
              <Contact />
              <PortfolioFooter />
            </motion.div>
          ) : isMechanicShopPage ? (
            <motion.div
              key="mechanic-shop"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <MechanicShopProject />
              <Contact />
              <PortfolioFooter />
            </motion.div>
          ) : isContactPage ? (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ContactPage />
              <PortfolioFooter />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Hero />
              <Problem />
              <About />
              <Philosophy />
              <Projects />
              <Terminal />
              <Services />
              <Writing />
              <Proof />
              <Contact />
              <PortfolioFooter />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Status Bar */}
      <StatusBar activeSection={isDemAiPage ? 'projects/dem-ai' : isMechanicShopPage ? 'projects/mechanic-shop' : isContactPage ? 'contact' : activeSection} />
    </>
  );
}

export default App;
