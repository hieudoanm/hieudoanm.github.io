'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const MarginalUtilityPage: NextPage = () => (
  <TheoryTemplate
    title="Marginal Utility"
    subtitle="Why the first slice of pizza is better than the fifth—and what that means for value."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Marginal utility</strong> is the additional satisfaction
            gained from consuming one more unit of a good. The central idea, the{' '}
            <strong>law of diminishing marginal utility</strong>, is that each
            additional unit provides less satisfaction than the one before it.
            That is why the first slice of pizza is delicious and the fifth is a
            struggle. It underlies the shape of demand curves and how people
            allocate their budgets.
          </p>
        ),
      },
      {
        title: 'The core concept',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Total vs marginal:</strong> Total utility is the overall
              satisfaction from all units consumed. Marginal utility is the
              change from the next one—it is the &ldquo;marginal&rdquo; in
              &ldquo;one more.&rdquo;
            </p>
            <p>
              <strong>Diminishing returns:</strong> Early units deliver the most
              gain; later units less. This does not mean later units are
              bad—just that each adds less than the last.
            </p>
            <p>
              <strong>Rational stopping point:</strong> A person keeps consuming
              as long as the next unit&rsquo;s marginal utility exceeds its
              cost, stopping where marginal benefit equals marginal cost.
            </p>
          </div>
        ),
      },
      {
        title: 'Budget allocation',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Equalizing margins:</strong> To get the most satisfaction
              from a fixed budget, spend each dollar where its marginal utility
              per dollar is highest—until the last dollar spent on each good
              yields equal marginal utility per dollar.
            </p>
            <p>
              <strong>Why it links to demand:</strong> Because marginal utility
              falls as consumption rises, buyers are only willing to pay less
              for additional units—directly producing the downward-sloping
              demand curve.
            </p>
            <p>
              <strong>The paradox of value:</strong> Water is vital yet cheap,
              while diamonds are frivolous yet expensive. Water has high total
              utility but low marginal utility (it is abundant); diamonds the
              reverse. Price tracks marginal, not total, value.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world applications',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Pricing and bundles:</strong> Businesses set the price of
              the next unit by what it is worth to a marginal customer—and
              package deals capture surplus by charging more for early units and
              less for later ones.
            </p>
            <p>
              <strong>Public policy:</strong> Progressive taxation is justified
              by diminishing marginal utility of income—the 100th dollar of
              income buys less satisfaction than the 10th, so taking more from
              the rich costs them less wellbeing per dollar.
            </p>
            <p>
              <strong>Everyday decisions:</strong> Choosing between &ldquo;one
              more hour of work&rdquo; (marginal wage) and &ldquo;one more hour
              of leisure&rdquo; (marginal utility of rest) is a marginal-utility
              tradeoff we all make.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/marginal-utility/lab',
        label: 'Marginal Utility Lab',
        description:
          'Allocate a budget between apples and cookies and find the utility-maximizing bundle.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Marginal_utility',
        label: 'Wikipedia: Marginal Utility',
        description:
          'Overview of the concept, its history, and the law of diminishing marginal utility.',
      },
      {
        href: 'https://www.investopedia.com/terms/m/marginalutility.asp',
        label: 'Investopedia: Marginal Utility',
        description:
          'Entry defining marginal utility and its role in consumer choice theory.',
      },
      {
        href: 'https://www.britannica.com/science/marginal-utility',
        label: 'Encyclopedia Britannica: Marginal Utility',
        description:
          'Encyclopedia entry on the concept and its economic applications.',
      },
    ]}
  />
);

export default MarginalUtilityPage;
