import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

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

interface LanguageProviderProps {
  children: ReactNode;
  languageMap: LanguageMap;
  defaultLanguage?: Language;
  persist?: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

const LANGUAGE_STORAGE_KEY = 'app_language';

export const LanguageProvider: FC<LanguageProviderProps> = ({
  children,
  languageMap,
  defaultLanguage = Language.English,
  persist = true,
}) => {
  const getInitialLanguage = (): Language => {
    if (persist && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && stored in Language) return stored as Language;
    }

    const browserLang = navigator.language.split('-')[0] as Language;
    return browserLang in Language ? browserLang : defaultLanguage;
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const setLanguageToLocalStorage = (lang: Language) => {
    setLanguage(lang);
    if (persist) localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const translations = useMemo(
    () => languageMap[language] ?? {},
    [language, languageMap]
  );

  const t = useCallback(
    (nsKey: string, key?: string, fallback?: string): string => {
      let ns: string;
      let actualKey: string;

      // Support t("common.greeting") and t("common", "greeting")
      if (key) {
        ns = nsKey;
        actualKey = key;
      } else {
        const parts = nsKey.split('.');
        ns = parts[0];
        actualKey = parts.slice(1).join('.');
      }

      const namespace = translations[ns];
      const value = namespace?.[actualKey];

      if (!value) {
        console.warn(
          `Missing translation for "${ns}.${actualKey}" in language "${language}"`
        );
      }

      return value ?? fallback ?? actualKey;
    },
    [translations, language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageToLocalStorage,
      t,
    }),
    [language, setLanguageToLocalStorage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
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
