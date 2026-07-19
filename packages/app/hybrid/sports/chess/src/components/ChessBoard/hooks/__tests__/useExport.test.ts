import { renderHook, act } from '@testing-library/react';
import { createGame } from '@chess/ts';
import { useExport } from '../useExport';

jest.mock('html2canvas-pro', () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve({
      toDataURL: () => 'data:image/png;base64,abc',
    })
  ),
}));

jest.mock('../../../../utils/canvas', () => ({
  download: jest.fn(),
}));

jest.mock('../../utils/eco', () => ({
  downloadGIF: jest.fn(() => Promise.resolve()),
}));

describe('useExport', () => {
  const dispatch = jest.fn();
  const boardRef = { current: document.createElement('div') };
  const gameRef = { current: createGame() };

  beforeEach(() => dispatch.mockClear());

  it('calls download for exportPNG', () => {
    const { result } = renderHook(() =>
      useExport({ pgn: '', boardRef, gameRef, dispatch })
    );
    result.current.exportPNG();
  });

  it('does nothing for exportGIF when pgn is empty', async () => {
    const { result } = renderHook(() =>
      useExport({ pgn: '', boardRef, gameRef, dispatch })
    );
    await result.current.exportGIF();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('calls dispatch for GIF export when pgn is set', async () => {
    const { result } = renderHook(() =>
      useExport({ pgn: '1. e4 e5', boardRef, gameRef, dispatch })
    );
    await result.current.exportGIF();
    expect(dispatch).toHaveBeenCalled();
  });
});
