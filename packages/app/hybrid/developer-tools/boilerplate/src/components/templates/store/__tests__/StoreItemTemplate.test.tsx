import { fireEvent, render, screen } from '@testing-library/react';
import { StoreItemTemplate } from '../StoreItemTemplate';

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
