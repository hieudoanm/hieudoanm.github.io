import { fireEvent, render, screen } from '@testing-library/react';
import { QuoteBuilderTemplate } from '../QuoteBuilderTemplate';

describe('QuoteBuilderTemplate', () => {
  it('renders the empty state with a zero total', () => {
    render(<QuoteBuilderTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Quote Builder' })
    ).toBeInTheDocument();
    expect(screen.getByText('No items yet')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('shows errors for missing name and invalid price', () => {
    render(<QuoteBuilderTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter an item name');
    fireEvent.change(screen.getByLabelText('Item name'), {
      target: { value: 'Setup fee' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid price');
  });

  it('adds and removes a line item', () => {
    render(<QuoteBuilderTemplate />);
    fireEvent.change(screen.getByLabelText('Item name'), {
      target: { value: 'Setup fee' },
    });
    fireEvent.change(screen.getByLabelText('Item price'), {
      target: { value: '500' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));
    expect(screen.getByText('Item added')).toBeInTheDocument();
    expect(screen.getByText('Setup fee — $500')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(screen.getByText('No items yet')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });
});
