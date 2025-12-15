'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowLeft, ArrowRight, Send, Check, MapPin } from 'lucide-react';

import { Navbar, CustomCursor, MagneticButton } from '@/components/ui';
import { useRouter } from '@/i18n/navigation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  tattooStyle: string;
  placement: string;
  size: string;
  description: string;
  preferredDate: string;
  budget: string;
  location: string;
}

const locations = [
  { id: 'miami', studio: 'Noble Art', city: 'Miami', country: 'USA', status: 'home' as const },
  { id: 'valencia', studio: 'Noble Art', city: 'Valencia', country: 'Spain', status: 'confirmed' as const },
];

const styles = [
  { id: 'fineLine', label: 'Fine Line' },
  { id: 'microRealism', label: 'Micro-Realism' },
  { id: 'botanical', label: 'Botanical' },
  { id: 'minimalist', label: 'Minimalist' },
  { id: 'colorTattoos', label: 'Color Tattoos' },
  { id: 'ornamental', label: 'Ornamental' },
];

const sizes = [
  { id: 'tiny', label: 'Tiny', desc: 'Less than 1 inch' },
  { id: 'small', label: 'Small', desc: '1-3 inches' },
  { id: 'medium', label: 'Medium', desc: '3-6 inches' },
  { id: 'large', label: 'Large', desc: 'Over 6 inches' },
];

const budgets = [
  { id: 'range1', label: '$200 - $400' },
  { id: 'range2', label: '$400 - $600' },
  { id: 'range3', label: '$600 - $1,000' },
  { id: 'range4', label: '$1,000+' },
];

export default function BookingPage() {
  const t = useTranslations();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    tattooStyle: '',
    placement: '',
    size: '',
    description: '',
    preferredDate: '',
    budget: '',
    location: '',
  });

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

  const handleBack = () => router.push('/');

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.location !== '';
      case 1:
        return formData.description.trim() !== '';
      case 2:
        return formData.tattooStyle !== '' && formData.placement.trim() !== '' && formData.size !== '';
      case 3:
        return formData.name.trim() !== '' && formData.email.trim() !== '';
      case 4:
        return formData.budget !== '';
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const steps = [
    { title: t('booking.location.title'), subtitle: 'Where would you like to get tattooed?' },
    { title: t('steps.step1.title'), subtitle: t('steps.step1.subtitle') },
    { title: t('steps.step2.title'), subtitle: t('steps.step2.subtitle') },
    { title: t('steps.step3.title'), subtitle: t('steps.step3.subtitle') },
    { title: t('steps.step4.title'), subtitle: t('steps.step4.subtitle') },
  ];

  if (isSubmitted) {
    return (
      <div ref={containerRef} className="bg-ink-black min-h-screen text-paper-white font-body antialiased">
        <CustomCursor />
        <Navbar showBackButton onBack={handleBack} />

        <section className="min-h-screen flex items-center justify-center px-6">
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

            <h1 className="font-display text-5xl md:text-6xl tracking-tight mb-4">
              {t('booking.success.title')}
            </h1>
            <p className="text-2xl font-editorial italic text-paper-white/60 mb-6">
              {t('booking.success.subtitle')}
            </p>
            <p className="text-paper-white/50 mb-12">{t('booking.success.message')}</p>

            <MagneticButton
              onClick={handleBack}
              className="px-8 py-4 border border-paper-white/30 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-paper-white hover:text-ink-black transition-all duration-500"
            >
              {t('booking.success.backHome')}
            </MagneticButton>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-ink-black min-h-screen text-paper-white font-body antialiased">
      <CustomCursor />
      <Navbar showBackButton onBack={handleBack} />

      {/* Progress bar */}
      <div className="fixed top-20 left-0 w-full h-1 bg-paper-white/10 z-40">
        <motion.div
          className="h-full bg-coral"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep + 1) / 5) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper-white/40">
              Step {currentStep + 1} of 5
            </span>
            <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-2 mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-paper-white/50">{steps[currentStep].subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Form Content */}
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 0: Location */}
            {currentStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {locations.map((loc) => (
                  <motion.button
                    key={loc.id}
                    onClick={() => updateField('location', loc.id)}
                    className={`p-6 border rounded-xl text-left transition-all duration-300 ${
                      formData.location === loc.id
                        ? 'border-coral bg-coral/10'
                        : 'border-paper-white/20 hover:border-paper-white/40'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-coral" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-coral">
                        {loc.status === 'home' ? 'Home Studio' : 'Guest Spot'}
                      </span>
                    </div>
                    <h3 className="font-display text-xl mb-1">{loc.city}</h3>
                    <p className="text-sm text-paper-white/50">
                      {loc.studio} — {loc.country}
                    </p>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Step 1: Description */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder={t('booking.form.describeVision')}
                  className="w-full h-48 bg-transparent border border-paper-white/20 rounded-xl p-4 text-paper-white placeholder-paper-white/30 focus:border-coral focus:outline-none resize-none"
                />
              </motion.div>
            )}

            {/* Step 2: Style, Placement, Size */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Style */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-white/50 mb-4 block">
                    {t('booking.form.style')}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {styles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => updateField('tattooStyle', style.id)}
                        className={`py-3 px-4 border rounded-lg font-mono text-[10px] uppercase tracking-[0.15em] transition-all ${
                          formData.tattooStyle === style.id
                            ? 'border-coral bg-coral/10 text-coral'
                            : 'border-paper-white/20 text-paper-white/60 hover:border-paper-white/40'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Placement */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-white/50 mb-4 block">
                    {t('booking.form.placement')}
                  </label>
                  <input
                    type="text"
                    value={formData.placement}
                    onChange={(e) => updateField('placement', e.target.value)}
                    placeholder="e.g. Inner forearm, Collarbone..."
                    className="w-full bg-transparent border border-paper-white/20 rounded-xl p-4 text-paper-white placeholder-paper-white/30 focus:border-coral focus:outline-none"
                  />
                </div>

                {/* Size */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-white/50 mb-4 block">
                    {t('booking.form.size')}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => updateField('size', size.id)}
                        className={`py-4 px-4 border rounded-lg text-left transition-all ${
                          formData.size === size.id
                            ? 'border-coral bg-coral/10'
                            : 'border-paper-white/20 hover:border-paper-white/40'
                        }`}
                      >
                        <span className="block font-display text-lg">{size.label}</span>
                        <span className="text-[10px] text-paper-white/40">{size.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Info */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-white/50 mb-2 block">
                    {t('booking.form.yourName')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full bg-transparent border border-paper-white/20 rounded-xl p-4 text-paper-white placeholder-paper-white/30 focus:border-coral focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-white/50 mb-2 block">
                    {t('common.email')} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full bg-transparent border border-paper-white/20 rounded-xl p-4 text-paper-white placeholder-paper-white/30 focus:border-coral focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-white/50 mb-2 block">
                    {t('booking.form.phone')} {t('common.optional')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full bg-transparent border border-paper-white/20 rounded-xl p-4 text-paper-white placeholder-paper-white/30 focus:border-coral focus:outline-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Date & Budget */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-white/50 mb-4 block">
                    {t('booking.form.when')} {t('common.optional')}
                  </label>
                  <input
                    type="text"
                    value={formData.preferredDate}
                    onChange={(e) => updateField('preferredDate', e.target.value)}
                    placeholder="e.g. January 2025, Flexible..."
                    className="w-full bg-transparent border border-paper-white/20 rounded-xl p-4 text-paper-white placeholder-paper-white/30 focus:border-coral focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-white/50 mb-4 block">
                    {t('booking.form.budget')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {budgets.map((budget) => (
                      <button
                        key={budget.id}
                        onClick={() => updateField('budget', budget.id)}
                        className={`py-4 px-4 border rounded-lg font-display text-lg transition-all ${
                          formData.budget === budget.id
                            ? 'border-coral bg-coral/10 text-coral'
                            : 'border-paper-white/20 text-paper-white/60 hover:border-paper-white/40'
                        }`}
                      >
                        {budget.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-paper-white/40 mt-4">{t('booking.form.pricingNote')}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-paper-white/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                currentStep === 0 ? 'text-paper-white/20' : 'text-paper-white/60 hover:text-paper-white'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              {t('buttons.previous')}
            </button>

            {currentStep < 4 ? (
              <motion.button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
                  canProceed()
                    ? 'bg-coral text-paper-white hover:bg-coral-light'
                    : 'bg-paper-white/10 text-paper-white/30 cursor-not-allowed'
                }`}
                whileHover={canProceed() ? { scale: 1.02 } : {}}
                whileTap={canProceed() ? { scale: 0.98 } : {}}
              >
                {t('buttons.continue')}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
                  canProceed() && !isSubmitting
                    ? 'bg-sage text-paper-white hover:bg-sage-light'
                    : 'bg-paper-white/10 text-paper-white/30 cursor-not-allowed'
                }`}
                whileHover={canProceed() && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={canProceed() && !isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? t('buttons.sending') : t('buttons.submitRequest')}
                <Send className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
