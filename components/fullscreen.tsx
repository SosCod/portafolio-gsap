'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface FullScreenSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ignoreOpacity?: boolean;
}

const ScreenSection = forwardRef<HTMLElement, FullScreenSectionProps>(
  ({ children, className = '', id, ignoreOpacity = false }, forwardedRef) => {
    const internalRef = useRef<HTMLElement>(null);

    useImperativeHandle(
      forwardedRef,
      () => internalRef.current as HTMLElement,
      [],
    );

    useEffect(() => {
      if (!internalRef.current) return;

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: internalRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5, // Reduced scrub for more responsive feel
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            const progress = self.progress;

            if (internalRef.current) {
              const tiltX =
                progress <= 0.5
                  ? 5 - progress * 10
                  : -5 + (progress - 0.5) * 10;

              let opacity = 1;
              if (!ignoreOpacity) {
                if (progress <= 0.2) {
                  opacity = progress / 0.2;
                } else if (progress >= 0.8) {
                  opacity = 1 - (progress - 0.8) / 0.2;
                }
              }

              gsap.set(internalRef.current, {
                rotateX: tiltX,
                opacity: ignoreOpacity ? 1 : opacity,
                transformPerspective: 1000,
              });
            }
          },
        });
      }, internalRef);

      return () => ctx.revert();
    }, [ignoreOpacity]);

    return (
      <section
        ref={internalRef}
        id={id}
        className={`flex items-center justify-center relative ${className}`}
      >
        {children}
      </section>
    );
  },
);

ScreenSection.displayName = 'ScreenSection';

export default ScreenSection;
