import { render, screen } from '@testing-library/react';
import { AspectRatio } from '../AspectRatio';

describe('AspectRatio', () => {
  it('renders children inside a ratio box', () => {
    const { container } = render(
      <AspectRatio>
        <img src="/thumb.png" alt="Thumbnail" />
      </AspectRatio>
    );
    expect(screen.getByAltText('Thumbnail')).toBeInTheDocument();
    expect(
      container.querySelector('.relative')?.getAttribute('style')
    ).toContain('aspect-ratio');
  });

  it('applies a custom ratio', () => {
    const { container } = render(<AspectRatio ratio={1}>Square</AspectRatio>);
    expect(container.firstElementChild?.getAttribute('style')).toContain(
      'aspect-ratio: 1'
    );
  });
});
