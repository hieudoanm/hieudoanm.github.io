import { fireEvent, render, screen } from '@testing-library/react';
import { LiveUpdate } from '../LiveUpdate';

const updates = [
  { id: '1', time: '09:00', content: 'Session begins.' },
  { id: '2', time: '09:05', content: 'Vote in progress.' },
  { id: '3', time: '09:10', content: 'Results expected soon.' },
  { id: '4', time: '09:15', content: 'Interim tally released.' },
];

describe('LiveUpdate', () => {
  it('renders live badge, title and initial updates', () => {
    render(<LiveUpdate updates={updates} />);
    expect(screen.getByText('LIVE')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('Session begins.')).toBeInTheDocument();
    expect(
      screen.queryByText('Interim tally released.')
    ).not.toBeInTheDocument();
  });

  it('renders the time for each update', () => {
    render(<LiveUpdate updates={updates} initialVisible={2} />);
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('09:05')).toBeInTheDocument();
  });

  it('reveals more updates when show more is clicked', () => {
    render(<LiveUpdate updates={updates} />);
    fireEvent.click(screen.getByRole('button', { name: 'Show more' }));
    expect(screen.getByText('Interim tally released.')).toBeInTheDocument();
  });

  it('hides the live badge when live is false', () => {
    render(<LiveUpdate updates={updates} live={false} />);
    expect(screen.queryByText('LIVE')).not.toBeInTheDocument();
  });
});
