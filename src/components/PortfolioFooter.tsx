import React from 'react';

export const PortfolioFooter: React.FC = () => {
  return (
    <footer className="portfolio-footer">
      <div className="footer-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="container footer-container">
        <div className="footer-mark" aria-label="Anes Hamdaoui mark">
          <span>A</span>
          <span>H</span>
        </div>
        <h2>ANES HAMDAOUI</h2>
        <p className="font-mono">built with structure. tuned for momentum.</p>

        <div className="footer-links font-mono">
          <a href="#home">home</a>
          <a href="#about">about</a>
          <a href="#projects">work</a>
          <a href="#services">services</a>
          <a href="#writing">writing</a>
          <a href="#contact">contact</a>
        </div>

        <div className="footer-bottom font-mono">
          <span>Made in Algeria //</span>
          <span>portfolio.{new Date().getFullYear()}</span>
        </div>
      </div>

      <style>{`
        .portfolio-footer {
          position: relative;
          min-height: 520px;
          display: flex;
          align-items: center;
          overflow: hidden;
          border-top: 1px solid var(--color-border);
          background:
            linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px),
            linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
            var(--color-bg-primary);
          background-size: 96px 96px;
        }

        .footer-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .footer-lines span {
          position: absolute;
          border: 1px solid color-mix(in srgb, var(--color-green) 38%, transparent);
          opacity: 0.52;
        }

        .footer-lines span:nth-child(1) { left: 6%; top: 12%; width: 22%; height: 74%; }
        .footer-lines span:nth-child(2) { left: 36%; top: 0; width: 34%; height: 66%; border-color: color-mix(in srgb, var(--color-blue) 32%, transparent); }
        .footer-lines span:nth-child(3) { right: 3%; top: 0; width: 34%; height: 48%; border-color: color-mix(in srgb, var(--color-orange) 34%, transparent); }
        .footer-lines span:nth-child(4) { right: 12%; bottom: 10%; width: 40%; height: 22%; }

        .footer-container {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .footer-mark {
          width: 58px;
          height: 58px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px;
          margin-bottom: var(--space-5);
        }

        .footer-mark span {
          display: grid;
          place-items: center;
          background: var(--color-blue);
          color: white;
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 700;
          box-shadow: 0 0 24px var(--color-blue-tint);
        }

        .footer-mark span:nth-child(2) {
          background: var(--color-orange);
        }

        .portfolio-footer h2 {
          font-family: var(--font-body);
          font-size: clamp(48px, 9vw, 128px);
          font-weight: 800;
          letter-spacing: 0;
          line-height: 0.9;
        }

        .portfolio-footer p {
          color: var(--color-text-secondary);
          margin: var(--space-6) 0;
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-5);
          margin-bottom: var(--space-7);
        }

        .footer-links a {
          color: var(--color-text-primary);
          font-size: 13px;
        }

        .footer-links a:hover {
          color: var(--color-blue);
        }

        .footer-bottom {
          display: flex;
          gap: var(--space-3);
          color: var(--color-text-tertiary);
          font-size: 12px;
        }

        @media (max-width: 620px) {
          .portfolio-footer {
            min-height: 460px;
          }
          .footer-bottom {
            flex-direction: column;
          }
        }
      `}</style>
    </footer>
  );
};
