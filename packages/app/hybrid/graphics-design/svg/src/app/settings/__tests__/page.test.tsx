import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsPage from '@/app/settings/page';

const push = jest.fn();
const updateSettings = jest.fn().mockResolvedValue(undefined);
const addToast = jest.fn();

const defaultSettings = {
  theme: 'nothing',
  gridSize: 20,
  snapToGrid: true,
  showGrid: true,
  showRulers: true,
  exportFormat: 'svg',
  exportScale: 2,
};

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

jest.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span data-testid="arrow-left" />,
  FiSave: () => <span data-testid="save" />,
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: () => ({ settings: defaultSettings, updateSettings }),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ addToast }),
}));

describe('SettingsPage', () => {
  beforeEach(() => {
    push.mockReset();
    updateSettings.mockReset();
    addToast.mockReset();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the appearance, canvas, and export sections', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Appearance')).toBeInTheDocument();
    expect(screen.getByText('Canvas')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save Settings' })
    ).toBeInTheDocument();
  });

  it('saves settings and applies the theme', async () => {
    render(<SettingsPage />);
    fireEvent.change(screen.getAllByRole('combobox')[0], {
      target: { value: 'dark' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save Settings' }));
    await waitFor(() =>
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    );
    expect(updateSettings).toHaveBeenCalledWith({
      ...defaultSettings,
      theme: 'dark',
    });
    expect(addToast).toHaveBeenCalledWith('Settings saved', 'success');
  });

  it('saves canvas and export preferences', async () => {
    render(<SettingsPage />);
    fireEvent.change(screen.getByDisplayValue('20'), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getAllByRole('combobox')[1], {
      target: { value: 'png' },
    });
    fireEvent.change(screen.getAllByRole('combobox')[2], {
      target: { value: '4' },
    });
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    fireEvent.click(screen.getAllByRole('checkbox')[1]);
    fireEvent.click(screen.getAllByRole('checkbox')[2]);
    fireEvent.click(screen.getByRole('button', { name: 'Save Settings' }));
    await waitFor(() =>
      expect(updateSettings).toHaveBeenCalledWith({
        theme: 'nothing',
        gridSize: 30,
        snapToGrid: false,
        showGrid: false,
        showRulers: false,
        exportFormat: 'png',
        exportScale: 4,
      })
    );
  });

  it('navigates back', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByTestId('arrow-left').closest('button')!);
    expect(push).toHaveBeenCalledWith('/');
  });
});
