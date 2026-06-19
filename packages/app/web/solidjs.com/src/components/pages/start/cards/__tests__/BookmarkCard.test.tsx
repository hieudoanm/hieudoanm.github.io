import { render, screen } from '@solidjs/testing-library';
import { BookmarkCard } from '../BookmarkCard';

describe('BookmarkCard', () => {
  const defaultProps = {
    label: 'GitHub',
    url: 'https://github.com',
    description: 'Code hosting',
    emoji: '🐙',
    color: '#333',
  };

  it('renders the label', () => {
    render(() => <BookmarkCard {...defaultProps} />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(() => <BookmarkCard {...defaultProps} />);
    expect(screen.getByText('Code hosting')).toBeInTheDocument();
  });

  it('renders the emoji', () => {
    render(() => <BookmarkCard {...defaultProps} />);
    expect(screen.getByText('🐙')).toBeInTheDocument();
  });

  it('renders a link with the correct href', () => {
    render(() => <BookmarkCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com');
  });

  it('opens link with noopener noreferrer', () => {
    render(() => <BookmarkCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders badge when provided', () => {
    render(() => <BookmarkCard {...defaultProps} badge="NEW" />);
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('does not render badge when not provided', () => {
    render(() => <BookmarkCard {...defaultProps} />);
    expect(screen.queryByText('NEW')).not.toBeInTheDocument();
  });
});
