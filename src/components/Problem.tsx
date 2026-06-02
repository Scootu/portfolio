import React from 'react';
import { motion } from 'framer-motion';

export const Problem: React.FC = () => {
  const issues = [
    {
      num: '01',
      title: 'Features take longer than they should',
      desc: 'Change one flow, and five other places need attention. The system starts charging interest on every new feature.'
    },
    {
      num: '02',
      title: 'Backend rules live in too many places',
      desc: 'Validation, scheduling, permissions, and data access become hard to reason about when boundaries are unclear.'
    },
    {
      num: '03',
      title: 'Frontend and API contracts drift',
      desc: 'Screens work until the data shape changes. Then fixes become reactive instead of designed.'
    },
    {
      num: '04',
      title: 'Performance gets noticed late',
      desc: 'Queries, payloads, and rendering paths slowly get heavier until users feel it first.'
    }
  ];

  return (
    <section className="section-box problem-section" id="problem">
      <div className="problem-matrix" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, i) => (
          <span
            key={i}
            style={{
              '--i': i,
              '--d': `${(i * 137) % 19 / 10}s`,
              '--dur': `${7 + (i % 5)}s`
            } as React.CSSProperties}
          >
            {i % 3 === 0 ? '*' : (i % 4) + 1}
          </span>
        ))}
      </div>

      <div className="container problem-container">
        <div className="section-kicker font-mono">// system.problem</div>
        <h2 className="section-title section-title--large">The Problem</h2>
        <p className="problem-lede">
          Product code does not become messy all at once. It piles up quietly until every release feels slower than the last one.
        </p>

        <div className="problem-grid">
          {issues.map((issue, index) => (
            <motion.article
              className="problem-card"
              key={issue.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <span className="problem-card-num font-mono">[{issue.num}]</span>
              <h3>{issue.title}</h3>
              <p>{issue.desc}</p>
            </motion.article>
          ))}
        </div>

        <p className="problem-note">
          I help turn that pressure into structure: clearer domains, cleaner APIs, predictable interfaces, and systems that are easier to keep shipping.
        </p>
      </div>

      <style>{`
        .problem-section {
          min-height: 620px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .problem-container {
          position: relative;
          z-index: 2;
        }

        .section-kicker {
          color: var(--color-text-tertiary);
          font-size: 12px;
          margin-bottom: var(--space-2);
        }

        .section-title--large {
          font-size: clamp(40px, 6vw, 72px);
          font-family: var(--font-body);
          font-weight: 700;
          letter-spacing: 0;
        }

        .problem-lede,
        .problem-note {
          max-width: 620px;
          color: var(--color-text-secondary);
          font-size: 17px;
          line-height: 1.65;
        }

        .problem-lede {
          margin-top: var(--space-4);
        }

        .problem-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
          margin: var(--space-7) 0 var(--space-5);
        }

        .problem-card {
          min-height: 170px;
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 78%, transparent);
          padding: var(--space-5);
          border-left: 3px solid var(--color-orange);
          backdrop-filter: blur(4px);
        }

        .problem-card-num {
          display: block;
          text-align: right;
          color: var(--color-orange);
          font-size: 11px;
          margin-bottom: var(--space-2);
        }

        .problem-card h3 {
          font-family: var(--font-body);
          font-size: 17px;
          font-weight: 700;
          margin-bottom: var(--space-2);
        }

        .problem-card p {
          color: var(--color-text-secondary);
          font-size: 14px;
          line-height: 1.55;
        }

        .problem-matrix {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(13, 1fr);
          place-items: center;
          color: var(--color-text-tertiary);
          opacity: 0.22;
          font-family: var(--font-mono);
          font-size: 32px;
          pointer-events: none;
        }

        .problem-matrix span {
          transform: translateY(calc((var(--i) % 5) * 18px));
          animation: matrix-drift var(--dur) ease-in-out infinite;
          animation-delay: var(--d);
        }

        @keyframes matrix-drift {
          0%, 100% {
            opacity: 0.34;
            transform: translate3d(0, calc((var(--i) % 5) * 18px), 0);
          }
          45% {
            opacity: 0.12;
            transform: translate3d(calc(((var(--i) % 3) - 1) * 10px), calc((var(--i) % 5) * 18px - 16px), 0);
          }
          52% {
            opacity: 0.48;
          }
        }

        @media (max-width: 1000px) {
          .problem-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 620px) {
          .problem-section {
            min-height: auto;
          }
          .problem-grid {
            grid-template-columns: 1fr;
          }
          .problem-matrix {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
};
