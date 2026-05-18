// background.js – Service Worker
// Handles captureVisibleTab which must run from background context

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'captureTab') {
    const { format, quality } = message;

    const options: { format: string; quality?: number } = {
      format: format === 'png' ? 'png' : 'jpeg',
    };
    if (format !== 'png' && quality) {
      options.quality = quality;
    }

    // For webp: Chrome's captureVisibleTab doesn't support webp natively,
    // so we capture as PNG and re-encode via OffscreenCanvas if needed.
    const captureFormat = format === 'jpeg' ? 'jpeg' : 'png';
    const captureOptions: { format?: 'png' | 'jpeg'; quality?: number } = {
      format: captureFormat,
    };
    if (captureFormat === 'jpeg') captureOptions.quality = quality || 92;

    chrome.tabs.captureVisibleTab(
      chrome.windows.WINDOW_ID_CURRENT,
      captureOptions,
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          sendResponse('ERROR:' + chrome.runtime.lastError.message);
          return;
        }

        if (format === 'webp') {
          // Re-encode to webp using OffscreenCanvas
          reencodeAsWebP(dataUrl, quality || 92)
            .then((webpUrl) => sendResponse(webpUrl))
            .catch(() => sendResponse(dataUrl)); // fallback: return original png
        } else {
          sendResponse(dataUrl);
        }
      }
    );

    return true; // Keep message channel open for async response
  }
});

async function reencodeAsWebP(pngDataUrl: string, quality: number) {
  const res = await fetch(pngDataUrl);
  const blob = await res.blob();
  const bitmap = await createImageBitmap(blob);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(bitmap, 0, 0);
  const webpBlob = await canvas.convertToBlob({
    type: 'image/webp',
    quality: quality / 100,
  });
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(webpBlob);
  });
}
