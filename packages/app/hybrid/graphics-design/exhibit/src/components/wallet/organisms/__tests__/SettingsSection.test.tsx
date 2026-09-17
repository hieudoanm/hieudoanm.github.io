import { render, screen, fireEvent } from '@testing-library/react';
import SettingsSection from '../SettingsSection';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock('react-icons/fi', () => {
  const Icon = ({ children }: { children?: React.ReactNode }) => (
    <span data-testid="icon">{children}</span>
  );
  return {
    FiBell: Icon,
    FiBellOff: Icon,
    FiLock: Icon,
    FiGlobe: Icon,
    FiHelpCircle: Icon,
    FiFileText: Icon,
    FiShield: Icon,
  };
});

describe('SettingsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders push notification toggle', () => {
    render(<SettingsSection />);
    expect(screen.getByText('Push Notifications')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('renders biometric login toggle', () => {
    render(<SettingsSection />);
    expect(screen.getByText('Biometric Login')).toBeInTheDocument();
  });

  it('toggles push notifications', () => {
    render(<SettingsSection />);
    const toggle = screen.getAllByRole('checkbox')[0];
    expect(toggle).toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });

  it('toggles biometric login', () => {
    render(<SettingsSection />);
    const toggle = screen.getAllByRole('checkbox')[1];
    expect(toggle).toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });

  it('renders language selector', () => {
    render(<SettingsSection />);
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText(/English/)).toBeInTheDocument();
  });

  it('opens language dropdown', () => {
    render(<SettingsSection />);
    fireEvent.click(screen.getByRole('button', { name: /English/i }));
    expect(
      screen.getByRole('button', { name: 'Vietnamese' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Japanese' })
    ).toBeInTheDocument();
  });

  it('selects a language and closes dropdown', () => {
    render(<SettingsSection />);
    fireEvent.click(screen.getByRole('button', { name: /English/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Japanese' }));
    expect(screen.getByText(/Japanese/)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'French' })
    ).not.toBeInTheDocument();
  });

  it('renders footer links scoped to the wallet app', () => {
    render(<SettingsSection />);
    expect(screen.getByRole('link', { name: /help/i })).toHaveAttribute(
      'href',
      '/wallet/help-support'
    );
    expect(screen.getByRole('link', { name: /terms/i })).toHaveAttribute(
      'href',
      '/wallet/terms-of-service'
    );
    expect(screen.getByRole('link', { name: /privacy/i })).toHaveAttribute(
      'href',
      '/wallet/privacy-policy'
    );
  });

  it('persists push notification setting to localStorage', () => {
    render(<SettingsSection />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(localStorage.getItem('wallet-push-notifications')).toBe('false');
  });

  it('persists biometric setting to localStorage', () => {
    render(<SettingsSection />);
    fireEvent.click(screen.getAllByRole('checkbox')[1]);
    expect(localStorage.getItem('wallet-biometric')).toBe('false');
  });

  it('loads settings from localStorage', () => {
    localStorage.setItem('wallet-push-notifications', 'false');
    localStorage.setItem('wallet-biometric', 'false');
    render(<SettingsSection />);
    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
    expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked();
  });

  it('leaves theming to the exhibit header', () => {
    render(<SettingsSection />);
    expect(screen.queryByText('Dark Mode')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /toggle theme/i })
    ).not.toBeInTheDocument();
  });
});
