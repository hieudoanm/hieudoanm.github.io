import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { DEFAULT_CONFIG, buildThemeStyles, generateCSS } from '@/layout/editor';
import { ThemeEditor } from '@/layout/editor/ThemeEditor';
import { Atomic as ComponentsDemo } from '../components/Atomic';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

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
    overrides: Partial<Parameters<typeof ThemeEditor>[0]> = {},
    options: { open?: boolean } = {}
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
    if (options.open !== false) {
      fireEvent.click(screen.getByRole('button', { name: 'Show sidebar' }));
    }
    return { onChange, onThemeSelect };
  };

  it('hides the editor pane by default', () => {
    setup({}, { open: false });
    expect(
      screen.getByRole('button', { name: 'Show sidebar' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Presets' })
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Theme name')).not.toBeInTheDocument();
  });

  it('renders editor tabs and theme pane when opened', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Presets' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Theme' })).toHaveClass(
      'text-primary'
    );
    expect(screen.getByText('Theme name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('custom')).toBeInTheDocument();
  });

  it('toggles the sidebar off and on', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Hide sidebar' }));
    expect(
      screen.queryByRole('button', { name: 'Presets' })
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Theme name')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show sidebar' }));
    expect(screen.getByRole('button', { name: 'Presets' })).toBeInTheDocument();
    expect(screen.getByText('Theme name')).toBeInTheDocument();
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
    const daisyuiSection = within(screen.getByTestId('daisyui-themes-section'));
    const customSection = within(screen.getByTestId('custom-themes-section'));
    expect(daisyuiSection.getByText('Light')).toBeInTheDocument();
    expect(daisyuiSection.getByText('Synthwave')).toBeInTheDocument();
    expect(customSection.getByText('Nothing')).toBeInTheDocument();
    fireEvent.click(daisyuiSection.getByText('Light'));
    expect(onThemeSelect).toHaveBeenCalledWith('light');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders shape controls in the theme pane', () => {
    setup();
    expect(screen.getByText('Shape')).toBeInTheDocument();
    expect(screen.getByText('Box border radius')).toBeInTheDocument();
    expect(screen.getByText('Size & Border')).toBeInTheDocument();
    expect(screen.getByText('Options')).toBeInTheDocument();
    expect(screen.getByText('CSS Output')).toBeInTheDocument();
  });

  it('updates shape radius from settings', () => {
    const { onChange } = setup();
    const radiusButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(radiusButtons[1]);
    expect(onChange).toHaveBeenCalledWith({
      ...DEFAULT_CONFIG,
      shape: { ...DEFAULT_CONFIG.shape, radiusBox: '0.25rem' },
    });
  });

  it('toggles dark mode and noise', () => {
    const { onChange } = setup();
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

describe('ComponentsDemo', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders the four component level tabs', () => {
    render(<ComponentsDemo />);
    expect(screen.getByRole('tab', { name: 'Atoms' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Molecules' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Organisms' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Templates' })).toBeInTheDocument();
  });

  it('shows atoms level by default', () => {
    render(<ComponentsDemo />);
    expect(screen.getByRole('tab', { name: 'Atoms' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('heading', { name: 'Button' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Badge' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Card' })
    ).not.toBeInTheDocument();
  });

  it('switches to molecules level', () => {
    render(<ComponentsDemo />);
    fireEvent.click(screen.getByRole('tab', { name: 'Molecules' }));
    expect(screen.getByRole('tab', { name: 'Molecules' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('heading', { name: 'Card' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Alert' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Button' })
    ).not.toBeInTheDocument();
  });

  it('switches to organisms level', () => {
    render(<ComponentsDemo />);
    fireEvent.click(screen.getByRole('tab', { name: 'Organisms' }));
    expect(
      screen.getByRole('heading', { name: 'Dashboard' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Workspace' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Starter' })
    ).toBeInTheDocument();
  });

  it('switches to templates level showing the pages directory', () => {
    render(<ComponentsDemo />);
    fireEvent.click(screen.getByRole('tab', { name: 'Templates' }));
    expect(
      screen.getByRole('heading', { name: /Templates Directory/ })
    ).toBeInTheDocument();
    const dashboardLinks = screen.getAllByRole('link', { name: /Dashboard/ });
    expect(
      dashboardLinks.some(
        (link) => link.getAttribute('href') === '/app/dashboard'
      )
    ).toBe(true);
    const inboxLinks = screen.getAllByRole('link', { name: /Inbox/ });
    expect(
      inboxLinks.some((link) => link.getAttribute('href') === '/mail/inbox')
    ).toBe(true);
    const pricingLinks = screen.getAllByRole('link', { name: /Pricing/ });
    expect(
      pricingLinks.some(
        (link) => link.getAttribute('href') === '/landing/pricing'
      )
    ).toBe(true);
  });

  it('switches back to atoms level', () => {
    render(<ComponentsDemo />);
    fireEvent.click(screen.getByRole('tab', { name: 'Templates' }));
    fireEvent.click(screen.getByRole('tab', { name: 'Atoms' }));
    expect(screen.getByRole('tab', { name: 'Atoms' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('heading', { name: 'Button' })).toBeInTheDocument();
  });
});

describe('Component gallery search and accordions', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders all atom category accordions open by default', () => {
    const { container } = render(<ComponentsDemo />);
    expect(container.querySelectorAll('details[open]')).toHaveLength(16);
  });

  it('filters atoms by search query', () => {
    render(<ComponentsDemo />);
    fireEvent.change(screen.getByTestId('atoms-search'), {
      target: { value: 'badge' },
    });
    expect(screen.getByRole('heading', { name: 'Badge' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Button' })
    ).not.toBeInTheDocument();
  });

  it('filters molecules by search query', () => {
    render(<ComponentsDemo />);
    fireEvent.click(screen.getByRole('tab', { name: 'Molecules' }));
    fireEvent.change(screen.getByTestId('molecules-search'), {
      target: { value: 'accordion' },
    });
    expect(
      screen.getByRole('heading', { name: 'Accordion' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Card' })
    ).not.toBeInTheDocument();
  });

  it('filters templates by search query', () => {
    render(<ComponentsDemo />);
    fireEvent.click(screen.getByRole('tab', { name: 'Templates' }));
    fireEvent.change(screen.getByTestId('templates-search'), {
      target: { value: 'pricing' },
    });
    const pricingLinks = screen.getAllByRole('link', { name: /Pricing/ });
    expect(
      pricingLinks.some(
        (link) => link.getAttribute('href') === '/landing/pricing'
      )
    ).toBe(true);
    expect(screen.queryAllByRole('link', { name: /Inbox/ }).length).toBe(0);
  });
});
