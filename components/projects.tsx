'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Code2,
  Rocket,
  Layers,
  Sparkles,
  ExternalLink as LinkIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import ScreenSection from './fullscreen';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'Modern e-commerce platform with dynamic cart, payment system, and administrative dashboard.',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    stats: { users: '10k+', conversion: '15%' },
    color: 'primary',
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'Task management application with real-time collaboration and productivity analytics.',
    tags: ['React', 'Firebase', 'Framer Motion', 'TypeScript'],
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    stats: { users: '5k+', rating: '4.8★' },
    color: 'secondary',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description:
      'Portfolio website with fluid animations, optimized SEO, and exceptional performance.',
    tags: ['Next.js', 'GSAP', 'Framer Motion', 'Vercel'],
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    stats: { performance: '98', loading: '0.8s' },
    color: 'primary',
  },
  {
    id: 4,
    title: 'AI Chat Assistant',
    description:
      'Intelligent chat assistant with AI, persistent history, and multi-language support.',
    tags: ['Next.js', 'OpenAI', 'Prisma', 'PostgreSQL'],
    image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    stats: { messages: '1M+', languages: '10+' },
    color: 'secondary',
  },
  {
    id: 5,
    title: 'Hotel Booking App',
    description:
      'Hotel booking application with real-time availability, payment processing, and user reviews.',
    tags: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Stripe'],
    image: 'linear-gradient(135deg, #4f031aff 0%, #d75b03ff 100%)',
    stats: { messages: '1M+', languages: '10+' },
    color: 'primary',
  },
  {
    id: 6,
    title: 'Banking App',
    description:
      'Banking application with real-time availability, payment processing, and user reviews.',
    tags: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Stripe'],
    image: 'linear-gradient(135deg, #65b51eff 0%, #bde032ff 100%)',
    stats: { messages: '1M+', languages: '10+' },
    color: 'secondary',
  },
];

function ProjectCard({
  project,
  index,
  isMobile,
}: {
  project: (typeof projects)[0];
  index: number;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, y: 50, rotateX: 10 });

      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top bottom-=100px',
        onEnter: () => {
          gsap.to(cardRef.current, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            delay: index * 0.1,
            ease: 'power4.out',
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

    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;

    gsap.to(cardRef.current, {
      rotateX: (y - 0.5) * -15,
      rotateY: (x - 0.5) * 15,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    if (spotlightRef.current) {
      gsap.set(spotlightRef.current, {
        opacity: 1,
        background: `radial-gradient(300px circle at ${x * 100}% ${
          y * 100
        }%, rgba(var(--${project.color}-rgb, 255, 255, 255), 0.15), transparent 80%)`,
      });
    }

    if (glowRef.current) {
      gsap.set(glowRef.current, {
        opacity: 1,
        background: `radial-gradient(200px circle at ${x * 100}% ${
          y * 100
        }%, rgba(var(--${project.color}-rgb, 255, 255, 255), 0.1), transparent 70%)`,
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
    if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0 });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0 });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[450px] rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10"
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px opacity-0 blur-xl transition-opacity duration-300 z-10"
      />

      {/* Project Background Gradient */}
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ background: project.image }}
      />

      {/* Content */}
      <div
        className="relative z-20 p-8 h-full flex flex-col justify-between"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div>
          <div className="flex justify-between items-start mb-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`px-3 py-1 rounded-full bg-${project.color}/10 border border-${project.color}/20 flex items-center gap-2`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full bg-${project.color} animate-pulse`}
              />
              <span
                className={`text-[10px] uppercase tracking-widest font-bold text-${project.color}`}
              >
                Featured Project
              </span>
            </motion.div>

            <div className="flex gap-2">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: -10 }}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          <h3 className="text-3xl font-black mb-4 tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-6">
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key}>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                  {key}
                </p>
                <p className="text-lg font-bold text-white tracking-tight">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-500">
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const span1Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);
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
      // 3D Scroll distortion for title
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (titleRef.current) {
            gsap.set(titleRef.current, {
              rotateX: 10 - progress * 20,
              rotateY: -5 + progress * 10,
              y: 20 - progress * 40,
              translateZ: -30 + progress * 60,
              scale:
                0.97 +
                (progress < 0.5 ? progress * 0.06 : (1 - progress) * 0.06),
              transformPerspective: 1200,
            });
          }
          if (span1Ref.current)
            gsap.set(span1Ref.current, { translateZ: progress * 15 });
          if (span2Ref.current)
            gsap.set(span2Ref.current, { translateZ: 15 - progress * 30 });
        },
      });

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
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <ScreenSection
      ignoreOpacity={true}
      ref={sectionRef}
      id="projects"
      className="py-16 sm:py-24 md:py-32 overflow-hidden relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className="mb-20 md:mb-28 text-center">
          <h2
            ref={titleRef}
            style={{
              transformStyle: isMobile ? 'flat' : 'preserve-3d',
              perspective: '1200px',
            }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 relative leading-tight"
          >
            <span
              ref={span1Ref}
              style={{ display: 'inline-block' }}
              className="text-white"
            >
              Selected
            </span>
            <br />
            <span
              ref={span2Ref}
              style={{ display: 'inline-block' }}
              className="gradient-animated-text"
            >
              Work.
            </span>
          </h2>
          <p
            ref={paraRef}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4"
          >
            A curated selection of projects where technical excellence meets
            creative vision. Built with performance and user experience at the
            core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3  gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full glass border border-primary/40 text-foreground font-bold tracking-widest uppercase text-xs hover:border-primary/80 hover:bg-primary/10 transition-all flex items-center gap-3"
          >
            <span>View All Projects</span>
            <Layers className="w-4 h-4 opacity-50" />
          </motion.button>
        </motion.div>
      </div>
    </ScreenSection>
  );
}
