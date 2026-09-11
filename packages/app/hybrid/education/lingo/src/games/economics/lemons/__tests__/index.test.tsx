import { fireEvent, render, screen } from '@testing-library/react';
import { LemonsGame } from '../index';

const post = (price: string) => {
  fireEvent.change(screen.getByTestId('price-input'), {
    target: { value: price },
  });
  fireEvent.click(screen.getByTestId('submit-price'));
};

describe('LemonsGame', () => {
  it('records a lemon-only trial and its verdict', () => {
    render(<LemonsGame />);
    post('4000');
    expect(screen.getByTestId('trial-row-1')).toBeInTheDocument();
    expect(screen.getByText('Only lemons offered')).toBeInTheDocument();
  });

  it('records a mixed-pool verdict at a price that attracts good cars', () => {
    render(<LemonsGame />);
    post('12000');
    expect(screen.getByText('Mixed pool — no profit here')).toBeInTheDocument();
  });

  it('accepts quick-set prices', () => {
    render(<LemonsGame />);
    fireEvent.click(screen.getByTestId('quick-price-6000'));
    fireEvent.click(screen.getByTestId('submit-price'));
    expect(screen.getByTestId('trial-row-1').textContent).toContain('+$0');
  });

  it('does not record an out-of-range price', () => {
    render(<LemonsGame />);
    fireEvent.change(screen.getByTestId('price-input'), {
      target: { value: '99999' },
    });
    fireEvent.click(screen.getByTestId('submit-price'));
    expect(screen.queryByTestId('trial-row-1')).toBeNull();
  });

  it('shows the summary after finishing with four trials', () => {
    render(<LemonsGame />);
    for (const p of ['4000', '6000', '8000', '12000']) post(p);
    fireEvent.click(screen.getByTestId('finish'));
    expect(screen.getByText('Market analysis')).toBeInTheDocument();
    expect(screen.getByTestId('best-result')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('replays after reset', () => {
    render(<LemonsGame />);
    for (const p of ['4000', '6000', '8000', '12000']) post(p);
    fireEvent.click(screen.getByTestId('finish'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('price-input')).toBeInTheDocument();
    expect(screen.queryByTestId('trial-row-1')).toBeNull();
  });
});
