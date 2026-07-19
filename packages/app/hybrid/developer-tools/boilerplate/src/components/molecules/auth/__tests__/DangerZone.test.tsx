import { render, screen } from '@testing-library/react';
import { DangerZone } from '../DangerZone';

describe('DangerZone', () => {
  const items = [
    {
      id: 'delete',
      label: 'Delete account',
      description: 'Permanently remove everything.',
      action: <button>Delete</button>,
    },
  ];

  it('renders title, labels, and descriptions', () => {
    render(<DangerZone items={items} />);
    expect(screen.getByText('Danger zone')).toBeInTheDocument();
    expect(screen.getByText('Delete account')).toBeInTheDocument();
    expect(
      screen.getByText('Permanently remove everything.')
    ).toBeInTheDocument();
  });

  it('renders custom title and actions', () => {
    render(<DangerZone items={items} title="Destructive" />);
    expect(screen.getByText('Destructive')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });
});
