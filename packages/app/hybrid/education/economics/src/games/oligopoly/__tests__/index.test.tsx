import { fireEvent, render, screen } from '@testing-library/react';
import { CournotGame } from '../index';

const produce = (q: string) => {
  fireEvent.change(screen.getByTestId('q-input'), { target: { value: q } });
  fireEvent.click(screen.getByRole('button', { name: 'Produce' }));
};

describe('CournotGame', () => {
  it('renders the decision controls in the choose phase', () => {
    render(<CournotGame />);
    expect(screen.getByText(/Choose your output qA/)).toBeInTheDocument();
    expect(screen.getByTestId('q-slider')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Produce' })).toBeInTheDocument();
  });

  it('reveals the round outcome after producing', () => {
    render(<CournotGame />);
    produce('30');
    expect(screen.getByText('Firm B produced 30 units')).toBeInTheDocument();
    expect(screen.getByText(/Market price:/)).toBeInTheDocument();
    expect(screen.getByText(/Your profit:/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('advances to the next round', () => {
    render(<CournotGame />);
    produce('30');
    fireEvent.click(screen.getByRole('button', { name: 'Next Round' }));
    expect(screen.getByTestId('round-counter')).toHaveTextContent(
      'Round 2 / 5'
    );
    expect(screen.getByText(/Choose your output qA/)).toBeInTheDocument();
  });

  it('reaches the results screen after all five rounds', () => {
    render(<CournotGame />);
    for (let i = 0; i < 5; i++) {
      produce('30');
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    expect(screen.getByText('Cournot results')).toBeInTheDocument();
    expect(screen.getByText(/Your total profit:/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the results screen', () => {
    render(<CournotGame />);
    for (let i = 0; i < 5; i++) {
      produce('30');
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByTestId('round-counter')).toHaveTextContent(
      'Round 1 / 5'
    );
    expect(screen.getByRole('button', { name: 'Produce' })).toBeInTheDocument();
  });
});
