import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AppLoadingTemplate } from '../AppLoadingTemplate';
import { DashboardTemplate } from '../DashboardTemplate';
import { ProfileTemplate } from '../ProfileTemplate';
import { SettingsTemplate } from '../SettingsTemplate';
import { VersionTemplate } from '../VersionTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('AppLoadingTemplate', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<AppLoadingTemplate />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    );
  });
});

describe('DashboardTemplate', () => {
  it('renders header, stats, and user info', () => {
    render(<DashboardTemplate userName="Jane Doe" userEmail="jane@test.com" />);
    expect(
      screen.getAllByRole('heading', { name: 'Dashboard' }).length
    ).toBeGreaterThan(0);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$48,250')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@test.com')).toBeInTheDocument();
  });

  it('renders activity rows', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('created')).toBeInTheDocument();
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
  });

  it('shows negative trend with error color', () => {
    render(<DashboardTemplate />);
    const trend = screen.getByText('-3.1%');
    expect(trend).toHaveClass('text-error');
  });

  it('shows positive trend with success color', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('+12.5%')).toHaveClass('text-success');
  });

  it('opens and closes the mobile sidebar', () => {
    render(<DashboardTemplate />);
    const menuButton = screen.getByRole('button', { name: '' });
    fireEvent.click(menuButton);
    expect(screen.getAllByText('Analytics').length).toBeGreaterThan(0);
    const overlay = document.querySelector('.fixed.inset-0');
    fireEvent.click(overlay!);
    expect(document.querySelector('.fixed.inset-0')).not.toBeInTheDocument();
  });

  it('switches active nav item', () => {
    render(<DashboardTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Analytics' }));
    expect(screen.getByRole('button', { name: 'Analytics' })).toHaveClass(
      'bg-primary/10'
    );
  });

  it('renders notification count badge', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});

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

describe('SettingsTemplate', () => {
  const props = {
    language: 'en',
    theme: 'dark',
    dateTimeFormat: '24h',
    timezone: 'UTC',
    onLanguageChange: jest.fn(),
    onThemeChange: jest.fn(),
    onDateTimeFormatChange: jest.fn(),
    onTimezoneChange: jest.fn(),
  };

  it('renders sections with current values', () => {
    render(<SettingsTemplate {...props} />);
    expect(screen.getAllByText('Language').length).toBeGreaterThan(0);
    expect(screen.getByText('Appearance')).toBeInTheDocument();
    expect(screen.getByText('Date & Time')).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')[0]).toHaveValue('en');
  });

  it('applies theme to document dataset', () => {
    render(<SettingsTemplate {...props} />);
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('calls change handlers', () => {
    render(<SettingsTemplate {...props} />);
    const [languageSelect, themeSelect, formatSelect, timezoneSelect] =
      screen.getAllByRole('combobox');
    fireEvent.change(languageSelect, { target: { value: 'vi' } });
    fireEvent.change(themeSelect, { target: { value: 'light' } });
    fireEvent.change(formatSelect, { target: { value: '12h' } });
    fireEvent.change(timezoneSelect, { target: { value: 'Asia/Tokyo' } });
    expect(props.onLanguageChange).toHaveBeenCalledWith('vi');
    expect(props.onThemeChange).toHaveBeenCalledWith('light');
    expect(props.onDateTimeFormatChange).toHaveBeenCalledWith('12h');
    expect(props.onTimezoneChange).toHaveBeenCalledWith('Asia/Tokyo');
  });
});

describe('VersionTemplate', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  it('renders segmented version', () => {
    render(<VersionTemplate version="2024.06.15.12.30.45" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders partial version without seconds', () => {
    render(<VersionTemplate version="2024.06.15" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders invalid version in error style', () => {
    render(<VersionTemplate version="dev" />);
    expect(screen.getAllByText('dev')[0]).toHaveClass('text-error');
  });

  it('copies version to clipboard', async () => {
    render(<VersionTemplate version="2024.06.15" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('2024.06.15');
    });
    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument();
    });
  });
});
