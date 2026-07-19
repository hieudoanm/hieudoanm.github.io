import { fireEvent, render, screen } from '@testing-library/react';
import { StarredView } from '../StarredView';

describe('StarredView', () => {
  const emails = [
    {
      id: '1',
      from: 'Ada Lovelace',
      subject: 'Design review',
      time: '9:00 AM',
    },
    { id: '2', from: 'Grace Hopper', subject: 'Budget', time: '8:00 AM' },
  ];

  it('renders starred emails with sender and time', () => {
    render(<StarredView emails={emails} />);
    expect(screen.getByText('Design review')).toBeInTheDocument();
    expect(screen.getByText(/Ada Lovelace/)).toBeInTheDocument();
  });

  it('renders the starred count', () => {
    render(<StarredView emails={emails} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('fires onUnstar with the clicked email', () => {
    const onUnstar = jest.fn();
    render(<StarredView emails={emails} onUnstar={onUnstar} />);
    fireEvent.click(screen.getByLabelText('Unstar Budget'));
    expect(onUnstar).toHaveBeenCalledWith(emails[1]);
  });

  it('shows an empty state when nothing is starred', () => {
    render(<StarredView emails={[]} />);
    expect(screen.getByText('No starred emails')).toBeInTheDocument();
  });
});
