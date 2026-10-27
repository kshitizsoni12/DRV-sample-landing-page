import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import TrustedBy from './sections/TrustedBy';
import Stats from './sections/Stats';
import WhyDRV from './sections/WhyDRV';
import Services from './sections/Services';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    window.lenis = lenis;

    // Synchronize Lenis scroll position with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for in-page anchor links with navbar offset
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '#career') return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -80, duration: 1.1 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Refresh ScrollTrigger when DOM layout and images settle
    const refreshTrigger = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshTrigger);
    const refreshTimer = setTimeout(refreshTrigger, 300);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', refreshTrigger);
      gsap.ticker.remove(updateLenis);
      gsap.ticker.lagSmoothing(500, 33); // Restore standard GSAP smoothing
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="app-root">
      {/* Subtle Grain Overlay for Film Texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <TrustedBy />
        <Stats />
        <WhyDRV />
        <Services />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
