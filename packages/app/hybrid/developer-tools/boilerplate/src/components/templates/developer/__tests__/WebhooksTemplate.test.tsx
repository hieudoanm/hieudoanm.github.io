import { fireEvent, render, screen } from '@testing-library/react';
import { WebhooksTemplate } from '../WebhooksTemplate';

describe('WebhooksTemplate', () => {
  it('renders webhook endpoints with status badges', () => {
    render(<WebhooksTemplate />);
    expect(screen.getByText('Deployments')).toBeInTheDocument();
    expect(
      screen.getByText('https://hooks.example.com/deployments')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Disabled')).toHaveLength(1);
  });

  it('toggles webhooks between active and disabled', () => {
    render(<WebhooksTemplate />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Toggle Members' }));
    expect(screen.getAllByText('Active')).toHaveLength(3);
    expect(screen.queryByText('Disabled')).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Toggle Deployments' })
    );
    expect(screen.getAllByText('Disabled')).toHaveLength(1);
    expect(screen.getAllByText('Active')).toHaveLength(2);
  });

  it('shows test sent feedback', () => {
    render(<WebhooksTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Test' })[0]);
    expect(screen.getByText('Test sent')).toBeInTheDocument();
  });
});
