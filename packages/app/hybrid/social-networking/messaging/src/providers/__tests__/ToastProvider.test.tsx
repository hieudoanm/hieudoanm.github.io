import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from '@/providers/ToastProvider';

jest.useFakeTimers();

const Harness = () => {
  const { toasts, showToast, dismissToast } = useToast();
  return (
    <div>
      <button type="button" onClick={() => showToast('Hello', 'success')}>
        Show
      </button>
      <ul>
        {toasts.map((toast) => (
          <li key={toast.id}>
            {toast.message}
            <button type="button" onClick={() => dismissToast(toast.id)}>
              Dismiss
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const setup = () =>
  render(
    <ToastProvider>
      <Harness />
    </ToastProvider>
  );

describe('ToastProvider', () => {
  it('throws when used outside its provider', () => {
    const originalError = console.error;
    console.error = jest.fn();
    expect(() => render(<Harness />)).toThrow(
      'useToast must be used within ToastProvider'
    );
    console.error = originalError;
  });

  it('adds a toast when shown', () => {
    setup();
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('dismisses a toast on demand', () => {
    setup();
    fireEvent.click(screen.getByText('Show'));
    fireEvent.click(screen.getByText('Dismiss'));
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('auto-dismisses toasts after three seconds', () => {
    setup();
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('Hello')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });
});
