import {
  oklchToHex,
  labToHex,
  inlineTailwindStyles,
  applyExportSafeColors,
} from '../colors';

describe('oklchToHex', () => {
  it('converts oklch to hex', () => {
    const hex = oklchToHex('oklch(0.5 0.2 180)');
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('returns default for invalid input', () => {
    expect(oklchToHex('invalid')).toBe('#000000');
  });

  it('converts oklch with zero chroma', () => {
    const hex = oklchToHex('oklch(0.5 0 0)');
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe('labToHex', () => {
  it('converts lab to hex', () => {
    const hex = labToHex('lab(50 20 -30)');
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('handles negative a/b values', () => {
    const hex = labToHex('lab(50 -20 30)');
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('returns default for invalid input', () => {
    expect(labToHex('invalid')).toBe('#000000');
  });

  it('converts lab with zero values', () => {
    const hex = labToHex('lab(0 0 0)');
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe('inlineTailwindStyles', () => {
  it('inlines styles for elements', () => {
    const root = document.createElement('div');
    root.style.width = '100px';
    root.style.height = '200px';
    const child = document.createElement('span');
    child.textContent = 'test';
    child.style.fontSize = '16px';
    root.appendChild(child);
    document.body.appendChild(root);

    inlineTailwindStyles(root);
    expect(child.style.fontSize).toBe('16px');
    document.body.removeChild(root);
  });

  it('handles empty element', () => {
    const root = document.createElement('div');
    inlineTailwindStyles(root);
    expect(root.style.width).toBe('');
  });

  it('does not throw with null computed values', () => {
    const root = document.createElement('div');
    root.style.display = 'none';
    document.body.appendChild(root);
    expect(() => inlineTailwindStyles(root)).not.toThrow();
    document.body.removeChild(root);
  });
});

describe('applyExportSafeColors', () => {
  it('returns a restore function', () => {
    const root = document.createElement('div');
    root.style.color = 'red';
    document.body.appendChild(root);

    const restore = applyExportSafeColors(root);
    expect(typeof restore).toBe('function');

    restore();
    document.body.removeChild(root);
  });

  it('restores original styles after modification', () => {
    const root = document.createElement('div');
    root.setAttribute('style', 'color: red;');
    document.body.appendChild(root);

    const restore = applyExportSafeColors(root);
    expect(root.getAttribute('style')).toBeTruthy();

    restore();
    expect(root.getAttribute('style')).toBe('color: red;');
    document.body.removeChild(root);
  });

  it('handles element without style attribute', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    const restore = applyExportSafeColors(root);
    expect(typeof restore).toBe('function');
    restore();
    document.body.removeChild(root);
  });

  it('preserves properties that do not contain oklch/lab/color', () => {
    const root = document.createElement('div');
    root.style.color = 'red';
    root.style.fontSize = '14px';
    document.body.appendChild(root);

    const restore = applyExportSafeColors(root);
    expect(root.style.color).toBe('red');
    expect(root.style.fontSize).toBe('14px');

    restore();
    document.body.removeChild(root);
  });
});
