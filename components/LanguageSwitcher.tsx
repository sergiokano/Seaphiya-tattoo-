import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity duration-300 border border-black/20 rounded-full px-3 py-1.5 hover:border-black/40 hover:bg-black/5"
      title={`Switch to ${currentLang === 'es' ? 'English' : 'Español'}`}
    >
      <Globe className="w-3 h-3" />
      <span>{currentLang.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSwitcher;
