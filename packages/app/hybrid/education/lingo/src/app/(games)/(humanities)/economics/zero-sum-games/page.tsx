'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const ZeroSumGamesPage: NextPage = () => (
  <TheoryTemplate
    title="Zero-Sum Games"
    subtitle="Games where one player's gain is exactly another's loss."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            A <strong>zero-sum game</strong> is a strategic interaction where
            the total payoff across all players is fixed—whatever one player
            wins, another must lose. In a two-player version, the gains of one
            exactly equal the losses of the other. Chess, poker, and most
            sporting contests are zero-sum; real economies are largely{' '}
            <strong>positive-sum</strong> because trade creates value. Whether a
            situation is zero-sum shapes how conflict is approached.
          </p>
        ),
      },
      {
        title: 'Core ideas',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Fixed pie:</strong> There is a fixed quantity to divide.
              Every improvement for one participant comes at the expense of
              another—there is no way to create more value, only to redistribute
              it.
            </p>
            <p>
              <strong>Pure conflict:</strong> Interests are diametrically
              opposed. Cooperation is rational only as a tactical alliance, not
              as value creation—unlike positive-sum games where cooperation
              expands the pie.
            </p>
            <p>
              <strong>Strict deinition:</strong> Formally, the sum of all
              players&rsquo; utilities is constant (often zero). A &ldquo;sum
              game&rdquo; generalizes this to cases where total value can grow
              or shrink.
            </p>
          </div>
        ),
      },
      {
        title: 'Solution concepts',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Minimax:</strong> In a perfect-information zero-sum game
              like chess, the optimal strategy minimizes your maximum possible
              loss. John von Neumann&rsquo;s minimax theorem guarantees every
              finite zero-sum game has a value—the best a player can guarantee
              against an optimal opponent.
            </p>
            <p>
              <strong>Mixed strategies:</strong> In games like
              rock-paper-scissors, no pure strategy is safe. Players randomize
              so the opponent cannot exploit them—at the equilibrium,
              randomizing at specific probabilities guarantees the value of the
              game.
            </p>
            <p>
              <strong>Limited cooperation:</strong> Because the pie is fixed,
              zero-sum games breed rivalry. Cartels and collusion are fragile
              because every gain is another&rsquo;s loss.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world applications',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Sports and betting:</strong> A fixed pool of points or
              bets means every win is offset by a loss—prototypical zero-sum
              contests.
            </p>
            <p>
              <strong>International conflict:</strong> Territorial disputes and
              (in a destructively simplified view) some strategic arms races are
              treated as zero-sum by adversaries, shaping deterrence and
              brinkmanship.
            </p>
            <p>
              <strong>Markets and trade:</strong> When competition is framed as
              winning market share from a rival rather than growing the market,
              firms behave as if in a zero-sum game—even though specialization
              usually makes the overall economy positive-sum.
            </p>
            <p>
              <strong>Cybersecurity:</strong> Hacking and defense are often
              modeled as zero-sum, where one party&rsquo;s foothold is
              another&rsquo;s exposure.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/zero-sum-games/rps',
        label: 'Play RPS',
        description:
          'Learn minimax and the value of zero-sum games on the classic playground.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Zero-sum_game',
        label: 'Wikipedia: Zero-sum game',
        description:
          "Zero-sum games in which one player's gain is another's loss.",
      },
      {
        href: 'https://www.investopedia.com/terms/z/zero-sumgame.asp',
        label: 'Investopedia: Zero-Sum Game',
        description: 'Zero-sum games in investment and competition contexts.',
      },
      {
        href: 'https://plato.stanford.edu/entries/game-theory/',
        label: 'Stanford Encyclopedia of Philosophy: Game Theory',
        description:
          'Formal treatment of strategic games, including zero-sum and mixed-strategy equilibria.',
      },
    ]}
  />
);

export default ZeroSumGamesPage;
