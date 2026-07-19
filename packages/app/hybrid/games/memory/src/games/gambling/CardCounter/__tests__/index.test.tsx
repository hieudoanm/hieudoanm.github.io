import { fireEvent, render, screen } from '@testing-library/react';
import { CardCounter } from '../index';

describe('CardCounter', () => {
  it('prompts to deal and hides the count before reveal', () => {
    render(<CardCounter />);
    expect(screen.getByText(/Deal a card to start/)).toBeInTheDocument();
    expect(screen.queryByTestId('card-counter-count')).toBeNull();
    expect(screen.getByTestId('card-counter-deal')).toBeEnabled();
  });

  it('reveals the running count after dealing', () => {
    render(<CardCounter />);
    fireEvent.click(screen.getByTestId('card-counter-deal'));
    fireEvent.click(screen.getByTestId('card-counter-reveal'));
    expect(screen.getByTestId('card-counter-count')).toBeInTheDocument();
    expect(screen.getByText('Cards left: 51')).toBeInTheDocument();
  });

  it('resets the trainer', () => {
    render(<CardCounter />);
    fireEvent.click(screen.getByTestId('card-counter-deal'));
    fireEvent.click(screen.getByTestId('card-counter-reset'));
    expect(screen.getByText(/Deal a card to start/)).toBeInTheDocument();
    expect(screen.getByText('Cards left: 52')).toBeInTheDocument();
  });
});
