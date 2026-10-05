import { act, renderHook } from '@testing-library/react';

import * as draw from '../draw';
import * as game from '../game';
import { attentionLoad, useDinoRun } from '../useDinoRun';

jest.mock('../draw', () => ({
  ...jest.requireActual('../draw'),
  draw: jest.fn(),
}));

jest.mock('../game', () => ({
  ...jest.requireActual('../game'),
  checkCollision: jest.fn(() => false),
}));

const stubContext = () =>
  ({
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    scale: jest.fn(),
    fillStyle: '',
    globalAlpha: 1,
  }) as unknown as CanvasRenderingContext2D;

const makeCanvas = (withContext = true): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');

  jest
    .spyOn(canvas, 'getContext')
    .mockReturnValue(withContext ? stubContext() : (null as never));

  return canvas;
};

const COLLIDE_AFTER = 12;

const key = (value: string) =>
  ({
    key: value,
    preventDefault: jest.fn(),
  }) as unknown as React.KeyboardEvent;

describe('useDinoRun', () => {
  let frames: jest.SpyInstance<number, [FrameRequestCallback]>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(game.checkCollision).mockReturnValue(false);
    frames = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(() => 1);
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const flush = (result: { current: ReturnType<typeof useDinoRun> }) => {
    const pending = frames.mock.calls.pop();

    if (!pending) return;

    act(() => {
      pending[0](0);
    });
  };

  const mount = () => {
    const view = renderHook(() => useDinoRun());

    act(() => {
      view.result.current.canvasRef.current = makeCanvas();
    });

    return view;
  };

  it('starts idle with a cleared scoreboard', () => {
    const { result } = mount();

    expect(result.current.phase).toBe('idle');
    expect(result.current.score).toBe(0);
    expect(result.current.best).toBe(0);
    expect(result.current.tier).toBe(1);
    expect(result.current.load).toBe('Calm');
  });

  it('paints the idle world once the canvas is attached', () => {
    mount();

    expect(draw.draw).not.toHaveBeenCalled();
  });

  it('starts the run when hopping from idle', () => {
    const { result } = mount();

    act(() => {
      result.current.hop();
    });

    expect(result.current.phase).toBe('running');
    expect(frames).toHaveBeenCalledTimes(1);
  });

  it('advances the score as frames are flushed', () => {
    const { result } = mount();

    act(() => {
      result.current.hop();
    });

    for (let i = 0; i < 12; i++) {
      flush(result);
    }

    expect(result.current.score).toBe(1);
    expect(draw.draw).toHaveBeenCalled();
    expect(result.current.tier).toBeGreaterThanOrEqual(1);
  });

  it('ends the run on a collision and banks the best score', () => {
    let steps = 0;

    jest.mocked(game.checkCollision).mockImplementation(() => {
      steps += 1;

      return steps > COLLIDE_AFTER;
    });

    const { result } = mount();

    act(() => {
      result.current.hop();
    });

    for (let i = 0; i < COLLIDE_AFTER; i++) {
      flush(result);
    }

    expect(result.current.phase).toBe('running');

    flush(result);

    expect(result.current.phase).toBe('over');
    expect(result.current.best).toBe(1);
  });

  it('does not jump once the run is over', () => {
    jest.mocked(game.checkCollision).mockReturnValue(true);
    const { result } = mount();

    act(() => {
      result.current.hop();
    });
    flush(result);

    act(() => {
      result.current.hop();
    });

    expect(result.current.phase).toBe('over');
  });

  it('skips the frame step without a 2d context', () => {
    const { result } = renderHook(() => useDinoRun());

    act(() => {
      result.current.canvasRef.current = makeCanvas(false);
      result.current.hop();
    });
    flush(result);

    expect(result.current.phase).toBe('running');
    expect(draw.draw).not.toHaveBeenCalled();
  });

  it('restarts on the R key', () => {
    const { result } = mount();

    act(() => {
      result.current.hop();
    });

    for (let i = 0; i < 11; i++) {
      flush(result);
    }

    expect(result.current.score).toBe(1);

    act(() => {
      result.current.onKeyDown(key('r'));
    });

    expect(result.current.score).toBe(0);
    expect(result.current.phase).toBe('running');
  });

  it('jumps on space and arrow up', () => {
    const { result } = mount();
    const event = key('ArrowUp');

    act(() => {
      result.current.onKeyDown(event);
    });

    expect(
      (event as unknown as { preventDefault: jest.Mock }).preventDefault
    ).toHaveBeenCalled();
    expect(result.current.phase).toBe('running');
  });

  it('ignores keys that are not bound', () => {
    const { result } = mount();
    const event = key('q');

    act(() => {
      result.current.onKeyDown(event);
    });

    expect(result.current.phase).toBe('idle');
    expect(
      (event as unknown as { preventDefault: jest.Mock }).preventDefault
    ).not.toHaveBeenCalled();
  });

  it('cancels the pending frame on unmount', () => {
    const { result, unmount } = mount();

    act(() => {
      result.current.hop();
    });
    unmount();

    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });
});

describe('attentionLoad', () => {
  it('names the known tiers', () => {
    expect(attentionLoad(1)).toBe('Calm');
    expect(attentionLoad(3)).toBe('Brisk');
    expect(attentionLoad(5)).toBe('Overload');
  });

  it('falls back to Calm for an unknown tier', () => {
    expect(attentionLoad(9)).toBe('Calm');
  });
});
