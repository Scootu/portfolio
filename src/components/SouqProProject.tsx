import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Coins,
  Languages,
  Layers,
  Maximize2,
  ShieldCheck,
} from 'lucide-react';
import { Lightbox, type LightboxImage } from './Lightbox';

const screenshots = [
  {
    title: 'Landing page',
    desc: 'Search-first home built for Algerian wilayas with categories and a live feed of client requests.',
    src: '/souqpro/homepage.png'
  },
  {
    title: 'Verified artisans',
    desc: 'Directory of verified providers filterable by wilaya and category, with ratings and trade tags.',
    src: '/souqpro/artisans.png'
  },
  {
    title: 'Service requests',
    desc: 'Public board of client requests (demandes) with budget ranges, location, category, and offer counts.',
    src: '/souqpro/demandes.png'
  },
  {
    title: 'Points & pricing',
    desc: 'Points-pack pricing model — providers buy points and only spend them when sending an offer.',
    src: '/souqpro/pricing.png'
  },
  {
    title: 'Sign up',
    desc: 'Role-based registration where a user joins as a Client or as an Artisan (provider).',
    src: '/souqpro/register.png'
  },
  {
    title: 'Authentication',
    desc: 'Firebase-backed login with Google sign-in, OTP password reset, and role selection.',
    src: '/souqpro/login.png'
  }
];

const techGroups = [
  {
    label: '// frontend',
    items: ['React', 'React Router', 'Tailwind CSS', 'Lucide Icons']
  },
  {
    label: '// backend & data',
    items: ['Firebase Authentication', 'Cloud Firestore', 'Cloud Storage']
  },
  {
    label: '// auth & access',
    items: ['Google OAuth', 'OTP Verification', 'Role-based Access']
  },
  {
    label: '// tooling & i18n',
    items: ['Axios', 'i18n (FR / AR)', 'RTL Layout', 'Netlify']
  }
];

export const SouqProProject: React.FC = () => {
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
    <section className="souq-detail-page">
      <div className="souq-grid-bg" aria-hidden="true" />

      <div className="container souq-hero">
        <a href="/#projects" className="souq-back font-mono" onClick={handleBack}>
          <ArrowLeft size={14} /> All Projects
        </a>

        <div className="souq-tags font-mono">
          <span className="souq-square" />
          <span>2026</span>
          <span>React</span>
          <span>Firebase</span>
          <span>Services Marketplace</span>
        </div>

        <div className="souq-hero-grid">
          <div>
            <div className="section-kicker font-mono">// project.souqpro</div>
            <h1>SouqPro</h1>
            <p className="souq-role font-mono">Services Marketplace — Algeria</p>
            <p className="souq-summary">
              A bilingual marketplace that connects Algerian households with verified artisans — plumbers, electricians, painters, and more. Clients post a request for free; providers spend points to send offers.
            </p>
            <div className="souq-actions">
              <a
                className="souq-demo-link font-mono"
                href="https://souqpro.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open live site <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="souq-metrics">
            <Metric icon={<Layers size={18} />} label="Platform" value="React SPA" />
            <Metric icon={<ShieldCheck size={18} />} label="Auth" value="Firebase + OAuth" />
            <Metric icon={<Coins size={18} />} label="Marketplace" value="Points-based offers" />
            <Metric icon={<Languages size={18} />} label="Localization" value="FR / AR (RTL)" />
          </div>
        </div>
      </div>

      <div className="container souq-sections">
        <article className="souq-card">
          <span className="section-index font-mono">00</span>
          <h2>What It Is</h2>
          <p>
            SouqPro is a services marketplace built for Algeria&apos;s wilayas. Clients browse trades and post a service request for free, while verified artisans discover nearby demand and compete for the job by sending offers. It ships with a client, provider, and admin dashboard and works in both French and Arabic.
          </p>
        </article>

        <article className="souq-card">
          <span className="section-index font-mono">01</span>
          <h2>Technologies</h2>
          <p>
            SouqPro is a single-page React application backed entirely by Firebase — authentication, Firestore data, and file storage — with a Tailwind design system and full French / Arabic (RTL) localization.
          </p>
          <div className="souq-tech-groups">
            {techGroups.map((group) => (
              <div className="souq-tech-group" key={group.label}>
                <span className="souq-tech-label font-mono">{group.label}</span>
                <div className="souq-tech-chips">
                  {group.items.map((item) => (
                    <span className="souq-tech-chip font-mono" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="souq-card">
          <span className="section-index font-mono">02</span>
          <h2>Product Screenshots</h2>
          <p>
            A look at the product itself: the search-first landing, verified artisan directory, live request board, the points pricing model, and Firebase-backed authentication.
          </p>
          <div className="souq-screenshots">
            {screenshots.map((shot) => (
              <ScreenshotCard
                key={shot.title}
                {...shot}
                onClick={() =>
                  setActiveShot({
                    title: shot.title,
                    desc: shot.desc,
                    src: shot.src,
                    alt: `SouqPro ${shot.title} screenshot`
                  })
                }
              />
            ))}
          </div>
        </article>
      </div>

      <Lightbox image={activeShot} onClose={() => setActiveShot(null)} />

      <style>{`
        .souq-detail-page {
          position: relative;
          min-height: 100vh;
          padding-bottom: var(--space-10);
          background: var(--color-bg-primary);
          overflow: hidden;
          --souq-accent: var(--color-green);
        }

        .souq-grid-bg {
          position: fixed;
          inset: 64px 0 0;
          background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.65;
          pointer-events: none;
        }

        .souq-hero,
        .souq-sections {
          position: relative;
          z-index: 2;
        }

        .souq-hero {
          padding: var(--space-8) var(--container-pad) var(--space-7);
        }

        .souq-back {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--color-text-secondary);
          font-size: 13px;
          margin-bottom: var(--space-6);
        }

        .souq-back:hover {
          color: var(--souq-accent);
        }

        .souq-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
          color: var(--color-text-secondary);
          font-size: 12px;
        }

        .souq-tags span:not(.souq-square) {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: 6px 12px;
        }

        .souq-tags span:nth-child(2) {
          color: var(--color-orange);
          background: var(--color-orange-subtle);
        }

        .souq-square {
          width: 12px;
          height: 12px;
          background: var(--souq-accent);
          margin-right: var(--space-4);
        }

        .souq-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.65fr);
          gap: var(--space-8);
          align-items: end;
        }

        .souq-hero h1 {
          max-width: 980px;
          font-family: var(--font-body);
          font-size: clamp(52px, 7.5vw, 112px);
          font-weight: 800;
          letter-spacing: 0;
          line-height: 0.96;
          margin: var(--space-3) 0;
        }

        .souq-role {
          color: var(--souq-accent);
          font-size: 18px;
          margin-bottom: var(--space-4);
        }

        .souq-summary {
          max-width: 820px;
          color: var(--color-text-secondary);
          font-size: 21px;
          line-height: 1.65;
          font-style: italic;
        }

        .souq-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-top: var(--space-5);
        }

        .souq-demo-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          min-height: 42px;
          padding: 0 var(--space-5);
          border: 1px solid var(--souq-accent);
          background: var(--souq-accent);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
        }

        .souq-demo-link:hover {
          color: #fff;
          background: var(--color-black);
          border-color: var(--color-black);
        }

        .souq-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
        }

        .souq-metric {
          min-height: 116px;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-1);
          border-right: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .souq-metric:nth-child(2n) { border-right: none; }
        .souq-metric:nth-last-child(-n + 2) { border-bottom: none; }
        .souq-metric svg { color: var(--souq-accent); }
        .souq-metric strong { font-family: var(--font-body); font-size: 18px; }
        .souq-metric span { font-family: var(--font-mono); color: var(--color-text-secondary); font-size: 11px; }

        .souq-sections {
          display: grid;
          gap: var(--space-5);
          margin-top: var(--space-7);
        }

        .souq-card {
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
          padding: var(--space-6);
        }

        .section-index {
          color: var(--color-orange);
          font-size: 12px;
        }

        .souq-card h2 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 32px;
          margin: var(--space-2) 0 var(--space-3);
        }

        .souq-card p {
          color: var(--color-text-secondary);
          max-width: 860px;
          line-height: 1.7;
        }

        .souq-tech-groups {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-5);
          margin-top: var(--space-5);
        }

        .souq-tech-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .souq-tech-label {
          color: var(--souq-accent);
          font-size: 12px;
        }

        .souq-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .souq-tech-chip {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          color: var(--color-text-secondary);
          font-size: 12px;
          padding: 6px 12px;
          transition: border-color var(--motion-medium) var(--ease-standard),
                      color var(--motion-medium) var(--ease-standard);
        }

        .souq-tech-chip:hover {
          border-color: var(--souq-accent);
          color: var(--color-text-primary);
        }

        .souq-screenshots {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
          margin-top: var(--space-5);
        }

        .souq-shot {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: var(--space-3);
          transition: transform var(--motion-medium) var(--ease-standard), border-color var(--motion-medium) var(--ease-standard);
        }

        .souq-shot:hover {
          border-color: var(--souq-accent);
          transform: translateY(-4px);
        }

        .souq-shot-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #f4f6f4;
          border: 1px solid var(--color-border-subtle);
          overflow: hidden;
          margin-bottom: var(--space-3);
          padding: 0;
          cursor: zoom-in;
          display: block;
        }

        .souq-shot-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform var(--motion-medium) var(--ease-standard);
        }

        .souq-shot-frame:hover img {
          transform: scale(1.04);
        }

        .souq-shot-zoom {
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

        .souq-shot-frame:hover .souq-shot-zoom,
        .souq-shot-frame:focus-visible .souq-shot-zoom {
          opacity: 1;
        }

        .souq-shot h3 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 18px;
          margin-bottom: 4px;
        }

        .souq-shot p {
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 1050px) {
          .souq-hero-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .souq-hero {
            padding-top: var(--space-6);
          }
          .souq-hero-grid,
          .souq-metrics,
          .souq-tech-groups,
          .souq-screenshots {
            grid-template-columns: 1fr;
          }
          .souq-metric,
          .souq-metric:nth-child(2n),
          .souq-metric:nth-last-child(-n + 2) {
            border-right: none;
            border-bottom: 1px solid var(--color-border-subtle);
          }
          .souq-metric:last-child {
            border-bottom: none;
          }
          .souq-card {
            padding: var(--space-4);
          }
        }
      `}</style>
    </section>
  );
};

const Metric: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="souq-metric">
    {icon}
    <strong>{label}</strong>
    <span>{value}</span>
  </div>
);

const ScreenshotCard: React.FC<{ title: string; desc: string; src: string; onClick: () => void }> = ({ title, desc, src, onClick }) => (
  <figure className="souq-shot">
    <button type="button" className="souq-shot-frame" onClick={onClick} aria-label={`Expand ${title} screenshot`}>
      <img src={src} alt={`SouqPro ${title} screenshot`} loading="lazy" />
      <span className="souq-shot-zoom">
        <Maximize2 size={16} /> View
      </span>
    </button>
    <h3>{title}</h3>
    <p>{desc}</p>
  </figure>
);
