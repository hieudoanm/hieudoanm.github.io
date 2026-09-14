'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const OligopolyPage: NextPage = () => (
  <TheoryTemplate
    title="Oligopoly & Strategic Competition"
    subtitle="A few big firms, each watching the others—markets where strategy decides everything."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            An <strong>oligopoly</strong> is a market dominated by a few large
            firms whose decisions are interdependent—for example, airlines,
            telecoms, and auto manufacturers. Because each firm&rsquo;s best
            move depends on what rivals do, oligopoly is the natural home of
            game theory. Firms can compete on quantity (Cournot), compete on
            price (Bertrand), or collude for monopoly-style profits.
          </p>
        ),
      },
      {
        title: 'The core models',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Cournot competition:</strong> Firms choose output
              simultaneously. Each anticipates rivals&rsquo; production and
              picks its own. The equilibrium sits between perfect competition
              and monopoly—fewer firms than ideal, but more output than a
              monopolist.
            </p>
            <p>
              <strong>Bertrand competition:</strong> Firms choose price instead
              of quantity. If products are identical, even two firms can push
              price down to competitive cost—cutting prices to steal the whole
              market. Outcomes differ sharply from Cournot.
            </p>
            <p>
              <strong>Game-theoretic thinking:</strong> In either model, each
              firm&rsquo;s profit depends on rivals&rsquo; choices, so solving
              the market means finding a Nash equilibrium of the strategic game.
            </p>
          </div>
        ),
      },
      {
        title: 'Collusion and cartels',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Why collusion tempts:</strong> If firms agree to keep
              output low and prices high, they can split near-monopoly profits
              instead of competing them away.
            </p>
            <p>
              <strong>Why it&rsquo;s fragile:</strong> Each firm has an
              incentive to secretly cut price or expand output to win the
              others&rsquo; business—exactly the logic of the Prisoner&rsquo;s
              Dilemma. Trust is hard to sustain.
            </p>
            <p>
              <strong>Repeated games:</strong> When the market repeats over and
              over, cooperation can survive because cheaters face retaliation in
              future rounds—tit-for-tat dynamics make collusion more stable.
            </p>
            <p>
              <strong>Illegality:</strong> Explicit cartels are illegal in most
              countries, but firms often find tacit ways to coordinate, such as
              price leadership.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Market outcomes between extremes:</strong> Oligopoly
              usually yields higher prices and lower output than perfect
              competition, but better outcomes than monopoly—the exact result
              depends on the rules of the game.
            </p>
            <p>
              <strong>Antitrust enforcement:</strong> Regulators scrutinize
              mergers among the few big players and punish price-fixing, because
              collusion among oligopolists harms consumers.
            </p>
            <p>
              <strong>Strategic decisions:</strong> Advertising, capacity,
              product launches, and pricing in airlines and telecoms are all
              played as games—firms anticipate rival reactions in every move.
            </p>
            <p>
              <strong>Measuring market power:</strong> Concentration indices
              like the Herfindahl-Hirschman Index help regulators gauge how
              close a market is to oligopoly.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/oligopoly/cournot',
        label: 'Cournot Competition',
        description:
          'Pick your output against a rival firm and feel the pull of the Cournot equilibrium.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Oligopoly',
        label: 'Wikipedia: Oligopoly',
        description:
          'Overview of oligopoly market structure and strategic behavior.',
      },
      {
        href: 'https://www.investopedia.com/terms/o/oligopoly.asp',
        label: 'Investopedia: Oligopoly',
        description:
          'Entry explaining the characteristics of oligopolistic markets.',
      },
      {
        href: 'https://www.britannica.com/topic/oligopoly',
        label: 'Britannica: Oligopoly',
        description:
          'Article on how each of a few large producers affects but does not control the market.',
      },
    ]}
  />
);

export default OligopolyPage;
