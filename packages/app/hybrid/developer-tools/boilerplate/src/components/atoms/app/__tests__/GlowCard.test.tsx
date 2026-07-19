import { render, screen } from '@testing-library/react';
import { GlowCard } from '../GlowCard';

describe('GlowCard', () => {
  it('renders children and an optional title', () => {
    render(
      <GlowCard title="Stats">
        <span>Body</span>
      </GlowCard>
    );
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('applies the default primary glow class', () => {
    const { container } = render(<GlowCard>Content</GlowCard>);
    expect(container.firstChild).toHaveClass('hover:shadow-primary/30');
  });

  it('applies a custom glow color', () => {
    const { container } = render(<GlowCard color="success">Content</GlowCard>);
    expect(container.firstChild).toHaveClass('hover:shadow-success/30');
  });
});
