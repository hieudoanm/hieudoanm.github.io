import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchPage from '@/app/(app)/gallery/search/page';
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
  usePathname: () => '/gallery/search',
}));

const makePhoto = (id: string, name: string, tags: string[] = []): Photo => ({
  id,
  name,
  type: 'image/jpeg',
  width: 100,
  height: 100,
  size: 1000,
  color: '#3b82f6',
  tags,
  favorite: false,
  albumId: null,
  createdAt: 1,
  updatedAt: 1,
});

describe('SearchPage', () => {
  beforeEach(() => {
    mockGalleryDb.reset();
  });

  it('filters photos by name as the user types', async () => {
    mockGalleryDb.reset({
      photos: [makePhoto('p-1', 'Ocean'), makePhoto('p-2', 'Forest')],
    });
    render(<SearchPage />);
    await waitFor(() =>
      expect(screen.getByLabelText('Ocean')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByPlaceholderText('Search photos...'), {
      target: { value: 'oce' },
    });
    expect(screen.getByLabelText('Ocean')).toBeInTheDocument();
    expect(screen.queryByLabelText('Forest')).not.toBeInTheDocument();
    expect(screen.getByText('1 result')).toBeInTheDocument();
  });

  it('filters by tag', async () => {
    mockGalleryDb.reset({
      photos: [
        makePhoto('p-1', 'Ocean', ['nature']),
        makePhoto('p-2', 'Forest', ['nature']),
        makePhoto('p-3', 'City', ['urban']),
      ],
    });
    render(<SearchPage />);
    await waitFor(() =>
      expect(screen.getByText('#nature')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText('#nature'));
    expect(screen.getByLabelText('Ocean')).toBeInTheDocument();
    expect(screen.getByLabelText('Forest')).toBeInTheDocument();
    expect(screen.queryByLabelText('City')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('#nature'));
    expect(screen.getByLabelText('City')).toBeInTheDocument();
  });

  it('clears the query from the search bar', () => {
    mockGalleryDb.reset({ photos: [makePhoto('p-1', 'Ocean')] });
    render(<SearchPage />);
    fireEvent.change(screen.getByPlaceholderText('Search photos...'), {
      target: { value: 'xyz' },
    });
    fireEvent.click(screen.getByLabelText('Clear search'));
    expect(screen.getByPlaceholderText('Search photos...')).toHaveValue('');
  });

  it('shows the empty state when nothing matches', async () => {
    mockGalleryDb.reset({ photos: [makePhoto('p-1', 'Ocean')] });
    render(<SearchPage />);
    await waitFor(() =>
      expect(screen.getByLabelText('Ocean')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByPlaceholderText('Search photos...'), {
      target: { value: 'nothing' },
    });
    expect(screen.getByText('No photos found')).toBeInTheDocument();
  });
});
