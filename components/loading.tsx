'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/components/ui/terminal';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the loading screen after the animations are likely done
    // The terminal sequence takes several seconds. Let's give it ~4 seconds.
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background p-4 sm:p-8"
        >
          <div className="w-full flex flex-col items-center justify-center max-w-2xl transform hover:scale-[1.01] transition-transform duration-300">
            <Terminal className="shadow-2xl border-primary/20 bg-black/90 backdrop-blur-xl">
              <TypingAnimation className="text-primary" duration={30}>
                &gt; initializing portfolio_v2.0.0...
              </TypingAnimation>

              <AnimatedSpan className="text-green-500" delay={500}>
                ✔ Verifying system dependencies.
              </AnimatedSpan>

              <AnimatedSpan className="text-green-500" delay={1000}>
                ✔ Booting GSAP animation engine.
              </AnimatedSpan>

              <AnimatedSpan className="text-green-500" delay={1500}>
                ✔ Loading 3D models and textures.
              </AnimatedSpan>

              <AnimatedSpan className="text-green-500" delay={2000}>
                ✔ Calibrating interactive particles.
              </AnimatedSpan>

              <AnimatedSpan className="text-blue-500" delay={2500}>
                <span>ℹ Pre-rendering creative components...</span>
              </AnimatedSpan>

              <AnimatedSpan className="text-green-500" delay={3000}>
                ✔ Responsive layout optimized.
              </AnimatedSpan>

              <AnimatedSpan className="text-green-500" delay={3500}>
                ✔ Theme engine synchronized.
              </AnimatedSpan>

              <TypingAnimation
                className="text-primary font-bold"
                delay={4000}
                duration={20}
              >
                Success! Portfolio is ready for exploration.
              </TypingAnimation>

              <TypingAnimation
                className="text-muted-foreground text-xs italic"
                delay={4200}
              >
                Welcome to SosCode's digital workspace.
              </TypingAnimation>
            </Terminal>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
