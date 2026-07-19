import html2canvas from 'html2canvas-pro';
import { fixGradients, restoreGradients, download } from '../canvas';

jest.mock('html2canvas-pro', () =>
  jest.fn().mockResolvedValue({ toDataURL: () => 'data:image/png;base64,xyz' })
);

const html2canvasMock = html2canvas as unknown as jest.Mock;

describe('fixGradients', () => {
  it('removes gradient classes from gradient text elements', () => {
    const root = document.createElement('div');
    root.innerHTML =
      '<span class="bg-clip-text text-transparent bg-gradient-to-r from-a to-b">hi</span>';
    const els = fixGradients(root);
    expect(els.length).toBe(1);
    const el = els[0];
    expect(el.className).not.toContain('bg-clip-text');
    expect(el.className).not.toContain('text-transparent');
    expect(el.className).toContain('text-white');
    expect(el.dataset.opencodeOrigClass).toBeTruthy();
  });

  it('returns empty list when nothing to fix', () => {
    const root = document.createElement('div');
    root.innerHTML = '<span class="plain">x</span>';
    expect(fixGradients(root).length).toBe(0);
  });
});

describe('restoreGradients', () => {
  it('restores original class names', () => {
    const root = document.createElement('div');
    root.innerHTML =
      '<span class="bg-clip-text text-transparent bg-gradient-to-r from-a to-b">hi</span>';
    const els = fixGradients(root);
    restoreGradients(els);
    expect(els[0].className).toContain('bg-clip-text');
    expect(els[0].dataset.opencodeOrigClass).toBeUndefined();
  });

  it('is a no-op for elements without saved classes', () => {
    const root = document.createElement('div');
    root.innerHTML = '<span class="plain">x</span>';
    const els = root.querySelectorAll('span');
    restoreGradients(els);
    expect(els[0].className).toBe('plain');
  });
});

describe('download', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });
  });

  it('does nothing without a ref', async () => {
    await download({ ref: { current: null }, output: 'x' });
    expect(html2canvasMock).not.toHaveBeenCalled();
  });

  it('renders canvas and triggers anchor click', async () => {
    const anchor = document.createElement('a');
    const clickSpy = jest.spyOn(anchor, 'click').mockImplementation(() => {});
    jest
      .spyOn(document, 'createElement')
      .mockReturnValue(anchor as unknown as HTMLElement);

    const root = document.createElement('div');
    root.innerHTML = '<span class="plain">x</span>';

    await download({ ref: { current: root }, output: 'chess-position' });

    expect(html2canvasMock).toHaveBeenCalledWith(
      root,
      expect.objectContaining({ useCORS: true })
    );
    expect(clickSpy).toHaveBeenCalled();
    expect(anchor.download).toBe('chess-position.png');
  });
});
