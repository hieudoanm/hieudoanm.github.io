import { act, render, fireEvent, screen } from '@testing-library/react';
import { DiceGameModal } from '../DiceGameModal';

const rollAndAdvance = () => {
  fireEvent.click(screen.getByText('Roll Dice'));
  act(() => {
    jest.advanceTimersByTime(600);
  });
};

describe('DiceGameModal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<DiceGameModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('shows bet buttons', () => {
    render(<DiceGameModal onClose={jest.fn()} />);
    expect(screen.getByText('Under 7')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('Over 7')).toBeInTheDocument();
  });

  it('Roll Dice is disabled when no bet selected', () => {
    render(<DiceGameModal onClose={jest.fn()} />);
    expect(screen.getByText('Roll Dice')).toBeDisabled();
  });

  it('Roll Dice becomes enabled after selecting a bet', () => {
    render(<DiceGameModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Under 7'));
    expect(screen.getByText('Roll Dice')).not.toBeDisabled();
  });

  it('shows credits display', () => {
    render(<DiceGameModal onClose={jest.fn()} />);
    expect(screen.getByText(/Credits:/)).toBeInTheDocument();
  });

  it('shows bet amount', () => {
    render(<DiceGameModal onClose={jest.fn()} />);
    expect(screen.getByText(/Bet: 10/)).toBeInTheDocument();
  });

  it('clicking a bet highlights it', () => {
    render(<DiceGameModal onClose={jest.fn()} />);
    const btn = screen.getByRole('button', { name: /Under 7/ });
    fireEvent.click(btn);
    expect(btn.classList.contains('btn-primary')).toBe(true);
  });

  it('deducts credits on roll', () => {
    render(<DiceGameModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Over 7'));
    rollAndAdvance();
    expect(screen.getByText(/210/)).toBeInTheDocument();
  });

  it('shows win message when bet wins', () => {
    render(<DiceGameModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Over 7'));
    rollAndAdvance();
    expect(screen.getByText(/You win/)).toBeInTheDocument();
  });

  it('shows Next Round after rolling', () => {
    render(<DiceGameModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Under 7'));
    rollAndAdvance();
    expect(screen.getByText('Next Round')).toBeInTheDocument();
  });

  it('Next Round resets to bet phase', () => {
    render(<DiceGameModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Under 7'));
    rollAndAdvance();
    fireEvent.click(screen.getByText('Next Round'));
    expect(screen.getByText('Place your bet:')).toBeInTheDocument();
  });

  it('shows total after rolling', () => {
    render(<DiceGameModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Under 7'));
    rollAndAdvance();
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
  });
});
