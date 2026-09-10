import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, type Language, type TranslationDict } from '../i18n/translations';
import resumePt from '../assets/Anderson_Viana_Curriculo_PT-BR.pdf';
import resumeEn from '../assets/Anderson_Viana_Curriculum_EN.pdf';

const STORAGE_KEY = 'portfolio-language';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDict;
  resumePt: string;
  resumeEn: string;
  currentResume: string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const detectInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'pt';
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'pt' || saved === 'en') {
    return saved;
  }

  const browserLang = window.navigator.language?.toLowerCase() ?? '';
  return browserLang.startsWith('pt') ? 'pt' : 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => detectInitialLanguage());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState((current) => (current === 'pt' ? 'en' : 'pt'));

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: translations[language],
      resumePt,
      resumeEn,
      currentResume: language === 'pt' ? resumePt : resumeEn,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
