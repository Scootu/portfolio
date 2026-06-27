import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { HeroBackground } from './HeroBackground';

const NAME = 'Anes Hamdaoui';

export const Hero: React.FC = () => {
  const techStack = [
    { label: 'C#', type: 'backend' },
    { label: 'ASP.NET Core', type: 'backend' },
    { label: 'Entity Framework', type: 'backend' },
    { label: 'Clean Architecture', type: 'backend' },
    { label: 'SQL Server', type: 'backend' },
    { label: 'C++', type: 'backend' },
    { label: 'React.js', type: 'frontend' },
    { label: 'TypeScript', type: 'frontend' },
    { label: 'Node.js', type: 'backend' },
    { label: 'PostgreSQL', type: 'backend' },
    { label: 'Docker', type: 'tools' }
  ];

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Per-character reveal for the name — letters rise + fade in sequence.
  const nameContainer: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.045, delayChildren: 0.15 }
    }
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: '0.45em' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.2, 0.65, 0.3, 0.9] }
    }
  };

  const visualVariants: Variants = {
    hidden: { opacity: 0, x: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <>
      <section className="hero-section" id="home">
        <HeroBackground />
        <div className="hero-container container">
          <div className="hero-grid">
            <motion.div 
              className="hero-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="hero-eyebrow" variants={itemVariants}>
                <span className="badge-pill badge-pill--orange">
                  <span className="eyebrow-dot"></span> AVAILABLE FOR OPPORTUNITIES
                </span>
              </motion.div>

              <motion.h1
                className="hero-title"
                variants={nameContainer}
                aria-label={NAME}
              >
                {NAME.split('').map((ch, i) => (
                  <motion.span
                    key={`${ch}-${i}`}
                    className="hero-title-char"
                    variants={letterVariants}
                    aria-hidden="true"
                  >
                    {ch === ' ' ? ' ' : ch}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.h2 className="hero-subtitle" variants={itemVariants}>
                Full Stack Developer <span className="subtitle-sep">//</span> Building Systems that Scale
              </motion.h2>

              <motion.p className="hero-description" variants={itemVariants}>
                I am a Full Stack Developer specializing in robust backend architectures using <strong>C#</strong>, <strong>ASP.NET Core</strong>, 
                and <strong>Clean Architecture</strong> combined with responsive frontends built in <strong>React</strong> and <strong>TypeScript</strong>. 
                I focus on writing clean, maintainable systems, optimization, and solving complex engineering challenges.
              </motion.p>

              <motion.div className="hero-actions" variants={itemVariants}>
                <a 
                  href="/Anes-hamdaoui-1.pdf" 
                  download="Anes-Hamdaoui-CV.pdf"
                  className="btn-primary hero-btn"
                >
                  <Download size={14} /> Download CV
                </a>
                <button
                  onClick={() => handleScrollToSection('projects')}
                  className="btn-secondary hero-btn"
                >
                  View Work <ArrowRight size={12} className="btn-arrow" />
                </button>
              </motion.div>

              <motion.div className="hero-tech-container" variants={itemVariants}>
                <span className="tech-label">CORE STACK //</span>
                <div className="tech-pills">
                  {techStack.map((tech) => (
                    <span 
                      key={tech.label} 
                      className={`badge-pill ${
                        tech.type === 'backend' ? 'badge-pill--blue' : 
                        tech.type === 'frontend' ? 'badge-pill--orange' : 'badge-pill--green'
                      }`}
                    >
                      {tech.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <div className="hero-visual">
              <motion.div
                className="visual-card"
                variants={visualVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="visual-card-header">
                  <div className="window-dots">
                    <span className="dot dot--red"></span>
                    <span className="dot dot--yellow"></span>
                    <span className="dot dot--green"></span>
                  </div>
                  <div className="window-title">anes_hamdaoui.png</div>
                </div>
                <div className="visual-card-body visual-card-body--photo">
                  <img
                    className="hero-photo"
                    src="/anes-photo.png"
                    alt="Anes Hamdaoui"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero-section {
          min-height: calc(100vh - 64px);
          display: flex;
          align-items: center;
          padding: var(--space-8) 0;
          border-bottom: 1px solid var(--color-border);
          position: relative;
          background: var(--color-bg-primary);
        }

        .hero-container {
          position: relative;
          z-index: 2;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: var(--space-8);
          align-items: center;
        }

        .hero-eyebrow {
          margin-bottom: var(--space-4);
        }

        .eyebrow-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-green);
          margin-right: 6px;
          animation: blink 1.5s infinite;
        }

        .hero-title {
          font-size: clamp(52px, 6vw, 82px);
          letter-spacing: 0;
          color: var(--color-text-primary);
          margin-bottom: var(--space-2);
          min-height: 1.2em;
        }

        .hero-title-char {
          display: inline-block;
          white-space: pre;
          transform-origin: bottom;
        }

        .hero-subtitle {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 500;
          color: var(--color-text-secondary);
          margin-bottom: var(--space-5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .subtitle-sep {
          color: var(--color-orange);
        }

        .hero-description {
          font-size: 16px;
          line-height: 1.7;
          color: var(--color-text-secondary);
          max-width: 580px;
          margin-bottom: var(--space-6);
        }

        .hero-description strong {
          color: var(--color-text-primary);
          font-weight: 600;
        }

        .hero-actions {
          display: flex;
          gap: var(--space-3);
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
        }

        .hero-btn {
          height: 42px;
        }

        .btn-arrow {
          transition: transform 0.2s var(--ease-standard);
        }

        .btn-secondary:hover .btn-arrow {
          transform: translateX(4px);
        }

        .hero-tech-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          border-top: 1px solid var(--color-border-subtle);
          padding-top: var(--space-5);
        }

        .tech-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-tertiary);
          letter-spacing: 0.05em;
        }

        .tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        /* Hero Visual / Code Card */
        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visual-card {
          width: 100%;
          max-width: 440px;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-strong);
          box-shadow: var(--shadow-lg);
          border-radius: 6px;
          overflow: hidden;
          z-index: 2;
          position: relative;
          animation: visual-float 6s ease-in-out infinite;
        }

        .visual-card-header {
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: var(--space-2) var(--space-4);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .window-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot--red { background: #ff5f56; }
        .dot--yellow { background: #ffbd2e; }
        .dot--green { background: #27c93f; }

        .window-title {
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
        }

        .visual-card-body {
          padding: var(--space-4);
          background: #141414;
        }

        .visual-card-body--photo {
          padding: 0;
        }

        .hero-photo {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 1 / 1;
          object-fit: cover;
        }

        @keyframes visual-float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -8px, 0); }
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }
          .hero-title {
            font-size: 48px;
          }
          .hero-visual {
            margin-top: var(--space-4);
          }
        }
      `}</style>
    </>
  );
};
