import { render, screen, fireEvent } from '@testing-library/react';
import { ToastContainer } from '../ToastContainer';

jest.mock('@/providers/ToastProvider', () => ({
  useToast: jest.fn(),
}));

const { useToast } = jest.requireMock('@/providers/ToastProvider');

describe('ToastContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when there are no toasts', () => {
    useToast.mockReturnValue({ toasts: [], removeToast: jest.fn() });
    render(<ToastContainer />);
    expect(screen.queryByText(/./)).toBeNull();
  });

  it('renders toasts of each type', () => {
    useToast.mockReturnValue({
      toasts: [
        { id: '1', message: 'Saved', type: 'success' },
        { id: '2', message: 'Failed', type: 'error' },
        { id: '3', message: 'Info', type: 'info' },
      ],
      removeToast: jest.fn(),
    });
    render(<ToastContainer />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('removes a toast on close click', () => {
    const removeToast = jest.fn();
    useToast.mockReturnValue({
      toasts: [{ id: '1', message: 'Saved', type: 'success' }],
      removeToast,
    });
    render(<ToastContainer />);
    fireEvent.click(screen.getByRole('button'));
    expect(removeToast).toHaveBeenCalledWith('1');
  });
});
