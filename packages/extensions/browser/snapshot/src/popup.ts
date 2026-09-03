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

let lastDataUrl: string | null = null;
let lastFilename: string | null = null;
let isBusy = false;

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  if (!tabUrlEl) return;
  if (tab?.url) {
    try {
      const url = new URL(tab.url);
      tabUrlEl.textContent = `${url.hostname}${url.pathname === '/' ? '' : url.pathname}`;
    } catch {
      tabUrlEl.textContent = tab.url;
    }
  }
});

function setStatus(msg: string, type = ''): void {
  if (!statusEl) return;
  statusEl.textContent = msg;
  statusEl.className = 'status' + (type ? ` ${type}` : '');
}

function bytesToSize(base64: string): string {
  const bytes = Math.round((base64.length * 3) / 4);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function getTimestamp(): string {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
}

function setBusy(busy: boolean): void {
  isBusy = busy;
  captureViewBtn.disabled = busy;
  captureFullBtn.disabled = busy;
}

async function capture(mode: 'view' | 'full'): Promise<void> {
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
}

function triggerDownload(dataUrl: string, filename: string): void {
  chrome.downloads.download({ url: dataUrl, filename, saveAs: false }, () => {
    if (chrome.runtime.lastError) {
      setStatus('Download error: ' + chrome.runtime.lastError.message, 'err');
    } else {
      setStatus('Saved to downloads ✓', 'ok');
    }
  });
}

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
