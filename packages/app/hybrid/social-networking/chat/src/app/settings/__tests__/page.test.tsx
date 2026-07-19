import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('@/components/templates/PageTransition', () => ({
  PageTransition: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const { useRouter } = jest.requireMock('next/navigation');
const { useData } = jest.requireMock('@/providers/DataProvider');

const settings = {
  theme: 'chat-light',
  defaultModel: 'gpt-4o',
  systemPrompt: 'You are helpful',
};

describe('SettingsPage', () => {
  const push = jest.fn();
  const updateSettings = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push });
    useData.mockReturnValue({ settings, updateSettings });
  });

  it('renders the settings sections', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Appearance')).toBeInTheDocument();
    expect(screen.getByText('AI Model')).toBeInTheDocument();
    expect(screen.getByText('Custom Instructions')).toBeInTheDocument();
  });

  it('navigates back on back button click', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(push).toHaveBeenCalledWith('/');
  });

  it('changes the theme select', () => {
    render(<SettingsPage />);
    const themeSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(themeSelect, { target: { value: 'chat-dark' } });
    expect(themeSelect).toHaveValue('chat-dark');
  });

  it('changes the default model select', () => {
    render(<SettingsPage />);
    const modelSelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(modelSelect, { target: { value: 'claude-3.5' } });
    expect(modelSelect).toHaveValue('claude-3.5');
  });

  it('applies a system prompt template', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByText('Translate'));
    const textarea = screen.getByPlaceholderText(
      'Enter custom instructions...'
    );
    expect(textarea).not.toHaveValue('You are helpful');
  });

  it('saves settings and sets the data-theme attribute', async () => {
    updateSettings.mockResolvedValue(undefined);
    render(<SettingsPage />);
    fireEvent.change(screen.getAllByRole('combobox')[0], {
      target: { value: 'chat-dark' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('Enter custom instructions...'),
      {
        target: { value: 'New prompt' },
      }
    );
    fireEvent.click(screen.getByText('Save Settings'));
    await waitFor(() =>
      expect(updateSettings).toHaveBeenCalledWith({
        theme: 'chat-dark',
        defaultModel: 'gpt-4o',
        systemPrompt: 'New prompt',
      })
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'chat-dark'
    );
  });
});
