'use client';

import type React from 'react';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

interface ScrollingBackgroundTextProps {
  progress?: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollingBackgroundText({
  children,
  className,
  style,
}: ScrollingBackgroundTextProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      const el = elementRef.current;
      if (!el) return;

      const halfWidth = el.scrollWidth / 2;

      gsap.to(el, {
        x: -halfWidth,
        duration: 120,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={cn(
        'overflow-hidden whitespace-nowrap select-none pointer-events-none',
        className,
      )}
      style={style}
    >
      <div
        ref={elementRef}
        className="flex flex-row flex-nowrap will-change-transform h-full items-center"
        style={{ display: 'flex', width: 'max-content' }}
      >
        <div className="flex-none px-4">{children}</div>
        <div className="flex-none px-4">{children}</div>
        <div className="flex-none px-4">{children}</div>
        <div className="flex-none px-4">{children}</div>
      </div>
    </div>
  );
}
