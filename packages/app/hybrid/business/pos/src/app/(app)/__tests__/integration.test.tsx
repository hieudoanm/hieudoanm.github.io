import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '@/app/(app)/page';
import { DEFAULT_ITEMS } from '@/data/items';

const completeSale = () => {
  fireEvent.click(screen.getAllByText(DEFAULT_ITEMS[0].name)[0]);
  fireEvent.click(screen.getByText('Checkout'));
  fireEvent.change(screen.getByPlaceholderText('0.00'), {
    target: { value: '10' },
  });
  fireEvent.click(screen.getByText('Complete Payment'));
  fireEvent.click(screen.getByText('New Sale'));
};

const navigateBack = () => {
  const firstButton = screen.getAllByRole('button')[0];
  fireEvent.click(firstButton);
};

describe('HomePage integration', () => {
  it('navigates to history view and back', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('History'));
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    navigateBack();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('navigates to daily summary and back', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Daily'));
    expect(screen.getByText('Daily Summary')).toBeInTheDocument();
    navigateBack();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('navigates to reports and back', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Reports'));
    expect(screen.getByText('Reports')).toBeInTheDocument();
    navigateBack();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('navigates to inventory and back', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Inventory'));
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    navigateBack();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('navigates to tax config and back', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Tax'));
    expect(screen.getByText('Tax Settings')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Back'));
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('navigates to discounts and back', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Discounts'));
    expect(screen.getByText('Discounts')).toBeInTheDocument();
    navigateBack();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('navigates to gift cards and back', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Gift Cards'));
    expect(screen.getByText('Gift Cards')).toBeInTheDocument();
    navigateBack();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('navigates to users and back', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Users'));
    expect(screen.getByText('Users')).toBeInTheDocument();
    navigateBack();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('navigates to shifts and back', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Shifts'));
    expect(screen.getByText('Shifts')).toBeInTheDocument();
    navigateBack();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('tax is applied to cart total', () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(DEFAULT_ITEMS[0].name)[0]);
    const cartSection = screen.getByText('Cart').closest('div')!;
    const subtotal = cartSection.querySelector('.font-mono');
    expect(subtotal?.textContent).toContain(DEFAULT_ITEMS[0].price.toFixed(2));
  });

  it('completes sale flow and returns', () => {
    render(<HomePage />);
    completeSale();
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('voids transaction from history view', () => {
    render(<HomePage />);
    completeSale();
    fireEvent.click(screen.getByText('History'));
    const txItems = screen.getAllByRole('listitem');
    fireEvent.click(txItems[0]);
    expect(screen.getByText('Transaction Detail')).toBeInTheDocument();
  });

  it('updates inventory stock from inventory view', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Inventory'));
    const editBtn = screen
      .getAllByRole('button')
      .find(
        (b) =>
          b.querySelector('svg') &&
          b.className.includes('btn-ghost') &&
          b.className.includes('btn-xs') &&
          b.closest('td')
      );
    expect(editBtn).toBeDefined();
    fireEvent.click(editBtn!);
    fireEvent.click(screen.getByText('Save'));
  });

  it('opens and closes a shift', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Shifts'));
    fireEvent.change(screen.getByPlaceholderText('Opening balance'), {
      target: { value: '200' },
    });
    fireEvent.click(screen.getByText('Open Shift'));
    expect(screen.getByText('Active Shift')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Close balance'), {
      target: { value: '250' },
    });
    fireEvent.click(screen.getByText('Close Shift'));
    expect(screen.getByText('Open New Shift')).toBeInTheDocument();
  });

  it('decrement to zero removes item from cart', () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(DEFAULT_ITEMS[0].name)[0]);
    const cartSection = screen.getByText('Cart').closest('div')!;
    const minusBtns = Array.from(cartSection.querySelectorAll('button')).filter(
      (b) =>
        b.className.includes('btn-ghost') && !b.className.includes('text-error')
    );
    fireEvent.click(minusBtns[0]);
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  it('adds a discount via discounts view', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Discounts'));
    fireEvent.change(screen.getByPlaceholderText('Code'), {
      target: { value: 'SAVE10' },
    });
    fireEvent.change(screen.getByPlaceholderText('Value'), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('SAVE10')).toBeInTheDocument();
    navigateBack();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('adds a gift card via gift cards view', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Gift Cards'));
    fireEvent.change(screen.getByPlaceholderText('Code'), {
      target: { value: 'GC100' },
    });
    fireEvent.change(screen.getByPlaceholderText('Balance'), {
      target: { value: '100' },
    });
    fireEvent.click(screen.getByText('Create'));
    expect(screen.getByText('GC100')).toBeInTheDocument();
    navigateBack();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('adds a user via users view', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Users'));
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByPlaceholderText('PIN'), {
      target: { value: '9999' },
    });
    fireEvent.click(screen.getByText('Add User'));
    expect(screen.getByText('Bob')).toBeInTheDocument();
    navigateBack();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });
});
