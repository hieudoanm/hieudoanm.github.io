import { fireEvent, render, screen } from '@testing-library/react';
import { PermissionsTemplate } from '../PermissionsTemplate';

describe('PermissionsTemplate', () => {
  it('renders the matrix with an all-enabled admin column', () => {
    render(<PermissionsTemplate />);
    expect(screen.getByText('6 of 6 permissions granted')).toBeInTheDocument();
    expect(screen.getByText('Manage members')).toBeInTheDocument();
    const adminBoxes = screen.getAllByRole('checkbox', { name: /for Admin/ });
    expect(adminBoxes).toHaveLength(6);
    adminBoxes.forEach((box) => expect(box).toBeChecked());
    adminBoxes.forEach((box) => expect(box).toBeDisabled());
  });

  it('toggles editor and viewer permissions', () => {
    render(<PermissionsTemplate />);
    expect(screen.getByText('3 granted')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Grant Edit projects for Editor' })
    );
    expect(screen.getByText('2 granted')).toBeInTheDocument();
    expect(screen.queryByText('3 granted')).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Grant View projects for Viewer' })
    );
    expect(screen.queryByText('1 granted')).not.toBeInTheDocument();
    expect(screen.getByText('0 granted')).toBeInTheDocument();
  });
});
