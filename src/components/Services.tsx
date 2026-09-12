import React from 'react';
import { Terminal, Database, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n';

export const Services: React.FC = () => {
  const { t } = useI18n();
  const icons = [<Cpu size={20} />, <Terminal size={20} />, <Database size={20} />];
  const serviceList = t.services.items.map((item, i) => ({
    num: String(i + 1).padStart(2, '0'),
    icon: icons[i],
    ...item
  }));

  return (
    <>
      <section className="section-box services-section" id="services">
        <div className="container">
          <div className="section-box-header">
            <div>
              <span className="section-tag">03 // capabilities</span>
              <h2 className="section-title">{t.services.title}</h2>
            </div>
            <div className="header-meta font-mono">services_list.csv</div>
          </div>

          <div className="services-grid grid-3">
            {serviceList.map((service) => (
              <motion.div
                key={service.num}
                className="service-card"
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              >
                <div className="service-card-top">
                  <span className="service-num font-mono">{service.num}</span>
                  <div className="service-icon-box">{service.icon}</div>
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .services-section {
          background: var(--color-bg-primary);
        }

        .services-grid {
          margin-top: var(--space-6);
        }

        .service-card {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: var(--space-5);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          transition: all var(--motion-medium) var(--ease-standard);
        }

        .service-card:hover {
          border-color: var(--color-blue);
          background: var(--color-bg-tertiary-hover);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .service-card:hover .service-icon-box svg {
          animation: service-icon-pulse 0.8s ease-in-out;
        }

        .service-card:nth-child(1):hover .service-icon-box svg {
          animation: service-icon-rotate 1s ease-in-out;
        }

        .service-card:nth-child(2):hover .service-icon-box svg {
          animation: service-icon-shift 0.7s ease-in-out;
        }

        .service-card:nth-child(3):hover .service-icon-box svg {
          animation: service-icon-pulse 0.8s ease-in-out;
        }

        .service-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .service-num {
          font-size: 14px;
          color: var(--color-text-tertiary);
        }

        .service-icon-box {
          color: var(--color-blue);
          width: 36px;
          height: 36px;
          border: 1px solid var(--color-border-subtle);
          background: var(--color-bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .service-card-title {
          font-family: var(--font-body);
          font-size: 18px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: var(--space-2);
        }

        .service-card-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--color-text-secondary);
        }

        @keyframes service-icon-rotate {
          0% { transform: rotate(0deg); }
          70% { transform: rotate(14deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes service-icon-shift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }

        @keyframes service-icon-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.16); }
        }
      `}</style>
    </>
  );
};
