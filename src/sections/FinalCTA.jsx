import React, { useRef } from 'react';
import MagneticButton from '../components/MagneticButton';
import { finalCtaContent } from '../data/siteContent';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const cardRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(cardRef.current, {
        scale: 0.96,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 82%',
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <section
      id="contact"
      style={{
        backgroundColor: 'var(--color-warm-ivory)',
        paddingTop: '60px',
        paddingBottom: '90px',
        position: 'relative',
        zIndex: 2,
        scrollMarginTop: '90px',
      }}
      aria-label="Ready to start"
    >
      <div className="container" style={{ position: 'relative' }}>
        {/* Ambient Warm Halo behind the CTA Card */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '5%',
            width: '90%',
            height: '140%',
            background: 'radial-gradient(ellipse at center, rgba(255, 104, 79, 0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          aria-hidden="true"
        />

        {/* Large White CTA Panel matching Screenshot 5 & 6 */}
        <div
          ref={cardRef}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '32px',
            padding: '72px 40px',
            textAlign: 'center',
            boxShadow: '0 24px 64px -16px rgba(41, 37, 35, 0.08), 0 2px 8px rgba(41, 37, 35, 0.02)',
            border: '1px solid rgba(41, 37, 35, 0.08)',
            maxWidth: '960px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          {/* Subtle top edge lighting gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--color-coral), transparent)',
              opacity: 0.8,
            }}
            aria-hidden="true"
          />

          {/* Overlapping Team Avatars Cluster & Verified Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(247, 243, 240, 0.8)',
              border: '1px solid rgba(41, 37, 35, 0.08)',
              borderRadius: '999px',
              padding: '6px 16px 6px 6px',
              marginBottom: '28px',
            }}
          >
            <div
              style={{
                width: '74px',
                height: '36px',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={finalCtaContent.avatarsImage}
                alt="DRV Assistants Dedicated Remote Team Specialists"
                width="74"
                height="36"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-charcoal)',
              }}
            >
              <Sparkles size={14} style={{ color: 'var(--color-coral)' }} />
              Ready to onboard your assistant
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
              fontWeight: 700,
              color: 'var(--color-charcoal)',
              letterSpacing: '-0.025em',
              marginBottom: '16px',
              lineHeight: 1.2,
            }}
          >
            {finalCtaContent.titlePrefix}{' '}
            <span style={{ color: 'var(--color-coral)' }}>{finalCtaContent.titleHighlight}</span>{' '}
            {finalCtaContent.titleSuffix}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.0625rem',
              color: 'var(--color-text-muted)',
              maxWidth: '560px',
              margin: '0 auto 40px auto',
              lineHeight: 1.55,
            }}
          >
            {finalCtaContent.subtitle}
          </p>

          {/* Action Buttons matching Screenshot 5 & 6 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <MagneticButton
              href={finalCtaContent.primaryCtaHref || '#pricing'}
              variant="primary"
              id="final-trial-cta"
              icon={<ArrowRight size={18} />}
            >
              {finalCtaContent.primaryCta}
            </MagneticButton>

            <MagneticButton
              href={finalCtaContent.secondaryCtaHref || '#contact'}
              variant="secondary"
              id="final-contact-cta"
              icon={<MessageSquare size={16} />}
            >
              {finalCtaContent.secondaryCta}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
