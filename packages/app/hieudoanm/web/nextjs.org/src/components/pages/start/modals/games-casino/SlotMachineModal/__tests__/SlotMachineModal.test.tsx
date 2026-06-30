import { act, render, fireEvent, screen } from '@testing-library/react';
import { SlotMachineModal } from '../';

const spinAndAdvance = () => {
  fireEvent.click(screen.getByText('Spin'));
  act(() => {
    jest.advanceTimersByTime(1000);
  });
};

describe('SlotMachineModal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<SlotMachineModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('shows credits display', () => {
    render(<SlotMachineModal onClose={jest.fn()} />);
    expect(screen.getByText(/Credits:/)).toBeInTheDocument();
  });

  it('shows bet amount', () => {
    render(<SlotMachineModal onClose={jest.fn()} />);
    expect(screen.getByText(/Bet: 10/)).toBeInTheDocument();
  });

  it('Spin button is enabled initially', () => {
    render(<SlotMachineModal onClose={jest.fn()} />);
    expect(screen.getByText('Spin')).not.toBeDisabled();
  });

  it('shows three reels', () => {
    const { container } = render(<SlotMachineModal onClose={jest.fn()} />);
    const reels = container.querySelectorAll('.text-4xl');
    expect(reels.length).toBe(3);
  });

  it('deducts credits on spin', () => {
    render(<SlotMachineModal onClose={jest.fn()} />);
    spinAndAdvance();
    expect(screen.getByText(/190/)).toBeInTheDocument();
  });

  it('shows result message after spin', () => {
    render(<SlotMachineModal onClose={jest.fn()} />);
    spinAndAdvance();
    expect(screen.getByText(/You won|No luck/)).toBeInTheDocument();
  });

  it('shows win amount when winning', () => {
    render(<SlotMachineModal onClose={jest.fn()} />);
    spinAndAdvance();
    expect(screen.getByText(/You won 100/)).toBeInTheDocument();
  });

  it('Space key triggers spin', () => {
    render(<SlotMachineModal onClose={jest.fn()} />);
    const container = screen.getByText('Slot Machine').closest('div');
    if (container) {
      fireEvent.keyDown(container, { key: ' ' });
    }
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/You won|No luck/)).toBeInTheDocument();
  });

  it('shows Reset Credits button', () => {
    render(<SlotMachineModal onClose={jest.fn()} />);
    expect(screen.getByText('Reset Credits')).toBeInTheDocument();
  });

  it('Reset Credits restores credits', () => {
    render(<SlotMachineModal onClose={jest.fn()} />);
    spinAndAdvance();
    fireEvent.click(screen.getByText('Reset Credits'));
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });
});
