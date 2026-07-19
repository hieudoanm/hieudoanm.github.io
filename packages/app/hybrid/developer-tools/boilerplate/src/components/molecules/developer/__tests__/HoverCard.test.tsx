import { render, screen } from '@testing-library/react';
import { HoverCard } from '../HoverCard';

describe('HoverCard', () => {
  it('renders the trigger and content', () => {
    render(
      <HoverCard
        trigger={<button>Hover</button>}
        content={<span>Details</span>}
      />
    );
    expect(screen.getByRole('button', { name: 'Hover' })).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('applies the side positioning class', () => {
    const { container } = render(
      <HoverCard trigger={<span>T</span>} content={<span>D</span>} side="top" />
    );
    expect(container.querySelector('[role="tooltip"]')).toHaveClass(
      'bottom-full',
      'mb-2'
    );
  });
});
