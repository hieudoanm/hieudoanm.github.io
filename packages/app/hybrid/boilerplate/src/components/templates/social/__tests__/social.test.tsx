import { fireEvent, render, screen } from '@testing-library/react';
import { EventsTemplate } from '../EventsTemplate';
import { FeedTemplate } from '../FeedTemplate';
import { FollowersTemplate } from '../FollowersTemplate';
import { GroupsTemplate } from '../GroupsTemplate';
import { MessagesTemplate } from '../MessagesTemplate';
import EventsPage from '@/app/(templates)/social/events/page';
import FeedPage from '@/app/(templates)/social/feed/page';
import FollowersPage from '@/app/(templates)/social/followers/page';
import GroupsPage from '@/app/(templates)/social/groups/page';
import MessagesPage from '@/app/(templates)/social/messages/page';

describe('FeedTemplate', () => {
  it('renders posts with authors, text and like counts', () => {
    render(<FeedTemplate />);
    expect(screen.getByRole('heading', { name: 'Feed' })).toBeInTheDocument();
    expect(screen.getByText('4 posts')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Alex Chen')).toBeInTheDocument();
    expect(screen.getByText('Like 24')).toBeInTheDocument();
    expect(screen.getByText(/Liked 12/)).toBeInTheDocument();
  });

  it('toggles like on a post', () => {
    render(<FeedTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Like 24' }));
    expect(screen.getByText('Liked 25')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Liked 25' }));
    expect(screen.getByText('Like 24')).toBeInTheDocument();
  });

  it('posts a comment to a specific feed item', () => {
    render(<FeedTemplate />);
    fireEvent.change(
      screen.getByLabelText("Add a comment on Jane Doe's post"),
      { target: { value: 'Looking forward to the update' } }
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Post' })[0]);
    expect(
      screen.getByText('You: Looking forward to the update')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('You: Already saw the update')
    ).not.toBeInTheDocument();
  });
});

describe('MessagesTemplate', () => {
  it('renders threads and the selected conversation', () => {
    render(<MessagesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Messages' })
    ).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Alex Chen')).toBeInTheDocument();
    expect(screen.getByText('Sam Rivera')).toBeInTheDocument();
    expect(screen.getByText('Conversation with Jane Doe')).toBeInTheDocument();
    expect(
      screen.getByText('Jane Doe: Are we still on for Friday?')
    ).toBeInTheDocument();
  });

  it('selects another thread and clears unread', () => {
    render(<MessagesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Alex Chen/ }));
    expect(screen.getByText('Conversation with Alex Chen')).toBeInTheDocument();
    expect(
      screen.getByText('Alex Chen: Thanks for the review!')
    ).toBeInTheDocument();
  });

  it('sends a message to the selected thread', () => {
    render(<MessagesTemplate />);
    fireEvent.change(screen.getByLabelText('Type a message'), {
      target: { value: 'Sounds good' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByText('You: Sounds good')).toBeInTheDocument();
  });
});

describe('EventsTemplate', () => {
  it('renders events with date, location and RSVP state', () => {
    render(<EventsTemplate />);
    expect(screen.getByRole('heading', { name: 'Events' })).toBeInTheDocument();
    expect(screen.getByText('5 events')).toBeInTheDocument();
    expect(
      screen.getByText('TypeScript Meetup: Generics Deep Dive')
    ).toBeInTheDocument();
    expect(screen.getByText('Aug 12, 2026')).toBeInTheDocument();
    expect(screen.getByText('Downtown Hub')).toBeInTheDocument();
    expect(screen.getAllByText('Attending')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'RSVP' })).toHaveLength(3);
  });

  it('filters events by Upcoming and Past', () => {
    render(<EventsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Upcoming' }));
    expect(screen.getByText('3 events')).toBeInTheDocument();
    expect(
      screen.queryByText('Hackathon: Accessibility Edition')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Past' }));
    expect(screen.getByText('2 events')).toBeInTheDocument();
    expect(
      screen.getByText('Hackathon: Accessibility Edition')
    ).toBeInTheDocument();
  });

  it('RSVPs to an event', () => {
    render(<EventsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'RSVP' })[0]);
    expect(screen.getAllByText('Attending')).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'RSVP' })).toHaveLength(2);
  });
});

describe('GroupsTemplate', () => {
  it('renders groups with member counts', () => {
    render(<GroupsTemplate />);
    expect(screen.getByRole('heading', { name: 'Groups' })).toBeInTheDocument();
    expect(screen.getByText('3 groups joined')).toBeInTheDocument();
    expect(screen.getByText('Next.js Developers')).toBeInTheDocument();
    expect(screen.getByText('12,840 members')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Join' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Leave' })).toHaveLength(3);
  });

  it('joins and leaves a group updating the count', () => {
    render(<GroupsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Join' })[0]);
    expect(screen.getByText('4 groups joined')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Leave' })[0]);
    expect(screen.getByText('3 groups joined')).toBeInTheDocument();
  });
});

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

describe('Social pages', () => {
  it('renders the feed page', () => {
    render(<FeedPage />);
    expect(screen.getByRole('heading', { name: 'Feed' })).toBeInTheDocument();
  });

  it('renders the messages page', () => {
    render(<MessagesPage />);
    expect(
      screen.getByRole('heading', { name: 'Messages' })
    ).toBeInTheDocument();
  });

  it('renders the events page', () => {
    render(<EventsPage />);
    expect(screen.getByRole('heading', { name: 'Events' })).toBeInTheDocument();
  });

  it('renders the groups page', () => {
    render(<GroupsPage />);
    expect(screen.getByRole('heading', { name: 'Groups' })).toBeInTheDocument();
  });

  it('renders the followers page', () => {
    render(<FollowersPage />);
    expect(
      screen.getByRole('heading', { name: 'Followers' })
    ).toBeInTheDocument();
  });
});
