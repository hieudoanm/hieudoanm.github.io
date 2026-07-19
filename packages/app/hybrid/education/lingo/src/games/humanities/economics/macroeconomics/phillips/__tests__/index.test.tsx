import { fireEvent, render, screen } from '@testing-library/react';
import { PhillipsGame } from '../index';

const selectPolicy = () => {
  fireEvent.click(screen.getByText(/Expansion/));
};

describe('PhillipsGame', () => {
  it('displays initial economic indicators', () => {
    render(<PhillipsGame />);
    expect(screen.getByTestId('inflation')).toHaveTextContent('3.00%');
    expect(screen.getByTestId('unemployment')).toHaveTextContent('5.00%');
    expect(screen.getByTestId('natural-rate')).toHaveTextContent('5%');
    expect(screen.getByTestId('exp-inflation')).toHaveTextContent('3.00%');
  });

  it('lets the player select a policy and check the result', () => {
    render(<PhillipsGame />);
    selectPolicy();
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('new-inflation')).toBeInTheDocument();
    expect(screen.getByTestId('new-unemployment')).toBeInTheDocument();
  });

  it('ignores check when no policy is selected', () => {
    render(<PhillipsGame />);
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.queryByTestId('new-inflation')).not.toBeInTheDocument();
  });

  it('advances to the next round after revealing results', () => {
    render(<PhillipsGame />);
    selectPolicy();
    fireEvent.click(screen.getByTestId('check'));
    fireEvent.click(screen.getByRole('button', { name: 'Next Round' }));
    expect(screen.getByText(/Round/)).toHaveTextContent('2');
  });

  it('reaches the summary screen after all rounds', () => {
    render(<PhillipsGame />);
    for (let round = 0; round < 5; round++) {
      selectPolicy();
      fireEvent.click(screen.getByTestId('check'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    expect(
      screen.getByText('Phillips Curve Lab — Results')
    ).toBeInTheDocument();
    expect(screen.getByTestId('final-score')).toBeInTheDocument();
    expect(screen.getByTestId('final-sacrifice')).toBeInTheDocument();
  });

  it('resets the game from the summary screen', () => {
    render(<PhillipsGame />);
    for (let round = 0; round < 5; round++) {
      selectPolicy();
      fireEvent.click(screen.getByTestId('check'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByTestId('inflation')).toHaveTextContent('3.00%');
  });
});
