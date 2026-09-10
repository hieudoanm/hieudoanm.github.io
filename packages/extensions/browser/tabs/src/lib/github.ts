export const EXTERNAL_LINKS_KEY = 'githubExternalLinks';

let routingEnabled = true;

void chrome.storage.sync.get(EXTERNAL_LINKS_KEY, (result) => {
  routingEnabled = result[EXTERNAL_LINKS_KEY] !== false;
  console.log(`GitHub: routing enabled=${routingEnabled}`);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && EXTERNAL_LINKS_KEY in changes) {
    routingEnabled = changes[EXTERNAL_LINKS_KEY]?.newValue !== false;
    console.log(`GitHub: toggle changed -> enabled=${routingEnabled}`);
  }
});

const isGitHubPage = (): boolean => {
  const hostname = location.hostname;
  const isGitHub =
    hostname === 'github.com' || hostname.endsWith('.github.com');
  console.log(`GitHub: hostname="${hostname}" isGitHub=${isGitHub}`);
  return isGitHub;
};

const isGitHubUrl = (url: string): boolean => url.includes('github.com');

const getAbsoluteUrl = (href: string): string => {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }

  if (href.startsWith('/')) {
    return 'https://github.com' + href;
  }

  const currentPath = location.pathname;
  const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
  return 'https://github.com' + currentDir + href;
};

const handleClick = (event: MouseEvent): void => {
  if (!routingEnabled) {
    console.log('GitHub: routing disabled, ignoring');
    return;
  }

  if (!event.isTrusted) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const target = event.target;
  if (!(target instanceof Element)) return;

  const link = target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

  const absoluteUrl = getAbsoluteUrl(href);
  if (isGitHubUrl(absoluteUrl)) return;

  console.log(`GitHub: routing external link to a new tab: ${absoluteUrl}`);
  event.preventDefault();
  window.open(absoluteUrl, '_blank', 'noopener');
};

export const registerExternalLinkRouting = (): void => {
  if (!isGitHubPage()) {
    console.log('GitHub: not on GitHub, skipping listener');
    return;
  }

  console.log('GitHub: registering click listener');
  document.addEventListener('click', handleClick);
};
