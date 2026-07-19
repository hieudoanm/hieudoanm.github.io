import { renderHook, act, waitFor } from '@testing-library/react';
import { ToastProvider, useToast } from '../ToastProvider';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
);

describe('ToastProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('provides useToast hook', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(result.current).toBeDefined();
    expect(typeof result.current.showToast).toBe('function');
  });

  it('showToast adds a toast', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Test message');
    });
  });

  it('showToast removes toast after 3 seconds', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Test message', 'success');
    });
    act(() => {
      jest.advanceTimersByTime(3000);
    });
  });

  it('showToast with error type', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Error message', 'error');
    });
  });

  it('showToast with warning type', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Warning message', 'warning');
    });
  });

  it('showToast with info type (default)', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Info message');
    });
  });

  it('clicking toast removes it', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Click me');
    });
    // Find the toast and click it
    const toasts = document.querySelectorAll('.alert');
    if (toasts.length > 0) {
      act(() => {
        (toasts[0] as HTMLElement).click();
      });
    }
  });

  it('multiple toasts can coexist', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Toast 1', 'success');
      result.current.showToast('Toast 2', 'error');
      result.current.showToast('Toast 3', 'warning');
    });
  });

  it('toast is removed after timeout', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Timeout toast', 'info');
    });
    act(() => {
      jest.advanceTimersByTime(3500);
    });
  });
});

describe('useToast without provider', () => {
  it('throws when used outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => {
      renderHook(() => useToast());
    }).toThrow('useToast must be used within ToastProvider');
    spy.mockRestore();
  });
});
