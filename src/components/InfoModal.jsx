import React, { useEffect, useRef } from 'react';
import { X, Mail } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function InfoModal({ isOpen, onClose, title, badge, content, contactEmail, actionText, actionHref }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(41, 37, 34, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '540px',
          width: '100%',
          padding: '40px',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
          border: '1px solid rgba(41, 37, 34, 0.08)',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#F5EFE9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-charcoal)',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
        >
          <X size={18} />
        </button>

        {badge && (
          <div style={{ marginBottom: '14px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-coral)',
                backgroundColor: '#FCECE8',
                padding: '4px 12px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {badge}
            </span>
          </div>
        )}

        <h3
          id="info-modal-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-charcoal)',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>

        <div
          style={{
            fontSize: '0.9375rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            marginBottom: '32px',
            whiteSpace: 'pre-line',
          }}
        >
          {content}
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          {actionHref && (
            <MagneticButton
              href={actionHref}
              variant="primary"
              icon={contactEmail ? <Mail size={16} /> : undefined}
              onClick={onClose}
            >
              {actionText || 'Contact Us'}
            </MagneticButton>
          )}

          <MagneticButton
            variant="secondary"
            onClick={onClose}
          >
            Close
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
