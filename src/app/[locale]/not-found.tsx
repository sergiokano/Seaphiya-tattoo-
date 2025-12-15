'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { Navbar, CustomCursor, MagneticButton } from '@/components/ui';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="bg-paper-white min-h-screen text-ink-black font-body antialiased relative overflow-hidden">
      <CustomCursor />
      <Navbar />

      {/* Main Content */}
      <main className="h-screen flex items-center justify-center px-6 relative">

        {/* Side Left - Vertical Text */}
        <motion.div
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-black/20" />
          <span
            className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/20 rotate-180"
            style={{ writingMode: 'vertical-rl' }}
          >
            {t('code')}
          </span>
          <div className="h-16 w-[1px] bg-gradient-to-t from-transparent to-black/20" />
        </motion.div>

        {/* Side Right - Vertical Text */}
        <motion.div
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-black/20" />
          <span
            className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/20"
            style={{ writingMode: 'vertical-rl' }}
          >
            {t('subtitle')}
          </span>
          <div className="h-16 w-[1px] bg-gradient-to-t from-transparent to-black/20" />
        </motion.div>

        {/* Center Content */}
        <div className="relative w-full max-w-4xl mx-auto text-center">

          {/* Large 404 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display text-[32vw] md:text-[25vw] font-medium text-ink-black/[0.08] leading-none select-none">
              {t('code')}
            </span>

            {/* Overlay Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.h1
                className="font-display text-[12vw] md:text-[8vw] tracking-tight leading-none text-ink-black"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {t('title').toUpperCase()}
              </motion.h1>

              <motion.p
                className="font-editorial italic text-lg md:text-2xl text-ink-black/50 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {t('description')}
              </motion.p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Link href="/">
              <MagneticButton>
                <span className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ink-black text-paper-white font-mono text-[10px] uppercase tracking-[0.2em] overflow-hidden cursor-pointer hover:bg-petal hover:text-ink-black transition-all duration-500">
                  <svg
                    className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span>{t('backHome')}</span>
                </span>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Info */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="h-[1px] w-8 bg-ink-black/10" />
          <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-ink-black/20">
            Seaphiya · Miami
          </span>
          <div className="h-[1px] w-8 bg-ink-black/10" />
        </motion.div>

        {/* Decorative corner elements */}
        <motion.div
          className="absolute top-24 left-6 md:left-12 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <div className="w-8 h-[1px] bg-ink-black/10" />
          <div className="w-[1px] h-8 bg-ink-black/10" />
        </motion.div>

        <motion.div
          className="absolute top-24 right-6 md:right-12 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="w-8 h-[1px] bg-ink-black/10 ml-auto" />
          <div className="w-[1px] h-8 bg-ink-black/10 ml-auto" />
        </motion.div>
      </main>
    </div>
  );
}
