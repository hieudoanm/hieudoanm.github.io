import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const CssTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Color in CSS"
    subtitle="Gradients, palettes and theme roles for shipping color to the browser."
    sections={[
      {
        title: 'Gradients',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              CSS interpolates between color stops. A linear gradient blends
              along a line at a chosen angle; a radial gradient blends outward
              from a center. The midpoint of two colors is their RGB average,
              which can look muddy when the stops are complementary.
            </p>
            <p>
              Gradients are cheap to author, but using them where a flat scale
              would do adds needless variation — reserve them for moments.
            </p>
          </div>
        ),
      },
      {
        title: 'Palettes and tokens',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              A strong palette keeps colors balanced: a dominant hue for large
              areas, variations in lightness for hierarchy, and one or two
              accents from a harmonizing spot on the wheel. Random palettes
              should be checked for contrast and for how they feel together.
            </p>
            <p>
              Consistent scales become CSS custom properties named by step, so
              components reference a single palette instead of hard-coded hex
              values.
            </p>
          </div>
        ),
      },
      {
        title: 'Theme roles',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Design systems map a palette onto named roles. In DaisyUI each
              role such as primary, secondary or base-100 is a CSS variable, and
              the content roles hold the readable text color for their paired
              background.
            </p>
            <p>
              Theming tools read those computed variables at runtime, so the
              palette you browse is always the theme actually applied.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/colors/css/gradient',
        label: 'Gradient Builder',
        description:
          'Compose linear and radial CSS gradients from two or three stops.',
      },
      {
        href: '/colors/css/palette',
        label: 'Palette Generator',
        description: 'Roll a random harmonious five-color palette.',
      },
      {
        href: '/colors/css/theme',
        label: 'Theme Colors',
        description:
          'Browse the active theme palette roles as copyable CSS variables.',
      },
    ]}
  />
);

export default CssTheoryPage;
