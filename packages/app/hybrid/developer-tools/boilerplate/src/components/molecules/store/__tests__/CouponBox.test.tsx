import { fireEvent, render, screen } from '@testing-library/react';
import { CouponBox } from '../CouponBox';

describe('CouponBox', () => {
  it('renders an input and apply button', () => {
    render(<CouponBox onApply={jest.fn()} />);
    expect(
      screen.getByRole('textbox', { name: 'Coupon code' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
  });

  it('applies a trimmed code and shows confirmation', () => {
    const onApply = jest.fn();
    render(<CouponBox onApply={onApply} />);
    const input = screen.getByRole('textbox', { name: 'Coupon code' });
    fireEvent.change(input, { target: { value: '  SAVE10  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
    expect(onApply).toHaveBeenCalledWith('SAVE10');
    expect(screen.getByTestId('coupon-applied')).toHaveTextContent(
      'SAVE10 applied'
    );
  });

  it('does not apply an empty code', () => {
    const onApply = jest.fn();
    render(<CouponBox onApply={onApply} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
    expect(onApply).not.toHaveBeenCalled();
    expect(screen.queryByTestId('coupon-applied')).not.toBeInTheDocument();
  });
});
