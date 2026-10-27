import React, { useState, useRef, useEffect, useCallback } from 'react';
import SectionBadge from '../components/SectionBadge';
import { testimonialsContent } from '../data/siteContent';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef(null);
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0, lightX: 50, lightY: 50 });
  const touchStartXRef = useRef(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const reviews = testimonialsContent.reviews || [];
  const totalReviews = reviews.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handlePrev = useCallback(() => {
    if (totalReviews <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? totalReviews - 1 : prev - 1));
  }, [totalReviews]);

  const handleNext = useCallback(() => {
    if (totalReviews <= 1) return;
    setCurrentIndex((prev) => (prev === totalReviews - 1 ? 0 : prev + 1));
  }, [totalReviews]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  // Subtle 3D cursor tilt on the active testimonial card
  const handleCardMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3; // Max 3 deg
    const rotateY = ((x - centerX) / centerX) * 3;

    setCardTilt({
      rotateX,
      rotateY,
      lightX: (x / rect.width) * 100,
      lightY: (y / rect.height) * 100,
    });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rotateX: 0, rotateY: 0, lightX: 50, lightY: 50 });
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartXRef.current = null;
  };

  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <section
      id="case-studies"
      onKeyDown={handleKeyDown}
      style={{
        backgroundColor: 'var(--color-warm-ivory)',
        paddingTop: '80px',
        paddingBottom: '110px',
        position: 'relative',
        zIndex: 2,
        scrollMarginTop: '90px',
        overflow: 'hidden',
      }}
      aria-label="Customer Reviews Gallery"
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* ======================================================== */}
        {/* SECTION HEADER & CONTROL CLUSTER */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <SectionBadge id="testimonials-badge">{testimonialsContent.badge}</SectionBadge>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.3rem, 4vw, 3.5rem)',
                fontWeight: 700,
                color: 'var(--color-charcoal)',
                marginTop: '16px',
                marginBottom: '10px',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              {testimonialsContent.titlePrefix}{' '}
              <span style={{ color: 'var(--color-coral)' }}>{testimonialsContent.titleHighlight}</span>{' '}
              {testimonialsContent.titleSuffix}
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '580px', lineHeight: 1.6 }}>
              {testimonialsContent.subtitle}
            </p>
          </div>

          {/* Navigation Controls: Prev / Next Buttons + Numeric Counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(8px)',
              padding: '8px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(41, 37, 34, 0.08)',
            }}
            role="group"
            aria-label="Testimonial Navigation"
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: 'var(--color-charcoal)',
                paddingLeft: '6px',
              }}
            >
              <span style={{ color: 'var(--color-coral)' }}>0{currentIndex + 1}</span>
              <span style={{ color: 'var(--color-text-muted)', margin: '0 4px' }}>/</span>
              <span>0{totalReviews}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous customer review"
                className="gallery-nav-btn"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-charcoal)',
                  border: '1px solid rgba(41, 37, 34, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 2px 8px rgba(41, 37, 34, 0.04)',
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next customer review"
                className="gallery-nav-btn primary"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-coral)',
                  color: '#FFFFFF',
                  border: '1px solid var(--color-coral)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 3px 10px rgba(255, 104, 79, 0.3)',
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE CUSTOMER GALLERY LAYOUT */}
        {/* Desktop: Left Gallery Hub | Right Prominent Testimonial Card */}
        {/* Mobile: Top Horizontal Portrait Strip | Bottom Testimonial Card */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: '44px',
            alignItems: 'center',
          }}
          className="testimonials-interactive-grid"
        >
          {/* ====================================================== */}
          {/* LEFT: 5-PORTRAIT INTERACTIVE GALLERY */}
          {/* ====================================================== */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            className="gallery-hub-column"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--color-text-muted)',
              }}
            >
              <span>CLICK TO VIEW LEADER STORY</span>
              <span
                style={{
                  flex: 1,
                  height: '1px',
                  backgroundColor: 'rgba(41, 37, 34, 0.1)',
                }}
              />
            </div>

            {/* Portrait Gallery Composition */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: 'relative',
              }}
              className="portraits-composition-row"
              role="tablist"
              aria-label="Customer Portraits Gallery"
            >
              {reviews.map((rev, idx) => {
                const isActive = idx === currentIndex;

                return (
                  <motion.button
                    key={rev.id || idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Select testimonial by ${rev.name}`}
                    className={`gallery-portrait-item ${isActive ? 'active' : ''}`}
                    layout={!prefersReducedMotion}
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 26,
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: isActive ? 1.05 : 1.1,
                          }
                    }
                    whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
                    style={{
                      position: 'relative',
                      width: isActive ? '108px' : '72px',
                      height: isActive ? '108px' : '72px',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      padding: 0,
                      cursor: 'pointer',
                      border: isActive ? '3px solid var(--color-coral)' : '1.5px solid rgba(41, 37, 34, 0.12)',
                      boxShadow: isActive
                        ? '0 12px 32px -4px rgba(255, 104, 79, 0.45), 0 4px 12px rgba(41, 37, 34, 0.08)'
                        : '0 4px 14px rgba(41, 37, 34, 0.06)',
                      filter: isActive ? 'grayscale(0%)' : 'grayscale(45%)',
                      transition: 'border-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
                      backgroundColor: '#ECE5DE',
                      outline: 'none',
                    }}
                  >
                    <img
                      src={rev.image}
                      alt={rev.name}
                      width="110"
                      height="110"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />

                    {/* Active Accent Ring & Indicator Tag */}
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        style={{
                          position: 'absolute',
                          bottom: '6px',
                          left: '6px',
                          right: '6px',
                          backgroundColor: 'rgba(255, 104, 79, 0.92)',
                          backdropFilter: 'blur(4px)',
                          borderRadius: '6px',
                          padding: '2px 0',
                          textAlign: 'center',
                          color: '#FFFFFF',
                          fontSize: '0.62rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          pointerEvents: 'none',
                        }}
                      >
                        ACTIVE
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Quick Bio Info of Active Person inside the Gallery Column */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(6px)',
                borderRadius: '16px',
                padding: '16px 20px',
                border: '1px solid rgba(41, 37, 34, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--color-charcoal)',
                  }}
                >
                  {currentReview?.name}
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {currentReview?.role}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#059669',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                }}
              >
                <CheckCircle2 size={12} />
                <span>VERIFIED</span>
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* RIGHT: PROMINENT INTERACTIVE TESTIMONIAL CARD */}
          {/* ====================================================== */}
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'relative',
              perspective: '1000px',
            }}
            className="testimonial-spotlight-wrapper"
          >
            <motion.div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                border: '1px solid rgba(41, 37, 34, 0.08)',
                boxShadow: '0 24px 60px -12px rgba(41, 37, 34, 0.08), 0 4px 16px rgba(41, 37, 34, 0.02)',
                padding: '44px 48px',
                position: 'relative',
                overflow: 'hidden',
                rotateX: prefersReducedMotion ? 0 : cardTilt.rotateX,
                rotateY: prefersReducedMotion ? 0 : cardTilt.rotateY,
                transformStyle: 'preserve-3d',
                transition: prefersReducedMotion ? 'none' : 'transform 0.25s ease-out, box-shadow 0.3s ease',
              }}
              className="testimonial-main-card"
            >
              {/* Dynamic Cursor-Following Soft Light Glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle 350px at ${cardTilt.lightX}% ${cardTilt.lightY}%, rgba(255, 104, 79, 0.07), transparent 70%)`,
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
                aria-hidden="true"
              />

              {/* Decorative Subtle Oversized Quote Mark */}
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '32px',
                  color: 'var(--color-coral)',
                  opacity: 0.1,
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
                aria-hidden="true"
              >
                <Quote size={100} />
              </div>

              {/* Top Header of the Spotlight Card */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '28px',
                  paddingBottom: '18px',
                  borderBottom: '1px solid rgba(41, 37, 34, 0.06)',
                }}
              >
                {/* 5-Star Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-coral)' }}>
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} size={18} fill="var(--color-coral)" />
                  ))}
                  <span
                    style={{
                      marginLeft: '8px',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      color: 'var(--color-charcoal)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    5.0 STAR REVIEW
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: 'var(--color-coral)',
                  }}
                >
                  {currentReview?.company || 'EXECUTIVE CLIENT'}
                </div>
              </div>

              {/* Animated Testimonial Quote */}
              <div style={{ minHeight: '140px', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={currentReview?.id || currentIndex}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14, filter: 'blur(4px)' }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -14, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.25rem, 1.85vw, 1.55rem)',
                      fontWeight: 600,
                      color: 'var(--color-charcoal)',
                      lineHeight: 1.5,
                      letterSpacing: '-0.015em',
                      margin: 0,
                    }}
                  >
                    "{currentReview?.quote}"
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Card Footer: Author Profile & Trial Link */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(41, 37, 34, 0.06)',
                  marginTop: '28px',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={currentReview?.image}
                    alt={currentReview?.name}
                    width="48"
                    height="48"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--color-coral)',
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--color-charcoal)',
                      }}
                    >
                      {currentReview?.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      {currentReview?.role} {currentReview?.company ? `— ${currentReview.company}` : ''}
                    </div>
                  </div>
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
                  className="testi-cta-link"
                >
                  <span>Start 2-Day Trial</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .gallery-nav-btn:hover {
          transform: scale(1.08);
        }
        .gallery-nav-btn.primary:hover {
          background-color: var(--color-coral-hover) !important;
          border-color: var(--color-coral-hover) !important;
        }

        .gallery-portrait-item:hover {
          filter: grayscale(0%) !important;
          border-color: var(--color-coral) !important;
        }

        .testi-cta-link:hover {
          text-decoration: underline;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1023px) {
          .testimonials-interactive-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .gallery-hub-column {
            order: -1;
          }
          .portraits-composition-row {
            justify-content: center !important;
          }
          .testimonial-main-card {
            padding: 32px 24px !important;
          }
        }

        @media (max-width: 600px) {
          .gallery-portrait-item {
            width: 56px !important;
            height: 56px !important;
            border-radius: 16px !important;
          }
          .gallery-portrait-item.active {
            width: 76px !important;
            height: 76px !important;
          }
        }
      `}</style>
    </section>
  );
}
