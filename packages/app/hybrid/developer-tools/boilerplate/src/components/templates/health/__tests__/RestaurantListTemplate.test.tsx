import { fireEvent, render, screen } from '@testing-library/react';
import { RestaurantListTemplate } from '../RestaurantListTemplate';

describe('RestaurantListTemplate', () => {
  it('renders restaurant cards with ratings and delivery times', () => {
    render(<RestaurantListTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Restaurants' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 restaurants')).toBeInTheDocument();
    expect(screen.getByText('Trattoria Fiore')).toBeInTheDocument();
    expect(screen.getByText('4.5 rating')).toBeInTheDocument();
    expect(screen.getByText('25 min')).toBeInTheDocument();
  });

  it('filters restaurants by cuisine tab and search', () => {
    render(<RestaurantListTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Italian' }));
    expect(screen.getByText('2 restaurants')).toBeInTheDocument();
    expect(screen.getByText('Trattoria Fiore')).toBeInTheDocument();
    expect(screen.queryByText('Sakura House')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search restaurants'), {
      target: { value: 'fiore' },
    });
    expect(screen.getByText('1 restaurants')).toBeInTheDocument();
    expect(screen.getByText('Trattoria Fiore')).toBeInTheDocument();
    expect(screen.queryByText('Casa del Sole')).not.toBeInTheDocument();
  });

  it('shows the empty state when nothing matches', () => {
    render(<RestaurantListTemplate />);
    fireEvent.change(screen.getByLabelText('Search restaurants'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No restaurants found')).toBeInTheDocument();
    expect(screen.getByText('0 restaurants')).toBeInTheDocument();
  });
});
