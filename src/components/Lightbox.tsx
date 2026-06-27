import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LightboxImage {
  title: string;
  desc?: string;
  src: string;
  alt?: string;
}

interface LightboxProps {
  image: LightboxImage | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ image, onClose }) => {
  useEffect(() => {
    if (!image) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={image.title}
        >
          <button className="lightbox-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>

          <motion.figure
            className="lightbox-figure"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={image.src} alt={image.alt ?? image.title} />
            <figcaption>
              <strong>{image.title}</strong>
              {image.desc && <span>{image.desc}</span>}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}

      <style>{`
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(var(--space-4), 5vw, var(--space-8));
          background: rgba(8, 8, 10, 0.86);
          backdrop-filter: blur(6px);
        }

        .lightbox-close {
          position: fixed;
          top: var(--space-5);
          right: var(--space-5);
          z-index: 1001;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 50%;
          transition: background var(--motion-fast) var(--ease-standard);
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.18);
        }

        .lightbox-figure {
          margin: 0;
          display: flex;
          flex-direction: column;
          max-width: min(1200px, 100%);
          max-height: 100%;
        }

        .lightbox-figure img {
          display: block;
          max-width: 100%;
          max-height: calc(100vh - 160px);
          object-fit: contain;
          background: #fff;
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
        }

        .lightbox-figure figcaption {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: var(--space-4);
          text-align: center;
        }

        .lightbox-figure figcaption strong {
          font-family: var(--font-body);
          font-weight: 800;
          font-size: 18px;
          color: #fff;
        }

        .lightbox-figure figcaption span {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.7);
          max-width: 720px;
        }
      `}</style>
    </AnimatePresence>
  );
};
