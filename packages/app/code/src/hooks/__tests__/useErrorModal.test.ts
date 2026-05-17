import { renderHook, act } from '@testing-library/react';
import { useErrorModal } from '../useErrorModal';

describe('useErrorModal', () => {
  it('initialises with null error', () => {
    const { result } = renderHook(() => useErrorModal());
    expect(result.current.error).toBeNull();
  });

  it('sets error when showError is called', () => {
    const { result } = renderHook(() => useErrorModal());

    act(() => result.current.showError({ message: 'Something went wrong' }));
    expect(result.current.error).toEqual({ message: 'Something went wrong' });
  });

  it('sets error with detail when showError is called', () => {
    const { result } = renderHook(() => useErrorModal());

    act(() =>
      result.current.showError({
        message: 'Failed',
        detail: 'File not found',
      })
    );
    expect(result.current.error).toEqual({
      message: 'Failed',
      detail: 'File not found',
    });
  });

  it('clears error when hideError is called', () => {
    const { result } = renderHook(() => useErrorModal());

    act(() => result.current.showError({ message: 'Oops' }));
    expect(result.current.error).not.toBeNull();

    act(() => result.current.hideError());
    expect(result.current.error).toBeNull();
  });

  it('overwrites previous error when showError is called again', () => {
    const { result } = renderHook(() => useErrorModal());

    act(() => result.current.showError({ message: 'First error' }));
    act(() => result.current.showError({ message: 'Second error' }));
    expect(result.current.error).toEqual({ message: 'Second error' });
  });
});
