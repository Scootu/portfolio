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
import { useI18n, type Lang } from '../i18n';

const screenshotSrcs = [
  '/demai/patient-portal.webp',
  '/demai/appointments-calendar.webp',
  '/demai/prescription-builder.webp',
  '/demai/stock-management.webp',
  '/demai/medication-history.webp'
];

const metricIcons = [
  <ShieldCheck size={18} />,
  <GitBranch size={18} />,
  <CheckCircle2 size={18} />,
  <FileCode2 size={18} />
];

interface DemContent {
  tag: string;
  role: string;
  summary: string;
  demoLabel: string;
  metrics: { label: string; value: string }[];
  techIntro: string;
  shotsIntro: string;
  shots: { title: string; desc: string }[];
}

const content: Record<Lang, DemContent> = {
  en: {
    tag: 'Healthcare SaaS',
    role: 'Full-Stack Healthcare Platform',
    summary:
      'A medical ecosystem connecting patients, physicians, and pharmacies — appointment scheduling, prescriptions, medication history, and pharmacy stock management in one platform.',
    demoLabel: 'Open live demo',
    metrics: [
      { label: 'Security', value: 'JWT + role policies' },
      { label: 'Application', value: 'CQRS handlers' },
      { label: 'Outcome Flow', value: 'Result Pattern' },
      { label: 'Validation', value: 'FluentValidation' }
    ],
    techIntro:
      'DEM AI pairs a React front end with an ASP.NET Core back end organised around Clean Architecture, keeping request handling, validation, and security concerns cleanly separated.',
    shotsIntro:
      'A look at the product itself: patient access, doctor scheduling, prescriptions, medication history, and pharmacist stock management.',
    shots: [
      { title: 'Patient portal', desc: 'Verified patient access entry point through NIN lookup.' },
      { title: 'Doctor appointments', desc: 'Calendar planning with daily appointment limits and selected-day details.' },
      { title: 'Prescription builder', desc: 'Medication list, diagnosis text, and generated prescription preview.' },
      { title: 'Pharmacy stock', desc: 'Stock and family-drug management for pharmacist workflows.' },
      { title: 'Medication history', desc: 'Patient medication history table with doctor, enterprise, and diagnosis labels.' }
    ]
  },
  fr: {
    tag: 'SaaS de santé',
    role: 'Plateforme de santé full-stack',
    summary:
      'Un écosystème médical qui relie patients, médecins et pharmacies — prise de rendez-vous, ordonnances, historique des médicaments et gestion du stock de pharmacie sur une seule plateforme.',
    demoLabel: 'Ouvrir la démo',
    metrics: [
      { label: 'Sécurité', value: 'JWT + politiques de rôles' },
      { label: 'Application', value: 'Handlers CQRS' },
      { label: 'Flux de résultat', value: 'Result Pattern' },
      { label: 'Validation', value: 'FluentValidation' }
    ],
    techIntro:
      'DEM AI associe un front end React à un back end ASP.NET Core organisé selon la Clean Architecture, en gardant la gestion des requêtes, la validation et la sécurité proprement séparées.',
    shotsIntro:
      'Un aperçu du produit lui-même : accès patient, planification médecin, ordonnances, historique des médicaments et gestion du stock côté pharmacien.',
    shots: [
      { title: 'Portail patient', desc: 'Point d’accès patient vérifié via une recherche par NIN.' },
      { title: 'Rendez-vous médecin', desc: 'Planification par calendrier avec limites quotidiennes de rendez-vous et détails du jour sélectionné.' },
      { title: 'Générateur d’ordonnances', desc: 'Liste de médicaments, texte de diagnostic et aperçu de l’ordonnance générée.' },
      { title: 'Stock de pharmacie', desc: 'Gestion du stock et des familles de médicaments pour les flux du pharmacien.' },
      { title: 'Historique des médicaments', desc: 'Tableau d’historique des médicaments du patient avec médecin, établissement et diagnostic.' }
    ]
  },
  ar: {
    tag: 'منصة صحّية SaaS',
    role: 'منصة رعاية صحّية متكاملة',
    summary:
      'منظومة طبية تربط المرضى والأطبّاء والصيدليات — حجز المواعيد، والوصفات الطبية، وتاريخ الأدوية، وإدارة مخزون الصيدلية في منصّة واحدة.',
    demoLabel: 'فتح العرض التجريبي',
    metrics: [
      { label: 'الأمان', value: 'JWT + سياسات الأدوار' },
      { label: 'التطبيق', value: 'معالجات CQRS' },
      { label: 'مسار النتيجة', value: 'Result Pattern' },
      { label: 'التحقّق', value: 'FluentValidation' }
    ],
    techIntro:
      'يجمع DEM AI بين واجهة أمامية بـ React وخلفية بـ ASP.NET Core مبنية وفق Clean Architecture، مع فصل واضح بين معالجة الطلبات والتحقّق والأمان.',
    shotsIntro:
      'نظرة على المنتج نفسه: وصول المريض، وجدولة الطبيب، والوصفات، وتاريخ الأدوية، وإدارة المخزون لدى الصيدلي.',
    shots: [
      { title: 'بوابة المريض', desc: 'نقطة دخول مريض مُوثَّق عبر البحث برقم NIN.' },
      { title: 'مواعيد الطبيب', desc: 'تخطيط بالتقويم مع حدود يومية للمواعيد وتفاصيل اليوم المحدَّد.' },
      { title: 'مُنشئ الوصفات', desc: 'قائمة أدوية، ونصّ تشخيص، ومعاينة للوصفة المولَّدة.' },
      { title: 'مخزون الصيدلية', desc: 'إدارة المخزون وعائلات الأدوية لسير عمل الصيدلي.' },
      { title: 'تاريخ الأدوية', desc: 'جدول تاريخ أدوية المريض مع الطبيب والمؤسسة والتشخيص.' }
    ]
  }
};

const techGroups = [
  {
    label: '// frontend',
    items: ['React', 'REST API Client']
  },
  {
    label: '// backend',
    items: ['ASP.NET Core', 'C# / .NET', 'REST API']
  },
  {
    label: '// architecture',
    items: ['Clean Architecture', 'CQRS', 'Result Pattern']
  },
  {
    label: '// security & validation',
    items: ['JWT', 'Role-based Policies', 'FluentValidation']
  }
];

export const DemAiProject: React.FC = () => {
  const [activeShot, setActiveShot] = useState<LightboxImage | null>(null);
  const { t, lang } = useI18n();
  const c = content[lang];

  const handleBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState({}, '', '/#projects');
    window.dispatchEvent(new Event('portfolio:navigation'));
    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <section className="project-detail-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="detail-grid-bg" aria-hidden="true" />

      <div className="container detail-hero">
        <a href="/#projects" className="detail-back font-mono" onClick={handleBack}>
          <ArrowLeft size={14} /> {t.caseStudy.allProjects}
        </a>

        <div className="detail-tags font-mono">
          <span className="detail-square" />
          <span>2026</span>
          <span>ASP.NET Core</span>
          <span>{c.tag}</span>
        </div>

        <div className="detail-hero-grid">
          <div>
            <div className="section-kicker font-mono">// project.dem-ai</div>
            <h1>DEM AI</h1>
            <p className="detail-role font-mono">{c.role}</p>
            <p className="detail-summary">{c.summary}</p>
            <div className="detail-actions">
              <a
                className="detail-demo-link font-mono"
                href="https://ice-machine.github.io/HealthCare/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.demoLabel} <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="detail-metrics">
            {c.metrics.map((m, i) => (
              <Metric key={m.label} icon={metricIcons[i]} label={m.label} value={m.value} />
            ))}
          </div>
        </div>
      </div>

      <div className="container detail-sections">
        <article className="detail-section-card">
          <span className="section-index font-mono">01</span>
          <h2>{t.caseStudy.technologies}</h2>
          <p>{c.techIntro}</p>
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

        <article className="detail-section-card screenshot-card">
          <span className="section-index font-mono">02</span>
          <h2>{t.caseStudy.screenshots}</h2>
          <p>{c.shotsIntro}</p>
          <div className="screenshot-grid">
            {c.shots.map((shot, i) => (
              <ScreenshotCard
                key={shot.title}
                title={shot.title}
                desc={shot.desc}
                src={screenshotSrcs[i]}
                onClick={() =>
                  setActiveShot({
                    title: shot.title,
                    desc: shot.desc,
                    src: screenshotSrcs[i],
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

        .project-detail-page[dir="rtl"] .detail-square {
          margin-right: 0;
          margin-left: var(--space-4);
        }

        .project-detail-page[dir="rtl"] .metric-box {
          border-right: none;
          border-left: 1px solid var(--color-border-subtle);
        }

        .project-detail-page[dir="rtl"] .metric-box:nth-child(2n) {
          border-left: none;
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
          .tech-groups,
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

const ScreenshotCard: React.FC<{ title: string; desc: string; src: string; onClick: () => void }> = ({ title, desc, src, onClick }) => {
  const { t } = useI18n();
  return (
    <figure className="screenshot-card-item">
      <button type="button" className="screenshot-frame" onClick={onClick} aria-label={`Expand ${title} screenshot`}>
        <img src={src} alt={`DEM AI ${title} screenshot`} loading="lazy" />
        <span className="screenshot-zoom">
          <Maximize2 size={16} /> {t.caseStudy.viewShot}
        </span>
      </button>
      <h3>{title}</h3>
      <p>{desc}</p>
    </figure>
  );
};
