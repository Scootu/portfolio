import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { value: 3, suffix: '+', label: 'full-stack systems', detail: 'healthcare, workflow, portfolio' },
    { value: 8, suffix: '+', label: 'core technologies', detail: '.NET, React, SQL, Docker' },
    { value: 90, suffix: '%', label: 'backend focus', detail: 'architecture and data flow' },
    { value: 2026, suffix: '', label: 'computer science', detail: 'B.Sc. graduation track' }
  ];

  return (
    <section className="section-box about-section" id="about">
      <div className="about-wide-container">
        <div className="about-panel">
          <span className="about-number">03</span>
          <span className="about-orbit" aria-hidden="true" />
          <div className="about-copy">
            <div className="section-kicker font-mono">// section.about</div>
            <h2 className="section-title section-title--large">Who I Am</h2>
            <p>
              I build full-stack systems with clear backend rules, practical database design, and React interfaces that stay fast enough to feel calm. I like turning messy product logic into code your team can actually reason about.
            </p>
            <a className="about-link font-mono" href="#contact">More about me <ArrowUpRight size={14} /></a>
          </div>

          <div className="about-stats">
            {stats.map((stat) => (
              <CountUpStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          padding: var(--space-9) 0;
        }

        .about-wide-container {
          width: min(100% - calc(var(--container-pad) * 2), 1400px);
          margin: 0 auto;
        }

        .about-panel {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(420px, 0.9fr);
          gap: clamp(48px, 7vw, 120px);
          align-items: center;
          border: 1px solid var(--color-border);
          padding: clamp(48px, 6vw, 86px);
          min-height: 438px;
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
        }

        .about-number {
          position: absolute;
          top: -44px;
          left: 0;
          font-family: var(--font-body);
          font-size: clamp(100px, 9vw, 146px);
          font-weight: 700;
          line-height: 1;
          color: var(--color-text-tertiary);
          opacity: 0.22;
        }

        .about-orbit {
          position: absolute;
          top: 18px;
          left: 50%;
          width: 34px;
          height: 34px;
          border: 1px solid var(--color-text-primary);
          border-radius: 50%;
          transform: translateX(-50%);
          animation: about-orbit-rotate 7s linear infinite;
        }

        .about-orbit::after {
          content: "";
          position: absolute;
          width: 7px;
          height: 7px;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          background: var(--color-text-primary);
          transform: translate(-50%, -50%);
        }

        .about-orbit::before {
          content: "";
          position: absolute;
          width: 6px;
          height: 6px;
          left: 50%;
          top: -3px;
          border-radius: 50%;
          background: var(--color-blue);
          box-shadow: 0 0 12px var(--color-blue);
          transform: translateX(-50%);
        }

        .about-copy {
          position: relative;
          z-index: 2;
        }

        .about-copy p {
          margin: var(--space-7) 0 var(--space-6);
          color: var(--color-text-primary);
          font-size: clamp(28px, 2.5vw, 42px);
          line-height: 1.32;
          max-width: 780px;
        }

        .about-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-5);
          border: 1px solid var(--color-border-strong);
          color: var(--color-text-primary);
          font-size: 13px;
        }

        .about-link span {
          position: relative;
          z-index: 2;
        }

        .about-link:hover {
          color: var(--color-text-primary);
        }

        .about-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid var(--color-border);
          min-height: 238px;
        }

        .about-stat {
          min-height: 118px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: var(--space-4);
          text-align: center;
          border-right: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .about-stat:nth-child(2n) {
          border-right: none;
        }

        .about-stat:nth-last-child(-n + 2) {
          border-bottom: none;
        }

        .about-stat strong {
          color: var(--color-text-primary);
          font-size: clamp(36px, 3.2vw, 54px);
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        @keyframes about-orbit-rotate {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }

        .about-stat span,
        .about-stat small {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          font-size: 12px;
        }

        .about-stat small {
          color: var(--color-text-tertiary);
          font-size: 10px;
        }

        @media (max-width: 1050px) {
          .about-panel {
            grid-template-columns: 1fr;
            padding: var(--space-5);
            gap: var(--space-6);
          }
          .about-orbit {
            display: none;
          }
          .about-copy p {
            max-width: none;
          }
        }

        @media (max-width: 520px) {
          .about-stats {
            grid-template-columns: 1fr;
          }
          .about-stat,
          .about-stat:nth-child(2n),
          .about-stat:nth-last-child(-n + 2) {
            border-right: none;
            border-bottom: 1px solid var(--color-border-subtle);
          }
          .about-stat:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
};

const CountUpStat: React.FC<{ value: number; suffix: string; label: string; detail: string }> = ({ value, suffix, label, detail }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const start = performance.now();
        const duration = 1100;
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="about-stat" ref={ref}>
      <strong>{display}{suffix}</strong>
      <span>{label}</span>
      <small>{detail}</small>
    </div>
  );
};
