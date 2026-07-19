import { render, screen } from '@testing-library/react';
import { ProfileTimeline } from '../ProfileTimeline';

const activities = [
  { id: 'a1', type: 'post' as const, title: 'Shared a photo', time: '1h' },
  {
    id: 'a2',
    type: 'share' as const,
    title: 'Reposted an article',
    time: '4h',
  },
];

describe('ProfileTimeline', () => {
  it('renders profile header, bio and stats', () => {
    render(
      <ProfileTimeline
        name="Mia Chen"
        handle="@mia"
        bio="Traveler and photographer"
        stats={{ posts: 42, followers: 120, following: 89 }}
        activities={activities}
      />
    );
    expect(screen.getByText('Mia Chen')).toBeInTheDocument();
    expect(screen.getByText('@mia')).toBeInTheDocument();
    expect(screen.getByText('Traveler and photographer')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('renders each activity with its type badge', () => {
    render(
      <ProfileTimeline
        name="Mia Chen"
        handle="@mia"
        stats={{ posts: 42, followers: 120, following: 89 }}
        activities={activities}
      />
    );
    expect(screen.getByText('Shared a photo')).toBeInTheDocument();
    expect(screen.getByText('Posted')).toBeInTheDocument();
    expect(screen.getByText('Shared')).toBeInTheDocument();
  });

  it('renders an empty timeline when no activities exist', () => {
    render(
      <ProfileTimeline
        name="Mia Chen"
        handle="@mia"
        stats={{ posts: 42, followers: 120, following: 89 }}
        activities={[]}
      />
    );
    expect(screen.getByTestId('profile-timeline')).toBeInTheDocument();
  });
});
