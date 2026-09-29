---
"title": "Mechanism Design"
"subtitle":
  "Designing the rules of the game so self-interested players produce good
  outcomes."
"links":
  - "href": "/economics/mechanism-design/reveal"
    "label": "Revelation Game"
    "description":
      "Report what a public project is worth to you and see why the pivot
      (Clarke) rule makes honesty your best move."
"references":
  - "href": "https://www.nobelprize.org/prizes/economic-sciences/2007/summary/"
    "label": "Nobel Prize: 2007 Economic Sciences"
    "description":
      "Nobel award to Hurwicz, Maskin, and Myerson for mechanism design theory."
  - "href": "https://en.wikipedia.org/wiki/Mechanism_design"
    "label": "Wikipedia: Mechanism Design"
    "description":
      "Overview of reverse game theory, incentive compatibility, and the
      revelation principle."
  - "href": "https://www.investopedia.com/terms/m/mechanism-design.asp"
    "label": "Investopedia: Mechanism Design"
    "description":
      "Entry explaining how rules are designed to achieve desired economic
      outcomes."
---

<!-- prettier-ignore-end -->

<!-- prettier-ignore-end -->

## What is it?

**Mechanism design** is the branch of economics that works backwards: instead of
analyzing behavior given fixed rules, it asks what rules would produce a desired
outcome when agents are self-interested and have private information. Often
called **reverse game theory**, it earned Leonid Hurwicz, Eric Maskin, and Roger
Myerson the Nobel Prize in 2007.

## Core concepts

**Incentive compatibility:** A mechanism is incentive-compatible when every
participant does best by reporting their true preferences. Truth-telling becomes
the dominant strategy—not because people are honest, but because the rules make
honesty the smart move.

**Individual rationality:** Participation must be voluntary and beneficial. No
agent should be forced into an outcome worse than what they could achieve by
walking away.

**Implementation:** Given a social choice function (the desired mapping from
private information to outcomes), mechanism design asks: does a game exist where
rational play produces exactly that mapping?

**The revelation principle:** For any outcome achievable by any mechanism, there
exists an equivalent direct-revelation mechanism where truth-telling is
incentive-compatible. This simplifies analysis enormously.

## Fundamental results

**Gibbard-Satterthwaite theorem:** With three or more alternatives, no
deterministic mechanism is strategy-proof and onto unless it is dictatorial.
This is an impossibility result—perfect mechanisms don’t exist in general.

**Vickrey-Clarke-Groves (VCG):** A family of mechanisms that achieve efficient
allocation by charging each agent their marginal externality on others. They are
incentive-compatible but vulnerable to collusion and budget imbalance.

**Myerson’s optimal auction:** When selling a single item, the
revenue-maximizing mechanism involves a reserve price and careful allocation
rule—explaining why eBay reserves and minimum bids exist.

## Real-world applications

**Spectrum auctions:** Governments use combinatorial auction mechanisms designed
by economists to sell radio frequencies to telecoms—raising billions while
ensuring efficient allocation.

**School choice:** The Gale-Shapley deferred-acceptance algorithm is used in New
York, Boston, and other cities to match students to schools based on
preferences.

**Kidney exchange:** Paired donation chains use mechanism design to match
incompatible donor-patient pairs, enabling swaps that save lives no bilateral
match could.

**Carbon markets:** Cap-and-trade systems are mechanisms designed to internalize
the externality of pollution by making emission rights tradeable.
