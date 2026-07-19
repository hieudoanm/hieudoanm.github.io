import { stitchChunks, type SnapshotChunk } from './lib/stitch';

interface CaptureRequest {
  format: string;
  quality?: number;
}

interface LayoutInfo {
  scrollHeight: number;
  clientHeight: number;
  scrollY: number;
  dpr: number;
}

const SNAP = 'SNAP_';
const SETTLE_EXTRA_MS = 80;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.action === 'captureView') {
    void handleCaptureView(message as CaptureRequest)
      .then((dataUrl) => sendResponse({ dataUrl }))
      .catch((err: unknown) =>
        sendResponse({ error: (err as Error).message || 'Capture failed' })
      );
    return true;
  }

  if (message?.action === 'captureFullPage') {
    void handleCaptureFullPage(message as CaptureRequest)
      .then((dataUrl) => sendResponse({ dataUrl }))
      .catch((err: unknown) =>
        sendResponse({ error: (err as Error).message || 'Capture failed' })
      );
    return true;
  }
});

async function handleCaptureView(request: CaptureRequest): Promise<string> {
  const captureOptions = buildCaptureOptions(request);
  const dataUrl = await captureVisibleTab(captureOptions);
  if (request.format !== 'png' && request.format !== 'jpeg') {
    return reencode(dataUrl, request.format, request.quality ?? 92);
  }
  return dataUrl;
}

async function handleCaptureFullPage(request: CaptureRequest): Promise<string> {
  const tabId = await getActiveTabId();
  const layout = await sendToContent<LayoutInfo>(tabId, {
    action: `${SNAP}GET_LAYOUT`,
  });
  if (!layout || layout.scrollHeight <= 0) {
    throw new Error('Snapshot: no page to capture');
  }

  const dpr = layout.dpr || 1;
  const chunkCount = Math.ceil(layout.scrollHeight / layout.clientHeight);
  const chunks: SnapshotChunk[] = [];
  let widthPx = 0;

  for (let i = 0; i < chunkCount; i += 1) {
    const target = Math.min(
      i * layout.clientHeight,
      layout.scrollHeight - layout.clientHeight
    );
    const scroll = await sendToContent<{ scrollY: number }>(tabId, {
      action: `${SNAP}SCROLL_TO`,
      y: target,
    });
    await wait(SETTLE_EXTRA_MS);

    const dataUrl = await captureVisibleTab({ format: 'png' });
    const size = await getBitmapSize(dataUrl);
    widthPx = size.width;

    const y = Math.round((scroll?.scrollY ?? target) * dpr);
    chunks.push({ dataUrl, y });
  }

  await sendToContent(tabId, { action: `${SNAP}SCROLL_TO`, y: 0 });

  const heightPx = Math.round(layout.scrollHeight * dpr);
  const stitched = await stitchChunks(chunks, widthPx, heightPx);

  if (request.format === 'png') {
    return stitched;
  }
  return reencode(stitched, request.format ?? 'jpeg', request.quality ?? 92);
}

function buildCaptureOptions(request: CaptureRequest): {
  format: 'png' | 'jpeg';
  quality?: number;
} {
  const format = request.format === 'png' ? 'png' : 'jpeg';
  const options: { format: 'png' | 'jpeg'; quality?: number } = { format };
  if (format === 'jpeg') {
    options.quality = request.quality || 92;
  }
  return options;
}

function captureVisibleTab(options: {
  format: 'png' | 'jpeg';
  quality?: number;
}): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab(
      chrome.windows.WINDOW_ID_CURRENT,
      options,
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        resolve(dataUrl);
      }
    );
  });
}

async function getActiveTabId(): Promise<number> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    throw new Error('Snapshot: no active tab');
  }
  return tab.id;
}

function sendToContent<T>(
  tabId: number,
  message: unknown
): Promise<T | undefined> {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        resolve(undefined);
        return;
      }
      resolve(response as T);
    });
  });
}

async function getBitmapSize(
  dataUrl: string
): Promise<{ width: number; height: number }> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  return { width: bitmap.width, height: bitmap.height };
}

async function reencode(
  dataUrl: string,
  format: string,
  quality: number
): Promise<string> {
  const { width, height } = await getBitmapSize(dataUrl);
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Snapshot: canvas unavailable');
  }
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  ctx.drawImage(bitmap, 0, 0);
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/webp';
  const out = await canvas.convertToBlob({
    type: mime,
    quality: quality / 100,
  });
  return blobToDataUrl(out);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Snapshot: failed to read blob'));
    reader.readAsDataURL(blob);
  });
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
