'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useTransform, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowLeft, ArrowRight, Send, Check, Instagram, Plus, X, Link2, MapPin, ChevronDown } from 'lucide-react';

import Image from 'next/image';
import { CustomCursor, MagneticButton, CursorFollowImage } from '@/components/ui';
import { Link, useRouter } from '@/i18n/navigation';

interface ReferenceLink {
  id: string;
  url: string;
  platform: 'instagram' | 'pinterest' | 'other';
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  tattooStyle: string;
  placement: string;
  size: string;
  description: string;
  referenceLinks: ReferenceLink[];
  preferredDate: string;
  budget: string;
  location: string;
  suggestedCity: string;
}

interface Location {
  id: string;
  studio: string;
  city: string;
  country: string;
  status: 'home' | 'confirmed' | 'waitlist';
  dates?: string;
}

// Peony flowers background - draws progressively with step changes
const PeonyBackground: React.FC<{ currentStep: number; totalSteps?: number }> = ({ currentStep, totalSteps = 5 }) => {
  // Calculate base progress from current step (0-1)
  const stepProgress = currentStep / (totalSteps - 1);

  // Smooth spring animation for the progress - ultra smooth Awwwards-level transition
  // Lower stiffness = slower response, higher damping = less oscillation, higher mass = more inertia
  const smoothProgress = useSpring(stepProgress, {
    stiffness: 25,
    damping: 18,
    mass: 1.5,
  });

  // Staggered progress values for different flower layers
  // Each layer starts minimal and completes at different steps for dramatic "growing" effect
  // Step 0 (0.00): Just hints of stems
  // Step 1 (0.25): Stems growing, branches starting
  // Step 2 (0.50): Flower outlines appearing
  // Step 3 (0.75): Inner petals filling in
  // Step 4 (1.00): All details complete
  const progress1 = useTransform(smoothProgress, [0, 1], [0.05, 1]); // Main stems - grow throughout
  const progress2 = useTransform(smoothProgress, [0, 1], [0, 1]); // Secondary branches - full range
  const progress3 = useTransform(smoothProgress, [0.15, 1], [0, 1]); // Flower outlines - start at step 1
  const progress4 = useTransform(smoothProgress, [0.35, 1], [0, 1]); // Inner petals - start at step 2
  const progress5 = useTransform(smoothProgress, [0.55, 1], [0, 1]); // Fine details - start at step 3
  const progress6 = useTransform(smoothProgress, [0.7, 1], [0, 1]); // Center details - final steps

  // Smooth opacity that increases as flower grows
  const bgOpacity = useTransform(smoothProgress, [0, 1], [0.12, 0.25]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, opacity: bgOpacity }}
    >
      {/* LEFT PEONY ARRANGEMENT */}
      <svg className="absolute -left-32 md:-left-48 bottom-0 w-[55%] md:w-[50%] h-[90%]" viewBox="0 0 500 700" preserveAspectRatio="xMaxYMax meet" fill="none">
        <g stroke="currentColor" className="text-ink-black" strokeLinecap="round" strokeLinejoin="round">
          {/* Main stem */}
          <motion.path
            d="M50,750 C80,700 100,650 90,600 C80,550 120,500 100,450 C80,400 130,350 110,300 C90,250 140,200 120,150 C100,100 150,50 130,0"
            strokeWidth="1.2"
            style={{ pathLength: progress1 }}
            opacity="0.9"
          />
          {/* Secondary branches */}
          <motion.path d="M100,450 C150,430 180,400 200,350" strokeWidth="0.9" style={{ pathLength: progress2 }} opacity="0.8" />
          <motion.path d="M90,600 C140,580 170,540 190,500" strokeWidth="0.8" style={{ pathLength: progress2 }} opacity="0.7" />

          {/* Large flower - bottom */}
          <motion.path d="M140,580 C100,560 70,580 65,620 C60,660 90,700 140,710 C190,720 230,690 235,645 C240,600 200,570 140,580" strokeWidth="0.8" style={{ pathLength: progress2 }} />
          <motion.path d="M90,600 C55,595 35,625 45,665 C55,705 95,720 130,705" strokeWidth="0.6" style={{ pathLength: progress3 }} />
          <motion.path d="M190,620 C225,615 245,645 235,685 C225,725 185,735 155,715" strokeWidth="0.6" style={{ pathLength: progress3 }} />
          <motion.path d="M120,610 C90,600 75,625 85,655 C95,685 130,695 155,680 C180,665 185,630 160,615 C135,600 105,615 120,640" strokeWidth="0.5" style={{ pathLength: progress4 }} />
          <motion.path d="M110,640 C85,635 75,660 90,685 C105,710 140,705 150,680" strokeWidth="0.4" style={{ pathLength: progress5 }} />
          <motion.path d="M155,645 C175,640 185,665 175,690 C165,715 135,715 125,690" strokeWidth="0.4" style={{ pathLength: progress5 }} />
          <motion.path d="M130,655 C115,650 108,665 118,682 C128,699 148,695 152,678 C156,661 142,652 130,658" strokeWidth="0.35" style={{ pathLength: progress6 }} />
          <motion.path d="M135,668 C125,665 122,675 130,685 C138,695 150,690 148,678" strokeWidth="0.3" style={{ pathLength: progress6 }} />

          {/* Medium flower - middle */}
          <motion.path d="M180,380 C145,365 115,385 115,420 C115,455 150,480 195,480 C240,480 270,450 265,415 C260,380 220,360 180,380" strokeWidth="0.7" style={{ pathLength: progress3 }} />
          <motion.path d="M140,400 C110,395 95,425 105,460 C115,495 155,505 185,485" strokeWidth="0.5" style={{ pathLength: progress4 }} />
          <motion.path d="M230,405 C260,400 275,430 265,465 C255,500 215,510 190,490" strokeWidth="0.5" style={{ pathLength: progress4 }} />
          <motion.path d="M165,400 C140,395 128,415 138,445 C148,475 180,480 200,465 C220,450 220,420 198,408 C176,396 152,410 168,435" strokeWidth="0.4" style={{ pathLength: progress5 }} />
          <motion.path d="M175,425 C155,420 145,442 158,462 C171,482 198,478 205,455" strokeWidth="0.35" style={{ pathLength: progress6 }} />

          {/* Small flower - top */}
          <motion.path d="M140,200 C115,188 90,200 90,230 C90,260 120,280 155,280 C190,280 215,255 210,225 C205,195 170,180 140,200" strokeWidth="0.6" style={{ pathLength: progress3 }} />
          <motion.path d="M110,215 C85,212 72,235 82,262 C92,289 125,295 148,278" strokeWidth="0.45" style={{ pathLength: progress4 }} />
          <motion.path d="M180,220 C205,217 218,240 208,267 C198,294 165,300 145,283" strokeWidth="0.45" style={{ pathLength: progress4 }} />

          {/* Decorative buds */}
          <motion.path d="M60,520 C35,505 15,520 20,550 C25,580 55,590 75,575 C95,560 90,530 60,520" strokeWidth="0.55" style={{ pathLength: progress3 }} />
          <motion.path d="M170,520 C150,505 125,515 125,545 C125,575 155,590 180,575 C205,560 205,530 170,520" strokeWidth="0.5" style={{ pathLength: progress4 }} />
          <motion.path d="M80,320 C58,308 40,320 45,348 C50,376 78,385 95,370 C112,355 105,325 80,320" strokeWidth="0.45" style={{ pathLength: progress4 }} />
        </g>
      </svg>

      {/* RIGHT PEONY ARRANGEMENT */}
      <svg className="absolute -right-32 md:-right-48 top-0 w-[50%] md:w-[45%] h-[85%]" viewBox="0 0 400 600" preserveAspectRatio="xMinYMin meet" fill="none">
        <g stroke="currentColor" className="text-ink-black" strokeLinecap="round" strokeLinejoin="round">
          {/* Main stem */}
          <motion.path
            d="M380,-50 C360,0 370,50 350,100 C330,150 360,200 340,250 C320,300 350,350 330,400 C310,450 340,500 320,550 C300,600 330,650 310,700"
            strokeWidth="1.1"
            style={{ pathLength: progress1 }}
            opacity="0.8"
          />
          {/* Secondary branches */}
          <motion.path d="M350,100 C300,120 270,160 260,210" strokeWidth="0.8" style={{ pathLength: progress2 }} opacity="0.7" />
          <motion.path d="M340,300 C290,310 260,350 255,400" strokeWidth="0.7" style={{ pathLength: progress3 }} opacity="0.6" />

          {/* Large flower - top */}
          <motion.path d="M300,80 C260,60 225,75 220,115 C215,155 250,190 300,195 C350,200 385,165 385,120 C385,75 345,55 300,80" strokeWidth="0.75" style={{ pathLength: progress2 }} />
          <motion.path d="M250,95 C215,90 195,120 205,160 C215,200 258,215 290,195" strokeWidth="0.55" style={{ pathLength: progress3 }} />
          <motion.path d="M350,100 C385,95 405,125 395,165 C385,205 345,220 315,200" strokeWidth="0.55" style={{ pathLength: progress3 }} />
          <motion.path d="M280,105 C250,98 235,122 248,155 C261,188 298,195 320,175 C342,155 340,120 315,108 C290,96 262,115 280,142" strokeWidth="0.45" style={{ pathLength: progress4 }} />
          <motion.path d="M268,130 C245,125 235,150 250,175 C265,200 298,195 308,170" strokeWidth="0.4" style={{ pathLength: progress5 }} />
          <motion.path d="M310,135 C332,130 342,155 332,180 C322,205 290,205 280,180" strokeWidth="0.4" style={{ pathLength: progress5 }} />
          <motion.path d="M295,160 C282,157 278,172 288,185 C298,198 315,192 315,175" strokeWidth="0.3" style={{ pathLength: progress6 }} />

          {/* Medium flower - middle */}
          <motion.path d="M280,350 C248,338 220,355 220,390 C220,425 255,450 298,448 C341,446 368,415 362,378 C356,341 315,328 280,350" strokeWidth="0.65" style={{ pathLength: progress3 }} />
          <motion.path d="M242,368 C215,365 200,395 212,430 C224,465 262,475 290,455" strokeWidth="0.5" style={{ pathLength: progress4 }} />
          <motion.path d="M325,365 C355,362 370,392 360,427 C350,462 312,472 285,452" strokeWidth="0.5" style={{ pathLength: progress4 }} />
          <motion.path d="M282,400 C262,396 255,418 270,440 C285,462 315,456 322,432" strokeWidth="0.35" style={{ pathLength: progress5 }} />

          {/* Decorative elements */}
          <motion.path d="M240,240 C222,230 205,242 210,265 C215,288 238,295 252,280 C266,265 260,238 240,240" strokeWidth="0.45" style={{ pathLength: progress4 }} />
          <motion.path d="M380,200 C360,185 335,195 335,225 C335,255 365,270 390,255 C415,240 415,210 380,200" strokeWidth="0.5" style={{ pathLength: progress3 }} />
          <motion.path d="M225,310 C205,298 182,310 188,338 C194,366 222,375 242,360 C262,345 255,315 225,310" strokeWidth="0.45" style={{ pathLength: progress4 }} />
          <motion.path d="M340,480 C320,468 295,480 300,508 C305,536 335,545 355,530 C375,515 370,485 340,480" strokeWidth="0.45" style={{ pathLength: progress4 }} />
        </g>
      </svg>
    </motion.div>
  );
};

// Style Badge component - Magnetic badge with hover preview
const StyleBadge: React.FC<{
  style: { id: string; label: string; desc: string; image: string };
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}> = ({ style, index, isSelected, onSelect, onHoverStart, onHoverEnd }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.12;
    const distanceY = (e.clientY - centerY) * 0.12;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    onHoverEnd();
  };

  return (
    <motion.button
      ref={ref}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleMouseLeave}
      className={`relative z-10 px-4 py-2.5 border rounded-full font-mono text-[10px] uppercase tracking-[0.12em] cursor-none transition-colors duration-300 ${
        isSelected
          ? 'bg-ink-black border-ink-black text-paper-white'
          : 'bg-paper-white/60 backdrop-blur-sm border-black/10 text-black/50 hover:border-black/30 hover:text-black/80 hover:bg-paper-white'
      }`}
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        x: position.x,
        y: position.y,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] },
        x: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
        y: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
      }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {style.label}
        {isSelected && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <Check className="w-3 h-3" />
          </motion.span>
        )}
      </span>
    </motion.button>
  );
};

export default function BookingPage() {
  const t = useTranslations();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [currentStep, setCurrentStep] = useState(0); // 0 = location, 1-4 = form steps
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    tattooStyle: '',
    placement: '',
    size: '',
    description: '',
    referenceLinks: [],
    preferredDate: '',
    budget: '',
    location: '',
    suggestedCity: '',
  });

  const locations: Location[] = [
    { id: 'miami', studio: 'Noble Art Studio', city: 'Miami', country: 'USA', status: 'home' },
    { id: 'zurich', studio: 'Giahi Tattoo', city: 'Zurich', country: 'Switzerland', status: 'confirmed', dates: 'Jan 15 — 20, 2025' },
    { id: 'valencia', studio: 'La Santa Tinta', city: 'Valencia', country: 'Spain', status: 'confirmed', dates: 'Feb 8 — 14, 2025' },
    { id: 'vienna', studio: 'Noir Ink Studio', city: 'Vienna', country: 'Austria', status: 'confirmed', dates: 'Mar 1 — 7, 2025' },
  ];

  const tattooStyles = [
    { id: 'fineline', label: t('styles.fineLine'), desc: t('styles.fineLineDesc'), image: '/tattoos/tattoo-1.webp' },
    { id: 'microrealism', label: t('styles.microRealism'), desc: t('styles.microRealismDesc'), image: '/tattoos/tattoo-2.webp' },
    { id: 'botanical', label: t('styles.botanical'), desc: t('styles.botanicalDesc'), image: '/tattoos/tattoo-3.webp' },
    { id: 'minimalist', label: t('styles.minimalist'), desc: t('styles.minimalistDesc'), image: '/tattoos/tattoo-4.webp' },
    { id: 'colorTattoos', label: t('styles.colorTattoos'), desc: t('styles.colorTattoosDesc'), image: '/tattoos/tattoo-1.webp' },
    { id: 'ornamental', label: t('styles.ornamental'), desc: t('styles.ornamentalDesc'), image: '/tattoos/tattoo-2.webp' },
  ];

  const sizes = [
    { id: 'tiny', label: t('sizes.tiny'), desc: t('sizes.tinyDesc') },
    { id: 'small', label: t('sizes.small'), desc: t('sizes.smallDesc') },
    { id: 'medium', label: t('sizes.medium'), desc: t('sizes.mediumDesc') },
    { id: 'large', label: t('sizes.large'), desc: t('sizes.largeDesc') },
  ];

  const budgets = [
    { id: '200-400', label: t('budgets.range1') },
    { id: '400-600', label: t('budgets.range2') },
    { id: '600-1000', label: t('budgets.range3') },
    { id: '1000+', label: t('budgets.range4') },
  ];

  const formSteps = [
    { title: t('steps.step1.title'), subtitle: t('steps.step1.subtitle') },
    { title: t('steps.step2.title'), subtitle: t('steps.step2.subtitle') },
    { title: t('steps.step3.title'), subtitle: t('steps.step3.subtitle') },
    { title: t('steps.step4.title'), subtitle: t('steps.step4.subtitle') },
  ];

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

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => router.push('/');

  const handleInputChange = (field: keyof FormData, value: string | ReferenceLink[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectLocation = (locationId: string) => {
    handleInputChange('location', locationId);
    // Auto-advance to next step after a brief delay for visual feedback
    setTimeout(() => {
      setCurrentStep(1);
      scrollToTop();
    }, 300);
  };

  const detectPlatform = (url: string): 'instagram' | 'pinterest' | 'other' => {
    if (url.includes('instagram.com') || url.includes('instagr.am')) return 'instagram';
    if (url.includes('pinterest.com') || url.includes('pin.it')) return 'pinterest';
    return 'other';
  };

  const addReferenceLink = () => {
    if (!newLinkUrl.trim()) return;
    const newLink: ReferenceLink = {
      id: Date.now().toString(),
      url: newLinkUrl.trim(),
      platform: detectPlatform(newLinkUrl.trim()),
    };
    handleInputChange('referenceLinks', [...formData.referenceLinks, newLink]);
    setNewLinkUrl('');
  };

  const removeReferenceLink = (id: string) => {
    handleInputChange('referenceLinks', formData.referenceLinks.filter((link) => link.id !== id));
  };

  const getPlatformIcon = (platform: 'instagram' | 'pinterest' | 'other') => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'pinterest':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.92s-.35-.71-.35-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.69 0 1.03-.66 2.57-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.77-2.25 3.77-5.49 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.21 0 1.03.4 2.14.89 2.74.1.12.11.22.08.34l-.33 1.36c-.05.22-.18.27-.4.16-1.49-.7-2.43-2.87-2.43-4.62 0-3.76 2.73-7.22 7.88-7.22 4.14 0 7.35 2.95 7.35 6.89 0 4.11-2.59 7.42-6.19 7.42-1.21 0-2.35-.63-2.74-1.37l-.75 2.84c-.27 1.04-1 2.35-1.49 3.14A12 12 0 1 0 12 0z" />
          </svg>
        );
      default:
        return <Link2 className="w-4 h-4" />;
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      scrollToTop();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      scrollToTop();
    }
  };

  const goToLocationStep = () => {
    setCurrentStep(0);
    scrollToTop();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getSelectedLocation = () => {
    if (formData.location === 'suggest') {
      return { city: formData.suggestedCity || 'Your City', studio: 'Waitlist', status: 'waitlist' as const };
    }
    return locations.find((loc) => loc.id === formData.location);
  };

  // Success screen
  if (isSubmitted) {
    return (
      <div ref={containerRef} className="bg-paper-white min-h-screen text-ink-black font-body antialiased">
        <CustomCursor />
        <PeonyBackground currentStep={4} />

        <section className="min-h-screen flex items-center justify-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-lg"
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-sage/20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <Check className="w-10 h-10 text-sage" />
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl tracking-tight mb-4">{t('booking.success.title')}</h1>
            <p className="text-2xl font-editorial italic text-ink-black/60 mb-6">{t('booking.success.subtitle')}</p>
            <p className="text-ink-black/50 mb-12">{t('booking.success.message')}</p>

            <MagneticButton onClick={handleBack} className="px-8 py-4 border border-ink-black/30 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-ink-black hover:text-paper-white transition-all duration-500">
              {t('booking.success.backHome')}
            </MagneticButton>
          </motion.div>
        </section>
      </div>
    );
  }

  // Step 0: Location Selection (Full Screen)
  if (currentStep === 0) {
    return (
      <div ref={containerRef} className="bg-paper-white min-h-screen text-ink-black font-body antialiased">
        <CustomCursor />
        <PeonyBackground currentStep={0} />

        {/* Header */}
        <header className="fixed top-0 left-0 w-full p-6 md:px-10 md:py-6 flex justify-between items-center z-50 bg-paper-white/80 backdrop-blur-xl border-b border-black/5">
          <motion.button
            onClick={handleBack}
            className="flex items-center gap-3 px-4 py-2 rounded-full border border-black/10 text-black/70 hover:text-ink-black hover:border-black/30 transition-all duration-300 group"
            whileHover={{ x: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]">{t('booking.header.back')}</span>
          </motion.button>

          <Link href="/" className="flex flex-col items-center hover:opacity-70 transition-opacity">
            <span className="font-display text-xl font-semibold tracking-tight">seaphiya</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-black/40">{t('booking.header.title')}</span>
          </Link>

          <div className="w-24" />
        </header>

        {/* Main Content */}
        <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24 min-h-screen flex flex-col">
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            {/* Hero Section */}
            <motion.div className="mb-12 md:mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <div className="overflow-hidden mb-6">
                <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-black/30"></div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/40">{t('booking.hero.subtitle')}</span>
                </motion.div>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[11vw] md:text-[8vw] lg:text-[6vw] font-display font-semibold tracking-tight leading-[0.9]"
                >
                  {t('booking.hero.title')}
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[11vw] md:text-[8vw] lg:text-[6vw] font-editorial italic font-light tracking-tight leading-[0.9] text-black/50"
                >
                  {t('booking.hero.title2')}
                </motion.h1>
              </div>
            </motion.div>

            {/* Location Selection */}
            <motion.div className="flex-1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/40">{t('booking.location.title')}</span>
                <div className="flex-1 h-[1px] bg-black/10" />
              </div>

              <div className="space-y-1">
                {locations.map((loc, i) => (
                  <motion.button
                    key={loc.id}
                    onClick={() => selectLocation(loc.id)}
                    className={`relative w-full text-left transition-all duration-300 group ${formData.location === loc.id ? 'bg-black/[0.05]' : 'hover:bg-black/[0.02]'}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <div className="flex items-center py-5 px-4 border-b border-black/[0.06]">
                      <div className="w-8 flex justify-center mr-4">
                        <motion.div
                          className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                            formData.location === loc.id ? 'bg-ink-black border-ink-black' : 'border-black/20 group-hover:border-black/40'
                          }`}
                          animate={{ scale: formData.location === loc.id ? 1.1 : 1 }}
                        />
                      </div>
                      <span className={`text-2xl md:text-3xl font-light tracking-tight transition-all duration-300 min-w-[140px] md:min-w-[180px] ${formData.location === loc.id ? 'text-ink-black' : 'text-black/60 group-hover:text-black/80'}`}>
                        {loc.city}
                      </span>
                      <span className="hidden md:block text-sm text-black/30 flex-1 px-6">{loc.studio}</span>
                      <div className="flex items-center gap-4 ml-auto">
                        {loc.dates && <span className="hidden sm:block font-mono text-[10px] text-black/40">{loc.dates}</span>}
                        <span className={`font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 ${loc.status === 'home' ? 'text-black/70 border-black/20 bg-black/[0.05]' : 'text-black/50 border-black/10'}`}>
                          {loc.status === 'home' ? 'Home Studio' : 'Guest Spot'}
                        </span>
                        <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-black/40 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </motion.button>
                ))}

                {/* Suggest a City */}
                <motion.button
                  onClick={() => {
                    handleInputChange('location', 'suggest');
                  }}
                  className={`relative w-full text-left transition-all duration-300 group ${formData.location === 'suggest' ? 'bg-coral/5' : 'hover:bg-black/[0.02]'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + locations.length * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center py-5 px-4 border-b border-black/[0.06]">
                    <div className="w-8 flex justify-center mr-4">
                      <motion.div
                        className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${formData.location === 'suggest' ? 'bg-coral border-coral' : 'border-dashed border-black/20 group-hover:border-coral/50'}`}
                      />
                    </div>
                    <span className={`text-2xl md:text-3xl font-light tracking-tight transition-all duration-300 ${formData.location === 'suggest' ? 'text-coral' : 'text-black/40 group-hover:text-coral/80'}`}>
                      Suggest a city
                    </span>
                    <span className="hidden md:block text-sm text-black/20 flex-1 px-6 italic">Join the waitlist</span>
                    <span className="ml-auto font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-dashed border-coral/30 text-coral/60">Waitlist</span>
                  </div>
                </motion.button>
              </div>

              {/* Suggested City Input */}
              <AnimatePresence>
                {formData.location === 'suggest' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <div className="pt-8 pl-12">
                      <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-coral/60 mb-3">Which city?</label>
                      <input
                        type="text"
                        value={formData.suggestedCity}
                        onChange={(e) => handleInputChange('suggestedCity', e.target.value)}
                        placeholder="e.g. London, Tokyo, Berlin..."
                        className="w-full max-w-md bg-transparent border-b-2 border-coral/30 focus:border-coral/60 outline-none py-3 text-xl font-light text-ink-black placeholder:text-black/20 transition-colors duration-300"
                        autoFocus
                      />
                      <div className="flex items-center gap-4 mt-6">
                        <motion.button
                          onClick={() => {
                            if (formData.suggestedCity.trim()) {
                              setCurrentStep(1);
                              scrollToTop();
                            }
                          }}
                          disabled={!formData.suggestedCity.trim()}
                          className="flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-paper-white font-mono text-[10px] uppercase tracking-[0.2em] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-coral/90 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Continue
                          <ArrowRight className="w-3 h-3" />
                        </motion.button>
                        <p className="font-mono text-[10px] text-black/30">I&apos;ll let you know when I&apos;m planning to visit.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>

        {/* Side Info */}
        <aside className="hidden xl:block fixed right-0 top-1/2 -translate-y-1/2 p-8 z-40">
          <a href="https://www.instagram.com/seaphiya.tat/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-black/40 hover:text-ink-black transition-colors group">
            <Instagram className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">@seaphiya.tat</span>
          </a>
        </aside>

        {/* Bottom Corner Details */}
        <div className="fixed bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.2em] text-black/20 z-40 hidden md:block">
          Step 1 of 5
        </div>
        <div className="fixed bottom-6 right-6 font-mono text-[9px] uppercase tracking-[0.2em] text-black/20 z-40 hidden md:block">
          Miami, FL
        </div>
      </div>
    );
  }

  // Steps 1-4: Form Steps with Location Badge
  const formStepIndex = currentStep - 1; // 0-3 for form steps array

  const renderFormStep = () => {
    switch (formStepIndex) {
      case 0: // Your Vision
        return (
          <motion.div
            key="form-step0"
            initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/50 mb-3">
                {t('booking.form.describeVision')}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your tattoo idea, its meaning, and any specific elements you'd like to include..."
                className="w-full bg-transparent border border-black/10 focus:border-black/30 rounded-xl p-4 text-sm font-light text-ink-black placeholder:text-black/25 resize-none transition-colors duration-300 min-h-[120px] outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/50">
                  {t('booking.form.references')} <span className="text-black/30">({t('common.optional')})</span>
                </label>
                <span className="font-mono text-[8px] text-black/30">{formData.referenceLinks.length}/5</span>
              </div>

              {formData.referenceLinks.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.referenceLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10">
                      {getPlatformIcon(link.platform)}
                      <span className="text-[10px] text-black/60 max-w-[120px] truncate">
                        {link.url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 25)}
                      </span>
                      <button onClick={() => removeReferenceLink(link.id)} className="text-black/30 hover:text-black/60 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {formData.referenceLinks.length < 5 && (
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addReferenceLink()}
                    placeholder="Paste Instagram or Pinterest URL..."
                    className="flex-1 bg-black/5 border border-black/10 focus:border-black/30 rounded-lg px-4 py-3 text-sm text-ink-black placeholder:text-black/25 outline-none transition-all"
                  />
                  <motion.button
                    onClick={addReferenceLink}
                    disabled={!newLinkUrl.trim()}
                    className="px-4 bg-black/10 hover:bg-black/20 disabled:opacity-30 border border-black/10 rounded-lg text-ink-black transition-all"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 1: // The Details
        return (
          <motion.div
            key="form-step1"
            initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/50 mb-4">{t('booking.form.style')}</label>
              <div className="flex flex-wrap gap-2">
                {tattooStyles.map((style, index) => {
                  const isSelected = formData.tattooStyle === style.id;

                  return (
                    <StyleBadge
                      key={style.id}
                      style={style}
                      index={index}
                      isSelected={isSelected}
                      onSelect={() => handleInputChange('tattooStyle', style.id)}
                      onHoverStart={() => {
                        setPreviewImage(style.image);
                        setShowPreview(true);
                      }}
                      onHoverEnd={() => {
                        setShowPreview(false);
                      }}
                    />
                  );
                })}
              </div>

              {/* Mobile preview - shows below badges when selected */}
              <AnimatePresence>
                {formData.tattooStyle && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="mt-4 md:hidden overflow-hidden"
                  >
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                      <Image
                        src={tattooStyles.find(s => s.id === formData.tattooStyle)?.image || ''}
                        alt="Style preview"
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <Check className="w-3 h-3 text-paper-white" />
                        <span className="text-[10px] uppercase tracking-wider text-paper-white/80">
                          {tattooStyles.find(s => s.id === formData.tattooStyle)?.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cursor follow image for desktop */}
              <CursorFollowImage
                src={previewImage}
                isVisible={showPreview}
                onScrollHide={() => setShowPreview(false)}
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/50 mb-3">{t('booking.form.placement')}</label>
              <input
                type="text"
                value={formData.placement}
                onChange={(e) => handleInputChange('placement', e.target.value)}
                placeholder="e.g. Inner forearm, Collarbone, Behind ear..."
                className="w-full bg-black/5 border border-black/10 focus:border-black/30 rounded-xl p-4 text-sm font-light text-ink-black placeholder:text-black/25 outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/50 mb-3">{t('booking.form.size')}</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <motion.button
                    key={size.id}
                    onClick={() => handleInputChange('size', size.id)}
                    className={`py-3 px-4 rounded-xl border text-left transition-all duration-300 ${
                      formData.size === size.id ? 'border-ink-black bg-ink-black text-paper-white' : 'border-black/10 hover:border-black/30'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="block text-sm font-medium">{size.label}</span>
                    <span className={`text-[10px] ${formData.size === size.id ? 'text-paper-white/60' : 'text-black/40'}`}>{size.desc}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 2: // About You
        return (
          <motion.div
            key="form-step2"
            initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/50 mb-3">{t('booking.form.yourName')}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full bg-black/5 border border-black/10 focus:border-black/30 rounded-xl p-4 text-sm font-light text-ink-black placeholder:text-black/25 outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/50 mb-3">{t('common.email')} *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full bg-black/5 border border-black/10 focus:border-black/30 rounded-xl p-4 text-sm font-light text-ink-black placeholder:text-black/25 outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/50 mb-3">
                {t('booking.form.phone')} <span className="text-black/30">({t('common.optional')})</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full bg-black/5 border border-black/10 focus:border-black/30 rounded-xl p-4 text-sm font-light text-ink-black placeholder:text-black/25 outline-none transition-colors duration-300"
              />
            </div>
          </motion.div>
        );

      case 3: // Final Touch
        return (
          <motion.div
            key="form-step3"
            initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/50 mb-3">
                {t('booking.form.when')} <span className="text-black/30">({t('common.optional')})</span>
              </label>
              <input
                type="text"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                placeholder="e.g. January 2025, Flexible, ASAP..."
                className="w-full bg-black/5 border border-black/10 focus:border-black/30 rounded-xl p-4 text-sm font-light text-ink-black placeholder:text-black/25 outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/50 mb-3">{t('booking.form.budget')}</label>
              <div className="grid grid-cols-2 gap-2">
                {budgets.map((budget) => (
                  <motion.button
                    key={budget.id}
                    onClick={() => handleInputChange('budget', budget.id)}
                    className={`py-4 px-4 rounded-xl border transition-all duration-300 ${
                      formData.budget === budget.id ? 'border-ink-black bg-ink-black text-paper-white' : 'border-black/10 hover:border-black/30 text-ink-black'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-base font-light">{budget.label}</span>
                  </motion.button>
                ))}
              </div>
              <p className="mt-4 font-mono text-[10px] text-black/30">{t('booking.form.pricingNote')}</p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const selectedLocation = getSelectedLocation();

  return (
    <div ref={containerRef} className="bg-paper-white min-h-screen text-ink-black font-body antialiased">
      <CustomCursor />
      <PeonyBackground currentStep={currentStep} />

      {/* Header with Location Badge */}
      <header className="fixed top-0 left-0 w-full p-6 md:px-10 md:py-6 flex justify-between items-center z-50 bg-paper-white/80 backdrop-blur-xl border-b border-black/5">
        <motion.button
          onClick={prevStep}
          className="flex items-center gap-3 px-4 py-2 rounded-full border border-black/10 text-black/70 hover:text-ink-black hover:border-black/30 transition-all duration-300 group"
          whileHover={{ x: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em]">{t('buttons.previous')}</span>
        </motion.button>

        {/* Location Badge - Clickable to change */}
        <motion.button
          onClick={goToLocationStep}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 hover:border-black/20 transition-all group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MapPin className="w-3 h-3 text-black/50" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-black">{selectedLocation?.city}</span>
          <ChevronDown className="w-3 h-3 text-black/30 group-hover:text-black/50 transition-colors" />
        </motion.button>

        <Link href="/" className="flex flex-col items-center hover:opacity-70 transition-opacity">
          <span className="font-display text-lg font-semibold tracking-tight">seaphiya</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-28 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl mx-auto">
          {/* Step Header */}
          <motion.div
            key={`header-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/40">Step {currentStep + 1} of 5</span>
              <div className="flex-1 h-[1px] bg-black/10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">{formSteps[formStepIndex].title}</h2>
            <p className="text-black/50 mt-2">{formSteps[formStepIndex].subtitle}</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="relative h-1 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-ink-black rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep / 4) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">{renderFormStep()}</AnimatePresence>

          {/* Navigation */}
          <motion.div className="flex justify-end mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {currentStep < 4 ? (
              <motion.button
                onClick={nextStep}
                className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-ink-black text-paper-white overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-paper-white via-paper-white/80 to-paper-white opacity-0 group-hover:opacity-10" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
                <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em]">{t('buttons.continue')}</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-sage text-paper-white overflow-hidden disabled:opacity-50"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div className="w-4 h-4 border-2 border-paper-white border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{t('buttons.sending')}</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em]">{t('buttons.submitRequest')}</span>
                    <Send className="relative z-10 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </>
                )}
              </motion.button>
            )}
          </motion.div>
        </div>
      </main>

      {/* Bottom Corner Details */}
      <div className="fixed bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.2em] text-black/20 z-40 hidden md:block">
        {selectedLocation?.city} {selectedLocation?.status === 'home' ? '— Home Studio' : '— Guest'}
      </div>
      <div className="fixed bottom-6 right-6 font-mono text-[9px] uppercase tracking-[0.2em] text-black/20 z-40 hidden md:block">
        Miami, FL
      </div>
    </div>
  );
}
