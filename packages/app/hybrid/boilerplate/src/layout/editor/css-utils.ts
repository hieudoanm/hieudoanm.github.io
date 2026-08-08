import { ThemeConfig } from './ThemeConfig';

const CSS_VAR_MAP: Record<string, string> = {
  primary: '--color-primary',
  primaryContent: '--color-primary-content',
  secondary: '--color-secondary',
  secondaryContent: '--color-secondary-content',
  accent: '--color-accent',
  accentContent: '--color-accent-content',
  neutral: '--color-neutral',
  neutralContent: '--color-neutral-content',
  base100: '--color-base-100',
  base200: '--color-base-200',
  base300: '--color-base-300',
  baseContent: '--color-base-content',
  info: '--color-info',
  infoContent: '--color-info-content',
  success: '--color-success',
  successContent: '--color-success-content',
  warning: '--color-warning',
  warningContent: '--color-warning-content',
  error: '--color-error',
  errorContent: '--color-error-content',
};

export const generateCSS = (config: ThemeConfig): string => {
  const lines = [`@plugin 'daisyui/theme' {`, `  name: '${config.name}';`];
  lines.push(`  color-scheme: '${config.darkMode ? 'dark' : 'light'}';`);
  for (const [key, value] of Object.entries(config.colors)) {
    lines.push(`  ${CSS_VAR_MAP[key] || `--color-${key}`}: ${value};`);
  }
  lines.push(`  --radius-box: ${config.shape.radiusBox};`);
  lines.push(`  --radius-field: ${config.shape.radiusField};`);
  lines.push(`  --radius-selector: ${config.shape.radiusSelector};`);
  lines.push(`  --size-field: ${config.size.field};`);
  lines.push(`  --size-selector: ${config.size.selector};`);
  lines.push(`  --border: ${config.border};`);
  lines.push(`  --noise: ${config.noise ? '1' : '0'};`);
  lines.push('}');
  return lines.join('\n');
};

export const buildThemeStyles = (
  config: ThemeConfig
): Record<string, string> => {
  const styles: Record<string, string> = {};
  for (const [key, value] of Object.entries(config.colors)) {
    styles[CSS_VAR_MAP[key] || `--color-${key}`] = value;
  }
  styles['--radius-box'] = config.shape.radiusBox;
  styles['--radius-field'] = config.shape.radiusField;
  styles['--radius-selector'] = config.shape.radiusSelector;
  styles['--size-field'] = config.size.field;
  styles['--size-selector'] = config.size.selector;
  styles['--border'] = config.border;
  styles['--noise'] = config.noise ? '1' : '0';
  return styles;
};
