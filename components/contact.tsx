'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Send,
  MapPin,
  Phone,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  MouseEvent,
  useEffect,
  useRef,
  useState,
  FormEvent,
  ChangeEvent,
} from 'react';
import ScreenSection from './fullscreen';
import { Globe } from './globe';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@berlin.dev',
    href: 'mailto:hello@berlin.dev',
    color: 'primary',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+31 (0) 6 1234 5678',
    href: 'tel:+31612345678',
    color: 'secondary',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Netherlands',
    href: '#',
    color: 'primary',
  },
];

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Mail, href: '#', label: 'Email' },
];

function ContactInfoCard({
  info,
  index,
  isMobile,
}: {
  info: (typeof contactInfo)[0];
  index: number;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, x: -30 });

      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top bottom-=50px',
        onEnter: () => {
          gsap.to(cardRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
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
  }: MouseEvent<HTMLAnchorElement>) {
    if (isMobile || !cardRef.current) return;

    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;

    gsap.to(cardRef.current, {
      rotateX: (y - 0.5) * -10,
      rotateY: (x - 0.5) * 10,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    if (spotlightRef.current) {
      gsap.set(spotlightRef.current, {
        opacity: 1,
        background: `radial-gradient(200px circle at ${x * 100}% ${
          y * 100
        }%, rgba(var(--${info.color}-rgb, 255, 255, 255), 0.15), transparent 80%)`,
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
  }

  return (
    <motion.a
      ref={cardRef}
      href={info.href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-start gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all cursor-pointer overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
      />
      <div
        className={`w-12 h-12 rounded-xl bg-${info.color}/20 flex items-center justify-center text-${info.color} group-hover:scale-110 transition-transform duration-300`}
        style={{ transform: 'translateZ(20px)' }}
      >
        <info.icon className="w-5 h-5" />
      </div>
      <div style={{ transform: 'translateZ(10px)' }}>
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1 font-mono">
          {info.label}
        </p>
        <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">
          {info.value}
        </p>
      </div>
    </motion.a>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const span1Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      // 3D Scroll distortion for title (matching Skills/Progress)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (titleRef.current) {
            gsap.set(titleRef.current, {
              rotateX: 12 - progress * 24,
              rotateY: -6 + progress * 12,
              y: 30 - progress * 60,
              translateZ: -40 + progress * 80,
              scale:
                0.96 +
                (progress < 0.5 ? progress * 0.08 : (1 - progress) * 0.08),
              transformPerspective: 1200,
            });
          }
          if (span1Ref.current)
            gsap.set(span1Ref.current, { translateZ: progress * 20 });
          if (span2Ref.current) {
            gsap.set(span2Ref.current, {
              translateZ: 20 - progress * 40,
              rotateX: -4 + progress * 8,
            });
          }
        },
      });

      // Globe subtle float
      if (globeRef.current) {
        gsap.to(globeRef.current, {
          y: -20,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 2000);
  };

  function handleFormMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) {
    if (isMobile) return;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    gsap.to(currentTarget, {
      rotateX: (y - 0.5) * -5,
      rotateY: (x - 0.5) * 5,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  }

  function handleFormMouseLeave(e: MouseEvent<HTMLDivElement>) {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }

  return (
    <ScreenSection
      ignoreOpacity={true}
      ref={sectionRef}
      id="contact"
      className="py-16 sm:py-24 md:py-32 overflow-hidden relative z-20"
    >
      {/* Magic Globe Background */}
      <div
        ref={globeRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] opacity-60 pointer-events-none lg:opacity-40"
      >
        <Globe className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className="mb-20 text-center">
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
              Let's build something
            </span>
            <br />
            <span
              ref={span2Ref}
              style={{ display: 'inline-block' }}
              className="gradient-animated-text pb-2"
            >
              Extraordinary.
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            I'm always open to discussing new projects, creative ideas or
            opportunities to be part of your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Contact Details & Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Stay connected
              </h3>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <ContactInfoCard
                  key={info.label}
                  info={info}
                  index={index}
                  isMobile={isMobile}
                />
              ))}
            </div>

            {/* Social Grid */}
            <div className="pt-10 flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Professional 3D Contact Form */}
          <div
            ref={formRef}
            onMouseMove={handleFormMouseMove}
            onMouseLeave={handleFormMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
            className="p-8 md:p-10 rounded-3xl bg-secondary/5 border border-white/10 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Form decorative background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-[100px] -z-10" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 px-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 text-white placeholder-white/20 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 px-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 text-white placeholder-white/20 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 px-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={4}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 text-white placeholder-white/20 outline-none transition-all resize-none"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitted}
                className="w-full py-5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold tracking-wider uppercase flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50"
              >
                {isSubmitted ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Message Sent
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </ScreenSection>
  );
}
