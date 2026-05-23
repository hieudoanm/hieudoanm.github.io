const hideElement = (className: string) => {
  const userTaglineRatings = document.getElementsByClassName(className);
  for (const userTaglineRating of userTaglineRatings) {
    (userTaglineRating as HTMLElement).style.display = 'none';
  }
};

const hideRatings = () => {
  hideElement('live-game-start-component');
  hideElement('live-game-over-component');
  hideElement('user-tagline-username');
  hideElement('user-tagline-rating');
  hideElement('user-rating');
};

const observeDOM = (() => {
  const MutationObserverCtor =
    window.MutationObserver ||
    (window as unknown as { WebKitMutationObserver: typeof MutationObserver })
      .WebKitMutationObserver;

  return (obj: Node, callback: () => void) => {
    const obs = new MutationObserverCtor((mutations: MutationRecord[]) => {
      if (
        mutations[0]?.addedNodes.length ||
        mutations[0]?.removedNodes.length
      ) {
        callback();
      }
    });
    obs.observe(obj, { childList: true, subtree: true });
  };
})();

observeDOM(document, hideRatings);
