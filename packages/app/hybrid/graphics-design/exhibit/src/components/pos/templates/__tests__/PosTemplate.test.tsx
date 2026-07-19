import { render, screen, fireEvent } from '@testing-library/react';
import { PosTemplate } from '@/components/pos/templates/PosTemplate';

const goTo = (label: string) => fireEvent.click(screen.getByText(label));

describe('PosTemplate', () => {
  it('opens on the sale view with the seeded catalogue', () => {
    render(<PosTemplate />);
    expect(screen.getByText('Items')).toBeInTheDocument();
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  it('adds an item to the cart when a catalogue item is clicked', () => {
    render(<PosTemplate />);
    fireEvent.click(screen.getAllByText('Coffee')[0]);
    expect(screen.queryByText('Cart is empty')).not.toBeInTheDocument();
  });

  it('navigates to the transaction history view', () => {
    render(<PosTemplate />);
    goTo('History');
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    expect(screen.getByText('0 transactions')).toBeInTheDocument();
  });

  it('navigates to the daily summary view', () => {
    render(<PosTemplate />);
    goTo('Daily');
    expect(screen.getByText('Daily Summary')).toBeInTheDocument();
  });

  it('navigates to the reports view', () => {
    render(<PosTemplate />);
    goTo('Reports');
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  it('navigates to the inventory view', () => {
    render(<PosTemplate />);
    goTo('Inventory');
    expect(screen.getByText('Inventory')).toBeInTheDocument();
  });

  it('navigates to the tax settings view', () => {
    render(<PosTemplate />);
    goTo('Tax');
    expect(screen.getByText('Tax Settings')).toBeInTheDocument();
  });

  it('navigates to the discounts view', () => {
    render(<PosTemplate />);
    goTo('Discounts');
    expect(screen.getByText('Discounts')).toBeInTheDocument();
    expect(screen.getByText('No discounts configured')).toBeInTheDocument();
  });

  it('navigates to the gift cards view', () => {
    render(<PosTemplate />);
    goTo('Gift Cards');
    expect(screen.getByText('No gift cards')).toBeInTheDocument();
  });

  it('navigates to the users view', () => {
    render(<PosTemplate />);
    goTo('Users');
    expect(screen.getByText('No users configured')).toBeInTheDocument();
  });

  it('navigates to the shifts view', () => {
    render(<PosTemplate />);
    goTo('Shifts');
    expect(screen.getByText('No shifts yet')).toBeInTheDocument();
  });

  it('returns to the sale view from a sub-view', () => {
    render(<PosTemplate />);
    goTo('Reports');
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('adds a discount from the discounts view', () => {
    render(<PosTemplate />);
    goTo('Discounts');
    fireEvent.change(screen.getByPlaceholderText('Code'), {
      target: { value: 'save10' },
    });
    fireEvent.change(screen.getByPlaceholderText('Value'), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('SAVE10')).toBeInTheDocument();
  });

  it('records a stock adjustment from the inventory view', () => {
    render(<PosTemplate />);
    goTo('Inventory');
    fireEvent.click(screen.getAllByLabelText(/^Edit /)[0]);
    fireEvent.change(screen.getByPlaceholderText('Reason'), {
      target: { value: 'Restocked' },
    });
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText(/Restocked/)).toBeInTheDocument();
  });
});
