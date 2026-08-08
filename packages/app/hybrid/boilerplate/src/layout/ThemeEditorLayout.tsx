'use client';

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ThemeEditor,
  buildThemeStyles,
  DEFAULT_CONFIG,
  ThemeConfig,
} from './editor';

interface ThemeContextValue {
  config: ThemeConfig;
  setConfig: (config: ThemeConfig) => void;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeEditorLayout');
  }
  return ctx;
};

export const ThemeEditorLayout: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedTheme, setSelectedTheme] = useState('nothing');
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    document.documentElement.dataset.theme = selectedTheme;
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider
      value={{ config, setConfig, selectedTheme, setSelectedTheme }}>
      <div
        className="bg-base-100 text-base-content flex h-dvh flex-col font-sans"
        style={buildThemeStyles(config)}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <ThemeEditor
            config={config}
            onChange={setConfig}
            selectedTheme={selectedTheme}
            onThemeSelect={setSelectedTheme}
          />
          <main className="flex min-h-0 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
ThemeEditorLayout.displayName = 'ThemeEditorLayout';
