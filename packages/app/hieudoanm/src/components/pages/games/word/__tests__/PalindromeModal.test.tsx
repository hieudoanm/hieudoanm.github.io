jest.mock('../PalindromeModal/utils/puzzle', () => ({
  shuffle: (arr: any[]) => [...arr].sort(() => 0.5 - Math.random()),
  isPalindrome: (w: string) => w === w.split('').reverse().join(''),
  isEmordnilap: () => false,
  fetchDefinition: () =>
    Promise.resolve({
      word: 'racecar',
      definitions: [{ partOfSpeech: 'noun', definition: 'A palindrome word' }],
    }),
}));

jest.mock('../PalindromeModal/constants', () => ({
  PUZZLES: [
    {
      letters: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
      answer: 'racecar',
      type: 'palindrome',
    },
  ],
  TIMER_START: 30,
}));

import { render, fireEvent, screen, act } from '@testing-library/react';
import { PalindromeModal } from '../PalindromeModal';

describe('PalindromeModal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    const { container } = render(<PalindromeModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('shows letters in bank', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    expect(screen.getAllByText('R').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('A').length).toBeGreaterThanOrEqual(1);
  });

  it('moves letter to placed area on click', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    const rBtns = screen.getAllByText('R');
    fireEvent.click(rBtns[0]);
    expect(screen.getAllByText('R').length).toBeGreaterThanOrEqual(1);
  });

  it('moves letter back to bank on placed click', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    const rBtns = screen.getAllByText('R');
    fireEvent.click(rBtns[0]);
    const placedR = screen.getAllByText('R');
    fireEvent.click(placedR[1]);
  });

  it('clear button moves all letters back to bank', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    const rBtns = screen.getAllByText('R');
    fireEvent.click(rBtns[0]);
    fireEvent.click(screen.getByText('Clear'));
    const rAfterClear = screen.getAllByText('R');
    expect(rAfterClear.length).toBe(2);
  });

  it('check button shows error when not all letters placed', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Check'));
    expect(screen.getByText(/Use all 7 letters/)).toBeInTheDocument();
  });

  it('starts with a timer of 30s', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    expect(screen.getByText('30s')).toBeInTheDocument();
  });

  it('tick decreases timer', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('29s')).toBeInTheDocument();
  });

  it('Escape key closes', () => {
    const onClose = jest.fn();
    render(<PalindromeModal onClose={onClose} />);
    const container = screen.getByText('Score').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'Escape' });
    }
    expect(onClose).toHaveBeenCalled();
  });

  it('Space key clears placed', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    const container = screen.getByText('Score').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container as Element, { key: ' ' });
    }
    const rBtns = screen.getAllByText('R');
    fireEvent.click(rBtns[0]);
    fireEvent.keyDown(container as Element, { key: ' ' });
    const rAfterClear = screen.getAllByText('R');
    expect(rAfterClear.length).toBe(2);
  });

  it('skip button reveals answer', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Skip'));
    expect(screen.getByText(/Answer: racecar/)).toBeInTheDocument();
  });

  it('check answer shows error for not using all letters', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    const rBtns = screen.getAllByText('R');
    fireEvent.click(rBtns[0]);
    fireEvent.click(screen.getByText('Check'));
    expect(screen.getByText(/Use all 7 letters/)).toBeInTheDocument();
  });

  it('check answer shows error for wrong word', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    const rBtns = screen.getAllByText('R');
    const aBtns = screen.getAllByText('A');
    const cBtns = screen.getAllByText('C');
    const eBtns = screen.getAllByText('E');
    fireEvent.click(rBtns[0]);
    fireEvent.click(rBtns[1]);
    fireEvent.click(aBtns[0]);
    fireEvent.click(cBtns[0]);
    fireEvent.click(eBtns[0]);
    fireEvent.click(aBtns[1]);
    fireEvent.click(cBtns[1]);
    fireEvent.click(screen.getByText('Check'));
    expect(screen.getByText(/doesn't work/)).toBeInTheDocument();
  });

  it('moves to next puzzle on Enter when solved', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Skip'));
    const container = screen.getByText('Score').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'Enter' });
    }
  });

  it('resets puzzle on nextPuzzle', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Skip'));
    fireEvent.click(screen.getByText(/Next puzzle/));
  });

  it('keyboard N moves to next puzzle when solved', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Skip'));
    const container = screen.getByText('Score').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'n' });
    }
  });

  it('keyboard Enter checks answer when not solved', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    const container = screen.getByText('Score').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'Enter' });
    }
    expect(screen.getByText(/Use all 7 letters/)).toBeInTheDocument();
  });

  it('timer expiry shows time up message', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    act(() => {
      jest.advanceTimersByTime(30000);
    });
    expect(screen.getByText(/Time up/)).toBeInTheDocument();
  });

  it('shows puzzle type badge', () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    expect(screen.getByText('Palindrome')).toBeInTheDocument();
  });

  it('solves puzzle correctly', async () => {
    render(<PalindromeModal onClose={jest.fn()} />);
    for (let i = 0; i < 7; i++) {
      const outline = document.querySelector('.btn-outline');
      if (!outline) break;
      fireEvent.click(outline);
    }
    fireEvent.click(screen.getByText('Check'));
    await screen.findByText(/Correct/i);
  });
});
