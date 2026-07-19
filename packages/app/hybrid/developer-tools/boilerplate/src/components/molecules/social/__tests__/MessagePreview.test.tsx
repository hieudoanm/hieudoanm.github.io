import { render, screen } from '@testing-library/react';
import { MessagePreview } from '../MessagePreview';

describe('MessagePreview', () => {
  it('renders name and preview text', () => {
    render(<MessagePreview name="Tuan" preview="See you tomorrow" />);
    expect(screen.getByText('Tuan')).toBeInTheDocument();
    expect(screen.getByText('See you tomorrow')).toBeInTheDocument();
  });

  it('renders time when provided', () => {
    render(<MessagePreview name="Tuan" preview="Hi" time="14:30" />);
    expect(screen.getByText('14:30')).toBeInTheDocument();
  });

  it('renders the unread badge when unread is positive', () => {
    render(<MessagePreview name="Tuan" preview="Hi" unread={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('does not render the unread badge when unread is zero', () => {
    render(<MessagePreview name="Tuan" preview="Hi" />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });
});
