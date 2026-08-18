import { detectBrowser, BROWSER_LABELS, ENGINE_LABELS } from '../browser';

describe('detectBrowser', () => {
  it('detects Chrome', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    expect(detectBrowser(ua).browser).toBe('chrome');
    expect(detectBrowser(ua).engine).toBe('blink');
  });

  it('detects Firefox', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0';
    expect(detectBrowser(ua).browser).toBe('firefox');
    expect(detectBrowser(ua).engine).toBe('gecko');
  });

  it('detects Safari', () => {
    const ua =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15';
    expect(detectBrowser(ua).browser).toBe('safari');
    expect(detectBrowser(ua).engine).toBe('webkit');
  });

  it('detects Edge', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0';
    expect(detectBrowser(ua).browser).toBe('edge');
    expect(detectBrowser(ua).engine).toBe('blink');
  });

  it('detects Opera', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0';
    expect(detectBrowser(ua).browser).toBe('opera');
    expect(detectBrowser(ua).engine).toBe('blink');
  });

  it('detects Brave', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Brave/96';
    expect(detectBrowser(ua).browser).toBe('brave');
    expect(detectBrowser(ua).engine).toBe('blink');
  });

  it('detects Vivaldi', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Vivaldi/6.5';
    expect(detectBrowser(ua).browser).toBe('vivaldi');
  });

  it('returns unknown for empty UA', () => {
    expect(detectBrowser('').browser).toBe('unknown');
    expect(detectBrowser('').engine).toBe('unknown');
  });

  it('detects mobile', () => {
    const ua =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
    expect(detectBrowser(ua).isMobile).toBe(true);
  });

  it('returns 0 version for unknown', () => {
    expect(detectBrowser('').version).toBe('0');
  });
});

describe('labels', () => {
  it('has all browser labels', () => {
    expect(BROWSER_LABELS.chrome).toBe('Chrome');
    expect(BROWSER_LABELS.firefox).toBe('Firefox');
    expect(BROWSER_LABELS.safari).toBe('Safari');
    expect(BROWSER_LABELS.edge).toBe('Edge');
    expect(BROWSER_LABELS.opera).toBe('Opera');
    expect(BROWSER_LABELS.brave).toBe('Brave');
    expect(BROWSER_LABELS.vivaldi).toBe('Vivaldi');
    expect(BROWSER_LABELS.unknown).toBe('Unknown');
  });

  it('has all engine labels', () => {
    expect(ENGINE_LABELS.blink).toBe('Blink');
    expect(ENGINE_LABELS.gecko).toBe('Gecko');
    expect(ENGINE_LABELS.webkit).toBe('WebKit');
    expect(ENGINE_LABELS.unknown).toBe('Unknown');
  });
});
