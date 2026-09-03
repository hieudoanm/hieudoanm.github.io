import { render, screen, fireEvent, act } from '@testing-library/react';
import Settings from '@/app/settings/page';

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: jest.fn(),
}));

const { useData } = jest.requireMock('@/providers/DataProvider');
const { useToast } = jest.requireMock('@/providers/ToastProvider');

const settings = {
  id: 'default',
  theme: 'pdf-light',
  defaultZoom: 100,
  pageLayout: 'continuous',
  annotationDefaults: { color: '#facc15', strokeWidth: 2 },
};

const updateSettings = jest.fn().mockResolvedValue(undefined);
const addToast = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  useData.mockReturnValue({ settings, updateSettings });
  useToast.mockReturnValue({ addToast });
});

describe('Settings page', () => {
  it('renders the current settings and saves changes', async () => {
    render(<Settings />);
    expect(
      screen.getByRole('heading', { name: 'Settings' })
    ).toBeInTheDocument();
    expect(screen.getByText('Default Zoom: 100%')).toBeInTheDocument();
    expect(screen.getByText('Stroke Width: 2px')).toBeInTheDocument();

    fireEvent.click(screen.getByText('pdf-dark'));
    const ranges = document.querySelectorAll('input[type="range"]');
    fireEvent.change(ranges[0], { target: { value: '150' } });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'single' },
    });
    fireEvent.change(document.querySelector('input[type="color"]')!, {
      target: { value: '#123456' },
    });
    fireEvent.change(ranges[1], { target: { value: '7' } });
    expect(screen.getByText('Default Zoom: 150%')).toBeInTheDocument();
    expect(screen.getByText('Stroke Width: 7px')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save Settings' }));
    });
    expect(updateSettings).toHaveBeenCalledWith({
      theme: 'pdf-dark',
      defaultZoom: 150,
      pageLayout: 'single',
      annotationDefaults: { color: '#123456', strokeWidth: 7 },
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('pdf-dark');
    expect(addToast).toHaveBeenCalledWith('Settings saved', 'success');
  });

  it('re-syncs local state when settings change', async () => {
    const { rerender } = render(<Settings />);
    const newSettings = {
      ...settings,
      theme: 'pdf-dark',
      defaultZoom: 200,
      pageLayout: 'single' as const,
      annotationDefaults: { color: '#000000', strokeWidth: 5 },
    };
    useData.mockReturnValue({ settings: newSettings, updateSettings });
    rerender(<Settings />);
    expect(screen.getByText('Default Zoom: 200%')).toBeInTheDocument();
    expect(screen.getByText('Stroke Width: 5px')).toBeInTheDocument();
  });
});
