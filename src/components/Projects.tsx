import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

export const Projects: React.FC = () => {
  const projects = [
    {
      year: '2026',
      role: 'Full-Stack Developer',
      title: 'DEM AI',
      desc: 'A healthcare management platform connecting patients, doctors, and pharmacies with appointments, consultation logs, prescriptions, and stock visibility.',
      tags: ['Healthcare', 'Clean Architecture', 'React'],
      accent: 'blue',
      windowTitle: 'dem-ai.app/dashboard',
      screen: 'health',
      image: '/demai/homepage.png',
      href: '/projects/dem-ai'
    },
    {
      year: '2026',
      role: 'Creator & Developer',
      title: 'MechanicShop Workshop',
      desc: 'A full-stack auto repair shop management platform with scheduling, work orders, labor assignment, invoicing, dashboards, JWT authentication, and real-time updates.',
      tags: ['Blazor WASM', 'CQRS', 'SignalR'],
      accent: 'orange',
      windowTitle: 'mechanicshop.local/dashboard',
      screen: 'workshop',
      image: '/mechanicshop/manager-dashboard.png',
      imageAlt: 'MechanicShop manager dashboard preview',
      href: '/projects/mechanic-shop'
    },
    {
      year: '2026',
      role: 'Portfolio System',
      title: 'Developer Console',
      desc: 'An interactive portfolio surface with a simulated terminal, status bar, scroll spy, theme state, and structured project storytelling.',
      tags: ['React', 'Framer Motion', 'UX System'],
      accent: 'green',
      windowTitle: 'portfolio/home',
      screen: 'console',
      href: 'https://github.com/Scootu/'
    }
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 34 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' }
    }
  };

  return (
    <section className="section-box projects-section" id="projects">
      <div className="projects-dot-field" aria-hidden="true" />
      <div className="container projects-container">
        <div className="work-heading">
          <span className="work-number">04</span>
          <div className="section-kicker font-mono">// section.work</div>
          <h2 className="section-title section-title--large">Featured Work</h2>
        </div>

        <motion.div
          className="featured-work-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project) => (
            <motion.article
              className={`work-card work-card--${project.accent}`}
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="work-preview">
                <div className={`browser-window ${project.image ? 'browser-window--image' : ''}`}>
                  <div className="browser-bar">
                    <span className="dot dot--red" />
                    <span className="dot dot--yellow" />
                    <span className="dot dot--green" />
                    <span className="browser-title font-mono">{project.windowTitle}</span>
                  </div>
                  <ProjectScreen type={project.screen} image={project.image} imageAlt={project.imageAlt} />
                </div>
              </div>

              <div className="work-card-body">
                <div className="work-meta font-mono">
                  <span>{project.year}</span>
                  <span>{project.role}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="work-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a
                  className="work-link font-mono"
                  href={project.href}
                  target={project.href.startsWith('http') ? '_blank' : undefined}
                  rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  View case study <ArrowUpRight size={13} />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="projects-action">
          <a href="#contact" className="btn-primary">Talk about a project</a>
        </div>
      </div>

      <style>{`
        .projects-section {
          overflow: hidden;
          background: var(--color-bg-primary);
        }

        .projects-dot-field {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.55;
          pointer-events: none;
        }

        .projects-container {
          position: relative;
          z-index: 2;
        }

        .work-heading {
          position: relative;
          margin-bottom: var(--space-7);
        }

        .work-number {
          position: absolute;
          top: -70px;
          left: 0;
          color: var(--color-text-tertiary);
          font-family: var(--font-body);
          font-size: 130px;
          font-weight: 700;
          line-height: 1;
          opacity: 0.18;
        }

        .featured-work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-5);
        }

        .work-card {
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 84%, transparent);
          transition: border-color var(--motion-medium) var(--ease-standard), box-shadow var(--motion-medium) var(--ease-standard);
        }

        .work-card:hover {
          border-color: var(--work-accent);
          box-shadow: 0 18px 48px rgba(0,0,0,0.08);
        }

        .work-card--blue { --work-accent: var(--color-blue); --work-soft: var(--color-blue-subtle); }
        .work-card--orange { --work-accent: var(--color-orange); --work-soft: var(--color-orange-subtle); }
        .work-card--green { --work-accent: var(--color-green); --work-soft: var(--color-green-subtle); }

        .work-preview {
          min-height: 280px;
          display: grid;
          place-items: center;
          padding: var(--space-5);
          border-bottom: 1px solid var(--color-border);
          background:
            linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px),
            linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
            var(--color-bg-tertiary);
          background-size: 38px 38px;
        }

        .browser-window {
          width: min(100%, 340px);
          aspect-ratio: 1.35;
          background: #151515;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 18px 30px rgba(0,0,0,0.22);
          overflow: hidden;
          transform: rotate(-1deg);
          transition: transform var(--motion-medium) var(--ease-standard);
        }

        .browser-window--image {
          width: min(100%, 370px);
          aspect-ratio: 1.6;
        }

        .work-card:hover .browser-window {
          transform: rotate(0deg) scale(1.03);
        }

        .browser-bar {
          height: 28px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 10px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex: 0 0 auto;
        }

        .dot--red { background: #ff5f56; }
        .dot--yellow { background: #ffbd2e; }
        .dot--green { background: #27c93f; }

        .browser-title {
          margin-left: auto;
          font-size: 8px;
          color: rgba(255,255,255,0.42);
        }

        .screen {
          position: relative;
          height: calc(100% - 28px);
          padding: 18px;
          color: white;
          background:
            radial-gradient(circle at 24% 30%, color-mix(in srgb, var(--work-accent) 28%, transparent), transparent 28%),
            #101010;
        }

        .screen-image {
          position: relative;
          height: calc(100% - 28px);
          background: #f4f8ff;
        }

        .screen-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: 32% 45%;
        }

        .screen-grid {
          display: grid;
          gap: 8px;
        }

        .screen-line,
        .screen-chip,
        .screen-panel,
        .screen-metric {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .screen-line {
          height: 10px;
        }

        .screen-line.short {
          width: 52%;
        }

        .screen-chip {
          display: inline-flex;
          align-items: center;
          width: max-content;
          padding: 5px 8px;
          color: rgba(255,255,255,0.8);
          font-size: 9px;
          font-family: var(--font-mono);
        }

        .screen-layout {
          display: grid;
          grid-template-columns: 0.7fr 1fr;
          gap: 10px;
          margin-top: 16px;
        }

        .screen-panel {
          min-height: 88px;
          padding: 8px;
        }

        .screen-metric {
          height: 26px;
          margin-bottom: 7px;
        }

        .screen-node {
          position: absolute;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--work-accent);
          box-shadow: 0 0 20px var(--work-accent);
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .screen-terminal {
          display: flex;
          flex-direction: column;
          gap: 7px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: #a9b1d6;
        }

        .screen-terminal span:nth-child(2n) {
          color: var(--work-accent);
        }

        .work-card-body {
          padding: var(--space-5);
        }

        .work-meta {
          display: flex;
          gap: var(--space-3);
          align-items: center;
          color: var(--color-blue);
          font-size: 12px;
          margin-bottom: var(--space-3);
        }

        .work-meta span:first-child {
          color: var(--color-orange);
          background: var(--color-orange-subtle);
          padding: 2px 8px;
        }

        .work-card h3 {
          font-family: var(--font-body);
          font-size: 28px;
          font-weight: 700;
          margin-bottom: var(--space-3);
          letter-spacing: 0;
        }

        .work-card p {
          color: var(--color-text-secondary);
          font-size: 15px;
          line-height: 1.65;
        }

        .work-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin: var(--space-4) 0;
        }

        .work-tags span {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          font-size: 11px;
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: 2px 8px;
        }

        .work-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          color: var(--color-blue);
          font-size: 12px;
        }

        .projects-action {
          display: flex;
          justify-content: center;
          margin-top: var(--space-7);
        }

        @media (max-width: 1050px) {
          .featured-work-grid {
            grid-template-columns: 1fr;
          }
          .work-preview {
            min-height: 340px;
          }
        }

        @media (max-width: 520px) {
          .work-preview {
            min-height: 240px;
            padding: var(--space-4);
          }
          .work-card h3 {
            font-size: 24px;
          }
          .work-meta {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
};

const ProjectScreen: React.FC<{ type: string; image?: string; imageAlt?: string }> = ({ type, image, imageAlt }) => {
  if (type === 'console') {
    return (
      <div className="screen screen-terminal">
        <span>anes@scootu:~$ npm run build</span>
        <span>✓ app compiled</span>
        <span>anes@scootu:~$ query --projects</span>
        <span>DEM AI / MechanicShop / Portfolio</span>
        <span>status: ready_to_ship</span>
      </div>
    );
  }

  if (image) {
    return (
      <div className="screen-image">
        <img src={image} alt={imageAlt ?? 'Project preview'} loading="lazy" />
      </div>
    );
  }

  return (
    <div className="screen">
      <span className="screen-node" />
      <div className="screen-grid">
        <span className="screen-chip">{type === 'health' ? 'care network' : 'workshop flow'}</span>
        <span className="screen-line" />
        <span className="screen-line short" />
      </div>
      <div className="screen-layout">
        <div className="screen-panel" />
        <div>
          <div className="screen-metric" />
          <div className="screen-metric" />
          <div className="screen-metric" />
        </div>
      </div>
    </div>
  );
};
