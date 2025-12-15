'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity duration-300 border border-black/20 rounded-full px-3 py-1.5 hover:border-black/40 hover:bg-black/5"
      title={`Switch to ${locale === 'es' ? 'English' : 'Español'}`}
    >
      <Globe className="w-3 h-3" />
      <span>{locale.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSwitcher;
