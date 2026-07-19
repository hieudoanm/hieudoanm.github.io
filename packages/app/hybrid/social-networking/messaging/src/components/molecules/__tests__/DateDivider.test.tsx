import { render, screen } from '@testing-library/react';
import { DateDivider } from '@/components/molecules/DateDivider';

describe('DateDivider', () => {
  it('renders Today for the current day', () => {
    render(<DateDivider timestamp={Date.now()} />);
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('renders Yesterday for the previous day', () => {
    render(<DateDivider timestamp={Date.now() - 24 * 60 * 60 * 1000} />);
    expect(screen.getByText('Yesterday')).toBeInTheDocument();
  });

  it('renders a full date for older days', () => {
    render(<DateDivider timestamp={new Date(2026, 0, 1, 12, 0).getTime()} />);
    expect(screen.getByText(/January/)).toBeInTheDocument();
  });
});
