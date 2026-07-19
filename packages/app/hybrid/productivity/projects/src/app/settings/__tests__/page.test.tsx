import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsPage from '@/app/settings/page';

const push = jest.fn();
const updateSettings = jest.fn().mockResolvedValue(undefined);
const addToast = jest.fn();

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
  useData: () => ({
    settings: { theme: 'nothing', defaultView: 'kanban', notifications: true },
    updateSettings,
  }),
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

  it('renders appearance and defaults sections', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Appearance')).toBeInTheDocument();
    expect(screen.getByText('Defaults')).toBeInTheDocument();
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
      theme: 'dark',
      defaultView: 'kanban',
    });
    expect(addToast).toHaveBeenCalledWith('Settings saved', 'success');
  });

  it('saves a different default view', async () => {
    render(<SettingsPage />);
    fireEvent.change(screen.getAllByRole('combobox')[1], {
      target: { value: 'list' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save Settings' }));
    await waitFor(() =>
      expect(updateSettings).toHaveBeenCalledWith({
        theme: 'nothing',
        defaultView: 'list',
      })
    );
  });

  it('navigates back', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByTestId('arrow-left').closest('button')!);
    expect(push).toHaveBeenCalledWith('/');
  });
});
