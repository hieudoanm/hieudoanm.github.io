const BLOCKED_SITES: string[] = [
  'facebook.com',
  'twitter.com',
  'instagram.com',
  'youtube.com/shorts',
  'tiktok.com',
];

// Sites where we inject a content script to hide sections instead of blocking
const HIDE_SECTIONS: { match: string; selector: string }[] = [
  {
    match: 'youtube.com',
    selector: [
      'ytd-rich-section-renderer', // Shorts shelf on home
      'ytd-reel-shelf-renderer', // Shorts shelf (alt)
      'a[href^="/shorts"]', // Shorts links in sidebar/nav
    ].join(', '),
  },
];

/** Helper: Check full URL (hostname + path) against a site pattern */
function matchesSite(url: string, site: string): boolean {
  try {
    const parsed = new URL(url);
    const full = parsed.hostname + parsed.pathname;
    return full.includes(site);
  } catch {
    return false;
  }
}

/** Helper: Check if URL should be fully blocked */
function isBlocked(url: string): boolean {
  return BLOCKED_SITES.some((site) => matchesSite(url, site));
}

/** Helper: Return hide-section config if URL matches, else null */
function getHideConfig(url: string): { selector: string } | null {
  try {
    const hostname = new URL(url).hostname;
    const config = HIDE_SECTIONS.find((s) => hostname.includes(s.match));
    return config ? { selector: config.selector } : null;
  } catch {
    return null;
  }
}

console.log('[Focus] Background script loaded');

// Intercept and redirect fully blocked sites
browser.webRequest.onBeforeRequest.addListener(
  (details: browser.webRequest._OnBeforeRequestDetails) => {
    console.log('[Focus] Intercepted request:', details.url);

    if (isBlocked(details.url)) {
      try {
        const blockedPage = browser.runtime.getURL('blocked.html');
        console.log('[Focus] Blocking tab', details.tabId, '->', blockedPage);
        browser.tabs.update(details.tabId, { url: blockedPage });
        return { cancel: true };
      } catch (error) {
        console.error('[Focus] Redirect error:', error);
      }
    } else {
      console.log('[Focus] URL not blocked:', details.url);
    }
  },
  { urls: ['<all_urls>'], types: ['main_frame'] },
  ['blocking']
);

// Inject content script to hide sections on allowed-but-restricted sites
browser.tabs.onUpdated.addListener(
  (
    tabId: number,
    changeInfo: browser.tabs._OnUpdatedChangeInfo,
    tab: browser.tabs.Tab
  ) => {
    if (changeInfo.status !== 'complete' || !tab.url) return;

    const hideConfig = getHideConfig(tab.url);
    if (!hideConfig) return;

    const { selector } = hideConfig;

    browser.tabs.executeScript(tabId, {
      code: `
        (function () {
          const SELECTOR = ${JSON.stringify(selector)};

          function hideElements() {
            document.querySelectorAll(SELECTOR).forEach((el) => {
              el.style.setProperty('display', 'none', 'important');
            });
          }

          // Run immediately on load
          hideElements();

          // Watch for dynamically injected elements (YouTube is an SPA)
          const observer = new MutationObserver(hideElements);
          observer.observe(document.body, { childList: true, subtree: true });
        })();
      `,
    });
  }
);
