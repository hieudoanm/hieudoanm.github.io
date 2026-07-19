import { render, screen } from '@testing-library/react';
import BudgetCategoryCard from '../BudgetCategoryCard';
import type { BudgetCategory } from '@/types';

const mockCategory: BudgetCategory = {
  id: '1',
  name: 'Food & Drink',
  spent: 450,
  limit: 600,
  color: 'primary',
};

describe('BudgetCategoryCard', () => {
  it('renders category name', () => {
    render(<BudgetCategoryCard category={mockCategory} />);
    expect(screen.getByText('Food & Drink')).toBeInTheDocument();
  });

  it('renders spent and limit amounts', () => {
    render(<BudgetCategoryCard category={mockCategory} />);
    expect(screen.getByText('$450.00')).toBeInTheDocument();
    expect(screen.getByText('/ $600.00')).toBeInTheDocument();
  });

  it('renders percentage', () => {
    render(<BudgetCategoryCard category={mockCategory} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('shows Over budget badge when over limit', () => {
    const overCategory = { ...mockCategory, spent: 700 };
    render(<BudgetCategoryCard category={overCategory} />);
    expect(screen.getByText('Over budget')).toBeInTheDocument();
  });

  it('does not show Over budget badge when under limit', () => {
    render(<BudgetCategoryCard category={mockCategory} />);
    expect(screen.queryByText('Over budget')).not.toBeInTheDocument();
  });
});
