import { fireEvent, render, screen, within } from '@testing-library/react';
import { ProductsTemplate } from '../ProductsTemplate';

describe('ProductsTemplate', () => {
  it('renders products with status badges and the active summary', () => {
    render(<ProductsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Products' })
    ).toBeInTheDocument();
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getByText('CH-001')).toBeInTheDocument();
    expect(screen.getByText('4 active products')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(4);
    expect(within(table).getAllByText('Draft')).toHaveLength(2);
  });

  it('filters products by status', () => {
    render(<ProductsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Draft' }));
    expect(screen.getByText('Desk Lamp')).toBeInTheDocument();
    expect(screen.queryByText('Ergonomic Chair')).not.toBeInTheDocument();
    expect(screen.getByText('0 active products')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.queryByText('Desk Lamp')).not.toBeInTheDocument();
    expect(screen.getByText('4 active products')).toBeInTheDocument();
  });

  it('toggles a product between active and draft', () => {
    render(<ProductsTemplate />);
    expect(screen.getAllByRole('button', { name: 'Deactivate' })).toHaveLength(
      4
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Deactivate' })[0]);
    expect(screen.getAllByRole('button', { name: 'Deactivate' })).toHaveLength(
      3
    );
    expect(screen.getAllByRole('button', { name: 'Activate' })).toHaveLength(3);
    expect(screen.getByText('3 active products')).toBeInTheDocument();
  });
});
