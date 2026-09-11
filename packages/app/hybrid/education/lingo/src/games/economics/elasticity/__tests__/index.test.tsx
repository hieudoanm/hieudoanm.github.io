import { fireEvent, render, screen } from '@testing-library/react';
import { RevenueExplorerGame } from '../index';

describe('RevenueExplorerGame', () => {
  it('renders the rule and price input on load', () => {
    render(<RevenueExplorerGame />);
    expect(screen.getByText(/Elasticity of demand/)).toBeInTheDocument();
    expect(screen.getByTestId('price-input')).toBeInTheDocument();
    expect(screen.getByTestId('epsilon')).toBeInTheDocument();
  });

  it('submits a price and shows revenue and guidance', () => {
    render(<RevenueExplorerGame />);
    fireEvent.change(screen.getByTestId('price-input'), {
      target: { value: '20' },
    });
    fireEvent.click(screen.getByTestId('submit-price'));
    expect(screen.getByTestId('trial-20')).toBeInTheDocument();
    expect(screen.getByText('140')).toBeInTheDocument();
    expect(
      screen.getByText(/Inelastic here — revenue grows when you raise price/)
    ).toBeInTheDocument();
  });

  it('advances rounds and reaches the summary', () => {
    render(<RevenueExplorerGame />);
    for (let round = 0; round < 6; round++) {
      fireEvent.change(screen.getByTestId('price-input'), {
        target: { value: '10' },
      });
      fireEvent.click(screen.getByTestId('submit-price'));
      fireEvent.click(screen.getByTestId('next-round'));
    }
    expect(screen.getByText('Across-round summary')).toBeInTheDocument();
    expect(screen.getByTestId('summary-1')).toBeInTheDocument();
    expect(screen.getByTestId('play-again')).toBeInTheDocument();
  });

  it('ignores an out-of-range price', () => {
    render(<RevenueExplorerGame />);
    fireEvent.change(screen.getByTestId('price-input'), {
      target: { value: '999' },
    });
    fireEvent.click(screen.getByTestId('submit-price'));
    expect(screen.queryByTestId('trial-999')).toBeNull();
  });
});
