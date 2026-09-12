import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Maximize2 } from 'lucide-react';
import { Lightbox, type LightboxImage } from './Lightbox';
import { useI18n, type Lang } from '../i18n';

export interface CaseStudyMetric {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export interface CaseStudyTechGroup {
  label: string;
  items: string[];
}

export interface CaseStudyHighlight {
  title: string;
  body: string;
}

export interface CaseStudyScreenshot {
  title: string;
  desc: string;
  src: string;
  wide?: boolean;
}

/**
 * The translatable subset of a case study. Non-text data (icons, image src,
 * tech chips, accent, links) is language-invariant and lives on CaseStudyData.
 * Arrays are index-aligned with their English counterparts.
 */
export interface CaseStudyTranslation {
  subtitle?: string;
  summary?: string;
  liveUrlLabel?: string;
  whatItIsTitle?: string;
  whatItIs?: string[];
  techIntro?: string;
  highlightsIntro?: string;
  /** same order/length as base highlights */
  highlights?: CaseStudyHighlight[];
  /** same order/length as base metrics */
  metrics?: { label?: string; value?: string }[];
  screenshotsIntro?: string;
  /** same order/length as base screenshots */
  screenshots?: { title?: string; desc?: string }[];
}

export interface CaseStudyData {
  /** used in the `// project.xxx` kicker and screenshot alt text */
  slug: string;
  /** e.g. 'var(--color-purple)' */
  accentVar: string;
  year: string;
  /** hero tag chips (year is rendered separately) */
  tags: string[];
  title: string;
  /** role / one-line subtitle under the title */
  subtitle: string;
  /** italic summary sentence */
  summary: string;
  liveUrl?: { href: string; label: string };
  metrics: CaseStudyMetric[];
  /** one or more paragraphs for the "What It Is" section */
  whatItIs: string[];
  whatItIsTitle?: string;
  tech: { intro: string; groups: CaseStudyTechGroup[] };
  highlights?: { intro?: string; items: CaseStudyHighlight[] };
  screenshots: { intro: string; items: CaseStudyScreenshot[] };
  /** per-language overrides for the text fields above */
  translations?: Partial<Record<Lang, CaseStudyTranslation>>;
}

const handleBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  window.history.pushState({}, '', '/#projects');
  window.dispatchEvent(new Event('portfolio:navigation'));
  window.setTimeout(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, 0);
};

export const ProjectCaseStudy: React.FC<{ data: CaseStudyData }> = ({ data }) => {
  const [activeShot, setActiveShot] = useState<LightboxImage | null>(null);
  const { t, lang } = useI18n();
  const tr = data.translations?.[lang];

  // Resolve the translatable text: fall back to the English base whenever a
  // translation is missing, so a partial translation never blanks a field.
  const subtitle = tr?.subtitle ?? data.subtitle;
  const summary = tr?.summary ?? data.summary;
  const liveUrlLabel = tr?.liveUrlLabel ?? data.liveUrl?.label;
  const whatItIsTitle = tr?.whatItIsTitle ?? data.whatItIsTitle ?? t.caseStudy.whatItIs;
  const whatItIs = tr?.whatItIs ?? data.whatItIs;
  const techIntro = tr?.techIntro ?? data.tech.intro;
  const screenshotsIntro = tr?.screenshotsIntro ?? data.screenshots.intro;

  const metrics = data.metrics.map((m, i) => ({
    ...m,
    label: tr?.metrics?.[i]?.label ?? m.label,
    value: tr?.metrics?.[i]?.value ?? m.value
  }));

  const highlights = data.highlights
    ? {
        intro: tr?.highlightsIntro ?? data.highlights.intro,
        items: data.highlights.items.map((h, i) => ({
          title: tr?.highlights?.[i]?.title ?? h.title,
          body: tr?.highlights?.[i]?.body ?? h.body
        }))
      }
    : undefined;

  const screenshots = data.screenshots.items.map((s, i) => ({
    ...s,
    title: tr?.screenshots?.[i]?.title ?? s.title,
    desc: tr?.screenshots?.[i]?.desc ?? s.desc
  }));

  let sectionIndex = 0;
  const nextIndex = () => String(sectionIndex++).padStart(2, '0');

  return (
    <section
      className="cs-page"
      // Render RTL only when this case study is actually translated for the
      // current language; still-English pages stay LTR under an Arabic UI.
      dir={lang === 'ar' && tr ? 'rtl' : 'ltr'}
      style={{ ['--cs-accent' as string]: data.accentVar }}
    >
      <div className="cs-grid-bg" aria-hidden="true" />

      <div className="container cs-hero">
        <a href="/#projects" className="cs-back font-mono" onClick={handleBack}>
          <ArrowLeft size={14} /> {t.caseStudy.allProjects}
        </a>

        <div className="cs-tags font-mono">
          <span className="cs-square" />
          <span>{data.year}</span>
          {data.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="cs-hero-grid">
          <div>
            <div className="section-kicker font-mono">// project.{data.slug}</div>
            <h1>{data.title}</h1>
            <p className="cs-role font-mono">{subtitle}</p>
            <p className="cs-summary">{summary}</p>
            {data.liveUrl && (
              <div className="cs-actions">
                <a
                  className="cs-demo-link font-mono"
                  href={data.liveUrl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {liveUrlLabel} <ArrowUpRight size={14} />
                </a>
              </div>
            )}
          </div>

          <div className="cs-metrics">
            {metrics.map((metric) => (
              <div className="cs-metric" key={metric.label}>
                {metric.icon}
                <strong>{metric.label}</strong>
                <span>{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container cs-sections">
        <article className="cs-card">
          <span className="section-index font-mono">{nextIndex()}</span>
          <h2>{whatItIsTitle}</h2>
          {whatItIs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        <article className="cs-card">
          <span className="section-index font-mono">{nextIndex()}</span>
          <h2>{t.caseStudy.technologies}</h2>
          <p>{techIntro}</p>
          <div className="cs-tech-groups">
            {data.tech.groups.map((group) => (
              <div className="cs-tech-group" key={group.label}>
                <span className="cs-tech-label font-mono">{group.label}</span>
                <div className="cs-tech-chips">
                  {group.items.map((item) => (
                    <span className="cs-tech-chip font-mono" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        {highlights && (
          <article className="cs-card">
            <span className="section-index font-mono">{nextIndex()}</span>
            <h2>{t.caseStudy.highlights}</h2>
            {highlights.intro && <p>{highlights.intro}</p>}
            <div className="cs-highlights">
              {highlights.items.map((item) => (
                <div className="cs-highlight" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </article>
        )}

        <article className="cs-card">
          <span className="section-index font-mono">{nextIndex()}</span>
          <h2>{t.caseStudy.screenshots}</h2>
          <p>{screenshotsIntro}</p>
          <div className="cs-screenshots">
            {screenshots.map((shot) => (
              <figure className={`cs-shot ${shot.wide ? 'cs-shot--wide' : ''}`} key={shot.title}>
                <button
                  type="button"
                  className="cs-shot-frame"
                  onClick={() =>
                    setActiveShot({
                      title: shot.title,
                      desc: shot.desc,
                      src: shot.src,
                      alt: `${data.title} — ${shot.title} screenshot`
                    })
                  }
                  aria-label={`Expand ${shot.title} screenshot`}
                >
                  <img src={shot.src} alt={`${data.title} — ${shot.title} screenshot`} loading="lazy" />
                  <span className="cs-shot-zoom">
                    <Maximize2 size={16} /> {t.caseStudy.viewShot}
                  </span>
                </button>
                <h3>{shot.title}</h3>
                <p>{shot.desc}</p>
              </figure>
            ))}
          </div>
        </article>
      </div>

      <Lightbox image={activeShot} onClose={() => setActiveShot(null)} />

      <style>{`
        .cs-page {
          position: relative;
          min-height: 100vh;
          padding-bottom: var(--space-10);
          background: var(--color-bg-primary);
          overflow: hidden;
        }

        .cs-grid-bg {
          position: fixed;
          inset: 64px 0 0;
          background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.65;
          pointer-events: none;
        }

        .cs-hero,
        .cs-sections {
          position: relative;
          z-index: 2;
        }

        .cs-hero {
          padding: var(--space-8) var(--container-pad) var(--space-7);
        }

        .cs-back {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--color-text-secondary);
          font-size: 13px;
          margin-bottom: var(--space-6);
        }

        .cs-back:hover {
          color: var(--cs-accent);
        }

        .cs-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
          color: var(--color-text-secondary);
          font-size: 12px;
        }

        .cs-tags span:not(.cs-square) {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: 6px 12px;
        }

        .cs-tags span:nth-child(2) {
          color: var(--color-orange);
          background: var(--color-orange-subtle);
        }

        .cs-square {
          width: 12px;
          height: 12px;
          background: var(--cs-accent);
          margin-right: var(--space-4);
        }

        /* RTL mirroring — only when this page opts into RTL (translated) */
        .cs-page[dir="rtl"] .cs-square {
          margin-right: 0;
          margin-left: var(--space-4);
        }

        .cs-page[dir="rtl"] .cs-highlight {
          border-left: 1px solid var(--color-border);
          border-right: 2px solid var(--cs-accent);
        }

        .cs-page[dir="rtl"] .cs-metric {
          border-right: none;
          border-left: 1px solid var(--color-border-subtle);
        }

        .cs-page[dir="rtl"] .cs-metric:nth-child(2n) {
          border-left: none;
        }

        .cs-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.65fr);
          gap: var(--space-8);
          align-items: end;
        }

        .cs-hero h1 {
          max-width: 980px;
          font-family: var(--font-body);
          font-size: clamp(52px, 7.5vw, 112px);
          font-weight: 800;
          letter-spacing: 0;
          line-height: 0.96;
          margin: var(--space-3) 0;
        }

        .cs-role {
          color: var(--cs-accent);
          font-size: 18px;
          margin-bottom: var(--space-4);
        }

        .cs-summary {
          max-width: 820px;
          color: var(--color-text-secondary);
          font-size: 21px;
          line-height: 1.65;
          font-style: italic;
        }

        .cs-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-top: var(--space-5);
        }

        .cs-demo-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          min-height: 42px;
          padding: 0 var(--space-5);
          border: 1px solid var(--cs-accent);
          background: var(--cs-accent);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
        }

        .cs-demo-link:hover {
          color: #fff;
          background: var(--color-black);
          border-color: var(--color-black);
        }

        .cs-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
        }

        .cs-metric {
          min-height: 116px;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-1);
          border-right: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .cs-metric:nth-child(2n) { border-right: none; }
        .cs-metric:nth-last-child(-n + 2) { border-bottom: none; }
        .cs-metric svg { color: var(--cs-accent); }
        .cs-metric strong { font-family: var(--font-body); font-size: 18px; }
        .cs-metric span { font-family: var(--font-mono); color: var(--color-text-secondary); font-size: 11px; }

        .cs-sections {
          display: grid;
          gap: var(--space-5);
          margin-top: var(--space-7);
        }

        .cs-card {
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
          padding: var(--space-6);
        }

        .section-index {
          color: var(--color-orange);
          font-size: 12px;
        }

        .cs-card h2 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 32px;
          margin: var(--space-2) 0 var(--space-3);
        }

        .cs-card > p {
          color: var(--color-text-secondary);
          max-width: 860px;
          line-height: 1.7;
        }

        .cs-card > p + p {
          margin-top: var(--space-3);
        }

        .cs-tech-groups {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-5);
          margin-top: var(--space-5);
        }

        .cs-tech-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .cs-tech-label {
          color: var(--cs-accent);
          font-size: 12px;
        }

        .cs-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .cs-tech-chip {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          color: var(--color-text-secondary);
          font-size: 12px;
          padding: 6px 12px;
          transition: border-color var(--motion-medium) var(--ease-standard),
                      color var(--motion-medium) var(--ease-standard);
        }

        .cs-tech-chip:hover {
          border-color: var(--cs-accent);
          color: var(--color-text-primary);
        }

        .cs-highlights {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
          margin-top: var(--space-5);
        }

        .cs-highlight {
          border: 1px solid var(--color-border);
          border-left: 2px solid var(--cs-accent);
          background: var(--color-bg-tertiary);
          padding: var(--space-4);
        }

        .cs-highlight h3 {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 17px;
          margin-bottom: 6px;
        }

        .cs-highlight p {
          color: var(--color-text-secondary);
          font-size: 14px;
          line-height: 1.6;
        }

        .cs-screenshots {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
          margin-top: var(--space-5);
        }

        .cs-shot {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: var(--space-3);
          transition: transform var(--motion-medium) var(--ease-standard), border-color var(--motion-medium) var(--ease-standard);
        }

        .cs-shot--wide {
          grid-column: 1 / -1;
        }

        .cs-shot:hover {
          border-color: var(--cs-accent);
          transform: translateY(-4px);
        }

        .cs-shot-frame {
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

        .cs-shot-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform var(--motion-medium) var(--ease-standard);
        }

        .cs-shot-frame:hover img {
          transform: scale(1.04);
        }

        .cs-shot-zoom {
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

        .cs-shot-frame:hover .cs-shot-zoom,
        .cs-shot-frame:focus-visible .cs-shot-zoom {
          opacity: 1;
        }

        .cs-shot h3 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 18px;
          margin-bottom: 4px;
        }

        .cs-shot p {
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-secondary);
        }

        @media (max-width: 1050px) {
          .cs-hero-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .cs-hero {
            padding-top: var(--space-6);
          }
          .cs-hero-grid,
          .cs-metrics,
          .cs-tech-groups,
          .cs-highlights,
          .cs-screenshots {
            grid-template-columns: 1fr;
          }
          .cs-metric,
          .cs-metric:nth-child(2n),
          .cs-metric:nth-last-child(-n + 2) {
            border-right: none;
            border-bottom: 1px solid var(--color-border-subtle);
          }
          .cs-metric:last-child {
            border-bottom: none;
          }
          .cs-card {
            padding: var(--space-4);
          }
        }
      `}</style>
    </section>
  );
};
