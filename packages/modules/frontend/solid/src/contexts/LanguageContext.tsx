import { createContext, useContext, createSignal, JSX } from 'solid-js';

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
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>();

const LANGUAGE_STORAGE_KEY = 'app_language';

export function LanguageProvider(props: {
  languageMap: LanguageMap;
  defaultLanguage?: Language;
  persist?: boolean;
  children?: JSX.Element;
}) {
  const {
    languageMap,
    defaultLanguage = Language.English,
    persist = true,
  } = props;

  const getInitialLanguage = (): Language => {
    if (persist && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && stored in Language) return stored as Language;
    }

    const browserLang = navigator.language.split('-')[0] as Language;
    return browserLang in Language ? browserLang : defaultLanguage;
  };

  const [language, setLanguage] = createSignal<Language>(getInitialLanguage());

  const setLanguageToLocalStorage = (lang: Language) => {
    setLanguage(lang);
    if (persist) localStorage.setItem(LANGUAGE_STORAGE_KEY, lang as string);
  };

  const t = (nsKey: string, key?: string, fallback?: string): string => {
    let ns: string;
    let actualKey: string;

    if (key) {
      ns = nsKey;
      actualKey = key;
    } else {
      const parts = nsKey.split('.');
      ns = parts[0] ?? '';
      actualKey = parts.slice(1).join('.');
    }

    const namespace = (languageMap[language()] ?? {}) as NamespacedTranslations;
    const value = (namespace[ns] as Namespace | undefined)?.[actualKey];

    if (!value) {
      console.warn(
        `Missing translation for "${ns}.${actualKey}" in language "${language()}"`
      );
    }

    return value ?? fallback ?? actualKey;
  };

  const value: LanguageContextProps = {
    get language() {
      return language();
    },
    setLanguage: setLanguageToLocalStorage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {props.children}
    </LanguageContext.Provider>
  );
}

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
