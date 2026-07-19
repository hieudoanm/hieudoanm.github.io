import { render, screen } from '@testing-library/react';
import { HealthHistory } from '../HealthHistory';

const records = [
  {
    id: '1',
    date: '2026-07-15',
    type: 'Annual checkup',
    provider: 'Dr. Smith',
    result: 'Normal',
    notes: 'All clear',
  },
  { id: '2', date: '2026-05-02', type: 'Blood test', provider: 'LabCorp' },
];

describe('HealthHistory', () => {
  it('renders each record with type, provider, and date', () => {
    render(<HealthHistory records={records} />);
    expect(screen.getByText('Annual checkup')).toBeInTheDocument();
    expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
    expect(screen.getByText('2026-07-15')).toBeInTheDocument();
  });

  it('renders result and notes when present', () => {
    render(<HealthHistory records={records} />);
    expect(screen.getByText('Normal')).toBeInTheDocument();
    expect(screen.getByText('All clear')).toBeInTheDocument();
  });

  it('shows an empty state when there are no records', () => {
    render(<HealthHistory records={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No health records yet.'
    );
  });
});
