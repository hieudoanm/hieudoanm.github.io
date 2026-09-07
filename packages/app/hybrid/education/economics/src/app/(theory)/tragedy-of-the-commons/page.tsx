'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const TragedyOfTheCommonsPage: NextPage = () => (
  <TheoryTemplate
    title="Tragedy of the Commons"
    subtitle="Why shared resources get overused—and how communities protect them."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The <strong>Tragedy of the Commons</strong> describes a situation
            where individuals, acting independently and rationally according to
            their own self-interest, behave contrary to the best interests of
            the whole group by depleting a <strong>shared resource</strong>. The
            classic example is herdsmen sharing a common pasture: each adds more
            cattle because it benefits them personally, but the overgrazing
            destroys the pasture for everyone.
          </p>
        ),
      },
      {
        title: 'The core dilemma',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Individual incentive:</strong> The benefit of consuming
              more of the resource goes entirely to the individual, while the
              cost (depletion) is spread across everyone. So each person has a
              rational incentive to take more, even though the collective
              outcome is ruinous.
            </p>
            <p>
              <strong>Rivalrous and non-excludable:</strong> Common resources
              are rivalrous (one person&rsquo;s use reduces what&rsquo;s left
              for others) but non-excludable (hard to stop anyone from using
              them). This combination is what creates the trap.
            </p>
            <p>
              <strong>The paradox:</strong> What is rational for each individual
              is irrational for the group. The resource collapses even though
              nobody wanted that outcome.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world examples',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Overfishing:</strong> Each fishing boat catches more than
              the sustainable yield because the fish it doesn&rsquo;t take will
              be caught by someone else—collapsing entire fish stocks.
            </p>
            <p>
              <strong>Groundwater depletion:</strong> Farmers pump as much water
              as available, drawing down aquifers faster than they can recharge.
            </p>
            <p>
              <strong>Climate change:</strong> Each nation benefits from burning
              fossil fuels while the cost of global warming is borne by the
              entire planet.
            </p>
            <p>
              <strong>Public land and traffic:</strong> Overgrazing commons,
              congested roads during rush hour, and crowded natural parks all
              follow the same logic.
            </p>
          </div>
        ),
      },
      {
        title: 'The solutions',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Property rights:</strong> Turning the commons into
              privately owned resources gives owners an incentive to manage them
              sustainably—you don&rsquo;t deplete what you own.
            </p>
            <p>
              <strong>Government regulation:</strong> Rules, quotas, and taxes
              (like fishing limits or carbon pricing) constrain individual take.
            </p>
            <p>
              <strong>Community governance:</strong> Elinor Ostrom won a Nobel
              Prize in 2009 for showing that communities can sustainably
              self-manage commons through shared rules, monitoring, and gradual
              sanctions.
            </p>
            <p>
              <strong>Why it matters:</strong> The tragedy is not inevitable.
              With the right institutions, shared resources can be preserved
              indefinitely.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/tragedy-of-the-commons/harvest',
        label: 'Commons Harvest',
        description:
          'Graze one shared resource against four villagers and try to avoid collapse.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Tragedy_of_the_commons',
        label: 'Wikipedia: Tragedy of the commons',
        description:
          "Hardin's parable of the overexploitation of shared resources.",
      },
      {
        href: 'https://www.investopedia.com/terms/t/tragedy-of-the-commons.asp',
        label: 'Investopedia: Tragedy of the Commons',
        description:
          'The tragedy of the commons and policy responses to resource overuse.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/facts/',
        label: 'Nobel Prize: Elinor Ostrom',
        description:
          'The 2009 Nobel Prize recognized the governance of common-pool resources.',
      },
    ]}
  />
);

export default TragedyOfTheCommonsPage;
