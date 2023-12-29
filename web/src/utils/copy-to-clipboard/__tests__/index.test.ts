import { copyToClipboard } from '..';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {
      return;
    },
  },
});

describe('copyToClipboard', () => {
  it('should success', () => {
    jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValueOnce();
    copyToClipboard('text');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('text');
  });
});
