import React, { useState, useRef, useEffect, useCallback } from 'react';
import { whyDrvContent } from '../data/siteContent';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ShieldCheck, TrendingUp, UserCheck, Sparkles, Globe2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Curated icons complementing the six core benefits
const BENEFIT_ICONS = [
  <ShieldCheck size={18} key="icon-0" />,
  <CheckCircle2 size={18} key="icon-1" />,
  <TrendingUp size={18} key="icon-2" />,
  <UserCheck size={18} key="icon-3" />,
  <Sparkles size={18} key="icon-4" />,
  <Globe2 size={18} key="icon-5" />,
];

// Reaction offsets for central portrait when hovering benefits
const PORTRAIT_REACTIONS = [
  { x: -8, y: -6, rotate: -0.7, scale: 1.025 }, // 0: Dedicated Teams (Left Top)
  { x: -10, y: 0, rotate: -0.4, scale: 1.025 },  // 1: Trained & Supervised (Left Mid)
  { x: -8, y: 6, rotate: 0.5, scale: 1.025 },    // 2: Flexible Scaling (Left Bot)
  { x: 8, y: -6, rotate: 0.7, scale: 1.025 },    // 3: Single Point of Contact (Right Top)
  { x: 10, y: 0, rotate: 0.4, scale: 1.025 },    // 4: Get Inspired Weekly (Right Mid)
  { x: 8, y: 6, rotate: -0.5, scale: 1.025 },    // 5: Global Support (Right Bot)
];

export default function WhyDRV() {
  const sectionRef = useRef(null);
  const networkContainerRef = useRef(null);
  const portraitWrapperRef = useRef(null);
  const portraitImgRef = useRef(null);
  const markerRefs = useRef([]);

  const [activeBenefit, setActiveBenefit] = useState(null);
  const [paths, setPaths] = useState([]);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Listen for reduced motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Compute curved SVG connector paths linking each benefit marker to portrait orbit
  const computeConnectorPaths = useCallback(() => {
    const container = networkContainerRef.current;
    const portrait = portraitWrapperRef.current;
    if (!container || !portrait) return;

    const containerRect = container.getBoundingClientRect();
    const portraitRect = portrait.getBoundingClientRect();

    // Disable desktop SVG curved lines below tablet breakpoint
    if (window.innerWidth < 1024) {
      setPaths([]);
      return;
    }

    const pCenterY = portraitRect.top + portraitRect.height / 2 - containerRect.top;

    // Six connection hubs situated along the portrait rim
    const hubTargets = [
      { x: portraitRect.left - containerRect.left + 22, y: pCenterY - portraitRect.height * 0.22 }, // 0: Left Top
      { x: portraitRect.left - containerRect.left + 8, y: pCenterY },                              // 1: Left Mid
      { x: portraitRect.left - containerRect.left + 22, y: pCenterY + portraitRect.height * 0.22 }, // 2: Left Bot
      { x: portraitRect.right - containerRect.left - 22, y: pCenterY - portraitRect.height * 0.22 },// 3: Right Top
      { x: portraitRect.right - containerRect.left - 8, y: pCenterY },                              // 4: Right Mid
      { x: portraitRect.right - containerRect.left - 22, y: pCenterY + portraitRect.height * 0.22 },// 5: Right Bot
    ];

    const computed = [];
    for (let i = 0; i < 6; i++) {
      const marker = markerRefs.current[i];
      if (!marker) continue;

      const mRect = marker.getBoundingClientRect();
      const startX = mRect.left + mRect.width / 2 - containerRect.left;
      const startY = mRect.top + mRect.height / 2 - containerRect.top;
      const target = hubTargets[i];

      const isLeft = i < 3;
      let cp1X, cp1Y, cp2X, cp2Y;

      if (isLeft) {
        const dx = target.x - startX;
        cp1X = startX + dx * 0.52;
        cp1Y = startY;
        cp2X = target.x - dx * 0.22;
        cp2Y = target.y;
      } else {
        const dx = startX - target.x;
        cp1X = startX - dx * 0.52;
        cp1Y = startY;
        cp2X = target.x + dx * 0.22;
        cp2Y = target.y;
      }

      const d = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${target.x.toFixed(1)} ${target.y.toFixed(1)}`;
      computed.push({
        id: i,
        d,
        startX,
        startY,
        targetX: target.x,
        targetY: target.y,
      });
    }

    setPaths(computed);
  }, []);

  // Update connector paths on layout / resize
  useEffect(() => {
    let rafId = requestAnimationFrame(() => {
      computeConnectorPaths();
    });

    const handleResize = () => computeConnectorPaths();
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', computeConnectorPaths);

    const resizeObserver = new ResizeObserver(() => computeConnectorPaths());
    if (networkContainerRef.current) {
      resizeObserver.observe(networkContainerRef.current);
    }

    const timer = setTimeout(computeConnectorPaths, 120);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', computeConnectorPaths);
      resizeObserver.disconnect();
    };
  }, [computeConnectorPaths]);

  // Entrance Sequence Orchestration with GSAP ScrollTrigger
  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('.why-header-anim, .why-card-left, .why-card-right, .why-portrait-reveal, .why-connector-base', {
          opacity: 1,
          x: 0,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Header fade up
      tl.from('.why-header-anim', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });

      // 2. Central Portrait Reveal using elegant clip mask
      tl.from(
        portraitWrapperRef.current,
        {
          clipPath: 'inset(18% 0% 0% 0%)',
          scale: 1.04,
          opacity: 0,
          duration: 0.85,
          ease: 'power2.out',
        },
        '-=0.35'
      );

      // 3. Staggered reveal of benefit cards
      tl.from(
        '.why-card-left',
        {
          x: -26,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.6'
      );

      tl.from(
        '.why-card-right',
        {
          x: 26,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '<+=0.1'
      );

      // 4. Progressive drawing of SVG connector lines toward portrait
      tl.from(
        '.why-connector-base',
        {
          strokeDashoffset: 420,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.55'
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  // Pointer parallax handler over the section
  const handlePointerMove = (e) => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    setParallax({
      x: Math.max(-1, Math.min(1, relX)) * 6,
      y: Math.max(-1, Math.min(1, relY)) * 4,
    });
  };

  const handlePointerLeave = () => {
    setParallax({ x: 0, y: 0 });
    setActiveBenefit(null);
  };

  // Combine pointer parallax with active benefit response
  const activeReaction = activeBenefit !== null ? PORTRAIT_REACTIONS[activeBenefit] : { x: 0, y: 0, rotate: 0, scale: 1 };
  const combinedPortraitX = parallax.x + activeReaction.x;
  const combinedPortraitY = parallax.y + activeReaction.y;
  const combinedRotate = activeReaction.rotate;
  const combinedScale = activeReaction.scale;

  // Benefits grouped into left and right
  const leftItems = whyDrvContent.leftPoints;
  const rightItems = whyDrvContent.rightPoints;

  return (
    <section
      ref={sectionRef}
      id="about"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        backgroundColor: 'var(--color-warm-ivory)',
        position: 'relative',
        paddingTop: '80px',
        paddingBottom: '120px',
        overflow: 'hidden',
        scrollMarginTop: '90px',
      }}
      aria-label="Why DRV Assistants"
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="why-header-anim" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 4.2vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              marginBottom: '14px',
              lineHeight: 1.15,
            }}
          >
            <span style={{ color: 'var(--color-charcoal)' }}>{whyDrvContent.title}</span>{' '}
            <span style={{ color: 'var(--color-coral)' }}>{whyDrvContent.titleHighlight}</span>
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
              color: 'var(--color-text-muted)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            {whyDrvContent.subtitle}
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP / TABLET INTERACTIVE ORBIT NETWORK (min-width: 1024px) */}
        {/* ======================================================== */}
        <div
          ref={networkContainerRef}
          className="why-network-layout"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {/* Dynamic SVG Connector & Orbit Layer */}
          <svg
            className="why-svg-layer"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1,
            }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="whyPulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-coral)" stopOpacity="0" />
                <stop offset="60%" stopColor="var(--color-coral)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff8570" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Render 6 Curved Connectors and Moving Pulses */}
            {paths.map((p) => {
              const isActive = activeBenefit === p.id;
              const isAnyActive = activeBenefit !== null;
              const isDimmed = isAnyActive && !isActive;

              return (
                <g key={p.id} className="why-connector-group">
                  {/* Base structural connector path */}
                  <path
                    d={p.d}
                    className="why-connector-base"
                    fill="none"
                    stroke={isActive ? 'var(--color-coral)' : 'rgba(41, 37, 34, 0.14)'}
                    strokeWidth={isActive ? 2.4 : 1.5}
                    strokeDasharray="420"
                    strokeDashoffset="0"
                    opacity={isDimmed ? 0.25 : 1}
                    style={{
                      transition: 'stroke 0.35s ease, stroke-width 0.35s ease, opacity 0.35s ease',
                    }}
                  />

                  {/* Flowing coral pulse travelling from card toward central portrait */}
                  <path
                    d={p.d}
                    className={`why-connector-pulse ${isActive ? 'pulse-active' : ''}`}
                    fill="none"
                    stroke="var(--color-coral)"
                    strokeWidth={isActive ? 3 : 2}
                    strokeLinecap="round"
                    strokeDasharray="18 360"
                    opacity={isDimmed ? 0.15 : isActive ? 1 : 0.75}
                    style={{
                      animationDuration: isActive ? '2.2s' : '4.6s',
                      animationDelay: `${p.id * 0.45}s`,
                      filter: isActive ? 'drop-shadow(0 0 6px rgba(255, 104, 79, 0.8))' : 'none',
                    }}
                  />

                  {/* Central Hub Marker on Portrait Orbit */}
                  <circle
                    cx={p.targetX}
                    cy={p.targetY}
                    r={isActive ? 4.5 : 3}
                    fill={isActive ? 'var(--color-coral)' : 'rgba(41, 37, 34, 0.22)'}
                    style={{
                      transition: 'r 0.35s ease, fill 0.35s ease',
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* 3-Column Orbit Architecture: Left 3 | Center Portrait | Right 3 */}
          <div
            className="why-orbit-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr auto 1.05fr',
              alignItems: 'center',
              gap: '36px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Left 3 Benefits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {leftItems.map((point, idx) => {
                const isActive = activeBenefit === idx;
                const isAnyActive = activeBenefit !== null;
                const isDimmed = isAnyActive && !isActive;

                return (
                  <div
                    key={idx}
                    className="why-card-left why-benefit-card"
                    onMouseEnter={() => setActiveBenefit(idx)}
                    onMouseLeave={() => setActiveBenefit(null)}
                    onClick={() => setActiveBenefit(activeBenefit === idx ? null : idx)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveBenefit(activeBenefit === idx ? null : idx);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      padding: '18px 22px',
                      borderRadius: '16px',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.35)',
                      backdropFilter: 'blur(8px)',
                      border: isActive
                        ? '1px solid rgba(255, 104, 79, 0.35)'
                        : '1px solid rgba(255, 255, 255, 0.6)',
                      boxShadow: isActive
                        ? '0 12px 32px -8px rgba(255, 104, 79, 0.16), 0 4px 12px rgba(41, 37, 34, 0.04)'
                        : '0 4px 16px -4px rgba(41, 37, 34, 0.03)',
                      transform: isActive ? 'translateY(-3px)' : 'none',
                      opacity: isDimmed ? 0.75 : 1,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.25, 1)',
                      outline: 'none',
                    }}
                  >
                    {/* Text Details */}
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span
                          style={{
                            color: isActive ? 'var(--color-coral)' : 'var(--color-text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {BENEFIT_ICONS[idx]}
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'var(--color-charcoal)',
                            letterSpacing: '-0.015em',
                            margin: 0,
                          }}
                        >
                          {point.title}
                        </h3>
                      </div>
                      <p
                        style={{
                          fontSize: '0.925rem',
                          color: 'var(--color-text-muted)',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {point.description}
                      </p>
                    </div>

                    {/* Anchor Marker Dot on Right Edge (connecting to SVG path) */}
                    <div
                      ref={(el) => (markerRefs.current[idx] = el)}
                      style={{
                        width: isActive ? '12px' : '9px',
                        height: isActive ? '12px' : '9px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'var(--color-coral)' : 'var(--color-warm-ivory)',
                        border: isActive ? '2px solid var(--color-coral)' : '2px solid rgba(41, 37, 34, 0.25)',
                        boxShadow: isActive ? '0 0 10px rgba(255, 104, 79, 0.7)' : 'none',
                        flexShrink: 0,
                        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.25, 1)',
                      }}
                      aria-hidden="true"
                    />
                  </div>
                );
              })}
            </div>

            {/* Central Customer-Support Portrait (The Visual Heart) */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '320px',
                maxWidth: '380px',
              }}
              className="why-center-wrapper"
            >
              {/* Soft Warm Coral/Ivory Radial Aura */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 104, 79, 0.14) 0%, rgba(247, 243, 240, 0) 72%)',
                  filter: 'blur(45px)',
                  zIndex: 0,
                  pointerEvents: 'none',
                  transform: `translate3d(${-parallax.x * 0.4}px, ${-parallax.y * 0.4}px, 0)`,
                  transition: 'transform 0.4s ease-out',
                }}
                aria-hidden="true"
              />

              {/* Faint Concentric Orbit Ellipse Rings */}
              <div
                style={{
                  position: 'absolute',
                  width: '115%',
                  height: '105%',
                  borderRadius: '50%',
                  border: '1px dashed rgba(41, 37, 34, 0.08)',
                  pointerEvents: 'none',
                  zIndex: 0,
                  transform: `scale(${activeBenefit !== null ? 1.02 : 1})`,
                  transition: 'transform 0.5s ease',
                }}
                aria-hidden="true"
              />
              <div
                style={{
                  position: 'absolute',
                  width: '92%',
                  height: '92%',
                  borderRadius: '50%',
                  border: '1px dashed rgba(255, 104, 79, 0.12)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
                aria-hidden="true"
              />

              {/* Subtle Grounding Shadow at Baseline */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  width: '78%',
                  height: '24px',
                  background: 'radial-gradient(ellipse at center, rgba(41, 37, 34, 0.16) 0%, rgba(41, 37, 34, 0.04) 55%, transparent 75%)',
                  filter: 'blur(7px)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  zIndex: 1,
                  transform: `translate3d(${parallax.x * 0.3}px, 0, 0)`,
                  transition: 'transform 0.3s ease-out',
                }}
                aria-hidden="true"
              />

              {/* Responsive Portrait with Parallax, Active Lean & Editorial Fade */}
              <div
                ref={portraitWrapperRef}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  maxWidth: '330px',
                  transform: `translate3d(${combinedPortraitX}px, ${combinedPortraitY}px, 0) rotate(${combinedRotate}deg) scale(${combinedScale})`,
                  transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.25, 1)',
                  userSelect: 'none',
                }}
                className="why-portrait-reveal"
              >
                <img
                  ref={portraitImgRef}
                  src={whyDrvContent.image}
                  alt="Customer Support Representative with Headset representing DRV Dedicated Support"
                  width="678"
                  height="912"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    // Elegant baseline fade masking the torso cut into the warm ivory background
                    maskImage: 'linear-gradient(to bottom, black 80%, rgba(0, 0, 0, 0.35) 93%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, rgba(0, 0, 0, 0.35) 93%, transparent 100%)',
                    filter: 'drop-shadow(0 16px 36px rgba(41, 37, 34, 0.08))',
                  }}
                />

                {/* Micro-badge: Live Coordination Hub */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    boxShadow: '0 4px 14px rgba(41, 37, 34, 0.08)',
                    border: '1px solid rgba(255, 104, 79, 0.25)',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    color: 'var(--color-charcoal)',
                    letterSpacing: '0.02em',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      boxShadow: '0 0 6px #10B981',
                    }}
                  />
                  <span>Dedicated Hub</span>
                </div>
              </div>
            </div>

            {/* Right 3 Benefits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {rightItems.map((point, idx) => {
                const globalIdx = idx + 3;
                const isActive = activeBenefit === globalIdx;
                const isAnyActive = activeBenefit !== null;
                const isDimmed = isAnyActive && !isActive;

                return (
                  <div
                    key={globalIdx}
                    className="why-card-right why-benefit-card"
                    onMouseEnter={() => setActiveBenefit(globalIdx)}
                    onMouseLeave={() => setActiveBenefit(null)}
                    onClick={() => setActiveBenefit(activeBenefit === globalIdx ? null : globalIdx)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveBenefit(activeBenefit === globalIdx ? null : globalIdx);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '18px 22px',
                      borderRadius: '16px',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.35)',
                      backdropFilter: 'blur(8px)',
                      border: isActive
                        ? '1px solid rgba(255, 104, 79, 0.35)'
                        : '1px solid rgba(255, 255, 255, 0.6)',
                      boxShadow: isActive
                        ? '0 12px 32px -8px rgba(255, 104, 79, 0.16), 0 4px 12px rgba(41, 37, 34, 0.04)'
                        : '0 4px 16px -4px rgba(41, 37, 34, 0.03)',
                      transform: isActive ? 'translateY(-3px)' : 'none',
                      opacity: isDimmed ? 0.75 : 1,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.25, 1)',
                      outline: 'none',
                    }}
                  >
                    {/* Anchor Marker Dot on Left Edge (connecting to SVG path) */}
                    <div
                      ref={(el) => (markerRefs.current[globalIdx] = el)}
                      style={{
                        width: isActive ? '12px' : '9px',
                        height: isActive ? '12px' : '9px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'var(--color-coral)' : 'var(--color-warm-ivory)',
                        border: isActive ? '2px solid var(--color-coral)' : '2px solid rgba(41, 37, 34, 0.25)',
                        boxShadow: isActive ? '0 0 10px rgba(255, 104, 79, 0.7)' : 'none',
                        flexShrink: 0,
                        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.25, 1)',
                      }}
                      aria-hidden="true"
                    />

                    {/* Text Details */}
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span
                          style={{
                            color: isActive ? 'var(--color-coral)' : 'var(--color-text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {BENEFIT_ICONS[globalIdx]}
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'var(--color-charcoal)',
                            letterSpacing: '-0.015em',
                            margin: 0,
                          }}
                        >
                          {point.title}
                        </h3>
                      </div>
                      <p
                        style={{
                          fontSize: '0.925rem',
                          color: 'var(--color-text-muted)',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE RESPONSIVE TIMELINE ARCHITECTURE (max-width: 1023px) */}
        {/* ======================================================== */}
        <div className="why-mobile-layout" style={{ display: 'none' }}>
          {/* Centered Hero Portrait with Radial Aura */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '260px',
              margin: '0 auto 40px auto',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 104, 79, 0.16) 0%, rgba(247, 243, 240, 0) 70%)',
                filter: 'blur(30px)',
                zIndex: 0,
              }}
              aria-hidden="true"
            />
            <img
              src={whyDrvContent.image}
              alt="Customer Support Representative"
              width="678"
              height="912"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                maskImage: 'linear-gradient(to bottom, black 80%, rgba(0, 0, 0, 0.35) 94%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, rgba(0, 0, 0, 0.35) 94%, transparent 100%)',
              }}
            />
          </div>

          {/* Connected Vertical Timeline of All 6 Benefits */}
          <div
            style={{
              position: 'relative',
              paddingLeft: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Continuous Vertical Connector Spine */}
            <div
              style={{
                position: 'absolute',
                left: '10px',
                top: '16px',
                bottom: '24px',
                width: '2px',
                background: 'linear-gradient(to bottom, var(--color-coral), rgba(41, 37, 34, 0.12))',
                zIndex: 0,
              }}
              aria-hidden="true"
            />

            {[...leftItems, ...rightItems].map((point, idx) => {
              const isSelected = activeBenefit === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveBenefit(isSelected ? null : idx)}
                  style={{
                    position: 'relative',
                    padding: '16px 18px',
                    borderRadius: '14px',
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.55)',
                    border: isSelected ? '1px solid rgba(255, 104, 79, 0.35)' : '1px solid rgba(255, 255, 255, 0.7)',
                    boxShadow: isSelected ? '0 8px 24px -4px rgba(255, 104, 79, 0.15)' : '0 2px 8px rgba(41, 37, 34, 0.03)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {/* Timeline Node Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-23px',
                      top: '20px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? 'var(--color-coral)' : 'var(--color-warm-ivory)',
                      border: '2px solid var(--color-coral)',
                      boxShadow: isSelected ? '0 0 8px var(--color-coral)' : 'none',
                      zIndex: 1,
                      transition: 'all 0.25s ease',
                    }}
                    aria-hidden="true"
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--color-coral)', display: 'flex' }}>
                      {BENEFIT_ICONS[idx]}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--color-charcoal)',
                        margin: 0,
                      }}
                    >
                      {point.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        /* Smooth moving pulse line travelling from benefit to central portrait */
        @keyframes pulseInwardFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -378;
          }
        }

        .why-connector-pulse {
          animation: pulseInwardFlow linear infinite;
        }

        .why-benefit-card:focus-visible {
          box-shadow: 0 0 0 2px var(--color-coral) !important;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1023px) {
          .why-network-layout {
            display: none !important;
          }
          .why-mobile-layout {
            display: block !important;
          }
        }

        @media (min-width: 1024px) {
          .why-mobile-layout {
            display: none !important;
          }
          .why-network-layout {
            display: block !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .why-connector-pulse {
            animation: none !important;
            opacity: 0 !important;
          }
          .why-portrait-reveal,
          .why-benefit-card {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
