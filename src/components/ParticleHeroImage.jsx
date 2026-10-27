import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParticleHeroImage({
  imageSrc = '/images/hero-cutout.webp',
  className = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const shadowRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [imageLoaded, setImageLoaded] = useState(false);
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

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId = null;
    let particles = [];
    let isMouseOver = false;
    let mouseCanvasX = -9999;
    let mouseCanvasY = -9999;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let anyRepelled = false;

    // Load source image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    let displayWidth = 540;
    let displayHeight = 405;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const initParticles = () => {
      if (!img.complete || img.naturalWidth === 0) return;

      const rect = container.getBoundingClientRect();
      const parentWidth = rect.width || 540;
      displayWidth = Math.min(540, Math.max(280, parentWidth));
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      displayHeight = displayWidth * aspectRatio;

      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      // Offscreen canvas for precise pixel sampling
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      offscreen.width = displayWidth;
      offscreen.height = displayHeight;

      offCtx.drawImage(img, 0, 0, displayWidth, displayHeight);
      const imgData = offCtx.getImageData(0, 0, displayWidth, displayHeight).data;

      // Adjust particle granularity by screen width for buttery 60fps performance
      // Desktop: ~3,100 particles (step 6). Mobile: ~1,000 particles (step 8).
      const step = displayWidth < 420 ? 8 : displayWidth < 500 ? 7 : 6;
      const particleSize = step + 0.6; // Slight overlap ensures zero subpixel seams at rest

      particles = [];
      const centerX = displayWidth / 2;
      const centerY = displayHeight / 2;

      for (let y = 0; y < displayHeight; y += step) {
        for (let x = 0; x < displayWidth; x += step) {
          const sampleX = Math.min(displayWidth - 1, Math.floor(x + step / 2));
          const sampleY = Math.min(displayHeight - 1, Math.floor(y + step / 2));
          const idx = (sampleY * displayWidth + sampleX) * 4;
          const alpha = imgData[idx + 3];

          // Keyed transparent pixels are ignored (only subject + desk)
          if (alpha > 35) {
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];

            const relX = (sampleX - centerX) / centerX;
            const relY = (sampleY - centerY) / centerY;

            // Deterministic outward radial scatter + gentle organic lift
            const angle = Math.atan2(sampleY - centerY, sampleX - centerX) + (Math.random() - 0.5) * 0.7;
            const distance = 110 + Math.random() * 240;
            const scatterDx = Math.cos(angle) * distance + relX * 70;
            const scatterDy = Math.sin(angle) * distance - 50 + relY * 35 + (Math.random() - 0.5) * 80;
            const scatterRot = (Math.random() - 0.5) * Math.PI * 2.5;
            const scatterScale = 0.25 + Math.random() * 0.45;
            const scatterDelay = Math.random() * 0.38; // Organic peeling wavefront

            // Subtle brand coral sparkle (~5.5% chance)
            const isAccent = Math.random() < 0.055;

            particles.push({
              originX: x + step / 2,
              originY: y + step / 2,
              r,
              g,
              b,
              alpha: alpha / 255,
              size: particleSize,
              scatterDx,
              scatterDy,
              scatterRot,
              scatterScale,
              scatterDelay,
              isAccent,
              repelX: 0,
              repelY: 0,
              targetRepelX: 0,
              targetRepelY: 0,
            });
          }
        }
      }

      setImageLoaded(true);
    };

    if (img.complete && img.naturalWidth > 0) {
      initParticles();
    } else {
      img.onload = () => initParticles();
    }

    // 2. GSAP ScrollTrigger synchronizing breakup and exact reconstruction with scroll progress
    const heroSection = container.closest('section') || container;

    const scrollTrigger = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom 10%',
      scrub: 0.4,
      onUpdate: (self) => {
        // progress is 0.0 when scroll is at top of page, increasing to 1.0
        const p = Math.max(0, Math.min(1, self.progress * 1.25));
        scrollProgressRef.current = p;
      },
    });

    // 3. Pointer event listeners for living parallax and magnetic repulsion
    const handlePointerMove = (e) => {
      if (isReduced) return;
      // Skip cursor repulsion on pure touch devices to preserve clean touch-scrolling
      if (e.pointerType === 'touch') return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= -30 && x <= rect.width + 30 && y >= -30 && y <= rect.height + 30) {
        isMouseOver = true;
        mouseCanvasX = (x / rect.width) * displayWidth;
        mouseCanvasY = (y / rect.height) * displayHeight;
      } else {
        isMouseOver = false;
        mouseCanvasX = -9999;
        mouseCanvasY = -9999;
      }

      // Smooth cursor parallax tilt from window center
      const winCenterX = window.innerWidth / 2;
      const winCenterY = window.innerHeight / 2;
      targetTiltX = ((e.clientX - winCenterX) / winCenterX) * 8;
      targetTiltY = ((e.clientY - winCenterY) / winCenterY) * 6;
    };

    const handlePointerLeave = () => {
      isMouseOver = false;
      mouseCanvasX = -9999;
      mouseCanvasY = -9999;
      targetTiltX = 0;
      targetTiltY = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    // 4. Animation Render Loop (Canvas 2D RAF)
    const startTime = performance.now();

    const render = (time) => {
      animationFrameId = requestAnimationFrame(render);

      const elapsed = time - startTime;
      const progress = scrollProgressRef.current;

      // Smooth lerp for parallax tilt
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;

      // Subtle living-cutout breathing float: fades out as disintegration progresses
      const floatFactor = Math.max(0, 1 - progress * 1.5);
      const floatOffsetY = Math.sin(elapsed * 0.0017) * 4 * floatFactor;

      // Move ambient background glow and shadow for layered parallax depth
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${-currentTiltX * 0.4}px, ${-currentTiltY * 0.4}px, 0)`;
      }
      if (shadowRef.current) {
        const shadowScale = 1 - (floatOffsetY / 30);
        shadowRef.current.style.transform = `translate3d(${currentTiltX * 0.25}px, 0, 0) scale(${shadowScale})`;
      }

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // Apply living parallax translation
      ctx.translate(currentTiltX, currentTiltY + floatOffsetY);

      // Check if particles are actively repelling or displaced
      const isRestingAtTop = progress <= 0.002;

      // If at top with no cursor hovering and repelling has settled,
      // render the pristine photographic cutout with 100% native clarity
      if (isRestingAtTop && !isMouseOver && !anyRepelled) {
        if (img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
        }
        ctx.restore();
        return;
      }

      // Effective pointer coordinates in canvas drawing space (compensating for tilt & float)
      const effMouseX = mouseCanvasX - currentTiltX;
      const effMouseY = mouseCanvasY - (currentTiltY + floatOffsetY);

      const repelRadius = 85;
      const repelForce = 38;
      let activeRepelCount = 0;

      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // 1. Scroll-driven disintegration & exact mathematical reconstruction
        let localP = 0;
        if (progress > p.scatterDelay) {
          localP = Math.min(1, (progress - p.scatterDelay) / (1 - p.scatterDelay));
        }

        // Smooth cubic ease: zero speed at start and end of trajectory
        const easedP = localP * localP * (3 - 2 * localP);

        const targetX = p.originX + p.scatterDx * easedP;
        const targetY = p.originY + p.scatterDy * easedP;
        const targetAlpha = Math.max(0, p.alpha * (1 - easedP * 0.94));
        const targetScale = Math.max(0.18, 1 - easedP * (1 - p.scatterScale));
        const rot = p.scatterRot * easedP;

        // 2. Cursor magnetic repulsion field (independent additive offset)
        if (isMouseOver && localP < 0.75) {
          const dx = targetX - effMouseX;
          const dy = targetY - effMouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < repelRadius && dist > 0.1) {
            const normDist = dist / repelRadius;
            const force = Math.pow(1 - normDist, 1.8) * repelForce;
            const angle = Math.atan2(dy, dx);
            p.targetRepelX = Math.cos(angle) * force;
            p.targetRepelY = Math.sin(angle) * force;
            activeRepelCount++;
          } else {
            p.targetRepelX = 0;
            p.targetRepelY = 0;
          }
        } else {
          p.targetRepelX = 0;
          p.targetRepelY = 0;
        }

        // Spring-damping interpolation back to 0
        p.repelX += (p.targetRepelX - p.repelX) * 0.15;
        p.repelY += (p.targetRepelY - p.repelY) * 0.15;

        if (Math.abs(p.repelX) > 0.1 || Math.abs(p.repelY) > 0.1) {
          activeRepelCount++;
        }

        if (targetAlpha <= 0.02) continue;

        // Final particle drawing coordinate
        const drawX = targetX + p.repelX;
        const drawY = targetY + p.repelY;

        ctx.save();
        ctx.translate(drawX, drawY);

        if (rot !== 0) {
          ctx.rotate(rot);
        }

        const size = p.size * targetScale;

        // Coral brand accent sparingly applied during scatter or cursor interaction
        const isCurrentlyRepelled = Math.hypot(p.repelX, p.repelY) > 2.5;
        if (p.isAccent && (easedP > 0.05 || isCurrentlyRepelled)) {
          ctx.fillStyle = `rgba(255, 104, 79, ${targetAlpha * 0.92})`;
        } else {
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${targetAlpha})`;
        }

        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
      }

      anyRepelled = activeRepelCount > 0;
      ctx.restore();
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      scrollTrigger.kill();
    };
  }, [imageSrc, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`particle-hero-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: prefersReducedMotion ? 'default' : 'crosshair',
        userSelect: 'none',
      }}
      aria-label="Interactive DRV Remote Professional Portrait"
    >
      {/* Soft warm ivory/coral radial glow in background */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 104, 79, 0.13) 0%, rgba(247, 243, 240, 0) 72%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'transform 0.15s ease-out',
        }}
        aria-hidden="true"
      />

      {/* Subtle grounding shadow underneath the wooden desk */}
      <div
        ref={shadowRef}
        style={{
          position: 'absolute',
          bottom: '-12px',
          width: '84%',
          height: '24px',
          background: 'radial-gradient(ellipse at center, rgba(41, 37, 34, 0.14) 0%, rgba(41, 37, 34, 0) 72%)',
          filter: 'blur(7px)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'transform 0.15s ease-out',
        }}
        aria-hidden="true"
      />

      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'relative',
          zIndex: 1,
          display: prefersReducedMotion ? 'none' : 'block',
          width: '100%',
          height: 'auto',
          touchAction: 'none',
        }}
      />

      {/* Static Image Fallback for Reduced-Motion & Pre-load */}
      <noscript>
        <img
          src={imageSrc}
          alt="Dedicated Remote Professional working on laptop"
          width="1024"
          height="765"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </noscript>

      {prefersReducedMotion && (
        <img
          src={imageSrc}
          alt="Dedicated Remote Professional working on laptop"
          width="1024"
          height="765"
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      )}

      {/* Elegant visual hint badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '12px',
          zIndex: 2,
          fontSize: '0.68rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--color-coral)',
          backgroundColor: 'rgba(247, 243, 240, 0.88)',
          backdropFilter: 'blur(4px)',
          padding: '4px 10px',
          borderRadius: '9999px',
          border: '1px solid rgba(255, 104, 79, 0.22)',
          pointerEvents: 'none',
          opacity: imageLoaded && !prefersReducedMotion ? 0.8 : 0,
          transition: 'opacity 0.4s ease',
          letterSpacing: '0.03em',
          boxShadow: '0 2px 8px rgba(41, 37, 34, 0.05)',
        }}
        className="particle-hint"
      >
        ✦ Scroll to Disintegrate
      </div>

      <style>{`
        .particle-hero-wrapper:hover .particle-hint {
          opacity: 1 !important;
        }
        @media (max-width: 600px) {
          .particle-hint {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
