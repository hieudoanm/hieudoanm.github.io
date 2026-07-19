import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockToggleFavorite = jest.fn();

jest.mock('@/lib/hooks', () => ({
  useFavorites: () => ({
    favorites: [],
    toggleFavorite: mockToggleFavorite,
    isFavorite: () => false,
  }),
  useRecentlyViewed: () => ({
    slugs: [],
    addRecent: jest.fn(),
  }),
  useSearchHistory: () => ({
    history: [],
    addSearch: jest.fn(),
    clearHistory: jest.fn(),
  }),
}));

jest.mock('next/navigation', () => ({
  useParams: () => ({}),
  usePathname: () => '/',
}));

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return { __esModule: true, default: MockLink };
});

import HomePage from '../page';

describe('HomePage', () => {
  beforeEach(() => {
    mockToggleFavorite.mockClear();
  });

  it('renders Store heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: 'Store' })).toBeTruthy();
  });

  it('renders search input', () => {
    render(<HomePage />);
    expect(screen.getByPlaceholderText('Search apps… (press /)')).toBeTruthy();
  });

  it('renders platform filter chips', () => {
    render(<HomePage />);
    expect(screen.getAllByText('All').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('macOS').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Windows')).toBeTruthy();
    expect(screen.getByText('Linux')).toBeTruthy();
    expect(screen.getAllByText('Android').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('iOS')).toBeTruthy();
  });

  it('renders category filter chips', () => {
    render(<HomePage />);
    expect(screen.getAllByText('Games').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Utilities').length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText('Developer Tools').length
    ).toBeGreaterThanOrEqual(1);
  });

  it('renders section headings', () => {
    render(<HomePage />);
    expect(screen.getAllByText('Hybrid').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Android').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('macOS').length).toBeGreaterThanOrEqual(1);
  });

  it('filters by search query', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.type(
      screen.getByPlaceholderText('Search apps… (press /)'),
      'Chess'
    );
    const cards = screen.getAllByText('View Details');
    expect(cards.length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Chess').length).toBeGreaterThanOrEqual(1);
  });

  it('shows no results message for unmatched query', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.type(
      screen.getByPlaceholderText('Search apps… (press /)'),
      'zzzznotfound'
    );
    expect(screen.getByText('No results match your filters')).toBeTruthy();
  });

  it('filters by platform chip', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const androidChip = screen.getAllByText('Android');
    await user.click(androidChip.find((el) => el.tagName === 'BUTTON')!);
    expect(screen.getByText('Clear filters')).toBeTruthy();
  });

  it('filters by category chip', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByRole('button', { name: 'Games' }));
    expect(screen.getByText('Clear filters')).toBeTruthy();
  });

  it('clears all filters', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByRole('button', { name: 'Games' }));
    await user.click(screen.getByText('Clear filters'));
    expect(screen.queryByText('Clear filters')).toBeNull();
  });

  it('shows result count with filters', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByRole('button', { name: 'Games' }));
    expect(screen.getByText(/\d+ apps/)).toBeTruthy();
  });

  it('search shows app count singular', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.type(
      screen.getByPlaceholderText('Search apps… (press /)'),
      'Chess'
    );
    expect(screen.getByText('1 app')).toBeTruthy();
  });

  it('renders sort buttons', () => {
    render(<HomePage />);
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getAllByText('Category').length).toBeGreaterThanOrEqual(1);
  });

  it('renders view toggle buttons', () => {
    render(<HomePage />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(5);
  });

  it('renders favorites button', () => {
    render(<HomePage />);
    expect(screen.getByText('\u2665 Favorites')).toBeTruthy();
  });

  it('toggles favorites filter on click', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const favBtn = screen.getByText('\u2665 Favorites');
    await user.click(favBtn);
    expect(screen.getByText('Clear filters')).toBeTruthy();
    await user.click(favBtn);
    expect(screen.queryByText('Clear filters')).toBeNull();
  });

  it('toggles sort by name on double click', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const nameBtn = screen.getByText('Name');
    await user.click(nameBtn);
    await user.click(nameBtn);
    const viewDetails = screen.getAllByText('View Details');
    expect(viewDetails.length).toBeGreaterThan(0);
  });

  it('switches to list view via list button', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const allButtons = screen.getAllByRole('button');
    const listBtn = allButtons[allButtons.length - 2];
    await user.click(listBtn);
    expect(screen.getAllByRole('link').length).toBeGreaterThan(5);
  });

  it('clicking platform "All" chip sets filter to all', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const allPlatformChip = screen.getAllByText('All')[0];
    await user.click(allPlatformChip);
    expect(screen.queryByText('Clear filters')).toBeNull();
  });

  it('clicking category "All" chip resets category', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByRole('button', { name: 'Games' }));
    const categoryAllChips = screen.getAllByText('All');
    const categoryAllChip = categoryAllChips[categoryAllChips.length - 1];
    await user.click(categoryAllChip);
    expect(screen.queryByText('Clear filters')).toBeNull();
  });

  it('search with suggestions dropdown', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const input = screen.getByPlaceholderText('Search apps… (press /)');
    await user.type(input, 'Ch');
    expect(input.getAttribute('value')).toBe('Ch');
  });

  it('toggles sort by category', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const categoryBtn = screen
      .getAllByText('Category')
      .find((el) => el.tagName === 'BUTTON');
    await user.click(categoryBtn!);
    const viewDetails = screen.getAllByText('View Details');
    expect(viewDetails.length).toBeGreaterThan(0);
  });

  it('clears filter by toggling active platform back to all', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const androidChip = screen.getAllByText('Android');
    await user.click(androidChip.find((el) => el.tagName === 'BUTTON')!);
    expect(screen.getByText('Clear filters')).toBeTruthy();
    const allChip = screen.getAllByText('All')[0];
    await user.click(allChip);
    expect(screen.queryByText('Clear filters')).toBeNull();
  });
});
