import { fireEvent, render, screen } from '@testing-library/react';
import { FoodDeliveryTemplate } from '../FoodDeliveryTemplate';

describe('FoodDeliveryTemplate', () => {
  it('renders delivery restaurants with fees and ETAs', () => {
    render(<FoodDeliveryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Delivery' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 restaurants')).toBeInTheDocument();
    expect(screen.getByText('Golden Dragon')).toBeInTheDocument();
    expect(screen.getAllByText('$2.99 delivery')).toHaveLength(2);
    expect(screen.getByText('20-30 min')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'View menu' })).toHaveLength(
      5
    );
  });

  it('toggles an inline mini menu', () => {
    render(<FoodDeliveryTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'View menu' })[0]);
    expect(screen.getByText('Kung Pao Chicken')).toBeInTheDocument();
    expect(screen.getByText('Spring Rolls')).toBeInTheDocument();
    expect(screen.queryByText('Pad Thai')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.queryByText('Kung Pao Chicken')).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'View menu' })).toHaveLength(
      5
    );
  });
});
