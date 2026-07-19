import { detectFromHTML } from '../detect';

describe('detectFromHTML', () => {
  it('detects Shopify from CDN link', () => {
    const html = '<script src="https://cdn.shopify.com/..."></script>';
    const result = detectFromHTML('https://example.com', html);
    expect(result.isShopify).toBe(true);
    expect(result.confidence).toBeGreaterThanOrEqual(40);
    expect(result.signals).toContain('cdn.shopify.com found');
  });

  it('detects Shopify sections', () => {
    const html = '<div class="shopify-section">...</div>';
    const result = detectFromHTML('https://example.com', html);
    expect(result.isShopify).toBe(true);
    expect(result.confidence).toBeGreaterThanOrEqual(30);
    expect(result.signals).toContain('shopify-section class found');
  });

  it('detects Shopify Plus', () => {
    const html = 'shopify plus feature enabled';
    const result = detectFromHTML('https://example.com', html);
    expect(result.isPlus).toBe(true);
    expect(result.signals).toContain('Shopify Plus marker found');
  });

  it('returns not detected for clean HTML', () => {
    const html = '<html><body>Hello</body></html>';
    const result = detectFromHTML('https://example.com', html);
    expect(result.isShopify).toBe(false);
    expect(result.isPlus).toBe(false);
    expect(result.confidence).toBe(0);
  });

  it('includes checkedAt timestamp', () => {
    const before = Date.now();
    const result = detectFromHTML('https://example.com', '<html></html>');
    const after = Date.now();
    expect(result.checkedAt).toBeGreaterThanOrEqual(before);
    expect(result.checkedAt).toBeLessThanOrEqual(after);
  });
});
