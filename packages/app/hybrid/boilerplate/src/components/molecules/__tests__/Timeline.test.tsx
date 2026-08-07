import { render, screen } from '@testing-library/react';
import { Timeline } from '../Timeline';

describe('Timeline', () => {
  const items = [
    { title: 'Created', time: '09:00', description: 'Ticket opened' },
    { title: 'Assigned', time: '10:30' },
  ];

  it('renders item titles and times', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Created')).toBeInTheDocument();
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('Assigned')).toBeInTheDocument();
    expect(screen.getByText('10:30')).toBeInTheDocument();
  });

  it('renders descriptions when provided', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Ticket opened')).toBeInTheDocument();
  });
});
