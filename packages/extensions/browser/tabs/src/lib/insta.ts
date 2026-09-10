export const GESTURE_KEY = 'instaGesture';

const CONTEXT_MENU_PAIR_MS = 500;

let gestureEnabled = true;

void chrome.storage.sync.get(GESTURE_KEY, (result) => {
  gestureEnabled = result[GESTURE_KEY] !== false;
  console.log(`Insta: gesture enabled=${gestureEnabled}`);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && GESTURE_KEY in changes) {
    gestureEnabled = changes[GESTURE_KEY]?.newValue !== false;
    console.log(`Insta: toggle changed -> enabled=${gestureEnabled}`);
  }
});

let lastGestureAt = 0;

const isInstagramPage = (): boolean => {
  const hostname = location.hostname;
  const isInstagram =
    hostname === 'instagram.com' || hostname.endsWith('.instagram.com');
  console.log(`Insta: hostname="${hostname}" isInstagram=${isInstagram}`);
  return isInstagram;
};

const collectImageSources = (target: Element): string[] => {
  const siblings = [...(target.parentElement?.children ?? [])].filter(
    (element) => element !== target
  );

  const images = [
    ...(target.matches('img') ? [target] : []),
    ...target.querySelectorAll('img'),
    ...siblings.flatMap((sibling) => [
      ...(sibling.matches('img') ? [sibling] : []),
      ...sibling.querySelectorAll('img'),
    ]),
  ];

  const sources = [
    ...new Set(
      images.map((img) => (img as HTMLImageElement).src).filter(Boolean)
    ),
  ];
  console.log(
    `Insta: target=${target.tagName}, siblings=${siblings.length}, images=${images.length}, unique sources=${sources.length}`
  );
  return sources;
};

const openInNewTabs = (sources: string[]): void => {
  sources.forEach((src, index) => {
    console.log(`Insta: opening ${index + 1}/${sources.length} ${src}`);
    const link = document.createElement('a');
    link.href = src;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
  console.log(`Insta: opened ${sources.length} tab(s)`);
};

export const registerInstaGesture = (): void => {
  console.log('Insta: registering listeners');

  const handleRightButtonDown = (event: MouseEvent): void => {
    if (event.button !== 2 || !event.shiftKey) return;
    if (!gestureEnabled) {
      console.log('Insta: gesture disabled, ignoring');
      return;
    }
    if (!isInstagramPage()) {
      console.log('Insta: not on Instagram, ignoring');
      return;
    }

    console.log('Insta: Shift+right mousedown, opening photos');
    const target = event.target;
    if (!(target instanceof Element)) {
      console.log('Insta: no element under cursor, nothing to collect');
      return;
    }

    const sources = collectImageSources(target);
    if (sources.length === 0) {
      console.log('Insta: no image sources found to open');
      return;
    }
    openInNewTabs(sources);
    lastGestureAt = Date.now();
  };

  const handleContextMenu = (event: MouseEvent): void => {
    if (Date.now() - lastGestureAt > CONTEXT_MENU_PAIR_MS) return;
    console.log('Insta: suppressing context menu after gesture');
    event.preventDefault();
    event.stopPropagation();
  };

  document.addEventListener('mousedown', handleRightButtonDown);
  window.addEventListener('contextmenu', handleContextMenu, true);
};
