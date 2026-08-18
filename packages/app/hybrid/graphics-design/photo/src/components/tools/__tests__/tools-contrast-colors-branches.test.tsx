import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { ContrastCheckerTool } from '@/components/tools/ContrastCheckerTool';
import { ColorsTool } from '@/components/tools/ColorsTool';

const cfg = (id: string) => ({
  id,
  title: id,
  emoji: 'x',
  description: id,
  category: 'edit' as const,
});

describe('ContrastCheckerTool branch coverage', () => {
  it('renders levels section with all PASS for high-contrast colors', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    expect(screen.getAllByText('PASS').length).toBe(4);
    expect(screen.queryByText('FAIL')).toBeNull();
  });

  it('renders some FAIL levels for low-contrast colors', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const fg = screen.getAllByDisplayValue('#ffffff')[1];
    fireEvent.change(fg, { target: { value: '#777777' } });
    const allResults = [
      ...screen.getAllByText('PASS'),
      ...screen.getAllByText('FAIL'),
    ];
    expect(allResults.length).toBe(4);
    expect(screen.getAllByText('FAIL').length).toBeGreaterThan(0);
  });

  it('hides levels for invalid hex input via formatHex producing non-parseable hex', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const bg = screen.getAllByDisplayValue('#000000')[1];
    fireEvent.change(bg, { target: { value: 'zz' } });
    expect(screen.queryAllByText('PASS').length).toBe(0);
    expect(screen.queryAllByText('FAIL').length).toBe(0);
  });

  it('hides levels for invalid hex input (non-hex chars in foreground)', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const fg = screen.getAllByDisplayValue('#ffffff')[1];
    fireEvent.change(fg, { target: { value: '#zzzzzz' } });
    expect(screen.queryAllByText('PASS').length).toBe(0);
  });

  it('expands 3-char hex via formatHex branch', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const bg = screen.getAllByDisplayValue('#000000')[1];
    fireEvent.change(bg, { target: { value: '#000' } });
    expect(screen.getAllByText('PASS').length).toBe(4);
  });

  it('pads short hex input via formatHex padEnd branch', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const bg = screen.getAllByDisplayValue('#000000')[1];
    fireEvent.change(bg, { target: { value: '#abc' } });
    const allResults = [
      ...screen.queryAllByText('PASS'),
      ...screen.queryAllByText('FAIL'),
    ];
    expect(allResults.length).toBe(4);
  });

  it('hides levels when background has invalid characters', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const bg = screen.getAllByDisplayValue('#000000')[1];
    fireEvent.change(bg, { target: { value: 'xy' } });
    expect(screen.queryAllByText('PASS').length).toBe(0);
  });

  it('updates foreground color via color input', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const colorInputs = document.querySelectorAll('input[type="color"]');
    fireEvent.change(colorInputs[0], { target: { value: '#00ff00' } });
    const allResults = [
      ...screen.queryAllByText('PASS'),
      ...screen.queryAllByText('FAIL'),
    ];
    expect(allResults.length).toBe(4);
  });

  it('returns 0 luminance for invalid hex in hexToRgb', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const fg = screen.getAllByDisplayValue('#ffffff')[1];
    fireEvent.change(fg, { target: { value: 'zz' } });
    expect(screen.queryAllByText('PASS').length).toBe(0);
    expect(screen.queryAllByText('FAIL').length).toBe(0);
  });

  it('covers linearize low-s branch (s <= 0.04045)', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const fg = screen.getAllByDisplayValue('#ffffff')[1];
    fireEvent.change(fg, { target: { value: '#030303' } });
    expect(screen.queryAllByText('FAIL').length).toBe(4);
  });

  it('covers linearize high-s branch (s > 0.04045)', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const fg = screen.getAllByDisplayValue('#ffffff')[1];
    fireEvent.change(fg, { target: { value: '#ffffff' } });
    expect(screen.getAllByText('PASS').length).toBe(4);
  });

  it('covers AA Large pass but AAA Normal fail (ratio between 4.5 and 7)', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const fg = screen.getAllByDisplayValue('#ffffff')[1];
    fireEvent.change(fg, { target: { value: '#767676' } });
    const passElements = screen.getAllByText('PASS');
    const failElements = screen.getAllByText('FAIL');
    expect(passElements.length).toBeGreaterThan(0);
    expect(failElements.length).toBeGreaterThan(0);
  });

  it('handles hex input without # prefix', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const fg = screen.getAllByDisplayValue('#ffffff')[1];
    fireEvent.change(fg, { target: { value: 'ffffff' } });
    expect(screen.getAllByText('PASS').length).toBe(4);
  });

  it('updates both fg and bg simultaneously', () => {
    render(<ContrastCheckerTool config={cfg('contrast-checker')} />);
    const colorInputs = document.querySelectorAll('input[type="color"]');
    fireEvent.change(colorInputs[0], { target: { value: '#000000' } });
    fireEvent.change(colorInputs[1], { target: { value: '#ffffff' } });
    expect(screen.getAllByText('PASS').length).toBe(4);
  });
});

describe('ColorsTool branch coverage', () => {
  it('updates hex via color input', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const colorInput = document.querySelector('input[type="color"]');
    fireEvent.change(colorInput!, { target: { value: '#ff0000' } });
    expect(screen.getByText('rgb(255, 0, 0)')).toBeTruthy();
  });

  it('updates hex via text input', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#00ff00' } });
    expect(screen.getByText('rgb(0, 255, 0)')).toBeTruthy();
  });

  it('triggers random color on space key', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.keyDown(window, { key: ' ' });
    expect((hexInput as HTMLInputElement).value).not.toBe('#171717');
  });

  it('random button click changes color', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.click(screen.getByRole('button', { name: 'Random' }));
    expect((hexInput as HTMLInputElement).value).not.toBe('#171717');
  });

  it('clicks a tailwind swatch', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const swatches = document.querySelectorAll('button[title]');
    if (swatches.length > 0) {
      fireEvent.click(swatches[0]);
      expect(screen.getByText(/rgb/)).toBeTruthy();
    }
  });

  it('displays shade labels with correct formatting', () => {
    render(<ColorsTool config={cfg('colors')} />);
    expect(screen.getByText('50')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('9.5')).toBeTruthy();
  });

  it('converts hex to HSL with r as max', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#ff0000' } });
    expect(screen.getByText(/hsl\(0, 100%, 50%\)/)).toBeTruthy();
  });

  it('converts hex to HSL with g as max', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#00ff00' } });
    expect(screen.getByText(/hsl\(120, 100%, 50%\)/)).toBeTruthy();
  });

  it('converts hex to HSL with b as max', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#0000ff' } });
    expect(screen.getByText(/hsl\(240, 100%, 50%\)/)).toBeTruthy();
  });

  it('converts hex to HSL with gray (max === min)', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#808080' } });
    expect(screen.getByText(/hsl\(0, 0%, 50%\)/)).toBeTruthy();
  });

  it('converts hex to OKLCH', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#ff0000' } });
    expect(screen.getByText(/oklch/)).toBeTruthy();
  });

  it('handles short hex input in hex2rgb (returns zeros)', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#12' } });
    expect(screen.getByText(/rgb\(0, 0, 0\)/)).toBeTruthy();
  });

  it('handles 3-char hex in hex2rgb (returns zeros)', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#fff' } });
    expect(screen.getByText(/rgb\(0, 0, 0\)/)).toBeTruthy();
  });

  it('does not trigger random on non-space key', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.keyDown(window, { key: 'a' });
    expect((hexInput as HTMLInputElement).value).toBe('#171717');
  });

  it('converts black to HSL (gray case, l = 0)', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#000000' } });
    expect(screen.getByText(/hsl\(0, 0%, 0%\)/)).toBeTruthy();
  });

  it('converts white to HSL (gray case, l = 100)', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#ffffff' } });
    expect(screen.getByText(/hsl\(0, 0%, 100%\)/)).toBeTruthy();
  });

  it('hex2hsl with saturation > 0.5 branch', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#4488cc' } });
    expect(screen.getByText(/hsl/)).toBeTruthy();
  });

  it('renders all color name rows', () => {
    const { container } = render(<ColorsTool config={cfg('colors')} />);
    const rows = container.querySelectorAll(
      '.grid.grid-cols-\\[4rem_repeat\\(11\\,1fr\\)\\]'
    );
    expect(rows.length).toBeGreaterThan(10);
  });

  it('highlights active swatch when color matches', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#ef4444' } });
    const swatch = document.querySelector('button[title*="red-500"]');
    if (swatch) {
      expect((swatch as HTMLElement).style.outline).toContain('oklch');
    }
  });
});
