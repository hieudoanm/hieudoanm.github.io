---
"title": "Probability"
"subtitle":
  "The branch of mathematics that began as an apology for gambling: how to
  reason about uncertainty when the future is not determined, only weighted."
"parentLink":
  "href": "/maths/"
  "label": "Maths"
"links":
  - "href": "/maths/probability/baccarat"
    "label": "Baccarat"
    "description":
      "Player, banker or tie on a six-deck shoe — the classic illustration of a
      bet whose payouts are visibly worse than its true odds."
  - "href": "/maths/probability/card-counter"
    "label": "Card Counter"
    "description":
      "Track the Hi-Lo running count across a full deck and watch it return to
      zero, because every shuffle guarantees it must."
  - "href": "/maths/probability/craps"
    "label": "Craps"
    "description":
      "The pass line is the rare casino game where the stated payout is honest —
      the edge survives only because the rules are subtler than they look."
  - "href": "/maths/probability/hi-lo"
    "label": "Hi-Lo"
    "description":
      "Guess whether the next card is higher or lower. The odds shift under your
      feet as the deck depletes, and the streak is mostly variance."
  - "href": "/maths/probability/keno"
    "label": "Keno"
    "description":
      "Pick up to five spots from eighty, and watch a payout table reach for a
      700× multiplier it almost never pays."
  - "href": "/maths/probability/over-under-seven"
    "label": "Over / Under Seven"
    "description":
      "Two dice, three bets, and the clearest possible demonstration that 2:1 is
      not the same thing as fifty-fifty."
  - "href": "/maths/probability/poker-odds"
    "label": "Poker Odds"
    "description":
      "Monte Carlo equity for a Texas Hold'em hand — the same technique used to
      price options and to test nuclear shielding."
  - "href": "/maths/probability/roulette"
    "label": "Roulette"
    "description":
      "A single-zero wheel where every outside bet pays 2:1 against a true
      probability of eighteen thirty-sevenths."
  - "href": "/maths/probability/slot-machine"
    "label": "Slot Machine"
    "description":
      "Three reels, six symbols, and a jackpot designed to be unreachable in a
      single lifetime of play."
  - "href": "/maths/probability/war"
    "label": "War"
    "description":
      "Higher card takes the pot, and a tie doubles it — a game whose expected
      value can be written down in one line and verified by shuffling."
"references":
  - "href": "https://en.wikipedia.org/wiki/History_of_probability"
    "label": "Wikipedia: History of Probability"
    "description":
      "The correspondence between Pascal and Fermat, and why a dice problem sent
      two mathematicians into a twelve-year silence."
  - "href": "https://en.wikipedia.org/wiki/Problem_of_points"
    "label": "Wikipedia: Problem of Points"
    "description":
      "The interrupted-game problem that produced the binomial distribution and
      Pascal's first real theorem."
  - "href": "https://en.wikipedia.org/wiki/Gambler%27s_fallacy"
    "label": "Wikipedia: Gambler's Fallacy"
    "description":
      "Why independent events do not care about your losses, and why the belief
      survives in spite of that."
  - "href": "https://en.wikipedia.org/wiki/Casino_mathematics"
    "label": "Wikipedia: Casino Mathematics"
    "description":
      "The house edge, expected value, and the standard deviation figures that
      set a table's variance."
  - "href": "https://en.wikipedia.org/wiki/Monte_Carlo_method"
    "label": "Wikipedia: Monte Carlo Method"
    "description":
      "The estimator behind the poker equity simulator, and the reason Ulam and
      von Neumann reached for it in 1945."
---

## Probability started as a losing-problem story

Probability theory did not begin as an abstract discipline. It began because two
French mathematicians had a friend who kept losing money.

The Chevalier de Méré was a gambler with a taste for problems. He had settled
that a coin tossed four times in a row has better than even odds of giving at
least one head. He had worked out that the first player to throw a six has an
advantage over the second. Then he proposed a puzzle to Blaise Pascal and Pierre
de Fermat that turned out to be harder than either expected: with thirty-six
players in a tournament, cut off mid-game, how should the pot be divided fairly
among those still in?

The naive answer — divide the pot in proportion to who won — is incoherent. A
player who is certain to win outright is in a different position from one who
would still win two-to-one, and both are different from a player already
eliminated. The fair share depends on the _chances_ of the unplayed rounds,
which is precisely what Pascal and Fermat did not yet have a language for.

They corresponded about it for years. Fermat's methods were more systematic and
eventually became the general one, but Pascal's arrived first, in 1654, through
a recursion over the possible outcomes. The letter Pascal sent Fermat that
December is generally taken as the founding document of probability theory.

The problem is remembered as the **problem of points**. Solving it required
enumerating incomplete games and the probabilities of finishing them, which is
what produced the binomial distribution — and from there, de Moivre's normal
approximation, and eventually the entire apparatus of combinatorics.

The lesson worth keeping is not about gambling. It is that the theory was
extracted from a demand for fairness under interruption: what is a share worth
when you cannot say who the winner will be, but you can say how likely each
candidate is?

## Expected value is the whole game

Nearly every misconception about gambling dies against a single definition.

For a bet of _S_ that returns a gross amount _G_ when it wins and nothing when
it loses, the **expected value** of the net result is:

    EV = P(win) · G − S

The stake _S_ comes off unconditionally, which is the step people miss. A coin
that pays 1 on heads and nothing on tails has an expected value of ½ · 1 − 1 =
−½, not zero — it looks like even money but costs you a coin every time.

Two dice, betting that the total comes in under seven. There are thirty-six
equally likely ordered outcomes, and fifteen of them total less than seven — so
the true probability is 15/36 ≈ 0.417, not one half. The game pays 2× the stake,
so with a stake of 10:

    EV = (15/36) · 20 − 10 = 8.33 − 10 = −1.67

Even money would need a true probability of exactly one half. A fair payout for
a 41.7% shot would have been _S_ ÷ P = 10 ÷ (15/36) = 24, so paying 20 leaves
the house 1.67 ahead on every 10 staked — a **house edge** of 16.7%. That
negative number is the whole content of the game. The _Over / Under Seven_
simulation on this page lets you make exactly this bet as often as you like; the
seven bet, paying 5× against a true 6/36, carries the same edge.

This is why payout notation cannot be trusted on its own. "2:1" is a statement
about the payout, not about the odds, and the two are set independently. A
paytable is a **liability** statement, not a description of likelihood. Reading
one correctly means computing the probability of each outcome and comparing it
with the corresponding payout — the same work the casino's own mathematics
department does before approving a game.

The edge does not care how the dice actually land. A player can win any number
of consecutive rounds and still be losing money overall.

Keno shows how large that edge can get. Picking five numbers pays 700× the stake
on a match of all five, and the true probability of that event is
C(20,5)/C(80,5) — about 1 in 1,551. A fair 700× payout would need a probability
of 1 in 700, so the edge on that jackpot is roughly 55%, several times worse
than the 2–17% typical of table games. A large-looking multiplier is not the
same thing as a good bet.

## Independence is the assumption that keeps biting

Most probability reasoning rests on **independence**: the chance of one event is
unaffected by whether another happened. Dice satisfy it. Card draws from a
shuffled deck do not, because each draw changes the composition of what remains.

This single fact explains card counting, and it is worth being precise about
what counting does and does not do.

A 52-card deck contains twenty cards valued at ten or more and twenty valued at
six or fewer. In blackjack, a ten-rich deck makes the player more likely to be
dealt a strong hand and less likely for the dealer to bust, so the player's edge
improves. The **Hi-Lo** system on this page reduces this to a single running
integer: add one for each 2–6, subtract one for each ten–ace, ignore 7–9.

Here is what that count does and does not achieve. Deck composition is fixed.
The system deals two full decks, so the number of high and low cards is a
property of the shuffled deck, not of the order. Every count, if tracked to the
end of all 52 cards, **must** return to zero. The _Card Counter_ game runs a
full deck so you can confirm this.

So counting does not predict the future. It only measures the present state of a
known population, and it lets you vary your bet size to match. The house edge
never disappears — it becomes a fraction of a wager instead of a fixed amount.
Card counting is a tool for scaling, not for escaping the mathematics.

## Variance, streaks, and the gambler's fallacy

The second foundation is **variance**: how far outcomes spread from their mean.
Expected value describes the centre of a distribution. Variance describes its
width. Both are needed, and confusing them causes most gambling harm.

A game with a small house edge and huge variance can bankrupt a player who is
winning on average. Roulette pays only a 2.7% edge, but a single bet of a
significant fraction of a bankroll carries enough spread that the ruin
probability is not negligible. This is why variance, not expected value, decides
who survives.

From variance comes the **law of large numbers**: the empirical frequency of an
event converges to its probability as the sample grows. Flip a coin a hundred
thousand times and the proportion of heads approaches ½.

The **gambler's fallacy** is the direct denial of this. It claims that because
heads has come up nine times, tails is "due". Independent events do not have a
memory; on a fair coin the next flip is ½ regardless of the last nine. The same
error appears in a subtly different form in **hot-hand** reasoning, which claims
the opposite — that a streak signals a genuine change in underlying odds.
Neither claim survives: for independent events, the past is genuinely
uninformative, and for dependent events you need to know the mechanism, not the
streak.

The _Hi-Lo_ game is built to expose this. Play a long run and watch a streak
that looks like skill settle into the 2:1 payout's arithmetic.

## Bayes, and knowing versus assuming

Classical probability assigns a probability and reasons forward from conditions
to consequences. **Bayesian** probability runs in reverse: it starts with a
prior belief, observes evidence, and updates.

For a prior P(H) and evidence E, Bayes' theorem gives P(H | E) proportional to
P(E | H) · P(H). The terms matter. P(H | E), the probability of the hypothesis
given the evidence, is generally _not_ the same as P(E | H), the probability of
seeing the evidence if the hypothesis is true. Conflating them is the base rate
neglect fallacy, and it is the most consequential error in ordinary reasoning
about risk.

In a game context, drawing to a strong hand is a Bayesian update whether or not
the player phrases it that way: the priors change with the known cards, and the
posterior win probability changes with them. The _Poker Odds_ game computes that
posterior the honest way — by simulation rather than by intuition — because no
closed-form count is available for a seven-card comparison against multiple
opponents.

That simulation is itself the **Monte Carlo method**: estimate an unknown
quantity by sampling. It is why poker equity appears on modern odds calculators,
and why Ulam and von Neumann used it at Los Alamos in 1945 to estimate neutron
behaviour when the differential equations were not yet tractable. The same
estimator answers "what fraction of my betting bankroll survives 1,000 spins of
the slot machine".

## The games on this page

The ten games here are all probability simulators. Each one isolates a single
idea that this note has described:

- **Over / Under Seven** — expected value worked out from first principles. The
  under and over bets pay 2× against a true probability of 15/36, and the 7 bet
  pays 5× against 6/36; all three land on the same 16.7% edge. The best
  available demonstration that payout notation and odds are set independently.
- **Craps** — a come-out roll and a point to make. In the real casino the pass
  line is one of the lowest-edge table bets, which makes it the standard
  contrast with roulette; this simulation simplifies the rules, so use it for
  the state machine rather than for the edge.
- **Roulette** — a uniform 37-slot sample, showing that the zero is what makes
  every outside bet a losing bet.
- **Baccarat** — third-card drawing rules. A reminder that a bet's payout is not
  the only thing that determines its value; the resolution procedure matters
  too.
- **Keno** — extreme paytables, where the divergence between the offered and the
  fair multiplier is largest of any game here.
- **Slot Machine** — a fixed jackpot multiplier designed to be unreachable, and
  a clean illustration of variance dominating expectation.
- **Card Counter** — dependent events and running counts. Play a full deck and
  the count returns to zero.
- **Hi-Lo** — how a deck's composition shifts odds mid-game, and how streaks
  mostly reflect variance.
- **War** — the simplest expected-value calculation of the set: a tie occurs
  with probability 3/51 ≈ 5.9%, each resolved pair is otherwise a fair coin, and
  each war doubles the stake.
- **Poker Odds** — Monte Carlo estimation of a posterior probability, the
  method's most direct use in modern quantitative work.

Every game uses a fixed starting bankroll so that the arithmetic stays legible.
In each one the ending balance is a random variable. Over enough hands it will
converge on its expected value, whatever the player's decisions, and the
distribution around that value is the real story.
