import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({ targetNumber, suffix = '', displayValue }) {
  const [displayedText, setDisplayedText] = useState(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        return displayValue;
      }
    }
    return '0' + suffix;
  });

  const elementRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      return;
    }

    let rafId = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();

          const start = 0;
          const end = targetNumber;
          const duration = 1600; // ms
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(start + (end - start) * easeOutProgress);

            if (progress < 1) {
              if (displayValue === '1k+') {
                // Show clean integers while counting up to 1000
                setDisplayedText(`${currentVal}`);
              } else if (displayValue === '24/7') {
                setDisplayedText(`${currentVal}/7`);
              } else {
                setDisplayedText(`${currentVal}${suffix}`);
              }
              rafId = requestAnimationFrame(animate);
            } else {
              // Final exact display value
              setDisplayedText(displayValue);
            }
          };

          rafId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [targetNumber, suffix, displayValue]);

  return (
    <span ref={elementRef} className="counter-number">
      {displayedText}
    </span>
  );
}
