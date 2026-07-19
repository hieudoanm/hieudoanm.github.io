import { render, screen } from '@testing-library/react';
import { Glow } from '../Glow';

describe('Glow', () => {
  it('renders children', () => {
    render(
      <Glow>
        <span>Highlight</span>
      </Glow>
    );
    expect(screen.getByText('Highlight')).toBeInTheDocument();
  });

  it('renders a decorative glow behind the content', () => {
    const { container } = render(
      <Glow color="accent" size="lg">
        <span>Glow me</span>
      </Glow>
    );
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass(
      'bg-accent/60'
    );
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass(
      'h-12',
      'w-12'
    );
  });
});
