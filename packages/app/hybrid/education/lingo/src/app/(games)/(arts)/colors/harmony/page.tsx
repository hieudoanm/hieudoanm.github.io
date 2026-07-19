import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const HarmonyTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Color Harmony"
    subtitle="How colors relate on the wheel and mix with each other."
    sections={[
      {
        title: 'The color wheel',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              The wheel arranges hues by angle: 0° red, 120° green, 240° blue.
              Complementary colors sit 180° apart and create maximum contrast.
              Analogous colors are neighbors within about 30° and feel calm.
              Triadic colors are spaced 120° apart, staying balanced yet
              vibrant.
            </p>
            <p>
              These relationships come from the visible spectrum wrapped into a
              circle — hue is periodic, so 360° equals 0°.
            </p>
          </div>
        ),
      },
      {
        title: 'Harmonic sets',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              A <strong>scheme</strong> is a fixed set of angle relationships
              applied to a base hue. Complementary, analogous and triadic sets
              reuse the same positions on the wheel; a monochromatic scheme
              keeps one hue and varies lightness for a cohesive look.
            </p>
            <p>
              Harmonies are starting points, not guarantees. Contrast and
              lightness also decide whether a combination reads well.
            </p>
          </div>
        ),
      },
      {
        title: 'Mixing color',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Mixing on screen is a weighted average of the two colors&apos; RGB
              channels, so at 50% the result sits exactly halfway between them.
              Paint behaves differently: pigments absorb light, so mixing two
              paints tends toward darkness rather than a bright average.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/colors/harmony/wheel',
        label: 'Color Wheel',
        description:
          'Explore hues and see complementary, analogous and triadic markers.',
      },
      {
        href: '/colors/harmony/schemes',
        label: 'Color Schemes',
        description:
          'Generate complementary, analogous, triadic and monochromatic sets.',
      },
      {
        href: '/colors/harmony/mixer',
        label: 'Color Mixer',
        description:
          'Blend two colors by weight and read the result in every notation.',
      },
    ]}
  />
);

export default HarmonyTheoryPage;
