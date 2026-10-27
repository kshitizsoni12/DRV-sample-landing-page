import React, { useRef } from 'react';
import MagneticButton from '../components/MagneticButton';
import { finalCtaContent } from '../data/siteContent';
import { ArrowRight, MessageSquare } from 'lucide-react';
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
      <div className="container">
        {/* Large White CTA Panel matching Screenshot 5 & 6 */}
        <div
          ref={cardRef}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '32px',
            padding: '72px 40px',
            textAlign: 'center',
            boxShadow: '0 16px 48px rgba(41, 37, 34, 0.05)',
            border: '1px solid rgba(41, 37, 34, 0.06)',
            maxWidth: '960px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Overlapping Team Avatars Cluster */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '28px',
            }}
          >
            <div
              style={{
                width: '74px',
                height: '42px',
                borderRadius: '24px',
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
                height="42"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
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
