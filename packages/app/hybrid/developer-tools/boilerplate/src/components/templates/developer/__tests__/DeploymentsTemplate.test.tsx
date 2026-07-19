import { fireEvent, render, screen, within } from '@testing-library/react';
import { DeploymentsTemplate } from '../DeploymentsTemplate';

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
