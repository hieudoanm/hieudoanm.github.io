import { tryCatch } from '@lodashx/ts';
import {
  createContext,
  useContext,
  createSignal,
  createMemo,
  type JSX,
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
    const { data: user, error } = await tryCatch<TelegramUser>(
      JSON.parse(initData.user)
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

const TelegramContext = createContext<{
  isAuthenticated: boolean;
  user: TelegramUser | null;
  getPlatform: () => TelegramPlatform;
  requestFullscreen: () => void;
}>({
  isAuthenticated: false,
  user: null,
  getPlatform: () => TelegramPlatform.Web,
  requestFullscreen: () => {},
});

export const TelegramProvider = (props: { children?: JSX.Element }) => {
  const [loading, setLoading] = createSignal(false);
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [user, setUser] = createSignal<TelegramUser | null>(null);

  const tg = createMemo(() =>
    typeof globalThis.window !== 'undefined'
      ? window.Telegram?.WebApp
      : undefined
  );

  const init = async () => {
    setLoading(true);
    const { initData, user: telegramUser } = await getUser();
    console.info(initData);
    setUser(telegramUser);
    setIsAuthenticated(!!telegramUser);
    setLoading(false);
  };
  init();

  const getPlatform = (): TelegramPlatform => {
    try {
      if (tg()) {
        tg().ready();
        return tg().platform;
      }
    } catch (error) {
      console.error(error);
      return TelegramPlatform.Web;
    }
    return TelegramPlatform.Web;
  };

  const requestFullscreen = () => {
    try {
      if (tg()) {
        if (getPlatform() === TelegramPlatform.Web) return;
        tg().ready();
        tg().requestFullscreen();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TelegramContext.Provider
      value={{
        isAuthenticated: isAuthenticated(),
        user: user(),
        getPlatform,
        requestFullscreen,
      }}>
      {loading() ? <></> : <>{props.children}</>}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  return useContext(TelegramContext);
};
