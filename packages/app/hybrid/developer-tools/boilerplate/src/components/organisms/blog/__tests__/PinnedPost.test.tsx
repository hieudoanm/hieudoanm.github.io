import { render, screen } from '@testing-library/react';
import { PinnedPost } from '../PinnedPost';

describe('PinnedPost', () => {
  it('renders title, excerpt, and meta', () => {
    render(
      <PinnedPost
        title="Important announcement"
        excerpt="Read this first."
        author="Jane"
        date="Feb 2026"
      />
    );
    expect(screen.getByText('Important announcement')).toBeInTheDocument();
    expect(screen.getByText('Read this first.')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Feb 2026')).toBeInTheDocument();
  });

  it('renders tags and pinned indicator', () => {
    render(<PinnedPost title="Post" tags={['News', 'Update']} />);
    expect(screen.getByText('Pinned')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('Update')).toBeInTheDocument();
  });

  it('applies primary card classes', () => {
    render(<PinnedPost title="Post" />);
    expect(screen.getByTestId('pinned-post')).toHaveClass('bg-primary');
  });
});
