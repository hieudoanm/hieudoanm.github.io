'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const GameTheoryBasicsPage: NextPage = () => (
  <TheoryTemplate
    title="Game Theory Basics"
    subtitle="The formal study of strategy: how people make choices when the outcome depends on others."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Game theory</strong> is the study of strategic interaction:
            situations where the best course of action for each person depends
            on what others do. A <strong>game</strong> consists of players,
            their available strategies, and the payoffs that result from each
            combination of choices. Game theory provides the formal language for
            analyzing everything from chess and poker to pricing, auctions, and
            international conflict.
          </p>
        ),
      },
      {
        title: 'Key building blocks',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Players and strategies:</strong> Players are the
              decision-makers; strategies are the complete plans of action
              available to them, including contingent responses to what others
              do.
            </p>
            <p>
              <strong>Payoffs:</strong> The utility each player receives from
              every possible combination of strategies. Rational players aim to
              maximize their own payoff.
            </p>
            <p>
              <strong>Normal vs extensive form:</strong> Games can be described
              as a simultaneous payoff matrix (normal form) or as a tree of
              sequential moves (extensive form), each suited to different
              questions.
            </p>
            <p>
              <strong>Information:</strong> Whether players know the rules, each
              other&rsquo;s moves, and each other&rsquo;s preferences (perfect,
              imperfect, complete, or incomplete) deeply shapes play.
            </p>
          </div>
        ),
      },
      {
        title: 'Solution concepts',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Dominant strategies:</strong> A strategy that is best no
              matter what others do. When one exists, predicting play is easy.
            </p>
            <p>
              <strong>Nash equilibrium:</strong> A combination of strategies
              where no player can improve by changing alone. The central
              prediction of non-cooperative game theory (see Nash Equilibrium).
            </p>
            <p>
              <strong>Subgame-perfect equilibrium:</strong> A refinement for
              sequential games requiring credible strategies at every decision
              point (see Backward Induction).
            </p>
            <p>
              <strong>Mixed strategies:</strong> Randomizing among actions when
              no pure strategy is safe, such as in rock-paper-scissors.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Economics:</strong> Game theory underpins the modern
              theory of oligopoly, auctions, bargaining, and mechanism
              design—how firms, bidders, and institutions behave strategically.
            </p>
            <p>
              <strong>Biology and evolution:</strong> It models the spread of
              behaviors in populations (see Evolutionary Game Theory).
            </p>
            <p>
              <strong>Computer science:</strong> Used in adversarial AI,
              auctions on the internet, and the design of protocols where
              participants may be self-interested.
            </p>
            <p>
              <strong>Social science:</strong> Analyzes arms races, deterrence,
              bargaining in politics, and the emergence of social norms.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Game_theory',
        label: 'Wikipedia: Game Theory',
        description:
          'Comprehensive overview of game theory, solution concepts, and applications.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/1994/summary/',
        label: 'Nobel Prize: 1994 Economic Sciences',
        description:
          'Nobel citation for John Nash, John Harsanyi, and Reinhard Selten for game theory analysis.',
      },
      {
        href: 'https://plato.stanford.edu/entries/game-theory/',
        label: 'Stanford Encyclopedia of Philosophy: Game Theory',
        description:
          'In-depth philosophical and formal treatment of game theory concepts and debates.',
      },
    ]}
  />
);

export default GameTheoryBasicsPage;
