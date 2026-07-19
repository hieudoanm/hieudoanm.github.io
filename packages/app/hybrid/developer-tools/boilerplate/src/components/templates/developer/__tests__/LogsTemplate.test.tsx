import { fireEvent, render, screen } from '@testing-library/react';
import { LogsTemplate } from '../LogsTemplate';

describe('LogsTemplate', () => {
  it('renders logs with level badges', () => {
    render(<LogsTemplate />);
    expect(screen.getByRole('heading', { name: 'Logs' })).toBeInTheDocument();
    expect(screen.getByText('8 logs')).toBeInTheDocument();
    expect(screen.getByText('User signed in')).toBeInTheDocument();
    expect(screen.getByText('Rate limit reached')).toBeInTheDocument();
    expect(screen.getAllByText('info')).toHaveLength(4);
    expect(screen.getAllByText('warn')).toHaveLength(2);
    expect(screen.getAllByText('error')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Clear logs' })
    ).toBeInTheDocument();
  });

  it('filters logs by level and searches messages', () => {
    render(<LogsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Warn' }));
    expect(screen.getByText('2 logs')).toBeInTheDocument();
    expect(screen.getByText('Slow query detected')).toBeInTheDocument();
    expect(screen.queryByText('User signed in')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Search logs' }), {
      target: { value: 'cache' },
    });
    expect(screen.getByText('1 logs')).toBeInTheDocument();
    expect(screen.getByText('Cache warmed')).toBeInTheDocument();
    expect(screen.queryByText('User signed in')).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox', { name: 'Search logs' }), {
      target: { value: 'zzzz' },
    });
    expect(screen.getByText('0 logs')).toBeInTheDocument();
    expect(screen.getByText('No logs to display')).toBeInTheDocument();
  });

  it('clears all logs and shows the empty state', () => {
    render(<LogsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear logs' }));
    expect(screen.getByText('0 logs')).toBeInTheDocument();
    expect(screen.getByText('No logs to display')).toBeInTheDocument();
    expect(screen.queryByText('User signed in')).not.toBeInTheDocument();
  });
});
