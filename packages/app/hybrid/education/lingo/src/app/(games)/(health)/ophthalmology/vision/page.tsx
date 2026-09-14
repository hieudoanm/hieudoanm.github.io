import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const VisionTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Vision Theory"
    subtitle="How the eye resolves detail, what visual acuity means, and how the three charts measure it."
    sections={[
      {
        title: 'How the eye focuses',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Light enters the eye</strong> through the cornea, which
              does most of the focusing, and is fine-tuned by the lens behind
              the iris. The lens changes shape to focus near and far objects—a
              process called <em>accommodation</em>.
            </p>
            <p>
              <strong>The retina</strong> lines the back of the eye and is
              covered in photoreceptors. The <em>fovea</em>, a tiny pit at the
              centre of the retina, is packed with cone cells and gives us our
              sharpest colour vision; the surrounding <em>rods</em> handle
              dim-light, monochrome vision.
            </p>
            <p>
              <strong>Refractive errors</strong> happen when the eye bends light
              incorrectly: myopia (short-sighted) focuses in front of the
              retina, hyperopia (long-sighted) behind it, and astigmatism blurs
              focus along one axis.
            </p>
          </div>
        ),
      },
      {
        title: 'What is visual acuity?',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Visual acuity</strong> is the sharpness of vision—the
              ability to resolve fine detail at a given distance. It is tested
              by presenting letter-shaped targets that shrink until they fall
              below the resolving power of the eye.
            </p>
            <p>
              <strong>Standard measurement:</strong> acuity is usually tested at
              a fixed distance (20&nbsp;feet or 6&nbsp;metres). The result is
              recorded as a fraction: the test distance over the distance at
              which a normal eye could read the same line.
            </p>
            <p>
              <strong>Normal and better:</strong> 20/20 (6/6) vision is the
              standard reference—the line a typical eye can read at 20 feet.
              Values such as 20/15 or 20/10 mean the eye resolves detail beyond
              the norm; 20/40 or worse means below it.
            </p>
          </div>
        ),
      },
      {
        title: 'The three charts',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Snellen</strong> is the classic letter chart. Each line
              has a fraction (20/200 down to 20/10), and letter sizes step in
              irregular jumps, so it is quick for screening but not ideal for
              precise tracking.
            </p>
            <p>
              <strong>LogMAR</strong> charts use five letters per line with
              equal, logarithmic spacing between lines and equal difficulty
              letters. This makes scores interval-like, so each chart assignment
              scores the line&rsquo;s LogMAR value minus a credit for whichever
              of the five letters were read correctly.
            </p>
            <p>
              <strong>Tumbling E</strong> shows the letter E rotated in one of
              four directions. The patient states which way the arms point, so
              no literacy is required—ideal for children, non-readers, and
              testing through an interpreter.
            </p>
          </div>
        ),
      },
      {
        title: 'How the tests are used',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Screening:</strong> charts are quick, repeatable, and
              objective, so they are used in school vision programmes, driver
              licensing, and routine eye exams to flag reduced acuity.
            </p>
            <p>
              <strong>Tracking disease:</strong> LogMAR in particular is used in
              clinical trials and clinics to detect small changes in acuity over
              time, such as in age-related macular degeneration or
              post-operative recovery.
            </p>
            <p>
              <strong>Limits:</strong> acuity only measures a narrow part of
              visual function. Contrast sensitivity, visual fields, colour
              vision, and binocularity are separate dimensions tested
              independently.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/ophthalmology/vision/snellen',
        label: 'Snellen Chart',
        description:
          'Classic letter chart from 20/200 to 20/10 — quick screening with irregular size steps.',
      },
      {
        href: '/ophthalmology/vision/logmar',
        label: 'LogMAR Chart',
        description:
          'Five letters per line with logarithmic spacing and per-letter scoring for precise tracking.',
      },
      {
        href: '/ophthalmology/vision/tumbling-e',
        label: 'Tumbling E Chart',
        description:
          'Direction-based E optotypes for non-readers — no letter recognition required.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Visual_acuity',
        label: 'Wikipedia: Visual Acuity',
        description:
          'Overview of acuity measurement, the Snellen fraction, and LogMAR scoring.',
      },
      {
        href: 'https://www.nhs.uk/conditions/eye-tests/',
        label: 'NHS: Eye Tests',
        description: 'How routine sight tests work and what the results mean.',
      },
      {
        href: 'https://en.wikipedia.org/wiki/LogMAR_chart',
        label: 'Wikipedia: LogMAR Chart',
        description: 'The logarithmic chart design and its scoring system.',
      },
    ]}
  />
);

export default VisionTheoryPage;
