const TARGET_URL = 'https://hieudoanm.github.io/app/';

function isNewTab(url: string | undefined): boolean {
  if (!url) return false;
  return (
    url.startsWith('chrome://newtab') ||
    url.startsWith('about:newtab') ||
    url.startsWith('about:home') ||
    url.startsWith('about:privatebrowsing')
  );
}

function redirectToTarget(tabId: number) {
  chrome.tabs.update(tabId, { url: TARGET_URL });
}

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.id && (isNewTab(tab.url) || isNewTab(tab.pendingUrl))) {
    redirectToTarget(tab.id);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url && isNewTab(changeInfo.url)) {
    redirectToTarget(tabId);
  }
});
