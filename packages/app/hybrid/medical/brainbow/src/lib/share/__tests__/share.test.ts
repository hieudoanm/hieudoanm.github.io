import {
  blobToFile,
  canShare,
  canShareFiles,
  share,
  shareFiles,
  shareText,
} from '@/lib/share/share';

const withNavigatorShare = (implementation: () => void): (() => void) => {
  const original = navigator.share;
  const originalCanShare = navigator.canShare;
  Object.defineProperty(navigator, 'share', {
    configurable: true,
    value: implementation,
  });
  Object.defineProperty(navigator, 'canShare', {
    configurable: true,
    value: () => true,
  });
  return () => {
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: original,
    });
    Object.defineProperty(navigator, 'canShare', {
      configurable: true,
      value: originalCanShare,
    });
  };
};

describe('share', () => {
  it('returns false when navigator.share is unavailable', async () => {
    withNavigatorShare(() => undefined);
    const original = navigator.share;
    Object.defineProperty(navigator, 'share', { value: undefined });
    await expect(shareText('t', 'text')).resolves.toBe(false);
    Object.defineProperty(navigator, 'share', { value: original });
  });

  it('resolves true when the native sheet completes', async () => {
    const restore = withNavigatorShare(() => undefined);
    await expect(shareText('title', 'body')).resolves.toBe(true);
    restore();
  });

  it('resolves false when the user cancels the sheet', async () => {
    const restore = withNavigatorShare(() => {
      throw new DOMException('AbortError');
    });
    await expect(shareText('title', 'body')).resolves.toBe(false);
    restore();
  });

  it('shares files only when canShare accepts them', async () => {
    const restore = withNavigatorShare(() => undefined);
    const file = blobToFile(new Blob(['a']), 'a.csv');
    await expect(shareFiles('files', [file])).resolves.toBe(true);
    restore();
  });

  it('exposes canShare detection', () => {
    const restore = withNavigatorShare(() => undefined);
    expect(canShare()).toBe(true);
    expect(canShareFiles([blobToFile(new Blob(['a']), 'a.csv')])).toBe(true);
    restore();
  });
});
