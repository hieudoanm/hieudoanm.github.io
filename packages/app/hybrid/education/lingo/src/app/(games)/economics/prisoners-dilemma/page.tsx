'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';
import { PayoffMatrix } from '@/components/molecules/PayoffMatrix';

const PrisonerDilemmaPage: NextPage = () => (
  <TheoryTemplate
    title="Prisoner's Dilemma"
    subtitle="A classic game theory model of cooperation and conflict."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The <strong>Prisoner&rsquo;s Dilemma</strong> is a fundamental
            concept in game theory. Two players must each choose to{' '}
            <strong>cooperate</strong> or <strong>defect</strong> without
            knowing the other&rsquo;s decision. The twist: defecting always
            gives a higher individual payoff in a single round, yet mutual
            cooperation leads to a better collective outcome.
          </p>
        ),
      },
      {
        title: 'The payoff matrix',
        body: <PayoffMatrix />,
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Nash equilibrium:</strong> If both players are rational
              and self-interested, the Nash equilibrium is to defect &mdash;
              neither can improve their outcome by unilaterally changing
              strategy.
            </p>
            <p>
              <strong>The paradox:</strong> The Nash equilibrium (both defect)
              is suboptimal compared to mutual cooperation. Individual
              rationality leads to collective irrationality.
            </p>
            <p>
              <strong>Real-world applications:</strong> Arms races, climate
              change negotiations, price wars, tax compliance, and commons
              management all exhibit prisoner&rsquo;s dilemma dynamics.
              Understanding these dynamics helps design better institutions,
              contracts, and incentive structures.
            </p>
            <p>
              <strong>In iterated play:</strong> When the game is repeated,
              strategies like Tit-for-Tat can sustain cooperation through
              reciprocity. This app lets you explore all these dynamics with 32
              different AI strategies.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/prisoners-dilemma/versus',
        label: 'Versus',
        description: 'Play head-to-head against a random AI strategy.',
      },
      {
        href: '/economics/prisoners-dilemma/bots',
        label: 'Bots',
        description: 'Browse all 32 strategies and learn how each one plays.',
      },
      {
        href: '/economics/prisoners-dilemma/simulation',
        label: 'Simulation',
        description: 'Run a round-robin tournament between every pair of bots.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Prisoner%27s_dilemma',
        label: 'Wikipedia: Prisoner’s Dilemma',
        description: 'Overview of the classic game and its applications.',
      },
      {
        href: 'https://plato.stanford.edu/entries/prisoner-dilemma/',
        label: 'Stanford Encyclopedia of Philosophy: Prisoner’s Dilemma',
        description:
          'Authoritative survey of the dilemma and its formal treatment.',
      },
      {
        href: 'https://www.investopedia.com/terms/p/prisoners-dilemma.asp',
        label: 'Investopedia: Prisoner’s Dilemma',
        description:
          'Entry on how the dilemma works and its business applications.',
      },
    ]}
  />
);

export default PrisonerDilemmaPage;
