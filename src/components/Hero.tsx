import React from 'react';
import { Download, Terminal as TerminalIcon, ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

export const Hero: React.FC = () => {
  const contentVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.09, delayChildren: 0.12 }
    }
  };

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] }
    }
  };

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

  return (
    <>
      <section className="hero-section" id="home">
        <div className="hero-container container">
          <div className="hero-grid">
            <motion.div
              className="hero-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="hero-eyebrow" variants={revealVariants}>
                <span className="badge-pill badge-pill--orange">
                  <span className="eyebrow-dot"></span> AVAILABLE FOR OPPORTUNITIES
                </span>
              </motion.div>

              <motion.h1 className="hero-title" variants={revealVariants}>
                Anes Hamdaoui
              </motion.h1>

              <motion.h2 className="hero-subtitle" variants={revealVariants}>
                Full Stack Developer <span className="subtitle-sep">//</span> Building Systems that Scale
              </motion.h2>

              <motion.p className="hero-description" variants={revealVariants}>
                I am a Full Stack Developer specializing in robust backend architectures using <strong>C#</strong>, <strong>ASP.NET Core</strong>, 
                and <strong>Clean Architecture</strong> combined with responsive frontends built in <strong>React</strong> and <strong>TypeScript</strong>. 
                I focus on writing clean, maintainable systems, optimization, and solving complex engineering challenges.
              </motion.p>

              <motion.div className="hero-actions" variants={revealVariants}>
                <a 
                  href="/Anes-hamdaoui-1.pdf" 
                  download="Anes-Hamdaoui-CV.pdf"
                  className="btn-primary hero-btn"
                >
                  <Download size={14} /> Download CV
                </a>
                <button 
                  onClick={() => handleScrollToSection('terminal')}
                  className="btn-secondary hero-btn"
                >
                  <TerminalIcon size={14} /> Run Terminal <ArrowRight size={12} className="btn-arrow" />
                </button>
              </motion.div>

              <motion.div className="hero-tech-container" variants={revealVariants}>
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

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="visual-grid-overlay"></div>
              <div className="visual-card">
                <div className="visual-card-header">
                  <div className="window-dots">
                    <span className="dot dot--red"></span>
                    <span className="dot dot--yellow"></span>
                    <span className="dot dot--green"></span>
                  </div>
                  <div className="window-title">system_info.json</div>
                </div>
                <div className="visual-card-body">
                  <pre className="code-block">
                    <code>
{`{
  "developer": {
    "name": "Anes Hamdaoui",
    "role": "Full Stack Developer",
    "location": "Algeria, Ain Defla",
    "degree": "B.Sc. in Computer Science"
  },
  "capabilities": [
    "Clean Architecture / SOLID",
    "Database Optimization & Design",
    "High-Performance APIs",
    "Single Page App Orchestration"
  ],
  "experience": {
    "status": "Ready to build",
    "focus": "Backend scalability & clean code"
  }
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
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

        .visual-grid-overlay {
          position: absolute;
          inset: -40px;
          background-image: 
            radial-gradient(var(--color-border) 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.35;
          z-index: 1;
          pointer-events: none;
          animation: dot-drift 18s linear infinite;
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

        .code-block {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #a9b1d6;
          line-height: 1.5;
          text-align: left;
          overflow-x: auto;
        }

        @keyframes dot-drift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(20px, 20px, 0); }
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
