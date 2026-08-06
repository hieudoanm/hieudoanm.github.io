import { fireEvent, render, screen } from '@testing-library/react';
import { CartTemplate } from '../CartTemplate';
import { CheckoutTemplate } from '../CheckoutTemplate';
import { OrderConfirmationTemplate } from '../OrderConfirmationTemplate';
import { OrderHistoryTemplate } from '../OrderHistoryTemplate';
import { StoreFrontTemplate } from '../StoreFrontTemplate';
import { StoreItemTemplate } from '../StoreItemTemplate';
import { StoreLoadingTemplate } from '../StoreLoadingTemplate';

describe('StoreLoadingTemplate', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<StoreLoadingTemplate />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    );
  });
});

describe('CartTemplate', () => {
  it('renders items and subtotal', () => {
    render(<CartTemplate />);
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getByText('Mechanical Keyboard')).toBeInTheDocument();
    expect(screen.getByText('Cart (3)')).toBeInTheDocument();
    expect(screen.getAllByText('$746').length).toBeGreaterThan(0);
  });

  it('increments quantity and updates totals', () => {
    render(<CartTemplate />);
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[1]);
    expect(screen.getByText('$698')).toBeInTheDocument();
    expect(screen.getAllByText('$1095').length).toBeGreaterThan(0);
  });

  it('decrements quantity', () => {
    render(<CartTemplate />);
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[3]);
    expect(screen.getAllByText('$587').length).toBeGreaterThan(0);
  });

  it('disables minus button at quantity one', () => {
    render(<CartTemplate />);
    const buttons = screen.getAllByRole('button', { name: '' });
    expect(buttons[0]).toBeDisabled();
  });

  it('removes items', () => {
    render(<CartTemplate />);
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[8]);
    expect(screen.queryByText('Wireless Mouse')).not.toBeInTheDocument();
    expect(screen.getByText('Cart (2)')).toBeInTheDocument();
  });

  it('shows empty state after removing all items', () => {
    render(<CartTemplate />);
    let buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[8]);
    buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[5]);
    buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[2]);
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Browse products' })
    ).toHaveAttribute('href', '/store');
  });

  it('links to checkout with total', () => {
    render(<CartTemplate />);
    expect(
      screen.getByRole('link', { name: /Checkout — \$746/ })
    ).toHaveAttribute('href', '/store/checkout');
  });
});

describe('CheckoutTemplate', () => {
  it('renders shipping and payment forms', () => {
    render(<CheckoutTemplate />);
    expect(screen.getByText('Shipping information')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('4242 4242 4242 4242')
    ).toBeInTheDocument();
  });

  it('shows order summary with items', () => {
    render(<CheckoutTemplate />);
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getAllByText('x1').length).toBeGreaterThan(0);
    expect(
      screen.getByRole('button', { name: /Pay \$746/ })
    ).toBeInTheDocument();
  });

  it('shows confirmation after placing order', () => {
    render(<CheckoutTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Pay \$746/ }));
    expect(screen.getByText('Order confirmed!')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Continue shopping' })
    ).toHaveAttribute('href', '/store');
  });
});

describe('OrderConfirmationTemplate', () => {
  it('renders confirmation and order details', () => {
    render(<OrderConfirmationTemplate />);
    expect(screen.getByText('Order confirmed!')).toBeInTheDocument();
    expect(screen.getByText('#ORD-2024-3847')).toBeInTheDocument();
    expect(screen.getByText('Processing')).toBeInTheDocument();
    expect(screen.getByText('$746')).toBeInTheDocument();
  });

  it('links to store and order history', () => {
    render(<OrderConfirmationTemplate />);
    expect(screen.getByRole('link', { name: 'View orders' })).toHaveAttribute(
      'href',
      '/store/order-history'
    );
    expect(
      screen.getAllByRole('link', { name: 'Continue shopping' }).length
    ).toBeGreaterThan(0);
  });
});

describe('OrderHistoryTemplate', () => {
  it('renders orders with status badges', () => {
    render(<OrderHistoryTemplate />);
    expect(screen.getByText('ORD-2024-3847')).toBeInTheDocument();
    expect(screen.getAllByText('Delivered').length).toBe(3);
    expect(screen.getByText('4 items')).toBeInTheDocument();
    expect(screen.getByText('$746')).toBeInTheDocument();
  });

  it('applies status colors', () => {
    render(<OrderHistoryTemplate />);
    expect(screen.getAllByText('Delivered')[0]).toHaveClass('badge-success');
    expect(screen.getByText('Processing')).toHaveClass('badge-warning');
  });
});

describe('StoreFrontTemplate', () => {
  it('renders hero, products, and cart count', () => {
    render(<StoreFrontTemplate cartCount={5} />);
    expect(screen.getByText('Workspace essentials')).toBeInTheDocument();
    expect(screen.getAllByText('Ergonomic Chair').length).toBe(2);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders original price when present', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getAllByText('$429').length).toBeGreaterThan(0);
  });

  it('renders product badges', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getAllByText('Sale').length).toBeGreaterThan(0);
  });

  it('filters products by category', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getAllByText('Ergonomic Chair').length).toBe(2);
    fireEvent.click(screen.getByRole('button', { name: 'Audio' }));
    expect(screen.getByText('Studio Headphones')).toBeInTheDocument();
    expect(screen.getAllByText('Ergonomic Chair').length).toBe(1);
  });

  it('switches back to all products', () => {
    render(<StoreFrontTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Electronics' }));
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getAllByText('Ergonomic Chair').length).toBe(2);
  });

  it('highlights active category button', () => {
    render(<StoreFrontTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Furniture' }));
    expect(screen.getByRole('button', { name: 'Furniture' })).toHaveClass(
      'btn-primary'
    );
  });

  it('shows deals section with on-sale products only', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getByText('On sale now')).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /Canvas Backpack/ }).length
    ).toBeGreaterThan(0);
  });

  it('links products to detail pages', () => {
    render(<StoreFrontTemplate />);
    expect(
      screen.getAllByRole('link', { name: /Ergonomic Chair/ })[0]
    ).toHaveAttribute('href', '/store/1');
  });

  it('omits cart badge when count is zero', () => {
    render(<StoreFrontTemplate cartCount={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });
});

describe('StoreItemTemplate', () => {
  it('renders product details and reviews', () => {
    render(<StoreItemTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Mechanical Keyboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('(94 reviews)')).toBeInTheDocument();
    expect(screen.getByText('Alex Rivera')).toBeInTheDocument();
    expect(screen.getByText('2 weeks ago')).toBeInTheDocument();
  });

  it('increments quantity and updates price', () => {
    render(<StoreItemTemplate />);
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[1]);
    expect(
      screen.getByRole('button', { name: /Add to cart — \$318/ })
    ).toBeInTheDocument();
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);
  });

  it('clamps quantity at one', () => {
    render(<StoreItemTemplate />);
    const buttons = screen.getAllByRole('button', { name: '' });
    expect(buttons[0]).toBeDisabled();
    fireEvent.click(buttons[0]);
    expect(
      screen.getByRole('button', { name: /Add to cart — \$159/ })
    ).toBeInTheDocument();
  });

  it('shows cart count badge', () => {
    render(<StoreItemTemplate cartCount={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
