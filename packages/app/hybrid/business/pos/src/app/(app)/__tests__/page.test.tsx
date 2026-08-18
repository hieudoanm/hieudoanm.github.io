import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '@/app/(app)/page';
import { SAMPLE_ITEMS } from '@/data/items';

describe('HomePage', () => {
  it('renders item catalog with all sample items', () => {
    render(<HomePage />);
    SAMPLE_ITEMS.forEach((item) => {
      expect(screen.getAllByText(item.name).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('adds item to cart when clicked', () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(SAMPLE_ITEMS[0].name)[0]);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('increments quantity when same item is clicked twice', () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(SAMPLE_ITEMS[0].name)[0]);
    fireEvent.click(screen.getAllByText(SAMPLE_ITEMS[0].name)[0]);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('shows cart empty state initially', () => {
    render(<HomePage />);
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  it('navigates to checkout after adding items and clicking checkout', () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(SAMPLE_ITEMS[0].name)[0]);
    fireEvent.click(screen.getByText('Checkout'));
    expect(screen.getByText('Amount Tendered')).toBeInTheDocument();
  });

  it('navigates back from checkout to sale view', () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(SAMPLE_ITEMS[0].name)[0]);
    fireEvent.click(screen.getByText('Checkout'));
    const backBtn = screen.getAllByRole('button')[0];
    fireEvent.click(backBtn);
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('completes a sale and shows receipt', () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(SAMPLE_ITEMS[0].name)[0]);
    fireEvent.click(screen.getByText('Checkout'));
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByText('Complete Payment'));
    expect(screen.getByText('Payment Complete')).toBeInTheDocument();
  });

  it('returns to sale view after new sale from receipt', () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(SAMPLE_ITEMS[0].name)[0]);
    fireEvent.click(screen.getByText('Checkout'));
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByText('Complete Payment'));
    fireEvent.click(screen.getByText('New Sale'));
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  it('removes item from cart via trash button', () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(SAMPLE_ITEMS[0].name)[0]);
    const trashBtn = screen
      .getAllByRole('button')
      .find((btn) => btn.className.includes('text-error'));
    fireEvent.click(trashBtn!);
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  it('updates quantity via +/- buttons', () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(SAMPLE_ITEMS[0].name)[0]);
    const buttons = screen.getAllByRole('button');
    const ghostBtns = buttons.filter(
      (btn) =>
        btn.className.includes('btn-ghost') &&
        !btn.className.includes('text-error')
    );
    fireEvent.click(ghostBtns[1]);
    expect(screen.getByText('2')).toBeInTheDocument();
    fireEvent.click(ghostBtns[0]);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows subtotal in cart after adding item', () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(SAMPLE_ITEMS[0].name)[0]);
    const price = SAMPLE_ITEMS[0].price;
    expect(screen.getAllByText(`$${price.toFixed(2)}`).length).toBeGreaterThanOrEqual(1);
  });
});
