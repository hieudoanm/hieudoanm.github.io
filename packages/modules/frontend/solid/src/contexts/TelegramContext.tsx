import { tryCatch } from '@lodashx/ts';
import {
  createContext,
  useContext,
  createSignal,
  onMount,
  JSX,
} from 'solid-js';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        ready: () => void;
        requestFullscreen: () => void;
        isExpanded: boolean;
        platform: TelegramPlatform;
      };
    };
  }
}

type InitData = {
  auth_date: string;
  chat_instance: string;
  chat_type: string;
  hash: string;
  user: string;
};

type TelegramUser = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  allows_write_to_pm: boolean;
  photo_url: string;
};

enum TelegramPlatform {
  Android = 'android',
  IOS = 'ios',
  MacOS = 'macos',
  TDesktop = 'tdesktop',
  Web = 'web',
}

const getUser = async (): Promise<{
  initData: string;
  user: TelegramUser | null;
}> => {
  if (globalThis.window?.Telegram?.WebApp?.initData) {
    const telegramWebAppInitData = globalThis.window.Telegram.WebApp.initData;
    const initData = Object.fromEntries(
      new URLSearchParams(telegramWebAppInitData)
    ) as InitData;
    const { user: userString } = initData;
    const { data: user, error } = await tryCatch<TelegramUser>(
      JSON.parse(userString)
    );
    if (error) {
      console.error(error);
      return { user: null, initData: '' };
    }

    return { user, initData: telegramWebAppInitData };
  }

  return {
    user: null,
    initData: '',
  };
};

interface TelegramContextValue {
  isAuthenticated: boolean;
  user: TelegramUser | null;
  getPlatform: () => TelegramPlatform;
  requestFullscreen: () => void;
}

const TelegramContext = createContext<TelegramContextValue>({
  isAuthenticated: false,
  user: null,
  getPlatform: () => TelegramPlatform.Web,
  requestFullscreen: () => {},
});

export function TelegramProvider(props: { children?: JSX.Element }) {
  const [loading, setLoading] = createSignal(true);
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [user, setUser] = createSignal<TelegramUser | null>(null);

  onMount(async () => {
    setLoading(true);
    const { initData, user: fetchedUser } = await getUser();
    console.info(initData);
    setIsAuthenticated(false);
    setUser(fetchedUser);
    setLoading(false);
  });

  const getPlatform = (): TelegramPlatform => {
    const tg =
      typeof globalThis.window !== 'undefined' && window.Telegram?.WebApp;
    try {
      if (tg) {
        tg.ready();
        return tg.platform;
      }
    } catch (error) {
      console.error(error);
      return TelegramPlatform.Web;
    }
    return TelegramPlatform.Web;
  };

  const requestFullscreen = () => {
    const tg =
      typeof globalThis.window !== 'undefined' && window.Telegram?.WebApp;
    try {
      if (tg) {
        if (getPlatform() === TelegramPlatform.Web) return;
        tg.ready();
        tg.requestFullscreen();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const value: TelegramContextValue = {
    get isAuthenticated() {
      return isAuthenticated();
    },
    get user() {
      return user();
    },
    getPlatform,
    requestFullscreen,
  };

  return (
    <TelegramContext.Provider value={value}>
      {loading() ? null : props.children}
    </TelegramContext.Provider>
  );
}

export const useTelegram = () => {
  return useContext(TelegramContext);
};
