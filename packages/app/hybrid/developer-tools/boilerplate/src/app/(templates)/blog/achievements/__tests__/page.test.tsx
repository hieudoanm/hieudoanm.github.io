import { render, screen } from '@testing-library/react';
import AchievementsPage from '@/app/(templates)/blog/achievements/page';

describe('AchievementsPage', () => {
  it('renders the AchievementsPage', () => {
    render(<AchievementsPage />);
    expect(screen.getByText('4 of 8 achievements earned')).toBeInTheDocument();
  });
});
