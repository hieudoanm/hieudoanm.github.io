/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('react-icons/fi', () => ({
  FiCopy: () => <span data-testid="icon-copy" />,
  FiTrash2: () => <span data-testid="icon-trash" />,
  FiStar: () => <span data-testid="icon-star" />,
  FiSearch: () => <span data-testid="icon-search" />,
  FiX: () => <span data-testid="icon-x" />,
  FiClock: () => <span data-testid="icon-clock" />,
  FiDatabase: () => <span data-testid="icon-database" />,
  FiArrowLeft: () => <span data-testid="icon-arrow-left" />,
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => [],
  });
});

const ClipboardHistory = React.lazy(() => import('../ClipboardHistory'));

const renderWithSuspense = () =>
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <ClipboardHistory />
    </React.Suspense>
  );

describe('ClipboardHistory', () => {
  it('renders without crashing', async () => {
    renderWithSuspense();
    await waitFor(() => {
      expect(screen.getByText('Clipper')).toBeInTheDocument();
    });
  });

  it('displays empty state when no entries', async () => {
    renderWithSuspense();
    await waitFor(() => {
      expect(screen.getByText('No clipboard entries yet')).toBeInTheDocument();
    });
  });

  it('renders search input', async () => {
    renderWithSuspense();
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Search clipboard history...')
      ).toBeInTheDocument();
    });
  });

  it('renders clear button', async () => {
    renderWithSuspense();
    await waitFor(() => {
      expect(screen.getByText('Clear')).toBeInTheDocument();
    });
  });
});
