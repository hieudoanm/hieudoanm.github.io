import { render, screen, fireEvent } from '@testing-library/react';
import { ItemCatalog } from '../ItemCatalog';
import { Item } from '@/types/pos';

const ITEMS: Item[] = [
  {
    id: '1',
    name: 'Coffee',
    price: 3.5,
    category: 'Drinks',
    stock: 100,
    lowStockThreshold: 10,
  },
  {
    id: '2',
    name: 'Sandwich',
    price: 6.0,
    category: 'Food',
    stock: 30,
    lowStockThreshold: 5,
  },
];

describe('ItemCatalog', () => {
  it('renders item names', () => {
    render(<ItemCatalog items={ITEMS} onAdd={jest.fn()} />);
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('Sandwich')).toBeInTheDocument();
  });

  it('renders item prices', () => {
    render(<ItemCatalog items={ITEMS} onAdd={jest.fn()} />);
    expect(screen.getByText('$3.50')).toBeInTheDocument();
    expect(screen.getByText('$6.00')).toBeInTheDocument();
  });

  it('renders item categories', () => {
    render(<ItemCatalog items={ITEMS} onAdd={jest.fn()} />);
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('calls onAdd when item is clicked', () => {
    const onAdd = jest.fn();
    render(<ItemCatalog items={ITEMS} onAdd={onAdd} />);
    fireEvent.click(screen.getByText('Coffee'));
    expect(onAdd).toHaveBeenCalledWith(ITEMS[0]);
  });
});
