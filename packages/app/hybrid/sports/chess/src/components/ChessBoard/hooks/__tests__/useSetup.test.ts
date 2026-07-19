import { renderHook, act } from '@testing-library/react';
import { useSetup } from '../useSetup';

describe('useSetup', () => {
  const dispatch = jest.fn();
  const onApplied = jest.fn();
  const setupFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  beforeEach(() => {
    dispatch.mockClear();
    onApplied.mockClear();
  });

  const setup = (fen = setupFen) =>
    renderHook(() => useSetup({ setupFen: fen, dispatch, onApplied }));

  it('startSetup dispatches SET_SETUP_MODE true', () => {
    const { result } = setup();
    act(() => result.current.startSetup());
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SETUP_MODE',
      setupMode: true,
    });
  });

  it('cancelSetup dispatches SET_SETUP_MODE false', () => {
    const { result } = setup();
    act(() => result.current.cancelSetup());
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SETUP_MODE',
      setupMode: false,
    });
  });

  it('clearBoard dispatches empty FEN', () => {
    const { result } = setup();
    act(() => result.current.clearBoard());
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SETUP_FEN',
      fen: expect.stringContaining('8/8/8/8/8/8/8/8'),
    });
  });

  it('setPalette dispatches palette', () => {
    const { result } = setup();
    act(() => result.current.setPalette('wQ'));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SETUP_PALETTE',
      palette: 'wQ',
    });
  });

  it('setPalette with null clears palette', () => {
    const { result } = setup();
    act(() => result.current.setPalette(null));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SETUP_PALETTE',
      palette: null,
    });
  });

  it('setSetupFen dispatches FEN', () => {
    const { result } = setup();
    act(() => result.current.setSetupFen('custom'));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SETUP_FEN',
      fen: 'custom',
    });
  });

  it('applySetup calls onApplied and exits setup mode', () => {
    const { result } = setup();
    act(() => result.current.applySetup());
    expect(onApplied).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SETUP_MODE',
      setupMode: false,
    });
  });

  it('applySetup handles invalid FEN gracefully', () => {
    const { result } = setup('invalid fen');
    act(() => result.current.applySetup());
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SETUP_MODE',
      setupMode: false,
    });
  });
});
