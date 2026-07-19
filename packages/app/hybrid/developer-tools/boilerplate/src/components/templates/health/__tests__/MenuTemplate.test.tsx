import { fireEvent, render, screen, within } from '@testing-library/react';
import { MenuTemplate } from '../MenuTemplate';

describe('MenuTemplate', () => {
  it('renders the menu with dishes and prices', () => {
    render(<MenuTemplate />);
    expect(screen.getByRole('heading', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByText('Wild Mushroom Risotto')).toBeInTheDocument();
    expect(screen.getAllByText('$18')).toHaveLength(3);
    expect(screen.getByText('0 items · $0')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Add' })).toHaveLength(7);
  });

  it('filters dishes by category tab', () => {
    render(<MenuTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Desserts' }));
    expect(screen.getByText('Tiramisu')).toBeInTheDocument();
    expect(screen.queryByText('Ribeye Steak')).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Add' })).toHaveLength(2);
  });

  it('adds dishes to the cart and totals the price', () => {
    render(<MenuTemplate />);
    const addDish = (name: string) => {
      const row = screen.getByText(name).closest('li');
      fireEvent.click(
        within(row as HTMLElement).getByRole('button', { name: 'Add' })
      );
    };
    addDish('Wild Mushroom Risotto');
    addDish('Grilled Salmon');
    addDish('Ribeye Steak');
    expect(screen.getByText('3 items · $54')).toBeInTheDocument();
  });
});
