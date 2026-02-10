'use client';

import MouseParticles from '../components/mouse-particles';
import NoiseOverlay from '../components/noise-overlay';
import CodeRain from '../components/code-rain';
import ScrollingBackgroundText from '../components/scrolling-background-text';
import Hero from '../components/hero';
import { Navbar } from '../components/navbar';
import About from '../components/about';
import Process from '../components/progress';
import { Skills } from '../components/skills';
import { Projects } from '../components/projects';
import { Contact } from '../components/contact';
import { Footer } from '../components/footer';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen text-foreground selection:bg-primary/50 overflow-x-hidden">
      <NoiseOverlay />
      <CodeRain />
      <MouseParticles />
      <Navbar />
      <Hero />
      <About />
      <Process />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ScrollingBackgroundText
        className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none text-9xl font-bold opacity-5"
        style={{
          color: 'var(--primary)',
          whiteSpace: 'nowrap',
        }}
      >
        CREATIVE DEVELOPER • GSAP • NEXTJS • ANIMATIONS • CREATIVE DEVELOPER •
        GSAP • NEXTJS • ANIMATIONS •
      </ScrollingBackgroundText>
    </main>
  );
}
