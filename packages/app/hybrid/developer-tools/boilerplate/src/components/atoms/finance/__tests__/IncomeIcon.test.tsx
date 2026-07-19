import { render, screen } from '@testing-library/react';
import { IncomeIcon } from '../IncomeIcon';

describe('IncomeIcon', () => {
  it('renders an image with an income label', () => {
    render(<IncomeIcon />);
    expect(screen.getByRole('img', { name: 'income' })).toBeInTheDocument();
  });

  it('applies success color classes', () => {
    render(<IncomeIcon />);
    expect(screen.getByTestId('income-icon')).toHaveClass('text-success');
  });

  it('honors a custom size', () => {
    render(<IncomeIcon size="sm" />);
    expect(screen.getByTestId('income-icon')).toHaveClass('w-6');
  });
});
