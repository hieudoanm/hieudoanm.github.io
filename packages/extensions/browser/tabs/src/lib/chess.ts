export const CHESS_KEY = 'chessFocus';

const HIDE_CLASSES = [
  'live-game-start-component',
  'live-game-over-component',
  'user-tagline-username',
  'user-tagline-rating',
  'user-rating',
] as const;

const hideElement = (className: string): void => {
  const elements = document.getElementsByClassName(className);
  for (const element of elements) {
    (element as HTMLElement).style.display = 'none';
  }
};

const hideRatings = (): void => {
  for (const className of HIDE_CLASSES) {
    hideElement(className);
  }
};

const MutationObserverCtor =
  window.MutationObserver ||
  (window as unknown as { WebKitMutationObserver: typeof MutationObserver })
    .WebKitMutationObserver;

let observer: MutationObserver | null = null;

const observe = (): void => {
  if (observer !== null || !MutationObserverCtor) return;
  observer = new MutationObserverCtor((mutations: MutationRecord[]) => {
    if (
      mutations.some(
        (mutation) =>
          mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0
      )
    ) {
      hideRatings();
    }
  });
  observer.observe(document, { childList: true, subtree: true });
};

const start = (): void => {
  hideRatings();
  observe();
};

const isChessFocusEnabled = (): Promise<boolean> =>
  new Promise((resolve) => {
    chrome.storage.sync.get(CHESS_KEY, (result) => {
      if (chrome.runtime.lastError) {
        resolve(true);
        return;
      }
      resolve(result[CHESS_KEY] !== false);
    });
  });

export const registerChessFocus = (): void => {
  const hostname = window.location.hostname
    .replace(/^www\./i, '')
    .toLowerCase();
  if (hostname !== 'chess.com' && !hostname.endsWith('.chess.com')) return;

  void isChessFocusEnabled().then((enabled) => {
    if (!enabled) return;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
      start();
    }
  });
};
