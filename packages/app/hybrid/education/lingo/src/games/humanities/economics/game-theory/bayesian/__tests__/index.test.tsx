import { fireEvent, render, screen } from '@testing-library/react';
import { MontyHallGame } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    nextPrize: () => 0,
    revealGoat: () => 2,
  };
});

const playTrial = (pickDoor: number, switched: boolean) => {
  fireEvent.click(screen.getByTestId(`door-${pickDoor}`));
  if (switched) {
    fireEvent.click(screen.getByTestId('switch-btn'));
  } else {
    fireEvent.click(screen.getByTestId('stay-btn'));
  }
};

describe('MontyHallGame', () => {
  it('renders the trial counter and doors', () => {
    render(<MontyHallGame />);
    expect(screen.getByText(/Trial/)).toBeInTheDocument();
    expect(screen.getByTestId('door-0')).toBeInTheDocument();
    expect(screen.getByTestId('door-1')).toBeInTheDocument();
    expect(screen.getByTestId('door-2')).toBeInTheDocument();
  });

  it('shows the goat reveal and decision buttons after picking a door', () => {
    render(<MontyHallGame />);
    fireEvent.click(screen.getByTestId('door-1'));
    expect(screen.getByText(/a goat/)).toBeInTheDocument();
    expect(screen.getByTestId('switch-btn')).toBeInTheDocument();
    expect(screen.getByTestId('stay-btn')).toBeInTheDocument();
  });

  it('updates the tally after staying on a correct pick', () => {
    render(<MontyHallGame />);
    playTrial(0, false);
    expect(screen.getByTestId('stay-wins')).toHaveTextContent('1');
    expect(screen.getByTestId('switch-wins')).toHaveTextContent('0');
  });

  it('updates the tally after switching on a wrong pick', () => {
    render(<MontyHallGame />);
    playTrial(1, true);
    expect(screen.getByTestId('switch-wins')).toHaveTextContent('1');
    expect(screen.getByTestId('stay-wins')).toHaveTextContent('0');
  });

  it('reaches the explanation panel after 20 trials', () => {
    render(<MontyHallGame />);
    for (let i = 0; i < 20; i++) {
      playTrial(1, i % 2 === 0);
    }
    expect(screen.getByText(/All 20 trials complete!/)).toBeInTheDocument();
    expect(screen.getByTestId('explanation-panel')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('resets when Play Again is clicked', () => {
    render(<MontyHallGame />);
    for (let i = 0; i < 20; i++) {
      playTrial(1, false);
    }
    fireEvent.click(screen.getByTestId('reset-btn'));
    expect(screen.getByTestId('door-0')).toBeInTheDocument();
    expect(screen.queryByTestId('explanation-panel')).not.toBeInTheDocument();
  });
});
