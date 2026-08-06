import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsPage from '@/app/settings/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span data-testid="ico-back" />,
  FiSave: () => <span data-testid="ico-save" />,
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

const { useRouter } = jest.requireMock('next/navigation');
const { useData } = jest.requireMock('@/providers/DataProvider');

const mockPush = jest.fn();
const mockUpdateSettings = jest.fn().mockResolvedValue(undefined);

const baseSettings = {
  theme: 'nothing',
  defaultPort: 5432,
  editorFontSize: 14,
  queryTimeout: 30,
};

describe('SettingsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    useData.mockReturnValue({
      settings: baseSettings,
      updateSettings: mockUpdateSettings,
    });
  });

  it('renders settings with current values', () => {
    render(<SettingsPage />);
    expect(screen.getByRole('combobox')).toHaveValue('nothing');
    expect(screen.getByText('Font Size: 14px')).toBeInTheDocument();
    expect(screen.getByText('Query Timeout: 30s')).toBeInTheDocument();
  });

  it('saves updated settings and applies the theme', async () => {
    render(<SettingsPage />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'dracula' },
    });
    fireEvent.click(screen.getByText('Save Settings'));
    await waitFor(() =>
      expect(mockUpdateSettings).toHaveBeenCalledWith({
        theme: 'dracula',
        editorFontSize: 14,
        queryTimeout: 30,
      })
    );
    await waitFor(() =>
      expect(document.documentElement.getAttribute('data-theme')).toBe(
        'dracula'
      )
    );
  });

  it('updates the font size range', () => {
    render(<SettingsPage />);
    const range = screen.getAllByRole('slider')[0];
    fireEvent.change(range, { target: { value: '18' } });
    expect(screen.getByText('Font Size: 18px')).toBeInTheDocument();
  });

  it('updates the query timeout range', () => {
    render(<SettingsPage />);
    const range = screen.getAllByRole('slider')[1];
    fireEvent.change(range, { target: { value: '60' } });
    expect(screen.getByText('Query Timeout: 60s')).toBeInTheDocument();
  });

  it('navigates back on back button click', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
