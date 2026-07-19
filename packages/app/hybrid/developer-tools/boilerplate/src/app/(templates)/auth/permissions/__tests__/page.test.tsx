import { render, screen } from '@testing-library/react';
import PermissionsPage from '@/app/(templates)/auth/permissions/page';

describe('PermissionsPage', () => {
  it('renders the PermissionsPage', () => {
    render(<PermissionsPage />);
    expect(screen.getByText('6 of 6 permissions granted')).toBeInTheDocument();
  });
});
