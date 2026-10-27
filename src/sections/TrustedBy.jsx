import React from 'react';
import BrandTicker from '../components/BrandTicker';
import { trustedBy } from '../data/siteContent';

export default function TrustedBy() {
  return (
    <section
      id="trusted-by"
      style={{
        paddingTop: '32px',
        paddingBottom: '40px',
        backgroundColor: 'var(--color-warm-ivory)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: 'var(--color-coral)' }}>{trustedBy.titlePart1}</span>{' '}
            <span style={{ color: 'var(--color-charcoal)' }}>{trustedBy.titlePart2}</span>
          </h2>
        </div>

        {/* Marquee Ticker with Cinematic Edge Falloff */}
        <div
          style={{
            position: 'relative',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <BrandTicker />
        </div>
      </div>
    </section>
  );
}
