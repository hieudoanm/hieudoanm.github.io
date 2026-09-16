import { fireEvent, render, screen } from '@testing-library/react';
import { MythVsFact } from '../index';

jest.mock('../constants', () => {
  const actual = jest.requireActual('../constants');
  return {
    ...actual,
    ITEMS: [
      {
        category: 'History',
        myth: 'Claim A is false',
        fact: 'Claim A is true',
        isTrue: false,
      },
      {
        category: 'History',
        myth: 'Claim B is true',
        fact: 'Claim B is actually true',
        isTrue: true,
      },
      {
        category: 'History',
        myth: 'Claim C is false',
        fact: 'Claim C is true',
        isTrue: false,
      },
    ],
    ROUNDS: 2,
  };
});

const getContainer = () =>
  document.querySelector('[tabindex="0"]') as HTMLElement;

const playRound = (guess: 'Myth' | 'Fact') => {
  fireEvent.click(screen.getByRole('button', { name: guess }));
};

const nextRound = () => {
  fireEvent.keyDown(getContainer(), { key: 'Enter' });
};

const goToResults = () => {
  fireEvent.click(screen.getByRole('button', { name: /See Results|Next/ }));
};

describe('MythVsFact', () => {
  it('renders the playing phase with myth and fact buttons', () => {
    render(<MythVsFact />);
    expect(screen.getByRole('button', { name: 'Myth' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fact' })).toBeInTheDocument();
    expect(screen.getByText(/Round/)).toBeInTheDocument();
  });

  it('transitions to reveal phase on button click', () => {
    render(<MythVsFact />);
    playRound('Myth');
    expect(screen.getByText(/Correct|Wrong/)).toBeInTheDocument();
  });

  it('advances to next round on Enter key', () => {
    render(<MythVsFact />);
    playRound('Myth');
    nextRound();
    expect(screen.getByRole('button', { name: 'Myth' })).toBeInTheDocument();
  });

  it('shows results after all rounds', () => {
    render(<MythVsFact />);
    playRound('Myth');
    nextRound();
    playRound('Fact');
    goToResults();
    expect(screen.getByText(/correct/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('resets on R key', () => {
    render(<MythVsFact />);
    playRound('Myth');
    fireEvent.keyDown(getContainer(), { key: 'r' });
    expect(screen.getByRole('button', { name: 'Myth' })).toBeInTheDocument();
  });

  it('ignores guess clicks during reveal phase', () => {
    render(<MythVsFact />);
    playRound('Myth');
    expect(screen.getByText(/Correct|Wrong/)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Myth' })
    ).not.toBeInTheDocument();
  });

  it('resets via Play Again button', () => {
    render(<MythVsFact />);
    playRound('Myth');
    nextRound();
    playRound('Fact');
    goToResults();
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByRole('button', { name: 'Myth' })).toBeInTheDocument();
  });
});
