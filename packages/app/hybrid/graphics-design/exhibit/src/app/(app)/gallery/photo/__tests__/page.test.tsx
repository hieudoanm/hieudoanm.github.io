import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PhotoPage from '@/app/(app)/gallery/photo/page';
import { mockGalleryDb } from '@/test-helpers/gallery/fakeDb';
import type { Photo } from '@/types/gallery';

jest.mock(
  '@/lib/gallery/db',
  () => require('@/test-helpers/gallery/fakeDb').mockGalleryDb
);
jest.mock('@/data/gallery/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
}));

const mockPush = jest.fn();
let mockId = 'p-2';
jest.mock('next/navigation', () => ({
  usePathname: () => '/gallery/photo',
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({
    get: (key: string) => (key === 'id' ? mockId : null),
  }),
}));

const makePhoto = (id: string, name: string, updatedAt: number): Photo => ({
  id,
  name,
  type: 'image/jpeg',
  width: 100,
  height: 100,
  size: 1000,
  color: '#3b82f6',
  tags: ['nature'],
  favorite: false,
  albumId: null,
  createdAt: 1,
  updatedAt,
});

describe('PhotoPage', () => {
  beforeEach(() => {
    mockGalleryDb.reset();
    mockId = 'p-2';
    mockPush.mockClear();
  });

  it('shows Loading while empty', async () => {
    render(<PhotoPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows Photo not found for an unknown id', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'Ocean', 1)],
    });
    mockId = 'nope';
    render(<PhotoPage />);
    await waitFor(() =>
      expect(screen.getByText('Photo not found')).toBeInTheDocument()
    );
  });

  it('views the requested photo', async () => {
    mockGalleryDb.reset({ photos: [makePhoto('p-2', 'Sunset', 1)] });
    render(<PhotoPage />);
    await waitFor(() =>
      expect(screen.getAllByText('Sunset').length).toBeGreaterThan(0)
    );
    expect(screen.getByText('#nature')).toBeInTheDocument();
  });

  it('navigates to the next and previous photos', async () => {
    mockGalleryDb.reset({
      photos: [
        makePhoto('p-1', 'Ocean', 1),
        makePhoto('p-2', 'Sunset', 2),
        makePhoto('p-3', 'Forest', 3),
      ],
    });
    render(<PhotoPage />);
    await waitFor(() =>
      expect(screen.getAllByText('Sunset').length).toBeGreaterThan(0)
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next photo' }));
    expect(mockPush).toHaveBeenCalledWith('/gallery/photo?id=p-1');
    fireEvent.click(screen.getByRole('button', { name: 'Previous photo' }));
    expect(mockPush).toHaveBeenCalledWith('/gallery/photo?id=p-3');
  });

  it('disables prev on the oldest', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'Ocean', 1), makePhoto('p-2', 'Sunset', 2)],
    });
    mockId = 'p-1';
    render(<PhotoPage />);
    await waitFor(() =>
      expect(screen.getAllByText('Ocean').length).toBeGreaterThan(0)
    );
    expect(
      screen.getByRole('button', { name: 'Previous photo' })
    ).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next photo' })).toBeDisabled();
  });

  it('disables next on the newest', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'Ocean', 1), makePhoto('p-2', 'Sunset', 2)],
    });
    mockId = 'p-2';
    render(<PhotoPage />);
    await waitFor(() =>
      expect(screen.getAllByText('Sunset').length).toBeGreaterThan(0)
    );
    expect(
      screen.getByRole('button', { name: 'Previous photo' })
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Next photo' })
    ).not.toBeDisabled();
  });

  it('toggles favorite', async () => {
    mockGalleryDb.reset({ photos: [makePhoto('p-2', 'Sunset', 1)] });
    render(<PhotoPage />);
    await waitFor(() =>
      expect(screen.getAllByText('Sunset').length).toBeGreaterThan(0)
    );
    fireEvent.click(screen.getByLabelText('Toggle favorite'));
    await waitFor(() =>
      expect(mockGalleryDb.db.photos.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'p-2', favorite: true })
      )
    );
  });

  it('deletes the photo and navigates back', async () => {
    mockGalleryDb.reset({ photos: [makePhoto('p-2', 'Sunset', 1)] });
    render(<PhotoPage />);
    await waitFor(() =>
      expect(screen.getAllByText('Sunset').length).toBeGreaterThan(0)
    );
    fireEvent.click(screen.getByLabelText('Delete photo'));
    await waitFor(() =>
      expect(mockGalleryDb.db.photos.delete).toHaveBeenCalledWith('p-2')
    );
    expect(screen.getByText('Photo deleted')).toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith('/gallery');
  });
});
