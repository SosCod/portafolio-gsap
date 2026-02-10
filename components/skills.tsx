'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Layout, Monitor, Terminal, Trophy, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import ScreenSection from './fullscreen';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    category: 'Frontend',
    icon: Layout,
    color: 'primary',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'GSAP', level: 80 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    category: 'Backend',
    icon: Database,
    color: 'secondary',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 85 },
      { name: 'REST APIs', level: 90 },
      { name: 'Firebase', level: 85 },
      { name: 'Express', level: 80 },
    ],
  },
  {
    category: 'Tools & Deploy',
    icon: Terminal,
    color: 'primary',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Docker', level: 65 },
      { name: 'Figma', level: 80 },
      { name: 'Vercel / Netlify', level: 95 },
      { name: 'Postman', level: 85 },
      { name: 'VS Code', level: 98 },
    ],
  },
];

const colorMap = {
  primary: {
    bg: 'bg-primary/20',
    text: 'text-primary',
    bar: 'bg-gradient-to-r from-primary to-primary-light',
    rgb: 'var(--primary-rgb, 6, 182, 214)',
  },
  secondary: {
    bg: 'bg-secondary/20',
    text: 'text-secondary',
    bar: 'bg-gradient-to-r from-secondary to-secondary-light',
    rgb: 'var(--secondary-rgb, 129, 140, 248)',
  },
};

function SkillCard({
  category,
  index,
  isMobile,
}: {
  category: (typeof skillCategories)[0];
  index: number;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lastUpdate = useRef(0);

  const colors =
    colorMap[category.color as keyof typeof colorMap] || colorMap.primary;

  useEffect(() => {
    if (!cardRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 50,
        rotateY: 20,
      });

      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top bottom-=100px',
        onEnter: () => {
          gsap.to(cardRef.current, {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(1.4)',
          });
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index, isMobile]);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) {
    if (isMobile || !cardRef.current) return;

    const now = performance.now();
    if (now - lastUpdate.current < 24) return;
    lastUpdate.current = now;

    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    if (spotlightRef.current) {
      gsap.set(spotlightRef.current, {
        opacity: 1,
        background: `radial-gradient(300px circle at ${x * 100}% ${
          y * 100
        }%, rgba(${colors.rgb}, 0.15), transparent 80%)`,
      });
    }

    if (glowRef.current) {
      gsap.set(glowRef.current, {
        opacity: 1,
        background: `radial-gradient(200px circle at ${x * 100}% ${
          y * 100
        }%, rgba(${colors.rgb}, 0.1), transparent 70%)`,
      });
    }
  }

  function handleMouseLeave() {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
    if (spotlightRef.current)
      gsap.to(spotlightRef.current, { opacity: 0, duration: 0.4 });
    if (glowRef.current)
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors overflow-hidden"
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px opacity-0 blur-xl transition-opacity duration-300"
      />

      <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-center gap-4 mb-8">
          <div
            className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center ${colors.text}`}
          >
            <category.icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            {category.category}
          </h3>
        </div>

        <div className="space-y-6">
          {category.skills.map((skill, idx) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-white/70">{skill.name}%</span>
                <span className={`${colors.text} font-mono font-bold`}>
                  {skill.level}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.1 + idx * 0.05,
                    ease: 'circOut',
                  }}
                  className={`h-full ${colors.bar} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const span1Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top bottom-=100px',
              toggleActions: 'play none none none',
            },
          },
        );
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          if (titleRef.current) {
            gsap.set(titleRef.current, {
              rotateX: 15 - progress * 30,
              rotateY: -8 + progress * 16,
              y: 40 - progress * 80,
              translateZ: -50 + progress * 100,
              scale:
                0.95 + (progress < 0.5 ? progress * 0.1 : (1 - progress) * 0.1),
              transformPerspective: 1200,
            });
          }
          if (span1Ref.current) {
            gsap.set(span1Ref.current, {
              translateZ: progress * 30,
            });
          }
          if (span2Ref.current) {
            gsap.set(span2Ref.current, {
              translateZ: 30 - progress * 60,
              rotateX: -5 + progress * 10,
            });
          }
          if (paraRef.current) {
            gsap.set(paraRef.current, {
              rotateX: 8 - progress * 16,
              y: 20 - progress * 40,
              translateZ: -20 + progress * 40,
            });
          }
        },
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.8,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: 'power1.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <ScreenSection
      ignoreOpacity={true}
      ref={sectionRef}
      id="skills"
      className="py-16 sm:py-24 md:py-32 overflow-hidden relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className="mb-20 md:mb-28 text-center">
          <h2
            ref={titleRef}
            style={{
              transformStyle: isMobile ? 'flat' : 'preserve-3d',
              perspective: isMobile ? 'none' : '1200px',
            }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 relative leading-[1.1]"
          >
            <span
              ref={span1Ref}
              style={{
                display: 'inline-block',
                transformStyle: isMobile ? 'flat' : 'preserve-3d',
              }}
              className="relative z-10 text-white"
            >
              Mastering the
            </span>
            <br />
            <span
              ref={span2Ref}
              style={{
                display: 'inline-block',
                transformStyle: isMobile ? 'flat' : 'preserve-3d',
              }}
              className="relative z-10"
            >
              <span className="relative inline-block">
                <span className="gradient-animated-text">Modern Stack.</span>
                <span
                  ref={glowRef}
                  className="absolute inset-0 gradient-animated-text blur-2xl opacity-40 select-none pointer-events-none"
                >
                  Modern Stack.
                </span>
              </span>
            </span>
          </h2>

          <p
            ref={paraRef}
            style={{ transformStyle: isMobile ? 'flat' : 'preserve-3d' }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4"
          >
            I specialize in building modular, high-performance applications with
            cutting-edge technologies and pixel-perfect attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative items-stretch">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.category}
              category={category}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-8 text-white/30 font-mono text-xs uppercase tracking-[0.2em]"
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span>Excellence Driven</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Optimized Core</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            <span>Responsive Native</span>
          </div>
        </motion.div>
      </div>
    </ScreenSection>
  );
}
