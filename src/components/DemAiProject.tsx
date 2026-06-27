import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  FileCode2,
  GitBranch,
  Maximize2,
  ShieldCheck,
} from 'lucide-react';
import { Lightbox, type LightboxImage } from './Lightbox';

const productScreenshots = [
  {
    title: 'Patient portal',
    desc: 'Verified patient access entry point through NIN lookup.',
    src: '/demai/patient-portal.webp'
  },
  {
    title: 'Doctor appointments',
    desc: 'Calendar planning with daily appointment limits and selected-day details.',
    src: '/demai/appointments-calendar.webp'
  },
  {
    title: 'Prescription builder',
    desc: 'Medication list, diagnosis text, and generated prescription preview.',
    src: '/demai/prescription-builder.webp'
  },
  {
    title: 'Pharmacy stock',
    desc: 'Stock and family-drug management for pharmacist workflows.',
    src: '/demai/stock-management.webp'
  },
  {
    title: 'Medication history',
    desc: 'Patient medication history table with doctor, enterprise, and diagnosis labels.',
    src: '/demai/medication-history.webp'
  }
];

export const DemAiProject: React.FC = () => {
  const [activeShot, setActiveShot] = useState<LightboxImage | null>(null);

  const handleBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState({}, '', '/#projects');
    window.dispatchEvent(new Event('portfolio:navigation'));
    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <section className="project-detail-page">
      <div className="detail-grid-bg" aria-hidden="true" />

      <div className="container detail-hero">
        <a href="/#projects" className="detail-back font-mono" onClick={handleBack}>
          <ArrowLeft size={14} /> All Projects
        </a>

        <div className="detail-tags font-mono">
          <span className="detail-square" />
          <span>2026</span>
          <span>ASP.NET Core</span>
          <span>Healthcare SaaS</span>
        </div>

        <div className="detail-hero-grid">
          <div>
            <div className="section-kicker font-mono">// project.dem-ai</div>
            <h1>DEM AI</h1>
            <p className="detail-role font-mono">Full-Stack Healthcare Platform</p>
            <p className="detail-summary">
              A medical ecosystem connecting patients, physicians, and pharmacies — appointment scheduling, prescriptions, medication history, and pharmacy stock management in one platform.
            </p>
            <div className="detail-actions">
              <a
                className="detail-demo-link font-mono"
                href="https://ice-machine.github.io/HealthCare/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open live demo <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="detail-metrics">
            <Metric icon={<ShieldCheck size={18} />} label="Security" value="JWT + role policies" />
            <Metric icon={<GitBranch size={18} />} label="Application" value="CQRS handlers" />
            <Metric icon={<CheckCircle2 size={18} />} label="Outcome Flow" value="Result Pattern" />
            <Metric icon={<FileCode2 size={18} />} label="Validation" value="FluentValidation" />
          </div>
        </div>
      </div>

      <div className="container detail-sections">
        <article className="detail-section-card screenshot-card">
          <span className="section-index font-mono">01</span>
          <h2>Product Screenshots</h2>
          <p>
            A look at the product itself: patient access, doctor scheduling, prescriptions, medication history, and pharmacist stock management.
          </p>
          <div className="screenshot-grid">
            {productScreenshots.map((shot) => (
              <ScreenshotCard
                key={shot.title}
                {...shot}
                onClick={() =>
                  setActiveShot({
                    title: shot.title,
                    desc: shot.desc,
                    src: shot.src,
                    alt: `DEM AI ${shot.title} screenshot`
                  })
                }
              />
            ))}
          </div>
        </article>
      </div>

      <Lightbox image={activeShot} onClose={() => setActiveShot(null)} />

      <style>{`
        .project-detail-page {
          position: relative;
          min-height: 100vh;
          padding-bottom: var(--space-10);
          background: var(--color-bg-primary);
          overflow: hidden;
        }

        .detail-grid-bg {
          position: fixed;
          inset: 64px 0 0;
          background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.65;
          pointer-events: none;
        }

        .detail-hero,
        .detail-sections {
          position: relative;
          z-index: 2;
        }

        .detail-hero {
          padding: var(--space-8) var(--container-pad) var(--space-7);
        }

        .detail-back {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--color-text-secondary);
          font-size: 13px;
          margin-bottom: var(--space-6);
        }

        .detail-back:hover {
          color: var(--color-blue);
        }

        .detail-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
          color: var(--color-text-secondary);
          font-size: 12px;
        }

        .detail-tags span:not(.detail-square) {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: 6px 12px;
        }

        .detail-tags span:nth-child(2) {
          color: var(--color-orange);
          background: var(--color-orange-subtle);
        }

        .detail-square {
          width: 12px;
          height: 12px;
          background: var(--color-text-primary);
          margin-right: var(--space-4);
        }

        .detail-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.65fr);
          gap: var(--space-8);
          align-items: end;
        }

        .detail-hero h1 {
          font-family: var(--font-body);
          font-size: clamp(58px, 8vw, 124px);
          font-weight: 800;
          letter-spacing: 0;
          margin: var(--space-3) 0;
        }

        .detail-role {
          color: var(--color-blue);
          font-size: 18px;
          margin-bottom: var(--space-4);
        }

        .detail-summary {
          max-width: 780px;
          color: var(--color-text-secondary);
          font-size: 21px;
          line-height: 1.65;
          font-style: italic;
        }

        .detail-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-top: var(--space-5);
        }

        .detail-demo-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          min-height: 42px;
          padding: 0 var(--space-5);
          border: 1px solid var(--color-blue);
          background: var(--color-blue);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
        }

        .detail-demo-link:hover {
          color: #fff;
          background: var(--color-black);
          border-color: var(--color-black);
        }

        .detail-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
        }

        .metric-box {
          min-height: 116px;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-1);
          border-right: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .metric-box:nth-child(2n) { border-right: none; }
        .metric-box:nth-last-child(-n + 2) { border-bottom: none; }

        .metric-box svg {
          color: var(--color-blue);
        }

        .metric-box strong {
          font-family: var(--font-body);
          font-size: 18px;
        }

        .metric-box span {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          font-size: 11px;
        }

        .detail-sections {
          display: grid;
          gap: var(--space-5);
          margin-top: var(--space-7);
        }

        .detail-section-card {
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
          padding: var(--space-6);
        }

        .section-index {
          color: var(--color-orange);
          font-size: 12px;
        }

        .detail-section-card h2 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 32px;
          margin: var(--space-2) 0 var(--space-3);
        }

        .detail-section-card p {
          color: var(--color-text-secondary);
          max-width: 800px;
          line-height: 1.7;
        }

        .screenshot-grid {
          display: grid;
          gap: var(--space-4);
          margin-top: var(--space-5);
          grid-template-columns: repeat(2, 1fr);
        }

        .screenshot-card-item {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: var(--space-3);
          transition: transform var(--motion-medium) var(--ease-standard),
                      border-color var(--motion-medium) var(--ease-standard);
        }

        .screenshot-card-item:hover {
          border-color: var(--color-blue);
          transform: translateY(-4px);
        }

        .screenshot-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #fff;
          border: 1px solid var(--color-border-subtle);
          overflow: hidden;
          margin-bottom: var(--space-3);
          padding: 0;
          cursor: zoom-in;
          display: block;
        }

        .screenshot-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform var(--motion-medium) var(--ease-standard);
        }

        .screenshot-frame:hover img {
          transform: scale(1.04);
        }

        .screenshot-zoom {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 13px;
          background: rgba(10, 12, 16, 0.55);
          opacity: 0;
          transition: opacity var(--motion-medium) var(--ease-standard);
        }

        .screenshot-frame:hover .screenshot-zoom,
        .screenshot-frame:focus-visible .screenshot-zoom {
          opacity: 1;
        }

        .screenshot-card-item h3 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 18px;
          margin-bottom: 4px;
        }

        .screenshot-card-item p {
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 1050px) {
          .detail-hero-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .detail-hero {
            padding-top: var(--space-6);
          }
          .detail-hero-grid,
          .detail-metrics,
          .screenshot-grid {
            grid-template-columns: 1fr;
          }
          .metric-box,
          .metric-box:nth-child(2n),
          .metric-box:nth-last-child(-n + 2) {
            border-right: none;
            border-bottom: 1px solid var(--color-border-subtle);
          }
          .metric-box:last-child {
            border-bottom: none;
          }
          .detail-section-card {
            padding: var(--space-4);
          }
        }
      `}</style>
    </section>
  );
};

const Metric: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="metric-box">
    {icon}
    <strong>{label}</strong>
    <span>{value}</span>
  </div>
);

const ScreenshotCard: React.FC<{ title: string; desc: string; src: string; onClick: () => void }> = ({ title, desc, src, onClick }) => (
  <figure className="screenshot-card-item">
    <button type="button" className="screenshot-frame" onClick={onClick} aria-label={`Expand ${title} screenshot`}>
      <img src={src} alt={`DEM AI ${title} screenshot`} loading="lazy" />
      <span className="screenshot-zoom">
        <Maximize2 size={16} /> View
      </span>
    </button>
    <h3>{title}</h3>
    <p>{desc}</p>
  </figure>
);
