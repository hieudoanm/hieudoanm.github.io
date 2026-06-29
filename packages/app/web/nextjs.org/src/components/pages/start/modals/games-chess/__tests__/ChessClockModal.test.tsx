import { render, fireEvent, screen, act } from '@testing-library/react';
import { ChessClockModal } from '../ChessClockModal';

describe('ChessClockModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Date, 'now').mockReturnValue(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  const getSideButton = (label: string) =>
    screen
      .getAllByRole('button')
      .find(
        (b) =>
          b.textContent?.includes(label) &&
          !b.textContent?.includes('Reset') &&
          !b.textContent?.includes('Undo')
      );

  it('renders modal title', () => {
    render(<ChessClockModal onClose={onClose} />);
    expect(screen.getByText('Chess Clock')).toBeInTheDocument();
  });

  it('renders all preset buttons', () => {
    render(<ChessClockModal onClose={onClose} />);
    expect(screen.getByText('Classic')).toBeInTheDocument();
    expect(screen.getByText('Rapid')).toBeInTheDocument();
    expect(screen.getByText('Blitz')).toBeInTheDocument();
    expect(screen.getByText('Fischer')).toBeInTheDocument();
    expect(screen.getByText('Bronstein')).toBeInTheDocument();
  });

  it('renders side buttons in preview mode', () => {
    render(<ChessClockModal onClose={onClose} />);
    expect(getSideButton('White')).toBeTruthy();
    expect(getSideButton('Black')).toBeTruthy();
  });

  it('renders reset and undo buttons', () => {
    render(<ChessClockModal onClose={onClose} />);
    expect(screen.getByText(/Reset/)).toBeInTheDocument();
    expect(screen.getByText(/Undo/)).toBeInTheDocument();
  });

  it('undo button is disabled when no history', () => {
    render(<ChessClockModal onClose={onClose} />);
    const undo = screen.getByText(/Undo/).closest('button');
    expect(undo).toBeDisabled();
  });

  it('applies preset on click', () => {
    render(<ChessClockModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Rapid'));
    const rapidBtn = screen.getByText('Rapid').closest('button');
    expect(rapidBtn).toHaveClass('btn-primary');
    expect(screen.getByText('Classic').closest('button')).not.toHaveClass(
      'btn-primary'
    );
  });

  it('toggles edit mode on gear click', () => {
    render(<ChessClockModal onClose={onClose} />);
    const gear = screen
      .getAllByRole('button')
      .find((b) => b.innerHTML.includes('svg'));
    if (gear) fireEvent.click(gear);
    expect(screen.getByText('Minutes:')).toBeInTheDocument();
    expect(screen.getByText('Increment:')).toBeInTheDocument();
  });

  it('applies custom preset via edit mode', () => {
    render(<ChessClockModal onClose={onClose} />);
    const gear = screen
      .getAllByRole('button')
      .find((b) => b.innerHTML.includes('svg'));
    if (gear) fireEvent.click(gear);
    const minuteInput = screen.getByDisplayValue('10');
    fireEvent.change(minuteInput, { target: { value: '5' } });
    const incInputs = screen.getAllByRole('spinbutton');
    const incInput = incInputs.find((i) => Number(i.getAttribute('min')) === 0);
    if (incInput) fireEvent.change(incInput, { target: { value: '5' } });
    fireEvent.click(screen.getByText('Set'));
    expect(screen.queryByText('Minutes:')).not.toBeInTheDocument();
  });

  it('starts game when a side is pressed in preview mode', () => {
    render(<ChessClockModal onClose={onClose} />);
    const btn = getSideButton('White');
    if (btn) fireEvent.click(btn);
    const moves = screen.getAllByText(/moves/);
    expect(moves.length).toBe(2);
  });

  it('shows elapsed time when running', () => {
    render(<ChessClockModal onClose={onClose} />);
    const btn = getSideButton('White');
    if (btn) fireEvent.click(btn);
    expect(screen.getByText(/Elapsed/)).toBeInTheDocument();
  });

  it('resets to preview on reset click', () => {
    render(<ChessClockModal onClose={onClose} />);
    const btn = getSideButton('White');
    if (btn) fireEvent.click(btn);
    fireEvent.click(screen.getByText(/Reset/));
    const undo = screen.getByText(/Undo/).closest('button');
    expect(undo).toBeDisabled();
  });

  it('switches sides on second press during running', () => {
    render(<ChessClockModal onClose={onClose} />);
    const whiteBtn = getSideButton('White');
    if (whiteBtn) fireEvent.click(whiteBtn);
    const blackBtn = getSideButton('Black');
    if (blackBtn) fireEvent.click(blackBtn);
    expect(screen.getByText(/Elapsed/)).toBeInTheDocument();
  });

  it('undo after game start resets to preview', () => {
    render(<ChessClockModal onClose={onClose} />);
    const whiteBtn = getSideButton('White');
    if (whiteBtn) fireEvent.click(whiteBtn);
    fireEvent.click(screen.getByText(/Undo/));
    const undo = screen.getByText(/Undo/).closest('button');
    expect(undo).toBeDisabled();
  });

  it('timer tick updates display', () => {
    render(<ChessClockModal onClose={onClose} />);
    const btn = getSideButton('White');
    if (btn) fireEvent.click(btn);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/Elapsed/)).toBeInTheDocument();
  });
});
