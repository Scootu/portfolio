import { useState, useEffect } from 'react';
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
      <main style={{ marginTop: '64px' }}>
        {isDemAiPage ? (
          <DemAiProject />
        ) : isMechanicShopPage ? (
          <MechanicShopProject />
        ) : isContactPage ? (
          <>
            <ContactPage />
            <PortfolioFooter />
          </>
        ) : (
          <>
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
          </>
        )}
      </main>

      {/* Status Bar */}
      <StatusBar activeSection={isDemAiPage ? 'projects/dem-ai' : isMechanicShopPage ? 'projects/mechanic-shop' : isContactPage ? 'contact' : activeSection} />
    </>
  );
}

export default App;
