import { fireEvent, render, screen } from '@testing-library/react';
import { AchievementsTemplate } from '../AchievementsTemplate';

describe('AchievementsTemplate', () => {
  it('renders achievements with earned and locked badges', () => {
    render(<AchievementsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Achievements' })
    ).toBeInTheDocument();
    expect(screen.getByText('Badges you have earned.')).toBeInTheDocument();
    expect(screen.getByText('4 of 8 achievements earned')).toBeInTheDocument();
    expect(screen.getByText('First Steps')).toBeInTheDocument();
    expect(screen.getByText('Night Owl')).toBeInTheDocument();
    expect(screen.getAllByText('Earned')).toHaveLength(4);
    expect(screen.getAllByText('Locked')).toHaveLength(4);
  });

  it('hides locked achievements', () => {
    render(<AchievementsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Hide locked' }));
    expect(screen.getByText('First Steps')).toBeInTheDocument();
    expect(screen.queryByText('Night Owl')).not.toBeInTheDocument();
    expect(screen.getAllByText('Earned')).toHaveLength(4);
    expect(screen.queryByText('Locked')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show locked' })
    ).toBeInTheDocument();
  });

  it('shows locked achievements again after toggling', () => {
    render(<AchievementsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Hide locked' }));
    fireEvent.click(screen.getByRole('button', { name: 'Show locked' }));
    expect(screen.getByText('Night Owl')).toBeInTheDocument();
    expect(screen.getAllByText('Locked')).toHaveLength(4);
  });
});
