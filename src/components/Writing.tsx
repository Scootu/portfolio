import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Writing: React.FC = () => {
  const posts = [
    {
      date: 'MAY 30, 2026',
      title: 'Clean Architecture for Small Teams: What Actually Helps',
      desc: 'Where boundaries, CQRS, and validation rules pay off in real full-stack products.',
      tags: ['C#', 'Architecture', 'Backend']
    },
    {
      date: 'APR 18, 2026',
      title: 'Designing React Screens Around API Contracts',
      desc: 'A practical note on keeping frontend state, request shapes, and backend rules aligned.',
      tags: ['React', 'TypeScript', 'API']
    }
  ];

  return (
    <section className="section-box writing-section" id="writing">
      <div className="container">
        <div className="writing-heading">
          <div>
            <div className="section-kicker font-mono">// section.writing</div>
            <h2 className="section-title section-title--large">Latest Writing</h2>
          </div>
          <span className="writing-number">06</span>
        </div>

        <div className="writing-grid">
          {posts.map((post, index) => (
            <article className={`writing-card ${index === 0 ? 'is-featured' : ''}`} key={post.title}>
              <span className="writing-date font-mono">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
              <div className="writing-tags">
                {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>

        <div className="writing-action">
          <a className="btn-secondary" href="#contact">Read more <ArrowUpRight size={14} /></a>
        </div>
      </div>

      <style>{`
        .writing-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-7);
        }

        .writing-number {
          color: var(--color-text-tertiary);
          font-family: var(--font-body);
          font-size: clamp(78px, 9vw, 140px);
          font-weight: 700;
          line-height: 0.8;
          opacity: 0.2;
        }

        .writing-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-5);
        }

        .writing-card {
          min-height: 220px;
          border: 1px solid var(--color-border);
          padding: var(--space-6);
          background: color-mix(in srgb, var(--color-bg-primary) 90%, transparent);
          transition: border-color var(--motion-medium) var(--ease-standard), transform var(--motion-medium) var(--ease-standard);
        }

        .writing-card:hover,
        .writing-card.is-featured {
          border-color: var(--color-blue);
        }

        .writing-card:hover {
          transform: translateY(-4px);
        }

        .writing-date {
          display: block;
          color: var(--color-text-tertiary);
          font-size: 11px;
          margin-bottom: var(--space-3);
        }

        .writing-card h3 {
          font-family: var(--font-body);
          color: var(--color-text-primary);
          font-size: 24px;
          font-weight: 700;
          margin-bottom: var(--space-3);
        }

        .writing-card.is-featured h3 {
          color: var(--color-blue);
        }

        .writing-card p {
          color: var(--color-text-secondary);
          line-height: 1.65;
        }

        .writing-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: var(--space-4);
        }

        .writing-tags span {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          font-size: 11px;
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: 2px 8px;
        }

        .writing-action {
          display: flex;
          justify-content: center;
          margin-top: var(--space-6);
        }

        @media (max-width: 800px) {
          .writing-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
