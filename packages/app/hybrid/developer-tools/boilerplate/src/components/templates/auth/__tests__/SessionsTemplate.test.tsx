import { fireEvent, render, screen } from '@testing-library/react';
import SessionsPage from '@/app/(templates)/auth/sessions/page';
import { SessionsTemplate } from '../SessionsTemplate';

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
