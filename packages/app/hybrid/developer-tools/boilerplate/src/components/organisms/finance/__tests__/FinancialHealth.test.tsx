import { render, screen } from '@testing-library/react';
import { FinancialHealth } from '../FinancialHealth';

describe('FinancialHealth', () => {
  const metrics = [
    { label: 'Emergency fund', value: '4 months', status: 'good' as const },
    { label: 'Credit usage', value: '65%', status: 'warning' as const },
  ];

  it('renders the score and metric list', () => {
    render(<FinancialHealth score={72} metrics={metrics} />);
    expect(screen.getByTestId('score-ring')).toHaveTextContent('72');
    expect(screen.getByText('Emergency fund')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('shows a strong message for high scores', () => {
    render(<FinancialHealth score={85} metrics={metrics} />);
    expect(screen.getByTestId('message')).toHaveTextContent(
      'Strong financial position.'
    );
  });

  it('shows a warning message for low scores', () => {
    render(<FinancialHealth score={25} metrics={metrics} />);
    expect(screen.getByTestId('message')).toHaveTextContent(
      'Financial action needed.'
    );
  });

  it('renders status badges for metrics', () => {
    render(<FinancialHealth score={72} metrics={metrics} />);
    expect(screen.getByText('good')).toBeInTheDocument();
    expect(screen.getByText('warning')).toBeInTheDocument();
  });
});
