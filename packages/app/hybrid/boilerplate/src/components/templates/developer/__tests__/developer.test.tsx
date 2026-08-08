import { fireEvent, render, screen, within } from '@testing-library/react';
import { ApiKeysTemplate } from '../ApiKeysTemplate';
import { BackupsTemplate } from '../BackupsTemplate';
import { DeploymentsTemplate } from '../DeploymentsTemplate';
import { EndpointsTemplate } from '../EndpointsTemplate';
import { EnvironmentsTemplate } from '../EnvironmentsTemplate';
import { FeatureFlagsTemplate } from '../FeatureFlagsTemplate';
import { LogsTemplate } from '../LogsTemplate';
import { MonitorsTemplate } from '../MonitorsTemplate';
import ApiKeysPage from '@/app/(templates)/developer/api-keys/page';
import BackupsPage from '@/app/(templates)/developer/backups/page';
import DeploymentsPage from '@/app/(templates)/developer/deployments/page';
import EndpointsPage from '@/app/(templates)/developer/endpoints/page';
import EnvironmentsPage from '@/app/(templates)/developer/environments/page';
import FeatureFlagsPage from '@/app/(templates)/developer/feature-flags/page';
import LogsPage from '@/app/(templates)/developer/logs/page';
import MonitorsPage from '@/app/(templates)/developer/monitors/page';

describe('ApiKeysTemplate', () => {
  it('renders keys with the active summary and status badges', () => {
    render(<ApiKeysTemplate />);
    expect(
      screen.getByRole('heading', { name: 'API Keys' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 active keys')).toBeInTheDocument();
    expect(screen.getByText('Production')).toBeInTheDocument();
    expect(screen.getByText('pk_live_9f2a...')).toBeInTheDocument();
    expect(screen.getByText('Never')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(3);
    expect(within(table).getAllByText('Revoked')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Reveal' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Revoke' })).toHaveLength(3);
  });

  it('reveals and hides a key secret', () => {
    render(<ApiKeysTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Reveal' })[0]);
    expect(screen.getByText('sk_live_XXXXXXXXXXXX')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide' }));
    expect(screen.queryByText('sk_live_XXXXXXXXXXXX')).not.toBeInTheDocument();
  });

  it('revokes a key and hides its actions', () => {
    render(<ApiKeysTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Revoke' })[0]);
    expect(screen.getByText('2 active keys')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(2);
    expect(within(table).getAllByText('Revoked')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Revoke' })).toHaveLength(2);
  });

  it('validates and creates a key', () => {
    render(<ApiKeysTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Create key' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a key name');
    fireEvent.change(screen.getByRole('textbox', { name: 'Key name' }), {
      target: { value: 'CI pipeline' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create key' }));
    expect(screen.getByText('Key created')).toBeInTheDocument();
    expect(screen.getByText('4 active keys')).toBeInTheDocument();
    expect(screen.getByText('pk_new_8a3f...')).toBeInTheDocument();
  });
});

describe('FeatureFlagsTemplate', () => {
  it('renders flags with per-environment checkboxes', () => {
    render(<FeatureFlagsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Feature Flags' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('9 flags enabled across environments')
    ).toBeInTheDocument();
    expect(screen.getByText('new-checkout')).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', {
        name: 'Enable new-checkout in Production',
      })
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', {
        name: 'Enable kill-switch-imports in Development',
      })
    ).not.toBeChecked();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('In production')).toHaveLength(2);
    expect(within(table).getAllByText('Staged')).toHaveLength(3);
  });

  it('toggles a flag across environments', () => {
    render(<FeatureFlagsTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Enable dark-mode-2 in Production' })
    );
    expect(
      screen.getByText('10 flags enabled across environments')
    ).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('In production')).toHaveLength(3);
  });

  it('disables flags and recomputes the summary', () => {
    render(<FeatureFlagsTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Enable instant-search in Staging' })
    );
    expect(
      screen.getByText('8 flags enabled across environments')
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: 'Enable new-checkout in Development',
      })
    );
    expect(
      screen.getByText('7 flags enabled across environments')
    ).toBeInTheDocument();
  });
});

describe('EnvironmentsTemplate', () => {
  it('renders environments with status badges', () => {
    render(<EnvironmentsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Environments' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 of 5 healthy')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('https://sandbox.acme.com')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Healthy')).toHaveLength(3);
    expect(within(table).getAllByText('Warning')).toHaveLength(1);
    expect(within(table).getAllByText('Down')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Restart' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Deploy fix' })).toHaveLength(
      1
    );
  });

  it('filters environments by status', () => {
    render(<EnvironmentsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Down' }));
    expect(screen.getByText('0 of 1 healthy')).toBeInTheDocument();
    expect(screen.getByText('Sandbox')).toBeInTheDocument();
    expect(screen.queryByText('Production')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Healthy' }));
    expect(screen.getByText('3 of 3 healthy')).toBeInTheDocument();
  });

  it('recovers warning and down environments', () => {
    render(<EnvironmentsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Restart' })[0]);
    expect(screen.getByText('4 of 5 healthy')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).queryAllByText('Warning')).toHaveLength(0);
    fireEvent.click(screen.getAllByRole('button', { name: 'Deploy fix' })[0]);
    expect(screen.getByText('5 of 5 healthy')).toBeInTheDocument();
    expect(within(table).queryAllByText('Down')).toHaveLength(0);
  });
});

describe('DeploymentsTemplate', () => {
  it('renders deployments with status badges', () => {
    render(<DeploymentsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Deployments' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 deployments')).toBeInTheDocument();
    expect(screen.getByText('deploy-1042')).toBeInTheDocument();
    expect(screen.getByText('Maya')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Success')).toHaveLength(3);
    expect(within(table).getAllByText('Running')).toHaveLength(2);
    expect(within(table).getAllByText('Failed')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Rollback' })).toHaveLength(3);
  });

  it('filters deployments by status', () => {
    render(<DeploymentsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Running' }));
    expect(screen.getByText('2 deployments')).toBeInTheDocument();
    expect(screen.getByText('deploy-1040')).toBeInTheDocument();
    expect(screen.queryByText('deploy-1042')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Failed' }));
    expect(screen.getByText('1 deployments')).toBeInTheDocument();
    expect(screen.getByText('deploy-1039')).toBeInTheDocument();
  });

  it('rolls back a successful deployment', () => {
    render(<DeploymentsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Rollback' })[0]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Success')).toHaveLength(2);
    expect(within(table).getAllByText('Running')).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Rollback' })).toHaveLength(2);
    expect(screen.getByText('6 deployments')).toBeInTheDocument();
  });
});

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

describe('EndpointsTemplate', () => {
  it('renders endpoints with method and status badges', () => {
    render(<EndpointsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Endpoints' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 endpoints')).toBeInTheDocument();
    expect(screen.getAllByText('/api/users')).toHaveLength(2);
    expect(screen.getByText('340ms')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('GET')).toHaveLength(4);
    expect(within(table).getAllByText('POST')).toHaveLength(2);
    expect(within(table).getAllByText('PUT')).toHaveLength(1);
    expect(within(table).getAllByText('DELETE')).toHaveLength(1);
    expect(within(table).getAllByText('200')).toHaveLength(5);
    expect(within(table).getAllByText('500')).toHaveLength(1);
  });

  it('filters endpoints by method', () => {
    render(<EndpointsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'GET' }));
    expect(screen.getByText('4 endpoints')).toBeInTheDocument();
    expect(screen.getByText('/api/health')).toBeInTheDocument();
    expect(screen.queryByText('/api/webhooks')).not.toBeInTheDocument();
  });

  it('shows a single deleted endpoint when filtered', () => {
    render(<EndpointsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'DELETE' }));
    expect(screen.getByText('1 endpoints')).toBeInTheDocument();
    expect(screen.getByText('/api/users/{id}')).toBeInTheDocument();
    expect(screen.getByText('80ms')).toBeInTheDocument();
  });
});

describe('MonitorsTemplate', () => {
  it('renders monitors with the average uptime summary', () => {
    render(<MonitorsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Monitors' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Uptime')).toHaveLength(2);
    expect(screen.getByText('99.61%')).toBeInTheDocument();
    expect(screen.getByText('Production API')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Up')).toHaveLength(3);
    expect(within(table).getAllByText('Down')).toHaveLength(1);
    expect(within(table).getAllByText('Paused')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Pause' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Resume' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Retry' })).toHaveLength(1);
  });

  it('pauses and resumes a monitor', () => {
    render(<MonitorsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Pause' })[0]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Up')).toHaveLength(2);
    expect(within(table).getAllByText('Paused')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Resume' })).toHaveLength(2);
    fireEvent.click(screen.getAllByRole('button', { name: 'Resume' })[0]);
    expect(within(table).getAllByText('Up')).toHaveLength(3);
    expect(within(table).getAllByText('Paused')).toHaveLength(1);
  });

  it('retries a down monitor', () => {
    render(<MonitorsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Retry' })[0]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Up')).toHaveLength(4);
    expect(within(table).queryAllByText('Down')).toHaveLength(0);
    expect(screen.queryAllByRole('button', { name: 'Retry' })).toHaveLength(0);
  });
});

describe('BackupsTemplate', () => {
  it('renders backups with the completed summary', () => {
    render(<BackupsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Backups' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 completed backups')).toBeInTheDocument();
    expect(screen.getByText('Production database')).toBeInTheDocument();
    expect(screen.getByText('4.2 GB')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Completed')).toHaveLength(3);
    expect(within(table).getAllByText('Running')).toHaveLength(1);
    expect(within(table).getAllByText('Failed')).toHaveLength(1);
    expect(
      screen.getAllByRole('button', { name: 'Mark complete' })
    ).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Restore' })).toHaveLength(3);
  });

  it('creates an on-demand backup', () => {
    render(<BackupsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Create backup' }));
    expect(screen.getByText('Backup created')).toBeInTheDocument();
    expect(screen.getByText('On-demand backup')).toBeInTheDocument();
    expect(screen.getByText('0 B')).toBeInTheDocument();
    expect(screen.getByText('3 completed backups')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Mark complete' })
    ).toHaveLength(2);
  });

  it('marks a backup complete and restores one', () => {
    render(<BackupsTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Mark complete' })[0]
    );
    expect(screen.getByText('4 completed backups')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).queryAllByText('Running')).toHaveLength(0);
    expect(within(table).getAllByText('Completed')).toHaveLength(4);
    fireEvent.click(screen.getAllByRole('button', { name: 'Restore' })[0]);
    expect(screen.getByText('3 completed backups')).toBeInTheDocument();
    expect(within(table).getAllByText('Running')).toHaveLength(1);
  });
});

describe('Developer pages', () => {
  it('renders the ApiKeysPage', () => {
    render(<ApiKeysPage />);
    expect(screen.getByText('3 active keys')).toBeInTheDocument();
  });

  it('renders the FeatureFlagsPage', () => {
    render(<FeatureFlagsPage />);
    expect(
      screen.getByText('9 flags enabled across environments')
    ).toBeInTheDocument();
  });

  it('renders the EnvironmentsPage', () => {
    render(<EnvironmentsPage />);
    expect(screen.getByText('3 of 5 healthy')).toBeInTheDocument();
  });

  it('renders the DeploymentsPage', () => {
    render(<DeploymentsPage />);
    expect(screen.getByText('6 deployments')).toBeInTheDocument();
  });

  it('renders the LogsPage', () => {
    render(<LogsPage />);
    expect(screen.getByText('8 logs')).toBeInTheDocument();
  });

  it('renders the EndpointsPage', () => {
    render(<EndpointsPage />);
    expect(screen.getByText('8 endpoints')).toBeInTheDocument();
  });

  it('renders the MonitorsPage', () => {
    render(<MonitorsPage />);
    expect(screen.getByText('99.61%')).toBeInTheDocument();
  });

  it('renders the BackupsPage', () => {
    render(<BackupsPage />);
    expect(screen.getByText('3 completed backups')).toBeInTheDocument();
  });
});
