import { fireEvent, render, screen } from '@testing-library/react';
import { IntegrationsTemplate } from '../IntegrationsTemplate';

describe('IntegrationsTemplate', () => {
  it('renders integration cards with connection state', () => {
    render(<IntegrationsTemplate />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Slack')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Stripe')).toBeInTheDocument();
    expect(screen.getAllByText('Connected')).toHaveLength(2);
  });

  it('connects a disconnected integration', () => {
    render(<IntegrationsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Connect' })[0]);
    expect(screen.getAllByText('Connected')).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Disconnect' })).toHaveLength(
      3
    );
  });

  it('disconnects a connected integration', () => {
    render(<IntegrationsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Disconnect' })[0]);
    expect(screen.getAllByText('Connected')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Connect' })).toHaveLength(4);
  });

  it('filters integrations by search query', () => {
    render(<IntegrationsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search integrations...'), {
      target: { value: 'Stripe' },
    });
    expect(screen.getByText('Stripe')).toBeInTheDocument();
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
  });

  it('shows an empty state when no integrations match', () => {
    render(<IntegrationsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search integrations...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No integrations found')).toBeInTheDocument();
  });
});
