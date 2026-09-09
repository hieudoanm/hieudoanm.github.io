export const TARGET_URL = 'https://hieudoanm.github.io/app/';

const REDIRECT_KEY = 'redirectNewTabs';

function isNewTab(url: string | undefined): boolean {
  if (!url) return false;
  return (
    url.startsWith('chrome://newtab') ||
    url.startsWith('about:newtab') ||
    url.startsWith('about:home') ||
    url.startsWith('about:privatebrowsing')
  );
}

function redirectToTarget(tabId: number): void {
  chrome.tabs.update(tabId, { url: TARGET_URL });
}

function shouldRedirect(): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(REDIRECT_KEY, (result) => {
      if (chrome.runtime.lastError) {
        resolve(true);
        return;
      }
      resolve(result[REDIRECT_KEY] !== false);
    });
  });
}

async function maybeRedirect(tabId: number): Promise<void> {
  if (await shouldRedirect()) {
    redirectToTarget(tabId);
  }
}

export function registerNewTabRedirect(): void {
  chrome.tabs.onCreated.addListener((tab) => {
    const tabId = tab.id;
    if (tabId === undefined) return;
    if (!isNewTab(tab.url) && !isNewTab(tab.pendingUrl)) return;
    void maybeRedirect(tabId);
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.url && isNewTab(changeInfo.url)) {
      void maybeRedirect(tabId);
    }
  });
}
