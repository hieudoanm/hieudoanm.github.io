import { render, screen } from '@testing-library/react';
import { HashtagPage } from '../HashtagPage';

const posts = [
  {
    id: 'h1',
    author: 'Mia',
    content: 'Golden hour vibes',
    likes: 44,
    comments: 6,
  },
];

describe('HashtagPage', () => {
  it('renders the hashtag heading and stats', () => {
    render(
      <HashtagPage
        hashtag="sunset"
        stats={{ posts: 12000, followers: 800 }}
        posts={posts}
      />
    );
    expect(screen.getByText('#sunset')).toBeInTheDocument();
    expect(screen.getByText(/12,000 posts/)).toBeInTheDocument();
    expect(screen.getByText(/800 followers/)).toBeInTheDocument();
  });

  it('renders the hashtag posts', () => {
    render(
      <HashtagPage
        hashtag="sunset"
        stats={{ posts: 12000, followers: 800 }}
        posts={posts}
      />
    );
    expect(screen.getByText('Golden hour vibes')).toBeInTheDocument();
    expect(screen.getByText('Mia')).toBeInTheDocument();
    expect(screen.getByText(/44 likes/)).toBeInTheDocument();
  });

  it('renders an empty posts grid when no posts exist', () => {
    render(
      <HashtagPage
        hashtag="sunset"
        stats={{ posts: 0, followers: 0 }}
        posts={[]}
      />
    );
    expect(screen.getByTestId('hashtag-page')).toBeInTheDocument();
  });
});
