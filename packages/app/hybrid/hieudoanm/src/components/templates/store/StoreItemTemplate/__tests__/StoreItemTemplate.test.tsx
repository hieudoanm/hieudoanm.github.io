import { render, screen, fireEvent } from '@testing-library/react';
import { StoreItemTemplate } from '../StoreItemTemplate';

describe('StoreItemTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<StoreItemTemplate />);
    expect(container).toMatchSnapshot();
  });

  it('renders product name', () => {
    render(<StoreItemTemplate />);
    expect(screen.getAllByText('Mechanical Keyboard').length).toBeGreaterThan(
      0
    );
  });

  it('renders product category', () => {
    render(<StoreItemTemplate />);
    expect(screen.getAllByText('Electronics').length).toBeGreaterThan(0);
  });

  it('renders product price', () => {
    render(<StoreItemTemplate />);
    expect(screen.getAllByText('$159').length).toBeGreaterThan(0);
  });

  it('renders review count', () => {
    render(<StoreItemTemplate />);
    expect(screen.getByText('(94 reviews)')).toBeInTheDocument();
  });

  it('renders breadcrumb navigation', () => {
    render(<StoreItemTemplate />);
    expect(screen.getAllByText('Store').length).toBeGreaterThan(0);
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders switch type options', () => {
    render(<StoreItemTemplate />);
    expect(screen.getByText('Tactile')).toBeInTheDocument();
    expect(screen.getByText('Linear')).toBeInTheDocument();
    expect(screen.getByText('Clicky')).toBeInTheDocument();
  });

  it('renders quantity selector with default value 1', () => {
    render(<StoreItemTemplate />);
    const quantityTexts = screen.getAllByText('1');
    expect(quantityTexts.length).toBeGreaterThan(0);
  });

  it('increases quantity when + is clicked', () => {
    render(<StoreItemTemplate />);
    fireEvent.click(screen.getByText('+'));
    const quantityTexts = screen.getAllByText('2');
    expect(quantityTexts.length).toBeGreaterThan(0);
  });

  it('decreases quantity when - is clicked', () => {
    render(<StoreItemTemplate />);
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('−'));
    const quantityTexts = screen.getAllByText('1');
    expect(quantityTexts.length).toBeGreaterThan(0);
  });

  it('does not decrease quantity below 1', () => {
    render(<StoreItemTemplate />);
    const minusBtn = screen.getByText('−');
    expect(minusBtn).toBeDisabled();
  });

  it('renders add to cart button with total price', () => {
    render(<StoreItemTemplate />);
    expect(screen.getByText(/Add to cart/)).toBeInTheDocument();
    expect(screen.getAllByText(/\$159/).length).toBeGreaterThan(0);
  });

  it('updates cart total when quantity changes', () => {
    render(<StoreItemTemplate />);
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText(/Add to cart — \$318/)).toBeInTheDocument();
  });

  it('renders customer reviews section', () => {
    render(<StoreItemTemplate />);
    expect(screen.getByText('Customer reviews')).toBeInTheDocument();
  });

  it('renders all review authors', () => {
    render(<StoreItemTemplate />);
    expect(screen.getByText('Alex Rivera')).toBeInTheDocument();
    expect(screen.getByText('Jordan Lee')).toBeInTheDocument();
    expect(screen.getByText('Morgan Patel')).toBeInTheDocument();
    expect(screen.getByText('Sam Thompson')).toBeInTheDocument();
  });

  it('renders related products section', () => {
    render(<StoreItemTemplate />);
    expect(screen.getByText('You might also like')).toBeInTheDocument();
  });

  it('renders related product names', () => {
    render(<StoreItemTemplate />);
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText('USB-C Hub')).toBeInTheDocument();
    expect(screen.getByText('Desk Mat')).toBeInTheDocument();
  });

  it('calls onAddToCart when add to cart button is clicked', () => {
    const onAddToCart = jest.fn();
    render(<StoreItemTemplate onAddToCart={onAddToCart} />);
    fireEvent.click(screen.getByText(/Add to cart/));
    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });

  it('renders cart badge with count', () => {
    render(<StoreItemTemplate />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('accepts controlled quantity', () => {
    render(<StoreItemTemplate quantity={3} onQuantityChange={() => {}} />);
    const quantityTexts = screen.getAllByText('3');
    expect(quantityTexts.length).toBeGreaterThan(0);
  });

  it('calls onQuantityChange when + is clicked', () => {
    const onQuantityChange = jest.fn();
    render(
      <StoreItemTemplate quantity={1} onQuantityChange={onQuantityChange} />
    );
    fireEvent.click(screen.getByText('+'));
    expect(onQuantityChange).toHaveBeenCalledWith(2);
  });

  it('renders footer', () => {
    render(<StoreItemTemplate />);
    expect(screen.getByText(/Built with care/)).toBeInTheDocument();
  });

  it('renders related product prices', () => {
    render(<StoreItemTemplate />);
    expect(screen.getByText('$349')).toBeInTheDocument();
    expect(screen.getByText('$79')).toBeInTheDocument();
    expect(screen.getByText('$45')).toBeInTheDocument();
    expect(screen.getByText('$39')).toBeInTheDocument();
  });
});
