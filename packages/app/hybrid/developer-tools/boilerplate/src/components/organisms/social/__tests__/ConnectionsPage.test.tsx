import { fireEvent, render, screen } from '@testing-library/react';
import { ConnectionsPage } from '../ConnectionsPage';

const connections = [
  {
    id: 'c1',
    name: 'Ada',
    handle: '@ada',
    mutuals: 4,
  },
  {
    id: 'c2',
    name: 'Grace',
    handle: '@grace',
    mutuals: 11,
    connected: true,
  },
];

describe('ConnectionsPage', () => {
  it('renders person names, handles and mutuals', () => {
    render(<ConnectionsPage connections={connections} />);
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('@ada')).toBeInTheDocument();
    expect(screen.getByText('4 mutual connections')).toBeInTheDocument();
  });

  it('shows the connected count', () => {
    render(<ConnectionsPage connections={connections} />);
    expect(screen.getByText('1 connected')).toBeInTheDocument();
  });

  it('fires onConnect with the id of an unconnected person', () => {
    const onConnect = jest.fn();
    render(<ConnectionsPage connections={connections} onConnect={onConnect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Connect' }));
    expect(onConnect).toHaveBeenCalledWith('c1');
  });

  it('labels connected people with a Connected button', () => {
    render(<ConnectionsPage connections={connections} />);
    expect(
      screen.getByRole('button', { name: 'Connected' })
    ).toBeInTheDocument();
  });
});
