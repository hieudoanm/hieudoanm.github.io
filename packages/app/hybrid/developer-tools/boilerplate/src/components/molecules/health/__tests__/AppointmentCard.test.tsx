import { fireEvent, render, screen } from '@testing-library/react';
import { AppointmentCard } from '../AppointmentCard';

describe('AppointmentCard', () => {
  it('renders doctor, specialty, date and time', () => {
    render(
      <AppointmentCard
        doctor="Dr. Smith"
        specialty="Cardiology"
        date="Aug 10"
        time="09:30"
      />
    );
    expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('📅 Aug 10')).toBeInTheDocument();
    expect(screen.getByText('🕒 09:30')).toBeInTheDocument();
  });

  it('renders location when provided', () => {
    render(
      <AppointmentCard
        doctor="Dr. Smith"
        specialty="Cardiology"
        date="Aug 10"
        time="09:30"
        location="City Hospital"
      />
    );
    expect(screen.getByText('📍 City Hospital')).toBeInTheDocument();
  });

  it('defaults status to upcoming', () => {
    render(
      <AppointmentCard
        doctor="Dr. Smith"
        specialty="Cardiology"
        date="Aug 10"
        time="09:30"
      />
    );
    expect(screen.getByText('upcoming')).toHaveClass('badge-primary');
  });

  it('fires onCancel for upcoming appointments', () => {
    const onCancel = jest.fn();
    render(
      <AppointmentCard
        doctor="Dr. Smith"
        specialty="Cardiology"
        date="Aug 10"
        time="09:30"
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel appointment' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
