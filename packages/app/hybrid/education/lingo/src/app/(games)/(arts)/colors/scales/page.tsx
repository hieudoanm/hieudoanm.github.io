import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const ScalesTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Color Scales"
    subtitle="Building even, reusable steps from a single color."
    sections={[
      {
        title: 'Shades, tints and tones',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              A <strong>tint</strong> mixes a color with white to make it
              lighter and pastel. A <strong>shade</strong> mixes it with black
              to make it darker. A <strong>tone</strong> mixes it with gray to
              mute it. All three keep the same hue, changing only how much light
              or gray the color carries.
            </p>
            <p>
              A balanced scale keeps a base color in the middle, then steps
              evenly toward black on one side and white on the other.
            </p>
          </div>
        ),
      },
      {
        title: 'Even steps',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Blending in equal increments between the color and black or white
              keeps steps visually even because each one averages the previous
              endpoint. Hue is preserved throughout — only lightness changes.
            </p>
            <p>
              Scales are the backbone of design systems: a 50 step, 100 step,
              200 step gradient from one hue gives a palette room for accents,
              surfaces and text.
            </p>
          </div>
        ),
      },
      {
        title: 'Opacity is blending',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              On screen every rendered color is opaque: a 50% translucent red
              over white actually shows the weighted average of the two,
              computed per channel. Lowering opacity never reveals a background
              — it blends the color with whatever sits underneath.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/colors/scales/shades-tints',
        label: 'Shades & Tints',
        description:
          'Build a balanced 5–13 step scale from one color with one slider.',
      },
      {
        href: '/colors/scales/tint-shade-tone',
        label: 'Tint, Shade & Tone',
        description: 'Lighten, darken or mute a color in even steps.',
      },
      {
        href: '/colors/scales/opacity',
        label: 'Opacity Overlay',
        description: 'Preview a color over white and black at any alpha.',
      },
      {
        href: '/colors/scales/css-scale',
        label: 'CSS Scale Exporter',
        description: 'Export a color scale as CSS custom properties.',
      },
    ]}
  />
);

export default ScalesTheoryPage;
