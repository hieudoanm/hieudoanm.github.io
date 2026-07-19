import '../styles/instagram-download.css';
import { isInstagramCdn } from '../lib/instagram-download/utils';
import { createOverlay } from '../lib/instagram-download/overlay';

const PROCESSED_ATTR = 'data-igdl-processed';

const MIN_NATURAL_PX = 100;
const MIN_RENDERED_PX = 80;

function isSufficientlyLarge(img: HTMLImageElement): boolean {
  const naturalOk =
    img.naturalWidth > MIN_NATURAL_PX && img.naturalHeight > MIN_NATURAL_PX;
  if (naturalOk) return true;

  const rect = img.getBoundingClientRect();
  return rect.width > MIN_RENDERED_PX || rect.height > MIN_RENDERED_PX;
}

function processImage(img: HTMLImageElement): void {
  if (img.hasAttribute(PROCESSED_ATTR)) return;
  if (!img.src || img.src.startsWith('data:')) return;
  if (!isInstagramCdn(img.src)) return;
  if (!isSufficientlyLarge(img)) return;

  img.setAttribute(PROCESSED_ATTR, '1');

  const container = img.parentElement;
  if (!container) return;

  const position = getComputedStyle(container).position;
  if (position === 'static') container.style.position = 'relative';

  const overlay = createOverlay(img);
  if (overlay) container.appendChild(overlay);
}

function scanImages(): void {
  document.querySelectorAll<HTMLImageElement>('img').forEach(processImage);
}

scanImages();

const observer = new MutationObserver((mutations: MutationRecord[]) => {
  const hasAddedNodes = mutations.some((m) => m.addedNodes.length > 0);
  if (hasAddedNodes) scanImages();
});

observer.observe(document.body, { childList: true, subtree: true });
