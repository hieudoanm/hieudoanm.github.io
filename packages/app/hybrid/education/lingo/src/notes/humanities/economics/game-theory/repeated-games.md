# Repeated Games & Tit-for-Tat

> Why playing the same game over and over unlocks cooperation that a single
> round never could.

App route: `/economics/repeated-games/`

## What is it?

A **repeated game** is a game played over multiple rounds, where players
remember past actions. Repetition changes everything: a one-shot Prisoner’s
Dilemma ends in mutual defection, but when the same players meet again,
cooperation becomes sustainable because cheaters can be punished in future
rounds. The most famous strategy is **Tit-for-Tat**: cooperate first, then
mirror whatever your opponent did last round.

## Why repetition changes behavior

**Shadow of the future:** When a game continues, today’s choice affects
tomorrow’s rewards. Defecting now brings a quick gain but forfeits future
cooperation—so the long-run value of the relationship outweighs the one-time
cheat.

**Reciprocity:** Being able to reward cooperation and punish defection gives
players a way to sustain good behavior without any central authority.

**The Folk Theorem:** With enough patience, almost any payoff profile above the
punishment level can be sustained as an equilibrium—cooperation is rarely the
only possibility, but it is achievable.

## Tit-for-Tat

**The rule:** Cooperate on the first move, then copy your opponent’s previous
move. It is _nice_ (never the first to defect), _retaliatory_ (punishes
defection), _forgiving_ (returns to cooperation if the opponent does), and
_clear_ (easy to read).

**The tournament win:** In Robert Axelrod’s famous computer tournaments among
strategies for the iterated Prisoner’s Dilemma, the simple Tit-for-Tat beat
every sophisticated competitor—using reciprocity to sustain cooperation.

**Limits:** Tit-for-Tat can get locked into retaliation cycles if a single
mistake goes unpunished; variants like generous or forgetful versions exist to
dampen this.

## Real-world applications

**Business relationships:** Suppliers and buyers build trust through repeated
dealings, allowing cooperation (reliable quality, fair pricing) that a one-off
transaction couldn’t support.

**Cartels and collusion:** Oligopolists sustain high-price collusion partly
because deviation is punished in future rounds—the flip side of repeated-game
cooperation.

**International relations:** Arms control treaties are sustained by the threat
of retaliation if a partner cheats, making repeated interaction a tool for
peace.

**Psychology:** Trust in friendships and teams is built and maintained through
observed responsiveness to past behavior.

## Examples

- [Repeated Dilemma](/economics/repeated-games/tournament) — Play 10 rounds of
  the iterated prisoner's dilemma against classic AI strategies and learn when
  cooperation survives.

## References

1. [Wikipedia: Tit for tat](https://en.wikipedia.org/wiki/Tit_for_tat) — The
   tit-for-tat strategy in repeated games and Axelrod's tournament results.
2. [Wikipedia: Folk theorem (game theory)](<https://en.wikipedia.org/wiki/Folk_theorem_(game_theory)>)
   — The folk theorem on cooperative outcomes achievable in infinitely repeated
   games.
3. [Stanford Encyclopedia of Philosophy: Game Theory](https://plato.stanford.edu/entries/game-theory/)
   — A rigorous overview of repeated games and game-theoretic equilibrium
   concepts.
