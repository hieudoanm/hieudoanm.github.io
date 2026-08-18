import { fireEvent, render, screen } from '@testing-library/react';
import { CompareTemplate } from '../CompareTemplate';

describe('CompareTemplate', () => {
  it('renders comparison table with three products', () => {
    render(<CompareTemplate />);
    expect(screen.getByText('Compare (3)')).toBeInTheDocument();
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getAllByText('$349').length).toBe(2);
    expect(screen.getByText('4.7 / 5')).toBeInTheDocument();
    expect(screen.getAllByText('In stock').length).toBe(2);
    expect(screen.getByText('Low stock')).toBeInTheDocument();
    expect(screen.getByText('Adjustable height')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Remove / })).toHaveLength(3);
  });

  it('adds a fourth product column via the select', () => {
    render(<CompareTemplate />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Add product' }), {
      target: { value: '4' },
    });
    expect(screen.getByText('Compare (4)')).toBeInTheDocument();
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
    expect(screen.getByText('Silent clicks')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Remove / })).toHaveLength(4);
  });

  it('removes a product column via the X button', () => {
    render(<CompareTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Mechanical Keyboard' })
    );
    expect(screen.getByText('Compare (2)')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Remove Mechanical Keyboard' })
    ).not.toBeInTheDocument();
  });

  it('re-adds a removed product via the select', () => {
    render(<CompareTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Mechanical Keyboard' })
    );
    fireEvent.change(screen.getByRole('combobox', { name: 'Add product' }), {
      target: { value: '2' },
    });
    expect(screen.getByText('Compare (3)')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Remove Mechanical Keyboard' })
    ).toBeInTheDocument();
  });

  it('ignores an empty select change', () => {
    render(<CompareTemplate />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Add product' }), {
      target: { value: '' },
    });
    expect(screen.getByText('Compare (3)')).toBeInTheDocument();
  });

  it('shows empty state when all products are removed', () => {
    render(<CompareTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Ergonomic Chair' })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Mechanical Keyboard' })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Studio Headphones' })
    );
    expect(
      screen.getByText('Add products to start comparing')
    ).toBeInTheDocument();
  });
});
