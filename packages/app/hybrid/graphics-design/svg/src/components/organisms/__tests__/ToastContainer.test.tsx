import { render, screen, fireEvent } from '@testing-library/react';
import { ToastContainer } from '@/components/organisms/ToastContainer';

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
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders all toast types and dismisses on click', () => {
    const removeToast = jest.fn();
    useToast.mockReturnValue({
      toasts: [
        { id: 't1', message: 'Saved', type: 'success' },
        { id: 't2', message: 'Failed', type: 'error' },
        { id: 't3', message: 'Info', type: 'info' },
      ],
      removeToast,
    });
    render(<ToastContainer />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Saved').nextElementSibling as Element);
    expect(removeToast).toHaveBeenCalledWith('t1');
  });
});
