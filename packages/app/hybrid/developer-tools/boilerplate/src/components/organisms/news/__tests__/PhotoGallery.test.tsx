import { fireEvent, render, screen } from '@testing-library/react';
import { PhotoGallery } from '../PhotoGallery';

const photos = [
  { imageAlt: 'Sunset over the bay', caption: 'Bay sunset' },
  { imageAlt: 'Parade on Main Street', caption: 'Street parade' },
];

describe('PhotoGallery', () => {
  it('renders gallery thumbnails', () => {
    render(<PhotoGallery photos={photos} />);
    expect(
      screen.getByRole('button', { name: 'Open photo: Bay sunset' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Open photo: Street parade' })
    ).toBeInTheDocument();
  });

  it('opens a lightbox when a photo is selected', () => {
    render(<PhotoGallery photos={photos} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Open photo: Bay sunset' })
    );
    expect(screen.getByTestId('photo-lightbox')).toBeInTheDocument();
    expect(screen.getByText('Bay sunset')).toBeInTheDocument();
    expect(screen.getAllByText('Sunset over the bay')).toHaveLength(2);
  });

  it('closes the lightbox', () => {
    render(<PhotoGallery photos={photos} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Open photo: Bay sunset' })
    );
    fireEvent.click(screen.getByTestId('photo-lightbox-close'));
    expect(screen.queryByTestId('photo-lightbox')).not.toBeInTheDocument();
  });

  it('handles an empty photos list', () => {
    render(<PhotoGallery photos={[]} />);
    expect(screen.getByTestId('photo-gallery')).toBeInTheDocument();
    expect(screen.queryByTestId('photo-lightbox')).not.toBeInTheDocument();
  });
});
