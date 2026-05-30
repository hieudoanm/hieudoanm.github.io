import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileTemplate } from '../ProfileTemplate';

describe('ProfileTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<ProfileTemplate />);
    expect(container).toMatchSnapshot();
  });

  it('renders nav with brand name', () => {
    render(<ProfileTemplate />);
    expect(screen.getAllByText('Forma').length).toBeGreaterThan(0);
  });

  it('renders user avatar with initials', () => {
    render(<ProfileTemplate userName="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders user name', () => {
    render(<ProfileTemplate userName="Jane Doe" />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders user email', () => {
    render(<ProfileTemplate userEmail="jane@forma.io" />);
    expect(screen.getByText('jane@forma.io')).toBeInTheDocument();
  });

  it('renders member since date', () => {
    render(<ProfileTemplate memberSince="March 2023" />);
    expect(screen.getByText(/Member since March 2023/)).toBeInTheDocument();
  });

  it('renders account settings section', () => {
    render(<ProfileTemplate />);
    expect(screen.getByText('Account settings')).toBeInTheDocument();
  });

  it('renders name input with default value', () => {
    render(<ProfileTemplate userName="Jane Doe" />);
    const input = screen.getByDisplayValue('Jane Doe');
    expect(input).toBeInTheDocument();
  });

  it('renders email input with default value', () => {
    render(<ProfileTemplate userEmail="jane@forma.io" />);
    const input = screen.getByDisplayValue('jane@forma.io');
    expect(input).toBeInTheDocument();
  });

  it('renders change password section', () => {
    render(<ProfileTemplate />);
    expect(screen.getByText('Change password')).toBeInTheDocument();
  });

  it('renders notifications section', () => {
    render(<ProfileTemplate />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('renders danger zone section', () => {
    render(<ProfileTemplate />);
    expect(screen.getByText('Danger zone')).toBeInTheDocument();
  });

  it('renders delete account button', () => {
    render(<ProfileTemplate />);
    expect(screen.getByText('Delete account')).toBeInTheDocument();
  });

  it('renders save changes button', () => {
    render(<ProfileTemplate />);
    expect(screen.getByText('Save changes')).toBeInTheDocument();
  });

  it('renders update password button', () => {
    render(<ProfileTemplate />);
    expect(screen.getByText('Update password')).toBeInTheDocument();
  });

  it('renders home link in nav', () => {
    render(<ProfileTemplate />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<ProfileTemplate />);
    expect(screen.getByText(/Built with care/)).toBeInTheDocument();
  });

  it('updates name input on change', () => {
    render(<ProfileTemplate />);
    const input = screen.getByDisplayValue('Guest User');
    fireEvent.change(input, { target: { value: 'New Name' } });
    expect(screen.getByDisplayValue('New Name')).toBeInTheDocument();
  });

  it('updates email input on change', () => {
    render(<ProfileTemplate />);
    const input = screen.getByDisplayValue('guest@example.com');
    fireEvent.change(input, { target: { value: 'new@example.com' } });
    expect(screen.getByDisplayValue('new@example.com')).toBeInTheDocument();
  });

  it('toggles notification checkboxes', () => {
    render(<ProfileTemplate />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(3);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });
});
