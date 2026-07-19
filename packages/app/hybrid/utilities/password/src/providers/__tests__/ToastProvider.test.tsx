import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from '@/providers/ToastProvider';

const Probe = ({ type }: { type?: 'success' | 'error' | 'info' }) => {
  const { addToast, removeToast, toasts } = useToast();
  return (
    <div>
      <button type="button" onClick={() => addToast('Hello world', type)}>
        Add
      </button>
      <button type="button" onClick={() => removeToast(toasts[0]?.id ?? '')}>
        Remove
      </button>
      <span data-testid="count">{toasts.length}</span>
      {toasts.map((t) => (
        <div key={t.id}>{t.message}</div>
      ))}
    </div>
  );
};

describe('ToastProvider', () => {
  it('throws when useToast is used outside the provider', () => {
    expect(() => render(<Probe />)).toThrow(
      'useToast must be used within ToastProvider'
    );
  });

  it('adds a toast with info type by default', () => {
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Hello world')).toBeInTheDocument();
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('adds a toast with the provided type', () => {
    render(
      <ToastProvider>
        <Probe type="success" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('removes a toast by id', () => {
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(screen.queryByText('Hello world')).not.toBeInTheDocument();
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('auto-dismisses toasts after 3 seconds', () => {
    jest.useFakeTimers();
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Hello world')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Hello world')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
