import { fireEvent, render, screen } from '@testing-library/react';
import { DeleteAccountTemplate } from '../DeleteAccountTemplate';
import { RecoveryCodesTemplate } from '../RecoveryCodesTemplate';
import { SecurityOverviewTemplate } from '../SecurityOverviewTemplate';
import { SessionsTemplate } from '../SessionsTemplate';
import DeleteAccountPage from '@/app/(auth)/delete-account/page';
import RecoveryCodesPage from '@/app/(auth)/recovery-codes/page';
import SecurityPage from '@/app/(auth)/security/page';
import SessionsPage from '@/app/(auth)/sessions/page';

describe('SessionsTemplate', () => {
  it('renders the active session list', () => {
    render(<SessionsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Active sessions' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 active sessions')).toBeInTheDocument();
    expect(screen.getByText('Chrome 138 on macOS 15')).toBeInTheDocument();
    expect(screen.getByText('Firefox 137 on Windows 11')).toBeInTheDocument();
    expect(screen.getByText('Safari 20 on iOS 19')).toBeInTheDocument();
    expect(screen.getByText('Ho Chi Minh City, VN')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Revoke' })).toHaveLength(3);
  });

  it('revokes a session', () => {
    render(<SessionsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Revoke' })[1]);
    expect(
      screen.queryByText('Firefox 137 on Windows 11')
    ).not.toBeInTheDocument();
    expect(screen.getByText('2 active sessions')).toBeInTheDocument();
  });

  it('signs out everywhere else and keeps the current session', () => {
    render(<SessionsTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Sign out everywhere else' })
    );
    expect(screen.getByText('1 active sessions')).toBeInTheDocument();
    expect(screen.getByText('Chrome 138 on macOS 15')).toBeInTheDocument();
    expect(
      screen.queryByText('Firefox 137 on Windows 11')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Safari 20 on iOS 19')).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Revoke' })).toHaveLength(1);
  });

  it('shows the empty state when all sessions are revoked', () => {
    render(<SessionsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Revoke' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Revoke' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Revoke' })[0]);
    expect(screen.getByText('No active sessions')).toBeInTheDocument();
  });

  it('renders the SessionsPage', () => {
    render(<SessionsPage />);
    expect(screen.getByText('3 active sessions')).toBeInTheDocument();
  });
});

describe('RecoveryCodesTemplate', () => {
  it('renders masked codes by default', () => {
    render(<RecoveryCodesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Recovery codes' })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        '\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022'
      )
    ).toHaveLength(8);
    expect(screen.queryByText('7F2K-9QXP-L4MN')).not.toBeInTheDocument();
  });

  it('reveals and hides the codes via the toggle', () => {
    render(<RecoveryCodesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Reveal codes' }));
    expect(screen.getByText('7F2K-9QXP-L4MN')).toBeInTheDocument();
    expect(
      screen.queryAllByText(
        '\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022'
      )
    ).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: 'Hide codes' }));
    expect(screen.queryByText('7F2K-9QXP-L4MN')).not.toBeInTheDocument();
  });

  it('regenerates the codes and shows a confirmation', () => {
    render(<RecoveryCodesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Regenerate codes' }));
    expect(screen.getByText('Codes regenerated')).toBeInTheDocument();
    expect(screen.getByText('RN01-F2K4-M7QT')).toBeInTheDocument();
    expect(screen.queryByText('7F2K-9QXP-L4MN')).not.toBeInTheDocument();
  });

  it('renders the RecoveryCodesPage', () => {
    render(<RecoveryCodesPage />);
    expect(
      screen.getByRole('heading', { name: 'Recovery codes' })
    ).toBeInTheDocument();
  });
});

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

describe('SecurityOverviewTemplate', () => {
  it('renders feature cards with status badges', () => {
    render(<SecurityOverviewTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Security overview' })
    ).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Two-factor authentication')).toBeInTheDocument();
    expect(screen.getByText('Recovery codes')).toBeInTheDocument();
    expect(screen.getByText('Active sessions')).toBeInTheDocument();
    expect(screen.getAllByText('Set')).toHaveLength(2);
    expect(screen.getAllByText('Not set')).toHaveLength(1);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('enables two-factor via the set up button', () => {
    render(<SecurityOverviewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Set up' }));
    expect(screen.getByText('Enabled')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Disable 2FA' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Not set')).not.toBeInTheDocument();
  });

  it('toggles the password status', () => {
    render(<SecurityOverviewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove password' }));
    expect(screen.getAllByText('Not set')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Set password' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Set password' }));
    expect(screen.getAllByText('Set')).toHaveLength(2);
  });

  it('removes the recovery codes', () => {
    render(<SecurityOverviewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove codes' }));
    expect(screen.getAllByText('Not set')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Generate codes' })
    ).toBeInTheDocument();
  });

  it('signs out and back in for sessions', () => {
    render(<SecurityOverviewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders the SecurityPage', () => {
    render(<SecurityPage />);
    expect(
      screen.getByRole('heading', { name: 'Security overview' })
    ).toBeInTheDocument();
  });
});
