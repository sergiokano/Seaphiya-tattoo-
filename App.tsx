import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, LayoutGroup } from 'framer-motion';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import PeonyTransition from './components/PeonyTransition';
import ScrollRevealText from './components/ScrollRevealText';
import BookingPage from './components/BookingPage';
import { ArrowRight, ArrowUp } from 'lucide-react';

// Context for navigation
const NavigationContext = createContext<{
  openBooking: () => void;
}>({ openBooking: () => {} });

export const useNavigation = () => useContext(NavigationContext);

// Scroll Progress Indicator - Awwwards style
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed right-2 top-1/2 -translate-y-1/2 h-[30vh] w-[2px] z-[9998] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      {/* Track */}
      <div className="absolute inset-0 bg-white/10 rounded-full" />

      {/* Progress */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-white/60 rounded-full origin-top"
        style={{ scaleY, height: '100%' }}
      />
    </motion.div>
  );
};

const LETTERS = 'SEAPHIYA'.split('');

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
      const totalIterations = 40; // Slower

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
          // Flash highlight then settle
          setTimeout(() => setPhase('settled'), 400);
        }
      }, 100); // Slower interval

      return () => clearInterval(scrambleInterval);
    }, delay * 1000);

    return () => clearTimeout(startDelay);
  }, [finalValue, delay]);

  const colorClass = {
    waiting: 'text-white/10',
    searching: 'text-white/25',
    highlight: 'text-white/80',
    settled: 'text-white/50'
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
      const maxIterations = finalValue.length * 5; // Slower

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
          // Flash highlight then settle
          setTimeout(() => setPhase('settled'), 400);
        }
      }, 70); // Slower interval

      return () => clearInterval(scrambleInterval);
    }, delay * 1000);

    return () => clearTimeout(startDelay);
  }, [finalValue, delay]);

  const colorClass = {
    waiting: 'text-white/10',
    searching: 'text-white/20',
    highlight: 'text-white/70',
    settled: 'text-white/35'
  }[phase];

  return (
    <span className={`font-mono text-[9px] transition-colors duration-500 ${colorClass}`}>
      {displayValue || '———'}
    </span>
  );
};

// Shared letter component - Awwwards-level cinematic entrance
const AnimatedLetter: React.FC<{
  letter: string;
  index: number;
  isTransitioning: boolean;
  isHero: boolean;
  isLoading: boolean;
  isFirstLoad: boolean;
}> = ({ letter, index, isTransitioning, isHero, isLoading, isFirstLoad }) => {
  const isLastA = index === 7;

  // Subtle blur entrance for both first load and subsequent
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
      className="font-display font-semibold tracking-tight leading-[0.9] inline-block text-[15vw] md:text-[14vw]"
      style={{
        marginLeft: isLastA ? '-0.15em' : undefined,
        paintOrder: 'stroke fill',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      initial={initialAnimation}
      animate={{
        opacity: 1,
        scale: isTransitioning ? 1.08 : 1,
        y: isLoading ? [0, -8, 0] : 0,
        filter: isTransitioning ? 'blur(3px)' : 'blur(0px)',
        color: isHero ? '#faf8f5' : 'transparent',
        WebkitTextStroke: isHero ? '1px transparent' : '1px #faf8f5',
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
        WebkitTextStroke: {
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

// Scroll-animated title component
const ScrollAnimatedTitle: React.FC<{
  isLoading: boolean;
  isTransitioning: boolean;
  isHero: boolean;
  isFirstLoad: boolean;
}> = ({ isLoading, isTransitioning, isHero, isFirstLoad }) => {
  const { scrollY } = useScroll();

  // Transform values based on scroll
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
          delay: 3, // Start after loader transition
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

// Preloader component
const Preloader: React.FC<{
  onTransitionStart: () => void;
}> = ({ onTransitionStart }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
        setTimeout(() => onTransitionStart(), 600);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [onTransitionStart]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(250,248,245,0.04) 0%, transparent 60%)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${25 + (i % 4) * 15}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-10, 10, -10],
              opacity: [0.1, 0.4, 0.1],
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
          <div className="font-body font-light text-white/50 lowercase flex justify-center items-center gap-x-[0.4em]">
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

        {/* Progress */}
        <motion.div
          className="w-[280px] md:w-[320px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="relative h-[1px] bg-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/60 via-white to-white/60"
              style={{ width: `${count}%` }}
            />
            <motion.div
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-96px', '320px'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
              {count < 100 ? 'Loading' : 'Ready'}
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-mono text-xs text-white/60 tabular-nums w-6 text-right">
                {count}
              </span>
              <span className="font-mono text-[9px] text-white/30">%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Corner details */}
      <motion.span
        className="absolute top-8 left-8 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Est. 2020
      </motion.span>
      <motion.span
        className="absolute top-8 right-8 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        Miami / NYC
      </motion.span>
      <motion.span
        className="absolute bottom-8 left-8 font-mono text-[9px] uppercase tracking-[0.2em] text-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        Portfolio '25
      </motion.span>
    </motion.div>
  );
};

// Suggest City Form - Inline mini form
const SuggestCityForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!city.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    // Reset after 3 seconds
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
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Thanks! I'll consider {city}</span>
          </motion.div>
        ) : !isOpen ? (
          <motion.button
            key="trigger"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 font-mono text-[9px] text-white/30 hover:text-coral/80 transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="text-white/20">or</span>
            <span className="underline underline-offset-2 decoration-white/10 hover:decoration-coral/40">
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
            className="pt-4 border-t border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full border border-dashed border-coral/30" />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
                  Suggest a city
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/20 hover:text-white/50 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-mono text-[8px] uppercase tracking-[0.2em] text-white/30 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Tokyo, London..."
                  className="w-full bg-transparent border-b border-white/20 focus:border-coral/50 outline-none py-2 text-sm font-light text-white placeholder:text-white/20 transition-colors duration-300"
                  autoFocus
                />
              </div>
              <div>
                <label className="block font-mono text-[8px] uppercase tracking-[0.2em] text-white/20 mb-2">
                  Email <span className="text-white/15">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Get notified"
                  className="w-full bg-transparent border-b border-white/10 focus:border-coral/30 outline-none py-2 text-sm font-light text-white placeholder:text-white/15 transition-colors duration-300"
                />
              </div>
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={!city.trim() || isSubmitting}
              className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-coral/70 hover:text-coral disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
              whileHover={city.trim() ? { x: 4 } : {}}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-3 h-3 border border-coral border-t-transparent rounded-full"
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

const MainContent: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.6,
      touchMultiplier: 1.0,
      lerp: 0.03,
    });

    // Expose lenis globally for navbar smooth scroll
    (window as any).lenis = lenis;

    lenisRef.current = lenis;

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

  // Parallax transforms - locomotive-style layered depth
  const cornerTopLeftY = useTransform(smoothProgress, [0, 0.15], [0, -60]);
  const cornerTopRightY = useTransform(smoothProgress, [0, 0.15], [0, -80]);
  const cornerBottomRightY = useTransform(smoothProgress, [0, 0.12], [0, 50]);
  const sideLeftY = useTransform(smoothProgress, [0, 0.18], [0, -100]);
  const sideRightY = useTransform(smoothProgress, [0, 0.18], [0, -90]);
  const elementsOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const scrollIndicatorY = useTransform(smoothProgress, [0, 0.08], [0, 80]);

  // Quote and badges parallax - more dramatic
  const quoteY = useTransform(smoothProgress, [0, 0.15], [0, -40]);
  const quoteScale = useTransform(smoothProgress, [0, 0.15], [1, 1.1]);
  const quoteBlur = useTransform(smoothProgress, [0, 0.12], [0, 8]);
  const badgesY = useTransform(smoothProgress, [0, 0.12], [0, 30]);
  const badgesScale = useTransform(smoothProgress, [0, 0.1], [1, 0.9]);
  const badgesSpread = useTransform(smoothProgress, [0, 0.12], [0, 20]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  const images = {
    tattoo1: '/tattoos/tattoo-1.webp',
    tattoo2: '/tattoos/tattoo-2.webp',
    tattoo3: '/tattoos/tattoo-3.webp',
    tattoo4: '/tattoos/tattoo-4.webp',
    artist: '/about/artist.webp'
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-ink-black min-h-[400vh] text-pure-white selection:bg-pure-white selection:text-ink-black font-sans antialiased relative cursor-none"
    >
      <Navbar />

      {/* HERO */}
      <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-ink-black">

        {/* Corner Elements - Awwwards 2025 Style with Parallax */}
        {/* Top Left - Hidden on mobile, visible on md+ */}
        <motion.div className="absolute top-28 left-12 z-20 hidden md:block" style={{ y: cornerTopLeftY, opacity: elementsOpacity }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, duration: 0.8 }}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/25">Location</span>
              <ScrambleCoordinate finalValue="25.7617° N" delay={1.8} />
              <ScrambleCoordinate finalValue="80.1918° W" delay={2.0} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/25">Next Guests</span>
              <div className="flex flex-col gap-0.5">
                {['Zurich', 'Valencia', 'New York', 'Vienna'].map((city, i) => (
                  <ScrambleCity key={city} finalValue={city} delay={2.5 + i * 0.3} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Right - Simplified on mobile */}
        <motion.div className="absolute top-20 right-4 md:top-28 md:right-12 z-20" style={{ y: cornerTopRightY, opacity: elementsOpacity }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6, duration: 0.8 }}>
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-white/25">Status</span>
            <div className="flex items-center gap-2">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-sage" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="font-mono text-[9px] md:text-[10px] text-white/50">Now booking</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Right - Adjusted for mobile */}
        <motion.div className="absolute bottom-24 right-4 md:bottom-12 md:right-12 z-20" style={{ y: cornerBottomRightY, opacity: elementsOpacity }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}>
          <div className="flex flex-col items-end gap-2">
            <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-white/25">Follow</span>
            <a href="https://www.instagram.com/seaphiya.tat/" target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] md:text-[10px] text-white/40 hover:text-white transition-colors duration-300">Instagram</a>
          </div>
        </motion.div>

        <motion.div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-4" style={{ y: sideLeftY, opacity: elementsOpacity }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}>
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-white/20" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20 rotate-180" style={{ writingMode: 'vertical-rl' }}>Fine Line Art</span>
          <div className="h-16 w-[1px] bg-gradient-to-t from-transparent to-white/20" />
        </motion.div>

        <motion.div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-4" style={{ y: sideRightY, opacity: elementsOpacity }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 0.8 }}>
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-white/20" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20" style={{ writingMode: 'vertical-rl' }}>By Appointment</span>
          <div className="h-16 w-[1px] bg-gradient-to-t from-transparent to-white/20" />
        </motion.div>

        {/* Main Content - Positioned below the fixed title */}
        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="absolute inset-0 z-10 flex flex-col items-center">
          {/* Top section - Est. 2020 positioned above title */}
          <motion.div className="absolute top-[calc(50%-12vw)] md:top-[calc(50%-10vw)] w-[82vw] md:w-[75vw] lg:w-[68vw] flex justify-between text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.4, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
            <span>Est. 2020</span>
            <span>Miami — New York</span>
          </motion.div>

          {/* Bottom section - Quote and badges below title */}
          <div className="absolute top-[calc(50%+8vw)] md:top-[calc(50%+7vw)] text-center">
            {/* Animated quote - word by word with blur + scroll parallax */}
            <motion.div
              className="font-editorial italic text-2xl md:text-4xl lg:text-5xl font-light flex justify-center items-baseline gap-x-[0.15em]"
              style={{
                y: quoteY,
                scale: quoteScale,
                filter: useTransform(quoteBlur, (v) => `blur(${v}px)`)
              }}
            >
              <motion.span
                className="text-white/50"
                initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Gently,
              </motion.span>
              <motion.span
                className="text-white/90"
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                forever
              </motion.span>
            </motion.div>

            <motion.div className="flex items-center justify-center gap-4 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}>
              <motion.div className="w-8 md:w-12 h-[1px] bg-white/20" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.9, duration: 0.6 }} style={{ originX: 1 }} />
              <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/30">Specializing in</span>
              <motion.div className="w-8 md:w-12 h-[1px] bg-white/20" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.9, duration: 0.6 }} style={{ originX: 0 }} />
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 px-4"
              style={{
                y: badgesY,
                scale: badgesScale,
              }}
            >
              {['Fine Line', 'Micro-Realism', 'Botanical', 'Minimalist'].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1.5 border border-white/10 rounded-full font-mono text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-white/40"
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    filter: 'blur(4px)',
                    x: (i - 1.5) * 30
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    x: 0
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 2.1 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{
                    scale: 1.08,
                    borderColor: 'rgba(250,248,245,0.5)',
                    color: 'rgba(250,248,245,0.9)',
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator - Hidden on mobile to avoid clutter */}
        <motion.div style={{ y: scrollIndicatorY, opacity: scrollIndicatorOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
          <motion.span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/25" animate={{ opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 2, repeat: Infinity }}>Scroll</motion.span>
          <motion.div className="h-10 w-[1px] bg-gradient-to-b from-white/30 to-transparent" animate={{ scaleY: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
      </section>

      {/* SCROLLABLE CONTENT */}
      <div className="relative z-20 w-full flex flex-col gap-0">

        {/* ABOUT */}
        <section id="about" className="min-h-screen bg-ink-black py-24 md:py-0 relative">
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
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-[1px] bg-white/40"></div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">The Artist</span>
                </motion.div>

                <div className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-left leading-[1.6] text-white/90">
                  <ScrollRevealText>
                    Specializing in fine line and micro-realism. Creating pieces that breathe, move, and age with grace. Every line is deliberate.
                  </ScrollRevealText>
                </div>

                {/* Specialties tags */}
                <motion.div
                  className="flex flex-wrap gap-2 mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {['Fine Line', 'Micro-Realism', 'Botanical', 'Minimalist'].map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1.5 border border-white/10 rounded-full font-mono text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-white/40"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                      whileHover={{
                        scale: 1.05,
                        borderColor: 'rgba(250,248,245,0.4)',
                        color: 'rgba(250,248,245,0.8)',
                        y: -1,
                        transition: { duration: 0.25 }
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-12 pt-8 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-editorial italic text-3xl md:text-4xl text-white">Seaphiya</h4>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] mt-3 text-white/50 leading-relaxed">
                    Fine Line Artist<br/>
                    Miami, FL — Noble Art Studio
                  </p>

                  {/* CTA Button */}
                  <motion.button
                    onClick={onOpenBooking}
                    className="mt-8 group flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 hover:bg-white hover:text-black transition-all duration-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Book a Session</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
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
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 via-transparent to-transparent z-10 pointer-events-none" />

              <img
                src={images.artist}
                alt="Seaphiya Tattooing"
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />

              {/* Corner detail on image */}
              <motion.div
                className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">Available</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* STUDIOS & GUEST SPOTS */}
        <section id="studios" className="bg-ink-black border-t border-white/10 relative">
          {/* Section header */}
          <div className="relative bg-ink-black/90 border-b border-white/10 px-6 py-6 flex justify-between items-center z-20">
            <span className="font-mono text-xs uppercase tracking-widest">[ Studios & Guests ]</span>
            <span className="font-mono text-xs uppercase tracking-widest">Worldwide</span>
          </div>

          {/* Three columns: Studios / Past Guests / Upcoming */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10">

            {/* STUDIOS - Resident */}
            <div className="border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-sage" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Studios</span>
                </div>

                <div className="space-y-6">
                  {[
                    { studio: 'Noble Art', location: 'Miami, FL', status: 'Current' },
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
                      <h4 className="font-display text-xl md:text-2xl text-white/80 group-hover:text-white transition-colors duration-300">
                        {item.studio}
                      </h4>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                          {item.location}
                        </p>
                        <span className={`font-mono text-[9px] uppercase tracking-[0.15em] ${
                          item.status === 'Current' ? 'text-sage/70' : 'text-white/25'
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
            <div className="border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Past Guest Spots</span>
                </div>

                <div className="relative">
                  {/* Vertical timeline line */}
                  <motion.div
                    className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originY: 0 }}
                  />

                  <div className="space-y-6 pl-6">
                    {[
                      { city: 'Brooklyn', studio: 'Black Iris Tattoo', year: '2023' },
                      { city: 'Los Angeles', studio: 'Sacred Geometry', year: '2024' },
                      { city: 'Berlin', studio: 'Velvet Needle', year: '2024' },
                      { city: 'Paris', studio: 'Atelier Noir', year: '2024' },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="group relative cursor-default"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ x: 4 }}
                      >
                        {/* Timeline dot */}
                        <motion.div
                          className="absolute -left-6 top-2 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors duration-300"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + idx * 0.12, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        />

                        <div className="flex items-baseline justify-between mb-1">
                          <h4 className="font-editorial italic text-xl md:text-2xl text-white/60 group-hover:text-white transition-colors duration-300">
                            {item.city}
                          </h4>
                          <span className="font-mono text-[9px] text-white/25 group-hover:text-white/50 transition-colors duration-300">
                            {item.year}
                          </span>
                        </div>
                        <div className="overflow-hidden">
                          <motion.p
                            className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 group-hover:text-white/40 transition-colors duration-300"
                            initial={{ y: 0 }}
                            whileHover={{ y: -2 }}
                          >
                            {item.studio}
                          </motion.p>
                        </div>
                        {/* Underline on hover */}
                        <motion.div
                          className="absolute -bottom-1 left-0 h-[1px] bg-white/20"
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* UPCOMING */}
            <div className="p-8 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-coral"
                    animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Upcoming</span>
                </div>

                <div className="relative">
                  {/* Vertical timeline line - animated gradient */}
                  <motion.div
                    className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-coral/40 via-coral/20 to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originY: 0 }}
                  />

                  <div className="space-y-6 pl-6">
                    {[
                      { city: 'Zurich', studio: 'Giahi Tattoo', dates: 'Jan 15 — 20', isNext: true },
                      { city: 'Valencia', studio: 'La Santa Tinta', dates: 'Feb 8 — 14', isNext: false },
                      { city: 'Vienna', studio: 'Noir Ink Studio', dates: 'Mar 1 — 7', isNext: false },
                      { city: 'Melbourne', studio: 'Ethereal Ink', dates: 'Apr 10 — 20', isNext: false },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="group relative cursor-default"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ x: 4 }}
                      >
                        {/* Timeline dot - pulsing for next */}
                        <motion.div
                          className={`absolute -left-6 top-2 w-2 h-2 rounded-full transition-colors duration-300 ${
                            item.isNext ? 'bg-coral' : 'bg-coral/30 group-hover:bg-coral/60'
                          }`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + idx * 0.12, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                          animate={item.isNext ? { scale: [1, 1.3, 1] } : {}}
                        />
                        {/* Glow ring for next */}
                        {item.isNext && (
                          <motion.div
                            className="absolute -left-6 top-2 w-2 h-2 rounded-full bg-coral/30"
                            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}

                        <div className="flex items-baseline justify-between mb-1">
                          <div className="flex items-center gap-3">
                            <h4 className={`font-editorial italic text-xl md:text-2xl transition-colors duration-300 ${
                              item.isNext ? 'text-white' : 'text-white/70 group-hover:text-white'
                            }`}>
                              {item.city}
                            </h4>
                            {item.isNext && (
                              <motion.span
                                className="font-mono text-[8px] uppercase tracking-[0.2em] px-2 py-0.5 bg-coral/20 text-coral rounded-full"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, duration: 0.4 }}
                              >
                                Next
                              </motion.span>
                            )}
                          </div>
                          <span className={`font-mono text-[9px] transition-colors duration-300 ${
                            item.isNext ? 'text-coral' : 'text-coral/50 group-hover:text-coral/80'
                          }`}>
                            {item.dates}
                          </span>
                        </div>
                        <div className="overflow-hidden">
                          <motion.p
                            className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors duration-300"
                            initial={{ y: 0 }}
                            whileHover={{ y: -2 }}
                          >
                            {item.studio}
                          </motion.p>
                        </div>
                        {/* Underline on hover */}
                        <motion.div
                          className="absolute -bottom-1 left-0 h-[1px] bg-coral/30"
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Book CTA - Primary action */}
                <motion.button
                  onClick={onOpenBooking}
                  className="mt-10 group relative flex items-center gap-3 px-5 py-3 bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 rounded-full transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">Book a guest spot</span>
                  <ArrowRight className="w-3 h-3 text-white/60 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Suggest a City - Inline form */}
                <SuggestCityForm />
              </motion.div>
            </div>
          </div>
        </section>

        <PeonyTransition />

        {/* GALLERY */}
        <section id="work" className="bg-ink-black border-t border-white/10 relative z-30">
          <div className="relative bg-ink-black/90 border-b border-white/10 px-6 py-6 flex justify-between items-center z-40">
            <span className="font-mono text-xs uppercase tracking-widest">[ Selected Works ]</span>
            <span className="font-mono text-xs uppercase tracking-widest">2020 — 2025</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {[
              { id: '01', title: 'Fine Line Art', img: images.tattoo1 },
              { id: '02', title: 'Micro Realism', img: images.tattoo2 },
              { id: '03', title: 'Botanical Flow', img: images.tattoo3 },
              { id: '04', title: 'Delicate Details', img: images.tattoo4 }
            ].map((item, idx) => (
              <div key={idx} className="relative group border-b border-r border-white/10 h-[80vh] overflow-hidden">
                <div className="absolute inset-0 bg-neutral-900">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 flex flex-col justify-between p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xl text-white">{item.id}</span>
                    <ArrowRight className="-rotate-45 text-white" />
                  </div>
                  <div>
                    <h3 className="text-5xl font-black uppercase italic tracking-tighter text-white">{item.title}</h3>
                    <p className="font-mono text-xs uppercase mt-2 tracking-widest text-white/80">View Case Study</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="h-[70vh] bg-pure-white text-ink-black flex flex-col relative overflow-hidden">
          <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black/10">
            <button onClick={onOpenBooking} className="flex-1 flex items-center justify-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-chrome scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="relative z-10 text-center">
                <span className="block font-mono text-xs uppercase tracking-widest mb-4 opacity-50">Make it permanent</span>
                <span className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">Book<br/>Now</span>
              </div>
            </button>
            <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-1 flex items-center justify-center group relative overflow-hidden hover:bg-black hover:text-white transition-colors duration-500">
              <div className="text-center">
                <ArrowUp className="mx-auto w-12 h-12 mb-6 group-hover:-translate-y-4 transition-transform duration-300" />
                <span className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">Top</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-black/10 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest">
            <span>© Seaphiya 2025</span>
            <a href="https://www.instagram.com/seaphiya.tat/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity duration-300">Instagram</a>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [phase, setPhase] = useState<'loading' | 'transitioning' | 'ready'>('loading');
  const [showBooking, setShowBooking] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (phase === 'loading') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    }
  }, [phase]);

  const handleTransitionStart = () => {
    setPhase('transitioning');
    setTimeout(() => {
      setPhase('ready');
      setTimeout(() => setIsFirstLoad(false), 2000);
    }, 1000);
  };

  const openBooking = () => {
    setShowBooking(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeBooking = () => {
    setShowBooking(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const isLoading = phase === 'loading';
  const isTransitioning = phase === 'transitioning';
  const isHero = phase === 'transitioning' || phase === 'ready';

  return (
    <NavigationContext.Provider value={{ openBooking }}>
      <CustomCursor />

      {/* Noise overlay */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.07] mix-blend-overlay bg-noise bg-repeat" />

      {/* Scroll Progress - show when ready */}
      {phase === 'ready' && <ScrollProgress />}

      {/* FIXED TITLE - Animated with scroll */}
      {/* Hide when booking page is open */}
      {!showBooking && (
        <ScrollAnimatedTitle
          isLoading={isLoading}
          isTransitioning={isTransitioning}
          isHero={isHero}
          isFirstLoad={isFirstLoad}
        />
      )}

      {/* Preloader overlay */}
      <AnimatePresence>
        {phase === 'loading' && (
          <Preloader key="preloader" onTransitionStart={handleTransitionStart} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {showBooking ? (
          <motion.div
            key="booking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookingPage onBack={closeBooking} />
          </motion.div>
        ) : (
          phase === 'ready' && (
            <MainContent onOpenBooking={openBooking} />
          )
        )}
      </AnimatePresence>
    </NavigationContext.Provider>
  );
};

export default App;
