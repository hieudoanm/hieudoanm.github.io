import { render, screen } from '@testing-library/react';
import SleepPage from '@/app/(templates)/health/sleep/page';

describe('SleepPage', () => {
  it('renders the sleep page', () => {
    render(<SleepPage />);
    expect(
      screen.getByRole('heading', { name: 'Sleep Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 nights tracked')).toBeInTheDocument();
  });
});
