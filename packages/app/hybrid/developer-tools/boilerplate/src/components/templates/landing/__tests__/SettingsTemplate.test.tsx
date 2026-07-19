import { fireEvent, render, screen } from '@testing-library/react';
import { SettingsTemplate } from '../SettingsTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

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
