import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';

describe('ThemeContext', () => {
  const store: Record<string, string> = {};
  const localStorageMock = {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach((k) => delete store[k]);
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  beforeEach(() => {
    Object.keys(store).forEach((k) => delete store[k]);
    localStorageMock.getItem.mockReset();
    localStorageMock.getItem.mockImplementation(
      (key: string) => store[key] ?? null
    );
    localStorageMock.setItem.mockReset();
    localStorageMock.setItem.mockImplementation(
      (key: string, value: string) => {
        store[key] = value;
      }
    );
    localStorageMock.clear.mockReset();
    localStorageMock.clear.mockImplementation(() => {
      Object.keys(store).forEach((k) => delete store[k]);
    });
    localStorageMock.removeItem.mockReset();
    localStorageMock.removeItem.mockImplementation((key: string) => {
      delete store[key];
    });
    document.documentElement.classList.remove('dark');
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  afterAll(() => {
    Object.defineProperty(window, 'localStorage', { value: undefined });
  });

  it('renders children', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Hello</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('throws when useTheme is used outside provider', () => {
    expect(() => render(<ThrowsOnMount />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
  });

  it('defaults to light theme', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('toggles theme between light and dark', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('sets theme directly via setTheme', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByTestId('set-dark-btn'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('loads saved theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('persists theme to localStorage on toggle', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('uses prefers-color-scheme when no saved theme', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('toggles dark class on document.documentElement', async () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});

function ThrowsOnMount() {
  useTheme();
  return null;
}

function Consumer() {
  const { theme, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button data-testid="toggle-btn" onClick={toggleTheme}>
        Toggle
      </button>
      <button data-testid="set-dark-btn" onClick={() => setTheme('dark')}>
        Set Dark
      </button>
    </div>
  );
}
