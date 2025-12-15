'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, ArrowUp } from 'lucide-react';
import Lenis from 'lenis';
import Image from 'next/image';

import { Navbar, CustomCursor, MagneticButton, CursorFollowImage } from '@/components/ui';
import { ScrollRevealText } from '@/components/animations';
import { PeonyTransition } from '@/components/sections';
import { Link } from '@/i18n/navigation';

// Floating Image component - container moves, content follows
const FloatingImage: React.FC<{
  src: string;
  alt: string;
  children?: React.ReactNode;
}> = ({ src, alt, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 25, mass: 0.8 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // More noticeable movement - max ~20px
    x.set((e.clientX - centerX) * 0.05);
    y.set((e.clientY - centerY) * 0.05);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={containerRef} className="relative h-[60vh] md:h-auto">
      <motion.div
        className="relative w-full h-full group cursor-pointer overflow-hidden"
        style={{ x: xSpring, y: ySpring }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{
          opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
        }}
        viewport={{ once: true, margin: "-100px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 via-transparent to-transparent z-10 pointer-events-none" />
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {children}
      </motion.div>
    </div>
  );
};

// Magnetic Badge component - Awwwards style interaction with cursor image preview
const MagneticBadge: React.FC<{
  children: React.ReactNode;
  delay?: number;
  index?: number;
  previewImage?: string | null;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}> = ({ children, delay = 0, index = 0, previewImage, onHoverStart, onHoverEnd }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.15;
    const distanceY = (e.clientY - centerY) * 0.15;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = () => {
    if (previewImage && onHoverStart) {
      onHoverStart();
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    if (onHoverEnd) {
      onHoverEnd();
    }
  };

  return (
    <motion.span
      ref={ref}
      className="badge-hover relative z-[70] px-3 py-1.5 border border-black/10 rounded-full font-mono text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-black/40 cursor-none inline-block bg-paper-white shadow-sm hover:shadow-md hover:shadow-black/10 hover:border-black/20"
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)', x: (index - 2) * 30 }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        x: position.x,
        y: position.y,
      }}
      whileHover={{
        borderColor: 'rgba(0,0,0,0.3)',
        color: 'rgba(0,0,0,0.8)',
        scale: 1.05,
      }}
      transition={{
        opacity: { duration: 0.7, delay: delay + index * 0.08, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.7, delay: delay + index * 0.08, ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 0.7, delay: delay + index * 0.08, ease: [0.22, 1, 0.36, 1] },
        x: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
        y: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
        borderColor: { duration: 0.25, ease: 'easeOut' },
        color: { duration: 0.25, ease: 'easeOut' },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.span>
  );
};

const LETTERS = 'SEAPHIYA'.split('');

// Animated letter component - cinematic entrance with blur
const AnimatedLetter: React.FC<{
  letter: string;
  index: number;
  isTransitioning: boolean;
  isHero: boolean;
  isLoading: boolean;
  isFirstLoad: boolean;
}> = ({ letter, index, isTransitioning, isHero, isLoading, isFirstLoad }) => {
  const isLastA = index === 7;

  const initialAnimation = isFirstLoad ? {
    opacity: 0,
    scale: 1.05,
    filter: 'blur(15px)',
  } : {
    opacity: 0,
    scale: 1.03,
    filter: 'blur(10px)',
  };

  return (
    <motion.span
      className="font-display font-semibold tracking-tight leading-[0.9] inline-block text-[15vw] md:text-[12vw]"
      style={{
        marginLeft: isLastA ? '-0.15em' : undefined,
        paintOrder: 'stroke fill',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        WebkitTextStroke: isHero ? '1px transparent' : '1px #1a1a1a',
      }}
      initial={initialAnimation}
      animate={{
        opacity: 1,
        scale: isTransitioning ? 1.08 : 1,
        y: isLoading ? [0, -8, 0] : 0,
        filter: isTransitioning ? 'blur(3px)' : 'blur(0px)',
        color: isHero ? '#1a1a1a' : 'transparent',
      }}
      transition={{
        opacity: {
          duration: 0.8,
          delay: 0.1 + index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        },
        scale: {
          duration: 1.2,
          delay: 0.1 + index * 0.08,
          ease: [0.34, 1.56, 0.64, 1],
        },
        y: isLoading ? {
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.1,
        } : {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        },
        filter: {
          duration: 1,
          delay: 0.2 + index * 0.06,
          ease: [0.16, 1, 0.3, 1],
        },
        color: {
          duration: 0.6,
          ease: 'easeOut',
          delay: isHero ? 0.3 + index * 0.03 : 0,
        },
      }}
    >
      {letter}
    </motion.span>
  );
};

// Scroll-animated title with breathing effect
const ScrollAnimatedTitle: React.FC<{
  isLoading: boolean;
  isTransitioning: boolean;
  isHero: boolean;
  isFirstLoad: boolean;
}> = ({ isLoading, isTransitioning, isHero, isFirstLoad }) => {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.5]);
  const y = useTransform(scrollY, [0, 400], [0, -150]);
  const blur = useTransform(scrollY, [0, 300], [0, 30]);
  const letterSpacing = useTransform(scrollY, [0, 400], [0, 50]);

  return (
    <motion.div
      className="fixed inset-0 z-[50] flex items-center justify-center pointer-events-none"
      style={{
        opacity,
        scale,
        y,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <motion.div
        className="flex justify-center"
        style={{
          letterSpacing: useTransform(letterSpacing, (v) => `${v}px`),
        }}
        animate={{
          filter: [
            'blur(0px)',
            'blur(2px)',
            'blur(0px)',
            'blur(1px)',
            'blur(0px)'
          ],
          scale: [1, 1.006, 1, 1.003, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      >
        {LETTERS.map((letter, i) => (
          <AnimatedLetter
            key={i}
            letter={letter}
            index={i}
            isLoading={isLoading}
            isTransitioning={isTransitioning}
            isHero={isHero}
            isFirstLoad={isFirstLoad}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// Preloader component with progress counter
const Preloader: React.FC<{
  onTransitionStart: () => void;
}> = ({ onTransitionStart }) => {
  const [count, setCount] = useState(0);
  const hasCompleted = useRef(false);
  const onTransitionStartRef = useRef(onTransitionStart);

  // Keep ref updated
  useEffect(() => {
    onTransitionStartRef.current = onTransitionStart;
  }, [onTransitionStart]);

  useEffect(() => {
    if (hasCompleted.current) return;

    const duration = 2400;
    const steps = 100;
    const increment = 100 / steps;
    const stepTime = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setCount(100);
        clearInterval(timer);
        hasCompleted.current = true;
        setTimeout(() => onTransitionStartRef.current(), 600);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-paper-white flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 60%)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-black/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${25 + (i % 4) * 15}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-10, 10, -10],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Main content - below the fixed title */}
      <div className="relative flex flex-col items-center mt-[25vh]">
        {/* Animated Tagline */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="font-body font-light text-black/50 lowercase flex justify-center items-center gap-x-[0.4em]">
            {['gently', 'forever'].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block text-xs md:text-sm tracking-[0.35em]"
                initial={{
                  opacity: 0,
                  filter: 'blur(8px)'
                }}
                animate={{
                  opacity: 1,
                  filter: 'blur(0px)'
                }}
                transition={{
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.6 + i * 0.15,
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-[280px] md:w-[320px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="relative h-[1px] bg-black/10 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-black/40 via-black/60 to-black/40"
              style={{ width: `${count}%` }}
            />
            <motion.div
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-black/10 to-transparent"
              animate={{ x: ['-96px', '320px'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/30">
              {count < 100 ? 'Loading' : 'Ready'}
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-mono text-xs text-black/60 tabular-nums w-6 text-right">
                {count}
              </span>
              <span className="font-mono text-[9px] text-black/30">%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Corner details */}
      <motion.span
        className="absolute top-8 left-8 font-mono text-[9px] uppercase tracking-[0.2em] text-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Est. 2020
      </motion.span>
      <motion.span
        className="absolute top-8 right-8 font-mono text-[9px] uppercase tracking-[0.2em] text-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        Miami / NYC
      </motion.span>
      <motion.span
        className="absolute bottom-8 left-8 font-mono text-[9px] uppercase tracking-[0.2em] text-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        Portfolio '25
      </motion.span>
    </motion.div>
  );
};

// Scrambling coordinate component - GPS searching effect
const ScrambleCoordinate: React.FC<{
  finalValue: string;
  delay?: number;
}> = ({ finalValue, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [phase, setPhase] = useState<'waiting' | 'searching' | 'highlight' | 'settled'>('waiting');

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setPhase('searching');

      const match = finalValue.match(/^([\d.]+)(°?\s*[NSEW]?)$/);
      if (!match) {
        setDisplayValue(finalValue);
        setPhase('settled');
        return;
      }

      const [, numPart, suffix] = match;
      const finalNum = parseFloat(numPart);

      let iteration = 0;
      const totalIterations = 40;

      const scrambleInterval = setInterval(() => {
        iteration++;

        const progress = iteration / totalIterations;
        const variance = (1 - progress) * 50;
        const randomOffset = (Math.random() - 0.5) * variance;
        const currentNum = finalNum + randomOffset;

        const decimals = numPart.includes('.') ? numPart.split('.')[1].length : 0;
        setDisplayValue(`${currentNum.toFixed(decimals)}${suffix}`);

        if (iteration >= totalIterations) {
          clearInterval(scrambleInterval);
          setDisplayValue(finalValue);
          setPhase('highlight');
          setTimeout(() => setPhase('settled'), 400);
        }
      }, 100);

      return () => clearInterval(scrambleInterval);
    }, delay * 1000);

    return () => clearTimeout(startDelay);
  }, [finalValue, delay]);

  const colorClass = {
    waiting: 'text-black/10',
    searching: 'text-black/25',
    highlight: 'text-black/80',
    settled: 'text-black/50'
  }[phase];

  return (
    <span className={`font-mono text-[10px] transition-colors duration-500 ${colorClass}`}>
      {displayValue || '——.————°'}
    </span>
  );
};

// Scrambling text component - resolving destination effect
const ScrambleCity: React.FC<{
  finalValue: string;
  delay?: number;
}> = ({ finalValue, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [phase, setPhase] = useState<'waiting' | 'searching' | 'highlight' | 'settled'>('waiting');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setPhase('searching');

      let iteration = 0;
      const maxIterations = finalValue.length * 5;

      const scrambleInterval = setInterval(() => {
        iteration++;

        const resolvedCount = Math.floor(iteration / 5);
        let result = '';

        for (let i = 0; i < finalValue.length; i++) {
          if (i < resolvedCount) {
            result += finalValue[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        setDisplayValue(result);

        if (iteration >= maxIterations) {
          clearInterval(scrambleInterval);
          setDisplayValue(finalValue);
          setPhase('highlight');
          setTimeout(() => setPhase('settled'), 400);
        }
      }, 70);

      return () => clearInterval(scrambleInterval);
    }, delay * 1000);

    return () => clearTimeout(startDelay);
  }, [finalValue, delay]);

  const colorClass = {
    waiting: 'text-black/10',
    searching: 'text-black/20',
    highlight: 'text-black/70',
    settled: 'text-black/35'
  }[phase];

  return (
    <span className={`font-mono text-[9px] transition-colors duration-500 ${colorClass}`}>
      {displayValue || '———'}
    </span>
  );
};

// Suggest City Form - Inline mini form for guest spot suggestions
const SuggestCityForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!city.trim()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
      setCity('');
      setEmail('');
    }, 3000);
  };

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-sage"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-4 h-4 rounded-full bg-sage/20 flex items-center justify-center"
            >
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Thanks! I&apos;ll consider {city}</span>
          </motion.div>
        ) : !isOpen ? (
          <motion.button
            key="trigger"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 font-mono text-[10px] text-black/40 hover:text-ink-black transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="text-black/30 group-hover:text-black/50">or</span>
            <span className="underline underline-offset-4 decoration-black/20 group-hover:decoration-ink-black transition-all duration-300">
              suggest a new city
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-4 border-t border-black/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full border border-dashed border-petal/30" />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/40">
                  Suggest a city
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black/20 hover:text-black/50 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-mono text-[8px] uppercase tracking-[0.2em] text-black/30 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Tokyo, London..."
                  className="w-full bg-transparent border-b border-black/20 focus:border-petal/50 outline-none py-2 text-sm font-light text-ink-black placeholder:text-black/20 transition-colors duration-300"
                  autoFocus
                />
              </div>
              <div>
                <label className="block font-mono text-[8px] uppercase tracking-[0.2em] text-black/20 mb-2">
                  Email <span className="text-black/15">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Get notified"
                  className="w-full bg-transparent border-b border-black/10 focus:border-petal/30 outline-none py-2 text-sm font-light text-ink-black placeholder:text-black/15 transition-colors duration-300"
                />
              </div>
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={!city.trim() || isSubmitting}
              className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-petal/70 hover:text-petal disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
              whileHover={city.trim() ? { x: 4 } : {}}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-3 h-3 border border-petal border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <>
                  <span>Send suggestion</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Style badge data with preview images
const STYLE_BADGES = [
  { key: 'fineLine', image: '/tattoos/tattoo-1.webp' },
  { key: 'microRealism', image: '/tattoos/tattoo-2.webp' },
  { key: 'botanical', image: '/tattoos/tattoo-3.webp' },
  { key: 'minimalist', image: '/tattoos/tattoo-4.webp' },
  { key: 'colorTattoos', image: '/tattoos/tattoo-2.webp' }, // Reusing for color tattoos
];

export default function HomePage() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);

  // Loader and transition states
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHero, setIsHero] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isFirstLoad] = useState(true);

  // Cursor follow image state
  const [hoveredBadgeImage, setHoveredBadgeImage] = useState<string | null>(null);

  // Handle scroll hide for cursor image
  const handleScrollHide = useCallback(() => {
    setHoveredBadgeImage(null);
  }, []);

  const handleTransitionStart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsTransitioning(false);
      setIsHero(true);
      setTimeout(() => setShowContent(true), 300);
    }, 800);
  };

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

  // Parallax for tagline, specializing line and badges - disappear before about section
  const taglineY = useTransform(smoothProgress, [0, 0.08], [0, 30]);
  const taglineScale = useTransform(smoothProgress, [0, 0.08], [1, 0.97]);
  const taglineOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0]);
  const specializingY = useTransform(smoothProgress, [0, 0.08], [0, 45]);
  const badgesY = useTransform(smoothProgress, [0, 0.08], [0, 60]);

  // Parallax transforms for corner and side elements
  const cornerTopLeftY = useTransform(smoothProgress, [0, 0.15], [0, -60]);
  const cornerTopRightY = useTransform(smoothProgress, [0, 0.15], [0, -80]);
  const cornerBottomRightY = useTransform(smoothProgress, [0, 0.12], [0, 50]);
  const sideLeftY = useTransform(smoothProgress, [0, 0.18], [0, -100]);
  const sideRightY = useTransform(smoothProgress, [0, 0.18], [0, -90]);

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
    <>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onTransitionStart={handleTransitionStart} />
        )}
      </AnimatePresence>

      {/* Animated Title - Always visible, transforms on scroll */}
      <ScrollAnimatedTitle
        isLoading={isLoading}
        isTransitioning={isTransitioning}
        isHero={isHero}
        isFirstLoad={isFirstLoad}
      />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-paper-white min-h-[400vh] text-ink-black selection:bg-paper-white selection:text-paper-white font-body antialiased relative"
      >
        <CustomCursor />

        {/* Dim overlay - spotlight effect (no blur to keep badges crisp) */}
        <AnimatePresence>
          {hoveredBadgeImage && (
            <motion.div
              className="fixed inset-0 z-[60] pointer-events-none bg-paper-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        <CursorFollowImage
          src={hoveredBadgeImage}
          isVisible={!!hoveredBadgeImage}
          onScrollHide={handleScrollHide}
        />
        {showContent && <Navbar />}

        {/* HERO */}
        <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-paper-white">
          {/* Top Left - Location & Next Guests (hidden on mobile) */}
          {showContent && (
            <motion.div
              className="absolute top-28 left-12 z-20 hidden md:block"
              style={{ y: cornerTopLeftY, opacity: elementsOpacity }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-black/25">{t('hero.location')}</span>
              <ScrambleCoordinate finalValue="25.7617° N" delay={1.8} />
              <ScrambleCoordinate finalValue="80.1918° W" delay={2.0} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-black/25">{t('hero.nextGuests')}</span>
              <div className="flex flex-col gap-0.5">
                {['Zurich', 'Valencia', 'New York', 'Vienna'].map((city, i) => (
                  <ScrambleCity key={city} finalValue={city} delay={2.5 + i * 0.3} />
                ))}
              </div>
            </div>
          </div>
            </motion.div>
          )}

          {/* Status indicator - Top Right */}
          {showContent && (
            <motion.div
              className="absolute top-20 right-4 md:top-28 md:right-12 z-20"
              style={{ y: cornerTopRightY, opacity: elementsOpacity }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
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
          )}

          {/* Follow - Bottom Right */}
          {showContent && (
            <motion.div
              className="absolute bottom-24 right-4 md:bottom-12 md:right-12 z-20"
              style={{ y: cornerBottomRightY, opacity: elementsOpacity }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
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
          )}

          {/* Side Left - Vertical Text (hidden on mobile) */}
          {showContent && (
            <motion.div
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-4"
              style={{ y: sideLeftY, opacity: elementsOpacity }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-black/20" />
              <span
                className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/20 rotate-180"
                style={{ writingMode: 'vertical-rl' }}
              >
                {t('styles.fineLineArt')}
              </span>
              <div className="h-16 w-[1px] bg-gradient-to-t from-transparent to-black/20" />
            </motion.div>
          )}

          {/* Side Right - Vertical Text (hidden on mobile) */}
          {showContent && (
            <motion.div
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-4"
              style={{ y: sideRightY, opacity: elementsOpacity }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-black/20" />
              <span
                className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/20"
                style={{ writingMode: 'vertical-rl' }}
              >
                {t('hero.byAppointment')}
              </span>
              <div className="h-16 w-[1px] bg-gradient-to-t from-transparent to-black/20" />
            </motion.div>
          )}

          {/* Main Content - visible after transition */}
          {showContent && (
            <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="absolute inset-0 z-10 flex flex-col items-center">
              {/* Top section */}
              <motion.div
                className="absolute top-[calc(50%-12vw)] md:top-[calc(50%-10vw)] w-[82vw] md:w-[75vw] lg:w-[68vw] flex justify-between text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 text-ink-black"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.4, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span>{t('hero.established')}</span>
                <span>{t('hero.cities')}</span>
              </motion.div>

              {/* Quote below title */}
          <motion.div
            style={{ opacity: taglineOpacity }}
            className="absolute top-[calc(50%+8vw)] md:top-[calc(50%+7vw)] text-center"
          >
            <motion.div
              style={{ y: taglineY, scale: taglineScale }}
              className="font-editorial italic text-2xl md:text-4xl lg:text-5xl font-light flex justify-center items-baseline gap-x-[0.15em]"
            >
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

            {/* Specializing in line */}
            <motion.div
              style={{ y: specializingY }}
              className="flex items-center justify-center gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <motion.div
                className="w-8 md:w-12 h-[1px] bg-black/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.9, duration: 0.6 }}
                style={{ originX: 1 }}
              />
              <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-black/30">
                {t('hero.specializing')}
              </span>
              <motion.div
                className="w-8 md:w-12 h-[1px] bg-black/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.9, duration: 0.6 }}
                style={{ originX: 0 }}
              />
            </motion.div>

              {/* Style tags */}
              <motion.div
                style={{ y: badgesY }}
                className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 px-4"
              >
                {STYLE_BADGES.map((badge, i) => (
                  <MagneticBadge
                    key={badge.key}
                    delay={0.8}
                    index={i}
                    previewImage={badge.image}
                    onHoverStart={() => setHoveredBadgeImage(badge.image)}
                    onHoverEnd={() => setHoveredBadgeImage(null)}
                  >
                    {t(`styles.${badge.key}`)}
                  </MagneticBadge>
                ))}
              </motion.div>
          </motion.div>
            </motion.div>
          )}

          {/* Scroll Indicator */}
          {showContent && (
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
          )}
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

                {/* Style badges */}
                <motion.div
                  className="flex flex-wrap gap-2 mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {STYLE_BADGES.map((badge, i) => (
                    <MagneticBadge
                      key={badge.key}
                      delay={0.4}
                      index={i}
                      previewImage={badge.image}
                      onHoverStart={() => setHoveredBadgeImage(badge.image)}
                      onHoverEnd={() => setHoveredBadgeImage(null)}
                    >
                      {t(`styles.${badge.key}`)}
                    </MagneticBadge>
                  ))}
                </motion.div>

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

            <FloatingImage src={images.artist} alt="Seaphiya Tattooing">
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
            </FloatingImage>
          </div>
        </section>

        {/* STUDIOS & GUEST SPOTS - Light mode, Awwwards 2025 style */}
        <section id="studios" className="bg-paper-white border-t border-black/10 relative">
          {/* Section header */}
          <div className="relative bg-paper-white/90 backdrop-blur-sm border-b border-black/10 px-6 py-6 flex justify-between items-center z-20">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-black">{t('studios.title')}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-black/40">{t('studios.worldwide')}</span>
          </div>

          {/* Three columns: Studios / Past Guests / Upcoming */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-black/10">

            {/* STUDIOS - Resident */}
            <div className="border-b md:border-b-0 md:border-r border-black/10 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-2 h-2 rounded-full bg-sage" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">{t('studios.studios')}</span>
                </div>

                <div className="space-y-8">
                  {[
                    { studio: 'Noble Art', location: 'Miami, FL', status: t('studios.current') },
                    { studio: 'Noble Art', location: 'Valencia, ES', status: '2020 — 2023' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="group"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                    >
                      <h4 className="font-display text-2xl md:text-3xl text-ink-black/80 group-hover:text-ink-black transition-colors duration-300">
                        {item.studio}
                      </h4>
                      <div className="flex justify-between items-center mt-3">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/40">
                          {item.location}
                        </p>
                        <span className={`font-mono text-[9px] uppercase tracking-[0.15em] ${
                          item.status === t('studios.current') ? 'text-sage' : 'text-black/25'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* PAST GUEST SPOTS */}
            <div className="border-b md:border-b-0 md:border-r border-black/10 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-2 h-2 rounded-full bg-black/20" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">{t('studios.pastGuests')}</span>
                </div>

                <div className="relative">
                  {/* Vertical timeline line - positioned to align with dots */}
                  <motion.div
                    className="absolute left-[3px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-black/15 via-black/10 to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originY: 0 }}
                  />

                  <div className="space-y-7">
                    {[
                      { city: 'Brooklyn', studio: 'Black Iris Tattoo', year: '2023' },
                      { city: 'Los Angeles', studio: 'Sacred Geometry', year: '2024' },
                      { city: 'Berlin', studio: 'Velvet Needle', year: '2024' },
                      { city: 'Paris', studio: 'Atelier Noir', year: '2024' },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="group relative cursor-default pl-7"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ x: 4 }}
                      >
                        {/* Timeline dot - solid with paper-white ring to cover line */}
                        <motion.div
                          className="absolute left-0 top-[0.45rem] w-[7px] h-[7px] rounded-full bg-black/30 group-hover:bg-black/60 transition-colors duration-300 ring-[3px] ring-paper-white"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + idx * 0.12, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        />

                        <div className="flex items-baseline justify-between mb-1">
                          <h4 className="font-editorial italic text-xl md:text-2xl text-black/50 group-hover:text-ink-black transition-colors duration-300">
                            {item.city}
                          </h4>
                          <span className="font-mono text-[9px] text-black/25 group-hover:text-black/50 transition-colors duration-300">
                            {item.year}
                          </span>
                        </div>
                        <motion.p
                          className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/25 group-hover:text-black/40 transition-colors duration-300"
                        >
                          {item.studio}
                        </motion.p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* UPCOMING */}
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-10">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-petal"
                    animate={{ opacity: [1, 0.5, 1], scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">{t('studios.upcoming')}</span>
                </div>

                <div className="relative">
                  {/* Vertical timeline line - positioned to align with dots */}
                  <motion.div
                    className="absolute left-[3px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-petal/30 via-petal/15 to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originY: 0 }}
                  />

                  <div className="space-y-7">
                    {[
                      { city: 'Zurich', studio: 'Giahi Tattoo', dates: 'Jan 15 — 20', isNext: true },
                      { city: 'Valencia', studio: 'La Santa Tinta', dates: 'Feb 8 — 14', isNext: false },
                      { city: 'Vienna', studio: 'Noir Ink Studio', dates: 'Mar 1 — 7', isNext: false },
                      { city: 'Melbourne', studio: 'Ethereal Ink', dates: 'Apr 10 — 20', isNext: false },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="group relative cursor-default pl-7"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ x: 4 }}
                      >
                        {/* Timeline dot - solid with ring to cover line */}
                        <motion.div
                          className={`absolute left-0 top-[0.45rem] w-[7px] h-[7px] rounded-full transition-colors duration-300 ring-[3px] ring-paper-white ${
                            item.isNext ? 'bg-petal' : 'bg-petal/50 group-hover:bg-petal/80'
                          }`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + idx * 0.12, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        />
                        {/* Glow ring for next */}
                        {item.isNext && (
                          <motion.div
                            className="absolute left-0 top-[0.45rem] w-[7px] h-[7px] rounded-full bg-petal/40"
                            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}

                        <div className="flex items-baseline justify-between mb-1">
                          <div className="flex items-center gap-3">
                            <h4 className={`font-editorial italic text-xl md:text-2xl transition-colors duration-300 ${
                              item.isNext ? 'text-ink-black' : 'text-black/50 group-hover:text-ink-black'
                            }`}>
                              {item.city}
                            </h4>
                            {item.isNext && (
                              <motion.span
                                className="font-mono text-[8px] uppercase tracking-[0.2em] px-2 py-0.5 bg-petal/15 text-petal rounded-full"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, duration: 0.4 }}
                              >
                                {t('studios.next')}
                              </motion.span>
                            )}
                          </div>
                          <span className={`font-mono text-[10px] transition-colors duration-300 ${
                            item.isNext ? 'text-petal font-medium' : 'text-black/45 group-hover:text-black/70'
                          }`}>
                            {item.dates}
                          </span>
                        </div>
                        <motion.p
                          className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/25 group-hover:text-black/40 transition-colors duration-300"
                        >
                          {item.studio}
                        </motion.p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Book CTA */}
                <Link href="/booking">
                  <motion.button
                    className="mt-12 group relative flex items-center gap-3 px-5 py-3 bg-ink-black hover:bg-ink-black/90 border border-ink-black rounded-full transition-all duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-white">{t('studios.bookGuestSpot')}</span>
                    <ArrowRight className="w-3 h-3 text-paper-white/70 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                {/* Suggest a City */}
                <SuggestCityForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Peony Transition */}
        <PeonyTransition />

        {/* GALLERY / SELECTED WORKS */}
        <section id="work" className="bg-paper-white border-t border-black/10 relative z-30">
          <div className="relative bg-paper-white/90 border-b border-black/10 px-6 py-6 flex justify-between items-center z-40">
            <span className="font-mono text-xs uppercase tracking-widest">{t('work.title')}</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t('work.years')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {[
              { id: '01', title: t('work.items.fineLineArt'), img: '/tattoos/tattoo-1.webp' },
              { id: '02', title: t('work.items.microRealism'), img: '/tattoos/tattoo-2.webp' },
              { id: '03', title: t('work.items.botanicalFlow'), img: '/tattoos/tattoo-3.webp' },
              { id: '04', title: t('work.items.delicateDetails'), img: '/tattoos/tattoo-4.webp' }
            ].map((item, idx) => (
              <div key={idx} className="relative group border-b border-r border-black/10 h-[80vh] overflow-hidden cursor-pointer">
                {/* Image */}
                <div className="absolute inset-0 bg-ink-black">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover grayscale opacity-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Top gradient - always visible for contrast */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-black/60 to-transparent pointer-events-none" />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top info - always visible */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
                  <span className="font-mono text-2xl md:text-3xl text-white/80 group-hover:text-white transition-colors duration-500">{item.id}</span>
                </div>
                <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
                  <ArrowRight className="w-8 h-8 md:w-10 md:h-10 -rotate-45 text-white/70 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-lg">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <div className="w-8 h-[1px] bg-white/60" />
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">{t('work.viewCaseStudy')}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="h-[70vh] bg-ink-black text-paper-white flex flex-col relative overflow-hidden">
          <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
            <Link href="/booking" className="flex-1 flex items-center justify-center group relative overflow-hidden">
              {/* Animated background reveal */}
              <div className="absolute inset-0 bg-petal scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left" />
              <div className="relative z-10 text-center">
                <span className="block font-mono text-xs uppercase tracking-widest mb-4 opacity-50 group-hover:opacity-100 group-hover:text-ink-black transition-all duration-500 delay-100">{t('footer.makeItPermanent')}</span>
                <span className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none group-hover:text-ink-black transition-colors duration-500">{t('footer.bookNow')}</span>
              </div>
            </Link>
            <button onClick={scrollToTop} className="flex-1 flex items-center justify-center group relative overflow-hidden hover:bg-paper-white hover:text-ink-black transition-colors duration-500">
              <div className="text-center">
                <ArrowUp className="mx-auto w-12 h-12 mb-6 group-hover:-translate-y-4 transition-transform duration-300" />
                <span className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">{t('footer.top')}</span>
              </div>
            </button>
          </div>
          <div className="p-4 border-t border-white/10 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest">
            <span>{t('footer.copyright')}</span>
            <a href="https://www.instagram.com/seaphiya.tat/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity duration-300">{t('footer.instagram')}</a>
          </div>
        </footer>
      </div>
    </motion.div>
    </>
  );
}
