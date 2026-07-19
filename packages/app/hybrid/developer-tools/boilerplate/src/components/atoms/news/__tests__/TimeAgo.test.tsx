import { render, screen } from '@testing-library/react';
import { TimeAgo } from '../TimeAgo';

describe('TimeAgo', () => {
  it('renders just now for recent dates', () => {
    render(<TimeAgo date="2024-01-15T10:00:00Z" now="2024-01-15T10:00:30Z" />);
    expect(screen.getByTestId('time-ago')).toHaveTextContent('just now');
  });

  it('renders minutes ago', () => {
    render(<TimeAgo date="2024-01-15T10:00:00Z" now="2024-01-15T10:05:00Z" />);
    expect(screen.getByTestId('time-ago')).toHaveTextContent('5m ago');
  });

  it('renders hours ago', () => {
    render(<TimeAgo date="2024-01-15T10:00:00Z" now="2024-01-15T14:00:00Z" />);
    expect(screen.getByTestId('time-ago')).toHaveTextContent('4h ago');
  });

  it('renders days ago', () => {
    render(<TimeAgo date="2024-01-10T10:00:00Z" now="2024-01-15T10:00:00Z" />);
    expect(screen.getByTestId('time-ago')).toHaveTextContent('5d ago');
  });

  it('sets the dateTime attribute', () => {
    render(<TimeAgo date="2024-01-15T10:00:00Z" now="2024-01-15T11:00:00Z" />);
    expect(screen.getByTestId('time-ago')).toHaveAttribute(
      'datetime',
      '2024-01-15T10:00:00.000Z'
    );
  });
});
