import { render, screen } from '@testing-library/react';
import { LogViewer } from '../LogViewer';

describe('LogViewer', () => {
  it('renders log entries with levels', () => {
    render(
      <LogViewer
        entries={[
          { id: '1', message: 'Server started', level: 'info', time: '10:00' },
          { id: '2', message: 'Request failed', level: 'error', time: '10:01' },
        ]}
      />
    );
    expect(screen.getByText('Log viewer')).toBeInTheDocument();
    expect(screen.getByText('Server started')).toBeInTheDocument();
    expect(screen.getByText('Request failed')).toBeInTheDocument();
  });

  it('shows line count', () => {
    render(
      <LogViewer
        entries={[
          { id: '1', message: 'a' },
          { id: '2', message: 'b' },
          { id: '3', message: 'c' },
        ]}
      />
    );
    expect(screen.getByText('3 lines')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<LogViewer entries={[]} />);
    expect(screen.getByText('No log entries.')).toBeInTheDocument();
  });
});
