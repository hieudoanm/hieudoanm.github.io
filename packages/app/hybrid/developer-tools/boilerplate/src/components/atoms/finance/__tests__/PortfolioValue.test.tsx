import { render, screen } from '@testing-library/react';
import { PortfolioValue } from '../PortfolioValue';

describe('PortfolioValue', () => {
  it('renders the formatted portfolio value', () => {
    render(<PortfolioValue value={25000} change={2.5} />);
    expect(screen.getByTestId('portfolio-value')).toHaveTextContent(
      '$25,000.00'
    );
  });

  it('shows a positive change in success color', () => {
    render(<PortfolioValue value={25000} change={2.5} />);
    expect(screen.getByTestId('portfolio-value')).toHaveTextContent('▲ 2.50%');
  });

  it('shows a negative change in error color', () => {
    render(<PortfolioValue value={25000} change={-1.25} />);
    expect(screen.getByTestId('portfolio-value')).toHaveTextContent('▼ -1.25%');
  });
});
