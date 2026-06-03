import { createContext, createSignal, useContext, type JSX } from 'solid-js';

type Settings = {
  darkMode: boolean;
  compactMode: boolean;
  language: string;
};

type SettingsContextType = {
  settings: () => Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
};

const defaultSettings: Settings = {
  darkMode: false,
  compactMode: false,
  language: 'en',
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = (props: { children: JSX.Element }) => {
  const [settings, setSettings] = createSignal<Settings>(defaultSettings);

  const updateSetting = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
      }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
