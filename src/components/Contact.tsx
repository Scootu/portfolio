import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section className="section-box contact-section" id="contact">
      <div className="contact-dot-field" aria-hidden="true" />
      <div className="contact-number" aria-hidden="true">08</div>
      <div className="container contact-container">
        <div className="contact-symbol" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <h2>Let's Talk</h2>
        <p>I am open to developer roles, collaborations, and projects that need clear backend structure with a polished React frontend.</p>

        <div className="availability font-mono">
          <span /> Limited availability - accepting select projects for 2026
        </div>

        <a className="contact-cta" href="mailto:anes-hamdaoui@univ-dbkm.dz">
          <Mail size={18} />
          Tell me what you are building
          <ArrowUpRight size={18} />
        </a>

        <div className="contact-links font-mono">
          <a href="https://github.com/Scootu/" target="_blank" rel="noopener noreferrer">github</a>
          <a href="https://linkedin.com/in/anes-hamdaoui-8239a8216" target="_blank" rel="noopener noreferrer">linkedin</a>
          <span>Algeria</span>
        </div>
      </div>

      <style>{`
        .contact-section {
          min-height: 620px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .contact-dot-field {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.7;
        }

        .contact-number {
          position: absolute;
          left: -20px;
          bottom: -30px;
          font-family: var(--font-body);
          font-size: 150px;
          line-height: 1;
          color: var(--color-text-tertiary);
          opacity: 0.16;
          font-weight: 800;
        }

        .contact-container {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .contact-symbol {
          display: grid;
          grid-template-columns: repeat(2, 20px);
          grid-template-rows: repeat(2, 20px);
          gap: 5px;
          margin-bottom: var(--space-5);
        }

        .contact-symbol span {
          background: var(--color-blue);
          box-shadow: 0 0 22px var(--color-blue);
        }

        .contact-symbol span:nth-child(2),
        .contact-symbol span:nth-child(3) {
          background: var(--color-orange);
          box-shadow: 0 0 22px var(--color-orange);
        }

        .contact-container h2 {
          font-family: var(--font-body);
          font-weight: 800;
          font-size: clamp(42px, 6vw, 76px);
          letter-spacing: 0;
        }

        .contact-container p {
          max-width: 720px;
          margin: var(--space-5) auto;
          color: var(--color-text-secondary);
          font-size: 18px;
          line-height: 1.7;
        }

        .availability {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-5);
          border: 1px solid color-mix(in srgb, var(--color-green) 32%, var(--color-border));
          color: var(--color-green);
          background: var(--color-green-subtle);
          font-size: 12px;
          margin-bottom: var(--space-5);
        }

        .availability span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-green);
        }

        .contact-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
          min-height: 58px;
          padding: 0 var(--space-7);
          background: var(--color-blue);
          color: white;
          font-family: var(--font-mono);
          font-weight: 700;
          border: 1px solid var(--color-blue);
        }

        .contact-cta:hover {
          color: white;
          background: var(--color-black);
          border-color: var(--color-black);
        }

        .contact-links {
          display: flex;
          justify-content: center;
          gap: var(--space-5);
          flex-wrap: wrap;
          margin-top: var(--space-6);
          color: var(--color-text-tertiary);
          font-size: 12px;
        }

        .contact-links a {
          color: var(--color-text-primary);
        }

        @media (max-width: 620px) {
          .contact-section {
            min-height: 560px;
          }
          .contact-cta {
            width: 100%;
            justify-content: center;
            padding: 0 var(--space-4);
          }
        }
      `}</style>
    </section>
  );
};
