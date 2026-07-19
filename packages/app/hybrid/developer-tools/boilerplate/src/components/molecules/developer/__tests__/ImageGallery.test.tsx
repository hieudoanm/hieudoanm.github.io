import { fireEvent, render, screen } from '@testing-library/react';
import { ImageGallery } from '../ImageGallery';

describe('ImageGallery', () => {
  const images = [
    { src: '/one.png', alt: 'First photo' },
    { src: '/two.png', alt: 'Second photo' },
    { src: '/three.png', alt: 'Third photo' },
  ];

  it('shows the first image by default', () => {
    render(<ImageGallery images={images} />);
    expect(screen.getByRole('img', { name: 'First photo' })).toHaveAttribute(
      'src',
      '/one.png'
    );
  });

  it('switches the active image when a thumbnail is clicked', () => {
    render(<ImageGallery images={images} />);
    fireEvent.click(screen.getByRole('button', { name: 'Show Second photo' }));
    expect(screen.getByRole('img', { name: 'Second photo' })).toHaveAttribute(
      'src',
      '/two.png'
    );
  });

  it('returns null when there are no images', () => {
    const { container } = render(<ImageGallery images={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
