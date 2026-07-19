import { render, screen } from '@testing-library/react';
import { DevServerStatus } from '../DevServerStatus';

describe('DevServerStatus', () => {
  it('renders services with statuses and ports', () => {
    render(
      <DevServerStatus
        services={[
          { id: '1', name: 'Web', status: 'online', port: 3000, uptime: '2h' },
          { id: '2', name: 'API', status: 'offline', port: 4000 },
        ]}
      />
    );
    expect(screen.getByText('Development servers')).toBeInTheDocument();
    expect(screen.getByText('Web')).toBeInTheDocument();
    expect(screen.getByText('localhost:3000')).toBeInTheDocument();
    expect(screen.getByText('Up 2h')).toBeInTheDocument();
    expect(screen.getByText('offline')).toBeInTheDocument();
  });
});
