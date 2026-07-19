import { render, screen } from '@testing-library/react';
import { MentionTag } from '../MentionTag';

describe('MentionTag', () => {
  it('renders the mention with at sign', () => {
    render(<MentionTag name="jane" />);
    expect(screen.getByTestId('mention-tag')).toHaveTextContent('@jane');
  });

  it('applies neutral badge class', () => {
    render(<MentionTag name="jane" />);
    expect(screen.getByTestId('mention-tag')).toHaveClass('badge-neutral');
  });

  it('renders as a link when href provided', () => {
    render(<MentionTag name="jane" href="/users/jane" />);
    expect(screen.getByRole('link', { name: 'jane' })).toHaveAttribute(
      'href',
      '/users/jane'
    );
  });
});
