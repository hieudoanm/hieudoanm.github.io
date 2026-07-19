import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RestaurantManager } from '../RestaurantManager';
import type { MenuStore } from '../types';
import { emptyMenu, createRestaurant } from '@/lib/menu';
import type { Restaurant } from '@/types/menu';
import React from 'react';

const Wrapper: React.FC<{
  children: (store: MenuStore, selected: Restaurant | null) => React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = React.useState(emptyMenu());
  const store: MenuStore = {
    state,
    setState,
    reset: () => setState(emptyMenu()),
  };
  return <>{children(store, null)}</>;
};

describe('RestaurantManager', () => {
  it('shows empty state when no restaurants', () => {
    render(
      <Wrapper>
        {(store, selected) => (
          <RestaurantManager
            store={store}
            selected={selected}
            onSelect={() => {}}
          />
        )}
      </Wrapper>
    );
    expect(screen.getByText('Menus')).toBeInTheDocument();
    expect(screen.queryByText('Open')).toBeNull();
  });

  it('creates a restaurant and shows it in the list', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        {(store, selected) => (
          <RestaurantManager
            store={store}
            selected={selected}
            onSelect={() => {}}
          />
        )}
      </Wrapper>
    );

    await user.type(
      screen.getByPlaceholderText(/e\.g\. the golden fork/i),
      'Burger Spot'
    );
    await user.click(screen.getByRole('button', { name: /create/i }));

    expect(screen.getByText('Burger Spot')).toBeInTheDocument();
    expect(screen.getByText(/0 items/)).toBeInTheDocument();
  });

  it('calls onSelect when clicking Open', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <Wrapper>
        {(store, selected) => (
          <RestaurantManager
            store={store}
            selected={selected}
            onSelect={onSelect}
          />
        )}
      </Wrapper>
    );

    await user.type(
      screen.getByPlaceholderText(/e\.g\. the golden fork/i),
      'Test'
    );
    await user.click(screen.getByRole('button', { name: /create/i }));
    await user.click(screen.getByRole('button', { name: /open/i }));

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Test' })
    );
  });

  it('deletes a restaurant', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        {(store, selected) => (
          <RestaurantManager
            store={store}
            selected={selected}
            onSelect={() => {}}
          />
        )}
      </Wrapper>
    );

    await user.type(
      screen.getByPlaceholderText(/e\.g\. the golden fork/i),
      'To Delete'
    );
    await user.click(screen.getByRole('button', { name: /create/i }));
    expect(screen.getByText('To Delete')).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteBtn);
    expect(screen.queryByText('To Delete')).toBeNull();
  });
});
