import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Send, Check, Instagram, Plus, X, Link2, Image } from 'lucide-react';
import Lenis from 'lenis';

interface ReferenceLink {
  id: string;
  url: string;
  platform: 'instagram' | 'pinterest' | 'other';
}

interface Location {
  id: string;
  studio: string;
  city: string;
  country: string;
  status: 'home' | 'confirmed' | 'waitlist';
  dates?: string;
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

// Peony flowers background - draws progressively with scroll
const PeonyBackground: React.FC = () => {
  // Use global scroll progress
  const { scrollYProgress } = useScroll();

  // Staggered progress for different flower elements - flowers draw as you scroll
  const progress1 = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const progress2 = useTransform(scrollYProgress, [0.05, 0.75], [0, 1]);
  const progress3 = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const progress4 = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const progress5 = useTransform(scrollYProgress, [0.2, 0.9], [0, 1]);
  const progress6 = useTransform(scrollYProgress, [0.25, 0.95], [0, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* LEFT PEONY ARRANGEMENT */}
      <svg className="absolute -left-48 bottom-0 w-[50%] h-[90%] opacity-[0.12]" viewBox="0 0 500 700" preserveAspectRatio="xMaxYMax meet" fill="none">
        <g stroke="white" strokeLinecap="round" strokeLinejoin="round">
          {/* Main flowing stem */}
          <motion.path
            d="M50,750 C80,700 100,650 90,600 C80,550 120,500 100,450 C80,400 130,350 110,300 C90,250 140,200 120,150 C100,100 150,50 130,0"
            strokeWidth="1"
            style={{ pathLength: progress1 }}
            opacity="0.8"
          />
          {/* Branch stem 1 */}
          <motion.path
            d="M100,450 C150,430 180,400 200,350"
            strokeWidth="0.8"
            style={{ pathLength: progress2 }}
            opacity="0.7"
          />
          {/* Branch stem 2 */}
          <motion.path
            d="M90,600 C140,580 170,540 190,500"
            strokeWidth="0.7"
            style={{ pathLength: progress2 }}
            opacity="0.6"
          />

          {/* LARGE PEONY - Bottom */}
          <motion.path
            d="M140,580 C100,560 70,580 65,620 C60,660 90,700 140,710 C190,720 230,690 235,645 C240,600 200,570 140,580"
            strokeWidth="0.7"
            style={{ pathLength: progress2 }}
          />
          <motion.path
            d="M90,600 C55,595 35,625 45,665 C55,705 95,720 130,705"
            strokeWidth="0.5"
            style={{ pathLength: progress3 }}
          />
          <motion.path
            d="M190,620 C225,615 245,645 235,685 C225,725 185,735 155,715"
            strokeWidth="0.5"
            style={{ pathLength: progress3 }}
          />
          <motion.path
            d="M120,610 C90,600 75,625 85,655 C95,685 130,695 155,680 C180,665 185,630 160,615 C135,600 105,615 120,640"
            strokeWidth="0.4"
            style={{ pathLength: progress4 }}
          />
          <motion.path
            d="M110,640 C85,635 75,660 90,685 C105,710 140,705 150,680"
            strokeWidth="0.35"
            style={{ pathLength: progress4 }}
          />
          <motion.path
            d="M155,645 C175,640 185,665 175,690 C165,715 135,715 125,690"
            strokeWidth="0.35"
            style={{ pathLength: progress5 }}
          />
          <motion.path
            d="M130,655 C115,650 108,665 118,682 C128,699 148,695 152,678 C156,661 142,652 130,658"
            strokeWidth="0.3"
            style={{ pathLength: progress5 }}
          />
          <motion.path
            d="M135,668 C125,665 122,675 130,685 C138,695 150,690 148,678"
            strokeWidth="0.25"
            style={{ pathLength: progress6 }}
          />

          {/* MEDIUM PEONY - Middle */}
          <motion.path
            d="M180,380 C145,365 115,385 115,420 C115,455 150,480 195,480 C240,480 270,450 265,415 C260,380 220,360 180,380"
            strokeWidth="0.6"
            style={{ pathLength: progress3 }}
          />
          <motion.path
            d="M140,400 C110,395 95,425 105,460 C115,495 155,505 185,485"
            strokeWidth="0.45"
            style={{ pathLength: progress3 }}
          />
          <motion.path
            d="M230,405 C260,400 275,430 265,465 C255,500 215,510 190,490"
            strokeWidth="0.45"
            style={{ pathLength: progress4 }}
          />
          <motion.path
            d="M165,400 C140,395 128,415 138,445 C148,475 180,480 200,465 C220,450 220,420 198,408 C176,396 152,410 168,435"
            strokeWidth="0.35"
            style={{ pathLength: progress4 }}
          />
          <motion.path
            d="M175,425 C155,420 145,442 158,462 C171,482 198,478 205,455"
            strokeWidth="0.3"
            style={{ pathLength: progress5 }}
          />

          {/* SMALL PEONY - Top */}
          <motion.path
            d="M140,200 C115,188 90,200 90,230 C90,260 120,280 155,280 C190,280 215,255 210,225 C205,195 170,180 140,200"
            strokeWidth="0.5"
            style={{ pathLength: progress3 }}
          />
          <motion.path
            d="M110,215 C85,212 72,235 82,262 C92,289 125,295 148,278"
            strokeWidth="0.4"
            style={{ pathLength: progress4 }}
          />
          <motion.path
            d="M180,220 C205,217 218,240 208,267 C198,294 165,300 145,283"
            strokeWidth="0.4"
            style={{ pathLength: progress4 }}
          />

          {/* LEAVES */}
          <motion.path
            d="M60,520 C35,505 15,520 20,550 C25,580 55,590 75,575 C95,560 90,530 60,520"
            strokeWidth="0.5"
            style={{ pathLength: progress2 }}
          />
          <motion.path
            d="M170,520 C150,505 125,515 125,545 C125,575 155,590 180,575 C205,560 205,530 170,520"
            strokeWidth="0.45"
            style={{ pathLength: progress3 }}
          />
          <motion.path
            d="M80,320 C58,308 40,320 45,348 C50,376 78,385 95,370 C112,355 105,325 80,320"
            strokeWidth="0.4"
            style={{ pathLength: progress4 }}
          />
        </g>
      </svg>

      {/* RIGHT PEONY ARRANGEMENT */}
      <svg className="absolute -right-48 top-0 w-[45%] h-[85%] opacity-[0.12]" viewBox="0 0 400 600" preserveAspectRatio="xMinYMin meet" fill="none">
        <g stroke="white" strokeLinecap="round" strokeLinejoin="round">
          {/* Main stem */}
          <motion.path
            d="M380,-50 C360,0 370,50 350,100 C330,150 360,200 340,250 C320,300 350,350 330,400 C310,450 340,500 320,550 C300,600 330,650 310,700"
            strokeWidth="0.9"
            style={{ pathLength: progress1 }}
            opacity="0.7"
          />
          {/* Branches */}
          <motion.path
            d="M350,100 C300,120 270,160 260,210"
            strokeWidth="0.7"
            style={{ pathLength: progress2 }}
            opacity="0.6"
          />
          <motion.path
            d="M340,300 C290,310 260,350 255,400"
            strokeWidth="0.6"
            style={{ pathLength: progress3 }}
            opacity="0.5"
          />

          {/* LARGE PEONY - Top */}
          <motion.path
            d="M300,80 C260,60 225,75 220,115 C215,155 250,190 300,195 C350,200 385,165 385,120 C385,75 345,55 300,80"
            strokeWidth="0.65"
            style={{ pathLength: progress2 }}
          />
          <motion.path
            d="M250,95 C215,90 195,120 205,160 C215,200 258,215 290,195"
            strokeWidth="0.5"
            style={{ pathLength: progress3 }}
          />
          <motion.path
            d="M350,100 C385,95 405,125 395,165 C385,205 345,220 315,200"
            strokeWidth="0.5"
            style={{ pathLength: progress3 }}
          />
          <motion.path
            d="M280,105 C250,98 235,122 248,155 C261,188 298,195 320,175 C342,155 340,120 315,108 C290,96 262,115 280,142"
            strokeWidth="0.4"
            style={{ pathLength: progress4 }}
          />
          <motion.path
            d="M268,130 C245,125 235,150 250,175 C265,200 298,195 308,170"
            strokeWidth="0.35"
            style={{ pathLength: progress5 }}
          />
          <motion.path
            d="M310,135 C332,130 342,155 332,180 C322,205 290,205 280,180"
            strokeWidth="0.35"
            style={{ pathLength: progress5 }}
          />
          <motion.path
            d="M295,160 C282,157 278,172 288,185 C298,198 315,192 315,175"
            strokeWidth="0.25"
            style={{ pathLength: progress6 }}
          />

          {/* MEDIUM PEONY - Middle */}
          <motion.path
            d="M280,350 C248,338 220,355 220,390 C220,425 255,450 298,448 C341,446 368,415 362,378 C356,341 315,328 280,350"
            strokeWidth="0.55"
            style={{ pathLength: progress3 }}
          />
          <motion.path
            d="M242,368 C215,365 200,395 212,430 C224,465 262,475 290,455"
            strokeWidth="0.45"
            style={{ pathLength: progress4 }}
          />
          <motion.path
            d="M325,365 C355,362 370,392 360,427 C350,462 312,472 285,452"
            strokeWidth="0.45"
            style={{ pathLength: progress4 }}
          />
          <motion.path
            d="M282,400 C262,396 255,418 270,440 C285,462 315,456 322,432"
            strokeWidth="0.3"
            style={{ pathLength: progress5 }}
          />

          {/* SMALL BUD */}
          <motion.path
            d="M240,240 C222,230 205,242 210,265 C215,288 238,295 252,280 C266,265 260,238 240,240"
            strokeWidth="0.4"
            style={{ pathLength: progress4 }}
          />

          {/* LEAVES */}
          <motion.path
            d="M380,200 C360,185 335,195 335,225 C335,255 365,270 390,255 C415,240 415,210 380,200"
            strokeWidth="0.45"
            style={{ pathLength: progress3 }}
          />
          <motion.path
            d="M225,310 C205,298 182,310 188,338 C194,366 222,375 242,360 C262,345 255,315 225,310"
            strokeWidth="0.4"
            style={{ pathLength: progress4 }}
          />
          <motion.path
            d="M340,480 C320,468 295,480 300,508 C305,536 335,545 355,530 C375,515 370,485 340,480"
            strokeWidth="0.4"
            style={{ pathLength: progress4 }}
          />
        </g>
      </svg>
    </div>
  );
};

const BookingPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newLinkUrl, setNewLinkUrl] = useState('');

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
    location: 'miami',
    suggestedCity: ''
  });

  const locations: Location[] = [
    { id: 'miami', studio: 'Noble Art Studio', city: 'Miami', country: 'USA', status: 'home' },
    { id: 'zurich', studio: 'Giahi Tattoo', city: 'Zurich', country: 'Switzerland', status: 'confirmed', dates: 'Jan 15 — 20, 2025' },
    { id: 'valencia', studio: 'La Santa Tinta', city: 'Valencia', country: 'Spain', status: 'confirmed', dates: 'Feb 8 — 14, 2025' },
    { id: 'vienna', studio: 'Noir Ink Studio', city: 'Vienna', country: 'Austria', status: 'confirmed', dates: 'Mar 1 — 7, 2025' },
    { id: 'melbourne', studio: 'Ethereal Ink', city: 'Melbourne', country: 'Australia', status: 'confirmed', dates: 'Apr 10 — 20, 2025' },
  ];

  // Smooth scroll with Lenis
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const tattooStyles = [
    { id: 'fineline', label: 'Fine Line', desc: 'Delicate, precise linework' },
    { id: 'microrealism', label: 'Micro Realism', desc: 'Detailed miniature portraits' },
    { id: 'botanical', label: 'Botanical', desc: 'Floral & nature inspired' },
    { id: 'minimalist', label: 'Minimalist', desc: 'Simple, elegant designs' },
    { id: 'ornamental', label: 'Ornamental', desc: 'Decorative patterns' },
    { id: 'custom', label: 'Custom Design', desc: 'Unique collaboration' }
  ];

  const sizes = [
    { id: 'tiny', label: 'Tiny', desc: '1-2 inches' },
    { id: 'small', label: 'Small', desc: '2-4 inches' },
    { id: 'medium', label: 'Medium', desc: '4-6 inches' },
    { id: 'large', label: 'Large', desc: '6+ inches' }
  ];

  const budgets = [
    { id: '200-400', label: '$200 - $400' },
    { id: '400-600', label: '$400 - $600' },
    { id: '600-1000', label: '$600 - $1,000' },
    { id: '1000+', label: '$1,000+' }
  ];

  const steps = [
    { title: 'Your Vision', subtitle: 'Tell me about your dream tattoo' },
    { title: 'The Details', subtitle: 'Size, placement & style' },
    { title: 'About You', subtitle: 'Let\'s connect' },
    { title: 'Final Touch', subtitle: 'Schedule & budget' }
  ];

  const handleInputChange = (field: keyof FormData, value: string | ReferenceLink[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      platform: detectPlatform(newLinkUrl.trim())
    };

    handleInputChange('referenceLinks', [...formData.referenceLinks, newLink]);
    setNewLinkUrl('');
  };

  const removeReferenceLink = (id: string) => {
    handleInputChange(
      'referenceLinks',
      formData.referenceLinks.filter(link => link.id !== id)
    );
  };

  const getPlatformIcon = (platform: 'instagram' | 'pinterest' | 'other') => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'pinterest':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.92s-.35-.71-.35-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.69 0 1.03-.66 2.57-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.77-2.25 3.77-5.49 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.21 0 1.03.4 2.14.89 2.74.1.12.11.22.08.34l-.33 1.36c-.05.22-.18.27-.4.16-1.49-.7-2.43-2.87-2.43-4.62 0-3.76 2.73-7.22 7.88-7.22 4.14 0 7.35 2.95 7.35 6.89 0 4.11-2.59 7.42-6.19 7.42-1.21 0-2.35-.63-2.74-1.37l-.75 2.84c-.27 1.04-1 2.35-1.49 3.14A12 12 0 1 0 12 0z"/>
          </svg>
        );
      default:
        return <Link2 className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: 'instagram' | 'pinterest' | 'other') => {
    switch (platform) {
      case 'instagram':
        return 'from-purple-500 to-pink-500';
      case 'pinterest':
        return 'from-red-500 to-red-600';
      default:
        return 'from-white/20 to-white/10';
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* Description */}
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 mb-2">
                Describe your vision *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Tell me about your dream tattoo... What does it mean to you?"
                className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none py-2 text-sm font-light text-white placeholder:text-white/20 resize-none transition-colors duration-300 min-h-[80px]"
              />
            </div>

            {/* Reference Links - Compact */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">
                  References <span className="text-white/30">(optional)</span>
                </label>
                <span className="font-mono text-[8px] text-white/30">
                  {formData.referenceLinks.length}/5
                </span>
              </div>

              {/* Added References - Compact list */}
              {formData.referenceLinks.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.referenceLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/10"
                    >
                      {getPlatformIcon(link.platform)}
                      <span className="text-[10px] text-white/60 max-w-[100px] truncate">
                        {link.url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 20)}
                      </span>
                      <button
                        onClick={() => removeReferenceLink(link.id)}
                        className="text-white/30 hover:text-white/60"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Reference Input - Inline */}
              {formData.referenceLinks.length < 5 && (
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="url"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addReferenceLink()}
                      placeholder="Paste image URL..."
                      className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none transition-all"
                    />
                  </div>
                  <motion.button
                    onClick={addReferenceLink}
                    disabled={!newLinkUrl.trim()}
                    className="px-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 border border-white/10 rounded-lg text-white transition-all"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 mb-2">
                Style *
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
                {tattooStyles.map((style) => (
                  <motion.button
                    key={style.id}
                    onClick={() => handleInputChange('tattooStyle', style.id)}
                    className={`relative py-2 px-1 rounded-lg border text-center transition-all duration-300 ${
                      formData.tattooStyle === style.id
                        ? 'border-white bg-white/10'
                        : 'border-white/[0.08] hover:border-white/30'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="block text-[10px] font-medium text-white">{style.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 mb-2">
                  Placement *
                </label>
                <input
                  type="text"
                  value={formData.placement}
                  onChange={(e) => handleInputChange('placement', e.target.value)}
                  placeholder="Inner forearm, behind ear..."
                  className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none py-2 text-sm font-light text-white placeholder:text-white/20 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 mb-2">
                  Size *
                </label>
                <div className="flex flex-wrap gap-1">
                  {sizes.map((size) => (
                    <motion.button
                      key={size.id}
                      onClick={() => handleInputChange('size', size.id)}
                      className={`px-2 py-1 rounded-full border transition-all duration-300 ${
                        formData.size === size.id
                          ? 'border-white bg-white text-black'
                          : 'border-white/10 text-white hover:border-white/30'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-[9px] font-medium">{size.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Full name"
                className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none py-2 text-sm font-light text-white placeholder:text-white/20 transition-colors duration-300"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none py-2 text-sm font-light text-white placeholder:text-white/20 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2">
                  Phone <span className="text-white/20">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-transparent border-b border-white/10 focus:border-white/40 outline-none py-2 text-sm font-light text-white placeholder:text-white/15 transition-colors duration-300"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* Date & Budget in grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Preferred Date */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-4 h-4 text-white/30" />
                  <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">
                    When?
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  placeholder="Jan 2025, Flexible, ASAP..."
                  className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none py-2 text-sm font-light text-white placeholder:text-white/20 transition-colors duration-300"
                />
              </div>

              {/* Budget */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white/30 text-sm">$</span>
                  <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">
                    Budget *
                  </label>
                </div>
                <div className="flex flex-wrap gap-1">
                  {budgets.map((budget) => (
                    <motion.button
                      key={budget.id}
                      onClick={() => handleInputChange('budget', budget.id)}
                      className={`px-2.5 py-1 rounded-full border transition-all duration-300 ${
                        formData.budget === budget.id
                          ? 'border-white bg-white text-black'
                          : 'border-white/10 text-white hover:border-white/30'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-[9px] font-medium">{budget.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Final summary / confirmation message */}
            <div className="pt-2 border-t border-white/[0.06]">
              <p className="font-mono text-[9px] text-white/30 leading-relaxed">
                Final pricing is based on design complexity and discussed during consultation.
                A deposit is required to secure your appointment.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div ref={containerRef} className="min-h-screen bg-ink-black text-white relative overflow-hidden cursor-none">
        <PeonyBackground />
        <motion.div
          className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center mb-12"
          >
            <Check className="w-8 h-8 text-white/80" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight mb-2">
              Request Sent
            </h1>
            <p className="font-editorial italic text-2xl md:text-3xl text-white/50 font-light">
              Thank you
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base md:text-lg text-white/50 text-center max-w-md mt-8 mb-12 font-light leading-relaxed"
          >
            I'll review your request and get back to you within 24-48 hours.
          </motion.p>

          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Back to Home</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-ink-black text-white relative overflow-hidden isolate cursor-none">
      {/* Peony Background - same as PeonyTransition */}
      <PeonyBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:px-10 md:py-6 flex justify-between items-center z-50 bg-ink-black/80 backdrop-blur-xl border-b border-white/5">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all duration-300 group"
          whileHover={{ x: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Back</span>
        </motion.button>

        <div className="flex flex-col items-center">
          <span className="font-display text-xl font-semibold tracking-tight">seaphiya</span>
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/40">Book a Session</span>
        </div>

        <div className="w-24" />
      </header>

      {/* Main Content */}
      <main className="relative z-20 pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto relative z-20">
          {/* Hero Section */}
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="overflow-hidden mb-6">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-[1px] bg-white/30"></div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Begin Your Journey</span>
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[11vw] md:text-[9vw] lg:text-[7vw] font-display font-semibold tracking-tight leading-[0.9]"
              >
                Book
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[11vw] md:text-[9vw] lg:text-[7vw] font-editorial italic font-light tracking-tight leading-[0.9] text-white/50"
              >
                Your Session
              </motion.h1>
            </div>
          </motion.div>

          {/* Location Selection - Editorial Style */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Select Location</span>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            <div className="space-y-1">
              {locations.map((loc, i) => (
                <motion.button
                  key={loc.id}
                  onClick={() => handleInputChange('location', loc.id)}
                  className={`relative w-full text-left transition-all duration-300 group ${
                    formData.location === loc.id ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center py-4 px-4 border-b border-white/[0.06]">
                    {/* Selection indicator */}
                    <div className="w-8 flex justify-center mr-4">
                      <motion.div
                        className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                          formData.location === loc.id
                            ? 'bg-white border-white'
                            : 'border-white/20 group-hover:border-white/40'
                        }`}
                        animate={{ scale: formData.location === loc.id ? 1 : 0.8 }}
                      />
                    </div>

                    {/* City - Main */}
                    <span className={`text-xl md:text-2xl font-light tracking-tight transition-all duration-300 min-w-[120px] md:min-w-[160px] ${
                      formData.location === loc.id ? 'text-white' : 'text-white/60 group-hover:text-white/80'
                    }`}>
                      {loc.city}
                    </span>

                    {/* Studio */}
                    <span className="hidden md:block text-sm text-white/30 flex-1 px-6">
                      {loc.studio}
                    </span>

                    {/* Status & Dates */}
                    <div className="flex items-center gap-4 ml-auto">
                      {loc.dates && (
                        <span className="hidden sm:block font-mono text-[10px] text-white/40">
                          {loc.dates}
                        </span>
                      )}
                      <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-1 rounded-full border transition-all duration-300 ${
                        loc.status === 'home'
                          ? 'text-white/70 border-white/20 bg-white/[0.05]'
                          : loc.status === 'confirmed'
                            ? 'text-white/50 border-white/10'
                            : 'text-white/30 border-white/[0.06]'
                      }`}>
                        {loc.status === 'home' ? 'Home' : loc.status === 'confirmed' ? 'Guest' : 'Soon'}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}

              {/* Suggest a City Option */}
              <motion.button
                onClick={() => handleInputChange('location', 'suggest')}
                className={`relative w-full text-left transition-all duration-300 group ${
                  formData.location === 'suggest' ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + locations.length * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center py-4 px-4 border-b border-white/[0.06]">
                  <div className="w-8 flex justify-center mr-4">
                    <motion.div
                      className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                        formData.location === 'suggest'
                          ? 'bg-amber-400 border-amber-400'
                          : 'border-dashed border-white/20 group-hover:border-amber-400/50'
                      }`}
                      animate={{ scale: formData.location === 'suggest' ? 1 : 0.8 }}
                    />
                  </div>
                  <span className={`text-xl md:text-2xl font-light tracking-tight transition-all duration-300 ${
                    formData.location === 'suggest' ? 'text-amber-400' : 'text-white/40 group-hover:text-amber-400/80'
                  }`}>
                    Suggest a city
                  </span>
                  <span className="hidden md:block text-sm text-white/20 flex-1 px-6 italic">
                    Join waitlist for a new city
                  </span>
                  <span className="ml-auto md:ml-0 font-mono text-[9px] uppercase tracking-wider px-2 py-1 rounded-full border border-dashed border-amber-400/30 text-amber-400/60">
                    Waitlist
                  </span>
                </div>
              </motion.button>
            </div>

            {/* Suggested City Input */}
            <AnimatePresence>
              {formData.location === 'suggest' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 pl-12">
                    <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-3">
                      Which city would you like me to visit?
                    </label>
                    <input
                      type="text"
                      value={formData.suggestedCity}
                      onChange={(e) => handleInputChange('suggestedCity', e.target.value)}
                      placeholder="e.g., Tokyo, London, NYC..."
                      className="w-full max-w-md bg-transparent border-b-2 border-amber-400/30 focus:border-amber-400/60 outline-none py-3 text-lg font-light text-white placeholder:text-white/20 transition-colors duration-300"
                    />
                    <p className="mt-3 font-mono text-[10px] text-white/30">
                      You'll be added to the waitlist and notified when I plan a visit
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selected location info - Minimal */}
            <AnimatePresence mode="wait">
              {formData.location && (
                <motion.div
                  key={formData.location}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 font-mono text-[11px] text-white/40 pl-12">
                    {locations.find(l => l.id === formData.location)?.status === 'waitlist'
                      ? 'Dates pending — you\'ll be notified when confirmed'
                      : locations.find(l => l.id === formData.location)?.status === 'confirmed'
                        ? 'Limited guest spot — book early to secure'
                        : '2-4 weeks typical lead time'
                    }
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Progress Bar - Unified Structure */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Timeline with dots and labels */}
            <div className="relative">
              {/* Background line */}
              <div className="absolute top-[5px] left-0 right-0 h-[1px] bg-white/10" />
              {/* Progress line - goes exactly to current dot */}
              <motion.div
                className="absolute top-[5px] left-0 h-[1px] bg-white"
                initial={{ width: '0%' }}
                animate={{ width: `${currentStep / (steps.length - 1) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Dots row - evenly distributed */}
              <div className="flex justify-between mb-3">
                {steps.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="relative"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                  >
                    <motion.div
                      className={`w-[10px] h-[10px] rounded-full border transition-all duration-500 ${
                        idx <= currentStep
                          ? 'bg-white border-white'
                          : 'bg-ink-black border-white/20'
                      }`}
                      animate={{ scale: idx === currentStep ? 1.2 : 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {idx === currentStep && (
                      <motion.div
                        className="absolute inset-0 rounded-full border border-white/20"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Labels row - evenly distributed */}
              <div className="flex justify-between">
                {steps.map((step, idx) => (
                  <motion.span
                    key={idx}
                    className={`text-[10px] font-medium transition-all duration-500 ${
                      idx === 0 ? 'text-left' : idx === steps.length - 1 ? 'text-right' : 'text-center'
                    } ${
                      idx === currentStep ? 'text-white' : idx < currentStep ? 'text-white/50' : 'text-white/20'
                    }`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                  >
                    {step.title}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Steps */}
          <div className="min-h-[160px]">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <motion.div
            className="flex justify-between items-center mt-8 pt-6 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={prevStep}
              className={`flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 transition-all duration-300 ${
                currentStep === 0 ? 'opacity-30 pointer-events-none' : 'hover:bg-white/5 hover:border-white/40'
              }`}
              whileHover={currentStep > 0 ? { x: -3, scale: 1.02 } : {}}
              whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
            >
              <ArrowLeft className="w-3 h-3" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Previous</span>
            </motion.button>

            {currentStep < steps.length - 1 ? (
              <motion.button
                onClick={nextStep}
                className="group relative flex items-center gap-3 px-8 py-3 rounded-full bg-white text-black overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em]">Continue</span>
                <ArrowRight className="relative z-10 w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative flex items-center gap-3 px-8 py-3 rounded-full bg-white text-black overflow-hidden disabled:opacity-50"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {/* Shimmer effect */}
                {!isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.05] to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                )}
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-3 h-3 border-2 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Sending...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em]">Submit Request</span>
                    <Send className="relative z-10 w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </>
                )}
              </motion.button>
            )}
          </motion.div>
        </div>
      </main>

      {/* Side Info */}
      <aside className="hidden xl:block fixed right-0 top-1/2 -translate-y-1/2 p-8 z-40">
        <a
          href="https://www.instagram.com/seaphiya.tat/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
        >
          <Instagram className="w-4 h-4" />
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            @seaphiya.tat
          </span>
        </a>
      </aside>

      {/* Bottom Corner Details */}
      <div className="fixed bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 z-40 hidden md:block">
        Step {currentStep + 1} of {steps.length}
      </div>
      <div className="fixed bottom-6 right-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 z-40 hidden md:block">
        Miami, FL
      </div>
    </div>
  );
};

export default BookingPage;
