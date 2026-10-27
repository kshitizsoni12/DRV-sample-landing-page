import React from 'react';

export default function SectionBadge({ children, className = '', id }) {
  return (
    <div className={`section-badge-wrapper ${className}`} id={id}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px',
          backgroundColor: '#F9DDD6',
          border: '1px solid rgba(255, 104, 79, 0.4)',
          borderRadius: '9999px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          color: '#D84933',
          boxShadow: '0 1px 3px rgba(255, 104, 79, 0.08)',
        }}
      >
        {children}
      </span>
    </div>
  );
}
