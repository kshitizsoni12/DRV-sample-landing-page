import React, { useRef } from 'react';
import SectionBadge from '../components/SectionBadge';
import MagneticButton from '../components/MagneticButton';
import { pricingContent } from '../data/siteContent';
import { Check, X, Shield, Sparkles, Zap, Star } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const pricingRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from('.pricing-card-anim', {
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: pricingRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: pricingRef }
  );

  const renderFeatureIcon = (idx) => {
    switch (idx % 3) {
      case 0:
        return <Zap size={18} style={{ color: 'var(--color-coral)' }} aria-hidden="true" />;
      case 1:
        return <Sparkles size={18} style={{ color: 'var(--color-coral)' }} aria-hidden="true" />;
      default:
        return <Shield size={18} style={{ color: 'var(--color-coral)' }} aria-hidden="true" />;
    }
  };

  return (
    <section
      ref={pricingRef}
      id="pricing"
      style={{
        backgroundColor: 'var(--color-warm-ivory)',
        paddingTop: '90px',
        paddingBottom: '110px',
        position: 'relative',
        zIndex: 2,
        scrollMarginTop: '90px',
      }}
      aria-label="Plans and Pricing"
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'left', marginBottom: '56px' }}>
          <SectionBadge id="pricing-badge">{pricingContent.badge}</SectionBadge>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              fontWeight: 700,
              color: 'var(--color-charcoal)',
              marginTop: '16px',
              marginBottom: '10px',
              letterSpacing: '-0.025em',
            }}
          >
            {pricingContent.titlePrefix}{' '}
            <span style={{ color: 'var(--color-coral)' }}>{pricingContent.titleHighlight}</span>
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
            {pricingContent.subtitle}
          </p>
        </div>

        {/* 3-Column Layout: Left Features | Dynamic Plan Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr 1.15fr',
            gap: '32px',
            alignItems: 'stretch',
          }}
          className="pricing-layout-grid"
        >
          {/* Left Selling Points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', justifyContent: 'center' }}>
            {pricingContent.sideFeatures.map((feat, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 104, 79, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {renderFeatureIcon(idx)}
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--color-charcoal)',
                      marginBottom: '6px',
                    }}
                  >
                    {feat.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Plan Cards driven 100% by data model */}
          {pricingContent.plans.map((plan) => {
            const isFullTime = plan.highlighted;

            return (
              <div
                key={plan.id}
                className={`pricing-card-anim pricing-plan-card ${isFullTime ? 'featured-plan' : ''}`}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-charcoal)',
                  border: isFullTime ? '2px solid var(--color-coral)' : '1px solid rgba(41, 37, 35, 0.08)',
                  borderRadius: '24px',
                  padding: '40px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isFullTime
                    ? '0 20px 48px -12px rgba(255, 104, 79, 0.22), 0 4px 16px rgba(41, 37, 35, 0.04)'
                    : '0 8px 30px rgba(41, 37, 34, 0.04)',
                  position: 'relative',
                  transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Ambient Warm Halo behind the featured plan card */}
                {isFullTime && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10%',
                      left: '-8%',
                      width: '116%',
                      height: '120%',
                      background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 104, 79, 0.16) 0%, transparent 70%)',
                      filter: 'blur(36px)',
                      pointerEvents: 'none',
                      zIndex: -1,
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Popular Pill Badge for Featured Plan */}
                {isFullTime && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'rgba(255, 104, 79, 0.1)',
                      color: 'var(--color-coral)',
                      border: '1px solid rgba(255, 104, 79, 0.25)',
                      borderRadius: '999px',
                      padding: '5px 12px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: '18px',
                      width: 'fit-content',
                    }}
                  >
                    <Star size={12} fill="var(--color-coral)" strokeWidth={0} />
                    Most Popular & Best Value
                  </div>
                )}

                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.45rem',
                        fontWeight: 700,
                        color: 'var(--color-charcoal)',
                      }}
                    >
                      {plan.name}
                    </h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.9rem',
                        fontWeight: 800,
                        color: isFullTime ? 'var(--color-coral)' : 'var(--color-charcoal)',
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                      <span
                        style={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {plan.period}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        marginTop: '4px',
                      }}
                    >
                      {plan.feeNote}
                    </div>
                  </div>
                </div>

                {/* Feature Header */}
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-charcoal)',
                    marginBottom: '18px',
                    borderTop: '1px solid rgba(41, 37, 35, 0.08)',
                    paddingTop: '20px',
                  }}
                >
                  {plan.featureHeader}
                </div>

                {/* Features List */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px', flexGrow: 1, padding: 0, margin: '0 0 36px 0' }}>
                  {plan.features.map((item, fIdx) => (
                    <li
                      key={fIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '0.875rem',
                        color: item.included ? 'var(--color-charcoal)' : '#9C9690',
                      }}
                    >
                      {item.included ? (
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: isFullTime ? 'var(--color-coral)' : 'var(--color-charcoal)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Check size={12} strokeWidth={3} aria-hidden="true" />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#EBE4DD',
                            color: '#9C9690',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <X size={12} strokeWidth={2.5} aria-hidden="true" />
                        </div>
                      )}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  href={plan.buttonHref}
                  variant={isFullTime ? 'primary' : 'secondary'}
                  id={`${plan.id}-plan-btn`}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontWeight: 700,
                    backgroundColor: isFullTime ? 'var(--color-coral)' : 'var(--color-charcoal)',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: isFullTime ? '0 8px 24px -4px rgba(255, 104, 79, 0.35)' : 'none',
                  }}
                >
                  {plan.buttonText}
                </MagneticButton>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pricing-plan-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 56px -12px rgba(41, 37, 35, 0.12) !important;
        }
        @media (max-width: 990px) {
          .pricing-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
