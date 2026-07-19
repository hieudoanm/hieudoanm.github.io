import { render, screen } from '@testing-library/react';
import { BlogDate } from '../BlogDate';

describe('BlogDate', () => {
  it('to match snapshot', () => {
    const { container } = render(<BlogDate date="2024-01-15" />);
    expect(container).toMatchSnapshot();
  });

  it('renders short format by default', () => {
    render(<BlogDate date="2024-01-15" />);
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
  });

  it('renders long format', () => {
    render(<BlogDate date="2024-01-15" format="long" />);
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument();
  });

  it('renders relative format for today', () => {
    const today = new Date().toISOString().split('T')[0]!;
    render(<BlogDate date={today} format="relative" />);
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('renders relative format for yesterday', () => {
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split('T')[0]!;
    render(<BlogDate date={yesterday} format="relative" />);
    expect(screen.getByText('Yesterday')).toBeInTheDocument();
  });

  it('renders date with datetime attribute', () => {
    render(<BlogDate date="2024-06-15" />);
    expect(screen.getByText('Jun 15, 2024').closest('time')).toHaveAttribute(
      'dateTime',
      '2024-06-15'
    );
  });

  it('renders relative format for days ago', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 86400000)
      .toISOString()
      .split('T')[0]!;
    render(<BlogDate date={threeDaysAgo} format="relative" />);
    expect(screen.getByText('3 days ago')).toBeInTheDocument();
  });
});
