import { render, screen } from '@testing-library/react';
import { StatTrend } from '../StatTrend';

describe('StatTrend', () => {
  it('renders label and value', () => {
    render(<StatTrend label="Users" value="1,204" />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('1,204')).toBeInTheDocument();
  });

  it('shows an upward trend as positive', () => {
    render(<StatTrend label="Users" value="1,204" trend={12.5} />);
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
    expect(screen.getByText('+12.5%')).toHaveClass('text-success');
  });

  it('shows a downward trend as negative', () => {
    render(<StatTrend label="Users" value="1,204" trend={-3} />);
    expect(screen.getByText('-3%')).toBeInTheDocument();
    expect(screen.getByText('-3%')).toHaveClass('text-error');
  });

  it('omits the trend when not provided', () => {
    render(<StatTrend label="Users" value="1,204" />);
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });
});
