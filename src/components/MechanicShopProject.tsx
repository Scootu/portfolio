import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Box,
  Braces,
  GitBranch,
  Maximize2,
  ShieldCheck,
} from 'lucide-react';
import { Lightbox, type LightboxImage } from './Lightbox';

const screenshots = [
  {
    title: 'Manager dashboard',
    desc: 'Operational KPIs for orders, revenue, costs, profit, completion rate, and cancellation rate.',
    src: '/mechanicshop/manager-dashboard.png'
  },
  {
    title: 'Manager work orders',
    desc: 'Filtered work-order table with vehicle, customer, labor, repair tasks, status, and time slots.',
    src: '/mechanicshop/manager-workorders.png'
  },
  {
    title: 'Daily schedule',
    desc: 'Workshop spot schedule with time slots and labor filtering for planning the repair day.',
    src: '/mechanicshop/manager-schedules.png'
  },
  {
    title: 'Repair services',
    desc: 'Repair task catalog with labor/parts pricing used by work orders and invoices.',
    src: '/mechanicshop/manager-services.png'
  },
  {
    title: 'Labor dashboard',
    desc: 'Labor role view with the same platform shaped around assigned work and progress.',
    src: '/mechanicshop/labor-dashboard.png'
  },
  {
    title: 'Labor work orders',
    desc: 'Assigned work-order tracking for technicians without exposing manager-only operations.',
    src: '/mechanicshop/labor-workorders.png'
  }
];

const techGroups = [
  {
    label: '// frontend',
    items: ['Blazor WebAssembly', 'C# / .NET', 'Component UI']
  },
  {
    label: '// backend',
    items: ['ASP.NET Core', 'CQRS + MediatR', 'FluentValidation']
  },
  {
    label: '// real-time & security',
    items: ['SignalR', 'JWT + Refresh Tokens', 'Role-based Access']
  },
  {
    label: '// operations',
    items: ['Docker', 'Seq Logging', 'PDF Export']
  }
];

export const MechanicShopProject: React.FC = () => {
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
    <section className="mechanic-detail-page">
      <div className="mechanic-grid-bg" aria-hidden="true" />

      <div className="container mechanic-hero">
        <a href="/#projects" className="mechanic-back font-mono" onClick={handleBack}>
          <ArrowLeft size={14} /> All Projects
        </a>

        <div className="mechanic-tags font-mono">
          <span className="mechanic-square" />
          <span>2026</span>
          <span>ASP.NET Core</span>
          <span>Blazor WebAssembly</span>
          <span>Workshop SaaS</span>
        </div>

        <div className="mechanic-hero-grid">
          <div>
            <div className="section-kicker font-mono">// project.mechanicshop</div>
            <h1>MechanicShop Workshop</h1>
            <p className="mechanic-role font-mono">Full-Stack Workshop Management Platform</p>
            <p className="mechanic-summary">
              A role-based web application for auto repair shop operations: customers, vehicles, repair services, labor assignments, daily schedules, work orders, invoices, PDF export, and performance dashboards.
            </p>
            <div className="mechanic-actions">
              <a
                className="mechanic-demo-link font-mono"
                href="http://localhost:5001/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open local app <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="mechanic-metrics">
            <Metric icon={<ShieldCheck size={18} />} label="Security" value="JWT + refresh tokens" />
            <Metric icon={<GitBranch size={18} />} label="Application" value="CQRS + MediatR" />
            <Metric icon={<Braces size={18} />} label="Validation" value="FluentValidation" />
            <Metric icon={<Box size={18} />} label="Operations" value="Docker + Seq" />
          </div>
        </div>
      </div>

      <div className="container mechanic-sections">
        <article className="mechanic-card mechanic-card--wide">
          <span className="section-index font-mono">00</span>
          <h2>What It Is</h2>
          <p>
            MechanicShop Workshop is designed around the real operational flow of a repair shop. Managers can create customers, vehicles, service tasks, schedules, and invoices, while labor users can view assigned work and follow work-order progress.
          </p>
        </article>

        <article className="mechanic-card">
          <span className="section-index font-mono">01</span>
          <h2>Technologies</h2>
          <p>
            MechanicShop pairs a Blazor WebAssembly front end with an ASP.NET Core back end built on CQRS and MediatR, with real-time updates over SignalR and a containerised runtime.
          </p>
          <div className="tech-groups">
            {techGroups.map((group) => (
              <div className="tech-group" key={group.label}>
                <span className="tech-label font-mono">{group.label}</span>
                <div className="tech-chips">
                  {group.items.map((item) => (
                    <span className="tech-chip font-mono" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="mechanic-card mechanic-card--screens">
          <span className="section-index font-mono">02</span>
          <h2>Product Screenshots</h2>
          <p>
            A look at the product itself: dashboards, status-heavy work-order tables, daily schedule planning, service catalogs, and role-specific technician views.
          </p>
          <div className="mechanic-screenshots">
            {screenshots.map((shot) => (
              <ScreenshotCard
                key={shot.title}
                {...shot}
                onClick={() =>
                  setActiveShot({
                    title: shot.title,
                    desc: shot.desc,
                    src: shot.src,
                    alt: `MechanicShop ${shot.title} screenshot`
                  })
                }
              />
            ))}
          </div>
        </article>
      </div>

      <Lightbox image={activeShot} onClose={() => setActiveShot(null)} />

      <style>{`
        .mechanic-detail-page {
          position: relative;
          min-height: 100vh;
          padding-bottom: var(--space-10);
          background: var(--color-bg-primary);
          overflow: hidden;
        }

        .mechanic-grid-bg {
          position: fixed;
          inset: 64px 0 0;
          background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.65;
          pointer-events: none;
        }

        .mechanic-hero,
        .mechanic-sections {
          position: relative;
          z-index: 2;
        }

        .mechanic-hero {
          padding: var(--space-8) var(--container-pad) var(--space-7);
        }

        .mechanic-back {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--color-text-secondary);
          font-size: 13px;
          margin-bottom: var(--space-6);
        }

        .mechanic-back:hover {
          color: var(--color-blue);
        }

        .mechanic-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
          color: var(--color-text-secondary);
          font-size: 12px;
        }

        .mechanic-tags span:not(.mechanic-square) {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: 6px 12px;
        }

        .mechanic-tags span:nth-child(2) {
          color: var(--color-orange);
          background: var(--color-orange-subtle);
        }

        .mechanic-square {
          width: 12px;
          height: 12px;
          background: var(--color-text-primary);
          margin-right: var(--space-4);
        }

        .mechanic-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.65fr);
          gap: var(--space-8);
          align-items: end;
        }

        .mechanic-hero h1 {
          max-width: 980px;
          font-family: var(--font-body);
          font-size: clamp(52px, 7.5vw, 112px);
          font-weight: 800;
          letter-spacing: 0;
          line-height: 0.96;
          margin: var(--space-3) 0;
        }

        .mechanic-role {
          color: var(--color-blue);
          font-size: 18px;
          margin-bottom: var(--space-4);
        }

        .mechanic-summary {
          max-width: 820px;
          color: var(--color-text-secondary);
          font-size: 21px;
          line-height: 1.65;
          font-style: italic;
        }

        .mechanic-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-top: var(--space-5);
        }

        .mechanic-demo-link {
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

        .mechanic-demo-link:hover {
          color: #fff;
          background: var(--color-black);
          border-color: var(--color-black);
        }

        .mechanic-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
        }

        .mechanic-metric {
          min-height: 116px;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-1);
          border-right: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .mechanic-metric:nth-child(2n) { border-right: none; }
        .mechanic-metric:nth-last-child(-n + 2) { border-bottom: none; }
        .mechanic-metric svg { color: var(--color-blue); }
        .mechanic-metric strong { font-family: var(--font-body); font-size: 18px; }
        .mechanic-metric span { font-family: var(--font-mono); color: var(--color-text-secondary); font-size: 11px; }

        .mechanic-sections {
          display: grid;
          gap: var(--space-5);
          margin-top: var(--space-7);
        }

        .mechanic-card {
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
          padding: var(--space-6);
        }

        .section-index {
          color: var(--color-orange);
          font-size: 12px;
        }

        .mechanic-card h2 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 32px;
          margin: var(--space-2) 0 var(--space-3);
        }

        .mechanic-card p {
          color: var(--color-text-secondary);
          max-width: 860px;
          line-height: 1.7;
        }

        .tech-groups {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-5);
          margin-top: var(--space-5);
        }

        .tech-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .tech-label {
          color: var(--color-blue);
          font-size: 12px;
        }

        .tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-chip {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          color: var(--color-text-secondary);
          font-size: 12px;
          padding: 6px 12px;
          transition: border-color var(--motion-medium) var(--ease-standard),
                      color var(--motion-medium) var(--ease-standard);
        }

        .tech-chip:hover {
          border-color: var(--color-blue);
          color: var(--color-text-primary);
        }

        .mechanic-screenshots {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
          margin-top: var(--space-5);
        }

        .mechanic-shot {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: var(--space-3);
          transition: transform var(--motion-medium) var(--ease-standard), border-color var(--motion-medium) var(--ease-standard);
        }

        .mechanic-shot:hover {
          border-color: var(--color-blue);
          transform: translateY(-4px);
        }

        .mechanic-shot-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #202529;
          border: 1px solid var(--color-border-subtle);
          overflow: hidden;
          margin-bottom: var(--space-3);
          padding: 0;
          cursor: zoom-in;
          display: block;
        }

        .mechanic-shot-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform var(--motion-medium) var(--ease-standard);
        }

        .mechanic-shot-frame:hover img {
          transform: scale(1.04);
        }

        .mechanic-shot-zoom {
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

        .mechanic-shot-frame:hover .mechanic-shot-zoom,
        .mechanic-shot-frame:focus-visible .mechanic-shot-zoom {
          opacity: 1;
        }

        .mechanic-shot h3 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 18px;
          margin-bottom: 4px;
        }

        .mechanic-shot p {
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 1050px) {
          .mechanic-hero-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .mechanic-hero {
            padding-top: var(--space-6);
          }
          .mechanic-hero-grid,
          .mechanic-metrics,
          .tech-groups,
          .mechanic-screenshots {
            grid-template-columns: 1fr;
          }
          .mechanic-metric,
          .mechanic-metric:nth-child(2n),
          .mechanic-metric:nth-last-child(-n + 2) {
            border-right: none;
            border-bottom: 1px solid var(--color-border-subtle);
          }
          .mechanic-metric:last-child {
            border-bottom: none;
          }
          .mechanic-card {
            padding: var(--space-4);
          }
        }
      `}</style>
    </section>
  );
};

const Metric: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="mechanic-metric">
    {icon}
    <strong>{label}</strong>
    <span>{value}</span>
  </div>
);

const ScreenshotCard: React.FC<{ title: string; desc: string; src: string; onClick: () => void }> = ({ title, desc, src, onClick }) => (
  <figure className="mechanic-shot">
    <button type="button" className="mechanic-shot-frame" onClick={onClick} aria-label={`Expand ${title} screenshot`}>
      <img src={src} alt={`MechanicShop ${title} screenshot`} loading="lazy" />
      <span className="mechanic-shot-zoom">
        <Maximize2 size={16} /> View
      </span>
    </button>
    <h3>{title}</h3>
    <p>{desc}</p>
  </figure>
);
