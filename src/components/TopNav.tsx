import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopNavProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  activeSection: string;
}

export const TopNav: React.FC<TopNavProps> = ({ darkMode, setDarkMode, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: Array<{ id: string; label: string; path?: string }> = [
    { id: 'home', label: 'home' },
    { id: 'about', label: 'about' },
    { id: 'projects', label: 'work' },
    { id: 'services', label: 'services' },
    { id: 'writing', label: 'writing' },
    { id: 'contact', label: 'reach out', path: '/contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { id: string; path?: string }) => {
    e.preventDefault();
    setIsOpen(false);
    if (item.path) {
      window.history.pushState({}, '', item.path);
      window.dispatchEvent(new Event('portfolio:navigation'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = item.id;
    const element = document.getElementById(id);
    if (element) {
      window.history.pushState({}, '', id === 'home' ? '/#home' : `/#${id}`);
      window.dispatchEvent(new Event('portfolio:navigation'));
      const offset = 80; // height of navbar + some spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      <nav className={`top-nav ${scrolled ? 'top-nav--scrolled' : ''}`}>
        <div className="top-nav__container">
            <a href="#home" onClick={(e) => handleNavClick(e, { id: 'home' })} className="top-nav__logo">
            <span className="logo-dot"></span>
            <span className="logo-text">anes hamdaoui</span>
            <span className="logo-role">// dev</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="top-nav__links-container">
            <ul className="top-nav__links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path ?? `#${item.id}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`top-nav__link ${activeSection === item.id ? 'is-active' : ''}`}
                  >
                    {activeSection === item.id && (
                      <motion.span
                        className="top-nav__active-pill"
                        layoutId="top-nav-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="top-nav__link-label">
                    {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="top-nav__theme-toggle"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="top-nav__mobile-buttons">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="top-nav__theme-toggle mobile-theme-btn"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="top-nav__burger"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="top-nav__mobile-panel"
            >
              <ul className="top-nav__mobile-links">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.path ?? `#${item.id}`}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`top-nav__mobile-link ${activeSection === item.id ? 'is-active' : ''}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style>{`
        .top-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: color-mix(in srgb, var(--color-bg-primary) 85%, transparent);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--color-border);
          transition: background var(--motion-medium) var(--ease-standard),
                      border var(--motion-medium) var(--ease-standard);
        }

        .top-nav--scrolled {
          background: color-mix(in srgb, var(--color-bg-primary) 95%, transparent);
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        .top-nav__container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: var(--space-4) var(--container-pad);
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .top-nav__logo {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .top-nav__logo:hover {
          color: var(--color-blue);
        }

        .logo-dot {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-orange);
          animation: blink 1.2s infinite;
        }

        .logo-role {
          font-weight: 400;
          opacity: 0.5;
        }

        .top-nav__links-container {
          display: flex;
          align-items: center;
          gap: var(--space-6);
        }

        .top-nav__links {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          list-style: none;
        }

        .top-nav__link {
          position: relative;
          display: block;
          padding: var(--space-2) var(--space-3);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--color-text-secondary);
          transition: color var(--motion-fast) var(--ease-standard);
          isolation: isolate;
        }

        .top-nav__link-label {
          position: relative;
          z-index: 2;
        }

        .top-nav__active-pill {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: var(--color-border-subtle);
          border: 1px solid var(--color-border);
          border-radius: 4px;
        }

        .top-nav__link:hover {
          color: var(--color-text-primary);
        }

        .top-nav__link::after {
          content: '';
          position: absolute;
          left: var(--space-3);
          right: var(--space-3);
          bottom: 2px;
          height: 1px;
          background: var(--color-blue);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.25s var(--ease-standard);
        }

        .top-nav__link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .top-nav__link.is-active {
          color: var(--color-blue);
          font-weight: 500;
        }

        .top-nav__link.is-active::after {
          display: none;
        }

        .top-nav__theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid var(--color-border);
          border-radius: 4px;
          color: var(--color-text-secondary);
          transition: all var(--motion-fast) var(--ease-standard);
        }

        .top-nav__theme-toggle:hover {
          color: var(--color-text-primary);
          background: var(--color-border-subtle);
          border-color: var(--color-text-primary);
        }

        .top-nav__mobile-buttons {
          display: none;
          align-items: center;
          gap: var(--space-2);
        }

        .top-nav__burger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--color-border);
          border-radius: 4px;
          color: var(--color-text-secondary);
        }

        .top-nav__mobile-panel {
          border-top: 1px solid var(--color-border);
          background: var(--color-bg-primary);
          overflow: hidden;
          width: 100%;
        }

        .top-nav__mobile-links {
          display: flex;
          flex-direction: column;
          list-style: none;
          padding: var(--space-4) var(--container-pad);
          gap: var(--space-2);
        }

        .top-nav__mobile-link {
          display: block;
          padding: var(--space-2) 0;
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--color-text-secondary);
        }

        .top-nav__mobile-link.is-active {
          color: var(--color-blue);
          font-weight: 500;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (max-width: 900px) {
          .top-nav__links-container {
            display: none;
          }
          .top-nav__mobile-buttons {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};
