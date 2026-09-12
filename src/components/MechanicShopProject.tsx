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
import { useI18n, type Lang } from '../i18n';

const screenshotSrcs = [
  '/mechanicshop/manager-dashboard.png',
  '/mechanicshop/manager-workorders.png',
  '/mechanicshop/manager-schedules.png',
  '/mechanicshop/manager-services.png',
  '/mechanicshop/labor-dashboard.png',
  '/mechanicshop/labor-workorders.png'
];

const metricIcons = [
  <ShieldCheck size={18} />,
  <GitBranch size={18} />,
  <Braces size={18} />,
  <Box size={18} />
];

interface MechanicContent {
  tag: string;
  role: string;
  summary: string;
  demoLabel: string;
  metrics: { label: string; value: string }[];
  whatItIs: string;
  techIntro: string;
  shotsIntro: string;
  shots: { title: string; desc: string }[];
}

const content: Record<Lang, MechanicContent> = {
  en: {
    tag: 'Workshop SaaS',
    role: 'Full-Stack Workshop Management Platform',
    summary:
      'A role-based web application for auto repair shop operations: customers, vehicles, repair services, labor assignments, daily schedules, work orders, invoices, PDF export, and performance dashboards.',
    demoLabel: 'Open local app',
    metrics: [
      { label: 'Security', value: 'JWT + refresh tokens' },
      { label: 'Application', value: 'CQRS + MediatR' },
      { label: 'Validation', value: 'FluentValidation' },
      { label: 'Operations', value: 'Docker + Seq' }
    ],
    whatItIs:
      'MechanicShop Workshop is designed around the real operational flow of a repair shop. Managers can create customers, vehicles, service tasks, schedules, and invoices, while labor users can view assigned work and follow work-order progress.',
    techIntro:
      'MechanicShop pairs a Blazor WebAssembly front end with an ASP.NET Core back end built on CQRS and MediatR, with real-time updates over SignalR and a containerised runtime.',
    shotsIntro:
      'A look at the product itself: dashboards, status-heavy work-order tables, daily schedule planning, service catalogs, and role-specific technician views.',
    shots: [
      { title: 'Manager dashboard', desc: 'Operational KPIs for orders, revenue, costs, profit, completion rate, and cancellation rate.' },
      { title: 'Manager work orders', desc: 'Filtered work-order table with vehicle, customer, labor, repair tasks, status, and time slots.' },
      { title: 'Daily schedule', desc: 'Workshop spot schedule with time slots and labor filtering for planning the repair day.' },
      { title: 'Repair services', desc: 'Repair task catalog with labor/parts pricing used by work orders and invoices.' },
      { title: 'Labor dashboard', desc: 'Labor role view with the same platform shaped around assigned work and progress.' },
      { title: 'Labor work orders', desc: 'Assigned work-order tracking for technicians without exposing manager-only operations.' }
    ]
  },
  fr: {
    tag: 'SaaS d’atelier',
    role: 'Plateforme full-stack de gestion d’atelier',
    summary:
      'Une application web basée sur les rôles pour les opérations d’un garage automobile : clients, véhicules, services de réparation, affectations de main-d’œuvre, plannings quotidiens, ordres de travail, factures, export PDF et tableaux de bord de performance.',
    demoLabel: 'Ouvrir l’app locale',
    metrics: [
      { label: 'Sécurité', value: 'JWT + refresh tokens' },
      { label: 'Application', value: 'CQRS + MediatR' },
      { label: 'Validation', value: 'FluentValidation' },
      { label: 'Opérations', value: 'Docker + Seq' }
    ],
    whatItIs:
      'MechanicShop Workshop est pensé autour du flux opérationnel réel d’un garage. Les managers peuvent créer des clients, des véhicules, des tâches de service, des plannings et des factures, tandis que les techniciens consultent le travail qui leur est assigné et suivent l’avancement des ordres de travail.',
    techIntro:
      'MechanicShop associe un front end Blazor WebAssembly à un back end ASP.NET Core bâti sur CQRS et MediatR, avec des mises à jour en temps réel via SignalR et une exécution conteneurisée.',
    shotsIntro:
      'Un aperçu du produit lui-même : tableaux de bord, tables d’ordres de travail riches en statuts, planification quotidienne, catalogues de services et vues techniciens spécifiques aux rôles.',
    shots: [
      { title: 'Tableau de bord manager', desc: 'KPIs opérationnels : commandes, chiffre d’affaires, coûts, profit, taux d’achèvement et taux d’annulation.' },
      { title: 'Ordres de travail (manager)', desc: 'Table filtrée des ordres de travail avec véhicule, client, main-d’œuvre, tâches de réparation, statut et créneaux horaires.' },
      { title: 'Planning quotidien', desc: 'Planning des postes de l’atelier avec créneaux horaires et filtrage de la main-d’œuvre pour organiser la journée.' },
      { title: 'Services de réparation', desc: 'Catalogue des tâches de réparation avec tarification main-d’œuvre/pièces utilisée par les ordres de travail et les factures.' },
      { title: 'Tableau de bord technicien', desc: 'Vue rôle technicien : la même plateforme centrée sur le travail assigné et son avancement.' },
      { title: 'Ordres de travail (technicien)', desc: 'Suivi des ordres de travail assignés aux techniciens sans exposer les opérations réservées aux managers.' }
    ]
  },
  ar: {
    tag: 'منصة ورشة SaaS',
    role: 'منصة متكاملة لإدارة الورشة',
    summary:
      'تطبيق ويب قائم على الأدوار لعمليات ورشة تصليح السيارات: العملاء، والمركبات، وخدمات التصليح، وإسناد العمالة، والجداول اليومية، وأوامر العمل، والفواتير، وتصدير PDF، ولوحات الأداء.',
    demoLabel: 'فتح التطبيق المحلي',
    metrics: [
      { label: 'الأمان', value: 'JWT + refresh tokens' },
      { label: 'التطبيق', value: 'CQRS + MediatR' },
      { label: 'التحقّق', value: 'FluentValidation' },
      { label: 'العمليات', value: 'Docker + Seq' }
    ],
    whatItIs:
      'صُمِّم MechanicShop Workshop حول سير العمل الفعلي لورشة تصليح. يستطيع المديرون إنشاء العملاء والمركبات ومهام الخدمة والجداول والفواتير، بينما يطّلع الفنّيون على العمل المُسنَد إليهم ويتابعون تقدّم أوامر العمل.',
    techIntro:
      'يجمع MechanicShop بين واجهة أمامية بـ Blazor WebAssembly وخلفية بـ ASP.NET Core مبنية على CQRS وMediatR، مع تحديثات فورية عبر SignalR وتشغيل داخل حاويات.',
    shotsIntro:
      'نظرة على المنتج نفسه: لوحات التحكّم، وجداول أوامر العمل الغنية بالحالات، وتخطيط اليوم، وكتالوجات الخدمات، وواجهات الفنّيين الخاصة بالأدوار.',
    shots: [
      { title: 'لوحة تحكّم المدير', desc: 'مؤشّرات تشغيلية: الطلبات، والإيرادات، والتكاليف، والأرباح، ونسبة الإنجاز، ونسبة الإلغاء.' },
      { title: 'أوامر عمل المدير', desc: 'جدول أوامر عمل مُصفّى مع المركبة والعميل والعمالة ومهام التصليح والحالة والفترات الزمنية.' },
      { title: 'الجدول اليومي', desc: 'جدول مواقع الورشة مع الفترات الزمنية وتصفية العمالة لتنظيم يوم التصليح.' },
      { title: 'خدمات التصليح', desc: 'كتالوج مهام التصليح مع تسعير العمالة/القطع المستخدَم في أوامر العمل والفواتير.' },
      { title: 'لوحة تحكّم الفنّي', desc: 'واجهة دور الفنّي: المنصة نفسها مُهيّأة حول العمل المُسنَد وتقدّمه.' },
      { title: 'أوامر عمل الفنّي', desc: 'تتبّع أوامر العمل المُسنَدة للفنّيين دون كشف العمليات الخاصة بالمديرين.' }
    ]
  }
};

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
    <section className="mechanic-detail-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mechanic-grid-bg" aria-hidden="true" />

      <div className="container mechanic-hero">
        <a href="/#projects" className="mechanic-back font-mono" onClick={handleBack}>
          <ArrowLeft size={14} /> {t.caseStudy.allProjects}
        </a>

        <div className="mechanic-tags font-mono">
          <span className="mechanic-square" />
          <span>2026</span>
          <span>ASP.NET Core</span>
          <span>Blazor WebAssembly</span>
          <span>{c.tag}</span>
        </div>

        <div className="mechanic-hero-grid">
          <div>
            <div className="section-kicker font-mono">// project.mechanicshop</div>
            <h1>MechanicShop Workshop</h1>
            <p className="mechanic-role font-mono">{c.role}</p>
            <p className="mechanic-summary">{c.summary}</p>
            <div className="mechanic-actions">
              <a
                className="mechanic-demo-link font-mono"
                href="http://localhost:5001/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.demoLabel} <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="mechanic-metrics">
            {c.metrics.map((m, i) => (
              <Metric key={m.label} icon={metricIcons[i]} label={m.label} value={m.value} />
            ))}
          </div>
        </div>
      </div>

      <div className="container mechanic-sections">
        <article className="mechanic-card mechanic-card--wide">
          <span className="section-index font-mono">00</span>
          <h2>{t.caseStudy.whatItIs}</h2>
          <p>{c.whatItIs}</p>
        </article>

        <article className="mechanic-card">
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

        <article className="mechanic-card mechanic-card--screens">
          <span className="section-index font-mono">02</span>
          <h2>{t.caseStudy.screenshots}</h2>
          <p>{c.shotsIntro}</p>
          <div className="mechanic-screenshots">
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

        .mechanic-detail-page[dir="rtl"] .mechanic-square {
          margin-right: 0;
          margin-left: var(--space-4);
        }

        .mechanic-detail-page[dir="rtl"] .mechanic-metric {
          border-right: none;
          border-left: 1px solid var(--color-border-subtle);
        }

        .mechanic-detail-page[dir="rtl"] .mechanic-metric:nth-child(2n) {
          border-left: none;
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

const ScreenshotCard: React.FC<{ title: string; desc: string; src: string; onClick: () => void }> = ({ title, desc, src, onClick }) => {
  const { t } = useI18n();
  return (
    <figure className="mechanic-shot">
      <button type="button" className="mechanic-shot-frame" onClick={onClick} aria-label={`Expand ${title} screenshot`}>
        <img src={src} alt={`MechanicShop ${title} screenshot`} loading="lazy" />
        <span className="mechanic-shot-zoom">
          <Maximize2 size={16} /> {t.caseStudy.viewShot}
        </span>
      </button>
      <h3>{title}</h3>
      <p>{desc}</p>
    </figure>
  );
};
