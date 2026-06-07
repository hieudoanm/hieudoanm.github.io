import { tryCatch } from '@lodashx/ts';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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

export const TelegramProvider: React.FC<{ children: ReactNode }> = ({
  children = <></>,
}) => {
  const [{ loading = true, isAuthenticated = false, user = null }, setState] =
    useState<{
      loading: boolean;
      isAuthenticated: boolean;
      user: TelegramUser | null;
    }>({
      loading: false,
      isAuthenticated: false,
      user: null,
    });

  useEffect(() => {
    const getUserAsync = async () => {
      setState((previous) => ({ ...previous, loading: true }));
      const { initData, user } = await getUser();
      console.info(initData);
      setState((previous) => ({
        ...previous,
        loading: false,
        isAuthenticated,
        user,
      }));
    };
    getUserAsync();
  }, []);
  const tg =
    typeof globalThis.window !== 'undefined' && window.Telegram?.WebApp;

  const getPlatform = useCallback((): TelegramPlatform => {
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
  }, [tg]);

  const requestFullscreen = useCallback(() => {
    try {
      if (tg) {
        if (getPlatform() === TelegramPlatform.Web) return;
        tg.ready();
        tg.requestFullscreen();
      }
    } catch (error) {
      console.error(error);
    }
  }, [tg, getPlatform]);

  const value = useMemo(
    () => ({ isAuthenticated, user, getPlatform, requestFullscreen }),
    [isAuthenticated, user, getPlatform, requestFullscreen]
  );

  return (
    <TelegramContext.Provider value={value}>
      {loading ? <></> : <>{children}</>}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  return useContext(TelegramContext);
};
