import { fireEvent, render, screen, within } from '@testing-library/react';
import { PerformanceReviewsTemplate } from '../PerformanceReviewsTemplate';

describe('PerformanceReviewsTemplate', () => {
  it('renders all reviews and the summary', () => {
    render(<PerformanceReviewsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Performance Reviews' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 reviews')).toBeInTheDocument();
    expect(screen.getByText('Sofia Rossi')).toBeInTheDocument();
    expect(screen.getByText('4/5')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Start review' })
    ).toHaveLength(2);
  });

  it('filters reviews by status', () => {
    render(<PerformanceReviewsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Pending' }));
    expect(screen.getByText('2 reviews')).toBeInTheDocument();
    expect(screen.getByText('Maya Singh')).toBeInTheDocument();
    expect(screen.getByText('Ana Garcia')).toBeInTheDocument();
    expect(screen.queryByText('Sofia Rossi')).not.toBeInTheDocument();
  });

  it('starts a review and marks it completed', () => {
    render(<PerformanceReviewsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Start review' })[0]);
    expect(
      screen.getAllByRole('button', { name: 'Start review' })
    ).toHaveLength(1);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Completed')).toHaveLength(4);
    expect(within(table).getAllByText('Pending')).toHaveLength(1);
    expect(within(table).getAllByText('4/5')).toHaveLength(2);
  });
});
