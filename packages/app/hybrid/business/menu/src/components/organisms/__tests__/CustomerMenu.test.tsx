import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSearchParams } from 'next/navigation';
import CustomerMenu from '../CustomerMenu';
import { useMenuStore } from '@/hooks/useMenuStore';
import { encodeMenuData } from '@/lib/menu';
import type { Restaurant, MenuItem } from '@/types/menu';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@/hooks/useMenuStore', () => ({
  useMenuStore: jest.fn(),
}));

const restaurant: Restaurant = {
  id: 'rest-1',
  name: 'Test Place',
  description: 'Great food',
  accent: 'primary',
  tableCount: 4,
  createdAt: '2025-01-01',
};

const foodItem: MenuItem = {
  id: 'item-1',
  restaurantId: 'rest-1',
  name: 'Pizza',
  description: 'Cheesy',
  price: 1200,
  category: 'food',
  emoji: '🍕',
  available: true,
  sortOrder: 1,
  createdAt: '2025-01-01',
};

const drinkItem: MenuItem = {
  id: 'item-2',
  restaurantId: 'rest-1',
  name: 'Cola',
  description: 'Cold',
  price: 200,
  category: 'drink',
  emoji: '🥤',
  available: true,
  sortOrder: 2,
  createdAt: '2025-01-01',
};

const mockSetState = jest.fn();
let currentStore: any;

beforeEach(() => {
  jest.clearAllMocks();
  (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));
  currentStore = {
    state: { restaurants: [restaurant], items: [foodItem, drinkItem], orders: [] },
    setState: mockSetState,
    reset: jest.fn(),
  };
  (useMenuStore as jest.Mock).mockReturnValue(currentStore);
});

const setupWithMenu = (items: MenuItem[] = [foodItem, drinkItem]) => {
  const payload = encodeMenuData(restaurant, items);
  const params = new URLSearchParams({ d: payload });
  (useSearchParams as jest.Mock).mockReturnValue(params);
  currentStore.state = { restaurants: [restaurant], items, orders: [] };
};

describe('CustomerMenu', () => {
  it('shows error when d param is missing', () => {
    render(<CustomerMenu />);
    expect(screen.getByText(/menu unavailable/i)).toBeInTheDocument();
  });

  it('shows menu items when restaurant exists', () => {
    setupWithMenu();
    render(<CustomerMenu />);
    expect(screen.getByText('Test Place')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Cola')).toBeInTheDocument();
  });

  it('shows unavailable items as disabled', () => {
    const unavailable: MenuItem = { ...foodItem, available: false };
    setupWithMenu([unavailable]);
    render(<CustomerMenu />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Unavailable')).toBeInTheDocument();
  });

  it('adds items to cart and places order', async () => {
    const user = userEvent.setup();
    setupWithMenu();
    render(<CustomerMenu />);

    const addPizzaBtns = screen.getAllByRole('button', { name: /increase quantity/i });
    await user.click(addPizzaBtns[0]);

    expect(screen.getByText('1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /place order/i }));
    expect(mockSetState).toHaveBeenCalled();
    expect(screen.getByText(/order placed/i)).toBeInTheDocument();
  });

  it('shows subtotal when items are added', async () => {
    const user = userEvent.setup();
    setupWithMenu();
    render(<CustomerMenu />);

    const addPizzaBtns = screen.getAllByRole('button', { name: /increase quantity/i });
    await user.click(addPizzaBtns[0]);
    await user.click(addPizzaBtns[0]);

    expect(screen.getByText('$24.00')).toBeInTheDocument();
  });

  it('decreases quantity with minus button', async () => {
    const user = userEvent.setup();
    setupWithMenu();
    render(<CustomerMenu />);

    const addPizzaBtns = screen.getAllByRole('button', { name: /increase quantity/i });
    await user.click(addPizzaBtns[0]);
    await user.click(addPizzaBtns[0]);
    expect(screen.getByText('2')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /decrease quantity/i }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows table number from input', async () => {
    const user = userEvent.setup();
    setupWithMenu();
    render(<CustomerMenu />);

    await user.type(screen.getByPlaceholderText('Table #'), '5');
    expect(screen.getByText('Table 5')).toBeInTheDocument();
  });
});