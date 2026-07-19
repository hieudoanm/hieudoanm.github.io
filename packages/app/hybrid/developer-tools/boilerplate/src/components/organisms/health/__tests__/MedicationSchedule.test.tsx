import { fireEvent, render, screen } from '@testing-library/react';
import { MedicationSchedule } from '../MedicationSchedule';

const medications = [
  { id: 'a', name: 'Ibuprofen', dosage: '200mg', time: '08:00', taken: false },
  { id: 'b', name: 'Vitamin D', dosage: '1000 IU', time: '12:00', taken: true },
];

describe('MedicationSchedule', () => {
  it('renders medications with dosage and time', () => {
    render(<MedicationSchedule medications={medications} />);
    expect(screen.getByText('Ibuprofen')).toBeInTheDocument();
    expect(screen.getByText('200mg · 08:00')).toBeInTheDocument();
  });

  it('counts medications taken from the initial state', () => {
    render(<MedicationSchedule medications={medications} />);
    expect(screen.getByTestId('taken-count')).toHaveTextContent('1 of 2 taken');
  });

  it('toggles a medication when its checkbox is clicked', () => {
    render(<MedicationSchedule medications={medications} />);
    fireEvent.click(screen.getByTestId('toggle-a'));
    expect(screen.getByTestId('taken-count')).toHaveTextContent('2 of 2 taken');
    fireEvent.click(screen.getByTestId('toggle-a'));
    expect(screen.getByTestId('taken-count')).toHaveTextContent('1 of 2 taken');
  });

  it('shows an empty state when there are no medications', () => {
    render(<MedicationSchedule medications={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No medications scheduled.'
    );
  });
});
