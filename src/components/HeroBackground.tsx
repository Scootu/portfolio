/**
 * HeroBackground
 * A quiet "operating system dashboard" backdrop: a slow-drifting dot grid,
 * two soft radial brand glows, a gentle scanline sweep, a faint noise texture,
 * and a couple of small "data pulse" nodes. Tuned to be barely noticeable —
 * premium, not distracting. Pure CSS, theme-aware (light/dark), and fully
 * disabled under prefers-reduced-motion.
 *
 * NOTE: classes are namespaced with `hb-` so they never collide with layout
 * classes in Hero (e.g. Hero's own `.hero-grid` two-column layout).
 */
export const HeroBackground: React.FC = () => {
  return (
    <div className="hb-bg" aria-hidden="true">
      <div className="hb-grid" />
      <div className="hb-glow hb-glow--left" />
      <div className="hb-glow hb-glow--right" />
      <span className="hb-pulse hb-pulse--a" />
      <span className="hb-pulse hb-pulse--b" />
      <div className="hb-scanline" />
      <div className="hb-noise" />

      <style>{`
        .hb-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        /* --- Slow drifting dot grid ------------------------------------- */
        .hb-grid {
          position: absolute;
          inset: -24px;
          background-image: radial-gradient(
            circle,
            rgba(20, 20, 20, 0.1) 1px,
            transparent 1px
          );
          background-size: 24px 24px;
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            #000 18%,
            #000 75%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            #000 18%,
            #000 75%,
            transparent 100%
          );
          animation: hbGridMove 28s linear infinite;
        }
        .dark .hb-grid {
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.07) 1px,
            transparent 1px
          );
        }

        /* --- Soft radial glows ------------------------------------------ */
        .hb-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 999px;
          filter: blur(80px);
          opacity: 0.26;
          animation: hbFloatGlow 12s ease-in-out infinite alternate;
        }
        .hb-glow--left {
          left: 14%;
          top: 30%;
          background: rgba(226, 83, 39, 0.18);
        }
        /* Right glow sits behind the terminal/code card. */
        .hb-glow--right {
          right: 16%;
          top: 24%;
          background: rgba(59, 130, 246, 0.15);
          animation-delay: 2s;
        }
        .dark .hb-glow { opacity: 0.34; }
        .dark .hb-glow--left { background: rgba(232, 115, 75, 0.22); }
        .dark .hb-glow--right { background: rgba(74, 127, 247, 0.2); }

        /* --- Small "data pulse" nodes ----------------------------------- */
        .hb-pulse {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(226, 83, 39, 0.55);
        }
        .hb-pulse::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(226, 83, 39, 0.4);
          animation: hbDataPulse 3.6s ease-out infinite;
        }
        .hb-pulse--a { left: 22%; top: 26%; }
        .hb-pulse--b {
          right: 24%;
          top: 60%;
          background: rgba(59, 130, 246, 0.5);
        }
        .hb-pulse--b::after {
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.35);
          animation: hbDataPulseBlue 3.6s ease-out infinite;
          animation-delay: 1.8s;
        }

        /* --- Scanline sweep --------------------------------------------- */
        .hb-scanline {
          position: absolute;
          inset: 0;
          height: 180px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 0, 0, 0.035),
            transparent
          );
          animation: hbScanMove 9s ease-in-out infinite;
        }
        .dark .hb-scanline {
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.04),
            transparent
          );
        }

        /* --- Faint noise texture ---------------------------------------- */
        .hb-noise {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background-image: repeating-radial-gradient(
            circle at 0 0,
            rgba(0, 0, 0, 0.6) 0,
            rgba(0, 0, 0, 0.6) 1px,
            transparent 1px,
            transparent 4px
          );
        }
        .dark .hb-noise {
          opacity: 0.05;
          background-image: repeating-radial-gradient(
            circle at 0 0,
            rgba(255, 255, 255, 0.5) 0,
            rgba(255, 255, 255, 0.5) 1px,
            transparent 1px,
            transparent 4px
          );
        }

        @keyframes hbGridMove {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(24px, 24px, 0); }
        }

        @keyframes hbFloatGlow {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to { transform: translate3d(30px, -20px, 0) scale(1.08); }
        }

        @keyframes hbScanMove {
          0% { transform: translateY(-220px); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes hbDataPulse {
          0% { box-shadow: 0 0 0 0 rgba(226, 83, 39, 0.4); }
          70% { box-shadow: 0 0 0 16px rgba(226, 83, 39, 0); }
          100% { box-shadow: 0 0 0 0 rgba(226, 83, 39, 0); }
        }

        @keyframes hbDataPulseBlue {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.35); }
          70% { box-shadow: 0 0 0 16px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hb-grid,
          .hb-glow,
          .hb-scanline,
          .hb-pulse::after {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
