import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DEFAULT_CONFIG, buildThemeStyles, generateCSS } from '../editor';
import { ThemeEditor } from '../editor/ThemeEditor';
import { PreviewTabs } from '../demo/PreviewTabs';
import { ComponentsDemo } from '../demo/components/ComponentsDemo';

describe('css-utils', () => {
  it('generates CSS from config', () => {
    const css = generateCSS(DEFAULT_CONFIG);
    expect(css).toContain(`@plugin 'daisyui/theme' {`);
    expect(css).toContain(`  name: 'custom';`);
    expect(css).toContain(`  color-scheme: 'dark';`);
    expect(css).toContain('  --color-primary: #ff0030;');
    expect(css).toContain('  --radius-box: 2rem;');
    expect(css).toContain('  --size-field: 0.25rem;');
    expect(css).toContain('  --noise: 1;');
    expect(css).toContain('}');
  });

  it('generates light color-scheme and disabled noise', () => {
    const css = generateCSS({
      ...DEFAULT_CONFIG,
      name: 'Light',
      darkMode: false,
      noise: false,
    });
    expect(css).toContain(`color-scheme: 'light';`);
    expect(css).toContain('  --noise: 0;');
  });

  it('builds theme styles as a CSS variable map', () => {
    const styles = buildThemeStyles(DEFAULT_CONFIG);
    expect(styles['--color-primary']).toBe('#ff0030');
    expect(styles['--color-base-100']).toBe('#000000');
    expect(styles['--radius-box']).toBe('2rem');
    expect(styles['--size-field']).toBe('0.25rem');
    expect(styles['--noise']).toBe('1');
    expect(styles['--border']).toBe('1px');
  });

  it('handles unknown color keys with a fallback variable', () => {
    const styles = buildThemeStyles({
      ...DEFAULT_CONFIG,
      colors: { ...DEFAULT_CONFIG.colors, customColor: '#123456' },
    });
    expect(styles['--color-customColor']).toBe('#123456');
  });
});

describe('ThemeEditor', () => {
  const setup = (
    overrides: Partial<Parameters<typeof ThemeEditor>[0]> = {}
  ) => {
    const onChange = jest.fn();
    const onThemeSelect = jest.fn();
    render(
      <ThemeEditor
        config={DEFAULT_CONFIG}
        onChange={onChange}
        selectedTheme="nothing"
        onThemeSelect={onThemeSelect}
        {...overrides}
      />
    );
    return { onChange, onThemeSelect };
  };

  it('renders editor tabs and color pane by default', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Presets' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Colors' })).toHaveClass(
      'tab-active'
    );
    expect(
      screen.getByRole('button', { name: 'Settings' })
    ).toBeInTheDocument();
    expect(screen.getByText('Theme name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('custom')).toBeInTheDocument();
  });

  it('updates the theme name', () => {
    const { onChange } = setup();
    fireEvent.change(screen.getByDisplayValue('custom'), {
      target: { value: 'My Theme' },
    });
    expect(onChange).toHaveBeenCalledWith({
      ...DEFAULT_CONFIG,
      name: 'My Theme',
    });
  });

  it('updates a color', () => {
    const { onChange } = setup();
    const colorInputs = screen.getAllByRole('button', { hidden: true });
    void colorInputs;
    const [primary] = screen
      .getAllByDisplayValue('#ff0030')
      .filter((el) => el instanceof HTMLInputElement);
    fireEvent.change(primary as HTMLInputElement, {
      target: { value: '#112233' },
    });
    expect(onChange).toHaveBeenCalledWith({
      ...DEFAULT_CONFIG,
      colors: { ...DEFAULT_CONFIG.colors, primary: '#112233' },
    });
  });

  it('switches to presets tab and selects a preset', () => {
    const { onChange, onThemeSelect } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Presets' }));
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Synthwave')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Light'));
    expect(onThemeSelect).toHaveBeenCalledWith('light');
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Light' })
    );
  });

  it('switches to settings tab and renders shape controls', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    expect(screen.getByText('Shape')).toBeInTheDocument();
    expect(screen.getByText('Box border radius')).toBeInTheDocument();
    expect(screen.getByText('Size & Border')).toBeInTheDocument();
    expect(screen.getByText('Options')).toBeInTheDocument();
    expect(screen.getByText('CSS Output')).toBeInTheDocument();
  });

  it('updates shape radius from settings', () => {
    const { onChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    const radiusButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(radiusButtons[1]);
    expect(onChange).toHaveBeenCalledWith({
      ...DEFAULT_CONFIG,
      shape: { ...DEFAULT_CONFIG.shape, radiusBox: '0.25rem' },
    });
  });

  it('toggles dark mode and noise', () => {
    const { onChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(onChange).toHaveBeenCalledWith({
      ...DEFAULT_CONFIG,
      darkMode: false,
    });
    fireEvent.click(checkboxes[1]);
    expect(onChange).toHaveBeenCalledWith({ ...DEFAULT_CONFIG, noise: false });
  });

  it('updates size via slider', () => {
    const { onChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '2' } });
    expect(onChange).toHaveBeenCalledWith({
      ...DEFAULT_CONFIG,
      size: { ...DEFAULT_CONFIG.size, field: '0.5rem' },
    });
  });

  it('copies CSS to clipboard and shows confirmation', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    const copyButton = screen.getByRole('button', { name: 'Copy CSS' });
    fireEvent.click(copyButton);
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: '✓ Copied!' })
      ).toBeInTheDocument()
    );
    expect(writeText).toHaveBeenCalledWith(generateCSS(DEFAULT_CONFIG));
  });
});

describe('PreviewTabs', () => {
  it('shows color palette tab', () => {
    render(
      <PreviewTabs colors={DEFAULT_CONFIG.colors}>
        <span>demo content</span>
      </PreviewTabs>
    );
    expect(screen.getByText('demo content')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Color Palette' }));
    expect(screen.getByText('Primary Content')).toBeInTheDocument();
    expect(screen.getAllByText('#ff0030').length).toBeGreaterThan(0);
  });

  it('shows pages directory tab', () => {
    render(
      <PreviewTabs colors={DEFAULT_CONFIG.colors}>
        <span>demo content</span>
      </PreviewTabs>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Pages' }));
    expect(screen.getByText(/Pages Directory/)).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /Dashboard/ }).length
    ).toBeGreaterThan(0);
  });

  it('switches back to components tab', () => {
    render(
      <PreviewTabs colors={DEFAULT_CONFIG.colors}>
        <span>demo content</span>
      </PreviewTabs>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Pages' }));
    fireEvent.click(screen.getByRole('button', { name: 'Components' }));
    expect(screen.getByText('demo content')).toBeInTheDocument();
  });
});

describe('ComponentsDemo', () => {
  it('renders all demo columns', () => {
    render(<ComponentsDemo />);
    expect(screen.getByText('July Revenue')).toBeInTheDocument();
    expect(screen.getByText('Create new account')).toBeInTheDocument();
    expect(screen.getByText('Recent orders')).toBeInTheDocument();
    expect(screen.getByText('Starter Plan')).toBeInTheDocument();
  });
});
