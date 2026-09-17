import { render, screen, act, fireEvent } from '@testing-library/react';
import { ToastProvider, useToast } from '../ToastProvider';

function TestComponent() {
  const { showToast } = useToast();
  return (
    <div>
      <button onClick={() => showToast('Success!', 'success')}>Success</button>
      <button onClick={() => showToast('Error!', 'error')}>Error</button>
      <button onClick={() => showToast('Info!')}>Info</button>
    </div>
  );
}

describe('ToastProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders children', () => {
    render(
      <ToastProvider>
        <div>Child content</div>
      </ToastProvider>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('shows a toast when showToast is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    act(() => {
      screen.getByText('Success').click();
    });
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('applies correct alert class for success type', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    act(() => {
      screen.getByText('Success').click();
    });
    const toast = screen.getByText('Success!').closest('.alert');
    expect(toast).toHaveClass('alert-success');
  });

  it('applies correct alert class for error type', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    act(() => {
      screen.getByText('Error').click();
    });
    const toast = screen.getByText('Error!').closest('.alert');
    expect(toast).toHaveClass('alert-error');
  });

  it('defaults to info type', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    act(() => {
      screen.getByText('Info').click();
    });
    const toast = screen.getByText('Info!').closest('.alert');
    expect(toast).toHaveClass('alert-info');
  });

  it('auto-dismisses after 3 seconds', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    act(() => {
      screen.getByText('Success').click();
    });
    expect(screen.getByText('Success!')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
  });

  it('dismisses on click', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    act(() => {
      screen.getByText('Success').click();
    });
    act(() => {
      fireEvent.click(screen.getByText('Success!'));
    });
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
  });
});
