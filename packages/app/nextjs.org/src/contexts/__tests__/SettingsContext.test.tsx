import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsProvider, useSettings } from '../SettingsContext';

describe('SettingsContext', () => {
  it('renders children', () => {
    render(
      <SettingsProvider>
        <div data-testid="child">Hello</div>
      </SettingsProvider>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('throws when useSettings is used outside provider', () => {
    expect(() => render(<ThrowsOnMount />)).toThrow(
      'useSettings must be used within a SettingsProvider'
    );
  });

  it('has default settings', () => {
    render(
      <SettingsProvider>
        <Consumer />
      </SettingsProvider>
    );
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('false');
    expect(screen.getByTestId('compact-mode')).toHaveTextContent('false');
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('updates a setting value', () => {
    render(
      <SettingsProvider>
        <Consumer />
      </SettingsProvider>
    );
    fireEvent.click(screen.getByTestId('toggle-dark-btn'));
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('true');
    expect(screen.getByTestId('compact-mode')).toHaveTextContent('false');
  });

  it('resets settings to defaults', () => {
    render(
      <SettingsProvider>
        <Consumer />
      </SettingsProvider>
    );
    fireEvent.click(screen.getByTestId('toggle-dark-btn'));
    fireEvent.click(screen.getByTestId('toggle-compact-btn'));
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('true');
    expect(screen.getByTestId('compact-mode')).toHaveTextContent('true');
    fireEvent.click(screen.getByTestId('reset-btn'));
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('false');
    expect(screen.getByTestId('compact-mode')).toHaveTextContent('false');
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('updates language setting', () => {
    render(
      <SettingsProvider>
        <Consumer />
      </SettingsProvider>
    );
    fireEvent.click(screen.getByTestId('set-lang-es-btn'));
    expect(screen.getByTestId('lang')).toHaveTextContent('es');
  });
});

function ThrowsOnMount() {
  useSettings();
  return null;
}

function Consumer() {
  const { settings, updateSetting, resetSettings } = useSettings();
  return (
    <div>
      <span data-testid="dark-mode">{String(settings.darkMode)}</span>
      <span data-testid="compact-mode">{String(settings.compactMode)}</span>
      <span data-testid="lang">{settings.language}</span>
      <button
        data-testid="toggle-dark-btn"
        onClick={() => updateSetting('darkMode', !settings.darkMode)}>
        Toggle Dark
      </button>
      <button
        data-testid="toggle-compact-btn"
        onClick={() => updateSetting('compactMode', !settings.compactMode)}>
        Toggle Compact
      </button>
      <button
        data-testid="set-lang-es-btn"
        onClick={() => updateSetting('language', 'es')}>
        ES
      </button>
      <button data-testid="reset-btn" onClick={resetSettings}>
        Reset
      </button>
    </div>
  );
}
