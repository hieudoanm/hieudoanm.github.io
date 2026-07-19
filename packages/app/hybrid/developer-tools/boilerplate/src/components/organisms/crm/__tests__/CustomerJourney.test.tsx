import { render, screen } from '@testing-library/react';
import { CustomerJourney } from '../CustomerJourney';

describe('CustomerJourney', () => {
  it('renders steps with statuses and descriptions', () => {
    render(
      <CustomerJourney
        steps={[
          { id: 'a', title: 'Awareness', status: 'completed' },
          {
            id: 'b',
            title: 'Evaluation',
            description: 'Comparing options.',
            status: 'current',
          },
          { id: 'c', title: 'Purchase', status: 'upcoming' },
        ]}
      />
    );
    expect(screen.getByText('Customer journey')).toBeInTheDocument();
    expect(screen.getByText('Awareness')).toBeInTheDocument();
    expect(screen.getByText('completed')).toBeInTheDocument();
    expect(screen.getByText('Comparing options.')).toBeInTheDocument();
    expect(screen.getByText('current')).toBeInTheDocument();
  });

  it('renders steps without optional fields', () => {
    render(<CustomerJourney steps={[{ id: 'a', title: 'Awareness' }]} />);
    expect(screen.getByText('Awareness')).toBeInTheDocument();
  });
});
