import type { ExtensionMessage } from './types';

chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
  if (message.action !== 'download') return;

  const { url, filename } = message;

  chrome.downloads.download(
    { url, filename: `instagram/${filename}`, saveAs: false },
    (downloadId?: number) => {
      if (chrome.runtime.lastError) {
        console.warn(
          '[IGDL] Download failed:',
          chrome.runtime.lastError.message
        );
        return;
      }
      console.log('[IGDL] Download started, id:', downloadId);
    }
  );
});
