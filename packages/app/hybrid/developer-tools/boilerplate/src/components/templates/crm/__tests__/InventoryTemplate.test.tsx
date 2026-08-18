import { fireEvent, render, screen, within } from '@testing-library/react';
import { InventoryTemplate } from '../InventoryTemplate';

describe('InventoryTemplate', () => {
  it('renders inventory with low stock badges', () => {
    render(<InventoryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Inventory' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 items low on stock')).toBeInTheDocument();
    expect(screen.getAllByText('Low stock')).toHaveLength(4);
    expect(screen.getByText('11 in stock')).toBeInTheDocument();
    expect(screen.getByText('32 in stock')).toBeInTheDocument();
  });

  it('updates stock with plus and minus buttons', () => {
    render(<InventoryTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Decrease Mechanical Keyboard' })
    );
    expect(screen.getByText('5 items low on stock')).toBeInTheDocument();
    expect(screen.getAllByText('Low stock')).toHaveLength(5);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('10')).toHaveLength(2);
  });

  it('clamps stock at zero', () => {
    render(<InventoryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Desk Lamp' }));
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Desk Lamp' }));
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Desk Lamp' }));
    const table = screen.getByRole('table');
    expect(within(table).getByText('0')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Desk Lamp' }));
    fireEvent.click(screen.getByRole('button', { name: 'Increase Desk Lamp' }));
    expect(within(table).getAllByText('1')).toHaveLength(1);
  });
});
