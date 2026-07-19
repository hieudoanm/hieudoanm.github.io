import { fireEvent, render, screen } from '@testing-library/react';
import { PermissionMatrix } from '../PermissionMatrix';

const value: Record<string, string[]> = {
  admin: ['read', 'write'],
  member: ['read'],
};

describe('PermissionMatrix', () => {
  it('renders roles, permissions, and checked cells', () => {
    render(
      <PermissionMatrix
        roles={['admin', 'member']}
        permissions={['read', 'write']}
        value={value}
      />
    );
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('member')).toBeInTheDocument();
    expect(screen.getByTestId('cell-admin-read')).toBeChecked();
    expect(screen.getByTestId('cell-member-write')).not.toBeChecked();
  });

  it('fires onChange when a cell is toggled', () => {
    const onChange = jest.fn();
    render(
      <PermissionMatrix
        roles={['admin']}
        permissions={['read']}
        value={value}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByTestId('cell-admin-read'));
    expect(onChange).toHaveBeenCalledWith('admin', 'read', false);
  });

  it('disables cells in readonly mode', () => {
    render(
      <PermissionMatrix
        roles={['admin']}
        permissions={['read']}
        value={value}
        readonly
      />
    );
    expect(screen.getByTestId('cell-admin-read')).toBeDisabled();
  });

  it('shows an empty state without roles', () => {
    render(
      <PermissionMatrix roles={[]} permissions={['read']} value={value} />
    );
    expect(screen.getByText('No roles configured.')).toBeInTheDocument();
  });
});
