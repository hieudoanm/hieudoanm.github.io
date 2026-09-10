const captureViewBtn = document.getElementById(
  'captureViewBtn'
) as HTMLButtonElement;
const captureFullBtn = document.getElementById(
  'captureFullBtn'
) as HTMLButtonElement;
const downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement;
const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;
const previewWrap = document.getElementById('previewWrap');
const previewImg = document.getElementById('previewImg') as HTMLImageElement;
const previewSize = document.getElementById('previewSize');
const statusEl = document.getElementById('status');
const autoDownload = document.getElementById(
  'autoDownload'
) as HTMLInputElement;
const formatSelect = document.getElementById(
  'formatSelect'
) as HTMLSelectElement;
const tabUrlEl = document.getElementById('tabUrl');
const newTabRedirect = document.getElementById(
  'newTabRedirect'
) as HTMLInputElement;
const blockDistractingSites = document.getElementById(
  'blockDistractingSites'
) as HTMLInputElement;
const blockAds = document.getElementById('blockAds') as HTMLInputElement;
const newTabTargetUrl = document.getElementById(
  'newTabTargetUrl'
) as HTMLInputElement;
const tabButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>('.tab-btn')
);
const panes = Array.from(document.querySelectorAll<HTMLElement>('.pane'));
const instaTabBtn =
  document.querySelector<HTMLButtonElement>('[data-tab="insta"]');
const instaToggle = document.getElementById('instaToggle') as HTMLInputElement;
const githubTabBtn = document.querySelector<HTMLButtonElement>(
  '[data-tab="github"]'
);
const githubToggle = document.getElementById(
  'githubToggle'
) as HTMLInputElement;

const DEFAULT_TARGET_URL = 'https://hieudoanm.github.io';
const TARGET_URL_KEY = 'newTabTargetUrl';
let savedTargetUrl = DEFAULT_TARGET_URL;

let lastDataUrl: string | null = null;
let lastFilename: string | null = null;
let isBusy = false;

const isInstagramUrl = (value: string): boolean => {
  try {
    return new URL(value).hostname.endsWith('instagram.com');
  } catch {
    return false;
  }
};

const isGitHubUrl = (value: string): boolean => {
  try {
    const hostname = new URL(value).hostname;
    return hostname === 'github.com' || hostname.endsWith('.github.com');
  } catch {
    return false;
  }
};

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  const url = tab?.url;
  if (tabUrlEl) {
    if (url) {
      try {
        const parsed = new URL(url);
        tabUrlEl.textContent = `${parsed.hostname}${parsed.pathname === '/' ? '' : parsed.pathname}`;
      } catch {
        tabUrlEl.textContent = url;
      }
    }
  }
  const onInstagram = url ? isInstagramUrl(url) : false;
  const onGitHub = url ? isGitHubUrl(url) : false;
  instaTabBtn?.classList.toggle('hidden', !onInstagram);
  githubTabBtn?.classList.toggle('hidden', !onGitHub);
  if (onInstagram) {
    activateTab('insta');
  } else if (onGitHub) {
    activateTab('github');
  }
});

chrome.storage.sync.get('redirectNewTabs', (result) => {
  if (chrome.runtime.lastError) return;
  if (newTabRedirect) {
    newTabRedirect.checked = result.redirectNewTabs !== false;
  }
});

newTabRedirect?.addEventListener('change', () => {
  chrome.storage.sync.set({ redirectNewTabs: newTabRedirect.checked });
});

chrome.storage.sync.get('blockDistractingSites', (result) => {
  if (chrome.runtime.lastError) return;
  if (blockDistractingSites) {
    blockDistractingSites.checked = result.blockDistractingSites !== false;
  }
});

blockDistractingSites?.addEventListener('change', () => {
  chrome.storage.sync.set({
    blockDistractingSites: blockDistractingSites.checked,
  });
});

chrome.storage.sync.get('blockAds', (result) => {
  if (chrome.runtime.lastError) return;
  if (blockAds) {
    blockAds.checked = result.blockAds !== false;
  }
});

blockAds?.addEventListener('change', () => {
  chrome.storage.sync.set({
    blockAds: blockAds.checked,
  });
});

chrome.storage.sync.get('instaGesture', (result) => {
  if (chrome.runtime.lastError) return;
  if (instaToggle) {
    instaToggle.checked = result.instaGesture !== false;
  }
});

instaToggle?.addEventListener('change', () => {
  chrome.storage.sync.set({ instaGesture: instaToggle.checked });
});

chrome.storage.sync.get('githubExternalLinks', (result) => {
  if (chrome.runtime.lastError) return;
  if (githubToggle) {
    githubToggle.checked = result.githubExternalLinks !== false;
  }
});

githubToggle?.addEventListener('change', () => {
  chrome.storage.sync.set({ githubExternalLinks: githubToggle.checked });
});

const activateTab = (tabId: string): void => {
  tabButtons.forEach((btn) => {
    const active = btn.dataset.tab === tabId;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });
  panes.forEach((pane) => {
    pane.classList.toggle('active', pane.id === `pane-${tabId}`);
  });
};

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const dataTab = btn.dataset.tab;
    if (dataTab) activateTab(dataTab);
  });
});

const isValidTargetUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

chrome.storage.sync.get(TARGET_URL_KEY, (result) => {
  if (chrome.runtime.lastError) return;
  const value = result[TARGET_URL_KEY];
  savedTargetUrl =
    typeof value === 'string' && value.trim()
      ? value.trim()
      : DEFAULT_TARGET_URL;
  if (newTabTargetUrl) newTabTargetUrl.value = savedTargetUrl;
});

newTabTargetUrl?.addEventListener('change', () => {
  const raw = newTabTargetUrl.value.trim();
  if (!isValidTargetUrl(raw)) {
    newTabTargetUrl.value = savedTargetUrl;
    setStatus('Target must start with http:// or https://', 'err');
    return;
  }
  savedTargetUrl = raw;
  newTabTargetUrl.value = raw;
  chrome.storage.sync.set({ [TARGET_URL_KEY]: raw });
  setStatus('Target saved ✓', 'ok');
});

const setStatus = (msg: string, type = ''): void => {
  if (!statusEl) return;
  statusEl.textContent = msg;
  statusEl.className = 'status' + (type ? ` ${type}` : '');
};

const bytesToSize = (base64: string): string => {
  const bytes = Math.round((base64.length * 3) / 4);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};

const getTimestamp = (): string => {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
};

const setBusy = (busy: boolean): void => {
  isBusy = busy;
  captureViewBtn.disabled = busy;
  captureFullBtn.disabled = busy;
};

const capture = async (mode: 'view' | 'full'): Promise<void> => {
  if (isBusy) return;
  const format = formatSelect.value;
  const quality = format === 'png' ? undefined : 92;

  setBusy(true);
  setStatus(mode === 'full' ? 'Capturing full page...' : 'Capturing view...');
  previewWrap?.classList.remove('visible');
  lastDataUrl = null;

  try {
    const response = await chrome.runtime.sendMessage({
      action: mode === 'full' ? 'captureFullPage' : 'captureView',
      format,
      quality,
    });

    if (!response?.dataUrl) {
      throw new Error(response?.error || 'Capture failed.');
    }

    const dataUrl = response.dataUrl as string;
    lastDataUrl = dataUrl;
    lastFilename = `snapshot_${mode}_${getTimestamp()}.${format}`;

    previewImg.src = dataUrl;
    previewSize!.textContent = bytesToSize(dataUrl);
    previewWrap?.classList.add('visible');

    setStatus(
      mode === 'full' ? 'Full page captured' : 'Captured successfully',
      'ok'
    );

    if (autoDownload?.checked) {
      triggerDownload(dataUrl, lastFilename);
    }
  } catch (err: unknown) {
    setStatus((err as Error).message || 'Capture failed.', 'err');
  } finally {
    setBusy(false);
  }
};

const triggerDownload = (dataUrl: string, filename: string): void => {
  chrome.downloads.download({ url: dataUrl, filename, saveAs: false }, () => {
    if (chrome.runtime.lastError) {
      setStatus('Download error: ' + chrome.runtime.lastError.message, 'err');
    } else {
      setStatus('Saved to downloads ✓', 'ok');
    }
  });
};

captureViewBtn.addEventListener('click', () => {
  void capture('view');
});

captureFullBtn.addEventListener('click', () => {
  void capture('full');
});

downloadBtn.addEventListener('click', () => {
  if (!lastDataUrl) return;
  triggerDownload(lastDataUrl, lastFilename ?? '');
});

copyBtn.addEventListener('click', async () => {
  if (!lastDataUrl) return;
  try {
    const res = await fetch(lastDataUrl);
    const blob = await res.blob();
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    setStatus('Copied to clipboard ✓', 'ok');
  } catch {
    setStatus('Copy not supported in this context.', 'err');
  }
});
