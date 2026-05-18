// Background script for Block Ads and Banners Extension

const isManifestV2 = typeof chrome.webRequest !== 'undefined';

if (isManifestV2) {
  const AD_DOMAINS = [
    '*://*.doubleclick.net/*',
    '*://*.google-analytics.com/*',
    '*://*.googlesyndication.com/*',
    '*://*.adnxs.com/*',
    '*://*.outbrain.com/*',
    '*://*.taboola.com/*',
  ];

  chrome.webRequest.onBeforeRequest.addListener(
    () => {
      console.log('[AdBlocker] Blocked network ad request');
      return { cancel: true };
    },
    { urls: AD_DOMAINS },
    ['blocking']
  );
  console.log('[AdBlocker] WebRequest block rules initialized (Manifest V2).');
} else {
  chrome.runtime.onInstalled.addListener(() => {
    console.log(
      '[AdBlocker] DeclarativeNetRequest block rules initialized (Manifest V3).'
    );
  });
}
