import { fireEvent, render, screen } from '@testing-library/react';
import { FollowersTemplate } from '../FollowersTemplate';

describe('FollowersTemplate', () => {
  it('renders people and the following summary', () => {
    render(<FollowersTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Followers' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 following')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('@janedoe')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Unfollow' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Follow' })).toHaveLength(3);
  });

  it('filters to only following', () => {
    render(<FollowersTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Following' }));
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.queryByText('Alex Chen')).not.toBeInTheDocument();
  });

  it('follows and unfollows a person', () => {
    render(<FollowersTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Follow' })[0]);
    expect(screen.getByText('4 following')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Unfollow' })[0]);
    expect(screen.getByText('3 following')).toBeInTheDocument();
  });
});
