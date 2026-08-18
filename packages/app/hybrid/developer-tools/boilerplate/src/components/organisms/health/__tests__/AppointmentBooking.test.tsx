import { fireEvent, render, screen } from '@testing-library/react';
import { AppointmentBooking } from '../AppointmentBooking';

describe('AppointmentBooking', () => {
  it('submits the appointment when all fields are filled', () => {
    const onSubmit = jest.fn();
    render(
      <AppointmentBooking
        doctors={['Dr. Smith', 'Dr. Lee']}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByTestId('patient-name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByTestId('date'), {
      target: { value: '2026-09-01' },
    });
    fireEvent.change(screen.getByTestId('time'), {
      target: { value: '10:30' },
    });
    fireEvent.click(screen.getByText('Book appointment'));

    expect(onSubmit).toHaveBeenCalledWith({
      patientName: 'Jane Doe',
      date: '2026-09-01',
      time: '10:30',
      doctor: 'Dr. Smith',
      reason: '',
    });
  });

  it('submits the selected doctor and reason', () => {
    const onSubmit = jest.fn();
    render(
      <AppointmentBooking
        doctors={['Dr. Smith', 'Dr. Lee']}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByTestId('patient-name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByTestId('date'), {
      target: { value: '2026-09-01' },
    });
    fireEvent.change(screen.getByTestId('time'), {
      target: { value: '14:00' },
    });
    fireEvent.change(screen.getByTestId('doctor'), {
      target: { value: 'Dr. Lee' },
    });
    fireEvent.change(screen.getByTestId('reason'), {
      target: { value: 'Cough and fever' },
    });
    fireEvent.click(screen.getByText('Book appointment'));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        doctor: 'Dr. Lee',
        reason: 'Cough and fever',
      })
    );
  });

  it('shows a validation error when required fields are missing', () => {
    const onSubmit = jest.fn();
    render(<AppointmentBooking doctors={['Dr. Smith']} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText('Book appointment'));
    expect(screen.getByTestId('error')).toHaveTextContent(
      'Please fill in all required fields.'
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('renders the default title', () => {
    render(<AppointmentBooking doctors={[]} onSubmit={jest.fn()} />);
    expect(screen.getByText('Book an appointment')).toBeInTheDocument();
  });
});
