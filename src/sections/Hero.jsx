import React, { useRef } from 'react';
import SectionBadge from '../components/SectionBadge';
import MagneticButton from '../components/MagneticButton';
import WorldMap from '../components/WorldMap';
import ParticleHeroImage from '../components/ParticleHeroImage';
import { heroContent } from '../data/siteContent';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const imageContainerRef = useRef(null);
  const mapRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Hero entrance choreography
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge-anim', {
        y: -16,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
      })
        .from(
          '.hero-word',
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.04,
          },
          '-=0.3'
        )
        .from(
          '.hero-desc-anim',
          {
            y: 16,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          '.hero-cta-anim',
          {
            y: 16,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          '-=0.4'
        )
        .from(
          imageContainerRef.current,
          {
            x: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power2.out',
          },
          '-=0.7'
        );

      // Parallax for background world map
      if (mapRef.current) {
        gsap.to(mapRef.current, {
          xPercent: -6,
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    },
    { scope: heroRef }
  );

  // Derive headline words from content configuration
  const titleWords = heroContent.titlePart1.split(' ');

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '130px',
        paddingBottom: '80px',
        overflow: 'hidden',
        backgroundColor: 'var(--color-warm-ivory)',
        scrollMarginTop: '80px',
      }}
    >
      {/* Dotted World Map Parallax Layer */}
      <div ref={mapRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <WorldMap />
      </div>

      <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            alignItems: 'center',
            gap: '40px',
          }}
          className="hero-grid"
        >
          {/* Left Text Column */}
          <div style={{ maxWidth: '640px' }}>
            <div className="hero-badge-anim">
              <SectionBadge id="hero-badge">{heroContent.badge}</SectionBadge>
            </div>

            <h1
              ref={headlineRef}
              id="hero-headline"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 4.4vw, 4.2rem)',
                fontWeight: 700,
                color: 'var(--color-charcoal)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginTop: '16px',
                marginBottom: '24px',
              }}
            >
              {titleWords.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span className="hero-word" style={{ display: 'inline-block' }}>
                    {word}&nbsp;
                  </span>
                  {idx === 2 && <br className="hero-break-desk" />}
                </React.Fragment>
              ))}
              <br />
              <span
                className="hero-word"
                style={{
                  display: 'inline-block',
                  color: 'var(--color-coral)',
                  position: 'relative',
                }}
              >
                {heroContent.titleHighlight}
              </span>
            </h1>

            <p
              className="hero-desc-anim"
              id="hero-description"
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                marginBottom: '36px',
                maxWidth: '540px',
              }}
            >
              {heroContent.description}
            </p>

            <div
              className="hero-cta-anim"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <MagneticButton
                href="#pricing"
                variant="primary"
                id="hero-trial-cta"
                icon={<ArrowRight size={18} />}
              >
                {heroContent.primaryCta}
              </MagneticButton>

              <MagneticButton
                href="#contact"
                variant="secondary"
                id="hero-contact-cta"
                icon={<MessageSquare size={16} />}
              >
                {heroContent.secondaryCta}
              </MagneticButton>
            </div>
          </div>

          {/* Right Interactive Particle Hero Composition */}
          <div
            ref={imageContainerRef}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
            className="hero-image-column"
          >
            <ParticleHeroImage imageSrc={heroContent.image} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-cta-anim {
            justify-content: center;
          }
          .hero-break-desk {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
