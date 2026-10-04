import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AlbumPage from '@/app/(app)/gallery/album/page';
import { mockGalleryDb } from '@/test-helpers/gallery/fakeDb';
import type { Album, Photo } from '@/types/gallery';

jest.mock(
  '@/lib/gallery/db',
  () => require('@/test-helpers/gallery/fakeDb').mockGalleryDb
);
jest.mock('@/data/gallery/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
}));

const mockPush = jest.fn();
let mockId = 'a-1';
jest.mock('next/navigation', () => ({
  usePathname: () => '/gallery/album',
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({
    get: (key: string) => (key === 'id' ? mockId : null),
  }),
}));

const album: Album = {
  id: 'a-1',
  name: 'Nature',
  coverId: 'p-1',
  photoIds: ['p-1', 'p-2'],
  createdAt: 1,
  updatedAt: 1,
};

const makePhoto = (id: string, name: string, updatedAt: number): Photo => ({
  id,
  name,
  type: 'image/jpeg',
  width: 100,
  height: 100,
  size: 1000,
  color: '#3b82f6',
  tags: [],
  favorite: false,
  albumId: 'a-1',
  createdAt: 1,
  updatedAt,
});

describe('AlbumPage', () => {
  beforeEach(() => {
    mockGalleryDb.reset();
    mockId = 'a-1';
    mockPush.mockClear();
  });

  it('shows Loading while empty', async () => {
    render(<AlbumPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows Album not found for an unknown id', async () => {
    mockGalleryDb.reset({
      albums: [album],
      photos: [makePhoto('p-1', 'Ocean', 1)],
    });
    mockId = 'nope';
    render(<AlbumPage />);
    await waitFor(() =>
      expect(screen.getByText('Album not found')).toBeInTheDocument()
    );
  });

  it('lists the photos in the album', async () => {
    mockGalleryDb.reset({
      albums: [album],
      photos: [makePhoto('p-1', 'Ocean', 1), makePhoto('p-2', 'Sunset', 2)],
    });
    render(<AlbumPage />);
    await waitFor(() =>
      expect(screen.getByLabelText('Ocean')).toBeInTheDocument()
    );
    expect(screen.getByLabelText('Sunset')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Nature' })).toBeInTheDocument();
  });

  it('shows an empty album', async () => {
    mockGalleryDb.reset({
      albums: [{ ...album, photoIds: [] }],
      photos: [],
    });
    render(<AlbumPage />);
    await waitFor(() =>
      expect(screen.getByText('This album is empty')).toBeInTheDocument()
    );
  });

  it('renames the album', async () => {
    mockGalleryDb.reset({ albums: [album], photos: [] });
    render(<AlbumPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Nature' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByLabelText('Rename album'));
    const input = screen.getByLabelText('Album name');
    fireEvent.change(input, { target: { value: 'Wildlife' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Wildlife' })
      ).toBeInTheDocument()
    );
    expect(screen.getByText('Album renamed')).toBeInTheDocument();
  });

  it('removes a photo from the album', async () => {
    mockGalleryDb.reset({
      albums: [album],
      photos: [makePhoto('p-1', 'Ocean', 1)],
    });
    render(<AlbumPage />);
    await waitFor(() =>
      expect(screen.getByLabelText('Ocean')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByLabelText('Remove Ocean'));
    await waitFor(() =>
      expect(screen.queryByLabelText('Ocean')).not.toBeInTheDocument()
    );
  });

  it('deletes the album and navigates back', async () => {
    mockGalleryDb.reset({ albums: [album], photos: [] });
    render(<AlbumPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Nature' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByLabelText('Delete album'));
    expect(screen.getByText('Delete album?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(mockGalleryDb.db.albums.delete).toHaveBeenCalledWith('a-1')
    );
    expect(mockPush).toHaveBeenCalledWith('/gallery/albums');
    await waitFor(() =>
      expect(screen.getByText('Album deleted')).toBeInTheDocument()
    );
  });

  it('cancels album deletion', async () => {
    mockGalleryDb.reset({ albums: [album], photos: [] });
    render(<AlbumPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Nature' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByLabelText('Delete album'));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText('Delete album?')).not.toBeInTheDocument();
  });
});
