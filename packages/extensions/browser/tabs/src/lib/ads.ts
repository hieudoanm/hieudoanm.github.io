export const ADS_KEY = 'blockAds';

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

export const AD_NETWORK_DOMAINS = [
  '*://*.doubleclick.net/*',
  '*://*.google-analytics.com/*',
  '*://*.googlesyndication.com/*',
  '*://*.adnxs.com/*',
  '*://*.outbrain.com/*',
  '*://*.taboola.com/*',
];

function hideAdElements(): void {
  const elements = document.querySelectorAll<HTMLElement>(
    AD_SELECTORS.join(', ')
  );
  for (const el of elements) {
    if (el.style.display !== 'none') {
      el.style.setProperty('display', 'none', 'important');
    }
  }
}

export function maybeRunAdsBlocker(): void {
  chrome.storage.sync.get(ADS_KEY, (result) => {
    if (chrome.runtime.lastError || result[ADS_KEY] === false) return;

    hideAdElements();
    document.addEventListener('DOMContentLoaded', hideAdElements);

    const observer = new MutationObserver(() => {
      hideAdElements();
    });

    const targetNode = document.documentElement || document.body;
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    } else {
      window.addEventListener('load', () => {
        observer.observe(document.body, { childList: true, subtree: true });
        hideAdElements();
      });
    }
  });
}
