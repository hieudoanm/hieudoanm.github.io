import { ThemeEditorLayout } from '@/layout';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { ColorsPage } from '../ColorsPage';

const renderPage = () =>
  render(
    <ThemeEditorLayout>
      <ColorsPage />
    </ThemeEditorLayout>
  );

describe('ColorsPage', () => {
  it('renders a tab for every tool', () => {
    renderPage();
    expect(screen.getByTestId('colors-page')).toBeInTheDocument();
    for (const label of [
      'Theme Colors',
      'Converter',
      'HSL Adjuster',
      'Color Wheel',
      'Color Schemes',
      'Contrast Checker',
      'Shades & Tints',
      'Tint Shade Tone',
      'Color Mixer',
      'Color Temperature',
      'Gradient Builder',
      'Opacity',
      'Color Blindness',
      'CSS Scale',
      'Palette Generator',
      'Random Color',
    ]) {
      expect(screen.getByRole('tab', { name: label })).toBeInTheDocument();
    }
  });

  it('shows the theme colors tool by default', () => {
    renderPage();
    expect(screen.getByTestId('colors-tool')).toBeInTheDocument();
    expect(screen.queryByTestId('color-converter')).not.toBeInTheDocument();
  });

  it.each([
    ['Converter', 'color-converter'],
    ['HSL Adjuster', 'color-adjuster'],
    ['Color Wheel', 'color-wheel'],
    ['Color Schemes', 'color-schemes'],
    ['Contrast Checker', 'contrast-checker'],
    ['Shades & Tints', 'shades-tints'],
    ['Tint Shade Tone', 'tint-shade-tone'],
    ['Color Mixer', 'color-mixer'],
    ['Color Temperature', 'color-temperature'],
    ['Gradient Builder', 'gradient-builder'],
    ['Opacity', 'opacity-overlay'],
    ['Color Blindness', 'color-blindness'],
    ['CSS Scale', 'css-scale-exporter'],
    ['Palette Generator', 'palette-generator'],
    ['Random Color', 'random-color'],
  ])('switches to the %s tool', (label, testid) => {
    renderPage();
    fireEvent.click(screen.getByRole('tab', { name: label }));
    expect(screen.getByTestId(testid)).toBeInTheDocument();
    expect(screen.queryByTestId('colors-tool')).not.toBeInTheDocument();
  });

  it('seeds the active color from the theme primary', () => {
    renderPage();
    fireEvent.click(screen.getByRole('tab', { name: 'Converter' }));
    expect(
      within(screen.getByTestId('color-converter')).getByText('#ff0030')
    ).toBeInTheDocument();
  });

  it('keeps the picked color when switching tools', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Copy Success' }));
    fireEvent.click(screen.getByRole('tab', { name: 'Converter' }));
    expect(
      within(screen.getByTestId('color-converter')).getByText('#00c853')
    ).toBeInTheDocument();
  });
});
