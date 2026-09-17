import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataProvider, useData } from '@/providers/gallery/DataProvider';
import { mockGalleryDb } from '@/test-helpers/gallery/fakeDb';
import type { Album, Photo } from '@/types/gallery';

jest.mock(
  '@/lib/gallery/db',
  () => require('@/test-helpers/gallery/fakeDb').mockGalleryDb
);
jest.mock('@/data/gallery/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
}));

const makePhoto = (
  id: string,
  name: string,
  updatedAt: number,
  overrides: Partial<Photo> = {}
): Photo => ({
  id,
  name,
  type: 'image/jpeg',
  width: 100,
  height: 100,
  size: 1000,
  color: '#000000',
  tags: [],
  favorite: false,
  albumId: null,
  createdAt: 1,
  updatedAt,
  ...overrides,
});

const makeAlbum = (
  id: string,
  name: string,
  photoIds: string[] = []
): Album => ({
  id,
  name,
  coverId: photoIds[0] ?? null,
  photoIds,
  createdAt: 1,
  updatedAt: 1,
});

const Probe = () => {
  const {
    photos,
    albums,
    isLoading,
    currentPhoto,
    setCurrentPhoto,
    createPhoto,
    updatePhoto,
    deletePhoto,
    toggleFavorite,
    createAlbum,
    renameAlbum,
    deleteAlbum,
    addPhotoToAlbum,
    removePhotoFromAlbum,
    refreshData,
  } = useData();
  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="current">{currentPhoto?.id ?? 'none'}</span>
      <ul>
        {photos.map((p) => (
          <li key={p.id} data-testid={`photo-${p.id}`}>
            {p.name}
            {p.favorite ? '*' : ''}
            {p.albumId ? `@${p.albumId}` : ''}
          </li>
        ))}
      </ul>
      <ul>
        {albums.map((a) => (
          <li key={a.id} data-testid={`album-${a.id}`}>
            {a.name}:{a.photoIds.join(',')}:{a.coverId ?? 'none'}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() =>
          createPhoto({
            name: 'New',
            type: 'image/png',
            width: 10,
            height: 10,
            size: 1,
            color: '#fff',
            tags: [],
            favorite: false,
            albumId: null,
          })
        }>
        Create
      </button>
      <button
        type="button"
        onClick={() => updatePhoto('p-1', { name: 'Updated' })}>
        Update
      </button>
      <button
        type="button"
        onClick={() => updatePhoto('missing', { name: 'X' })}>
        Update Missing
      </button>
      <button type="button" onClick={() => deletePhoto('p-1')}>
        Delete
      </button>
      <button type="button" onClick={() => toggleFavorite('p-1')}>
        Favorite
      </button>
      <button type="button" onClick={() => toggleFavorite('missing')}>
        Favorite Missing
      </button>
      <button type="button" onClick={() => createAlbum('  Trips  ')}>
        Create Album
      </button>
      <button type="button" onClick={() => renameAlbum('a-1', '  Renamed  ')}>
        Rename Album
      </button>
      <button type="button" onClick={() => renameAlbum('missing', 'X')}>
        Rename Album Missing
      </button>
      <button type="button" onClick={() => deleteAlbum('a-1')}>
        Delete Album
      </button>
      <button type="button" onClick={() => addPhotoToAlbum('p-1', 'a-1')}>
        Add To Album
      </button>
      <button type="button" onClick={() => addPhotoToAlbum('p-2', 'a-1')}>
        Add Second
      </button>
      <button type="button" onClick={() => addPhotoToAlbum('p-1', 'missing')}>
        Add Missing Album
      </button>
      <button type="button" onClick={() => removePhotoFromAlbum('p-1', 'a-1')}>
        Remove From Album
      </button>
      <button
        type="button"
        onClick={() => removePhotoFromAlbum('p-1', 'missing')}>
        Remove Missing Album
      </button>
      <button type="button" onClick={() => setCurrentPhoto(null)}>
        Clear Current
      </button>
      <button type="button" onClick={refreshData}>
        Refresh
      </button>
    </div>
  );
};

describe('DataProvider', () => {
  beforeEach(() => {
    mockGalleryDb.reset();
    jest.clearAllMocks();
  });

  it('throws when useData is used outside the provider', () => {
    expect(() => render(<Probe />)).toThrow(
      'useData must be used within DataProvider'
    );
  });

  it('loads photos sorted by updatedAt and albums by createdAt', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'Older', 100), makePhoto('p-2', 'Newer', 200)],
      albums: [
        { ...makeAlbum('a-2', 'Second'), createdAt: 2 },
        { ...makeAlbum('a-1', 'First'), createdAt: 1 },
      ],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    const names = screen.getAllByTestId(/^photo-/).map((n) => n.textContent);
    expect(names[0]).toContain('Newer');
    expect(names[1]).toContain('Older');
  });

  it('creates a photo with a generated id', async () => {
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() => expect(screen.getByText('New')).toBeInTheDocument());
    expect(mockGalleryDb.db.photos.put).toHaveBeenCalled();
  });

  it('updates an existing photo and ignores a missing one', async () => {
    mockGalleryDb.reset({ photos: [makePhoto('p-1', 'Original', 100)] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByText('Original')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Update' }));
    await waitFor(() =>
      expect(screen.getByText('Updated')).toBeInTheDocument()
    );
    mockGalleryDb.db.photos.put.mockClear();
    fireEvent.click(screen.getByRole('button', { name: 'Update Missing' }));
    expect(mockGalleryDb.db.photos.put).not.toHaveBeenCalled();
  });

  it('deletes a photo and detaches it from albums', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'Gone', 100)],
      albums: [makeAlbum('a-1', 'Work', ['p-1'])],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() => expect(screen.getByText('Gone')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(screen.queryByText('Gone')).not.toBeInTheDocument()
    );
    expect(mockGalleryDb.db.photos.delete).toHaveBeenCalledWith('p-1');
    await waitFor(() =>
      expect(screen.getByTestId('album-a-1')).toHaveTextContent('Work::none')
    );
  });

  it('toggles favorite and skips a missing photo', async () => {
    mockGalleryDb.reset({ photos: [makePhoto('p-1', 'Starred', 100)] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByText('Starred')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Favorite' }));
    await waitFor(() =>
      expect(screen.getByTestId('photo-p-1')).toHaveTextContent('Starred*')
    );
    mockGalleryDb.db.photos.put.mockClear();
    fireEvent.click(screen.getByRole('button', { name: 'Favorite Missing' }));
    expect(mockGalleryDb.db.photos.put).not.toHaveBeenCalled();
  });

  it('creates an album', async () => {
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Create Album' }));
    await waitFor(() => expect(screen.getByText(/Trips/)).toBeInTheDocument());
    expect(mockGalleryDb.db.albums.put).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Trips' })
    );
  });

  it('renames an album and skips a missing one', async () => {
    mockGalleryDb.reset({ albums: [makeAlbum('a-1', 'Old')] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('album-a-1')).toHaveTextContent('Old')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Rename Album' }));
    await waitFor(() =>
      expect(screen.getByTestId('album-a-1')).toHaveTextContent('Renamed')
    );
    mockGalleryDb.db.albums.put.mockClear();
    fireEvent.click(
      screen.getByRole('button', { name: 'Rename Album Missing' })
    );
    expect(mockGalleryDb.db.albums.put).not.toHaveBeenCalled();
  });

  it('deletes an album and detaches its photos', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'In Album', 100, { albumId: 'a-1' })],
      albums: [makeAlbum('a-1', 'Work', ['p-1'])],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('album-a-1')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete Album' }));
    await waitFor(() =>
      expect(mockGalleryDb.db.albums.delete).toHaveBeenCalledWith('a-1')
    );
    await waitFor(() =>
      expect(screen.getByTestId('photo-p-1').textContent).not.toContain('@a-1')
    );
    expect(mockGalleryDb.db.photos.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'p-1', albumId: null })
    );
  });

  it('adds a photo to an album once and skips duplicates', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'Pic', 100)],
      albums: [makeAlbum('a-1', 'Work')],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('album-a-1')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add To Album' }));
    await waitFor(() =>
      expect(screen.getByTestId('album-a-1')).toHaveTextContent('Work:p-1:p-1')
    );
    mockGalleryDb.db.albums.put.mockClear();
    fireEvent.click(screen.getByRole('button', { name: 'Add To Album' }));
    expect(mockGalleryDb.db.albums.put).not.toHaveBeenCalled();
  });

  it('adds a second photo without changing the cover', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'One', 100), makePhoto('p-2', 'Two', 200)],
      albums: [makeAlbum('a-1', 'Work', ['p-1'])],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('album-a-1')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add Second' }));
    await waitFor(() =>
      expect(screen.getByTestId('album-a-1')).toHaveTextContent('p-1,p-2')
    );
  });

  it('adds a photo to a missing album by updating only the photo', async () => {
    mockGalleryDb.reset({ photos: [makePhoto('p-1', 'Pic', 100)] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add Missing Album' }));
    await waitFor(() =>
      expect(screen.getByTestId('photo-p-1')).toHaveTextContent('@missing')
    );
    expect(mockGalleryDb.db.albums.put).not.toHaveBeenCalled();
  });

  it('removes a photo from an album and resets the cover', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'One', 100, { albumId: 'a-1' })],
      albums: [makeAlbum('a-1', 'Work', ['p-1'])],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('album-a-1')).toHaveTextContent('p-1')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Remove From Album' }));
    await waitFor(() =>
      expect(screen.getByTestId('album-a-1')).toHaveTextContent('Work::none')
    );
  });

  it('removes a photo from a missing album by clearing the photo albumId', async () => {
    mockGalleryDb.reset({ photos: [makePhoto('p-1', 'One', 100)] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Missing Album' })
    );
    expect(mockGalleryDb.db.albums.put).not.toHaveBeenCalled();
  });

  it('clears the current photo', async () => {
    mockGalleryDb.reset({ photos: [makePhoto('p-1', 'One', 100)] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Clear Current' }));
    expect(screen.getByTestId('current')).toHaveTextContent('none');
  });

  it('refreshes data on demand', async () => {
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    mockGalleryDb.db.photos.getAll.mockClear();
    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));
    await waitFor(() =>
      expect(mockGalleryDb.db.photos.getAll).toHaveBeenCalled()
    );
  });
});
