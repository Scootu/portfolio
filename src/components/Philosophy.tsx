import React from 'react';
import { ShieldAlert, Zap, Cpu } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

export const Philosophy: React.FC = () => {
  const principles = [
    {
      num: '01',
      tag: 'SYSTEM DESIGN',
      title: 'Clean Architecture & SOLID',
      desc: 'Advocate for clean code principles. I structure backend applications using Clean Architecture and DDD (Domain Driven Design), ensuring separation of concerns, complete testability, and painless maintenance.',
      icon: <Cpu className="principle-icon" size={24} />
    },
    {
      num: '02',
      tag: 'API ENGINEERING',
      title: 'Performance & Optimization',
      desc: 'Optimizing data access paths using EF Core, specialized database schemas, CQRS with MediatR, caching, and robust security protocols like JWT authentication and role-based access control.',
      icon: <Zap className="principle-icon" size={24} />
    },
    {
      num: '03',
      tag: 'PRODUCT EXECUTION',
      title: 'Reliability & Extensibility',
      desc: 'Writing code that is meant to grow. Designing systems with scheduling conflict prevention, validating core business rules, preventing double-bookings, and ensuring fail-safe deployments via Docker.',
      icon: <ShieldAlert className="principle-icon" size={24} />
    }
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <>
      <section className="section-box philosophy-section" id="philosophy">
        <div className="container">
          <div className="section-box-header">
            <div>
              <span className="section-tag">01 // philosophy</span>
              <h2 className="section-title">Thinking In Systems</h2>
            </div>
            <div className="header-meta font-mono">core_principles.log</div>
          </div>

          <motion.div 
            className="philosophy-grid grid-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {principles.map((pr) => (
              <motion.div 
                key={pr.num} 
                className="philosophy-card"
                variants={itemVariants}
              >
                <div className="p-card-header">
                  <span className="p-card-num">{pr.num}</span>
                  <span className="p-card-tag">{pr.tag}</span>
                </div>
                <div className="p-card-content">
                  <div className="p-card-icon-container">
                    {pr.icon}
                  </div>
                  <h3 className="p-card-title">{pr.title}</h3>
                  <p className="p-card-desc">{pr.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <style>{`
        .philosophy-section {
          background: var(--color-bg-primary);
        }

        .header-meta {
          font-size: 12px;
          color: var(--color-text-tertiary);
          text-transform: uppercase;
        }

        .philosophy-grid {
          margin-top: var(--space-6);
        }

        .philosophy-card {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: var(--space-5);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          transition: all var(--motion-medium) var(--ease-standard);
        }

        .philosophy-card:hover {
          border-color: var(--color-blue);
          background: var(--color-bg-tertiary-hover);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .p-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--color-border-subtle);
          padding-bottom: var(--space-3);
        }

        .p-card-num {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 700;
          color: var(--color-orange);
        }

        .p-card-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.05em;
          color: var(--color-text-tertiary);
        }

        .p-card-icon-container {
          margin-bottom: var(--space-3);
          color: var(--color-blue);
        }

        .p-card-title {
          font-family: var(--font-body);
          font-size: 18px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: var(--space-2);
        }

        .p-card-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--color-text-secondary);
        }

        @media (max-width: 900px) {
          .philosophy-card {
            padding: var(--space-4);
          }
        }
      `}</style>
    </>
  );
};
