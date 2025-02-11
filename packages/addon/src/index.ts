// List of blocked sites
let blockedSites: string[] = [];

// Fetch the blocked sites from storage
chrome.storage.sync.get(['blockedSites'], (result) => {
  if (result.blockedSites) {
    blockedSites = result.blockedSites;
  }
});

// Listen for web requests and block if the URL matches
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    for (const site of blockedSites) {
      if (details.url.includes(site)) {
        return { cancel: true };
      }
    }
    return { cancel: false };
  },
  { urls: ['<all_urls>'] },
  ['blocking']
);

// Update blocked sites when changed
chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockedSites) {
    blockedSites = changes.blockedSites.newValue;
  }
});
