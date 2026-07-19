import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const PerceptionTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Color & Perception"
    subtitle="How the eye measures contrast, fails to see some colors, and reads warmth."
    sections={[
      {
        title: 'Relative luminance',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Contrast ratio compares how bright two colors appear to the eye.
              The eye does not weight red, green and blue equally — green
              contributes most, blue least — so{' '}
              <strong>relative luminance</strong> applies those weights before
              comparing.
            </p>
            <p>
              WCAG sets pass thresholds: 4.5:1 for normal text (AA), 3:1 for
              large text, and 7:1 (AAA) on normal text. The same checks apply to
              icons and graphical elements, not only text.
            </p>
          </div>
        ),
      },
      {
        title: 'Color vision deficiency',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Common deficiencies come from missing cones in the retina.
              Protanopia lacks red cones, deuteranopia lacks green cones, and
              tritanopia lacks blue cones. Pairs that look different to a
              typical viewer can collapse for someone affected.
            </p>
            <p>
              The practical rule: never rely on hue alone to convey meaning —
              pair it with position, shape or text.
            </p>
          </div>
        ),
      },
      {
        title: 'Warm and cool',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Physical light temperature is measured in Kelvin: candlelight
              (~2000K) is warm and orange, daylight (~6500K) is white, shade and
              sky (~10000K) are cool and blue.
            </p>
            <p>
              In color theory the same words describe hue position: reds,
              oranges and yellows feel warm; greens, blues and violets feel
              cool. Low-saturation colors read as neutral.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/colors/perception/contrast',
        label: 'Contrast Checker',
        description: 'Verify contrast ratios against all four WCAG thresholds.',
      },
      {
        href: '/colors/perception/color-blindness',
        label: 'Color Blindness',
        description:
          'Simulate protanopia, deuteranopia and tritanopia on any color.',
      },
      {
        href: '/colors/perception/temperature',
        label: 'Color Temperature',
        description:
          'Classify a color as warm or cool and map color temperature in Kelvin.',
      },
    ]}
  />
);

export default PerceptionTheoryPage;
