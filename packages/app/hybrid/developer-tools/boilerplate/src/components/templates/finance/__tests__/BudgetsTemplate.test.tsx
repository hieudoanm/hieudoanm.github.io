import { fireEvent, render, screen } from '@testing-library/react';
import { BudgetsTemplate } from '../BudgetsTemplate';

describe('BudgetsTemplate', () => {
  it('renders budgets with progress bars and the total summary', () => {
    render(<BudgetsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Budgets' })
    ).toBeInTheDocument();
    expect(screen.getByText('Total budget')).toBeInTheDocument();
    expect(screen.getByText('$26,000')).toBeInTheDocument();
    expect(screen.getByText('$6,400 of $8,000')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', { name: 'Progress for Marketing' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('On track')).toHaveLength(4);
    expect(screen.getAllByText('Over budget')).toHaveLength(1);
  });

  it('increases spend past the limit and flips the badge', () => {
    render(<BudgetsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Increase Office' }));
    expect(screen.getByText('$3,000 of $3,000')).toBeInTheDocument();
    expect(screen.getAllByText('On track')).toHaveLength(4);
    fireEvent.click(screen.getByRole('button', { name: 'Increase Office' }));
    expect(screen.getByText('$3,100 of $3,000')).toBeInTheDocument();
    expect(screen.getAllByText('Over budget')).toHaveLength(2);
    expect(screen.getAllByText('On track')).toHaveLength(3);
  });

  it('keeps an over-budget row over and leaves the total unchanged', () => {
    render(<BudgetsTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Increase Engineering tools' })
    );
    expect(screen.getByText('$5,300 of $5,000')).toBeInTheDocument();
    expect(screen.getAllByText('Over budget')).toHaveLength(1);
    expect(screen.getByText('$26,000')).toBeInTheDocument();
  });
});
