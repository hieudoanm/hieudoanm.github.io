# Economics

> Game theory and economics simulations — pit yourself against AI strategies in
> an iterated Prisoner's Dilemma. Runs everywhere: phone, tablet, laptop,
> desktop.

![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![economics screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/economics/home.png)

---

## Latest release

- **Version:** `app-hybrid-education-economics-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Fedora | amd64        | 40.+         | [Download `.rpm`][download-rpm]            |                  |
| 5   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 6   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 7   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |
| 8   | Windows  |        | x64          | 10.+         | [Download `.exe`][download-exe]            | Portable         |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/education/economics
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A game theory playground in your pocket — face off against five AI strategies in
an iterated Prisoner's Dilemma, track payoffs, and learn cooperation theory.
Runs on any device.

---

## Features

Think strategically and outsmart the bots.

### 🔨 Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/economics`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `economics` theme (light default) with
  `economics-dark` toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

### 🏠 Home & Navigation

- Card grid listing the tool with icon and description
- Tool route rendered directly, opened from the home card grid
- Theme toggle in template header; choice persisted in localStorage

### 🤝 Prisoner's Dilemma

- 10-round iterated prisoner's dilemma against AI strategies
- 32 bot strategies, each with its own behaviour classified as cooperate, defect
  or other, with a dedicated bots browser at `/prisoners-dilemma/bots`
- Round-robin tournament simulation at `/prisoners-dilemma/simulation` with
  configurable rounds per match and score rankings
- Payoff matrix displayed: cooperate/cooperate = 1yr, defect/defect = 2yr
- Keyboard shortcuts: C (cooperate), D (defect), R (reset), Enter (next round)
- Strategy reveal at game end
- Round history tracking with scores per round
- Win/lose/draw determination with visual feedback
- Pure game logic in `utils/game.ts` with exhaustive type checking

### 🎮 Interactive Games & Simulations

Each theory page links to a playable game under `app/(games)`:

- **Auction Simulator** (`/auction-theory/auction`) — bid against three AI
  bidders across English, Dutch, first-price and Vickrey formats; discover
  revenue equivalence and the winner's curse.
- **Ultimatum Split** (`/bargaining-theory/ultimatum`) — propose a split of $100
  and learn how much you must offer to be accepted.
- **Contribute!** (`/public-goods-dilemma/contribute`) — play a public goods
  game and watch free riding trump the group optimum.
- **Commons Harvest** (`/tragedy-of-the-commons/harvest`) — graze one shared
  renewable resource against four villagers and try to avoid collapse.
- **Cournot Competition** (`/oligopoly/cournot`) — pick your output against a
  rival firm and feel the pull of the Cournot equilibrium.
- **Play RPS** (`/zero-sum-games/rps`) — learn minimax and the value of zero-sum
  games against exploitable bot strategies.
- **Stag Hunt** (`/coordination-games/stag-hunt`) — coordinate with a partner
  and learn why trust earns more than playing it safe.
- **Price Lab** (`/supply-and-demand/price-lab`) — drag the curves and see
  equilibrium, shortages, surpluses and elasticity live.
- **Framing Game** (`/prospect-theory/framing`) — answer Kahneman and Tversky
  questions and discover your own reflection effect.
- **Endowment Experiment** (`/endowment-effect/trade`) — measure your own
  willingness to accept vs pay and see the gap.
- **Commitment Device** (`/time-inconsistency/savings`) — save across 12 days
  and feel present bias steal your own plans.
- **Dictator Game** (`/social-preferences/dictator`) — decide how much of your
  endowment to give when nobody can punish you.
- **Order Book** (`/market-microstructure/order-book`) — trade the spread: cross
  it with market orders or earn it back with limits.
- **Job Market** (`/signaling/job-market`) — set wages and learn why education
  only works as a signal when it costs more for the unproductive.
- **Nash Solver** (`/nash-equilibrium/solve`) — best-respond across Battle of
  the Sexes, Stag Hunt and Matching Pennies and spot pure Nash equilibria—or
  when only mixing wins.
- **Rollback: Entry Game** (`/backward-induction/rollback`) — move first in a
  market-entry game and watch the subgame-perfect outcome emerge via rollback.
- **Repeated Dilemma** (`/repeated-games/tournament`) — 10 rounds of the
  iterated prisoner's dilemma against Tit-for-Tat, Grim Trigger, and friends.
- **Replicator Dynamics Lab** (`/evolutionary-game-theory/replicator`) — tune
  payoffs and step generations to see hawk–dove shares hit their ESS.
- **Revelation Game** (`/mechanism-design/reveal`) — report your value for a
  public project and find out why the Clarke pivot rule makes honesty optimal.
- **Hidden Effort** (`/moral-hazard/insurance`) — choose insurance and care and
  watch full cover quietly remove the incentive to try.
- **The Market for Lemons** (`/adverse-selection/lemons`) — post one price and
  watch good cars refuse to sell: Akerlof's adverse selection.
- **Monty Hall Explorer** (`/bayesian-updating/monty-hall`) — switch vs stay
  across 20 trials as the 2/3 odds reveal themselves.
- **Revenue Explorer** (`/elasticity/pricing`) — pick prices under different
  demand elasticities and find revenue-max at |e| = 1.
- **Monopoly Pricing Lab** (`/monopoly-and-market-power/pricing`) — the sole
  seller of a linear-demand good quizzes the deadweight loss triangle.
- **Segment Pricing Lab** (`/price-discrimination/split`) — charge one price or
  two per-segment prices and see third-degree discrimination raise the take.
- **Competitive Firm Lab** (`/perfect-competition/firm`) — a price-taker picks
  output at P = MC and watches long-run profits fall to zero.
- **Pigou's Factory** (`/externalities/pigou`) — run a polluting mill, then tax
  it and watch the private optimum slide to the social optimum.
- **AD-AS Shocks Lab** (`/aggregate-demand-supply/shocks`) — nudge price and
  output to the short-run equilibrium after demand and supply shocks.
- **Triangular Arbitrage Lab** (`/arbitrage/triangular`) — hunt implied-cross
  mispricing across FX triangles and keep the margin when it closes.
- **Bubble Lab** (`/behavioral-finance/bubble`) — buy and sell an asset as
  prices inflate past fundamentals, then get out before the crash.
- **Heuristics Lab** (`/behavioral-heuristics/lab`) — meet anchor, availability
  and representativeness biases in everyday judgment calls.
- **Business Cycle Forecaster** (`/business-cycles/predict`) — read leading
  indicators and call expansion vs recession before the GDP number lands.
- **Portfolio Lab** (`/capm-and-risk/portfolio`) — blend stock, bond and
  risk-free assets between the CML and the efficient frontier.
- **Causation Challenge** (`/causal-inference/experiments`) — spend an
  investigation budget to expose confounders hidden behind correlations.
- **Budget Line Lab** (`/consumer-theory/utility`) — slide along the budget line
  to the optimal bundle for Cobb-Douglas, substitutes and complements.
- **RCT Simulator** (`/development-rcts/experiment`) — design trials, read the
  confidence interval and test whether an effect is real.
- **Inequality Explorer** (`/economic-inequality/lorenz`) — bend the Lorenz
  curve with a flat tax and rebate to hit your Gini target.
- **Random Walk Market** (`/efficient-market-hypothesis/random-walk`) — trade on
  tips and watch forecast accuracy fall to luck under weak-form EMH.
- **Fiscal Multiplier Lab** (`/fiscal-policy/stimulus`) — size stimulus against
  an output gap and feel how big 1/(1−MPC) gets when MPC is high.
- **Payoff Matrix Explorer** (`/game-theory-basics/matrix`) — find the Nash
  equilibrium in prisoner's dilemma, stag hunt, chicken and beyond.
- **GDP Explorer** (`/gdp-and-national-accounts/aggregate`) — build an economy
  with C + I + G + NX sliders, then hit target GDP figures in a quiz.
- **Human Capital Decision** (`/human-capital/decision`) — choose years of
  schooling and weigh discounted lifetime earnings against tuition costs.
- **Market Power Lab** (`/imperfect-competition/lab`) — set differentiation,
  price and output across perfect competition, monopolistic competition and
  monopoly.
- **Institutions Game** (`/institutions-and-growth/lab`) — tune property rights,
  contracts and stability to make inclusive institutions out-grow extractive
  ones across ten simulated years.
- **IS-LM Explorer** (`/is-lm-model/equilibrium`) — move the IS and LM curves
  with fiscal and monetary policy to find equilibrium and tackle policy
  challenges.
- **Keynesian Cross** (`/keynesian-economics/cross`) — set MPC and autonomous
  spending, then compute the ΔG that closes each output gap.
- **Labor Market Lab** (`/labor-markets/wage`) — push the minimum wage above
  equilibrium and watch unemployment and deadweight loss appear.
- **Marginal Utility Lab** (`/marginal-utility/lab`) — allocate a budget between
  apples and cookies and find the utility-maximizing bundle.
- **Market Failure Fixer** (`/market-failures/policies`) — match the right
  policy to each market failure, then set a Pigouvian tax to restore optimal
  output.
- **Mental Accounting Game** (`/mental-accounting/scenarios`) — wrestle with six
  Thaler-style vignettes about fungibility and sunk costs.
- **Migration Decision Lab** (`/migration-economics/moves`) — compute the NPV of
  moving, then simulate labor flows until destination wages equalize.
- **Monetary Policy Lab** (`/monetary-policy/interest`) — set the policy rate
  against Taylor-rule scenarios and fight the inflation–output tradeoff.
- **Nudge Design Lab** (`/nudge-and-behavioral-economics/choice`) — choose
  opt-in, opt-out or active-choice defaults to lift participation.
- **Trade-Off Builder** (`/opportunity-cost/trade-offs`) — allocate time between
  studying and work to see opportunity cost in action.
- **Calibration Challenge** (`/overconfidence-bias/calibration`) — state
  confidence intervals and learn where your certainty beats the market.
- **Phillips Curve Lab** (`/phillips-curve/tradeoff`) — steer the
  inflation–unemployment tradeoff and trace the Phillips curve.
- **Diversification Lab** (`/portfolio-theory/frontier`) — weight three assets,
  watch variance fall with 1/√N diversification, and find the minimum-variance
  portfolio.
- **Poverty Trap Escape** (`/poverty-traps/escape`) — simulate capital
  accumulation and find the transfer that lifts a household above the trap
  threshold.
- **Production & Cost Curves** (`/production-and-costs/lab`) — shift inputs and
  watch output, marginal product and cost curves respond.
- **Voting Power Lab** (`/public-choice/voting`) — measure the influence of
  legislators and interest groups in public choices.
- **Future Value Lab** (`/time-value-of-money/lab`) — discount and compound cash
  flows to compare money across time.
- **Trade & Tariff Lab** (`/trade-and-tariffs/lab`) — pick tariffs, measure
  consumer/producer surplus, and play retaliation to find the Nash tariff.
- **Okun's Law Lab** (`/unemployment-okuns-law/lab`) — move GDP growth and watch
  unemployment respond, then chase missing growth targets.

---

# First run

- **macOS:** Right-click the `.dmg` → "Open" to bypass Gatekeeper, then drag the
  app to your Applications folder.
- **Linux (AppImage):** `chmod +x economics.AppImage` then run it — no install
  needed.
- **Windows:** SmartScreen may flag the `.msi` — click "More info" → "Run
  anyway".

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](LICENSE).
