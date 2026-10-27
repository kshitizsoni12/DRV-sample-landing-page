import React from 'react';
import AnimatedCounter from '../components/AnimatedCounter';
import { statsContent } from '../data/siteContent';

export default function Stats() {
  return (
    <section
      id="stats-section"
      style={{
        paddingTop: '20px',
        paddingBottom: '80px',
        backgroundColor: 'var(--color-warm-ivory)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Rounded Stats Panel matching Screenshot 1 & 2 */}
        <div
          style={{
            backgroundColor: '#FAF7F4',
            border: '1px solid #EBE4DD',
            borderRadius: '24px',
            padding: '48px 56px',
            boxShadow: '0 4px 24px rgba(41, 37, 34, 0.03)',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1.4fr',
            alignItems: 'center',
            gap: '48px',
          }}
          className="stats-card-grid"
        >
          {/* Left Text */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-charcoal)',
                marginBottom: '8px',
                letterSpacing: '-0.02em',
              }}
            >
              {statsContent.title}
            </h3>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              {statsContent.subtitle}
            </p>
          </div>

          {/* Vertical dashed divider */}
          <div
            style={{
              width: '1px',
              height: '70px',
              borderLeft: '1px dashed #D3C9C0',
            }}
            className="stats-divider"
          />

          {/* Right Numbers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              textAlign: 'center',
            }}
            className="stats-numbers-grid"
          >
            {statsContent.items.map((stat, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.2rem, 3.2vw, 3rem)',
                    fontWeight: 800,
                    color: 'var(--color-coral)',
                    lineHeight: 1.1,
                    marginBottom: '6px',
                    letterSpacing: '-0.03em',
                  }}
                >
                  <AnimatedCounter
                    targetNumber={stat.number}
                    suffix={stat.suffix}
                    displayValue={stat.value}
                  />
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-muted)',
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .stats-card-grid {
            grid-template-columns: 1fr !important;
            padding: 32px 24px !important;
            text-align: center;
            gap: 32px !important;
          }
          .stats-divider {
            display: none;
          }
          .stats-numbers-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 16px;
          }
        }
        @media (max-width: 520px) {
          .stats-numbers-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
