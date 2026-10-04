import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoTile } from '@/components/gallery/molecules/PhotoTile';
import type { Photo } from '@/types/gallery';

const photo: Photo = {
  id: 'p-1',
  name: 'Ocean',
  type: 'image/jpeg',
  width: 100,
  height: 100,
  size: 1000,
  color: '#3b82f6',
  tags: [],
  favorite: false,
  albumId: null,
  createdAt: 1,
  updatedAt: 1,
};

describe('PhotoTile', () => {
  it('links to the photo detail route', () => {
    render(<PhotoTile photo={photo} />);
    expect(screen.getByLabelText('Ocean')).toHaveAttribute(
      'href',
      '/gallery/photo?id=p-1'
    );
  });

  it('omits actions when no handlers are provided', () => {
    render(<PhotoTile photo={photo} />);
    expect(screen.queryByLabelText('Favorite Ocean')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Remove Ocean')).not.toBeInTheDocument();
  });

  it('toggles favorite', () => {
    const onToggleFavorite = jest.fn();
    render(<PhotoTile photo={photo} onToggleFavorite={onToggleFavorite} />);
    fireEvent.click(screen.getByLabelText('Favorite Ocean'));
    expect(onToggleFavorite).toHaveBeenCalledWith('p-1');
  });

  it('removes the photo', () => {
    const onRemove = jest.fn();
    render(<PhotoTile photo={photo} onRemove={onRemove} />);
    fireEvent.click(screen.getByLabelText('Remove Ocean'));
    expect(onRemove).toHaveBeenCalledWith('p-1');
  });

  it('marks a favorite with the warning fill', () => {
    render(
      <PhotoTile
        photo={{ ...photo, favorite: true }}
        onToggleFavorite={jest.fn()}
      />
    );
    expect(
      screen.getByLabelText('Favorite Ocean').querySelector('svg')
    ).toHaveClass('fill-warning');
  });
});
