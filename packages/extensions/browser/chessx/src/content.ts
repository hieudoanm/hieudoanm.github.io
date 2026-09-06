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

const observeDOM = (obj: Node, callback: () => void): void => {
  if (!MutationObserverCtor) {
    return;
  }

  const observer = new MutationObserverCtor((mutations: MutationRecord[]) => {
    if (mutations[0]?.addedNodes.length || mutations[0]?.removedNodes.length) {
      callback();
    }
  });
  observer.observe(obj, { childList: true, subtree: true });
};

observeDOM(document, hideRatings);
