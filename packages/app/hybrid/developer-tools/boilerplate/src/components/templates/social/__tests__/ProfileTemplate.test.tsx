import { fireEvent, render, screen } from '@testing-library/react';
import { ProfileTemplate } from '../ProfileTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('ProfileTemplate', () => {
  it('renders user info and initials', () => {
    render(
      <ProfileTemplate
        userName="John Doe"
        userEmail="john@test.com"
        memberSince="2023"
      />
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@test.com')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText(/Member since 2023/)).toBeInTheDocument();
  });

  it('edits name and email fields', () => {
    render(<ProfileTemplate />);
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'New Name' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'new@test.com' },
    });
    expect(screen.getByLabelText('Name')).toHaveValue('New Name');
    expect(screen.getByLabelText('Email')).toHaveValue('new@test.com');
  });

  it('edits password fields', () => {
    render(<ProfileTemplate />);
    fireEvent.change(screen.getByLabelText('Current password'), {
      target: { value: 'old-password' },
    });
    fireEvent.change(screen.getByLabelText('New password'), {
      target: { value: 'new-password' },
    });
    fireEvent.change(screen.getByLabelText('Confirm'), {
      target: { value: 'new-password' },
    });
    expect(screen.getByLabelText('New password')).toHaveValue('new-password');
  });

  it('toggles notification checkboxes', () => {
    render(<ProfileTemplate />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
    fireEvent.click(checkboxes[2]);
    expect(checkboxes[2]).toBeChecked();
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).not.toBeChecked();
  });

  it('renders all sections', () => {
    render(<ProfileTemplate />);
    expect(screen.getByText('Account settings')).toBeInTheDocument();
    expect(screen.getByText('Change password')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Danger zone')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Delete account/ })
    ).toBeInTheDocument();
  });
});
