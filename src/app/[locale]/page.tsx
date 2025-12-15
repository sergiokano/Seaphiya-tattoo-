'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUp } from 'lucide-react';
import Lenis from 'lenis';
import Image from 'next/image';

import { Navbar, CustomCursor, MagneticButton } from '@/components/ui';
import { ScrollRevealText } from '@/components/animations';
import { PeonyTransition } from '@/components/sections';
import { Link } from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.6,
      touchMultiplier: 1.0,
    });

    // Expose lenis globally for navbar smooth scroll
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 30, damping: 30, mass: 1.5 });
  const heroTextY = useTransform(smoothProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const elementsOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const scrollIndicatorY = useTransform(smoothProgress, [0, 0.08], [0, 80]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  const images = {
    artist: '/about/artist.webp'
  };

  const scrollToTop = () => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 2,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-paper-white min-h-[400vh] text-ink-black selection:bg-paper-white selection:text-paper-white font-body antialiased relative"
    >
      <CustomCursor />
      <Navbar />

      {/* HERO */}
      <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-paper-white">
        {/* Status indicator - Top Right */}
        <motion.div
          className="absolute top-20 right-4 md:top-28 md:right-12 z-20"
          style={{ opacity: elementsOpacity }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-black/25">{t('hero.status')}</span>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-sage"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-[9px] md:text-[10px] text-black/50">{t('hero.nowBooking')}</span>
            </div>
          </div>
        </motion.div>

        {/* Follow - Bottom Right */}
        <motion.div
          className="absolute bottom-24 right-4 md:bottom-12 md:right-12 z-20"
          style={{ opacity: elementsOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="flex flex-col items-end gap-2">
            <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-black/25">{t('hero.follow')}</span>
            <a
              href="https://www.instagram.com/seaphiya.tat/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] md:text-[10px] text-black/40 hover:text-ink-black transition-colors duration-300"
            >
              Instagram
            </a>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="font-display text-[15vw] md:text-[12vw] tracking-tighter leading-none text-ink-black z-10"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          SEAPHIYA
        </motion.h1>

        {/* Main Content */}
        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="absolute inset-0 z-10 flex flex-col items-center">
          {/* Top section */}
          <motion.div
            className="absolute top-[calc(50%-12vw)] md:top-[calc(50%-10vw)] w-[82vw] md:w-[75vw] lg:w-[68vw] flex justify-between text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 text-ink-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span>{t('hero.established')}</span>
            <span>{t('hero.cities')}</span>
          </motion.div>

          {/* Quote below title */}
          <div className="absolute top-[calc(50%+8vw)] md:top-[calc(50%+7vw)] text-center">
            <motion.div className="font-editorial italic text-2xl md:text-4xl lg:text-5xl font-light flex justify-center items-baseline gap-x-[0.15em]">
              <motion.span
                className="text-black/50"
                initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {t('hero.tagline.center1')}
              </motion.span>
              <motion.span
                className="text-black/90"
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {t('hero.tagline.center2')}
              </motion.span>
            </motion.div>

            {/* Style tags */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              {[t('styles.fineLine'), t('styles.microRealism'), t('styles.botanical'), t('styles.minimalist')].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1.5 border border-black/10 rounded-full font-mono text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-black/40"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 2.1 + i * 0.08 }}
                  whileHover={{ scale: 1.08, borderColor: 'rgba(45,45,45,0.5)', y: -2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ y: scrollIndicatorY, opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
        >
          <motion.span
            className="font-mono text-[8px] uppercase tracking-[0.3em] text-black/25"
            animate={{ opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {t('hero.scroll')}
          </motion.span>
          <motion.div
            className="h-10 w-[1px] bg-gradient-to-b from-black/30 to-transparent"
            animate={{ scaleY: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* SCROLLABLE CONTENT */}
      <div className="relative z-20 w-full flex flex-col gap-0">

        {/* ABOUT */}
        <section id="about" className="min-h-screen bg-paper-white py-24 md:py-0 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div className="flex items-center px-6 md:px-16 lg:px-24 py-16 md:py-0">
              <motion.div
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  className="flex items-center gap-4 mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-[1px] bg-black/40"></div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/60">{t('about.title')}</span>
                </motion.div>

                <div className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-left leading-[1.6] text-black/90">
                  <ScrollRevealText>{t('about.description')}</ScrollRevealText>
                </div>

                <motion.div
                  className="mt-12 pt-8 border-t border-black/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-editorial italic text-3xl md:text-4xl text-ink-black">Seaphiya</h4>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] mt-3 text-black/50 leading-relaxed">
                    {t('about.profession')}<br/>
                    {t('about.location')}
                  </p>

                  <Link href="/booking">
                    <motion.button
                      className="mt-8 group flex items-center gap-3 px-6 py-3 border border-ink-black rounded-full font-mono text-[10px] uppercase tracking-[0.2em] bg-ink-black text-paper-white hover:bg-petal hover:border-petal hover:text-ink-black transition-all duration-500"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{t('about.cta')}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="relative h-[60vh] md:h-auto group overflow-hidden"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 via-transparent to-transparent z-10 pointer-events-none" />
              <Image
                src={images.artist}
                alt="Seaphiya Tattooing"
                fill
                className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <motion.div
                className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/80">{t('about.available')}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Peony Transition */}
        <PeonyTransition />

        {/* WORK / GALLERY */}
        <section id="work" className="bg-paper-white py-24 border-t border-black/10">
          <div className="px-6 md:px-12">
            <div className="flex justify-between items-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest">{t('gallery.title')}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-black/40">{t('gallery.years')}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <motion.div
                  key={num}
                  className="aspect-[3/4] relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: num * 0.1 }}
                >
                  <Image
                    src={`/tattoos/tattoo-${num}.webp`}
                    alt={`Tattoo work ${num}`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-ink-black text-paper-white py-24">
          <div className="px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <div>
                <h2 className="font-display text-5xl md:text-7xl tracking-tighter">{t('footer.makeItPermanent')}</h2>
                <Link href="/booking">
                  <MagneticButton className="mt-8 px-8 py-4 border border-paper-white/30 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-paper-white hover:text-ink-black transition-all duration-500">
                    {t('footer.bookNow')}
                  </MagneticButton>
                </Link>
              </div>

              <div className="flex flex-col items-end gap-4">
                <button
                  onClick={scrollToTop}
                  className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-white/60 hover:text-paper-white transition-colors"
                >
                  <span>{t('footer.top')}</span>
                  <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
                </button>
                <a
                  href="https://www.instagram.com/seaphiya.tat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-white/60 hover:text-paper-white transition-colors"
                >
                  {t('footer.instagram')}
                </a>
              </div>
            </div>

            <div className="mt-24 pt-8 border-t border-paper-white/10 flex justify-between items-center">
              <span className="font-mono text-[10px] text-paper-white/40">{t('footer.copyright')}</span>
              <span className="font-mono text-[10px] text-paper-white/40">Miami, FL</span>
            </div>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}
