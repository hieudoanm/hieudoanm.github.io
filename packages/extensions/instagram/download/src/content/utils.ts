/**
 * Picks the highest-resolution URL from an img element.
 * Prefers srcset descriptors over src.
 */
export function getHighResUrl(img: HTMLImageElement): string | null {
  if (img.srcset) {
    const best = img.srcset
      .split(',')
      .map((entry) => {
        const [url, descriptor = '0w'] = entry.trim().split(/\s+/);
        const width = parseInt(descriptor, 10) || 0;
        return { url, width };
      })
      .sort((a, b) => b.width - a.width)[0];

    if (best?.url) return best.url;
  }

  return img.src || null;
}

/**
 * Derives a safe filename from a CDN URL.
 */
export function getFilename(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const base = pathname.split('/').pop()?.split('?')[0] ?? '';
    const hasExt = /\.(jpe?g|png|webp)$/i.test(base);
    return hasExt ? base : `${base}.jpg`;
  } catch {
    return 'instagram-image.jpg';
  }
}

/** Returns true if the URL is served from Instagram's CDN. */
export function isInstagramCdn(url: string): boolean {
  return /cdninstagram\.com|fbcdn\.net/.test(url);
}
