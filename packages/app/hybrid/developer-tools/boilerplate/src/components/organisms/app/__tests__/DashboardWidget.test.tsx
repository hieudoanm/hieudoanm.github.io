import { render, screen } from '@testing-library/react';
import { DashboardWidget } from '../DashboardWidget';

describe('DashboardWidget', () => {
  it('renders title and children', () => {
    render(
      <DashboardWidget title="Revenue">
        <p>Widget body</p>
      </DashboardWidget>
    );
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Widget body')).toBeInTheDocument();
  });

  it('renders an optional subtitle', () => {
    render(
      <DashboardWidget title="Revenue" subtitle="Last 30 days">
        <p>Body</p>
      </DashboardWidget>
    );
    expect(screen.getByText('Last 30 days')).toBeInTheDocument();
  });

  it('renders the action node', () => {
    render(
      <DashboardWidget title="Revenue" action={<button>Refresh</button>}>
        <p>Body</p>
      </DashboardWidget>
    );
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
  });
});
