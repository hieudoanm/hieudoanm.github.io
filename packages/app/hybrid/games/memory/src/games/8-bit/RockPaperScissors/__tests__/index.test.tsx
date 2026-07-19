import { render, fireEvent, screen } from '@testing-library/react';
import { RockPaperScissors } from '../index';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('RockPaperScissors', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders score, streak, and choice buttons', () => {
    render(<RockPaperScissors />);
    expect(screen.getByText(/SCORE/)).toBeInTheDocument();
    expect(screen.getByText(/STREAK/)).toBeInTheDocument();
    expect(screen.getAllByText('ROCK').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('PAPER').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('SCISSORS').length).toBeGreaterThanOrEqual(1);
  });

  it('shows result after picking a choice', () => {
    render(<RockPaperScissors />);
    const rockBtns = screen.getAllByText('ROCK');
    fireEvent.click(rockBtns[rockBtns.length - 1]);
    expect(screen.getByText('DRAW!')).toBeInTheDocument();
  });

  it('resets the game', () => {
    render(<RockPaperScissors />);
    const rockBtns = screen.getAllByText('ROCK');
    fireEvent.click(rockBtns[rockBtns.length - 1]);
    fireEvent.click(screen.getByText('RESET'));
    expect(screen.queryByText('DRAW!')).not.toBeInTheDocument();
  });

  it('responds to keyboard input 1 for rock', () => {
    const { container } = render(<RockPaperScissors />);
    const focusable = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(focusable, { key: '1' });
    expect(screen.getByText('DRAW!')).toBeInTheDocument();
  });

  it('keyboard r resets', () => {
    const { container } = render(<RockPaperScissors />);
    const focusable = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(focusable, { key: '1' });
    fireEvent.keyDown(focusable, { key: 'r' });
    expect(screen.queryByText('DRAW!')).not.toBeInTheDocument();
  });

  it('increments score on win', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.9);
    render(<RockPaperScissors />);
    const rockBtns = screen.getAllByText('ROCK');
    fireEvent.click(rockBtns[rockBtns.length - 1]);
    expect(screen.getByText(/1 \/ 1/)).toBeInTheDocument();
  });

  it('tracks streak', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.9);
    render(<RockPaperScissors />);
    const rockBtns = screen.getAllByText('ROCK');
    fireEvent.click(rockBtns[rockBtns.length - 1]);
    fireEvent.click(rockBtns[rockBtns.length - 1]);
    expect(screen.getByText(/STREAK/)).toBeInTheDocument();
  });
});
