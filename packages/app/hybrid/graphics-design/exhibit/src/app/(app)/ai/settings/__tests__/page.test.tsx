import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/providers/ai/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/ai/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('@/components/ai/templates/PageTransition', () => ({
  PageTransition: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const { useRouter } = jest.requireMock('next/navigation');
const { useData } = jest.requireMock('@/providers/ai/DataProvider');

const settings = {
  theme: 'exibit-light',
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
    expect(screen.getByText('AI Model')).toBeInTheDocument();
    expect(screen.getByText('Custom Instructions')).toBeInTheDocument();
  });

  it('navigates back on back button click', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(push).toHaveBeenCalledWith('/ai');
  });

  it('changes the default model select', () => {
    render(<SettingsPage />);
    const modelSelect = screen.getByRole('combobox');
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

  it('saves settings', async () => {
    updateSettings.mockResolvedValue(undefined);
    render(<SettingsPage />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'claude-3.5' },
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
        defaultModel: 'claude-3.5',
        systemPrompt: 'New prompt',
      })
    );
  });
});
