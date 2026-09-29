'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const HeuristicsPage: NextPage = () => (
  <TheoryTemplate
    title="Behavioral Heuristics & Biases"
    subtitle="The mental shortcuts that usually work—but sometimes lead us badly astray."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Heuristics</strong> are the fast, automatic mental shortcuts
            people use to make decisions under uncertainty. They evolved because
            they usually work quickly and well—but they also produce systematic{' '}
            <strong>cognitive biases</strong>: predictable errors. Resources
            developed by Kahneman and Tversky distinguish the fast{' '}
            <strong>System 1</strong> thinking (intuitive, effortless) from the
            slow <strong>System 2</strong> (deliberate, effortful).
          </p>
        ),
      },
      {
        title: 'Common heuristics',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Availability:</strong> People judge how likely something
              is by how easily examples come to mind. Dramatic news makes rare
              risks (plane crashes) seem common, while common risks (car
              crashes) are underestimated.
            </p>
            <p>
              <strong>Representativeness:</strong> People judge probability by
              how similar something is to a stereotype, ignoring base rates.
              This fuels the gambler&rsquo;s fallacy and stereotype-based
              errors.
            </p>
            <p>
              <strong>Anchoring:</strong> Initial numbers pull judgments toward
              them—the first price seen anchors what seems reasonable, even when
              it is arbitrary.
            </p>
            <p>
              <strong>Confirmation bias:</strong> People seek and remember
              evidence that supports what they already believe while ignoring
              the rest.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Systematic, not random:</strong> Biases are patterned
              rather than chaos, so economists and psychologists can study and
              predict them—and design interventions to counteract them.
            </p>
            <p>
              <strong>Against perfect rationality:</strong> These findings
              challenge the classical economic assumption that people are fully
              rational, leading to behavioral economics (see also Prospect
              Theory and Nudge).
            </p>
            <p>
              <strong>Real stakes:</strong> Biases distort saving, investing,
              medical decisions, and jury verdicts. Awareness alone
              doesn&rsquo;t eliminate them, but design and structure can.
            </p>
          </div>
        ),
      },
      {
        title: 'Countering biases',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Slow down:</strong> Engaging System 2—pausing, checking
              assumptions, and seeking disconfirming evidence—reduces many
              impulsive errors.
            </p>
            <p>
              <strong>Use decision aids:</strong> Checklists, algorithms, and
              statistical reasoning tools override unreliable intuitions in
              medicine, finance, and hiring.
            </p>
            <p>
              <strong>Debias the environment:</strong> Governments and firms can
              adjust defaults, reframe information, and present statistical
              context to help people choose better (nudges).
            </p>
            <p>
              <strong>Aggregate diverse views:</strong> Decision teams with
              diverse perspectives and structured dissent expose individual
              blind spots.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/behavioral-heuristics/lab',
        label: 'Heuristics Lab',
        description:
          'Answer estimation puzzles with and without an anchor and watch anchoring, availability and representativeness bend your guesses.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Heuristics_in_judgment_and_decision-making',
        label: 'Wikipedia: Heuristics in Judgment and Decision-Making',
        description:
          'Survey of Kahneman and Tverskys research on mental shortcuts and cognitive biases.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman/summary/',
        label: 'Nobel Prize: Daniel Kahneman (2002)',
        description:
          'Nobel Prize page for Kahneman, recognizing his work on judgment under uncertainty and prospect theory.',
      },
      {
        href: 'https://www.investopedia.com/terms/c/cognitive-bias.asp',
        label: 'Investopedia: Cognitive Bias',
        description:
          'Entry listing common cognitive biases that affect financial and everyday decision-making.',
      },
    ]}
  />
);

export default HeuristicsPage;
