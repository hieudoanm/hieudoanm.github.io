'use client';

import { FC, ReactNode, useState } from 'react';
import { PageTabs } from '@/components/organisms/PageTabs';
import { useTheme } from '@/layout';
import { ColorBlindnessSimulator } from './tools/ColorBlindnessSimulator';
import { ColorAdjuster } from './tools/ColorAdjuster';
import { ColorConverter } from './tools/ColorConverter';
import { ColorMixer } from './tools/ColorMixer';
import { ColorSchemes } from './tools/ColorSchemes';
import { ColorTemperature } from './tools/ColorTemperature';
import { ColorWheel } from './tools/ColorWheel';
import { ColorsTool } from './tools/ColorsTool';
import { ContrastChecker } from './tools/ContrastChecker';
import { CssScaleExporter } from './tools/CssScaleExporter';
import { GradientBuilder } from './tools/GradientBuilder';
import { OpacityOverlay } from './tools/OpacityOverlay';
import { PaletteGenerator } from './tools/PaletteGenerator';
import { RandomColor } from './tools/RandomColor';
import { ShadesTints } from './tools/ShadesTints';
import { TintShadeTone } from './tools/TintShadeTone';

const ToolSection: FC<{
  description: string;
  children: ReactNode;
}> = ({ description, children }) => (
  <section className="border-base-300 bg-base-200 rounded-2xl border">
    <header className="border-base-300 border-b px-5 py-4">
      <p className="text-base-content/50 text-sm">{description}</p>
    </header>
    <div className="p-5">{children}</div>
  </section>
);

export const ColorsPage: FC = () => {
  const { config } = useTheme();
  const [baseColor, setBaseColor] = useState(config.colors.primary);

  return (
    <div
      data-testid="colors-page"
      className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
      <header>
        <h1 className="text-base-content">Colors</h1>
        <p className="text-base-content/50 mt-1">
          Theme swatches, conversions, schemes, contrast and palettes.
        </p>
      </header>
      <PageTabs
        defaultValue="theme"
        tabs={[
          {
            id: 'theme',
            label: 'Theme Colors',
            content: (
              <ToolSection description="Click a swatch to make it the active color and copy it as a CSS variable.">
                <ColorsTool onPick={setBaseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'converter',
            label: 'Converter',
            content: (
              <ToolSection description="Convert between HEX, RGB, HSL, HSV and CMYK, or paste any format.">
                <ColorConverter
                  baseColor={baseColor}
                  onColorChange={setBaseColor}
                />
              </ToolSection>
            ),
          },
          {
            id: 'hsl-adjuster',
            label: 'HSL Adjuster',
            content: (
              <ToolSection description="Fine-tune the active color with hue, saturation and lightness sliders.">
                <ColorAdjuster baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'color-wheel',
            label: 'Color Wheel',
            content: (
              <ToolSection description="Pick a hue on the wheel and explore its complementary, analogous and triadic harmonies.">
                <ColorWheel baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'schemes',
            label: 'Color Schemes',
            content: (
              <ToolSection description="Complementary, analogous, triadic and monochromatic harmonies.">
                <ColorSchemes baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'contrast',
            label: 'Contrast Checker',
            content: (
              <ToolSection description="Verify WCAG AA and AAA contrast for text on any background.">
                <ContrastChecker baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'shades-tints',
            label: 'Shades & Tints',
            content: (
              <ToolSection description="Generate a lighten and darken scale from the active color.">
                <ShadesTints baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'tint-shade-tone',
            label: 'Tint Shade Tone',
            content: (
              <ToolSection description="Compare tints, shades and tones side by side from the active color.">
                <TintShadeTone baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'color-mixer',
            label: 'Color Mixer',
            content: (
              <ToolSection description="Blend two colors with a mix weight and copy the result.">
                <ColorMixer baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'color-temperature',
            label: 'Color Temperature',
            content: (
              <ToolSection description="Classify the active color as warm or cool and preview Kelvin light temperatures.">
                <ColorTemperature baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'gradient',
            label: 'Gradient Builder',
            content: (
              <ToolSection description="Compose a linear or radial CSS gradient and copy it.">
                <GradientBuilder baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'opacity',
            label: 'Opacity',
            content: (
              <ToolSection description="See how the active color composites over white and black at different opacities.">
                <OpacityOverlay baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'color-blindness',
            label: 'Color Blindness',
            content: (
              <ToolSection description="Preview the active color under common color vision deficiencies.">
                <ColorBlindnessSimulator baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'css-scale',
            label: 'CSS Scale',
            content: (
              <ToolSection description="Export the active color as a Tailwind-style 50-900 CSS variable scale.">
                <CssScaleExporter baseColor={baseColor} />
              </ToolSection>
            ),
          },
          {
            id: 'palette',
            label: 'Palette Generator',
            content: (
              <ToolSection description="Generate random harmonious palettes you can copy.">
                <PaletteGenerator />
              </ToolSection>
            ),
          },
          {
            id: 'random',
            label: 'Random Color',
            content: (
              <ToolSection description="Generate a random color with copyable HEX, RGB and HSL values.">
                <RandomColor />
              </ToolSection>
            ),
          },
        ]}
      />
    </div>
  );
};
ColorsPage.displayName = 'ColorsPage';
