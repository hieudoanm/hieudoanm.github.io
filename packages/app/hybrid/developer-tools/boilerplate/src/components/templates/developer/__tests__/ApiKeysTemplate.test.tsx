import { fireEvent, render, screen, within } from '@testing-library/react';
import { ApiKeysTemplate } from '../ApiKeysTemplate';

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
