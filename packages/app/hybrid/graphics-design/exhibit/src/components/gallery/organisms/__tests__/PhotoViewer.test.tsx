import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoViewer } from '@/components/gallery/organisms/PhotoViewer';
import type { Photo } from '@/types/gallery';

const photo: Photo = {
  id: 'p-2',
  name: 'Ocean Waves',
  type: 'image/jpeg',
  width: 1600,
  height: 900,
  size: 1900000,
  color: '#3b82f6',
  tags: ['nature', 'ocean'],
  favorite: true,
  albumId: 'a-1',
  createdAt: 1,
  updatedAt: Date.now() - 3600000,
};

describe('PhotoViewer', () => {
  it('renders details, tags and metadata', () => {
    render(
      <PhotoViewer
        photo={photo}
        hasPrev
        hasNext
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />
    );
    expect(screen.getAllByText('Ocean Waves')).toHaveLength(2);
    expect(screen.getByText('#nature')).toBeInTheDocument();
    expect(screen.getByText('#ocean')).toBeInTheDocument();
    expect(screen.getByText('1600 × 900')).toBeInTheDocument();
    expect(screen.getByText('1.8 MB')).toBeInTheDocument();
    expect(screen.getByText('JPEG')).toBeInTheDocument();
    expect(screen.getByText('1h ago')).toBeInTheDocument();
  });

  it('enables prev and next when available', () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();
    render(
      <PhotoViewer
        photo={photo}
        hasPrev
        hasNext
        onPrev={onPrev}
        onNext={onNext}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Previous photo' })
    ).not.toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Next photo' })
    ).not.toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Previous photo' }));
    expect(onPrev).toHaveBeenCalled();
  });

  it('disables nav buttons when unavailable', () => {
    render(
      <PhotoViewer
        photo={photo}
        hasPrev={false}
        hasNext={false}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Previous photo' })
    ).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next photo' })).toBeDisabled();
  });

  it('hides the tag row for untagged photos', () => {
    const untagged = { ...photo, tags: [] };
    render(
      <PhotoViewer
        photo={untagged}
        hasPrev={false}
        hasNext={false}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />
    );
    expect(screen.queryByText('#nature')).not.toBeInTheDocument();
  });
});
