import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RestaurantDashboard from '../RestaurantDashboard';
import { useMenuStore } from '@/hooks/useMenuStore';
import type { MenuStore } from '../types';
import React from 'react';

jest.mock('@/hooks/useMenuStore', () => ({
  useMenuStore: jest.fn(),
}));

// RestaurantDashboard manages its own selected/tab state internally,
// so we provide store via the mocked hook in a wrapping component.
const DashboardWithStore: React.FC = () => {
  const store = useMenuStore() as MenuStore;
  return <RestaurantDashboard store={store} />;
};

beforeEach(() => {
  jest.clearAllMocks();
  let state = { restaurants: [], items: [], orders: [] };
  const store = {
    state,
    setState: (updater: any) => {
      state = typeof updater === 'function' ? updater(state) : updater;
      store.state = state;
    },
    reset: jest.fn(),
  };
  store.state = state;
  (useMenuStore as jest.Mock).mockReturnValue(store);
});

describe('RestaurantDashboard', () => {
  it('renders without crashing', () => {
    render(<DashboardWithStore />);
    expect(screen.getByText('Menus')).toBeInTheDocument();
  });

  it('creates a restaurant and shows management panel', async () => {
    const user = userEvent.setup();
    render(<DashboardWithStore />);

    await user.type(
      screen.getByPlaceholderText(/e\.g\. the golden fork/i),
      'My Place'
    );
    await user.click(screen.getByRole('button', { name: /create/i }));

    expect(screen.getAllByText('My Place').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });

  it('switches between menu and share tabs', async () => {
    const user = userEvent.setup();
    render(<DashboardWithStore />);

    await user.type(
      screen.getByPlaceholderText(/e\.g\. the golden fork/i),
      'Cafe'
    );
    await user.click(screen.getByRole('button', { name: /create/i }));

    await user.click(screen.getByRole('button', { name: /share/i }));
    expect(screen.getByText(/share the menu/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /menu$/i }));
    expect(screen.getByText(/no items yet/i)).toBeInTheDocument();
  });
});
