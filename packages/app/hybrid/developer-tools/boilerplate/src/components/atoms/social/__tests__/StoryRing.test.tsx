import { render, screen } from '@testing-library/react';
import { StoryRing } from '../StoryRing';

describe('StoryRing', () => {
  it('renders the story name', () => {
    render(<StoryRing name="Jane" />);
    expect(screen.getByTestId('story-ring')).toHaveTextContent('Jane');
  });

  it('renders initial fallback', () => {
    render(<StoryRing name="Jane" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('applies faded style when viewed', () => {
    render(<StoryRing name="Jane" viewed />);
    expect(screen.getByTestId('story-ring').firstChild).toHaveClass(
      'opacity-40'
    );
  });
});
