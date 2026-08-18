import { render, screen } from '@testing-library/react';
import { StoryKicker } from '../StoryKicker';

describe('StoryKicker', () => {
  it('renders the kicker text', () => {
    render(<StoryKicker>Exclusive</StoryKicker>);
    expect(screen.getByTestId('story-kicker')).toHaveTextContent('Exclusive');
  });

  it('applies primary text class', () => {
    render(<StoryKicker>Exclusive</StoryKicker>);
    expect(screen.getByTestId('story-kicker')).toHaveClass('text-primary');
  });

  it('applies uppercase class', () => {
    render(<StoryKicker>Exclusive</StoryKicker>);
    expect(screen.getByTestId('story-kicker')).toHaveClass('uppercase');
  });
});
