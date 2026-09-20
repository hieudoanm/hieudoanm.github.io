import CustomerMenu from '@/components/menu/CustomerMenu';
import { encodeMenuData, emptyMenu } from '@/lib/menu';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { MenuItem, MenuState, Restaurant } from '@/types/menu';

const setState = jest.fn();

let storeState: MenuState = emptyMenu();
let searchParam: string | null = null;

jest.mock('next/navigation', () => ({
  useSearchParams: () =>
    new URLSearchParams(searchParam ? { d: searchParam } : {}),
}));

jest.mock('@/hooks/menu/useMenuStore', () => ({
  useMenuStore: () => ({ state: storeState, setState, reset: jest.fn() }),
}));

const restaurant: Restaurant = {
  id: 'r1',
  name: 'Bistro',
  description: 'Italian food',
  accent: 'primary',
  tableCount: 10,
  createdAt: '2026-01-01T00:00:00.000Z',
};

const item = (overrides: Partial<MenuItem> = {}): MenuItem => ({
  id: 'i1',
  restaurantId: 'r1',
  name: 'Soup',
  price: 500,
  category: 'food',
  emoji: '🥣',
  available: true,
  sortOrder: 1,
  createdAt: '2026-01-01T00:00:00.000Z',
  ...overrides,
});

const payload = (items: MenuItem[] = [item()]): string =>
  encodeMenuData(restaurant, items);

describe('CustomerMenu', () => {
  beforeEach(() => {
    setState.mockClear();
    storeState = emptyMenu();
    searchParam = payload();
  });

  it('shows an unavailable message when the link has no menu data', () => {
    searchParam = null;
    render(<CustomerMenu />);
    expect(screen.getByText('Menu unavailable')).toBeInTheDocument();
  });

  it('shows an unavailable message when the payload is corrupt', () => {
    searchParam = 'not-a-valid-payload';
    render(<CustomerMenu />);
    expect(screen.getByText('Menu unavailable')).toBeInTheDocument();
  });

  it('renders the restaurant name from the shared link', () => {
    render(<CustomerMenu />);
    expect(screen.getByRole('heading', { name: 'Bistro' })).toBeInTheDocument();
  });

  it('renders the restaurant description when present', () => {
    render(<CustomerMenu />);
    expect(screen.getByText('Italian food')).toBeInTheDocument();
  });

  it('omits the description paragraph when absent', () => {
    searchParam = encodeMenuData({ ...restaurant, description: undefined }, [
      item(),
    ]);
    render(<CustomerMenu />);
    expect(screen.queryByText('Italian food')).not.toBeInTheDocument();
  });

  it('falls back to the snapshot items when the store has none', () => {
    render(<CustomerMenu />);
    expect(screen.getByText('Soup')).toBeInTheDocument();
  });

  it('prefers store items over snapshot items', () => {
    storeState = {
      ...emptyMenu(),
      items: [item({ id: 'i9', name: 'Store Ramen' })],
    };
    render(<CustomerMenu />);
    expect(screen.getByText('Store Ramen')).toBeInTheDocument();
    expect(screen.queryByText('Soup')).not.toBeInTheDocument();
  });

  it('shows the empty state per category when nothing is listed', () => {
    searchParam = payload([]);
    render(<CustomerMenu />);
    expect(screen.getAllByText('Nothing here yet.')).toHaveLength(2);
  });

  it('separates food and drinks into their own sections', () => {
    searchParam = payload([
      item(),
      item({ id: 'i2', name: 'Cola', category: 'drink' }),
    ]);
    render(<CustomerMenu />);
    expect(screen.getByRole('heading', { name: 'Food' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Drinks' })).toBeInTheDocument();
    expect(screen.getByText('Cola')).toBeInTheDocument();
  });

  it('marks unavailable items and hides their stepper', () => {
    searchParam = payload([item({ available: false })]);
    render(<CustomerMenu />);
    expect(screen.getByText('Unavailable')).toBeInTheDocument();
    expect(
      screen.queryByLabelText('Increase quantity')
    ).not.toBeInTheDocument();
  });

  it('reveals the decrease button only once a quantity is set', () => {
    render(<CustomerMenu />);
    expect(
      screen.queryByLabelText('Decrease quantity')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Increase quantity'));
    expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
  });

  it('increments and decrements the quantity', () => {
    render(<CustomerMenu />);
    const increase = screen.getByLabelText('Increase quantity');
    fireEvent.click(increase);
    fireEvent.click(increase);
    expect(screen.getByText('2')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('clears the quantity entry when decremented back to zero', () => {
    render(<CustomerMenu />);
    fireEvent.click(screen.getByLabelText('Increase quantity'));
    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(
      screen.queryByLabelText('Decrease quantity')
    ).not.toBeInTheDocument();
  });

  it('prompts to add items before the cart has lines', () => {
    render(<CustomerMenu />);
    expect(
      screen.getByText('Tap + to add food or drinks to your order.')
    ).toBeInTheDocument();
  });

  it('lists cart lines and totals once items are added', () => {
    render(<CustomerMenu />);
    fireEvent.click(screen.getByLabelText('Increase quantity'));
    expect(screen.getByText(/Soup × 1/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Place order · \$5\.00/ })
    ).toBeEnabled();
  });

  it('disables placing an order while the cart is empty', () => {
    render(<CustomerMenu />);
    expect(screen.getByRole('button', { name: /Place order/ })).toBeDisabled();
  });

  it('places an order and confirms it', async () => {
    render(<CustomerMenu />);
    fireEvent.click(screen.getByLabelText('Increase quantity'));
    fireEvent.change(screen.getByPlaceholderText('Your name (optional)'), {
      target: { value: 'Ana' },
    });
    fireEvent.change(screen.getByPlaceholderText('Table #'), {
      target: { value: '4' },
    });
    fireEvent.change(screen.getByPlaceholderText('Note (optional)'), {
      target: { value: 'no onions' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Place order/ }));

    await waitFor(() => expect(setState).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Order placed')).toBeInTheDocument();
    const nextState = setState.mock.calls[0][0] as MenuState;
    expect(nextState.orders).toHaveLength(1);
    expect(nextState.orders[0].customerName).toBe('Ana');
    expect(nextState.orders[0].tableNumber).toBe('4');
    expect(nextState.orders[0].note).toBe('no onions');
    expect(nextState.orders[0].subtotal).toBe(500);
  });

  it('shows a table badge after a table number is entered', () => {
    render(<CustomerMenu />);
    fireEvent.change(screen.getByPlaceholderText('Table #'), {
      target: { value: '12' },
    });
    expect(screen.getByText('Table 12')).toBeInTheDocument();
  });

  it('shows no table badge before a table number is entered', () => {
    render(<CustomerMenu />);
    expect(screen.queryByText(/^Table /)).not.toBeInTheDocument();
  });
});
