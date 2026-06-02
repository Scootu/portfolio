import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Copy, Link2 } from 'lucide-react';

const email = 'anes-hamdaoui@univ-dbkm.dz';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-page__hero section-box">
        <div className="contact-page__dots" aria-hidden="true" />
        <span className="contact-page__cursor" aria-hidden="true" />

        <div className="container contact-page__inner">
          <div className="section-kicker font-mono">// page.contact</div>
          <h1>Contact</h1>
          <p className="contact-page__intro">
            I read every message. I will get back to you within 2-3 business days.
          </p>

          <div className="contact-page__availability font-mono">
            <span />
            Limited availability - accepting select projects for 2026
          </div>

          <div className="contact-page__console font-mono" aria-label="Connection status">
            <p>&gt; establishing connection...</p>
            <p>&gt; handshake complete</p>
            <p>&gt; channel open_</p>
          </div>
        </div>
      </div>

      <div className="contact-page__reach section-box">
        <div className="contact-page__dots" aria-hidden="true" />
        <div className="container contact-page__inner">
          <span className="contact-page__number" aria-hidden="true">02</span>
          <div className="section-kicker font-mono">// section.reach</div>
          <h2>How to Reach Me</h2>
          <p className="contact-page__lede">
            Email works best. Tell me what is going on and I will take it from there.
          </p>

          <div className="contact-methods">
            <article className="contact-method is-primary">
              <div className="contact-method__mark" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <p className="contact-method__label font-mono">Email (Preferred)</p>
              <h3>{email}</h3>
              <a href={`mailto:${email}`} className="contact-method__link font-mono">
                Send email
                <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                className="contact-method__copy font-mono"
                onClick={copyEmail}
                aria-label="Copy email address"
                title="Copy email"
              >
                {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                <span>{copied ? 'copied' : 'copy'}</span>
              </button>
            </article>

            <article className="contact-method">
              <div className="contact-method__icon" aria-hidden="true">
                <Link2 size={28} />
              </div>
              <p className="contact-method__label font-mono">LinkedIn</p>
              <h3>linkedin.com/in/anes-hamdaoui</h3>
              <a
                href="https://linkedin.com/in/anes-hamdaoui-8239a8216"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method__link font-mono"
              >
                View profile
                <ArrowUpRight size={14} />
              </a>
            </article>

            <article className="contact-method">
              <div className="contact-method__icon" aria-hidden="true">
                <Link2 size={28} />
              </div>
              <p className="contact-method__label font-mono">All Links</p>
              <h3>GitHub, projects, and more</h3>
              <a
                href="https://github.com/Scootu/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method__link font-mono"
              >
                View all
                <ArrowUpRight size={14} />
              </a>
            </article>
          </div>
        </div>
      </div>

      <div className="contact-page__process section-box">
        <div className="contact-page__dots" aria-hidden="true" />
        <div className="container contact-page__inner">
          <span className="contact-page__number contact-page__number--low" aria-hidden="true">03</span>
          <div className="section-kicker font-mono">// section.process</div>
          <h2>What Happens Next</h2>

          <div className="contact-process">
            <article className="contact-process__step">
              <span className="font-mono">01</span>
              <h3>I review and respond</h3>
              <p>I will get back to you within 2-3 business days with my thoughts or a few questions.</p>
            </article>
            <article className="contact-process__step">
              <span className="font-mono">02</span>
              <h3>We schedule a call</h3>
              <p>If it looks like a fit, we hop on a 30-minute call to talk it through.</p>
            </article>
            <article className="contact-process__step">
              <span className="font-mono">03</span>
              <h3>Proposal or referral</h3>
              <p>I will send a proposal if we are a match. If not, I will point you somewhere that makes more sense.</p>
            </article>
          </div>
        </div>
      </div>

      <style>{`
        .contact-page {
          position: relative;
          overflow: hidden;
          background: var(--color-bg-primary);
        }

        .contact-page__hero {
          min-height: 560px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--color-blue);
        }

        .contact-page__dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.78;
          pointer-events: none;
        }

        .contact-page__cursor {
          position: absolute;
          left: clamp(30px, 5vw, 110px);
          top: 31%;
          width: 34px;
          height: 34px;
          border: 1px solid var(--color-text-primary);
          border-radius: 999px;
          opacity: 0.92;
        }

        .contact-page__cursor::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--color-text-primary);
          transform: translate(-50%, -50%);
        }

        .contact-page__inner {
          position: relative;
          z-index: 2;
        }

        .contact-page__hero .contact-page__inner,
        .contact-page__reach .contact-page__inner,
        .contact-page__process .contact-page__inner {
          max-width: 1400px;
        }

        .contact-page h1,
        .contact-page h2 {
          margin-top: var(--space-3);
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          color: var(--color-text-primary);
        }

        .contact-page h1 {
          font-size: clamp(58px, 8vw, 108px);
          line-height: 0.95;
        }

        .contact-page h2 {
          font-size: clamp(42px, 6vw, 76px);
          line-height: 1;
        }

        .contact-page__intro {
          max-width: 780px;
          margin-top: var(--space-6);
          color: var(--color-text-secondary);
          font-size: clamp(20px, 2vw, 27px);
          line-height: 1.55;
        }

        .contact-page__availability {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          margin-top: var(--space-5);
          padding: var(--space-3) var(--space-5);
          border: 1px solid color-mix(in srgb, var(--color-green) 32%, var(--color-border));
          color: var(--color-green);
          background: var(--color-green-subtle);
          font-size: 12px;
        }

        .contact-page__availability span {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--color-green);
        }

        .contact-page__console {
          max-width: 1400px;
          margin-top: var(--space-5);
          padding: var(--space-5);
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 78%, transparent);
          color: var(--color-text-primary);
          font-size: 16px;
          line-height: 1.8;
        }

        .contact-page__reach {
          min-height: 680px;
          padding: clamp(90px, 10vw, 150px) 0;
        }

        .contact-page__number {
          position: absolute;
          right: 5%;
          top: -40px;
          font-family: var(--font-body);
          font-size: clamp(98px, 12vw, 180px);
          line-height: 1;
          font-weight: 800;
          color: var(--color-text-tertiary);
          opacity: 0.22;
        }

        .contact-page__number--low {
          left: 0;
          right: auto;
          top: -70px;
        }

        .contact-page__lede {
          margin-top: var(--space-5);
          max-width: 720px;
          color: var(--color-text-secondary);
          font-size: 18px;
          line-height: 1.7;
        }

        .contact-methods {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-5);
          margin-top: var(--space-8);
        }

        .contact-method {
          position: relative;
          min-height: 230px;
          padding: var(--space-7);
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 82%, transparent);
          transition: border var(--motion-fast) var(--ease-standard),
                      transform var(--motion-fast) var(--ease-standard),
                      background var(--motion-fast) var(--ease-standard);
        }

        .contact-method:hover,
        .contact-method.is-primary {
          border-color: var(--color-blue);
          background: color-mix(in srgb, var(--color-blue) 3%, var(--color-bg-primary));
        }

        .contact-method:hover {
          transform: translateY(-4px);
        }

        .contact-method__mark {
          width: 42px;
          height: 42px;
          display: grid;
          grid-template-columns: repeat(2, 12px);
          grid-template-rows: repeat(2, 12px);
          gap: 5px;
          margin-bottom: var(--space-5);
        }

        .contact-method__mark span,
        .contact-method__icon {
          color: var(--color-text-primary);
        }

        .contact-method__mark span {
          background: var(--color-blue);
        }

        .contact-method__mark span:nth-child(2),
        .contact-method__mark span:nth-child(3) {
          background: var(--color-blue);
          opacity: 0.76;
        }

        .contact-method__icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          margin-bottom: var(--space-5);
        }

        .contact-method__label {
          color: var(--color-text-tertiary);
          font-size: 12px;
        }

        .contact-method h3 {
          margin-top: var(--space-3);
          font-size: clamp(18px, 1.8vw, 24px);
          line-height: 1.35;
          font-weight: 500;
          color: var(--color-text-primary);
          overflow-wrap: anywhere;
        }

        .contact-method__link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          margin-top: var(--space-6);
          color: var(--color-blue);
          font-size: 13px;
        }

        .contact-method__copy {
          position: absolute;
          right: var(--space-6);
          bottom: var(--space-6);
          min-width: 58px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          padding: 0 var(--space-3);
          border: 1px solid var(--color-border);
          color: var(--color-text-tertiary);
          background: var(--color-border-subtle);
          font-size: 11px;
          transition: all var(--motion-fast) var(--ease-standard);
        }

        .contact-method__copy:hover {
          border-color: var(--color-blue);
          color: var(--color-blue);
          background: var(--color-bg-primary);
        }

        .contact-page__process {
          min-height: 560px;
          padding: clamp(90px, 10vw, 145px) 0;
          border-top: 1px solid var(--color-border);
        }

        .contact-process {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
          margin-top: var(--space-8);
        }

        .contact-process__step {
          min-height: 190px;
          padding: var(--space-7) var(--space-8);
          border-left: 1px solid var(--color-border);
        }

        .contact-process__step span {
          display: block;
          margin-bottom: var(--space-5);
          color: var(--color-text-tertiary);
          font-size: 42px;
          line-height: 1;
          font-weight: 800;
        }

        .contact-process__step h3 {
          margin-bottom: var(--space-3);
          color: var(--color-text-primary);
          font-size: 17px;
          font-weight: 800;
        }

        .contact-process__step p {
          max-width: 360px;
          color: var(--color-text-secondary);
          font-size: 16px;
          line-height: 1.55;
        }

        @media (max-width: 980px) {
          .contact-methods,
          .contact-process {
            grid-template-columns: 1fr;
          }

          .contact-page__hero {
            min-height: 500px;
          }

          .contact-process__step {
            border-left: 1px solid var(--color-border);
            border-top: 1px solid var(--color-border);
          }
        }

        @media (max-width: 620px) {
          .contact-page__hero,
          .contact-page__reach,
          .contact-page__process {
            padding: 78px 0;
          }

          .contact-page h1 {
            font-size: 60px;
          }

          .contact-page h2 {
            font-size: 40px;
            line-height: 1.08;
            max-width: 320px;
          }

          .contact-page__intro,
          .contact-page__lede {
            max-width: 320px;
            font-size: 18px;
          }

          .contact-page__hero {
            min-height: auto;
          }

          .contact-page__console {
            font-size: 14px;
          }

          .contact-page__availability {
            display: flex;
            width: 100%;
            max-width: 320px;
            align-items: flex-start;
            line-height: 1.5;
          }

          .contact-method {
            padding: var(--space-5);
          }

          .contact-methods,
          .contact-process {
            max-width: 320px;
          }

          .contact-method__copy {
            position: static;
            margin-top: var(--space-5);
          }

          .contact-page__cursor {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
