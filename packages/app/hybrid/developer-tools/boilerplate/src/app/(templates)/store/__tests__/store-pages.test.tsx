import { render, screen } from '@testing-library/react';
import StorePage from '../page';
import StoreItem, { generateStaticParams } from '../[id]/page';
import CartPage from '../cart/page';
import CheckoutPage from '../checkout/page';
import OrderConfirmationPage from '../order-confirmation/page';
import OrderHistoryPage from '../order-history/page';
import StoreLoading from '../loading';

describe('StorePage', () => {
  it('renders the storefront', () => {
    render(<StorePage />);
    expect(screen.getByText('Workspace essentials')).toBeInTheDocument();
    expect(screen.getByText('Browse all')).toBeInTheDocument();
  });
});

describe('StoreItem', () => {
  it('renders a product detail page', async () => {
    const element = await StoreItem({ params: Promise.resolve({ id: '2' }) });
    render(element);
    expect(screen.getAllByText('Mechanical Keyboard').length).toBeGreaterThan(
      0
    );
  });

  it('generates static params for all product ids', () => {
    expect(generateStaticParams()).toHaveLength(12);
  });
});

describe('CartPage', () => {
  it('renders the cart', () => {
    render(<CartPage />);
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
  });
});

describe('CheckoutPage', () => {
  it('renders checkout', () => {
    render(<CheckoutPage />);
    expect(screen.getByText('Shipping information')).toBeInTheDocument();
  });
});

describe('OrderConfirmationPage', () => {
  it('renders order confirmation', () => {
    render(<OrderConfirmationPage />);
    expect(screen.getByText('Order confirmed!')).toBeInTheDocument();
  });
});

describe('OrderHistoryPage', () => {
  it('renders order history', () => {
    render(<OrderHistoryPage />);
    expect(screen.getAllByText('Order history').length).toBeGreaterThan(0);
  });
});

describe('StoreLoading', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<StoreLoading />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    );
  });
});
