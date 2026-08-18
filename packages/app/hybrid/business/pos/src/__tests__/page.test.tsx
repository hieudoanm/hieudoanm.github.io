import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from '@/components/organisms/Cart';
import { Checkout } from '@/components/organisms/Checkout';
import { Receipt } from '@/components/organisms/Receipt';
import { ItemCatalog } from '@/components/organisms/ItemCatalog';
import { SAMPLE_ITEMS } from '@/data/items';

let onComplete: jest.Mock;
let onNewSale: jest.Mock;

beforeEach(() => {
  onComplete = jest.fn();
  onNewSale = jest.fn();
});

describe('POS Sale Flow (organism integration)', () => {
  it('full sale flow: add to cart, checkout, receipt, new sale', () => {
    const onAdd = jest.fn();
    const { unmount: unmount1 } = render(
      <ItemCatalog items={SAMPLE_ITEMS} onAdd={onAdd} />
    );
    fireEvent.click(screen.getByText('Coffee'));
    expect(onAdd).toHaveBeenCalledWith(SAMPLE_ITEMS[0]);
    unmount1();

    const cartItems = [
      { item: SAMPLE_ITEMS[0], quantity: 2 },
      { item: SAMPLE_ITEMS[1], quantity: 1 },
    ];
    const onCheckout = jest.fn();
    const onRemove = jest.fn();
    const onUpdateQuantity = jest.fn();
    const { unmount: unmount2 } = render(
      <Cart
        items={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemove={onRemove}
        onCheckout={onCheckout}
      />
    );
    fireEvent.click(screen.getByText('Checkout'));
    expect(onCheckout).toHaveBeenCalled();
    unmount2();

    const { unmount: unmount3 } = render(
      <Checkout items={cartItems} onComplete={onComplete} onBack={jest.fn()} />
    );
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '20' },
    });
    fireEvent.click(screen.getByText('Complete Payment'));
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        items: cartItems,
        paymentMethod: 'cash',
      })
    );
    unmount3();

    const tx = onComplete.mock.calls[0][0];
    render(<Receipt transaction={tx} onNewSale={onNewSale} />);
    fireEvent.click(screen.getByText('New Sale'));
    expect(onNewSale).toHaveBeenCalled();
  });

  it('removes item from cart', () => {
    const cartItems = [{ item: SAMPLE_ITEMS[0], quantity: 1 }];
    const onRemove = jest.fn();
    render(
      <Cart
        items={cartItems}
        onUpdateQuantity={jest.fn()}
        onRemove={onRemove}
        onCheckout={jest.fn()}
      />
    );
    const trashBtn = screen
      .getAllByRole('button')
      .find((btn) => btn.className.includes('text-error'));
    fireEvent.click(trashBtn!);
    expect(onRemove).toHaveBeenCalledWith(SAMPLE_ITEMS[0].id);
  });

  it('shows empty cart state', () => {
    render(
      <Cart
        items={[]}
        onUpdateQuantity={jest.fn()}
        onRemove={jest.fn()}
        onCheckout={jest.fn()}
      />
    );
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });
});
