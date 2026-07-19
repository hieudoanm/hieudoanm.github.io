import { fireEvent, render, screen } from '@testing-library/react';
import DeleteAccountPage from '@/app/(templates)/auth/delete-account/page';
import { DeleteAccountTemplate } from '../DeleteAccountTemplate';

describe('DeleteAccountTemplate', () => {
  it('renders the danger zone with a disabled delete button', () => {
    render(<DeleteAccountTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Delete account' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Deleting your account will permanently remove all your data, orders, and personal information. This cannot be reversed.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Delete account' })
    ).toBeDisabled();
  });

  it('enables the delete button once the checkbox is checked', () => {
    render(<DeleteAccountTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: 'I understand this is permanent',
      })
    );
    expect(
      screen.getByRole('button', { name: 'Delete account' })
    ).toBeEnabled();
  });

  it('shows the confirmation after deleting', () => {
    render(<DeleteAccountTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: 'I understand this is permanent',
      })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete account' }));
    expect(screen.getByText('Account deletion requested')).toBeInTheDocument();
  });

  it('does not submit without the checkbox checked', () => {
    render(<DeleteAccountTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete account' }));
    expect(
      screen.queryByText('Account deletion requested')
    ).not.toBeInTheDocument();
  });

  it('renders the DeleteAccountPage', () => {
    render(<DeleteAccountPage />);
    expect(
      screen.getByRole('heading', { name: 'Delete account' })
    ).toBeInTheDocument();
  });
});
