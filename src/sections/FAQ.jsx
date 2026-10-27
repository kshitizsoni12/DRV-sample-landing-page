import React, { useState } from 'react';
import { faqContent } from '../data/siteContent';
import { Plus, Minus } from 'lucide-react';

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
        {/* Header matching Screenshot 5 */}
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

        {/* Accordion list matching Screenshot 5 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqContent.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-trigger-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={item.id || idx}
                style={{
                  borderBottom: '1px solid #E5DED7',
                  paddingTop: '20px',
                  paddingBottom: '20px',
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
                    padding: '8px 0',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: 'var(--color-charcoal)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.question}
                  </span>

                  <span
                    style={{
                      color: isOpen ? 'var(--color-coral)' : 'var(--color-charcoal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'color 0.2s ease, transform 0.2s ease',
                    }}
                  >
                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
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
                        paddingTop: '12px',
                        paddingBottom: '8px',
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
