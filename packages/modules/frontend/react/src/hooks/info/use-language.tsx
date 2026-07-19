import { useState, useEffect } from 'react';

export const useLanguage = (): string => {
  const [language, setLanguage] = useState<string>(navigator.language || 'en');

  useEffect(() => {
    setLanguage(navigator.language);
  }, [navigator.language]);

  return language;
};
