import { render, screen } from '@testing-library/react';
import { StatusOverview } from '../StatusOverview';

const stats = [
  { label: 'Active users', value: '1,204', delta: '+12%', positive: true },
  { label: 'Errors', value: '3', delta: '-40%' },
];

describe('StatusOverview', () => {
  it('renders labels and values', () => {
    render(<StatusOverview stats={stats} />);
    expect(screen.getByText('Active users')).toBeInTheDocument();
    expect(screen.getByText('1,204')).toBeInTheDocument();
    expect(screen.getByText('Errors')).toBeInTheDocument();
  });

  it('applies the success class for positive deltas', () => {
    render(<StatusOverview stats={stats} />);
    expect(screen.getByText('+12%')).toHaveClass('text-success');
  });

  it('applies the error class for non-positive deltas', () => {
    render(<StatusOverview stats={stats} />);
    expect(screen.getByText('-40%')).toHaveClass('text-error');
  });
});
