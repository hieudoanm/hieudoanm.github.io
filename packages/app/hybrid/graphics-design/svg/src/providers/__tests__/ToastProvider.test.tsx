import { render, screen, act, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { ToastProvider, useToast } from '@/providers/ToastProvider';

const Consumer = () => {
  const { toasts, addToast, removeToast } = useToast();
  return (
    <div>
      <button onClick={() => addToast('Document saved', 'success')}>
        add-success
      </button>
      <button onClick={() => addToast('Failed', 'error')}>add-error</button>
      <button onClick={() => addToast('Heads up')}>add-info</button>
      <button onClick={() => toasts[0] && removeToast(toasts[0].id)}>
        remove-first
      </button>
      {toasts.map((t) => (
        <span key={t.id} data-testid={`toast-${t.type}`}>
          {t.message}
        </span>
      ))}
    </div>
  );
};

describe('ToastProvider', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('throws outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useToast())).toThrow(
      'useToast must be used within ToastProvider'
    );
    spy.mockRestore();
  });

  it('renders a success toast', () => {
    render(
      <ToastProvider>
        <Consumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('add-success'));
    expect(screen.getByText('Document saved')).toBeInTheDocument();
  });

  it('renders an error toast', () => {
    render(
      <ToastProvider>
        <Consumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('add-error'));
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('defaults to info when no type is given', () => {
    render(
      <ToastProvider>
        <Consumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('add-info'));
    expect(screen.getByText('Heads up')).toBeInTheDocument();
  });

  it('removes a toast via removeToast', () => {
    render(
      <ToastProvider>
        <Consumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('add-success'));
    expect(screen.getByText('Document saved')).toBeInTheDocument();
    fireEvent.click(screen.getByText('remove-first'));
    expect(screen.queryByText('Document saved')).not.toBeInTheDocument();
  });

  it('auto-dismisses toasts after 3 seconds', () => {
    jest.useFakeTimers();
    render(
      <ToastProvider>
        <Consumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('add-info'));
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Heads up')).not.toBeInTheDocument();
  });
});
