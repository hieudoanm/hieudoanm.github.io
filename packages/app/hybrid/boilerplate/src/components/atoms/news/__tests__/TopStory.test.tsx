import { render, screen } from '@testing-library/react';
import { TopStory } from '../TopStory';

describe('TopStory', () => {
  it('renders default top story label', () => {
    render(<TopStory />);
    expect(screen.getByTestId('top-story')).toHaveTextContent('Top Story');
  });

  it('applies warning badge class', () => {
    render(<TopStory />);
    expect(screen.getByTestId('top-story')).toHaveClass('badge-warning');
  });

  it('renders rank when provided', () => {
    render(<TopStory rank={1} />);
    expect(screen.getByTestId('top-story')).toHaveTextContent('Top Story #1');
  });
});
