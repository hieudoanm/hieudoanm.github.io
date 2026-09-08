'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const ConsumerTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Consumer Theory & Indifference Curves"
    subtitle="How rational consumers choose between goods to get the most satisfaction from a limited budget."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Consumer theory</strong> models how a rational buyer chooses
            a combination of goods to maximize utility, or satisfaction, subject
            to a budget constraint. Its visual tool is the{' '}
            <strong>indifference curve</strong>: a set of bundles giving the
            same utility. The consumer&rsquo;s optimum occurs where an
            indifference curve just touches the budget line—balancing
            preferences against affordability.
          </p>
        ),
      },
      {
        title: 'Preferences',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Completeness:</strong> A consumer can compare any two
              bundles and state which they prefer or whether they are
              indifferent.
            </p>
            <p>
              <strong>Transitivity:</strong> If A is preferred to B and B to C,
              then A is preferred to C—consistency in ranking.
            </p>
            <p>
              <strong>More is better:</strong> With scarce goods, consumers
              prefer more of a good to less, giving indifference curves their
              downward slope.
            </p>
            <p>
              <strong>Diminishing marginal rate of substitution:</strong> As a
              consumer has more of one good, they give up less of another to
              gain a bit more, making indifference curves convex.
            </p>
          </div>
        ),
      },
      {
        title: 'Budget and optimum',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The budget constraint:</strong> Income limits what the
              consumer can afford. The budget line shows all affordable bundles;
              its slope is the ratio of the two prices.
            </p>
            <p>
              <strong>The optimum:</strong> The consumer reaches the highest
              indifference curve that still touches the budget line. At the
              optimum, the marginal rate of substitution equals the price ratio.
            </p>
            <p>
              <strong>Responding to prices:</strong> When a price changes, the
              budget line rotates, and the consumer moves to a new optimum. This
              change splits into a <strong>substitution effect</strong>{' '}
              (choosing relatively cheaper goods) and an{' '}
              <strong>income effect</strong> (feeling richer or poorer).
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Deriving demand:</strong> Consumer theory explains why
              demand curves slope downward and how demand responds to price and
              income changes—the foundation of market analysis.
            </p>
            <p>
              <strong>Separating goods into types:</strong> Normal goods,
              inferior goods, and substitutes versus complements are classified
              by how demand reacts to income and the prices of related goods.
            </p>
            <p>
              <strong>Policy design:</strong> Understanding consumer choice
              helps design taxes, subsidies, and welfare programs that
              anticipate how people will reshuffle their spending.
            </p>
            <p>
              <strong>A baseline:</strong> Indifference-curve analysis gives an
              ideal-rational benchmark against which behavioral deviations (see
              Prospect Theory) are measured.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/consumer-theory/utility',
        label: 'Budget Line Lab',
        description:
          'Move a point along the budget line to maximize utility for Cobb-Douglas, perfect substitutes, and perfect complements.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Consumer_choice',
        label: 'Wikipedia: Consumer Choice',
        description:
          'Overview of consumer theory, utility maximization, and indifference curve analysis.',
      },
      {
        href: 'https://www.investopedia.com/terms/i/indifferencecurve.asp',
        label: 'Investopedia: Indifference Curve',
        description:
          'Entry explaining the indifference curve, its properties, and the consumer optimum.',
      },
      {
        href: 'https://www.khanacademy.org/economics-finance-domain/microeconomics/consumer-consumer-theory/indifference-curves-tutorial/v/indifference-curves-and-marginal-rate-of-substitution',
        label: 'Khan Academy: Indifference Curves & MRS',
        description:
          'Video explaining indifference curves and the marginal rate of substitution.',
      },
    ]}
  />
);

export default ConsumerTheoryPage;
