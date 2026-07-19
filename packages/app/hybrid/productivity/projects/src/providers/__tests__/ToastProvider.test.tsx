import { render, screen, act, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { ToastProvider, useToast } from '@/providers/ToastProvider';

const Trigger = ({ message, type }: { message: string; type?: string }) => {
  const { addToast } = useToast();
  return (
    <button
      onClick={() => addToast(message, type as 'success' | 'error' | 'info')}>
      add
    </button>
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
        <Trigger message="Board created" type="success" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByText('Board created')).toBeInTheDocument();
  });

  it('renders an error toast', () => {
    render(
      <ToastProvider>
        <Trigger message="Failed" type="error" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('defaults to info when no type is given', () => {
    render(
      <ToastProvider>
        <Trigger message="Heads up" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByText('Heads up')).toBeInTheDocument();
  });

  it('auto-dismisses toasts after 3 seconds', () => {
    jest.useFakeTimers();
    render(
      <ToastProvider>
        <Trigger message="Gone soon" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByText('Gone soon')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Gone soon')).not.toBeInTheDocument();
  });
});
