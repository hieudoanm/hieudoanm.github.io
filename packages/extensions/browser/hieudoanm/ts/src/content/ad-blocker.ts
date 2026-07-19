const AD_SELECTORS = [
  '.ads',
  '.adsbox',
  '.ad-placement',
  '.ad-placeholder',
  '.ad-container',
  '.advertisement',
  'ins.adsbygoogle',
  '[class*="ad-"]',
  '[id*="ad-"]',
  '[class*="ads-"]',
  '[id*="ads-"]',
  'a[href*="doubleclick.net"]',
  'iframe[src*="doubleclick.net"]',
  'iframe[src*="googlesyndication"]',
];

function hideAds() {
  const selectorString = AD_SELECTORS.join(', ');
  const elements = document.querySelectorAll(selectorString);
  elements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    if (htmlEl.style.display !== 'none') {
      htmlEl.style.setProperty('display', 'none', 'important');
      console.log('[AdBlocker] Hid ad banner element:', el);
    }
  });
}

hideAds();

document.addEventListener('DOMContentLoaded', hideAds);

const observer = new MutationObserver(() => {
  hideAds();
});

const targetNode = document.documentElement || document.body;
if (targetNode) {
  observer.observe(targetNode, {
    childList: true,
    subtree: true,
  });
} else {
  window.addEventListener('load', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    hideAds();
  });
}
