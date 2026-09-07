'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const BackwardInductionPage: NextPage = () => (
  <TheoryTemplate
    title="Backward Induction"
    subtitle="Solving sequential games by reasoning from the last move backward to the first."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Backward induction</strong> is a method for solving{' '}
            <strong>sequential games</strong>—games where players move in a
            known order. You start at the last decision node, determine the best
            choice there, then work backward, eliminating earlier options that
            lead to suboptimal play. It produces a{' '}
            <strong>subgame-perfect equilibrium</strong>: a strategy that is
            optimal at every point of the game, not just at the start.
          </p>
        ),
      },
      {
        title: 'How it works',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Start at the end:</strong> Identify the final move and
              write down what the last mover would rationally choose.
            </p>
            <p>
              <strong>Roll back:</strong> Move to the previous decision and
              choose the option that produces the best payoff given the known
              future play—repeating until you reach the first move.
            </p>
            <p>
              <strong>Credibility matters:</strong> Backward induction only
              works if future threats and promises are <strong>credible</strong>
              —i.e., if the player would actually follow through when the time
              comes. Non-credible threats are discarded.
            </p>
          </div>
        ),
      },
      {
        title: 'The centipede game',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The setup:</strong> Two players alternately take a growing
              pot or &ldquo;pass&rdquo; it onward; the pot grows each round.
              Passing eventually pays more for both, but stopping early pays the
              current player more immediately.
            </p>
            <p>
              <strong>The prediction:</strong> Backward induction predicts the
              first player stops immediately—because the second player would
              rationally stop on their very first turn for a slightly larger
              immediate payoff.
            </p>
            <p>
              <strong>The paradox:</strong> Real people usually pass for several
              rounds, cooperating far longer than theory predicts. This gap
              between backward induction and actual play exposes the limits of
              perfect-rationality assumptions.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Strategic credibility:</strong> Backward induction filters
              out empty threats, telling rational players which commitments are
              believable and which will be abandoned.
            </p>
            <p>
              <strong>Chess and games:</strong> Chess engines evaluate positions
              by rolling forward many moves, but humans use backward reasoning
              to identify the consequences of a proposed move.
            </p>
            <p>
              <strong>Business and negotiation:</strong> When deciding whether
              to enter a market or make an offer, anticipating how rivals and
              partners will respond down the line—and working backward from
              there—yields sound strategy.
            </p>
            <p>
              <strong>Limits:</strong> With many players and long horizons,
              backward induction is computationally heavy, and real behavior
              often deviates, as the centipede game demonstrates.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default BackwardInductionPage;
