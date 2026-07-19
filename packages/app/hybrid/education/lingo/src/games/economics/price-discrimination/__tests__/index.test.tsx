import { fireEvent, render, screen } from '@testing-library/react';
import { SplitPricingGame } from '../index';

const chooseDual = () => {
  fireEvent.click(screen.getByTestId('mode-dual'));
};

const submitDual = (priceB: string, priceL: string) => {
  chooseDual();
  fireEvent.change(screen.getByTestId('price-b-input'), {
    target: { value: priceB },
  });
  fireEvent.change(screen.getByTestId('price-l-input'), {
    target: { value: priceL },
  });
  fireEvent.click(screen.getByTestId('submit-pricing'));
};

const submitSingle = (price: string) => {
  fireEvent.change(screen.getByTestId('price-input'), {
    target: { value: price },
  });
  fireEvent.click(screen.getByTestId('submit-pricing'));
};

const advance = () => {
  fireEvent.click(
    screen.getByRole('button', { name: /Next Round|See Results/ })
  );
};

describe('SplitPricingGame', () => {
  it('renders the default single-price round', () => {
    render(<SplitPricingGame />);
    expect(screen.getByText(/Round 1 \/ 4/)).toBeInTheDocument();
    expect(screen.getByText(/Business demand/)).toBeInTheDocument();
    expect(screen.getByText(/q = 100 - p/)).toBeInTheDocument();
    expect(screen.getByText(/q = 120 - 2p/)).toBeInTheDocument();
    expect(screen.getByTestId('price-input')).toBeInTheDocument();
    expect(screen.queryByTestId('price-b-input')).toBeNull();
  });

  it('switches into the two-price mode', () => {
    render(<SplitPricingGame />);
    chooseDual();
    expect(screen.getByTestId('price-b-input')).toBeInTheDocument();
    expect(screen.getByTestId('price-l-input')).toBeInTheDocument();
    expect(screen.queryByTestId('price-input')).toBeNull();
  });

  it('reveals quantities and profit for a two-price choice', () => {
    render(<SplitPricingGame />);
    submitDual('55', '35');
    expect(screen.getByTestId('reveal-qb')).toHaveTextContent('45');
    expect(screen.getByTestId('reveal-ql')).toHaveTextContent('50');
    expect(screen.getByTestId('reveal-revenue')).toHaveTextContent('$4,225');
    expect(screen.getByTestId('reveal-cost')).toHaveTextContent('$950');
    expect(screen.getByTestId('reveal-profit')).toHaveTextContent('$3,275');
    expect(screen.getByTestId('guidance')).toHaveTextContent(
      /less elastic business segment/
    );
  });

  it('shows the single-price comparison too', () => {
    render(<SplitPricingGame />);
    submitSingle('42');
    expect(screen.getByTestId('reveal-profit')).toHaveTextContent('$3,008');
    expect(screen.getByText(/best one-price profit/)).toBeInTheDocument();
  });

  it('rejects an empty submission with an error', () => {
    render(<SplitPricingGame />);
    fireEvent.click(screen.getByTestId('submit-pricing'));
    expect(screen.getByTestId('submit-error')).toBeInTheDocument();
    expect(screen.queryByTestId('reveal-profit')).toBeNull();
  });

  it('handles the flipped round 3 and reports the final benchmark', () => {
    render(<SplitPricingGame />);

    submitDual('55', '35');
    advance();

    submitDual('55', '35');
    advance();

    expect(screen.getByTestId('flipped-badge')).toBeInTheDocument();
    expect(screen.getByText(/q = 120 - 2p/)).toBeInTheDocument();
    expect(screen.getByText(/q = 100 - p/)).toBeInTheDocument();
    submitDual('35', '55');
    advance();

    submitDual('55', '35');
    advance();

    expect(screen.getByText('Segment Pricing results')).toBeInTheDocument();
    expect(screen.getByTestId('final-profit')).toHaveTextContent('$13,100');
    expect(screen.getByTestId('final-pd')).toHaveTextContent('$13,100');
  });

  it('restarts the game from the results screen', () => {
    render(<SplitPricingGame />);
    for (let round = 0; round < 4; round++) {
      submitDual('55', '35');
      advance();
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByText(/Round 1 \/ 4/)).toBeInTheDocument();
    expect(screen.getByTestId('profit-so-far')).toHaveTextContent('$0');
  });
});
