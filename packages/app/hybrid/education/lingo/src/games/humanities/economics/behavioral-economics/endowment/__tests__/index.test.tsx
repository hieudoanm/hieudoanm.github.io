import { fireEvent, render, screen } from '@testing-library/react';
import { TOTAL_ROUNDS } from '../constants';
import { EndowmentGame } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  const { ITEMS } = jest.requireActual('../constants');
  return {
    ...actual,
    nextItem: () => ITEMS[0],
  };
});

const playRound = (wta: string, wtp: string) => {
  fireEvent.change(screen.getByTestId('wta-slider'), {
    target: { value: wta },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Submit WTA' }));
  fireEvent.change(screen.getByTestId('wtp-slider'), {
    target: { value: wtp },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Submit WTP' }));
  fireEvent.click(
    screen.getByRole('button', { name: /Next Round|See Results/ })
  );
};

describe('EndowmentGame', () => {
  it('shows the WTA prompt for the first item', () => {
    render(<EndowmentGame />);
    expect(
      screen.getByText((_, node) => node?.textContent === 'Round 1 / 4')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/minimum price you'd accept to sell it/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Submit WTA' })
    ).toBeInTheDocument();
  });

  it('shows the WTP prompt after submitting the WTA', () => {
    render(<EndowmentGame />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit WTA' }));
    expect(screen.getByText(/maximum price you'd pay/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Submit WTP' })
    ).toBeInTheDocument();
  });

  it('reveals WTA, WTP and the gap', () => {
    render(<EndowmentGame />);
    fireEvent.change(screen.getByTestId('wta-slider'), {
      target: { value: '8' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit WTA' }));
    fireEvent.change(screen.getByTestId('wtp-slider'), {
      target: { value: '5' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit WTP' }));
    expect(screen.getByText(/endowment effect/i)).toBeInTheDocument();
    expect(screen.getByText('Gap:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('reaches the results screen after all rounds', () => {
    render(<EndowmentGame />);
    for (let round = 0; round < TOTAL_ROUNDS; round++) {
      playRound('7', '3');
    }
    expect(screen.getByText('Endowment effect results')).toBeInTheDocument();
    expect(screen.getByText(/Avg WTA:/)).toBeInTheDocument();
    expect(screen.getByText(/Avg gap:/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the results screen', () => {
    render(<EndowmentGame />);
    for (let round = 0; round < TOTAL_ROUNDS; round++) {
      playRound('7', '3');
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(
      screen.getByText((_, node) => node?.textContent === 'Round 1 / 4')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/minimum price you'd accept to sell it/i)
    ).toBeInTheDocument();
  });
});
