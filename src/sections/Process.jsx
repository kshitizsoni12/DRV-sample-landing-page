import React, { useRef } from 'react';
import SectionBadge from '../components/SectionBadge';
import MagneticButton from '../components/MagneticButton';
import { processContent } from '../data/siteContent';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const processRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 70%',
        },
      });

      // Animate line draw-on from left to right
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { strokeDashoffset: 1000 },
          { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }
        );
      }

      tl.from(
        '.process-step-node',
        {
          scale: 0.7,
          opacity: 0,
          stagger: 0.2,
          duration: 0.5,
          ease: 'back.out(1.5)',
        },
        '-=0.9'
      ).from(
        '.process-step-text',
        {
          y: 20,
          opacity: 0,
          stagger: 0.2,
          duration: 0.5,
        },
        '-=0.6'
      );
    },
    { scope: processRef }
  );

  return (
    <section
      ref={processRef}
      id="process"
      style={{
        backgroundColor: 'var(--color-warm-ivory)',
        paddingTop: '110px',
        paddingBottom: '110px',
        position: 'relative',
        zIndex: 2,
        scrollMarginTop: '90px',
      }}
      aria-label="How it works"
    >
      <div className="container">
        {/* Header matching Screenshot 3 */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <SectionBadge id="process-badge">{processContent.badge}</SectionBadge>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              fontWeight: 700,
              color: 'var(--color-charcoal)',
              marginTop: '16px',
              letterSpacing: '-0.025em',
            }}
          >
            {processContent.titlePrefix}{' '}
            <span style={{ color: 'var(--color-coral)' }}>{processContent.titleHighlight}</span>
          </h2>
        </div>

        {/* 3 Step Timeline with connecting line */}
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
            maxWidth: '1000px',
            margin: '0 auto 64px auto',
          }}
          className="process-steps-grid"
        >
          {/* Connecting SVG stroke line behind the nodes */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '14%',
              right: '14%',
              height: '4px',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            className="process-connecting-line"
            aria-hidden="true"
          >
            <svg
              width="100%"
              height="4"
              viewBox="0 0 1000 4"
              fill="none"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <line
                ref={lineRef}
                x1="0"
                y1="2"
                x2="1000"
                y2="2"
                stroke="#D9D0C7"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeDashoffset="0"
              />
            </svg>
          </div>

          {processContent.steps.map((step) => (
            <div
              key={step.number}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {/* Number Circle Node */}
              <div
                className="process-step-node"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(41, 37, 34, 0.1)',
                  boxShadow: '0 8px 24px rgba(41, 37, 34, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: 'var(--color-charcoal)',
                  marginBottom: '28px',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
              >
                {step.number}
              </div>

              {/* Step Info */}
              <div className="process-step-text">
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--color-charcoal)',
                    marginBottom: '10px',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.5,
                    maxWidth: '260px',
                    margin: '0 auto',
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button below steps matching Screenshot 3 & 4 */}
        <div style={{ textAlign: 'center' }}>
          <MagneticButton
            href={processContent.ctaHref || '#pricing'}
            variant="primary"
            id="process-trial-cta"
          >
            {processContent.ctaText}
          </MagneticButton>
        </div>
      </div>

      <style>{`
        .process-step-node:hover {
          transform: scale(1.08);
          border-color: var(--color-coral) !important;
          color: var(--color-coral) !important;
        }
        @media (max-width: 768px) {
          .process-steps-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .process-connecting-line {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
