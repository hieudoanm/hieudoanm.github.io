'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const OverconfidencePage: NextPage = () => (
  <TheoryTemplate
    title="Overconfidence Bias"
    subtitle="People systematically overestimate their abilities, forecasts, and control over outcomes."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Overconfidence</strong> is the tendency to be more certain
            of one&rsquo;s knowledge, judgments, and abilities than the evidence
            warrants. It takes several forms—overestimating skill,
            over-precision in beliefs, and excessive optimism about the future.
            It is one of the most robust and consequential biases in behavioral
            economics.
          </p>
        ),
      },
      {
        title: 'The three forms',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Overestimation:</strong> Believing you are better, faster,
              or smarter than you actually are—nearly everyone ranks themselves
              above average at driving, leadership, and competence.
            </p>
            <p>
              <strong>Over-precision:</strong> Being too sure your estimates are
              correct; people assign far narrower confidence ranges than the
              true uncertainty warrants.
            </p>
            <p>
              <strong>Over-optimism:</strong> Underestimating the likelihood of
              bad outcomes and overestimating good ones—starting ventures,
              planning projects, expecting success.
            </p>
          </div>
        ),
      },
      {
        title: 'Where it bites',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Trading:</strong> Overconfident investors trade too
              frequently, and higher trading is associated with lower returns
              (see Behavioral Finance).
            </p>
            <p>
              <strong>Business:</strong> Managerial overconfidence drives
              overambitious projects and deal-making—firms with overconfident
              CEOs invest more and overpay for acquisitions.
            </p>
            <p>
              <strong>Forecasting:</strong> Underestimating uncertainty produces
              overconfident predictions of growth, earnings, and timelines, with
              systematically missed targets.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it persists',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Self-serving bias:</strong> People credit success to skill
              but blame failure on bad luck, shielding confidence from evidence.
            </p>
            <p>
              <strong>Confirmation bias:</strong> Seeking information that
              confirms existing beliefs while ignoring contradictions reinforces
              overconfidence.
            </p>
            <p>
              <strong>Occasional benefits:</strong> Some optimism motivates
              risk-taking and persistence that can pay off (entrepreneurship);
              the cost is often borne when it distorts judgment. Mitigating it
              requires explicit consideration of opposing evidence and honest
              calibration of uncertainty.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Overconfidence_effect',
        label: 'Wikipedia: Overconfidence Effect',
        description: 'Overview of the bias and the evidence behind it.',
      },
      {
        href: 'https://www.investopedia.com/overconfidence-bias-7485796',
        label: 'Investopedia: Overconfidence Bias',
        description:
          'How overconfidence distorts investing decisions and performance.',
      },
      {
        href: 'https://www.britannica.com/science/Dunning-Kruger-effect',
        label: 'Britannica: Dunning-Kruger Effect',
        description:
          'Related phenomenon in which the least competent overestimate their ability.',
      },
    ]}
  />
);

export default OverconfidencePage;
