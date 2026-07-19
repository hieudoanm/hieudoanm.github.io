import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from '@/providers/ToastProvider';
import { ToastContainer } from '@/components/organisms/ToastContainer';

jest.mock('react-icons/fi', () => ({
  FiCheckCircle: () => <span data-testid="icon-success" />,
  FiAlertCircle: () => <span data-testid="icon-error" />,
  FiInfo: () => <span data-testid="icon-info" />,
  FiX: () => <span data-testid="icon-x" />,
}));

const Trigger = () => {
  const { addToast } = useToast();
  return (
    <>
      <button onClick={() => addToast('Saved!', 'success')}>success</button>
      <button onClick={() => addToast('Failed!', 'error')}>error</button>
      <button onClick={() => addToast('Heads up')}>info</button>
    </>
  );
};

const renderApp = () =>
  render(
    <ToastProvider>
      <Trigger />
      <ToastContainer />
    </ToastProvider>
  );

describe('ToastProvider + ToastContainer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders no toasts initially', () => {
    renderApp();
    expect(screen.queryByText('Saved!')).not.toBeInTheDocument();
  });

  it('adds a success toast', () => {
    renderApp();
    fireEvent.click(screen.getByText('success'));
    expect(screen.getByText('Saved!')).toBeInTheDocument();
    expect(screen.getByTestId('icon-success')).toBeInTheDocument();
  });

  it('adds an error toast', () => {
    renderApp();
    fireEvent.click(screen.getByText('error'));
    expect(screen.getByText('Failed!')).toBeInTheDocument();
    expect(screen.getByTestId('icon-error')).toBeInTheDocument();
  });

  it('defaults toast type to info', () => {
    renderApp();
    fireEvent.click(screen.getByText('info'));
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByTestId('icon-info')).toBeInTheDocument();
  });

  it('removes a toast via its close button', () => {
    renderApp();
    fireEvent.click(screen.getByText('success'));
    const close = screen
      .getByText('Saved!')
      .closest('div')!
      .querySelector('button')!;
    fireEvent.click(close);
    expect(screen.queryByText('Saved!')).not.toBeInTheDocument();
  });

  it('auto-dismisses toasts after 3 seconds', () => {
    renderApp();
    fireEvent.click(screen.getByText('success'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Saved!')).not.toBeInTheDocument();
  });

  it('throws when used outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ToastContainer />)).toThrow(
      'useToast must be used within ToastProvider'
    );
    spy.mockRestore();
  });
});
