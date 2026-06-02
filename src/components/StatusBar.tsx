import React, { useState, useEffect } from 'react';
import { Play, Wifi } from 'lucide-react';

interface StatusBarProps {
  activeSection: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ activeSection }) => {
  const [time, setTime] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Clock implementation
    const updateTime = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll progress implementation
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const percentage = Math.round((window.scrollY / totalScroll) * 100);
        setScrollProgress(percentage);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format scroll progress visual bar
  const renderProgressBar = () => {
    const barsCount = 8;
    const filledCount = Math.round((scrollProgress / 100) * barsCount);
    const bars = '='.repeat(filledCount) + ' '.repeat(barsCount - filledCount);
    return `[${bars}] ${scrollProgress}%`;
  };

  return (
    <>
      <div className="status-bar" id="status-bar">
        <div className="status-bar__inner">
          <div className="status-bar__segment status-bar__mode">
            <span className="status-bar__label">MODE:</span>
            <span className="status-bar__value">FULLSTACK // DEV</span>
          </div>

          <div className="status-bar__segment status-bar__path">
            <span className="status-bar__path-prefix">anes@scootu:</span>
            <span className="status-bar__path-value">~/portfolio/{activeSection}</span>
          </div>

          <div className="status-bar__segment status-bar__status">
            <Wifi size={10} className="status-bar__icon-green" />
            <span className="status-bar__label">STATUS:</span>
            <span className="status-bar__status-value">ONLINE</span>
            <span className="status-bar__pulse"></span>
          </div>

          <div className="status-bar__spacer"></div>

          <div className="status-bar__segment status-bar__nowplaying">
            <Play size={10} className="status-bar__np-icon" />
            <span className="status-bar__np-value" title="Now Playing: ASP.NET Core Clean Architecture Compilation Mix">
              ASP.NET Clean Architecture Compilation Mix
            </span>
          </div>

          <div className="status-bar__segment status-bar__progress">
            <span className="status-bar__progress-visual">{renderProgressBar()}</span>
          </div>

          <div className="status-bar__segment status-bar__time">
            <span className="status-bar__time-value">{time}</span>
          </div>
        </div>
      </div>

      <style>{`
        .status-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 999;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.02em;
          user-select: none;
          background: color-mix(in srgb, var(--color-bg-primary) 97%, transparent);
          border-top: 1px solid var(--color-border);
          height: 32px;
          display: flex;
          align-items: center;
          transition: background var(--motion-medium) var(--ease-standard),
                      border var(--motion-medium) var(--ease-standard);
        }

        .status-bar__inner {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0 var(--space-4);
          height: 100%;
        }

        .status-bar__segment {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 var(--space-3);
          border-right: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          height: 100%;
        }

        .status-bar__label {
          color: var(--color-text-tertiary);
        }

        .status-bar__value {
          color: var(--color-blue);
          font-weight: 600;
        }

        .status-bar__path {
          min-width: 150px;
        }

        .status-bar__path-prefix {
          color: var(--color-text-tertiary);
        }

        .status-bar__path-value {
          color: var(--color-text-primary);
        }

        .status-bar__status {
          gap: 4px;
        }

        .status-bar__icon-green {
          color: var(--color-green);
        }

        .status-bar__status-value {
          color: var(--color-green);
          font-weight: 500;
        }

        .status-bar__pulse {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-green);
          box-shadow: 0 0 8px var(--color-green);
          animation: pulse 1.5s infinite;
        }

        .status-bar__spacer {
          flex: 1;
        }

        .status-bar__nowplaying {
          max-width: 320px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .status-bar__np-icon {
          color: var(--color-orange);
          animation: spin 10s linear infinite;
        }

        .status-bar__np-value {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .status-bar__progress {
          min-width: 140px;
        }

        .status-bar__time {
          border-right: none;
          padding-right: 0;
          font-variant-numeric: tabular-nums;
        }

        .status-bar__time-value {
          font-weight: 500;
          color: var(--color-text-primary);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.9); }
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          .status-bar__mode,
          .status-bar__nowplaying,
          .status-bar__progress {
            display: none;
          }
          .status-bar__segment {
            border-right: none;
          }
        }
      `}</style>
    </>
  );
};
