import { render, screen, fireEvent } from '@testing-library/react';
import { Shift } from '@/types/pos';
import { ShiftManager } from '../ShiftManager';

const OPEN_SHIFT: Shift = {
  id: 's1',
  cashierId: 'u1',
  openBalance: 200,
  startedAt: '2026-08-18T08:00:00.000Z',
  status: 'open',
};

const CLOSED_SHIFTS: Shift[] = [
  {
    id: 's2',
    cashierId: 'u1',
    openBalance: 200,
    closeBalance: 350,
    startedAt: '2026-08-17T08:00:00.000Z',
    endedAt: '2026-08-17T18:00:00.000Z',
    status: 'closed',
  },
];

const renderComponent = (
  props: Partial<React.ComponentProps<typeof ShiftManager>> = {}
) => {
  const defaultProps = {
    shifts: [] as Shift[],
    currentShift: null as Shift | null,
    onOpen: jest.fn(),
    onClose: jest.fn(),
    onBack: jest.fn(),
    ...props,
  };
  return { ...render(<ShiftManager {...defaultProps} />), ...defaultProps };
};

describe('ShiftManager', () => {
  it('renders header', () => {
    renderComponent();
    expect(screen.getByText('Shifts')).toBeInTheDocument();
  });

  it('shows open shift form when no active shift', () => {
    renderComponent();
    expect(screen.getByText('Open New Shift')).toBeInTheDocument();
    expect(screen.getByText('Open Shift')).toBeInTheDocument();
  });

  it('calls onOpen with balance when opening shift', () => {
    const { onOpen } = renderComponent();
    fireEvent.change(screen.getByPlaceholderText('Opening balance'), {
      target: { value: '250' },
    });
    fireEvent.click(screen.getByText('Open Shift'));
    expect(onOpen).toHaveBeenCalledWith(250);
  });

  it('shows active shift with close form', () => {
    renderComponent({ currentShift: OPEN_SHIFT });
    expect(screen.getByText('Active Shift')).toBeInTheDocument();
    expect(screen.getByText(/Open Balance/)).toBeInTheDocument();
    expect(screen.getByText('Close Shift')).toBeInTheDocument();
  });

  it('calls onClose with close balance', () => {
    const { onClose } = renderComponent({ currentShift: OPEN_SHIFT });
    fireEvent.change(screen.getByPlaceholderText('Close balance'), {
      target: { value: '350' },
    });
    fireEvent.click(screen.getByText('Close Shift'));
    expect(onClose).toHaveBeenCalledWith(350);
  });

  it('shows shift history', () => {
    renderComponent({ shifts: CLOSED_SHIFTS });
    expect(screen.getByText('Shift History')).toBeInTheDocument();
    expect(screen.getByText(/Open: \$200\.00/)).toBeInTheDocument();
    expect(screen.getByText('closed')).toBeInTheDocument();
  });

  it('calls onBack when back button clicked', () => {
    const { onBack } = renderComponent();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
