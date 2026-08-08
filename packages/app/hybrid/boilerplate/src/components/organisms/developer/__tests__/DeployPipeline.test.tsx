import { render, screen } from '@testing-library/react';
import { DeployPipeline } from '../DeployPipeline';

describe('DeployPipeline', () => {
  it('renders steps with statuses and durations', () => {
    render(
      <DeployPipeline
        steps={[
          { id: '1', name: 'Build', status: 'success', duration: '1m 20s' },
          { id: '2', name: 'Test', status: 'running' },
          { id: '3', name: 'Deploy', status: 'pending' },
        ]}
      />
    );
    expect(screen.getByText('Deploy pipeline')).toBeInTheDocument();
    expect(screen.getByText('Build')).toBeInTheDocument();
    expect(screen.getByText('1m 20s')).toBeInTheDocument();
    expect(screen.getByText('success')).toBeInTheDocument();
    expect(screen.getByText('running')).toBeInTheDocument();
  });

  it('applies the correct badge for failed steps', () => {
    render(
      <DeployPipeline
        steps={[{ id: '1', name: 'Build', status: 'failed' }]}
        title="Pipeline"
      />
    );
    expect(screen.getByText('failed')).toHaveClass('badge-error');
  });
});
