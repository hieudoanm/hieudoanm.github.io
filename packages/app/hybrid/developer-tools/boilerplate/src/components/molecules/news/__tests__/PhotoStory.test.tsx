import { render, screen } from '@testing-library/react';
import { PhotoStory } from '../PhotoStory';

describe('PhotoStory', () => {
  it('renders the title', () => {
    render(<PhotoStory title="Sunset over the bay" />);
    expect(screen.getByText('Sunset over the bay')).toBeInTheDocument();
  });

  it('renders caption when provided', () => {
    render(<PhotoStory title="Bay" caption="Golden hour" />);
    expect(screen.getByText('Golden hour')).toBeInTheDocument();
  });

  it('renders photographer credit when provided', () => {
    render(<PhotoStory title="Bay" photographer="Minh Nguyen" />);
    expect(screen.getByText('Photo by Minh Nguyen')).toBeInTheDocument();
  });

  it('renders a link when href is provided', () => {
    render(<PhotoStory title="Gallery" href="/gallery/bay" />);
    expect(screen.getByRole('link', { name: 'Gallery' })).toHaveAttribute(
      'href',
      '/gallery/bay'
    );
  });
});
