import React, { useRef, useState } from 'react';

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'dark'
  className = '',
  style: customStyle = {},
  icon,
  id,
  type = 'button',
  target,
  rel,
  'aria-label': ariaLabel,
  ...restProps
}) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    // Restrained pull (maximum 8px travel) to prevent layout shifts or text clipping
    const rawX = (e.clientX - (left + width / 2)) * 0.2;
    const rawY = (e.clientY - (top + height / 2)) * 0.2;
    const x = Math.max(-8, Math.min(8, rawX));
    const y = Math.max(-8, Math.min(8, rawY));
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    if (position.x !== 0 || position.y !== 0) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  const btnClass = variant === 'secondary' ? 'btn-secondary' : variant === 'dark' ? 'btn-dark' : 'btn-primary';

  // Merge custom inline styles with magnetic transform safely
  const magneticTransform = position.x !== 0 || position.y !== 0
    ? `translate3d(${position.x}px, ${position.y}px, 0)`
    : '';

  const combinedTransform = customStyle.transform
    ? `${customStyle.transform} ${magneticTransform}`.trim()
    : magneticTransform || undefined;

  const mergedStyle = {
    ...customStyle,
    ...(combinedTransform ? { transform: combinedTransform } : {}),
    transition: position.x === 0 && position.y === 0
      ? (customStyle.transition || 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)')
      : 'transform 0.08s ease-out',
  };

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        id={id}
        className={`${btnClass} ${className}`}
        style={mergedStyle}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...restProps}
      >
        <span>{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      id={id}
      type={type}
      className={`${btnClass} ${className}`}
      style={mergedStyle}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...restProps}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
}
