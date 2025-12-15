'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Check, Shield, Sparkles, AlertCircle, Plus, Minus } from 'lucide-react';

import { Navbar, CustomCursor } from '@/components/ui';
import { Link, useRouter } from '@/i18n/navigation';

// Accordion component
const AccordionItem = ({
  title,
  children,
  icon,
  accentColor = 'sage',
  defaultOpen = false,
  index,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  accentColor?: 'sage' | 'coral' | 'sunflower' | 'petal';
  defaultOpen?: boolean;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const colorClasses = {
    sage: 'bg-sage/10 border-sage/30 text-sage',
    coral: 'bg-coral/10 border-coral/30 text-coral',
    sunflower: 'bg-sunflower/10 border-sunflower/30 text-sunflower',
    petal: 'bg-petal/20 border-petal/40 text-coral',
  };

  return (
    <motion.div
      className="border-b border-black/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between group"
      >
        <div className="flex items-center gap-4">
          {icon && (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses[accentColor]}`}>
              {icon}
            </div>
          )}
          <span className="font-display text-lg md:text-xl text-ink-black/80 group-hover:text-ink-black transition-colors duration-300 text-left">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:border-black/40 group-hover:bg-black/5 transition-all duration-300"
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-0 md:pl-12">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function InfoPage() {
  const t = useTranslations();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.6,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div ref={containerRef} className="bg-paper-white min-h-screen text-ink-black font-body antialiased">
      <CustomCursor />
      <Navbar showBackButton onBack={handleBack} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">Information</span>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight mt-4 mb-6">
            Before &<br />
            <span className="font-editorial italic font-light">Aftercare</span>
          </h1>
          <p className="text-lg text-black/60 max-w-xl leading-relaxed">
            Everything you need to know for a smooth tattoo experience and perfect healing.
          </p>
        </motion.div>
      </section>

      {/* Accordion Content */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-4xl mx-auto">
          <AccordionItem
            title="Before Your Appointment"
            icon={<Shield className="w-4 h-4" />}
            accentColor="sage"
            defaultOpen
            index={0}
          >
            <ul className="space-y-3">
              {[
                'Get a good night\'s sleep before your appointment',
                'Eat a full meal 1-2 hours before arriving',
                'Stay hydrated - drink plenty of water',
                'Avoid alcohol for 24 hours before',
                'Wear comfortable, loose clothing',
                'Don\'t apply lotion to the area being tattooed',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-black/70"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Check className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </AccordionItem>

          <AccordionItem
            title="Day of Your Tattoo"
            icon={<Sparkles className="w-4 h-4" />}
            accentColor="sunflower"
            index={1}
          >
            <ul className="space-y-3">
              {[
                'Arrive on time or 10 minutes early',
                'Bring snacks and water for longer sessions',
                'Bring entertainment (headphones, book)',
                'Be prepared to take breaks if needed',
                'Trust the process and communicate',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-black/70"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Check className="w-4 h-4 text-sunflower mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </AccordionItem>

          <AccordionItem
            title="Aftercare Instructions"
            icon={<Shield className="w-4 h-4" />}
            accentColor="coral"
            index={2}
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-display text-lg mb-3">First 24-48 Hours</h4>
                <ul className="space-y-2">
                  {[
                    'Leave bandage on for 2-4 hours (or as instructed)',
                    'Wash gently with fragrance-free soap',
                    'Pat dry with clean paper towel',
                    'Apply thin layer of healing ointment',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/70">
                      <Check className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-coral/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-coral" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-coral">Avoid</span>
                </div>
                <ul className="space-y-1 text-sm text-coral/80">
                  <li>Swimming, hot tubs, or baths for 2 weeks</li>
                  <li>Direct sunlight on fresh tattoo</li>
                  <li>Picking or scratching during healing</li>
                </ul>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Healing Timeline"
            icon={<Sparkles className="w-4 h-4" />}
            accentColor="petal"
            index={3}
          >
            <div className="space-y-4">
              {[
                { phase: 'Days 1-3', desc: 'Redness, swelling, and oozing are normal' },
                { phase: 'Days 4-7', desc: 'Peeling and itching begins - don\'t scratch!' },
                { phase: 'Weeks 2-3', desc: 'Outer layer heals, skin may look milky' },
                { phase: 'Week 4+', desc: 'Tattoo is fully healed on the surface' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-petal whitespace-nowrap w-20">
                    {item.phase}
                  </span>
                  <span className="text-black/70">{item.desc}</span>
                </div>
              ))}
            </div>
          </AccordionItem>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink-black text-paper-white py-24">
        <div className="px-6 md:px-12 max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">Ready to book?</h2>
          <p className="text-paper-white/60 mb-8 max-w-md mx-auto">
            Now that you know what to expect, let&apos;s make your tattoo dream a reality.
          </p>
          <Link href="/booking">
            <motion.button
              className="px-8 py-4 border border-paper-white/30 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-paper-white hover:text-ink-black transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Your Session
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
