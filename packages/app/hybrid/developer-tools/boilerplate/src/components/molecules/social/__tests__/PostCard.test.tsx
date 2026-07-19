import { render, screen } from '@testing-library/react';
import { PostCard } from '../PostCard';

describe('PostCard', () => {
  it('renders author and content', () => {
    render(<PostCard author="Jane Doe" content="Hello world" />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders engagement counts', () => {
    render(
      <PostCard
        author="Jane"
        content="Post"
        likes={10}
        comments={2}
        shares={1}
      />
    );
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders time when provided', () => {
    render(<PostCard author="Jane" content="Post" time="5 min ago" />);
    expect(screen.getByText('5 min ago')).toBeInTheDocument();
  });

  it('falls back to the author initial in the avatar', () => {
    const { container } = render(<PostCard author="Jane" content="Post" />);
    expect(container.querySelector('.avatar')).toBeInTheDocument();
    expect(screen.getByText('J')).toBeInTheDocument();
  });
});
