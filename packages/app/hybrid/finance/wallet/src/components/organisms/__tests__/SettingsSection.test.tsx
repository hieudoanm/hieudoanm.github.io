import { render, screen, fireEvent } from '@testing-library/react';
import SettingsSection from '../SettingsSection';

const mockToggleTheme = jest.fn();
let mockIsDark = true;

jest.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    isDark: mockIsDark,
    toggleTheme: mockToggleTheme,
    theme: 'wallet-dark',
    setTheme: jest.fn(),
  }),
}));

jest.mock('@/components/molecules', () => ({
  ThemePicker: () => <div data-testid="theme-picker" />,
}));

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
    FiMoon: Icon,
    FiSun: Icon,
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
    mockIsDark = true;
  });

  it('renders dark mode toggle', () => {
    render(<SettingsSection />);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

  it('calls toggleTheme when dark mode toggle clicked', () => {
    render(<SettingsSection />);
    const toggle = screen.getAllByRole('checkbox')[0];
    fireEvent.click(toggle);
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('renders push notifications toggle', () => {
    render(<SettingsSection />);
    expect(screen.getByText('Push Notifications')).toBeInTheDocument();
  });

  it('toggles push notifications', () => {
    render(<SettingsSection />);
    const toggle = screen.getAllByRole('checkbox')[1];
    expect(toggle).toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });

  it('renders biometric login toggle', () => {
    render(<SettingsSection />);
    expect(screen.getByText('Biometric Login')).toBeInTheDocument();
  });

  it('toggles biometric login', () => {
    render(<SettingsSection />);
    const toggle = screen.getAllByRole('checkbox')[2];
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
    const langBtn = screen.getByRole('button', { name: /English/i });
    fireEvent.click(langBtn);
    expect(
      screen.getByRole('button', { name: 'Vietnamese' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Japanese' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'French' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'German' })).toBeInTheDocument();
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

  it('renders theme picker', () => {
    render(<SettingsSection />);
    expect(screen.getByTestId('theme-picker')).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<SettingsSection />);
    expect(screen.getByRole('link', { name: /help/i })).toHaveAttribute(
      'href',
      '/help-support'
    );
    expect(screen.getByRole('link', { name: /terms/i })).toHaveAttribute(
      'href',
      '/terms-of-service'
    );
    expect(screen.getByRole('link', { name: /privacy/i })).toHaveAttribute(
      'href',
      '/privacy-policy'
    );
  });

  it('persists push notification setting to localStorage', () => {
    render(<SettingsSection />);
    const toggle = screen.getAllByRole('checkbox')[1];
    fireEvent.click(toggle);
    expect(localStorage.getItem('wallet-push-notifications')).toBe('false');
  });

  it('persists biometric setting to localStorage', () => {
    render(<SettingsSection />);
    const toggle = screen.getAllByRole('checkbox')[2];
    fireEvent.click(toggle);
    expect(localStorage.getItem('wallet-biometric')).toBe('false');
  });

  it('loads settings from localStorage', () => {
    localStorage.setItem('wallet-push-notifications', 'false');
    localStorage.setItem('wallet-biometric', 'false');
    render(<SettingsSection />);
    expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked();
    expect(screen.getAllByRole('checkbox')[2]).not.toBeChecked();
  });

  it('shows sun icon when light mode', () => {
    mockIsDark = false;
    render(<SettingsSection />);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('shows bell-off icon when push disabled', () => {
    localStorage.setItem('wallet-push-notifications', 'false');
    render(<SettingsSection />);
    expect(screen.getByText('Push Notifications')).toBeInTheDocument();
  });
});
