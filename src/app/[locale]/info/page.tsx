'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { Moon, Utensils, Droplets, Wine, Shirt, Sparkles, Clock, Cookie, Headphones, Hand, Heart, Check, X, ArrowRight, ArrowUpRight, Sparkle, HeartPulse } from 'lucide-react';

import { Navbar, CustomCursor, MagneticButton } from '@/components/ui';
import { Link } from '@/i18n/navigation';

const beforeItems = [
  { key: 'sleep', icon: Moon, color: 'sage' },
  { key: 'eat', icon: Utensils, color: 'sunflower' },
  { key: 'hydrate', icon: Droplets, color: 'sage' },
  { key: 'alcohol', icon: Wine, color: 'coral' },
  { key: 'clothes', icon: Shirt, color: 'petal' },
  { key: 'lotion', icon: Sparkles, color: 'coral' },
];

const duringItems = [
  { key: 'time', icon: Clock },
  { key: 'snacks', icon: Cookie },
  { key: 'entertainment', icon: Headphones },
  { key: 'breaks', icon: Hand },
  { key: 'trust', icon: Heart },
];

export default function InfoPage() {
  const t = useTranslations('info');
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aftercareRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [selectedFlow, setSelectedFlow] = useState<'pre' | 'post' | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.6,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const handleFlowSelect = (flow: 'pre' | 'post') => {
    setSelectedFlow(flow);
    if (flow === 'post' && aftercareRef.current) {
      setTimeout(() => {
        lenisRef.current?.scrollTo(aftercareRef.current!, { offset: -100, duration: 1.5 });
      }, 100);
    }
  };

  return (
    <div ref={containerRef} className="bg-paper-white min-h-screen text-ink-black font-body antialiased overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-32 right-[15%] w-32 h-32 rounded-full border border-sage/20"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-[10%] w-24 h-24 rounded-full border border-coral/20"
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-[8%] w-2 h-2 rounded-full bg-sunflower/40"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Side decorations */}
        <motion.div
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="h-20 w-[1px] bg-gradient-to-b from-transparent to-black/20" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/20 rotate-180" style={{ writingMode: 'vertical-rl' }}>
            Info · 2025
          </span>
          <div className="h-20 w-[1px] bg-gradient-to-t from-transparent to-black/20" />
        </motion.div>

        {/* Right side decoration */}
        <motion.div
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div className="h-20 w-[1px] bg-gradient-to-b from-transparent to-black/20" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/20" style={{ writingMode: 'vertical-rl' }}>
            Seaphiya
          </span>
          <div className="h-20 w-[1px] bg-gradient-to-t from-transparent to-black/20" />
        </motion.div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl mx-auto text-center relative z-10">
          {/* Big decorative number */}
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none select-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display text-[40vw] md:text-[25vw] font-medium text-ink-black/[0.02] leading-none">
              i
            </span>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-[1px] w-8 bg-black/20" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">
              {t('hero.label')}
            </span>
            <div className="h-[1px] w-8 bg-black/20" />
          </motion.div>

          <motion.h1
            className="mb-8 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display text-[14vw] md:text-[9vw] tracking-tight leading-[0.85] block">
              {t('hero.title1')}
            </span>
            <span className="font-editorial italic text-[12vw] md:text-[8vw] text-ink-black/70 block -mt-2">
              {t('hero.title2')}
            </span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-black/50 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.span
            className="font-mono text-[8px] uppercase tracking-[0.3em] text-black/25"
            animate={{ opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-black/30 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-24 left-6 md:left-12 hidden md:block">
          <div className="w-12 h-[1px] bg-ink-black/10" />
          <div className="w-[1px] h-12 bg-ink-black/10" />
        </div>
        <div className="absolute top-24 right-6 md:right-12 hidden md:block">
          <div className="w-12 h-[1px] bg-ink-black/10 ml-auto" />
          <div className="w-[1px] h-12 bg-ink-black/10 ml-auto" />
        </div>
      </section>

      {/* Flow Picker */}
      <section className="py-20 px-6 md:px-12 border-t border-black/10 relative">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-12">
            {t('flowPicker.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pre-tattoo option */}
            <motion.button
              onClick={() => handleFlowSelect('pre')}
              className={`group relative p-8 rounded-2xl border text-left transition-all duration-500 ${
                selectedFlow === 'pre'
                  ? 'border-sage bg-sage/10'
                  : 'border-black/10 hover:border-sage/50 hover:bg-sage/5'
              }`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 transition-all duration-300 ${
                selectedFlow === 'pre'
                  ? 'border-sage bg-sage/20'
                  : 'border-black/10 group-hover:border-sage/50 group-hover:bg-sage/10'
              }`}>
                <Sparkle className={`w-5 h-5 transition-colors duration-300 ${
                  selectedFlow === 'pre' ? 'text-sage' : 'text-black/30 group-hover:text-sage'
                }`} />
              </div>
              <h3 className="font-display text-xl mb-2">{t('flowPicker.preTattoo.title')}</h3>
              <p className="text-black/50 text-sm">{t('flowPicker.preTattoo.desc')}</p>

              {/* Selection indicator */}
              <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                selectedFlow === 'pre' ? 'border-sage bg-sage' : 'border-black/20'
              }`}>
                {selectedFlow === 'pre' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                )}
              </div>
            </motion.button>

            {/* Post-tattoo option */}
            <motion.button
              onClick={() => handleFlowSelect('post')}
              className={`group relative p-8 rounded-2xl border text-left transition-all duration-500 ${
                selectedFlow === 'post'
                  ? 'border-coral bg-coral/10'
                  : 'border-black/10 hover:border-coral/50 hover:bg-coral/5'
              }`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 transition-all duration-300 ${
                selectedFlow === 'post'
                  ? 'border-coral bg-coral/20'
                  : 'border-black/10 group-hover:border-coral/50 group-hover:bg-coral/10'
              }`}>
                <HeartPulse className={`w-5 h-5 transition-colors duration-300 ${
                  selectedFlow === 'post' ? 'text-coral' : 'text-black/30 group-hover:text-coral'
                }`} />
              </div>
              <h3 className="font-display text-xl mb-2">{t('flowPicker.postTattoo.title')}</h3>
              <p className="text-black/50 text-sm">{t('flowPicker.postTattoo.desc')}</p>

              {/* Selection indicator */}
              <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                selectedFlow === 'post' ? 'border-coral bg-coral' : 'border-black/20'
              }`}>
                {selectedFlow === 'post' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                )}
              </div>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Sections for pre-tattoo flow (Intro, Before, During) */}
      {selectedFlow !== 'post' && (
        <>
            {/* Intro quote */}
            <section className="py-32 px-6 md:px-12 border-t border-black/10 relative">
              <motion.div
                className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <span className="font-display text-[20vw] text-ink-black/[0.03] leading-none select-none">"</span>
              </motion.div>

              <motion.div
                className="max-w-3xl mx-auto text-center relative z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-editorial italic text-2xl md:text-3xl lg:text-4xl text-ink-black/80 leading-[1.4]">
                  {t('intro.text')}
                </p>
                <div className="flex items-center justify-center gap-4 mt-8">
                  <div className="h-[1px] w-12 bg-coral/40" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-coral/60">Seaphiya</span>
                  <div className="h-[1px] w-12 bg-coral/40" />
                </div>
              </motion.div>
            </section>

            {/* Before Section */}
      <section className="py-32 px-6 md:px-12 bg-pure-white relative overflow-hidden">
        {/* Big section number */}
        <motion.div
          className="absolute -right-20 top-20 pointer-events-none select-none hidden md:block"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="font-display text-[30vw] font-medium text-ink-black/[0.02] leading-none">01</span>
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-sage" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sage">{t('before.label')}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-end">
              <h2 className="font-display text-5xl md:text-7xl tracking-tight leading-[0.9]">{t('before.title')}</h2>
              <p className="text-black/50 text-lg md:text-xl leading-relaxed md:pb-2">{t('before.subtitle')}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beforeItems.map((item, idx) => {
              const Icon = item.icon;
              const colors = {
                sage: { bg: 'group-hover:bg-sage/10', border: 'group-hover:border-sage/30', icon: 'group-hover:text-sage', dot: 'bg-sage' },
                coral: { bg: 'group-hover:bg-coral/10', border: 'group-hover:border-coral/30', icon: 'group-hover:text-coral', dot: 'bg-coral' },
                sunflower: { bg: 'group-hover:bg-sunflower/10', border: 'group-hover:border-sunflower/30', icon: 'group-hover:text-sunflower', dot: 'bg-sunflower' },
                petal: { bg: 'group-hover:bg-petal/10', border: 'group-hover:border-petal/30', icon: 'group-hover:text-coral', dot: 'bg-petal' },
              }[item.color];

              return (
                <motion.div
                  key={item.key}
                  className={`group relative p-8 border border-black/10 ${colors?.border} ${colors?.bg} transition-all duration-500 cursor-default`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                >
                  {/* Card number */}
                  <span className="absolute top-4 right-4 font-mono text-[10px] text-black/20 group-hover:text-black/40 transition-colors">
                    0{idx + 1}
                  </span>

                  {/* Dot indicator */}
                  <div className={`absolute top-4 left-4 w-1.5 h-1.5 rounded-full ${colors?.dot} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center mb-6 group-hover:border-black/20 transition-colors">
                    <Icon className={`w-5 h-5 text-black/30 ${colors?.icon} transition-colors duration-300`} />
                  </div>

                  <h3 className="font-display text-xl mb-3">
                    {t(`before.items.${item.key}.title`)}
                  </h3>
                  <p className="text-black/50 text-sm leading-relaxed">
                    {t(`before.items.${item.key}.desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* During Section */}
      <section className="py-32 px-6 md:px-12 border-t border-black/10 relative overflow-hidden">
        {/* Big section number */}
        <motion.div
          className="absolute -left-20 top-20 pointer-events-none select-none hidden md:block"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="font-display text-[30vw] font-medium text-ink-black/[0.02] leading-none">02</span>
        </motion.div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="mb-20 md:text-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center md:justify-end gap-4 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sunflower">{t('during.label')}</span>
              <div className="w-16 h-[1px] bg-sunflower" />
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-end">
              <p className="text-black/50 text-lg md:text-xl leading-relaxed md:order-1 md:pb-2">{t('during.subtitle')}</p>
              <h2 className="font-display text-5xl md:text-7xl tracking-tight leading-[0.9] md:order-2 md:text-right">{t('during.title')}</h2>
            </div>
          </motion.div>

          <div className="space-y-4">
            {duringItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  className="group relative grid grid-cols-12 gap-4 md:gap-8 py-8 px-6 md:px-8 items-center rounded-2xl border border-transparent hover:border-black/5 hover:bg-gradient-to-r hover:from-sunflower/[0.03] hover:to-transparent transition-all duration-500 cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  {/* Left accent line */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-12 rounded-full bg-sunflower transition-all duration-500" />

                  {/* Bottom border */}
                  <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

                  <div className="col-span-2 md:col-span-1">
                    <span className="font-display text-2xl md:text-3xl text-black/10 group-hover:text-sunflower/60 transition-colors duration-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="col-span-10 md:col-span-3">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl border border-black/10 flex items-center justify-center group-hover:border-sunflower/50 group-hover:bg-sunflower/10 group-hover:rotate-3 transition-all duration-500">
                        <Icon className="w-5 h-5 text-black/30 group-hover:text-sunflower transition-colors duration-300" />
                      </div>
                      <h3 className="font-display text-lg md:text-xl group-hover:translate-x-1 transition-transform duration-300">{t(`during.items.${item.key}.title`)}</h3>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-7 md:col-start-5">
                    <p className="text-black/40 group-hover:text-black/60 leading-relaxed pl-0 md:pl-4 transition-colors duration-300">{t(`during.items.${item.key}.desc`)}</p>
                  </div>

                  <div className="col-span-12 md:col-span-1 hidden md:flex justify-end">
                    <div className="w-8 h-8 rounded-full border border-black/0 group-hover:border-black/10 flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-black/0 group-hover:text-black/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
        </>
      )}

      {/* After Section */}
      <section ref={aftercareRef} className="py-32 px-6 md:px-12 bg-ink-black text-paper-white relative overflow-hidden">
        {/* Big section number */}
        <motion.div
          className="absolute -right-20 top-20 pointer-events-none select-none hidden md:block"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="font-display text-[30vw] font-medium text-white/[0.02] leading-none">03</span>
        </motion.div>

        {/* Decorative circles */}
        <div className="absolute top-1/4 left-[5%] w-64 h-64 rounded-full border border-white/5" />
        <div className="absolute bottom-1/4 right-[5%] w-48 h-48 rounded-full border border-coral/10" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-coral" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-coral">{t('after.label')}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-end">
              <h2 className="font-display text-5xl md:text-7xl tracking-tight leading-[0.9]">{t('after.title')}</h2>
              <p className="text-paper-white/50 text-lg md:text-xl leading-relaxed md:pb-2">{t('after.subtitle')}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* First 48 hours */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-sage" />
                </div>
                <h3 className="font-display text-2xl">{t('after.phase1.title')}</h3>
              </div>
              <ul className="space-y-3 pl-14">
                {(t.raw('after.phase1.items') as string[]).map((item: string, i: number) => (
                  <motion.li
                    key={i}
                    className="group relative text-paper-white/60 leading-relaxed py-3 px-4 -ml-4 rounded-lg hover:bg-sage/5 hover:text-paper-white/90 transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-full bg-sage group-hover:h-6 transition-all duration-300" />
                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sage/40 group-hover:bg-sage group-hover:scale-150 transition-all duration-300" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Avoid */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center">
                  <X className="w-4 h-4 text-coral" />
                </div>
                <h3 className="font-display text-2xl text-coral">{t('after.avoid.title')}</h3>
              </div>
              <ul className="space-y-3 pl-14">
                {(t.raw('after.avoid.items') as string[]).map((item: string, i: number) => (
                  <motion.li
                    key={i}
                    className="group relative text-paper-white/60 leading-relaxed py-3 px-4 -ml-4 rounded-lg hover:bg-coral/5 hover:text-paper-white/90 transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-full bg-coral group-hover:h-6 transition-all duration-300" />
                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-coral/40 group-hover:bg-coral group-hover:scale-150 transition-all duration-300" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            className="mt-24 pt-16 border-t border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-petal">{t('after.timeline.title')}</span>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['week1', 'week2', 'week3', 'week4'].map((week, idx) => (
                <motion.div
                  key={week}
                  className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-petal/20 transition-all duration-500 cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Progress indicator */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-petal/0 via-petal/30 to-petal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Connector line */}
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-[1px] bg-gradient-to-r from-petal/20 to-transparent z-10" />
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full border border-petal/30 flex items-center justify-center group-hover:bg-petal/20 group-hover:border-petal/50 transition-all duration-300">
                      <span className="font-mono text-[11px] text-petal/70 group-hover:text-petal transition-colors">{idx + 1}</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-petal/80 group-hover:text-petal transition-colors">
                      {t(`after.timeline.phases.${week}.label`)}
                    </span>
                  </div>
                  <p className="text-paper-white/40 group-hover:text-paper-white/60 text-sm leading-relaxed transition-colors duration-300">
                    {t(`after.timeline.phases.${week}.desc`)}
                  </p>

                  {/* Corner accent */}
                  <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-petal/0 group-hover:bg-petal/30 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA - only for pre-tattoo flow */}
      {selectedFlow !== 'post' && (
        <section className="py-40 px-6 md:px-12 bg-paper-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-display text-[30vw] font-medium text-ink-black/[0.015] leading-none">
            GO
          </span>
        </div>

        {/* Floating circles */}
        <motion.div
          className="absolute top-1/4 left-[15%] w-32 h-32 rounded-full border border-coral/10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[15%] w-24 h-24 rounded-full border border-sage/10"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="h-[1px] w-12 bg-black/20" />
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">Final step</span>
            <div className="h-[1px] w-12 bg-black/20" />
          </motion.div>

          <motion.h2
            className="font-display text-5xl md:text-7xl tracking-tight mb-6 leading-[0.9]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t('cta.title')}
          </motion.h2>

          <motion.p
            className="text-black/50 text-lg md:text-xl mb-14 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('cta.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/booking">
              <MagneticButton>
                <motion.span
                  className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-ink-black bg-ink-black text-paper-white font-mono text-[10px] uppercase tracking-[0.2em] overflow-hidden hover:bg-petal hover:border-petal hover:text-ink-black transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shimmer effect on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  <span className="relative z-10">{t('cta.button')}</span>
                  <ArrowRight className="relative z-10 w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.span>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="h-[1px] w-8 bg-ink-black/10" />
          <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-ink-black/20">
            Seaphiya · Miami · 2025
          </span>
          <div className="h-[1px] w-8 bg-ink-black/10" />
        </motion.div>
        </section>
      )}
    </div>
  );
}
