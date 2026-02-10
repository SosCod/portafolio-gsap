'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Code2,
  Rocket,
  Sparkles,
  Zap,
  Cpu,
} from 'lucide-react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import ScreenSection from './fullscreen';
import { useBackground } from './background-provider';
import TechStack3D from './TechStack3D';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Helper for splitting text into spans for GSAP
const SplitText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const isGradient = className?.includes('gradient-animated-text');
  return (
    <span className={cn('inline-block', !isGradient && className)}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={cn(
            'char inline-block',
            isGradient && className,
            isGradient && 'bg-clip-text',
          )}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  const { currentTheme } = useBackground();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Entrance sequence
      tl.from('.char', {
        opacity: 0,
        y: 80,
        rotateX: -90,
        stagger: 0.02,
        duration: 1.2,
        transformPerspective: 1000,
      })
        .from(
          paraRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          '-=0.8',
        )
        .from(
          ctaRef.current?.children || [],
          {
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.8,
          },
          '-=0.6',
        )
        .from(
          socialRef.current?.children || [],
          {
            opacity: 0,
            y: 10,
            stagger: 0.1,
            duration: 0.6,
          },
          '-=0.4',
        )
        .from(
          rightContentRef.current,
          {
            opacity: 0,
            scale: 0.8,
            rotateY: 20,
            duration: 1.5,
          },
          '-=1.2',
        );

      // Scroll animations
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(containerRef.current, {
              y: p * 200,
              opacity: 1 - p * 1.5,
              rotateX: p * 10,
              scale: 1 - p * 0.1,
              transformPerspective: 1200,
            });
            gsap.set(rightContentRef.current, {
              y: p * -100,
              rotateY: p * 20,
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Magnetic effect for buttons
  const useMagnetic = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } =
        currentTarget.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      mouseX.set(x * 0.4);
      mouseY.set(y * 0.4);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return { x: springX, y: springY, handleMouseMove, handleMouseLeave };
  };

  const mag1 = useMagnetic();
  const mag2 = useMagnetic();

  return (
    <ScreenSection
      ref={sectionRef}
      id="home"
      className="relative w-full min-h-screen md:h-screen overflow-hidden flex items-center pt-32 md:pt-0 pb-10 md:pb-0"
    >
      {/* Dynamic Background elements handled by background-provider, but adding depth layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full blur-[160px] opacity-20"
          style={{ backgroundColor: currentTheme.primary }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-[60%] h-[60%] rounded-full blur-[160px] opacity-20"
          style={{ backgroundColor: currentTheme.secondary }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
          {/* Left Content */}
          <div
            ref={containerRef}
            className="w-full lg:w-3/5 space-y-6 md:space-y-10 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">
                  Available for Innovation
                </span>
              </motion.div>

              <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white">
                <SplitText text="Advanced" className="block text-white/90" />
                <span className="block mt-2">
                  <SplitText
                    text="FullStack"
                    className="gradient-animated-text"
                  />
                  <span className="hidden sm:inline">&nbsp;</span>
                  <br className="sm:hidden" />
                  <SplitText
                    text="Development"
                    className=" gradient-animated-text"
                  />
                </span>
              </h1>
            </div>

            <p
              ref={paraRef}
              className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mx-auto lg:mx-0"
            >
              Transforming complex ideas into{' '}
              <span className="text-white font-medium">
                high-performance digital realities
              </span>{' '}
              with GSAP and Next.js.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
            >
              <motion.div
                style={{ x: mag1.x, y: mag1.y }}
                onMouseMove={mag1.handleMouseMove}
                onMouseLeave={mag1.handleMouseLeave}
              >
                <Button
                  size="lg"
                  className="rounded-2xl px-10 h-16 text-xs uppercase tracking-widest font-black group transition-all duration-500 overflow-hidden relative shadow-2xl shadow-primary/20"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  <span className="relative z-10 flex items-center gap-2 text-black">
                    Start Project{' '}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Button>
              </motion.div>

              <motion.div
                style={{ x: mag2.x, y: mag2.y }}
                onMouseMove={mag2.handleMouseMove}
                onMouseLeave={mag2.handleMouseLeave}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl px-10 h-16 text-xs uppercase tracking-widest font-black border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 text-white"
                >
                  View Work
                </Button>
              </motion.div>
            </div>

            <div
              ref={socialRef}
              className="flex items-center justify-center lg:justify-start gap-5 pt-8"
            >
              {[
                { icon: Github, label: 'GitHub', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Mail, label: 'Contact', href: '#' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all shadow-xl"
                >
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Content - Tech Cloud */}
          <div
            ref={rightContentRef}
            className="w-full lg:w-2/5 flex flex-center lg:justify-center relative"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[500px] aspect-square lg:scale-125">
              <TechStack3D />

              {/* Floating detail elements */}
              {!isMobile && (
                <>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-10 -right-10 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl z-20 shadow-2xl"
                  >
                    <Rocket className="w-6 h-6 text-primary" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1,
                    }}
                    className="absolute -bottom-10 -left-10 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl z-20 shadow-2xl"
                  >
                    <Zap className="w-6 h-6 text-secondary" />
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 select-none"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50">
          Scroll
        </span>
      </motion.div>
    </ScreenSection>
  );
}
