import { fireEvent, render, screen } from '@testing-library/react';
import { CouponsTemplate } from '../CouponsTemplate';

describe('CouponsTemplate', () => {
  it('renders coupons with usage and status badges', () => {
    render(<CouponsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Coupons' })
    ).toBeInTheDocument();
    expect(screen.getByText('SAVE10')).toBeInTheDocument();
    expect(screen.getByText('42/100 uses')).toBeInTheDocument();
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Inactive')).toHaveLength(2);
  });

  it('validates the coupon create form', () => {
    render(<CouponsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add coupon' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a code and a discount between 1 and 99'
    );
    fireEvent.change(screen.getByLabelText('Coupon code'), {
      target: { value: 'SAVE20' },
    });
    fireEvent.change(screen.getByLabelText('Discount %'), {
      target: { value: '150' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add coupon' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a code and a discount between 1 and 99'
    );
  });

  it('adds a valid coupon and toggles active state', () => {
    render(<CouponsTemplate />);
    fireEvent.change(screen.getByLabelText('Coupon code'), {
      target: { value: 'SAVE20' },
    });
    fireEvent.change(screen.getByLabelText('Discount %'), {
      target: { value: '20' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add coupon' }));
    expect(screen.getByText('Coupon added')).toBeInTheDocument();
    expect(screen.getByText('SAVE20')).toBeInTheDocument();
    expect(screen.getByText('0/100 uses')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Toggle' })[0]);
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Inactive')).toHaveLength(3);
  });
});
