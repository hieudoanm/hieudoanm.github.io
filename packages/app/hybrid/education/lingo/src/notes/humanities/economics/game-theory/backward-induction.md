---
{
  'title': 'Backward Induction',
  'subtitle':
    'Solving sequential games by reasoning from the last move backward to the
    first.',
  'links':
    [
      {
        'href': '/economics/backward-induction/rollback',
        'label': 'Rollback: Entry Game',
        'description':
          'Move first in a market-entry game while your rival plays perfectly,
          and see the subgame-perfect outcome appear by rollback.',
      },
    ],
  'references':
    [
      {
        'href': 'https://en.wikipedia.org/wiki/Backward_induction',
        'label': 'Wikipedia: Backward Induction',
        'description':
          'Overview of backward induction as a solution concept for sequential
          games.',
      },
      {
        'href': 'https://en.wikipedia.org/wiki/Centipede_game_theory',
        'label': 'Wikipedia: Centipede Game',
        'description':
          'Description of the centipede game and its role in testing backward
          induction.',
      },
      {
        'href': 'https://en.wikipedia.org/wiki/Subgame_perfect_equilibrium',
        'label': 'Wikipedia: Subgame Perfect Equilibrium',
        'description':
          'Formal definition of subgame-perfect equilibrium, the concept
          backward induction produces.',
      },
    ],
}
---

## What is it?

**Backward induction** is a method for solving **sequential games**—games where
players move in a known order. You start at the last decision node, determine
the best choice there, then work backward, eliminating earlier options that lead
to suboptimal play. It produces a **subgame-perfect equilibrium**: a strategy
that is optimal at every point of the game, not just at the start.

## How it works

**Start at the end:** Identify the final move and write down what the last mover
would rationally choose.

**Roll back:** Move to the previous decision and choose the option that produces
the best payoff given the known future play—repeating until you reach the first
move.

**Credibility matters:** Backward induction only works if future threats and
promises are **credible** —i.e., if the player would actually follow through
when the time comes. Non-credible threats are discarded.

## The centipede game

**The setup:** Two players alternately take a growing pot or “pass” it onward;
the pot grows each round. Passing eventually pays more for both, but stopping
early pays the current player more immediately.

**The prediction:** Backward induction predicts the first player stops
immediately—because the second player would rationally stop on their very first
turn for a slightly larger immediate payoff.

**The paradox:** Real people usually pass for several rounds, cooperating far
longer than theory predicts. This gap between backward induction and actual play
exposes the limits of perfect-rationality assumptions.

## Why it matters

**Strategic credibility:** Backward induction filters out empty threats, telling
rational players which commitments are believable and which will be abandoned.

**Chess and games:** Chess engines evaluate positions by rolling forward many
moves, but humans use backward reasoning to identify the consequences of a
proposed move.

**Business and negotiation:** When deciding whether to enter a market or make an
offer, anticipating how rivals and partners will respond down the line—and
working backward from there—yields sound strategy.

**Limits:** With many players and long horizons, backward induction is
computationally heavy, and real behavior often deviates, as the centipede game
demonstrates.
