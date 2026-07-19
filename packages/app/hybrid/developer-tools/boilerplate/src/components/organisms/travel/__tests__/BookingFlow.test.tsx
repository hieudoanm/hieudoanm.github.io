import { fireEvent, render, screen } from '@testing-library/react';
import { BookingFlow } from '../BookingFlow';

describe('BookingFlow', () => {
  it('renders all booking steps', () => {
    render(<BookingFlow />);
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(screen.getByText('Passenger')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
  });

  it('advances through steps on Continue', () => {
    render(<BookingFlow />);
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('Select a flight')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(
      screen.getByText('Securely confirm your booking.')
    ).toBeInTheDocument();
  });

  it('goes back to the previous step', () => {
    render(<BookingFlow />);
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('Search flights')).toBeInTheDocument();
  });

  it('fires onComplete on the final step', () => {
    const onComplete = jest.fn();
    render(<BookingFlow onComplete={onComplete} />);
    for (let i = 0; i < 4; i += 1) {
      fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    }
    expect(screen.getByText('Booking confirmed')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(onComplete).toHaveBeenCalled();
  });
});
