import { render, screen } from '@testing-library/react';
import { ExpenseCategories } from '../ExpenseCategories';

const categories = [
  { name: 'Housing', amount: 1400, percentage: 40 },
  { name: 'Food', amount: 600, percentage: 17 },
  { name: 'Transport', amount: 300, percentage: 9 },
];

describe('ExpenseCategories', () => {
  it('renders each category with percentage and amount', () => {
    render(<ExpenseCategories categories={categories} />);
    expect(screen.getByText('Housing')).toBeInTheDocument();
    expect(screen.getByText('40% · $1,400')).toBeInTheDocument();
    expect(screen.getByText('17% · $600')).toBeInTheDocument();
  });

  it('sets the bar width from the percentage', () => {
    const { container } = render(<ExpenseCategories categories={categories} />);
    const housingBar = container.querySelector('[data-testid="bar-Housing"]');
    expect(housingBar).toHaveAttribute('style', 'width: 40%;');
  });

  it('caps the bar width at 100 percent', () => {
    const { container } = render(
      <ExpenseCategories
        categories={[{ name: 'Debt', amount: 3000, percentage: 150 }]}
      />
    );
    expect(container.querySelector('[data-testid="bar-Debt"]')).toHaveAttribute(
      'style',
      'width: 100%;'
    );
  });

  it('shows an empty state when there are no categories', () => {
    render(<ExpenseCategories categories={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent('No expense data.');
  });
});
