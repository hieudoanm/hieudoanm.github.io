function isNewTab(url: string | undefined): boolean {
  if (!url) return false;
  return (
    url.startsWith('chrome://newtab') ||
    url.startsWith('about:newtab') ||
    url.startsWith('about:home') ||
    url.startsWith('about:privatebrowsing')
  );
}

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.id && (isNewTab(tab.url) || isNewTab(tab.pendingUrl))) {
    chrome.tabs.update(tab.id, { url: 'https://hieudoanm.github.io/app/' });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    isNewTab(changeInfo.url) ||
    isNewTab(tab.url) ||
    isNewTab(tab.pendingUrl)
  ) {
    chrome.tabs.update(tabId, { url: 'https://hieudoanm.github.io/app/' });
  }
});
