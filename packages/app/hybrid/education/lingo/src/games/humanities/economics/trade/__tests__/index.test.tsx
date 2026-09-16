import { fireEvent, render, screen } from '@testing-library/react';
import { TradeGame } from '../index';

const answerRound = (tariff: string) => {
  fireEvent.click(screen.getByTestId(`tariff-option-${tariff}`));
  fireEvent.click(screen.getByTestId('check'));
  expect(screen.getByTestId('score')).toHaveTextContent('100');
  fireEvent.click(
    screen.getByRole('button', { name: /Next Round|See Results/ })
  );
};

describe('TradeGame', () => {
  it('renders the lab with free-trade readouts', () => {
    const { getByTestId } = render(<TradeGame />);
    expect(getByTestId('world-price')).toBeInTheDocument();
    expect(getByTestId('tariff')).toBeInTheDocument();
    expect(getByTestId('price-after')).toHaveTextContent('$25');
    expect(getByTestId('imports')).toHaveTextContent('140');
    expect(getByTestId('consumer-surplus')).toHaveTextContent('$5,625');
  });

  it('shows tariff effects at 20%', () => {
    const { getByTestId } = render(<TradeGame />);
    fireEvent.change(getByTestId('tariff'), { target: { value: '0.2' } });
    expect(getByTestId('price-after')).toHaveTextContent('$30');
    expect(getByTestId('imports')).toHaveTextContent('120');
    expect(getByTestId('revenue')).toHaveTextContent('$600');
    expect(getByTestId('deadweight-loss')).toHaveTextContent('$50');
  });

  it('plays all four rounds to a perfect score', () => {
    const { getByTestId } = render(<TradeGame />);
    fireEvent.click(getByTestId('start-rounds'));
    expect(getByTestId('challenge-objective')).toBeInTheDocument();

    answerRound('0.35');
    answerRound('0.25');
    answerRound('0.4');

    expect(getByTestId('retaliation')).toBeInTheDocument();
    fireEvent.change(getByTestId('my-tariff'), { target: { value: '0.5' } });
    fireEvent.change(getByTestId('other-tariff'), { target: { value: '0.5' } });
    fireEvent.click(getByTestId('check'));
    expect(getByTestId('score')).toHaveTextContent('100');
    expect(getByTestId('nash-cell')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'See Results' }));

    expect(getByTestId('total-accuracy')).toHaveTextContent('100 / 100');
  });

  it('returns to the lab after the summary', () => {
    const { getByTestId } = render(<TradeGame />);
    fireEvent.click(getByTestId('start-rounds'));
    answerRound('0.35');
    answerRound('0.25');
    answerRound('0.4');
    fireEvent.change(getByTestId('my-tariff'), { target: { value: '0.5' } });
    fireEvent.change(getByTestId('other-tariff'), { target: { value: '0.5' } });
    fireEvent.click(getByTestId('check'));
    fireEvent.click(screen.getByRole('button', { name: 'See Results' }));
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(getByTestId('world-price')).toBeInTheDocument();
  });

  it('blocks the check button until a tariff is chosen', () => {
    const { getByTestId } = render(<TradeGame />);
    fireEvent.click(getByTestId('start-rounds'));
    expect(getByTestId('check')).toBeDisabled();
  });
});
