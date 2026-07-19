import { render, screen } from '@testing-library/react';
import { HoverGallery } from '../HoverGallery';

describe('HoverGallery', () => {
  it('renders one image per gallery item', () => {
    render(
      <HoverGallery
        images={[
          { src: '/a.png', alt: 'A' },
          { src: '/b.png', alt: 'B' },
        ]}
      />
    );
    expect(screen.getByRole('img', { name: 'A' })).toHaveAttribute(
      'src',
      '/a.png'
    );
    expect(screen.getByRole('img', { name: 'B' })).toBeInTheDocument();
  });

  it('applies the hover-gallery class to the figure', () => {
    const { container } = render(
      <HoverGallery images={[{ src: '/a.png', alt: 'A' }]} />
    );
    expect(container.querySelector('figure')).toHaveClass('hover-gallery');
  });
});
