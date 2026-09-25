import { fireEvent, render, screen } from '@testing-library/react';
import { CommitmentDevice } from '../index';
import { TOTAL_DAYS } from '../constants';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    tempted: (_r: number, save: number, commitment: boolean) =>
      commitment ? save : Math.max(0, save - 10),
    compound: (s: number, save: number) => Math.round(s * 1.1 + save),
    consumptionUtility: (c: number) => Math.round(Math.sqrt(c) * 100) / 100,
  };
});

const clickSave = (value?: number): void => {
  if (value !== undefined) {
    fireEvent.click(screen.getByTestId(`quick-save-${value}`));
  }
  fireEvent.click(screen.getByRole('button', { name: 'Save & Consume' }));
};

describe('CommitmentDevice', () => {
  it('shows the setup screen with a toggle', () => {
    render(<CommitmentDevice />);
    expect(
      screen.getByText(/Choose your savings strategy/)
    ).toBeInTheDocument();
    expect(screen.getByTestId('toggle-commitment')).toBeInTheDocument();
    expect(screen.getByTestId('start-game')).toBeInTheDocument();
  });

  it('toggles the commitment device', () => {
    render(<CommitmentDevice />);
    const btn = screen.getByTestId('toggle-commitment');
    expect(btn).toHaveTextContent('OFF');
    fireEvent.click(btn);
    expect(btn).toHaveTextContent('ON');
  });

  it('starts the game and shows the choose screen', () => {
    render(<CommitmentDevice />);
    fireEvent.click(screen.getByTestId('start-game'));
    expect(screen.getByText(/Day/)).toBeInTheDocument();
    expect(screen.getByTestId('save-slider')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save & Consume' })
    ).toBeInTheDocument();
  });

  it('plays a day and shows the reveal', () => {
    render(<CommitmentDevice />);
    fireEvent.click(screen.getByTestId('start-game'));
    clickSave(10);
    expect(screen.getByText(/Intended save/)).toBeInTheDocument();
    expect(screen.getByText(/Actually saved/)).toBeInTheDocument();
    expect(screen.getByText(/New savings balance/)).toBeInTheDocument();
  });

  it('advances through all days to results', () => {
    render(<CommitmentDevice />);
    fireEvent.click(screen.getByTestId('start-game'));
    for (let day = 0; day < TOTAL_DAYS; day++) {
      clickSave(10);
      const btn = screen.getByRole('button', { name: /Next Day|See Results/ });
      fireEvent.click(btn);
    }
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('shows the lesson in the results', () => {
    render(<CommitmentDevice />);
    fireEvent.click(screen.getByTestId('start-game'));
    for (let day = 0; day < TOTAL_DAYS; day++) {
      clickSave(10);
      fireEvent.click(
        screen.getByRole('button', { name: /Next Day|See Results/ })
      );
    }
    expect(screen.getByText(/Without a commitment device/)).toBeInTheDocument();
  });

  it('resets after Play Again', () => {
    render(<CommitmentDevice />);
    fireEvent.click(screen.getByTestId('start-game'));
    for (let day = 0; day < TOTAL_DAYS; day++) {
      clickSave(10);
      fireEvent.click(
        screen.getByRole('button', { name: /Next Day|See Results/ })
      );
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(
      screen.getByText(/Choose your savings strategy/)
    ).toBeInTheDocument();
  });

  it('uses quick-save buttons to set the save amount', () => {
    render(<CommitmentDevice />);
    fireEvent.click(screen.getByTestId('start-game'));
    fireEvent.click(screen.getByTestId('quick-save-20'));
    fireEvent.click(screen.getByRole('button', { name: 'Save & Consume' }));
    expect(screen.getByText(/Intended save/)).toBeInTheDocument();
  });
});
