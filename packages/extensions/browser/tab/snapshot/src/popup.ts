// popup.js

const captureBtn = document.getElementById('captureBtn') as HTMLButtonElement;
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

// Show current tab URL
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  if (!tabUrlEl) return;
  if (tab?.url) {
    try {
      const url = new URL(tab.url);
      tabUrlEl.innerHTML = `<span>${url.hostname}</span>${url.pathname === '/' ? '' : url.pathname}`;
    } catch {
      tabUrlEl.innerHTML = `<span>${tab.url}</span>`;
    }
  }
});

function setStatus(msg: string, type = '') {
  if (!statusEl) return;
  statusEl.textContent = msg;
  statusEl.className = 'status' + (type ? ` ${type}` : '');
}

function bytesToSize(base64: string) {
  const bytes = Math.round((base64.length * 3) / 4);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
}

async function captureTab() {
  if (!formatSelect) return;
  const format = formatSelect.value;
  const mimeType =
    format === 'jpeg'
      ? 'image/jpeg'
      : format === 'webp'
        ? 'image/webp'
        : 'image/png';
  const quality = format === 'png' ? undefined : 92;

  captureBtn?.classList.add('loading');
  setStatus('Capturing...');
  previewWrap?.classList.remove('visible');
  lastDataUrl = null;

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab) throw new Error('No active tab found.');

    // Use captureVisibleTab from background script (avoids popup focus issues)
    const dataUrl = await chrome.runtime.sendMessage({
      action: 'captureTab',
      format,
      quality,
      mimeType,
    });

    if (!dataUrl || dataUrl.startsWith('ERROR:')) {
      throw new Error(dataUrl?.replace('ERROR:', '') || 'Capture failed.');
    }

    lastDataUrl = dataUrl;
    lastFilename = `snapshot_${getTimestamp()}.${format}`;

    // Show preview
    previewImg!.src = dataUrl;
    previewSize!.textContent = bytesToSize(dataUrl);
    previewWrap!.classList.add('visible');

    setStatus('Captured successfully', 'ok');

    if (autoDownload?.checked) {
      triggerDownload(dataUrl, lastFilename);
    }
  } catch (err: unknown) {
    setStatus((err as Error).message || 'Capture failed.', 'err');
  } finally {
    captureBtn.classList.remove('loading');
  }
}

function triggerDownload(dataUrl: string, filename: string) {
  chrome.downloads.download(
    { url: dataUrl, filename, saveAs: false },
    (id: number) => {
      console.log(id);
      if (chrome.runtime.lastError) {
        setStatus('Download error: ' + chrome.runtime.lastError.message, 'err');
      } else {
        setStatus('Saved to downloads ✓', 'ok');
      }
    }
  );
}

downloadBtn.addEventListener('click', () => {
  if (!lastDataUrl) return;
  triggerDownload(lastDataUrl, lastFilename ?? '');
});

copyBtn.addEventListener('click', async () => {
  if (!lastDataUrl) return;
  try {
    // Convert data URL to blob and copy to clipboard
    const res = await fetch(lastDataUrl);
    const blob = await res.blob();
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    setStatus('Copied to clipboard ✓', 'ok');
  } catch {
    setStatus('Copy not supported in this context.', 'err');
  }
});

captureBtn.addEventListener('click', captureTab);
