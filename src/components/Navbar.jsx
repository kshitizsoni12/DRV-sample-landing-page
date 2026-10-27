import React, { useState, useEffect } from 'react';
import DRVLogo from './DRVLogo';
import MagneticButton from './MagneticButton';
import InfoModal from './InfoModal';
import { navLinks, careerContent } from '../data/siteContent';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [careerModalOpen, setCareerModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key and body scroll locking for mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 900 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, link) => {
    if (link.href === '#career') {
      e.preventDefault();
      setMobileMenuOpen(false);
      setCareerModalOpen(true);
      return;
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 0' : '22px 0',
          backgroundColor: scrolled ? 'rgba(247, 243, 240, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(41, 37, 34, 0.08)' : '1px solid transparent',
          transition: 'padding 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo - returns to top (#home) */}
          <DRVLogo />

          {/* Desktop Nav Links */}
          <nav
            className="desktop-nav"
            aria-label="Main Navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="nav-link-item"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'var(--color-charcoal)',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                  padding: '4px 0',
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center' }}>
            <MagneticButton
              href="#pricing"
              variant="primary"
              id="nav-get-started-btn"
            >
              Get Started
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              padding: '8px',
              color: 'var(--color-charcoal)',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-drawer"
            style={{
              position: 'fixed',
              top: '68px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(247, 243, 240, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              zIndex: 999,
              overflowY: 'auto',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--color-charcoal)',
                    paddingBottom: '12px',
                    borderBottom: '1px solid rgba(41, 37, 34, 0.08)',
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
              <MagneticButton
                href="#pricing"
                variant="primary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Get Started
              </MagneticButton>
            </div>
          </div>
        )}

        <style>{`
          @media (max-width: 900px) {
            .desktop-nav, .desktop-cta {
              display: none !important;
            }
            .mobile-menu-toggle {
              display: flex !important;
            }
          }
          .nav-link-item:hover {
            color: var(--color-coral) !important;
          }
        `}</style>
      </header>

      {/* Career Information Modal */}
      <InfoModal
        isOpen={careerModalOpen}
        onClose={() => setCareerModalOpen(false)}
        badge={careerContent.badge}
        title={`${careerContent.titlePrefix} ${careerContent.titleHighlight}`}
        content={`${careerContent.description}\n\nTo apply, please email your resume and portfolio directly to our recruitment team.`}
        contactEmail={careerContent.email}
        actionText={careerContent.ctaText}
        actionHref={`mailto:${careerContent.email}?subject=Career%20Application%20-%20DRV%20Assistants`}
      />
    </>
  );
}
