const BLOCKED_SITES: string[] = [
  'facebook.com',
  'twitter.com',
  'instagram.com',
  'youtube.com',
  'tiktok.com',
];

/** Helper: Check if URL is blocked */
function isBlocked(url: string): boolean {
  try {
    const hostname = new URL(url).hostname;
    console.log('[Focus] Checking hostname:', hostname);
    const matched = BLOCKED_SITES.some((site) => hostname.includes(site));
    console.log('[Focus] Matched blocked site?', matched);
    return matched;
  } catch (err) {
    console.error('[Focus] Error parsing URL:', url, err);
    return false;
  }
}

/** Listener: Intercept and redirect blocked sites */
console.log('[Focus] Background script loaded');

browser.webRequest.onBeforeRequest.addListener(
  (details: browser.webRequest._OnBeforeRequestDetails) => {
    console.log('[Focus] Intercepted request:', details.url);

    if (isBlocked(details.url)) {
      try {
        const blockedPage = browser.runtime.getURL('blocked.html');
        console.log(
          '[Focus] Blocking and redirecting tab',
          details.tabId,
          'to',
          blockedPage
        ); // Cancel the request
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
