import { render, screen } from '@testing-library/react';
import { PerformanceReview } from '../PerformanceReview';

describe('PerformanceReview', () => {
  const reviews = [
    {
      id: '1',
      employee: 'Ada Lovelace',
      reviewer: 'Charles Babbage',
      period: 'H1 2026',
      score: 4.5,
      status: 'completed' as const,
    },
    {
      id: '2',
      employee: 'Grace Hopper',
      reviewer: 'Howard Aiken',
      period: 'H1 2026',
      score: 2.5,
      status: 'scheduled' as const,
    },
  ];

  it('computes and renders the average score', () => {
    render(<PerformanceReview reviews={reviews} />);
    expect(screen.getByText('3.5 / 5')).toBeInTheDocument();
  });

  it('renders review rows with scores', () => {
    render(<PerformanceReview reviews={reviews} />);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('applies score and status badge classes', () => {
    render(<PerformanceReview reviews={reviews} />);
    expect(screen.getByText('4.5')).toHaveClass('badge-success');
    expect(screen.getByText('2.5')).toHaveClass('badge-error');
    expect(screen.getByText('scheduled')).toHaveClass('badge-info');
  });

  it('shows an empty state when no reviews exist', () => {
    render(<PerformanceReview reviews={[]} />);
    expect(screen.getByText('No reviews available')).toBeInTheDocument();
  });
});
