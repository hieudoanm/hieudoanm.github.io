'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const NashEquilibriumPage: NextPage = () => (
  <TheoryTemplate
    title="Nash Equilibrium"
    subtitle="The state where no one regrets their choice—given what everyone else did."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            A <strong>Nash equilibrium</strong> is a set of strategies—one for
            each player—where no player can improve their outcome by
            unilaterally changing their own strategy. Named after mathematician
            John Nash, it is the central solution concept in non-cooperative
            game theory: if every player has chosen and no one wants to deviate
            alone, the game is in equilibrium.
          </p>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>It predicts stable outcomes:</strong> If a game has a Nash
              equilibrium, play is likely to settle there—because no individual
              has an incentive to move.
            </p>
            <p>
              <strong>It may not be optimal:</strong> The Prisoner&rsquo;s
              Dilemma&rsquo;s Nash equilibrium (both defect) is worse for both
              players than mutual cooperation. Equilibrium does not mean
              fairness or efficiency.
            </p>
            <p>
              <strong>Multiple equilibria:</strong> Many games have more than
              one Nash equilibrium. Which one emerges depends on expectations,
              communication, and focal points—Schelling points that players
              naturally gravitate toward.
            </p>
          </div>
        ),
      },
      {
        title: 'Finding equilibria',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Best-response analysis:</strong> For each player, find
              what strategy maximizes their payoff given the other
              player&rsquo;s choice. Where best responses coincide, you have an
              equilibrium.
            </p>
            <p>
              <strong>Iterated elimination of dominated strategies:</strong>{' '}
              Remove strategies that are always worse than another, regardless
              of what opponents do. If one strategy survives, the game has a
              unique equilibrium.
            </p>
            <p>
              <strong>Mixed strategies:</strong> Sometimes no pure-strategy
              equilibrium exists. Players randomize—for example,
              rock-paper-scissors has an equilibrium where each choice is played
              with probability one-third.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world applications',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Auctions and bidding:</strong> Each bidder&rsquo;s optimal
              bid depends on what others bid—the auction settles at an
              equilibrium where no one wants to change their bid.
            </p>
            <p>
              <strong>Traffic routing:</strong> Drivers choose routes until no
              one can save time by switching—the resulting traffic pattern is a
              Nash equilibrium, often inefficient (Braess&rsquo;s paradox).
            </p>
            <p>
              <strong>Market competition:</strong> Firms choose prices or
              quantities in light of competitors&rsquo; actions. The resulting
              market outcome is a Nash equilibrium in strategic form.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/nash-equilibrium/solve',
        label: 'Nash Equilibrium Solver',
        description:
          'Best-respond to an AI opponent across three classic games and learn to spot Nash equilibria—or when only mixing wins.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Nash_equilibrium',
        label: 'Wikipedia: Nash Equilibrium',
        description: 'Overview of the concept, its definition, and history.',
      },
      {
        href: 'https://www.investopedia.com/terms/n/nash-equilibrium.asp',
        label: 'Investopedia: Nash Equilibrium',
        description:
          'How it works in game theory, with worked examples including the Prisoner’s Dilemma.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/1994/nash/facts/',
        label: 'Nobel Prize: John Nash (1994)',
        description:
          'Nobel biography of Nash and his contribution to game theory.',
      },
    ]}
  />
);

export default NashEquilibriumPage;
