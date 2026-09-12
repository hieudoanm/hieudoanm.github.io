import { fireEvent, render, screen } from '@testing-library/react';
import { War } from '../index';

describe('War', () => {
  it('shows the rules before the first flip', () => {
    render(<War />);
    expect(screen.getByText(/Higher card wins the stake/)).toBeInTheDocument();
    expect(screen.getByTestId('war-play')).toBeEnabled();
    expect(screen.getByTestId('war-credits')).toHaveTextContent('200');
  });

  it('flips cards and reports the round outcome', () => {
    render(<War />);
    fireEvent.click(screen.getByTestId('war-play'));
    expect(screen.getByTestId('war-card-you')).toBeInTheDocument();
    expect(screen.getByTestId('war-card-dealer')).toBeInTheDocument();
    const message = screen.getByTestId('war-message').textContent ?? '';
    expect(message).toMatch(/You win|Dealer wins/);
  });

  it('plays several rounds without breaking', () => {
    render(<War />);
    for (let index = 0; index < 5; index += 1) {
      if (!screen.queryByTestId('war-play')) break;
      fireEvent.click(screen.getByTestId('war-play'));
    }
    expect(screen.getByTestId('war-message')).toBeInTheDocument();
  });
});
