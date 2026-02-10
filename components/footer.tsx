'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowUp,
  Code2,
  MessageSquare,
  PenTool,
  Rocket,
  Heart,
  ExternalLink,
  ChevronRight,
  Link,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import ScreenSection from './fullscreen';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!footerRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      // 3D "Flip-up" reveal effect on scroll
      gsap.fromTo(
        containerRef.current,
        {
          rotateX: -20,
          y: 50,
          opacity: 0,
          transformPerspective: 1000,
        },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom-=50px',
            toggleActions: 'play none none none',
          },
        },
      );

      // Subtle parallax for the main footer title
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: -20,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'primary' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'secondary' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'primary' },
    { icon: Mail, href: '#', label: 'Email', color: 'secondary' },
  ];

  const footerGroups = [
    {
      title: 'Navigation',
      items: [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { name: 'Case Studies', href: '#', icon: Code2 },
        { name: 'Blog', href: '#', icon: MessageSquare },
        { name: 'Free Assets', href: '#', icon: PenTool },
        { name: 'Contact', href: '#contact', icon: Rocket },
      ],
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative z-30 bg-background overflow-hidden"
    >
      {/* Visual background bridge/gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div
        ref={containerRef}
        style={{ transformStyle: 'preserve-3d' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          {/* Brand & Mission Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <motion.h2
                ref={titleRef}
                className="text-4xl md:text-5xl font-black tracking-tighter"
              >
                Let's Build the <br />
                <span className="gradient-animated-text">Future Together.</span>
              </motion.h2>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                Desarrollador Full Stack enfocado en fusionar la ingeniería de
                alto rendimiento con el diseño interactivo de vanguardia.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-${social.color === 'primary' ? 'primary' : 'secondary'} hover:border-white/20 transition-all duration-300`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Groups */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-6">
                <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-white/30">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <motion.a
                        href={item.href}
                        whileHover={{ x: 5 }}
                        className="group flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-300"
                      >
                        {item.icon && (
                          <item.icon className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                        )}
                        <span className="font-medium">{item.name}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Actions Section */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-end justify-between self-stretch">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group hover:bg-primary hover:text-black transition-all duration-500 shadow-2xl shadow-primary/10"
            >
              <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </motion.button>

            <div className="hidden lg:block text-right">
              <p className="text-[10px] uppercase tracking-widest text-white/20 font-mono mb-2">
                Developed with
              </p>
              <div className="flex items-center gap-2 justify-end text-white/60">
                <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                <span className="text-xs font-bold">Berlin Dev</span>
              </div>
              <div className="flex items-center gap-2 justify-end text-white/60">
                <Link className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                <a
                  href="https://www.paypal.com/ncp/payment/9N8LA5PMUVXMA"
                  className="hover:text-primary transition-colors"
                >
                  Open Source Code
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.2em] font-mono text-white/30">
            <span>© {currentYear} Sos Code</span>
            <span className="hidden md:inline">•</span>
            <span>Based in Netherlands</span>
            <span className="hidden md:inline">•</span>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/30">
              Next.js + GSAP + Framer Motion + Tailwindcss + Magic UI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
