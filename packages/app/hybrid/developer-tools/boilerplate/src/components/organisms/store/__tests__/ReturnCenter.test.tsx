import { fireEvent, render, screen } from '@testing-library/react';
import { ReturnCenter } from '../ReturnCenter';

const orders = [
  {
    id: 'R1',
    product: 'Lamp',
    orderDate: 'Jul 20',
    status: 'Approved',
  },
  {
    id: 'R2',
    product: 'Mug',
    orderDate: 'Jul 22',
    status: 'Pending',
    eligible: true,
  },
];

describe('ReturnCenter', () => {
  it('renders orders in a table with statuses', () => {
    render(<ReturnCenter orders={orders} />);
    expect(screen.getByText('R1')).toBeInTheDocument();
    expect(screen.getByText('Lamp')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders the request count', () => {
    render(<ReturnCenter orders={orders} />);
    expect(screen.getByText('2 requests')).toBeInTheDocument();
  });

  it('fires onStartReturn only for eligible orders', () => {
    const onStartReturn = jest.fn();
    render(<ReturnCenter orders={orders} onStartReturn={onStartReturn} />);
    fireEvent.click(screen.getByRole('button', { name: 'Start return' }));
    expect(onStartReturn).toHaveBeenCalledWith('R2');
  });
});
