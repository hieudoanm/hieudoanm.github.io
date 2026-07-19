import { render, screen } from '@testing-library/react';
import { SymptomTracker } from '../SymptomTracker';

const symptoms = [
  {
    id: '1',
    name: 'Headache',
    severity: 2,
    date: '2026-08-01',
    notes: 'After work',
  },
  { id: '2', name: 'Dizziness', severity: 5, date: '2026-08-02' },
];

describe('SymptomTracker', () => {
  it('renders each symptom with date and notes', () => {
    render(<SymptomTracker symptoms={symptoms} />);
    expect(screen.getByText('Headache')).toBeInTheDocument();
    expect(screen.getByText('2026-08-01')).toBeInTheDocument();
    expect(screen.getByText('After work')).toBeInTheDocument();
  });

  it('labels severity from the score', () => {
    render(<SymptomTracker symptoms={symptoms} />);
    expect(screen.getByText('Mild')).toBeInTheDocument();
    expect(screen.getByText('Severe')).toBeInTheDocument();
  });

  it('shows an empty state when there are no symptoms', () => {
    render(<SymptomTracker symptoms={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No symptoms logged.'
    );
  });
});
