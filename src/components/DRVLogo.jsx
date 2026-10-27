import React from 'react';

export default function DRVLogo({ inverted = false, className = '' }) {
  const subtextColor = inverted ? '#E8E1DA' : '#292522';

  return (
    <a href="#home" className={`drv-logo-link ${className}`} aria-label="DRV Assistants Home" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
      {/* Circle Icon */}
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: '#1E1B19',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '15px',
            letterSpacing: '-0.5px',
            color: '#FFFFFF',
            lineHeight: 1,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          DR<span style={{ color: 'var(--color-coral)' }}>V</span>
        </span>
      </div>

      {/* Brand Text */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '17px',
            color: 'var(--color-coral)',
            letterSpacing: '0.04em',
          }}
        >
          DRV
        </span>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: '13px',
            color: subtextColor,
            letterSpacing: '-0.01em',
          }}
        >
          Assistants
        </span>
      </div>
    </a>
  );
}
