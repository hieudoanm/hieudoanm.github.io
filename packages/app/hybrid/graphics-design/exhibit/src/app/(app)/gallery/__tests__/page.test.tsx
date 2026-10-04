import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GalleryPage from '@/app/(app)/gallery/page';
import { mockGalleryDb } from '@/test-helpers/gallery/fakeDb';
import type { Photo } from '@/types/gallery';

jest.mock(
  '@/lib/gallery/db',
  () => require('@/test-helpers/gallery/fakeDb').mockGalleryDb
);
jest.mock('@/data/gallery/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('next/navigation', () => ({
  usePathname: () => '/gallery',
}));

const makePhoto = (
  id: string,
  name: string,
  updatedAt: number,
  favorite = false
): Photo => ({
  id,
  name,
  type: 'image/jpeg',
  width: 100,
  height: 100,
  size: 1000,
  color: '#3b82f6',
  tags: [],
  favorite,
  albumId: null,
  createdAt: 1,
  updatedAt,
});

describe('GalleryPage', () => {
  beforeEach(() => {
    mockGalleryDb.reset();
  });

  it('shows a loading skeleton then photos', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'Mountain', 2), makePhoto('p-2', 'Ocean', 1)],
    });
    render(<GalleryPage />);
    expect(screen.getAllByText('Photos').length).toBeGreaterThan(0);
    await waitFor(() =>
      expect(screen.getByLabelText('Mountain')).toBeInTheDocument()
    );
    expect(screen.getByLabelText('Ocean')).toBeInTheDocument();
  });

  it('renders a favorites row for favorited photos', async () => {
    mockGalleryDb.reset({
      photos: [
        makePhoto('p-1', 'Starred', 2, true),
        makePhoto('p-2', 'Plain', 1),
      ],
    });
    render(<GalleryPage />);
    await waitFor(() =>
      expect(screen.getByText('Favorites')).toBeInTheDocument()
    );
    expect(screen.getAllByLabelText('Starred')).toHaveLength(2);
  });

  it('sorts photos by name', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'Zebra', 1), makePhoto('p-2', 'Apple', 2)],
    });
    render(<GalleryPage />);
    await waitFor(() =>
      expect(screen.getByLabelText('Zebra')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByLabelText('Sort photos'), {
      target: { value: 'name' },
    });
    const names = screen
      .getAllByLabelText(/Apple|Zebra/)
      .map((n) => n.getAttribute('aria-label'));
    expect(names[0]).toContain('Apple');
  });

  it('uploads a photo via the file input', async () => {
    render(<GalleryPage />);
    await waitFor(() =>
      expect(screen.getByText('No photos yet')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByTestId('upload-input'), {
      target: {
        files: [new File(['x'], 'cat.png', { type: 'image/png' })],
      },
    });
    await waitFor(() =>
      expect(screen.getByLabelText('cat')).toBeInTheDocument()
    );
    expect(screen.getByText('Photo uploaded')).toBeInTheDocument();
  });

  it('opens the camera and captures a photo', async () => {
    render(<GalleryPage />);
    await waitFor(() =>
      expect(screen.getByText('No photos yet')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByLabelText('Take photo'));
    expect(screen.getByTestId('camera-capture')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Capture photo'));
    await waitFor(() =>
      expect(screen.getByLabelText('Capture 1')).toBeInTheDocument()
    );
    expect(screen.getByText('Photo captured')).toBeInTheDocument();
  });

  it('closes the camera without capturing', async () => {
    render(<GalleryPage />);
    await waitFor(() =>
      expect(screen.getByText('No photos yet')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByLabelText('Take photo'));
    fireEvent.click(screen.getByLabelText('Close camera'));
    expect(screen.queryByTestId('camera-capture')).not.toBeInTheDocument();
  });

  it('toggles a favorite from the grid', async () => {
    mockGalleryDb.reset({ photos: [makePhoto('p-1', 'Starred', 2)] });
    render(<GalleryPage />);
    await waitFor(() =>
      expect(screen.getByLabelText('Starred')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByLabelText('Favorite Starred'));
    await waitFor(() =>
      expect(mockGalleryDb.db.photos.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'p-1', favorite: true })
      )
    );
  });
});
