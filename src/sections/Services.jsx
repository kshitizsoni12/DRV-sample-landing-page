import React, { useRef, useState, useEffect } from 'react';
import SectionBadge from '../components/SectionBadge';
import { servicesContent } from '../data/siteContent';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// BESPOKE ART-DIRECTED SVG ILLUSTRATIONS & ICONS FOR THE 4 SERVICE STAGES
// =========================================================================

// Stage 1: Business Operations Icon & Blueprint Schematic
function OperationsIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M20 40H14C11.7909 40 10 38.2091 10 36V34C10 30 13 28 16 27V23C16 17.4772 20.4772 13 26 13C31.5228 13 36 17.4772 36 23C36 28 32.5 32 29 33.5V36C29 38.2091 27.2091 40 25 40H20Z"
        stroke="var(--color-coral)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="23" cy="21" r="2.2" fill="var(--color-coral)" />
      <circle cx="29" cy="22" r="2.2" fill="var(--color-coral)" />
      <circle cx="26" cy="27" r="2.2" fill="var(--color-coral)" />
      <circle cx="20" cy="29" r="2.2" fill="var(--color-coral)" />
      <path d="M23 21L29 22M23 21L20 29M29 22L26 27M26 27L20 29" stroke="var(--color-coral)" strokeWidth="1.6" />
    </svg>
  );
}

function OperationsSchematic() {
  return (
    <svg className="spotlight-graphic" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Concentric Blueprint Rings */}
      <circle cx="160" cy="120" r="95" stroke="rgba(41, 37, 34, 0.08)" strokeDasharray="3 6" />
      <circle cx="160" cy="120" r="68" stroke="rgba(255, 104, 79, 0.16)" strokeDasharray="4 8" />
      <circle cx="160" cy="120" r="40" stroke="rgba(41, 37, 34, 0.12)" />

      {/* Axis Guidelines & Crosshairs */}
      <line x1="160" y1="15" x2="160" y2="225" stroke="rgba(41, 37, 34, 0.06)" />
      <line x1="25" y1="120" x2="295" y2="120" stroke="rgba(41, 37, 34, 0.06)" />

      {/* Pipeline Conduits with animated coral dashes */}
      <path
        d="M60 70H120L160 120H240"
        stroke="rgba(41, 37, 34, 0.2)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M60 70H120L160 120H240"
        stroke="var(--color-coral)"
        strokeWidth="2"
        strokeDasharray="12 120"
        className="svg-flow-fast"
        fill="none"
      />
      <path
        d="M80 170H140L160 120H260"
        stroke="rgba(41, 37, 34, 0.2)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M80 170H140L160 120H260"
        stroke="var(--color-coral)"
        strokeWidth="2"
        strokeDasharray="14 140"
        className="svg-flow-slow"
        fill="none"
      />

      {/* Process Nodes */}
      <circle cx="60" cy="70" r="4.5" fill="var(--color-warm-ivory)" stroke="var(--color-coral)" strokeWidth="2" />
      <circle cx="160" cy="120" r="6" fill="var(--color-coral)" />
      <circle cx="160" cy="120" r="10" stroke="var(--color-coral)" strokeWidth="1.5" opacity="0.4" />
      <circle cx="240" cy="120" r="4.5" fill="var(--color-warm-ivory)" stroke="var(--color-charcoal)" strokeWidth="2" />
      <circle cx="80" cy="170" r="4.5" fill="var(--color-warm-ivory)" stroke="var(--color-coral)" strokeWidth="2" />

      {/* Technical Ticks & Micro-labels */}
      <text x="60" y="56" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-heading)" letterSpacing="0.08em">FLOW // INPUT</text>
      <text x="175" y="115" fill="var(--color-coral)" fontSize="9" fontFamily="var(--font-heading)" fontWeight="700" letterSpacing="0.08em">SYNC 99.8%</text>
      <text x="210" y="140" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-heading)" letterSpacing="0.08em">SYSTEMS // OPTIMIZED</text>
    </svg>
  );
}

// Stage 2: Customer & Revenue Icon & Radar Waveform
function CustomerIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 24C12 17.3726 17.3726 12 24 12C30.6274 12 36 17.3726 36 24V28C36 30.2091 34.2091 32 32 32H31V24H36"
        stroke="var(--color-coral)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="10" y="24" width="5" height="9" rx="2" fill="var(--color-coral)" />
      <rect x="33" y="24" width="5" height="9" rx="2" fill="var(--color-coral)" />
      <path d="M15 32V35C15 37.2091 16.7909 39 19 39H26" stroke="var(--color-coral)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="39" r="2.5" fill="var(--color-coral)" />
      {/* Soundwaves */}
      <path d="M40 18C42 20 43 22 43 24C43 26 42 28 40 30" stroke="var(--color-coral)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 18C6 20 5 22 5 24C5 26 6 28 8 30" stroke="var(--color-coral)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CustomerSchematic() {
  return (
    <svg className="spotlight-graphic" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Concentric Radar Rings */}
      <circle cx="160" cy="120" r="95" stroke="rgba(41, 37, 34, 0.08)" />
      <circle cx="160" cy="120" r="70" stroke="rgba(255, 104, 79, 0.14)" />
      <circle cx="160" cy="120" r="45" stroke="rgba(41, 37, 34, 0.1)" strokeDasharray="3 5" />
      <circle cx="160" cy="120" r="20" stroke="var(--color-coral)" strokeWidth="1.5" />

      {/* Sweeping Radar Scanner Line */}
      <g className="svg-radar-sweep">
        <line x1="160" y1="120" x2="245" y2="70" stroke="var(--color-coral)" strokeWidth="2" strokeLinecap="round" />
        <path d="M160 120 L245 70 A95 95 0 0 0 220 45 Z" fill="rgba(255, 104, 79, 0.12)" />
      </g>

      {/* Audio Waveform Arc */}
      <path
        d="M45 155 Q 85 90, 125 155 T 205 155 T 285 155"
        stroke="rgba(41, 37, 34, 0.18)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M45 155 Q 85 90, 125 155 T 205 155 T 285 155"
        stroke="var(--color-coral)"
        strokeWidth="2"
        strokeDasharray="16 160"
        className="svg-flow-fast"
        fill="none"
      />

      {/* Interactive Communication Nodes */}
      <circle cx="125" cy="155" r="4.5" fill="var(--color-warm-ivory)" stroke="var(--color-coral)" strokeWidth="2" />
      <circle cx="205" cy="155" r="4.5" fill="var(--color-warm-ivory)" stroke="var(--color-coral)" strokeWidth="2" />
      <circle cx="230" cy="80" r="3.5" fill="var(--color-coral)" />

      {/* Metric Callouts */}
      <text x="45" y="45" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-heading)" letterSpacing="0.08em">COVERAGE // 24/7/365</text>
      <text x="45" y="60" fill="var(--color-coral)" fontSize="10" fontFamily="var(--font-heading)" fontWeight="700">RESPONSE &lt; 60s</text>
      <text x="180" y="210" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-heading)" letterSpacing="0.08em">CSAT // 99.4% SATISFACTION</text>
    </svg>
  );
}

// Stage 3: Growth Support Icon & Trajectory Schematic
function GrowthIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 38H38" stroke="var(--color-charcoal)" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 38V10" stroke="var(--color-charcoal)" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M14 32L23 23L29 29L38 16"
        stroke="var(--color-coral)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M30 16H38V24" stroke="var(--color-coral)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23" cy="23" r="2.5" fill="var(--color-coral)" />
      <circle cx="29" cy="29" r="2.5" fill="var(--color-coral)" />
      <circle cx="38" cy="16" r="3.5" fill="var(--color-coral)" />
    </svg>
  );
}

function GrowthSchematic() {
  return (
    <svg className="spotlight-graphic" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Coordinate Grid Plane */}
      <line x1="50" y1="190" x2="280" y2="190" stroke="rgba(41, 37, 34, 0.2)" strokeWidth="1.5" />
      <line x1="50" y1="30" x2="50" y2="190" stroke="rgba(41, 37, 34, 0.2)" strokeWidth="1.5" />

      {/* Grid lines */}
      <line x1="50" y1="145" x2="280" y2="145" stroke="rgba(41, 37, 34, 0.06)" strokeDasharray="2 4" />
      <line x1="50" y1="100" x2="280" y2="100" stroke="rgba(41, 37, 34, 0.06)" strokeDasharray="2 4" />
      <line x1="50" y1="55" x2="280" y2="55" stroke="rgba(41, 37, 34, 0.06)" strokeDasharray="2 4" />

      <line x1="110" y1="30" x2="110" y2="190" stroke="rgba(41, 37, 34, 0.06)" strokeDasharray="2 4" />
      <line x1="170" y1="30" x2="170" y2="190" stroke="rgba(41, 37, 34, 0.06)" strokeDasharray="2 4" />
      <line x1="230" y1="30" x2="230" y2="190" stroke="rgba(41, 37, 34, 0.06)" strokeDasharray="2 4" />

      {/* Ascending Exponential Curve */}
      <path
        d="M50 180 C 110 178, 160 145, 200 95 C 230 55, 255 42, 275 36"
        stroke="rgba(41, 37, 34, 0.2)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M50 180 C 110 178, 160 145, 200 95 C 230 55, 255 42, 275 36"
        stroke="var(--color-coral)"
        strokeWidth="2.5"
        strokeDasharray="20 220"
        className="svg-flow-fast"
        fill="none"
      />

      {/* Area Gradient under curve */}
      <path
        d="M50 180 C 110 178, 160 145, 200 95 C 230 55, 255 42, 275 36 L 275 190 L 50 190 Z"
        fill="url(#growthAreaGrad)"
        opacity="0.1"
      />
      <defs>
        <linearGradient id="growthAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-coral)" />
          <stop offset="100%" stopColor="var(--color-warm-ivory)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Milestone Checkpoints */}
      <circle cx="120" cy="165" r="4" fill="var(--color-warm-ivory)" stroke="var(--color-coral)" strokeWidth="2" />
      <circle cx="185" cy="115" r="4.5" fill="var(--color-warm-ivory)" stroke="var(--color-coral)" strokeWidth="2" />
      <circle cx="250" cy="48" r="6" fill="var(--color-coral)" />
      <circle cx="250" cy="48" r="10" stroke="var(--color-coral)" strokeWidth="1.5" opacity="0.4" />

      {/* Labels */}
      <text x="60" y="210" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-heading)" letterSpacing="0.08em">SCALE // REPEATABLE</text>
      <text x="175" y="80" fill="var(--color-coral)" fontSize="10" fontFamily="var(--font-heading)" fontWeight="700">VELOCITY +3.4X</text>
      <text x="180" y="210" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-heading)" letterSpacing="0.08em">BANDWIDTH // ON-DEMAND</text>
    </svg>
  );
}

// Stage 4: Specialized Team Icon & Constellation Schematic
function SpecializedIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Central Hexagon Shield */}
      <path
        d="M24 10L36 17V31L24 38L12 31V17L24 10Z"
        stroke="var(--color-coral)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="3.5" fill="var(--color-coral)" />
      {/* Peripheral Vertices */}
      <circle cx="24" cy="10" r="2.5" fill="var(--color-charcoal)" />
      <circle cx="36" cy="17" r="2.5" fill="var(--color-charcoal)" />
      <circle cx="36" cy="31" r="2.5" fill="var(--color-charcoal)" />
      <circle cx="24" cy="38" r="2.5" fill="var(--color-charcoal)" />
      <circle cx="12" cy="31" r="2.5" fill="var(--color-charcoal)" />
      <circle cx="12" cy="17" r="2.5" fill="var(--color-charcoal)" />
      <path d="M24 24L24 10M24 24L36 17M24 24L36 31M24 24L24 38M24 24L12 31M24 24L12 17" stroke="rgba(255, 104, 79, 0.4)" strokeWidth="1.5" />
    </svg>
  );
}

function SpecializedSchematic() {
  return (
    <svg className="spotlight-graphic" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Constellation Ring Orbit */}
      <circle cx="160" cy="120" r="85" stroke="rgba(41, 37, 34, 0.08)" strokeDasharray="3 6" />
      <circle cx="160" cy="120" r="50" stroke="rgba(255, 104, 79, 0.16)" />

      {/* Hexagonal Core Framework */}
      <path
        d="M160 70L205 95V145L160 170L115 145V95L160 70Z"
        stroke="rgba(41, 37, 34, 0.2)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M160 70L205 95V145L160 170L115 145V95L160 70Z"
        stroke="var(--color-coral)"
        strokeWidth="2"
        strokeDasharray="24 180"
        className="svg-flow-slow"
        fill="none"
      />

      {/* Central Star Core */}
      <circle cx="160" cy="120" r="7" fill="var(--color-coral)" />
      <circle cx="160" cy="120" r="13" stroke="var(--color-coral)" strokeWidth="1.5" opacity="0.4" />

      {/* Orbiting Specialist Nodes */}
      <g className="svg-orbit-constellation">
        <circle cx="160" cy="35" r="5" fill="var(--color-warm-ivory)" stroke="var(--color-coral)" strokeWidth="2" />
        <circle cx="235" cy="78" r="4.5" fill="var(--color-charcoal)" />
        <circle cx="235" cy="162" r="5" fill="var(--color-warm-ivory)" stroke="var(--color-coral)" strokeWidth="2" />
        <circle cx="160" cy="205" r="4.5" fill="var(--color-charcoal)" />
        <circle cx="85" cy="162" r="5" fill="var(--color-warm-ivory)" stroke="var(--color-coral)" strokeWidth="2" />
        <circle cx="85" cy="78" r="4.5" fill="var(--color-charcoal)" />
      </g>

      {/* Connecting Rays */}
      <line x1="160" y1="120" x2="160" y2="70" stroke="rgba(255, 104, 79, 0.4)" strokeWidth="1.2" />
      <line x1="160" y1="120" x2="205" y2="145" stroke="rgba(255, 104, 79, 0.4)" strokeWidth="1.2" />
      <line x1="160" y1="120" x2="115" y2="145" stroke="rgba(255, 104, 79, 0.4)" strokeWidth="1.2" />

      {/* Labels */}
      <text x="35" y="45" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-heading)" letterSpacing="0.08em">DOMAIN // BESPOKE</text>
      <text x="185" y="105" fill="var(--color-coral)" fontSize="10" fontFamily="var(--font-heading)" fontWeight="700">ONBOARDING &lt; 48H</text>
      <text x="180" y="215" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-heading)" letterSpacing="0.08em">MANAGEMENT // INCLUDED</text>
    </svg>
  );
}

// Stage Metadata Configuration
const STAGE_CONFIG = [
  {
    badge: 'CORE OPERATIONS & DATA',
    tagline: 'Precision operations and streamlined back-office workflows.',
    icon: <OperationsIcon />,
    schematic: <OperationsSchematic />,
    subtitle: 'Back-Office & Administration',
  },
  {
    badge: 'OMNICHANNEL RETENTION',
    tagline: 'High-touch customer care and revenue lifecycle management.',
    icon: <CustomerIcon />,
    schematic: <CustomerSchematic />,
    subtitle: 'Support & Revenue Growth',
  },
  {
    badge: 'SCALING & PIPELINE',
    tagline: 'On-demand execution capacity to accelerate business expansion.',
    icon: <GrowthIcon />,
    schematic: <GrowthSchematic />,
    subtitle: 'Capacity & Velocity Scaling',
  },
  {
    badge: 'DOMAIN EXPERTISE',
    tagline: 'Customized talent and technical specialists for distinct business verticals.',
    icon: <SpecializedIcon />,
    schematic: <SpecializedSchematic />,
    subtitle: 'Dedicated Vertical Experts',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const pinnedContainerRef = useRef(null);
  const stagePanelsRef = useRef([]);
  const progressBarsRef = useRef([]);

  const [activeStage, setActiveStage] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // GSAP Master ScrollTrigger Pinned Timeline (Desktop >= 1024px)
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const panels = stagePanelsRef.current;
        const bars = progressBarsRef.current;
        if (!panels || panels.length < 4) return;

        // Initial setup of stage panels
        gsap.set(panels[0], { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' });
        gsap.set([panels[1], panels[2], panels[3]], {
          opacity: 0,
          y: 35,
          scale: 0.98,
          pointerEvents: 'none',
        });

        // Initialize progress bars
        if (bars[0]) gsap.set(bars[0], { scaleX: 1 });
        if (bars[1]) gsap.set(bars[1], { scaleX: 0 });
        if (bars[2]) gsap.set(bars[2], { scaleX: 0 });
        if (bars[3]) gsap.set(bars[3], { scaleX: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: 'top 12%',
            end: '+=2000',
            pin: pinnedContainerRef.current,
            scrub: 0.65,
            anticipatePin: 1,
            onUpdate: (self) => {
              // Derive current active stage based on scroll progress
              const p = self.progress;
              let current = 0;
              if (p >= 0.75) current = 3;
              else if (p >= 0.48) current = 2;
              else if (p >= 0.22) current = 1;
              setActiveStage(current);
            },
          },
        });

        // STAGE 0 -> STAGE 1 Transition (progress 0.0 -> 0.33)
        tl.to(bars[0], { scaleX: 1, ease: 'none', duration: 0.25 })
          .to(
            panels[0],
            {
              opacity: 0,
              y: -30,
              scale: 0.98,
              pointerEvents: 'none',
              ease: 'power2.inOut',
              duration: 0.35,
            },
            '+=0.1'
          )
          .to(
            panels[1],
            {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: 'auto',
              ease: 'power2.out',
              duration: 0.35,
            },
            '<'
          )
          .to(bars[1], { scaleX: 1, ease: 'none', duration: 0.35 }, '<');

        // STAGE 1 -> STAGE 2 Transition (progress 0.33 -> 0.66)
        tl.to(
          panels[1],
          {
            opacity: 0,
            y: -30,
            scale: 0.98,
            pointerEvents: 'none',
            ease: 'power2.inOut',
            duration: 0.35,
          },
          '+=0.3'
        )
          .to(
            panels[2],
            {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: 'auto',
              ease: 'power2.out',
              duration: 0.35,
            },
            '<'
          )
          .to(bars[2], { scaleX: 1, ease: 'none', duration: 0.35 }, '<');

        // STAGE 2 -> STAGE 3 Transition (progress 0.66 -> 1.0)
        tl.to(
          panels[2],
          {
            opacity: 0,
            y: -30,
            scale: 0.98,
            pointerEvents: 'none',
            ease: 'power2.inOut',
            duration: 0.35,
          },
          '+=0.3'
        )
          .to(
            panels[3],
            {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: 'auto',
              ease: 'power2.out',
              duration: 0.35,
            },
            '<'
          )
          .to(bars[3], { scaleX: 1, ease: 'none', duration: 0.35 }, '<')
          .to({}, { duration: 0.25 }); // Calm buffer before unpinning
      });

      // Mobile / Tablet fallback entrance animations
      mm.add('(max-width: 1023px)', () => {
        gsap.from('.service-mobile-card', {
          y: 35,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  // Click-to-stage smooth scroll handler
  const handleNavClick = (stageIndex) => {
    if (window.innerWidth < 1024 || prefersReducedMotion) return;

    const st = ScrollTrigger.getAll().find(
      (s) => s.trigger === pinWrapperRef.current
    );
    if (!st) return;

    // Map stage 0, 1, 2, 3 to target progress
    const stageRatios = [0.02, 0.38, 0.68, 0.98];
    const targetScroll = st.start + (st.end - st.start) * stageRatios[stageIndex];

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { duration: 1.1 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const categories = servicesContent.categories;

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        backgroundColor: '#F3EFEA',
        paddingTop: '90px',
        paddingBottom: '110px',
        position: 'relative',
        zIndex: 2,
        scrollMarginTop: '90px',
      }}
      aria-label="Services We Offer"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '52px', maxWidth: '640px' }}>
          <SectionBadge id="services-badge">{servicesContent.badge}</SectionBadge>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              fontWeight: 700,
              color: 'var(--color-charcoal)',
              lineHeight: 1.15,
              marginTop: '16px',
              marginBottom: '14px',
              letterSpacing: '-0.03em',
            }}
          >
            {servicesContent.titlePrefix}{' '}
            <span style={{ color: 'var(--color-coral)' }}>{servicesContent.titleHighlight}</span>
          </h2>

          <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            {servicesContent.subtitle}
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP STICKY SPOTLIGHT CONTAINER (>= 1024px) */}
        {/* ======================================================== */}
        <div ref={pinWrapperRef} className="services-desktop-wrapper">
          <div ref={pinnedContainerRef} className="services-pinned-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '360px 1fr',
                gap: '48px',
                alignItems: 'start',
              }}
              className="services-spotlight-grid"
            >
              {/* Left Column: Vertical Category Navigation & Progress Track */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  paddingTop: '12px',
                }}
                className="services-nav-track"
                role="tablist"
                aria-label="Service Categories"
              >
                {categories.map((cat, idx) => {
                  const isActive = activeStage === idx;
                  const config = STAGE_CONFIG[idx];

                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleNavClick(idx)}
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={0}
                      style={{
                        textAlign: 'left',
                        padding: '20px 22px',
                        borderRadius: '16px',
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)',
                        border: isActive
                          ? '1px solid rgba(255, 104, 79, 0.35)'
                          : '1px solid rgba(41, 37, 34, 0.05)',
                        boxShadow: isActive
                          ? '0 10px 30px -8px rgba(255, 104, 79, 0.15), 0 4px 12px rgba(41, 37, 34, 0.03)'
                          : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.25, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        outline: 'none',
                      }}
                      className="services-nav-btn"
                    >
                      {/* Synchronized Coral Progress Indicator Line */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          backgroundColor: 'rgba(41, 37, 34, 0.06)',
                        }}
                      >
                        <div
                          ref={(el) => (progressBarsRef.current[idx] = el)}
                          style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'var(--color-coral)',
                            transformOrigin: 'left center',
                            transform: prefersReducedMotion
                              ? isActive
                                ? 'scaleX(1)'
                                : 'scaleX(0)'
                              : 'scaleX(0)',
                          }}
                        />
                      </div>

                      {/* Header row: Index & Active Badge */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '6px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            color: isActive ? 'var(--color-coral)' : 'var(--color-text-muted)',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          0{idx + 1}
                        </span>

                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 600,
                            color: isActive ? 'var(--color-coral)' : 'transparent',
                            letterSpacing: '0.04em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {isActive && (
                            <>
                              <span
                                style={{
                                  width: '5px',
                                  height: '5px',
                                  borderRadius: '50%',
                                  backgroundColor: 'var(--color-coral)',
                                  boxShadow: '0 0 6px var(--color-coral)',
                                }}
                              />
                              ACTIVE
                            </>
                          )}
                        </span>
                      </div>

                      {/* Category Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--color-charcoal)',
                          letterSpacing: '-0.015em',
                          marginBottom: '4px',
                        }}
                      >
                        {cat.title}
                      </h3>

                      {/* Category Subtitle */}
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--color-text-muted)',
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {config.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Large Interactive Service Showcase Panel */}
              <div
                style={{
                  position: 'relative',
                  minHeight: '520px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid rgba(41, 37, 34, 0.08)',
                  boxShadow: '0 24px 60px -15px rgba(41, 37, 34, 0.08), 0 4px 16px rgba(41, 37, 34, 0.02)',
                  overflow: 'hidden',
                }}
                className="services-spotlight-card"
              >
                {/* Decorative Signature Quadrant Arc (Reference Design Motif) */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-45px',
                    right: '-45px',
                    width: '180px',
                    height: '180px',
                    border: '1.5px solid rgba(255, 104, 79, 0.28)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                  aria-hidden="true"
                />

                {/* 4 Stacked Stage Panels */}
                {categories.map((cat, idx) => {
                  const config = STAGE_CONFIG[idx];

                  return (
                    <div
                      key={cat.id}
                      ref={(el) => (stagePanelsRef.current[idx] = el)}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        padding: '44px 48px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        zIndex: 1,
                        opacity: prefersReducedMotion ? (activeStage === idx ? 1 : 0) : idx === 0 ? 1 : 0,
                        pointerEvents: prefersReducedMotion ? (activeStage === idx ? 'auto' : 'none') : idx === 0 ? 'auto' : 'none',
                      }}
                      className="services-stage-panel"
                    >
                      {/* Top Bar of Stage */}
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '28px',
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-block',
                              fontFamily: 'var(--font-heading)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              color: 'var(--color-coral)',
                              backgroundColor: 'rgba(255, 104, 79, 0.08)',
                              padding: '5px 14px',
                              borderRadius: '9999px',
                              border: '1px solid rgba(255, 104, 79, 0.2)',
                            }}
                          >
                            {config.badge}
                          </span>

                          <div
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              color: 'var(--color-text-muted)',
                              letterSpacing: '0.04em',
                            }}
                          >
                            STAGE 0{idx + 1} / 04
                          </div>
                        </div>

                        {/* Main Stage Grid: Details on Left, Art-Directed SVG Schematic on Right */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1.1fr 1fr',
                            gap: '40px',
                            alignItems: 'center',
                          }}
                        >
                          {/* Left Half: Icon, Title, and Bullets */}
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
                              <div
                                style={{
                                  width: '56px',
                                  height: '56px',
                                  borderRadius: '16px',
                                  backgroundColor: 'rgba(255, 104, 79, 0.08)',
                                  border: '1px solid rgba(255, 104, 79, 0.2)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                {config.icon}
                              </div>

                              <div>
                                <h3
                                  style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.6rem, 2.2vw, 2.1rem)',
                                    fontWeight: 700,
                                    color: 'var(--color-charcoal)',
                                    letterSpacing: '-0.025em',
                                    margin: 0,
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {cat.title}
                                </h3>
                                <p
                                  style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-muted)',
                                    margin: '4px 0 0 0',
                                  }}
                                >
                                  {config.tagline}
                                </p>
                              </div>
                            </div>

                            {/* Exact Bullet Points List */}
                            <ul
                              style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: '24px 0 0 0',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                              }}
                            >
                              {cat.items.map((item, itemIdx) => (
                                <li
                                  key={itemIdx}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    fontSize: '0.98rem',
                                    color: 'var(--color-charcoal)',
                                    fontWeight: 500,
                                  }}
                                >
                                  <span
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '50%',
                                      backgroundColor: 'rgba(255, 104, 79, 0.1)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: 'var(--color-coral)',
                                      flexShrink: 0,
                                    }}
                                    aria-hidden="true"
                                  >
                                    <Check size={12} strokeWidth={3} />
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Right Half: Art-Directed Architectural SVG Schematic */}
                          <div
                            style={{
                              position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'rgba(247, 243, 240, 0.55)',
                              borderRadius: '20px',
                              border: '1px solid rgba(41, 37, 34, 0.05)',
                              padding: '24px',
                              minHeight: '270px',
                            }}
                          >
                            {/* Watermark Index Numeral in Background */}
                            <div
                              style={{
                                position: 'absolute',
                                right: '16px',
                                bottom: '8px',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '6rem',
                                fontWeight: 800,
                                lineHeight: 1,
                                color: 'transparent',
                                WebkitTextStroke: '1px rgba(41, 37, 34, 0.06)',
                                pointerEvents: 'none',
                                userSelect: 'none',
                              }}
                              aria-hidden="true"
                            >
                              0{idx + 1}
                            </div>

                            {/* Render bespoke SVG graphic */}
                            {config.schematic}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Footer Row of Spotlight Card */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '20px',
                          borderTop: '1px solid rgba(41, 37, 34, 0.06)',
                          marginTop: '20px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--color-coral)',
                              boxShadow: '0 0 8px var(--color-coral)',
                            }}
                          />
                          <span
                            style={{
                              fontSize: '0.82rem',
                              fontFamily: 'var(--font-heading)',
                              fontWeight: 600,
                              color: 'var(--color-text-muted)',
                              letterSpacing: '0.04em',
                            }}
                          >
                            SCROLL DOWN TO ADVANCE
                          </span>
                        </div>

                        <a
                          href="#pricing"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.85rem',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            color: 'var(--color-coral)',
                            textDecoration: 'none',
                            letterSpacing: '0.02em',
                          }}
                        >
                          <span>Explore Tier Pricing</span>
                          <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE RESPONSIVE STACKED ARCHITECTURE (< 1024px) */}
        {/* ======================================================== */}
        <div className="services-mobile-wrapper" style={{ display: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {categories.map((cat, idx) => {
              const config = STAGE_CONFIG[idx];

              return (
                <div
                  key={cat.id}
                  className="service-mobile-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '32px 28px',
                    border: '1px solid rgba(41, 37, 34, 0.08)',
                    boxShadow: '0 8px 30px rgba(41, 37, 34, 0.04)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Decorative curved quadrant arc */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-30px',
                      right: '-30px',
                      width: '120px',
                      height: '120px',
                      border: '1.5px solid rgba(255, 104, 79, 0.28)',
                      borderRadius: '50%',
                      pointerEvents: 'none',
                    }}
                    aria-hidden="true"
                  />

                  {/* Header Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(255, 104, 79, 0.08)',
                        border: '1px solid rgba(255, 104, 79, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {config.icon}
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--color-coral)',
                        backgroundColor: 'rgba(255, 104, 79, 0.08)',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                      }}
                    >
                      0{idx + 1} // 04
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: 'var(--color-charcoal)',
                      letterSpacing: '-0.02em',
                      marginBottom: '6px',
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      marginBottom: '20px',
                    }}
                  >
                    {config.tagline}
                  </p>

                  {/* Bullets List */}
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 24px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    {cat.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.925rem',
                          color: 'var(--color-charcoal)',
                        }}
                      >
                        <span
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 104, 79, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-coral)',
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        >
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Mobile Compact Schematic */}
                  <div
                    style={{
                      backgroundColor: 'rgba(247, 243, 240, 0.55)',
                      borderRadius: '16px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {config.schematic}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        /* Animated SVG flow lines */
        @keyframes flowDash {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -140;
          }
        }
        @keyframes flowDashSlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -180;
          }
        }
        @keyframes radarRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes constellationOrbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .svg-flow-fast {
          animation: flowDash 3.5s linear infinite;
        }
        .svg-flow-slow {
          animation: flowDashSlow 5s linear infinite;
        }
        .svg-radar-sweep {
          transform-origin: 160px 120px;
          animation: radarRotate 6s linear infinite;
        }
        .svg-orbit-constellation {
          transform-origin: 160px 120px;
          animation: constellationOrbit 20s linear infinite;
        }

        .spotlight-graphic {
          width: 100%;
          max-width: 320px;
          height: auto;
          display: block;
        }

        .services-nav-btn:hover {
          background-color: rgba(255, 255, 255, 0.85) !important;
          transform: translateX(4px);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1023px) {
          .services-desktop-wrapper {
            display: none !important;
          }
          .services-mobile-wrapper {
            display: block !important;
          }
        }

        @media (min-width: 1024px) {
          .services-mobile-wrapper {
            display: none !important;
          }
          .services-desktop-wrapper {
            display: block !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .svg-flow-fast,
          .svg-flow-slow,
          .svg-radar-sweep,
          .svg-orbit-constellation {
            animation: none !important;
          }
          .services-stage-panel {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
