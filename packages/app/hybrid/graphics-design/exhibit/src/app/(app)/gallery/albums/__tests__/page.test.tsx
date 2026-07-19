import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AlbumsPage from '@/app/(app)/gallery/albums/page';
import { mockGalleryDb } from '@/test-helpers/gallery/fakeDb';
import type { Album, Photo } from '@/types/gallery';

jest.mock(
  '@/lib/gallery/db',
  () => require('@/test-helpers/gallery/fakeDb').mockGalleryDb
);
jest.mock('@/data/gallery/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('next/navigation', () => ({
  usePathname: () => '/gallery/albums',
}));

const album: Album = {
  id: 'a-1',
  name: 'Nature',
  coverId: null,
  photoIds: [],
  createdAt: 1,
  updatedAt: 1,
};

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
  albumId: 'a-1',
  createdAt: 1,
  updatedAt: 1,
};

describe('AlbumsPage', () => {
  beforeEach(() => {
    mockGalleryDb.reset();
  });

  it('shows an empty state with no albums', async () => {
    render(<AlbumsPage />);
    await waitFor(() =>
      expect(screen.getByText('No albums yet')).toBeInTheDocument()
    );
  });

  it('lists albums with cover art', async () => {
    mockGalleryDb.reset({
      albums: [{ ...album, coverId: 'p-1', photoIds: ['p-1'] }],
      photos: [photo],
    });
    render(<AlbumsPage />);
    await waitFor(() => expect(screen.getByText('Nature')).toBeInTheDocument());
    expect(screen.getByText('1 photo')).toBeInTheDocument();
    expect(screen.getByLabelText('Nature')).toHaveAttribute(
      'href',
      '/gallery/album?id=a-1'
    );
  });

  it('creates an album from the dialog', async () => {
    render(<AlbumsPage />);
    await waitFor(() =>
      expect(screen.getByText('No albums yet')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByLabelText('New album'));
    fireEvent.change(screen.getByLabelText('Album name'), {
      target: { value: '  Travel  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() => expect(screen.getByText('Travel')).toBeInTheDocument());
    expect(screen.getByText('Album created')).toBeInTheDocument();
    expect(mockGalleryDb.db.albums.put).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Travel' })
    );
  });

  it('cancels album creation', async () => {
    render(<AlbumsPage />);
    await waitFor(() =>
      expect(screen.getByText('No albums yet')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByLabelText('New album'));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByLabelText('Album name')).not.toBeInTheDocument();
  });
});
