// Background script for Block Sites Extension
// Default list of blocked site domains
const DEFAULT_BLOCKED_SITES = [
  'facebook.com',
  'twitter.com',
  'reddit.com',
  'tiktok.com',
];

const BLOCKED_URL_PATTERNS = DEFAULT_BLOCKED_SITES.map(
  (domain) => `*://*.${domain}/*`
);

const isManifestV2 = typeof chrome.webRequest !== 'undefined';

if (isManifestV2) {
  chrome.webRequest.onBeforeRequest.addListener(
    () => {
      console.log('[BlockSites] Blocked site request');
      return { cancel: true };
    },
    { urls: BLOCKED_URL_PATTERNS },
    ['blocking']
  );
  console.log('[BlockSites] WebRequest block rules initialized (Manifest V2).');
} else {
  chrome.runtime.onInstalled.addListener(() => {
    console.log(
      '[BlockSites] DeclarativeNetRequest rules initialized (Manifest V3).'
    );
  });
}
