import React from 'react';

export default function BrandTicker() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: '16px 0',
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
      aria-label="Partner Brand Highlights"
    >
      <div className="brand-ticker-track">
        {/* Set 1: primary content accessible to screen readers */}
        <div className="brand-ticker-group">
          <img
            src="/images/brands-strip.webp"
            alt="Trusted partner brand logos including Forbes, Entrepreneur, Yahoo, CNN, Fox, HP"
            width="1024"
            height="49"
            style={{
              height: '38px',
              width: 'auto',
              maxWidth: 'none',
              filter: 'grayscale(100%) opacity(0.85)',
              display: 'block',
            }}
          />
        </div>

        {/* Set 2: duplicate content for seamless infinite marquee loop */}
        <div className="brand-ticker-group" aria-hidden="true">
          <img
            src="/images/brands-strip.webp"
            alt=""
            width="1024"
            height="49"
            style={{
              height: '38px',
              width: 'auto',
              maxWidth: 'none',
              filter: 'grayscale(100%) opacity(0.85)',
              display: 'block',
            }}
          />
        </div>
      </div>

      <style>{`
        .brand-ticker-track {
          display: flex;
          width: max-content;
          animation: tickerLoop 24s linear infinite;
          will-change: transform;
        }
        .brand-ticker-group {
          display: flex;
          align-items: center;
          padding: 0 40px;
          flex-shrink: 0;
        }
        @keyframes tickerLoop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .brand-ticker-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-ticker-track {
            animation: none !important;
            transform: none !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
