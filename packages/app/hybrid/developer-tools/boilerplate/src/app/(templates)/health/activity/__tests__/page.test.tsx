import { render, screen } from '@testing-library/react';
import ActivityPage from '@/app/(templates)/health/activity/page';

describe('ActivityPage', () => {
  it('renders the activity page', () => {
    render(<ActivityPage />);
    expect(
      screen.getByRole('heading', { name: 'Activity Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 entries today')).toBeInTheDocument();
  });
});
