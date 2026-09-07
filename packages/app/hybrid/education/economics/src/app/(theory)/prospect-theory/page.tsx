'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const ProspectTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Prospect Theory"
    subtitle="Why we feel losses more than gains—and how that bends every decision we make."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Prospect Theory</strong>, developed by Daniel Kahneman and
            Amos Tversky (1979, Nobel Prize 2002), explains how people actually
            make decisions under risk—contrary to the rational{' '}
            <strong>Expected Utility Theory</strong> that assumes perfect
            consistency. The core insight: people evaluate outcomes as gains and
            losses relative to a <strong>reference point</strong>, not as final
            wealth states. And losses hurt roughly twice as much as equivalent
            gains feel good.
          </p>
        ),
      },
      {
        title: 'Key principles',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Reference dependence:</strong> Outcomes are judged as
              gains or losses relative to a neutral reference point (usually the
              status quo), not as absolute wealth. The same objective outcome
              can be framed as a gain or loss depending on context.
            </p>
            <p>
              <strong>Loss aversion:</strong> Losses loom larger than gains.
              Losing $100 feels roughly twice as painful as gaining $100 feels
              good. This asymmetry explains why people reject fair bets that a
              rational expected-value maximizer would accept.
            </p>
            <p>
              <strong>Diminishing sensitivity:</strong> The difference between
              $100 and $200 feels larger than between $1,100 and $1,200. The
              value function is concave for gains and convex for losses, which
              explains risk aversion in gains and risk-seeking in losses.
            </p>
            <p>
              <strong>Probability weighting:</strong> People overweight small
              probabilities (buying lottery tickets) and underweight large ones
              (ignoring likely risks). The decision weight is not the same as
              the stated probability.
            </p>
          </div>
        ),
      },
      {
        title: 'The value function',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Asymmetric S-curve:</strong> Steep for losses, flatter for
              gains. At the reference point the curve is steepest—small changes
              near the status quo matter most.
            </p>
            <p>
              <strong>Risk aversion in gains:</strong> People prefer a sure $500
              over a 50% chance of $1,100—even though the gamble has a higher
              expected value ($550). The certainty of the sure gain outweighs
              the extra $50 in expectation.
            </p>
            <p>
              <strong>Risk-seeking in losses:</strong> People prefer a 50%
              chance of losing $1,100 over a sure loss of $550—even though the
              expected loss is worse. The small hope of avoiding the loss
              entirely drives risky choices.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world applications',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Insurance:</strong> People overpay for insurance against
              small-probability losses and simultaneously take risks they should
              insure against—a direct contradiction of expected utility theory.
            </p>
            <p>
              <strong>Investment:</strong> Investors hold losing stocks too long
              (hoping to break even) and sell winners too early (locking in the
              gain)—the disposition effect.
            </p>
            <p>
              <strong>Marketing:</strong> Framing a price as a discount from a
              higher reference price makes the gain feel larger than stating the
              same final price outright.
            </p>
            <p>
              <strong>Public policy:</strong> Loss-framed messages (you will
              lose X if you don&rsquo;t act) are more persuasive than
              gain-framed ones for prevention behaviors.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/prospect-theory/framing',
        label: 'Framing Game',
        description:
          'Answer Kahneman and Tversky questions and discover your own reflection effect.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Prospect_theory',
        label: 'Wikipedia: Prospect Theory',
        description:
          'Overview of the value function, loss aversion, and probability weighting.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman/facts/',
        label: 'Nobel Prize: Daniel Kahneman (2002)',
        description:
          'Nobel biography of Kahneman, awarded for work on prospect theory.',
      },
      {
        href: 'https://www.investopedia.com/terms/p/prospecttheory.asp',
        label: 'Investopedia: Prospect Theory',
        description:
          'Entry on how people underweight probabilities and fear losses more than gains.',
      },
    ]}
  />
);

export default ProspectTheoryPage;
