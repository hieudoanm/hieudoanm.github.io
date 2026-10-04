import { render, screen } from '@testing-library/react';
import { PhotoThumb } from '@/components/gallery/atoms/PhotoThumb';
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

describe('PhotoThumb', () => {
  it('renders a gradient thumbnail', () => {
    render(<PhotoThumb photo={photo} />);
    const thumb = screen.getByTestId('photo-thumb-p-1');
    expect(thumb).toBeInTheDocument();
    expect(thumb.getAttribute('style')).toContain('linear-gradient');
  });

  it('hides the name by default', () => {
    render(<PhotoThumb photo={photo} />);
    expect(screen.queryByText('Ocean')).not.toBeInTheDocument();
  });

  it('shows the name when requested', () => {
    render(<PhotoThumb photo={photo} showName />);
    expect(screen.getByText('Ocean')).toBeInTheDocument();
  });
});
