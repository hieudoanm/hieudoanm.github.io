import { fireEvent, render, screen } from '@testing-library/react';
import { UltimatumGame } from '../index';

jest.mock('../game', () => ({
  ...jest.requireActual('../game'),
  randomThreshold: () => 30,
}));

describe('UltimatumGame', () => {
  it('renders the initial choose phase', () => {
    render(<UltimatumGame />);
    expect(screen.getByText(/You are the proposer/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Submit Proposal' })
    ).toBeInTheDocument();
  });

  it('reveals the outcome after submitting a keep', () => {
    render(<UltimatumGame />);
    fireEvent.click(screen.getByTestId('submit-keep'));
    expect(screen.getByText(/accepted your offer/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('shows rejection when keep is too high', () => {
    render(<UltimatumGame />);
    fireEvent.change(screen.getByTestId('keep-slider'), {
      target: { value: '80' },
    });
    fireEvent.click(screen.getByTestId('submit-keep'));
    expect(screen.getByText(/rejected your offer/)).toBeInTheDocument();
  });

  it('reaches the results screen after all 5 rounds', () => {
    render(<UltimatumGame />);
    for (let round = 0; round < 5; round++) {
      fireEvent.click(screen.getByTestId('submit-keep'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    expect(screen.getByText('Ultimatum Split Results')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the results screen', () => {
    render(<UltimatumGame />);
    for (let round = 0; round < 5; round++) {
      fireEvent.click(screen.getByTestId('submit-keep'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByText(/You are the proposer/)).toBeInTheDocument();
  });
});
