import type { DownloadMessage } from '../types';
import { getHighResUrl, getFilename } from './utils';

const DOWNLOAD_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>`;

const CHECK_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`;

function sendDownload(url: string, filename: string): void {
  const message: DownloadMessage = { action: 'download', url, filename };
  chrome.runtime.sendMessage(message);
}

function flashSuccess(btn: HTMLButtonElement): void {
  btn.classList.add('igdl-success');
  btn.innerHTML = CHECK_ICON;

  setTimeout(() => {
    btn.classList.remove('igdl-success');
    btn.innerHTML = DOWNLOAD_ICON;
  }, 1500);
}

function createButton(img: HTMLImageElement): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = 'igdl-btn';
  btn.setAttribute('aria-label', 'Download image');
  btn.innerHTML = DOWNLOAD_ICON;

  btn.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = getHighResUrl(img);
    if (!url) return;

    sendDownload(url, getFilename(url));
    flashSuccess(btn);
  });

  return btn;
}

export function createOverlay(img: HTMLImageElement): HTMLDivElement | null {
  const container = img.parentElement;
  if (!container) return null;

  const overlay = document.createElement('div');
  overlay.className = 'igdl-overlay';
  overlay.appendChild(createButton(img));

  return overlay;
}
