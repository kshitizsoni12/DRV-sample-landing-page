import React, { useState } from 'react';
import { faqContent } from '../data/siteContent';
import { Plus } from 'lucide-react';

export default function FAQ() {
  // First item open by default as shown in Screenshot 5
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      style={{
        backgroundColor: 'var(--color-warm-ivory)',
        paddingTop: '80px',
        paddingBottom: '100px',
        position: 'relative',
        zIndex: 2,
        scrollMarginTop: '90px',
      }}
      aria-label="Frequently Asked Questions"
    >
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              marginBottom: '12px',
            }}
          >
            <span style={{ color: 'var(--color-charcoal)' }}>{faqContent.titlePrefix}</span>{' '}
            <span style={{ color: 'var(--color-coral)' }}>{faqContent.titleHighlight}</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
            {faqContent.subtitle}
          </p>
        </div>

        {/* Accordion list with refined card surfaces */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqContent.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-trigger-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={item.id || idx}
                className="faq-card-row"
                style={{
                  backgroundColor: isOpen ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
                  border: isOpen ? '1px solid rgba(255, 104, 79, 0.35)' : '1px solid rgba(41, 37, 35, 0.07)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  boxShadow: isOpen
                    ? '0 12px 32px -8px rgba(41, 37, 35, 0.06)'
                    : '0 2px 8px rgba(41, 37, 35, 0.02)',
                  transition: 'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    gap: '16px',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: isOpen ? 'var(--color-charcoal)' : 'var(--color-charcoal)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.question}
                  </span>

                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'rgba(255, 104, 79, 0.12)' : 'rgba(41, 37, 35, 0.05)',
                      color: isOpen ? 'var(--color-coral)' : 'var(--color-charcoal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, color 0.25s ease',
                    }}
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </span>
                </button>

                {/* Animated Accordion Body using CSS grid rows for zero clipping */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`faq-panel-grid ${isOpen ? 'open' : ''}`}
                >
                  <div className="faq-panel-inner">
                    <p
                      style={{
                        paddingTop: '16px',
                        paddingBottom: '4px',
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.65,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-card-row:hover {
          border-color: rgba(255, 104, 79, 0.25);
        }
        .faq-panel-grid {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          opacity: 0;
        }
        .faq-panel-grid.open {
          grid-template-rows: 1fr;
          opacity: 1;
        }
        .faq-panel-inner {
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
