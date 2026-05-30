import { createContext, createSignal, useContext, type JSX } from 'solid-js';

export enum Language {
  English = 'en',
  Spanish = 'es',
  French = 'fr',
  German = 'de',
  Italian = 'it',
  Portuguese = 'pt',
  Russian = 'ru',
  ChineseSimplified = 'zh',
  ChineseTraditional = 'zh-TW',
  Japanese = 'ja',
  Korean = 'ko',
  Arabic = 'ar',
  Hindi = 'hi',
  Vietnamese = 'vi',
  Dutch = 'nl',
  Greek = 'el',
  Turkish = 'tr',
  Polish = 'pl',
  Hebrew = 'he',
  Swedish = 'sv',
  Danish = 'da',
  Norwegian = 'no',
  Finnish = 'fi',
  Thai = 'th',
  Indonesian = 'id',
  Malay = 'ms',
  Czech = 'cs',
  Hungarian = 'hu',
  Romanian = 'ro',
  Ukrainian = 'uk',
  Persian = 'fa',
}

type Namespace = Record<string, string>;
type NamespacedTranslations = Record<string, Namespace>;
type LanguageMap = Partial<Record<Language, NamespacedTranslations>>;

interface LanguageContextProps {
  language: () => Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

interface LanguageProviderProps {
  children: JSX.Element;
  languageMap: LanguageMap;
  defaultLanguage?: Language;
  persist?: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

const LANGUAGE_STORAGE_KEY = 'app_language';

export const LanguageProvider = (props: LanguageProviderProps) => {
  const getInitialLanguage = (): Language => {
    if (props.persist !== false && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && stored in Language) return stored as Language;
    }

    const browserLang = navigator.language.split('-')[0] as Language;
    return browserLang in Language
      ? browserLang
      : (props.defaultLanguage ?? Language.English);
  };

  const [language, setLanguage] = createSignal<Language>(getInitialLanguage());

  const setLanguageWithPersist = (lang: Language) => {
    setLanguage(lang);
    if (props.persist !== false)
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const t = (nsKey: string, fallback?: string): string => {
    const lang = language();
    const translations = (props.languageMap[lang] ??
      {}) as NamespacedTranslations;
    const parts = nsKey.split('.');
    const ns = parts[0];
    const actualKey = parts.slice(1).join('.');
    const namespace = translations[ns];
    const value = namespace?.[actualKey];

    if (!value) {
      console.warn(
        `Missing translation for "${ns}.${actualKey}" in language "${lang}"`
      );
    }

    return value ?? fallback ?? actualKey;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: setLanguageWithPersist,
        t,
      }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

export const useTranslation = () => {
  const context = useLanguage();
  return context.t;
};
