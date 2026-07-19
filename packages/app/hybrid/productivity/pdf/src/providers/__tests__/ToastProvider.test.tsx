import { render, screen, act, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { ToastProvider, useToast } from '@/providers/ToastProvider';
import { ToastContainer } from '@/components/organisms/ToastContainer';

const Trigger = ({ message, type }: { message: string; type?: string }) => {
  const { addToast } = useToast();
  return (
    <button
      onClick={() => addToast(message, type as 'success' | 'error' | 'info')}>
      add
    </button>
  );
};

const renderProvider = (message: string, type?: string) =>
  render(
    <ToastProvider>
      <Trigger message={message} type={type} />
      <ToastContainer />
    </ToastProvider>
  );

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
    renderProvider('Document saved', 'success');
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByText('Document saved')).toBeInTheDocument();
  });

  it('renders an error toast', () => {
    renderProvider('Failed', 'error');
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('defaults to info when no type is given', () => {
    renderProvider('Heads up');
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByText('Heads up')).toBeInTheDocument();
  });

  it('removes a toast when its dismiss button is clicked', () => {
    renderProvider('Dismiss me');
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByText('Dismiss me')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
  });

  it('auto-dismisses toasts after 3 seconds', () => {
    jest.useFakeTimers();
    renderProvider('Gone soon');
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByText('Gone soon')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Gone soon')).not.toBeInTheDocument();
  });
});
