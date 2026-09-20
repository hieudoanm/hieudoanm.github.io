import { fireEvent, render, screen } from '@testing-library/react';
import { AggregateDemandGame } from '../index';

const predict = (gap: string, price: string) => {
  fireEvent.click(screen.getByTestId(`gap-${gap}`));
  fireEvent.click(screen.getByTestId(`price-${price}`));
  fireEvent.click(screen.getByTestId('submit-predictions'));
};

describe('AggregateDemandGame', () => {
  it('reveals price, output, gap and score after a correct round', () => {
    render(<AggregateDemandGame />);
    predict('negative', 'same');
    expect(screen.getByTestId('reveal-short-run-price')).toHaveTextContent(
      '97.4'
    );
    expect(screen.getByTestId('reveal-short-run-output')).toHaveTextContent(
      '87.2'
    );
    expect(screen.getByTestId('reveal-gap')).toHaveTextContent('-12.8%');
    expect(screen.getByTestId('reveal-long-run-price')).toHaveTextContent('85');
    expect(screen.getByTestId('reveal-points')).toHaveTextContent('2 / 2');
  });

  it('scores zero for wrong predictions', () => {
    render(<AggregateDemandGame />);
    predict('positive', 'rises');
    expect(screen.getByTestId('reveal-points')).toHaveTextContent('0 / 2');
  });

  it('summarizes the deepest recession and biggest boom', () => {
    render(<AggregateDemandGame />);
    const plans: string[][] = [
      ['negative', 'same'],
      ['positive', 'rises'],
      ['zero', 'falls'],
      ['negative', 'falls'],
      ['positive', 'rises'],
      ['positive', 'falls'],
    ];
    for (const [gap, price] of plans) {
      predict(gap, price);
      fireEvent.click(screen.getByTestId('next-round'));
    }
    expect(screen.getByTestId('summary-deepest')).toHaveTextContent('Round 1');
    expect(screen.getByTestId('summary-boom')).toHaveTextContent('Round 5');
    expect(screen.getByTestId('summary-score')).toHaveTextContent('12 / 12');
  });

  it('restarts the lab from the summary', () => {
    render(<AggregateDemandGame />);
    for (let round = 0; round < 6; round++) {
      fireEvent.click(screen.getByTestId('gap-negative'));
      fireEvent.click(screen.getByTestId('price-same'));
      fireEvent.click(screen.getByTestId('submit-predictions'));
      fireEvent.click(screen.getByTestId('next-round'));
    }
    fireEvent.click(screen.getByTestId('play-again'));
    expect(screen.getByTestId('submit-predictions')).toBeInTheDocument();
  });
});
