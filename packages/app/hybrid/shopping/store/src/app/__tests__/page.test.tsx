import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '../page';

jest.mock('next/navigation', () => ({
  useParams: () => ({}),
  usePathname: () => '/',
}));

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return { __esModule: true, default: MockLink };
});

describe('HomePage', () => {
  it('renders Store heading', async () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: 'Store' })).toBeTruthy();
  });

  it('renders search input', () => {
    render(<HomePage />);
    expect(screen.getByPlaceholderText('Search apps…')).toBeTruthy();
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
    await user.type(screen.getByPlaceholderText('Search apps…'), 'Chess');
    const cards = screen.getAllByText('View Details');
    expect(cards.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Chess')).toBeTruthy();
  });

  it('shows no results message for unmatched query', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.type(
      screen.getByPlaceholderText('Search apps…'),
      'zzzznotfound'
    );
    expect(screen.getByText('No results match your filters')).toBeTruthy();
  });

  it('filters by platform chip', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const androidChip = screen.getAllByText('Android');
    // Click the platform chip (not the section heading)
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
    await user.type(screen.getByPlaceholderText('Search apps…'), 'Chess');
    expect(screen.getByText('1 app')).toBeTruthy();
  });
});
