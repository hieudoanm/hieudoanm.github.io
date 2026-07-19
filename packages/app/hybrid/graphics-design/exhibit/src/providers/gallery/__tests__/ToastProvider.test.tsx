import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from '@/providers/gallery/ToastProvider';

const Probe = () => {
  const { toasts, addToast, removeToast } = useToast();
  return (
    <div>
      <span data-testid="count">{toasts.length}</span>
      <ul>
        {toasts.map((t) => (
          <li key={t.id} data-testid={`toast-${t.id}`}>
            {t.message}:{t.type}
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => addToast('Saved')}>
        Default
      </button>
      <button type="button" onClick={() => addToast('Failed', 'error')}>
        Error
      </button>
      <button
        type="button"
        onClick={() => toasts[0] && removeToast(toasts[0].id)}>
        Remove First
      </button>
    </div>
  );
};

describe('ToastProvider', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('throws when useToast is used outside the provider', () => {
    expect(() => render(<Probe />)).toThrow(
      'useToast must be used within ToastProvider'
    );
  });

  it('adds toasts with default and explicit types', () => {
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Default' }));
    expect(screen.getByText('Saved:info')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Error' }));
    expect(screen.getByText('Failed:error')).toBeInTheDocument();
    expect(screen.getByTestId('count')).toHaveTextContent('2');
  });

  it('removes a toast', () => {
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Default' }));
    fireEvent.click(screen.getByRole('button', { name: 'Remove First' }));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('auto-dismisses a toast after its lifetime', () => {
    jest.useFakeTimers();
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Default' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });
});
