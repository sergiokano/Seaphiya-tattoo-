'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-paper-white">
      {/* Placeholder - Main content will be migrated */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.h1
          className="font-display text-7xl md:text-9xl tracking-tight text-ink-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SEAPHIYA
        </motion.h1>
        <motion.p
          className="mt-4 font-body text-lg text-ink-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {t('navbar.subtitle')} — {t('navbar.location')}
        </motion.p>
        <motion.p
          className="mt-8 text-chrome text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Migration in progress...
        </motion.p>
      </div>
    </main>
  );
}
