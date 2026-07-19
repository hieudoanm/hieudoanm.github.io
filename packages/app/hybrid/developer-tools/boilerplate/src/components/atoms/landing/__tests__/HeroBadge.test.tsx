import { render, screen } from '@testing-library/react';
import { HeroBadge } from '../HeroBadge';

describe('HeroBadge', () => {
  it('renders the text', () => {
    render(<HeroBadge text="New" />);
    expect(screen.getByTestId('hero-badge')).toHaveTextContent('New');
  });

  it('renders the default sparkle icon', () => {
    render(<HeroBadge text="Launch" />);
    expect(screen.getByText('✨')).toBeInTheDocument();
  });

  it('renders a custom icon', () => {
    render(<HeroBadge text="Launch" icon="🚀" />);
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });
});
