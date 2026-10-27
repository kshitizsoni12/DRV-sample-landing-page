import React, { useState } from 'react';
import DRVLogo from './DRVLogo';
import InfoModal from './InfoModal';
import { footerContent, careerContent } from '../data/siteContent';
import { MapPin, Phone, Mail } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const [modalState, setModalState] = useState({ isOpen: false, title: '', content: '', badge: '', actionHref: '', actionText: '' });

  const handleResourceClick = (e, item) => {
    if (item.href === '#site-footer') {
      return; // Standard scroll to footer
    }
    e.preventDefault();

    if (item.name === 'Career') {
      setModalState({
        isOpen: true,
        badge: careerContent.badge,
        title: `${careerContent.titlePrefix} ${careerContent.titleHighlight}`,
        content: `${careerContent.description}\n\nEmail your portfolio to our recruitment team to explore openings.`,
        actionText: careerContent.ctaText,
        actionHref: `mailto:${careerContent.email}?subject=Career%20Inquiry%20-%20DRV%20Assistants`,
      });
    } else if (item.name === 'Blog') {
      setModalState({
        isOpen: true,
        badge: 'Publications',
        title: 'DRV Insights & Remote Leadership',
        content: 'Our comprehensive remote operations articles, hiring checklists, and case studies are currently being curated. Contact our team to receive direct whitepapers and playbooks.',
        actionText: 'Request Insights',
        actionHref: `mailto:${footerContent.contact.email}?subject=Resource%20Request%20-%20DRV%20Assistants`,
      });
    } else if (item.name === 'Privacy Policy') {
      setModalState({
        isOpen: true,
        badge: 'Legal',
        title: 'Privacy Policy',
        content: 'DRV Assistants is committed to protecting client data, intellectual property, and applicant information. We maintain strict non-disclosure, encrypted communication, and role-based access protocols.\n\nFor full privacy and data governance documentation, contact legal@drvassistants.com or info.drvassistants@gmail.com.',
        actionText: 'Contact Privacy Officer',
        actionHref: `mailto:${footerContent.contact.email}?subject=Privacy%20Inquiry%20-%20DRV%20Assistants`,
      });
    } else if (item.name === 'Terms & Conditions') {
      setModalState({
        isOpen: true,
        badge: 'Legal',
        title: 'Terms & Conditions',
        content: 'All remote assistant engagements are governed by customized Master Service Agreements (MSA) and Service Level Agreements (SLA) executed prior to onboarding. Our 2-Day Risk-Free Trial terms and billing guidelines are outlined upon account creation.',
        actionText: 'Inquire About MSA',
        actionHref: `mailto:${footerContent.contact.email}?subject=Terms%20Inquiry%20-%20DRV%20Assistants`,
      });
    }
  };

  const handleQuickLinkClick = (e, item) => {
    if (item.href === '#career') {
      e.preventDefault();
      setModalState({
        isOpen: true,
        badge: careerContent.badge,
        title: `${careerContent.titlePrefix} ${careerContent.titleHighlight}`,
        content: `${careerContent.description}\n\nEmail your resume and portfolio directly to our recruitment team.`,
        actionText: careerContent.ctaText,
        actionHref: `mailto:${careerContent.email}?subject=Career%20Application%20-%20DRV%20Assistants`,
      });
    }
  };

  return (
    <>
      <footer
        id="site-footer"
        style={{
          backgroundColor: '#1E1B19',
          color: '#E8E1DA',
          paddingTop: '80px',
          paddingBottom: '36px',
          position: 'relative',
          zIndex: 10,
          scrollMarginTop: '90px',
        }}
        aria-label="Site Footer"
      >
        <div className="container">
          {/* Main Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '48px',
              paddingBottom: '60px',
            }}
          >
            {/* Brand & Socials Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <DRVLogo inverted={true} />

              {/* Social Icons with accessible titles and rel tags */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                <a
                  href={footerContent.socials.twitter.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DRV Assistants on X (Twitter)"
                  className="social-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <a
                  href={footerContent.socials.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DRV Assistants on Facebook"
                  className="social-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href={footerContent.socials.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DRV Assistants on Instagram"
                  className="social-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                <a
                  href={footerContent.socials.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DRV Assistants on LinkedIn"
                  className="social-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '20px',
                }}
              >
                {footerContent.quickLinksTitle}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {footerContent.quickLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleQuickLinkClick(e, item)}
                      className="footer-link"
                      style={{
                        fontSize: '0.875rem',
                        color: '#A8A19B',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '20px',
                }}
              >
                {footerContent.resourcesTitle}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {footerContent.resources.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleResourceClick(e, item)}
                      className="footer-link"
                      style={{
                        fontSize: '0.875rem',
                        color: '#A8A19B',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '20px',
                }}
              >
                {footerContent.contactTitle}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPin size={18} style={{ color: 'var(--color-coral)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  <span style={{ fontSize: '0.875rem', color: '#A8A19B', lineHeight: 1.4 }}>
                    {footerContent.contact.address}
                  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone size={18} style={{ color: 'var(--color-coral)', flexShrink: 0 }} aria-hidden="true" />
                  <a
                    href={`tel:${footerContent.contact.phone}`}
                    className="footer-link"
                    style={{ fontSize: '0.875rem', color: '#A8A19B' }}
                  >
                    {footerContent.contact.phone}
                  </a>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={18} style={{ color: 'var(--color-coral)', flexShrink: 0 }} aria-hidden="true" />
                  <a
                    href={`mailto:${footerContent.contact.email}`}
                    className="footer-link"
                    style={{ fontSize: '0.875rem', color: '#A8A19B' }}
                  >
                    {footerContent.contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '28px',
              textAlign: 'center',
              fontSize: '0.8125rem',
              color: '#7C7671',
            }}
          >
            © {CURRENT_YEAR} DRV Assistants · Terms · Privacy
          </div>
        </div>

        <style>{`
          .social-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.06);
            color: #D3CDC7;
            transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
          }
          .social-btn:hover {
            background: var(--color-coral);
            color: #FFFFFF;
            transform: translateY(-2px);
          }
          .footer-link:hover {
            color: #FFFFFF !important;
          }
        `}</style>
      </footer>

      {/* Resource / Legal Info Modal */}
      <InfoModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        badge={modalState.badge}
        title={modalState.title}
        content={modalState.content}
        actionText={modalState.actionText}
        actionHref={modalState.actionHref}
      />
    </>
  );
}
