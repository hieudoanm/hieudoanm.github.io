import { preloadBackgroundImages } from '../../utils/canvas';

describe('preloadBackgroundImages', () => {
  it('returns for elements with no background image', async () => {
    const root = document.createElement('div');
    root.innerHTML = '<span>plain</span>';
    await expect(preloadBackgroundImages(root)).resolves.toBeUndefined();
  });

  it('returns for elements with background: none', async () => {
    const root = document.createElement('div');
    const el = document.createElement('span');
    el.style.backgroundImage = 'none';
    root.appendChild(el);
    await expect(preloadBackgroundImages(root)).resolves.toBeUndefined();
  });

  it('preloads images from background-image url()', async () => {
    const origImage = global.Image;
    class MockImage {
      crossOrigin = '';
      src = '';
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor() {
        queueMicrotask(() => this.onload?.());
      }
    }
    global.Image = MockImage as unknown as typeof Image;
    const root = document.createElement('div');
    const el = document.createElement('span');
    el.style.backgroundImage = 'url("https://example.com/bg.png")';
    root.appendChild(el);
    await expect(preloadBackgroundImages(root)).resolves.toBeUndefined();
    global.Image = origImage;
  });

  it('resolves even when image fails to load', async () => {
    const origImage = global.Image;
    class MockImage {
      crossOrigin = '';
      src = '';
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor() {
        queueMicrotask(() => this.onerror?.());
      }
    }
    global.Image = MockImage as unknown as typeof Image;
    const root = document.createElement('div');
    const el = document.createElement('span');
    el.style.backgroundImage = 'url("https://example.com/missing.png")';
    root.appendChild(el);
    await expect(preloadBackgroundImages(root)).resolves.toBeUndefined();
    global.Image = origImage;
  });

  it('handles multiple background images', async () => {
    const origImage = global.Image;
    let loaded = 0;
    class MockImage {
      crossOrigin = '';
      src = '';
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor() {
        queueMicrotask(() => {
          loaded++;
          this.onload?.();
        });
      }
    }
    global.Image = MockImage as unknown as typeof Image;
    const root = document.createElement('div');
    for (let i = 0; i < 3; i++) {
      const el = document.createElement('span');
      el.style.backgroundImage = `url("https://example.com/${i}.png")`;
      root.appendChild(el);
    }
    await expect(preloadBackgroundImages(root)).resolves.toBeUndefined();
    expect(loaded).toBe(3);
    global.Image = origImage;
  });

  it('extracts URL from quoted background-image', async () => {
    const origImage = global.Image;
    class MockImage {
      crossOrigin = '';
      src = '';
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor() {
        queueMicrotask(() => this.onload?.());
      }
    }
    global.Image = MockImage as unknown as typeof Image;
    const root = document.createElement('div');
    const el = document.createElement('span');
    el.style.backgroundImage = "url('https://example.com/bg.jpg')";
    root.appendChild(el);
    await expect(preloadBackgroundImages(root)).resolves.toBeUndefined();
    global.Image = origImage;
  });
});
