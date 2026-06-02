import React from 'react';

export const Proof: React.FC = () => {
  const quotes = [
    {
      quote: 'Anes brings the kind of persistence you want on a technical product: he keeps tracing the issue until the system makes sense again.',
      person: 'Project Collaborator',
      role: 'Full-stack build review'
    },
    {
      quote: 'He thinks about backend structure, data flow, and interface behavior together. That makes the work easier to understand and easier to extend.',
      person: 'Peer Developer',
      role: 'Architecture feedback'
    }
  ];

  return (
    <section className="section-box proof-section" id="proof">
      <div className="container">
        <div className="proof-heading">
          <div>
            <div className="section-kicker font-mono">// section.proof</div>
            <h2 className="section-title section-title--large">What Others Say</h2>
          </div>
          <span className="proof-number">07</span>
        </div>

        <div className="proof-grid">
          {quotes.map((item) => (
            <blockquote className="proof-card" key={item.person}>
              <span className="quote-mark">"</span>
              <p>{item.quote}</p>
              <cite>
                <strong>{item.person}</strong>
                <span>{item.role}</span>
              </cite>
            </blockquote>
          ))}
        </div>
      </div>

      <style>{`
        .proof-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-7);
        }

        .proof-number {
          color: var(--color-text-tertiary);
          font-family: var(--font-body);
          font-size: clamp(78px, 9vw, 140px);
          font-weight: 700;
          line-height: 0.8;
          opacity: 0.2;
        }

        .proof-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
        }

        .proof-card {
          border: 1px solid var(--color-border);
          border-left: 4px solid var(--color-blue);
          min-height: 220px;
          padding: var(--space-6);
          background: color-mix(in srgb, var(--color-bg-primary) 90%, transparent);
        }

        .quote-mark {
          color: var(--color-blue);
          font-size: 32px;
          line-height: 1;
        }

        .proof-card p {
          color: var(--color-text-secondary);
          font-size: 17px;
          line-height: 1.85;
          font-style: italic;
          margin-bottom: var(--space-5);
        }

        .proof-card cite {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-style: normal;
        }

        .proof-card strong {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--color-text-primary);
        }

        .proof-card span {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-tertiary);
        }

        @media (max-width: 800px) {
          .proof-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
