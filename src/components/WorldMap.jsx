import React from 'react';

export default function WorldMap({ className = '', style = {} }) {
  return (
    <div
      className={`world-map-container ${className}`}
      style={{
        position: 'absolute',
        top: '5%',
        right: '2%',
        width: '60%',
        maxWidth: '750px',
        height: 'auto',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.45,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto' }}
      >
        <defs>
          <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="#C9BFB5" opacity="0.6" />
          </pattern>
        </defs>

        {/* Global continent silhouettes filled with dotted pattern */}
        {/* North America */}
        <path
          d="M120 80 Q220 50 300 90 Q340 160 280 230 Q220 250 180 200 Q110 160 120 80 Z"
          fill="url(#dot-pattern)"
        />
        {/* South America */}
        <path
          d="M260 250 Q340 280 320 370 Q280 460 250 470 Q220 400 240 310 Z"
          fill="url(#dot-pattern)"
        />
        {/* Europe */}
        <path
          d="M450 70 Q560 60 580 130 Q510 170 460 150 Q430 110 450 70 Z"
          fill="url(#dot-pattern)"
        />
        {/* Africa */}
        <path
          d="M460 170 Q580 170 590 270 Q560 380 500 400 Q450 340 440 250 Z"
          fill="url(#dot-pattern)"
        />
        {/* Asia */}
        <path
          d="M590 60 Q820 40 880 150 Q850 260 700 270 Q600 220 590 120 Z"
          fill="url(#dot-pattern)"
        />
        {/* Australia */}
        <path
          d="M780 320 Q870 310 880 380 Q840 430 780 420 Q750 360 780 320 Z"
          fill="url(#dot-pattern)"
        />

        {/* Dynamic connection arcs */}
        <path
          d="M240 160 Q450 60 750 160"
          stroke="url(#arc-gradient)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.4"
        />
        <path
          d="M280 180 Q400 300 520 220"
          stroke="url(#arc-gradient)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.35"
        />

        <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF684F" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#292522" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF684F" stopOpacity="0.8" />
        </linearGradient>

        {/* Global Remote Hub Pulse Points */}
        <g className="animate-pulse-dot">
          <circle cx="230" cy="150" r="4.5" fill="#FF684F" />
          <circle cx="230" cy="150" r="9" stroke="#FF684F" strokeWidth="1" opacity="0.4" />
        </g>
        <g className="animate-pulse-dot" style={{ animationDelay: '0.8s' }}>
          <circle cx="510" cy="130" r="4.5" fill="#FF684F" />
          <circle cx="510" cy="130" r="9" stroke="#FF684F" strokeWidth="1" opacity="0.4" />
        </g>
        <g className="animate-pulse-dot" style={{ animationDelay: '1.4s' }}>
          <circle cx="730" cy="180" r="4.5" fill="#FF684F" />
          <circle cx="730" cy="180" r="9" stroke="#FF684F" strokeWidth="1" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}
