export interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

export interface ShareAPI {
  share: (data: ShareData) => Promise<void>;
  isSupported: () => boolean;
}

const getNavigatorShare = () => {
  if (globalThis.window === undefined) {
    return null;
  }

  if (
    globalThis.navigator === undefined ||
    typeof globalThis.navigator.share !== 'function'
  ) {
    return null;
  }

  return globalThis.navigator.share.bind(globalThis.navigator);
};

export const createShare = (): ShareAPI => {
  const shareFn = getNavigatorShare();

  const isSupported = (): boolean => shareFn !== null;

  const share = async (data: ShareData): Promise<void> => {
    if (!shareFn) {
      throw new Error('Web Share API is not supported');
    }

    await shareFn(data);
  };

  return {
    share,
    isSupported,
  };
};
