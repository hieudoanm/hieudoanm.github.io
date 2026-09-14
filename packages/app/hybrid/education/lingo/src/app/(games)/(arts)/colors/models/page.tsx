import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const ModelsTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Color Models"
    subtitle="The coordinate systems used to describe a color numerically."
    sections={[
      {
        title: 'Additive and subtractive',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Screens are <strong>additive</strong>: they start black and mix
              red, green and blue light. Printers are{' '}
              <strong>subtractive</strong>: they start white and overlay cyan,
              magenta, yellow and key (black) ink that absorbs light. The RGB
              and CMYK models exist for these two ends of the pipeline.
            </p>
            <p>
              Converting between the two is approximate — print smear and ink
              gamut change the result — but for design work the math is close
              enough to preview.
            </p>
          </div>
        ),
      },
      {
        title: 'Perceptual models',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>HSL</strong> and <strong>HSV</strong> describe color the
              way people think about it: a <em>hue</em> angle (0° red, 120°
              green, 240° blue), a <em>saturation</em> from neutral gray to
              vivid, and a lightness or value. These models make it easy to tune
              a color without guessing which RGB numbers to change.
            </p>
            <p>
              Both wrap the same underlying RGB space, so converting between
              them changes coordinates, never the color itself.
            </p>
          </div>
        ),
      },
      {
        title: 'HEX as compact RGB',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              A six-digit <strong>HEX</strong> code is just RGB written in base
              16: the first pair is red, the second green, the third blue. A
              three-digit code doubles each digit, so <code>#07c</code> means
              the same as <code>#0077cc</code>.
            </p>
            <p>
              Being a fixed-width text format, HEX is what most design tools and
              style sheets use, even though it is the least readable way to see
              how a color will behave.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/colors/models/converter',
        label: 'Color Converter',
        description:
          'Convert the active color between HEX, RGB, HSL, HSV and CMYK.',
      },
      {
        href: '/colors/models/adjuster',
        label: 'Color Adjuster',
        description:
          'Tune hue, saturation and lightness of any color with sliders.',
      },
      {
        href: '/colors/models/random',
        label: 'Random Color',
        description:
          'Generate and lock a random color to inspect in every notation.',
      },
    ]}
  />
);

export default ModelsTheoryPage;
