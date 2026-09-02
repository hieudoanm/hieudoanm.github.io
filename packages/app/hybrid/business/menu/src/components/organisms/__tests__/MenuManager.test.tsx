import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuManager } from '../MenuManager';
import type { MenuStore } from '../types';
import type { MenuState } from '@/types/menu';
import { emptyMenu, createRestaurant } from '@/lib/menu';
import React from 'react';

let restaurantId = '';

const Wrapper: React.FC = () => {
  const [state, setState] = React.useState<MenuState>(() => {
    const { state: s, restaurant } = createRestaurant(emptyMenu(), {
      name: 'Test',
      accent: 'primary',
      tableCount: 1,
    });
    restaurantId = restaurant.id;
    return s;
  });
  const store: MenuStore = { state, setState, reset: () => { setState(emptyMenu()); } };
  return <MenuManager restaurantId={restaurantId} store={store} />;
};

describe('MenuManager', () => {
  it('shows empty state when no items', () => {
    render(<Wrapper />);
    expect(screen.getByText(/no items yet/i)).toBeInTheDocument();
  });

  it('adds a food item', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    await user.type(screen.getByPlaceholderText('Name'), 'Burger');
    await user.type(screen.getByPlaceholderText('Description'), 'Classic');
    await user.type(screen.getByPlaceholderText('Price'), '5.50');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.getByText('Classic')).toBeInTheDocument();
  });

  it('adds a drink item', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    await user.type(screen.getByPlaceholderText('Name'), 'Cola');
    await user.type(screen.getByPlaceholderText('Price'), '2');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Cola')).toBeInTheDocument();
  });

  it('toggles availability', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    await user.type(screen.getByPlaceholderText('Name'), 'Fries');
    await user.type(screen.getByPlaceholderText('Price'), '3');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const toggleBtn = screen.getByRole('button', { name: /in stock/i });
    await user.click(toggleBtn);
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
  });

  it('deletes an item', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    await user.type(screen.getByPlaceholderText('Name'), 'Soda');
    await user.type(screen.getByPlaceholderText('Price'), '2');
    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByText('Soda')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /remove item/i }));
    expect(screen.queryByText('Soda')).toBeNull();
  });

  it('filters by food and drink', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    await user.type(screen.getByPlaceholderText('Name'), 'Burger');
    await user.type(screen.getByPlaceholderText('Price'), '5');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const categorySelect = screen.getByDisplayValue('Food');
    await user.selectOptions(categorySelect, 'drink');
    await user.type(screen.getByPlaceholderText('Name'), 'Cola');
    await user.type(screen.getByPlaceholderText('Price'), '2');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.getByText('Cola')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^Drink$/i }));
    expect(screen.getByText('Cola')).toBeInTheDocument();
    expect(screen.queryByText('Burger')).toBeNull();

    await user.click(screen.getByRole('button', { name: /^Food$/i }));
    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.queryByText('Cola')).toBeNull();

    await user.click(screen.getByRole('button', { name: /^All$/i }));
    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.getByText('Cola')).toBeInTheDocument();
  });
});