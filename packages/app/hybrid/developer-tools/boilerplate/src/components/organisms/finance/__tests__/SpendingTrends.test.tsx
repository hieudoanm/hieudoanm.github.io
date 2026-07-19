import { render, screen } from '@testing-library/react';
import { SpendingTrends } from '../SpendingTrends';

describe('SpendingTrends', () => {
  it('renders the title and a bar per data point', () => {
    render(
      <SpendingTrends
        data={[
          { month: 'Jan', amount: 2000 },
          { month: 'Feb', amount: 1500 },
        ]}
      />
    );
    expect(screen.getByText('Spending trends')).toBeInTheDocument();
    expect(screen.getByTestId('trend-bars')).toBeInTheDocument();
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Feb')).toBeInTheDocument();
  });

  it('applies a taller bar to the largest amount', () => {
    const { container } = render(
      <SpendingTrends
        data={[
          { month: 'Jan', amount: 1000 },
          { month: 'Feb', amount: 2000 },
        ]}
      />
    );
    const barFeb = container.querySelector('[data-testid="bar-Feb"]');
    const barJan = container.querySelector('[data-testid="bar-Jan"]');
    expect(barFeb).toHaveAttribute('style', 'height: 100%;');
    expect(barJan).toHaveAttribute('style', 'height: 50%;');
  });

  it('renders an empty state when no data is provided', () => {
    render(<SpendingTrends data={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No spending data yet.'
    );
  });
});
