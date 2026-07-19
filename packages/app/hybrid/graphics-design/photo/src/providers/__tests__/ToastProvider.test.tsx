import { act, fireEvent, render, screen } from '@testing-library/react';
import { ToastProvider, useToast } from '@/providers/ToastProvider';

const PushButton = ({
  message,
  type,
}: {
  message: string;
  type?: 'success' | 'error' | 'info';
}) => {
  const { addToast } = useToast();
  return <button onClick={() => addToast(message, type)}>push</button>;
};

describe('ToastProvider', () => {
  it('throws when used outside the provider', () => {
    const Broken = () => {
      useToast();
      return null;
    };
    expect(() => render(<Broken />)).toThrow(
      'useToast must be used within ToastProvider'
    );
  });

  it('renders a toast with the default info type', () => {
    render(
      <ToastProvider>
        <PushButton message="Hello" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hello').closest('.alert')).toHaveClass(
      'alert-info'
    );
  });

  it('renders success and error toasts with matching styles', () => {
    render(
      <ToastProvider>
        <PushButton message="Good" type="success" />
        <PushButton message="Bad" type="error" />
      </ToastProvider>
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'push' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'push' })[1]);
    expect(screen.getByText('Good').closest('.alert')).toHaveClass(
      'alert-success'
    );
    expect(screen.getByText('Bad').closest('.alert')).toHaveClass(
      'alert-error'
    );
  });

  it('auto-dismisses toasts after 3 seconds', () => {
    jest.useFakeTimers();
    render(
      <ToastProvider>
        <PushButton message="Temp" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Temp')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Temp')).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it('renders multiple toasts', () => {
    render(
      <ToastProvider>
        <PushButton message="One" />
        <PushButton message="Two" />
      </ToastProvider>
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });
});
