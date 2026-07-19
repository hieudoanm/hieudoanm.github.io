import { render, screen } from '@testing-library/react';
import { PerformanceCard } from '../PerformanceCard';

const performance = {
  employee: 'Jane Doe',
  period: 'Q3 2026',
  score: 88,
  rating: 'Exceeds',
  highlights: ['Shipped 3 features', 'Mentored two juniors'],
};

describe('PerformanceCard', () => {
  it('renders employee, period, and rating', () => {
    render(<PerformanceCard {...performance} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Q3 2026')).toBeInTheDocument();
    expect(screen.getByText('Exceeds')).toBeInTheDocument();
  });

  it('renders the score and progress bar', () => {
    render(<PerformanceCard {...performance} />);
    expect(screen.getByText('88')).toBeInTheDocument();
    expect(screen.getByLabelText('Performance score')).toHaveAttribute(
      'value',
      '88'
    );
  });

  it('renders highlight bullets', () => {
    render(<PerformanceCard {...performance} />);
    expect(screen.getByText('Shipped 3 features')).toBeInTheDocument();
    expect(screen.getByText('Mentored two juniors')).toBeInTheDocument();
  });

  it('renders no bullets when highlights are empty', () => {
    render(<PerformanceCard {...performance} highlights={[]} />);
    expect(screen.queryByText('Shipped 3 features')).not.toBeInTheDocument();
  });
});
