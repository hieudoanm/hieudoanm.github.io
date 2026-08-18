import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageLightbox } from '@/components/organisms/ImageLightbox';

describe('ImageLightbox', () => {
  const images = [
    'https://example.com/img1.jpg',
    'https://example.com/img2.jpg',
    'https://example.com/img3.jpg',
  ];

  it('renders image with correct src', () => {
    render(
      <ImageLightbox images={images} initialIndex={0} onClose={jest.fn()} />
    );
    const img = screen.getByRole('img', { name: /Image 1 of 3/i });
    expect(img).toHaveAttribute('src', images[0]);
  });

  it('prev/next buttons call correct navigation', () => {
    render(
      <ImageLightbox images={images} initialIndex={0} onClose={jest.fn()} />
    );
    const img = screen.getByRole('img', { name: /Image 1 of 3/i });
    fireEvent.click(screen.getByLabelText('Next image'));
    expect(img).toHaveAttribute('src', images[1]);
    fireEvent.click(screen.getByLabelText('Previous image'));
    expect(img).toHaveAttribute('src', images[0]);
  });

  it('keyboard ArrowLeft/ArrowRight navigates', () => {
    render(
      <ImageLightbox images={images} initialIndex={0} onClose={jest.fn()} />
    );
    const img = screen.getByRole('img', { name: /Image 1 of 3/i });
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(img).toHaveAttribute('src', images[1]);
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(img).toHaveAttribute('src', images[0]);
  });

  it('Escape calls onClose', () => {
    const onClose = jest.fn();
    render(
      <ImageLightbox images={images} initialIndex={0} onClose={onClose} />
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('zoom toggle changes scale', () => {
    render(
      <ImageLightbox images={images} initialIndex={0} onClose={jest.fn()} />
    );
    const img = screen.getByRole('img', { name: /Image 1 of 3/i });
    expect(img).toHaveStyle({ transform: 'scale(1)' });
    fireEvent.click(screen.getByLabelText('Zoom in'));
    expect(img).toHaveStyle({ transform: 'scale(2)' });
    fireEvent.click(screen.getByLabelText('Zoom out'));
    expect(img).toHaveStyle({ transform: 'scale(1)' });
  });

  it('clicking backdrop calls onClose', () => {
    const onClose = jest.fn();
    render(
      <ImageLightbox images={images} initialIndex={0} onClose={onClose} />
    );
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  it('counter shows correct position', () => {
    render(
      <ImageLightbox images={images} initialIndex={1} onClose={jest.fn()} />
    );
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Next image'));
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });

  it('does not show prev/next buttons for single image', () => {
    render(
      <ImageLightbox
        images={['single.jpg']}
        initialIndex={0}
        onClose={jest.fn()}
      />
    );
    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument();
  });
});
