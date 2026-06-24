# TREE

```text
├── scripts/
│   └── [install.sh](./scripts/install.sh)
├── src/
│   ├── cmd/
│   │   ├── calc/
│   │   │   ├── age/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/age/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/age/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/age/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/age/service_test.go)
│   │   │   ├── base/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/base/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/base/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/base/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/base/service_test.go)
│   │   │   ├── bmi/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/bmi/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/bmi/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/bmi/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/bmi/service_test.go)
│   │   │   ├── compound/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/compound/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/compound/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/compound/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/compound/service_test.go)
│   │   │   ├── currency/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/currency/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/currency/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/currency/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/currency/service_test.go)
│   │   │   ├── date/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/date/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/date/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/date/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/date/service_test.go)
│   │   │   ├── discount/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/discount/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/discount/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/discount/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/discount/service_test.go)
│   │   │   ├── eval/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/eval/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/eval/cmd_test.go)
│   │   │   │   ├── [evaluator.go](./src/cmd/calc/eval/evaluator.go)
│   │   │   │   ├── [evaluator_test.go](./src/cmd/calc/eval/evaluator_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/eval/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/eval/service_test.go)
│   │   │   ├── factorial/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/factorial/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/factorial/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/factorial/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/factorial/service_test.go)
│   │   │   ├── gcd/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/gcd/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/gcd/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/gcd/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/gcd/service_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [finance.go](./src/cmd/calc/internal/finance.go)
│   │   │   │   ├── [finance_test.go](./src/cmd/calc/internal/finance_test.go)
│   │   │   │   ├── [math.go](./src/cmd/calc/internal/math.go)
│   │   │   │   ├── [math_test.go](./src/cmd/calc/internal/math_test.go)
│   │   │   │   ├── [testutil.go](./src/cmd/calc/internal/testutil.go)
│   │   │   │   └── [testutil_test.go](./src/cmd/calc/internal/testutil_test.go)
│   │   │   ├── lcm/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/lcm/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/lcm/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/lcm/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/lcm/service_test.go)
│   │   │   ├── loan/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/loan/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/loan/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/loan/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/loan/service_test.go)
│   │   │   ├── mortgage/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/mortgage/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/mortgage/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/mortgage/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/mortgage/service_test.go)
│   │   │   ├── percent/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/percent/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/percent/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/percent/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/percent/service_test.go)
│   │   │   ├── prime/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/prime/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/prime/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/prime/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/prime/service_test.go)
│   │   │   ├── random/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/random/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/random/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/random/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/random/service_test.go)
│   │   │   ├── stats/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/stats/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/stats/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/stats/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/stats/service_test.go)
│   │   │   ├── tax/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/tax/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/tax/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/tax/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/tax/service_test.go)
│   │   │   ├── tip/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/tip/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/tip/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/tip/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/tip/service_test.go)
│   │   │   ├── unit/
│   │   │   │   ├── [cmd.go](./src/cmd/calc/unit/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/calc/unit/cmd_test.go)
│   │   │   │   ├── [conversion.go](./src/cmd/calc/unit/conversion.go)
│   │   │   │   ├── [conversion_test.go](./src/cmd/calc/unit/conversion_test.go)
│   │   │   │   ├── [service.go](./src/cmd/calc/unit/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/calc/unit/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/calc/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/calc/cmd_test.go)
│   │   ├── casino/
│   │   │   ├── baccarat/
│   │   │   │   ├── play/
│   │   │   │   │   ├── [cmd.go](./src/cmd/casino/baccarat/play/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/casino/baccarat/play/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/casino/baccarat/play/service.go)
│   │   │   │   │   ├── [service_test.go](./src/cmd/casino/baccarat/play/service_test.go)
│   │   │   │   │   ├── [tui.go](./src/cmd/casino/baccarat/play/tui.go)
│   │   │   │   │   └── [tui_test.go](./src/cmd/casino/baccarat/play/tui_test.go)
│   │   │   │   ├── rules/
│   │   │   │   │   ├── [rules.go](./src/cmd/casino/baccarat/rules/rules.go)
│   │   │   │   │   └── [rules_test.go](./src/cmd/casino/baccarat/rules/rules_test.go)
│   │   │   │   ├── strategy/
│   │   │   │   │   ├── [cmd.go](./src/cmd/casino/baccarat/strategy/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/casino/baccarat/strategy/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/casino/baccarat/strategy/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/casino/baccarat/strategy/service_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/casino/baccarat/cmd.go)
│   │   │   │   └── [cmd_test.go](./src/cmd/casino/baccarat/cmd_test.go)
│   │   │   ├── blackjack/
│   │   │   │   ├── cheatsheet/
│   │   │   │   │   ├── [cmd.go](./src/cmd/casino/blackjack/cheatsheet/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/casino/blackjack/cheatsheet/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/casino/blackjack/cheatsheet/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/casino/blackjack/cheatsheet/service_test.go)
│   │   │   │   ├── count/
│   │   │   │   │   ├── [cmd.go](./src/cmd/casino/blackjack/count/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/casino/blackjack/count/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/casino/blackjack/count/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/casino/blackjack/count/service_test.go)
│   │   │   │   ├── play/
│   │   │   │   │   ├── [cmd.go](./src/cmd/casino/blackjack/play/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/casino/blackjack/play/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/casino/blackjack/play/service.go)
│   │   │   │   │   ├── [service_test.go](./src/cmd/casino/blackjack/play/service_test.go)
│   │   │   │   │   ├── [tui.go](./src/cmd/casino/blackjack/play/tui.go)
│   │   │   │   │   └── [tui_test.go](./src/cmd/casino/blackjack/play/tui_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/casino/blackjack/cmd.go)
│   │   │   │   └── [cmd_test.go](./src/cmd/casino/blackjack/cmd_test.go)
│   │   │   ├── coin/
│   │   │   │   ├── [cmd.go](./src/cmd/casino/coin/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/casino/coin/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/casino/coin/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/casino/coin/service_test.go)
│   │   │   ├── dice/
│   │   │   │   ├── [cmd.go](./src/cmd/casino/dice/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/casino/dice/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/casino/dice/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/casino/dice/service_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [card.go](./src/cmd/casino/internal/card.go)
│   │   │   │   ├── [card_test.go](./src/cmd/casino/internal/card_test.go)
│   │   │   │   ├── [deck.go](./src/cmd/casino/internal/deck.go)
│   │   │   │   ├── [deck_test.go](./src/cmd/casino/internal/deck_test.go)
│   │   │   │   ├── [display.go](./src/cmd/casino/internal/display.go)
│   │   │   │   └── [display_test.go](./src/cmd/casino/internal/display_test.go)
│   │   │   ├── poker/
│   │   │   │   ├── hand/
│   │   │   │   │   ├── [eval.go](./src/cmd/casino/poker/hand/eval.go)
│   │   │   │   │   └── [eval_test.go](./src/cmd/casino/poker/hand/eval_test.go)
│   │   │   │   ├── odds/
│   │   │   │   │   ├── [cmd.go](./src/cmd/casino/poker/odds/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/casino/poker/odds/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/casino/poker/odds/service.go)
│   │   │   │   │   ├── [service_test.go](./src/cmd/casino/poker/odds/service_test.go)
│   │   │   │   │   └── [sim_test.go](./src/cmd/casino/poker/odds/sim_test.go)
│   │   │   │   ├── play/
│   │   │   │   │   ├── [cmd.go](./src/cmd/casino/poker/play/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/casino/poker/play/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/casino/poker/play/service.go)
│   │   │   │   │   ├── [service_test.go](./src/cmd/casino/poker/play/service_test.go)
│   │   │   │   │   ├── [tui.go](./src/cmd/casino/poker/play/tui.go)
│   │   │   │   │   └── [tui_test.go](./src/cmd/casino/poker/play/tui_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/casino/poker/cmd.go)
│   │   │   │   └── [cmd_test.go](./src/cmd/casino/poker/cmd_test.go)
│   │   │   ├── roulette/
│   │   │   │   ├── [cmd.go](./src/cmd/casino/roulette/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/casino/roulette/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/casino/roulette/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/casino/roulette/service_test.go)
│   │   │   ├── slots/
│   │   │   │   ├── [cmd.go](./src/cmd/casino/slots/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/casino/slots/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/casino/slots/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/casino/slots/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/casino/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/casino/cmd_test.go)
│   │   ├── chess/
│   │   │   ├── chess.com/
│   │   │   │   ├── club/
│   │   │   │   │   ├── matches/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/club/matches/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/club/matches/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/club/matches/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/club/matches/service_test.go)
│   │   │   │   │   ├── members/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/club/members/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/club/members/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/club/members/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/club/members/service_test.go)
│   │   │   │   │   ├── profile/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/club/profile/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/club/profile/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/club/profile/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/club/profile/service_test.go)
│   │   │   │   │   ├── [parent.go](./src/cmd/chess/chess.com/club/parent.go)
│   │   │   │   │   └── [parent_test.go](./src/cmd/chess/chess.com/club/parent_test.go)
│   │   │   │   ├── country/
│   │   │   │   │   ├── clubs/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/country/clubs/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/country/clubs/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/country/clubs/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/country/clubs/service_test.go)
│   │   │   │   │   ├── players/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/country/players/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/country/players/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/country/players/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/country/players/service_test.go)
│   │   │   │   │   ├── profile/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/country/profile/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/country/profile/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/country/profile/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/country/profile/service_test.go)
│   │   │   │   │   ├── [parent.go](./src/cmd/chess/chess.com/country/parent.go)
│   │   │   │   │   └── [parent_test.go](./src/cmd/chess/chess.com/country/parent_test.go)
│   │   │   │   ├── leaderboards/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/leaderboards/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/leaderboards/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/leaderboards/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/leaderboards/service_test.go)
│   │   │   │   ├── match/
│   │   │   │   │   ├── daily/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/match/daily/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/match/daily/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/match/daily/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/match/daily/service_test.go)
│   │   │   │   │   ├── daily-board/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/match/daily-board/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/match/daily-board/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/match/daily-board/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/match/daily-board/service_test.go)
│   │   │   │   │   ├── internal/
│   │   │   │   │   │   ├── [types.go](./src/cmd/chess/chess.com/match/internal/types.go)
│   │   │   │   │   │   └── [types_test.go](./src/cmd/chess/chess.com/match/internal/types_test.go)
│   │   │   │   │   ├── live/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/match/live/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/match/live/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/match/live/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/match/live/service_test.go)
│   │   │   │   │   ├── live-board/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/match/live-board/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/match/live-board/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/match/live-board/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/match/live-board/service_test.go)
│   │   │   │   │   ├── [parent.go](./src/cmd/chess/chess.com/match/parent.go)
│   │   │   │   │   ├── [parent_test.go](./src/cmd/chess/chess.com/match/parent_test.go)
│   │   │   │   │   ├── [types.go](./src/cmd/chess/chess.com/match/types.go)
│   │   │   │   │   └── [types_test.go](./src/cmd/chess/chess.com/match/types_test.go)
│   │   │   │   ├── player/
│   │   │   │   │   ├── archive/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/archive/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/archive/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/archive/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/archive/service_test.go)
│   │   │   │   │   ├── archives/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/archives/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/archives/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/archives/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/archives/service_test.go)
│   │   │   │   │   ├── clubs/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/clubs/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/clubs/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/clubs/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/clubs/service_test.go)
│   │   │   │   │   ├── games/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/games/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/games/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/games/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/games/service_test.go)
│   │   │   │   │   ├── live/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/live/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/live/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/live/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/live/service_test.go)
│   │   │   │   │   ├── matches/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/matches/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/matches/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/matches/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/matches/service_test.go)
│   │   │   │   │   ├── online/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/online/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/online/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/online/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/online/service_test.go)
│   │   │   │   │   ├── pgn/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/pgn/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/pgn/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/pgn/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/pgn/service_test.go)
│   │   │   │   │   ├── profile/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/profile/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/profile/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/profile/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/profile/service_test.go)
│   │   │   │   │   ├── stats/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/stats/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/stats/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/stats/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/stats/service_test.go)
│   │   │   │   │   ├── to_move/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/to_move/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/to_move/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/to_move/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/to_move/service_test.go)
│   │   │   │   │   ├── tournaments/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/player/tournaments/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/player/tournaments/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/player/tournaments/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/player/tournaments/service_test.go)
│   │   │   │   │   ├── [parent.go](./src/cmd/chess/chess.com/player/parent.go)
│   │   │   │   │   └── [parent_test.go](./src/cmd/chess/chess.com/player/parent_test.go)
│   │   │   │   ├── puzzle/
│   │   │   │   │   ├── daily/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/puzzle/daily/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/puzzle/daily/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/puzzle/daily/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/puzzle/daily/service_test.go)
│   │   │   │   │   ├── random/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/puzzle/random/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/puzzle/random/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/puzzle/random/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/puzzle/random/service_test.go)
│   │   │   │   │   ├── [parent.go](./src/cmd/chess/chess.com/puzzle/parent.go)
│   │   │   │   │   └── [parent_test.go](./src/cmd/chess/chess.com/puzzle/parent_test.go)
│   │   │   │   ├── streamer/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/streamer/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/streamer/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/streamer/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/streamer/service_test.go)
│   │   │   │   ├── titled/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/titled/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/titled/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/titled/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/titled/service_test.go)
│   │   │   │   ├── tournament/
│   │   │   │   │   ├── group/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/tournament/group/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/tournament/group/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/tournament/group/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/tournament/group/service_test.go)
│   │   │   │   │   ├── info/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/tournament/info/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/tournament/info/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/tournament/info/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/tournament/info/service_test.go)
│   │   │   │   │   ├── round/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess.com/tournament/round/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess.com/tournament/round/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/chess.com/tournament/round/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess.com/tournament/round/service_test.go)
│   │   │   │   │   ├── [parent.go](./src/cmd/chess/chess.com/tournament/parent.go)
│   │   │   │   │   └── [parent_test.go](./src/cmd/chess/chess.com/tournament/parent_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/chess/chess.com/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/chess/chess.com/parent_test.go)
│   │   │   ├── chess960/
│   │   │   │   ├── random/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess960/random/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess960/random/cmd_test.go)
│   │   │   │   │   ├── [positions.go](./src/cmd/chess/chess960/random/positions.go)
│   │   │   │   │   ├── [positions_test.go](./src/cmd/chess/chess960/random/positions_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/chess960/random/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess960/random/service_test.go)
│   │   │   │   ├── validate/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/chess960/validate/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/chess960/validate/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/chess960/validate/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/chess960/validate/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/chess/chess960/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/chess/chess960/parent_test.go)
│   │   │   ├── elo/
│   │   │   │   ├── change/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/elo/change/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/elo/change/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/elo/change/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/elo/change/service_test.go)
│   │   │   │   ├── diff/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/elo/diff/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/elo/diff/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/elo/diff/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/elo/diff/service_test.go)
│   │   │   │   ├── expected/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/elo/expected/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/elo/expected/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/elo/expected/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/elo/expected/service_test.go)
│   │   │   │   ├── internal/
│   │   │   │   │   ├── [math.go](./src/cmd/chess/elo/internal/math.go)
│   │   │   │   │   └── [math_test.go](./src/cmd/chess/elo/internal/math_test.go)
│   │   │   │   ├── required/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/elo/required/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/elo/required/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/elo/required/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/elo/required/service_test.go)
│   │   │   │   ├── tournament/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/elo/tournament/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/elo/tournament/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/elo/tournament/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/elo/tournament/service_test.go)
│   │   │   │   ├── tpr/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/elo/tpr/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/elo/tpr/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/elo/tpr/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/elo/tpr/service_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/chess/elo/cmd.go)
│   │   │   │   └── [cmd_test.go](./src/cmd/chess/elo/cmd_test.go)
│   │   │   ├── engine/
│   │   │   │   ├── [game.go](./src/cmd/chess/engine/game.go)
│   │   │   │   └── [game_test.go](./src/cmd/chess/engine/game_test.go)
│   │   │   ├── fen/
│   │   │   │   ├── eval/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/fen/eval/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/fen/eval/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/fen/eval/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/fen/eval/service_test.go)
│   │   │   │   ├── svg/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/fen/svg/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/fen/svg/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/fen/svg/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/fen/svg/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/chess/fen/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/chess/fen/parent_test.go)
│   │   │   ├── lichess.org/
│   │   │   │   ├── crosstable/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/crosstable/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/crosstable/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/crosstable/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/crosstable/service_test.go)
│   │   │   │   ├── game/
│   │   │   │   │   ├── export/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/game/export/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/game/export/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/game/export/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/game/export/service_test.go)
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/game/cmd.go)
│   │   │   │   │   └── [cmd_test.go](./src/cmd/chess/lichess.org/game/cmd_test.go)
│   │   │   │   ├── opening/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/opening/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/opening/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/opening/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/opening/service_test.go)
│   │   │   │   ├── player/
│   │   │   │   │   ├── leaderboard/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/player/leaderboard/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/player/leaderboard/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/player/leaderboard/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/player/leaderboard/service_test.go)
│   │   │   │   │   ├── top10/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/player/top10/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/player/top10/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/player/top10/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/player/top10/service_test.go)
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/player/cmd.go)
│   │   │   │   │   └── [cmd_test.go](./src/cmd/chess/lichess.org/player/cmd_test.go)
│   │   │   │   ├── puzzle/
│   │   │   │   │   ├── by_id/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/puzzle/by_id/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/puzzle/by_id/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/puzzle/by_id/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/puzzle/by_id/service_test.go)
│   │   │   │   │   ├── daily/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/puzzle/daily/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/puzzle/daily/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/puzzle/daily/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/puzzle/daily/service_test.go)
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/puzzle/cmd.go)
│   │   │   │   │   └── [cmd_test.go](./src/cmd/chess/lichess.org/puzzle/cmd_test.go)
│   │   │   │   ├── streamer/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/streamer/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/streamer/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/streamer/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/streamer/service_test.go)
│   │   │   │   ├── study/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/study/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/study/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/study/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/study/service_test.go)
│   │   │   │   ├── tablebase/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/tablebase/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/tablebase/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/tablebase/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/tablebase/service_test.go)
│   │   │   │   ├── team/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/team/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/team/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/team/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/team/service_test.go)
│   │   │   │   ├── tournament/
│   │   │   │   │   ├── info/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/tournament/info/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/tournament/info/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/tournament/info/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/tournament/info/service_test.go)
│   │   │   │   │   ├── results/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/tournament/results/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/tournament/results/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/tournament/results/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/tournament/results/service_test.go)
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/tournament/cmd.go)
│   │   │   │   │   └── [cmd_test.go](./src/cmd/chess/lichess.org/tournament/cmd_test.go)
│   │   │   │   ├── tv/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/tv/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/tv/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/tv/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/tv/service_test.go)
│   │   │   │   ├── user/
│   │   │   │   │   ├── activity/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/user/activity/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/user/activity/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/user/activity/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/user/activity/service_test.go)
│   │   │   │   │   ├── perf/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/user/perf/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/user/perf/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/user/perf/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/user/perf/service_test.go)
│   │   │   │   │   ├── profile/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/user/profile/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/user/profile/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/user/profile/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/user/profile/service_test.go)
│   │   │   │   │   ├── rating/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/user/rating/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/user/rating/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/user/rating/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/user/rating/service_test.go)
│   │   │   │   │   ├── status/
│   │   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/user/status/cmd.go)
│   │   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/lichess.org/user/status/cmd_test.go)
│   │   │   │   │   │   ├── [service.go](./src/cmd/chess/lichess.org/user/status/service.go)
│   │   │   │   │   │   └── [service_test.go](./src/cmd/chess/lichess.org/user/status/service_test.go)
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/lichess.org/user/cmd.go)
│   │   │   │   │   └── [cmd_test.go](./src/cmd/chess/lichess.org/user/cmd_test.go)
│   │   │   │   ├── [client.go](./src/cmd/chess/lichess.org/client.go)
│   │   │   │   ├── [client_test.go](./src/cmd/chess/lichess.org/client_test.go)
│   │   │   │   ├── [cloud_eval.go](./src/cmd/chess/lichess.org/cloud_eval.go)
│   │   │   │   ├── [cloud_eval_test.go](./src/cmd/chess/lichess.org/cloud_eval_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/chess/lichess.org/parent.go)
│   │   │   │   ├── [parent_test.go](./src/cmd/chess/lichess.org/parent_test.go)
│   │   │   │   ├── [types.go](./src/cmd/chess/lichess.org/types.go)
│   │   │   │   └── [types_test.go](./src/cmd/chess/lichess.org/types_test.go)
│   │   │   ├── openings/
│   │   │   │   ├── [openings.go](./src/cmd/chess/openings/openings.go)
│   │   │   │   └── [openings_test.go](./src/cmd/chess/openings/openings_test.go)
│   │   │   ├── pgn/
│   │   │   │   ├── fen/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/pgn/fen/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/pgn/fen/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/pgn/fen/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/pgn/fen/service_test.go)
│   │   │   │   ├── uci/
│   │   │   │   │   ├── [cmd.go](./src/cmd/chess/pgn/uci/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/chess/pgn/uci/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/chess/pgn/uci/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/chess/pgn/uci/service_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/chess/pgn/cmd.go)
│   │   │   │   └── [cmd_test.go](./src/cmd/chess/pgn/cmd_test.go)
│   │   │   ├── play/
│   │   │   │   ├── [cmd.go](./src/cmd/chess/play/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/chess/play/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/chess/play/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/chess/play/service_test.go)
│   │   │   ├── setup/
│   │   │   │   ├── [cmd.go](./src/cmd/chess/setup/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/chess/setup/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/chess/setup/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/chess/setup/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/chess/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/chess/cmd_test.go)
│   │   ├── colors/
│   │   │   ├── hcl/
│   │   │   │   ├── [cmd.go](./src/cmd/colors/hcl/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/colors/hcl/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/colors/hcl/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/colors/hcl/service_test.go)
│   │   │   ├── hex/
│   │   │   │   ├── [cmd.go](./src/cmd/colors/hex/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/colors/hex/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/colors/hex/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/colors/hex/service_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [cmyk.go](./src/cmd/colors/internal/cmyk.go)
│   │   │   │   ├── [cmyk_test.go](./src/cmd/colors/internal/cmyk_test.go)
│   │   │   │   ├── [hcl.go](./src/cmd/colors/internal/hcl.go)
│   │   │   │   ├── [hcl_test.go](./src/cmd/colors/internal/hcl_test.go)
│   │   │   │   ├── [hex.go](./src/cmd/colors/internal/hex.go)
│   │   │   │   ├── [hex_test.go](./src/cmd/colors/internal/hex_test.go)
│   │   │   │   ├── [hsl.go](./src/cmd/colors/internal/hsl.go)
│   │   │   │   ├── [hsl_test.go](./src/cmd/colors/internal/hsl_test.go)
│   │   │   │   ├── [oklch.go](./src/cmd/colors/internal/oklch.go)
│   │   │   │   ├── [oklch_test.go](./src/cmd/colors/internal/oklch_test.go)
│   │   │   │   ├── [rgb.go](./src/cmd/colors/internal/rgb.go)
│   │   │   │   └── [rgb_test.go](./src/cmd/colors/internal/rgb_test.go)
│   │   │   ├── oklch/
│   │   │   │   ├── [cmd.go](./src/cmd/colors/oklch/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/colors/oklch/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/colors/oklch/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/colors/oklch/service_test.go)
│   │   │   ├── palette/
│   │   │   │   ├── [cmd.go](./src/cmd/colors/palette/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/colors/palette/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/colors/palette/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/colors/palette/service_test.go)
│   │   │   ├── random/
│   │   │   │   ├── [cmd.go](./src/cmd/colors/random/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/colors/random/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/colors/random/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/colors/random/service_test.go)
│   │   │   ├── rgb/
│   │   │   │   ├── [cmd.go](./src/cmd/colors/rgb/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/colors/rgb/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/colors/rgb/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/colors/rgb/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/colors/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/colors/cmd_test.go)
│   │   ├── completion/
│   │   │   ├── [cmd.go](./src/cmd/completion/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/completion/cmd_test.go)
│   │   ├── convert/
│   │   │   ├── base64/
│   │   │   │   ├── decode/
│   │   │   │   │   ├── [cmd.go](./src/cmd/convert/base64/decode/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/convert/base64/decode/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/convert/base64/decode/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/convert/base64/decode/service_test.go)
│   │   │   │   ├── encode/
│   │   │   │   │   ├── [cmd.go](./src/cmd/convert/base64/encode/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/convert/base64/encode/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/convert/base64/encode/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/convert/base64/encode/service_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/convert/base64/cmd.go)
│   │   │   │   └── [cmd_test.go](./src/cmd/convert/base64/cmd_test.go)
│   │   │   ├── braille/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/braille/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/braille/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/braille/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/braille/service_test.go)
│   │   │   ├── camelcase/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/camelcase/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/camelcase/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/camelcase/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/camelcase/service_test.go)
│   │   │   ├── capitalise/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/capitalise/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/capitalise/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/capitalise/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/capitalise/service_test.go)
│   │   │   ├── count/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/count/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/count/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/count/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/count/service_test.go)
│   │   │   ├── deburr/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/deburr/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/deburr/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/deburr/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/deburr/service_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [service.go](./src/cmd/convert/internal/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/internal/service_test.go)
│   │   │   ├── kebabcase/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/kebabcase/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/kebabcase/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/kebabcase/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/kebabcase/service_test.go)
│   │   │   ├── lowercase/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/lowercase/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/lowercase/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/lowercase/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/lowercase/service_test.go)
│   │   │   ├── morse/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/morse/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/morse/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/morse/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/morse/service_test.go)
│   │   │   ├── pascalcase/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/pascalcase/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/pascalcase/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/pascalcase/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/pascalcase/service_test.go)
│   │   │   ├── slug/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/slug/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/slug/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/slug/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/slug/service_test.go)
│   │   │   ├── snakecase/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/snakecase/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/snakecase/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/snakecase/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/snakecase/service_test.go)
│   │   │   ├── uppercase/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/uppercase/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/uppercase/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/uppercase/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/uppercase/service_test.go)
│   │   │   ├── url/
│   │   │   │   ├── [cmd.go](./src/cmd/convert/url/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/convert/url/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/convert/url/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/convert/url/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/convert/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/convert/cmd_test.go)
│   │   ├── crypto/
│   │   │   ├── decrypt/
│   │   │   │   ├── [cmd.go](./src/cmd/crypto/decrypt/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/crypto/decrypt/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/crypto/decrypt/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/crypto/decrypt/service_test.go)
│   │   │   ├── encrypt/
│   │   │   │   ├── [cmd.go](./src/cmd/crypto/encrypt/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/crypto/encrypt/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/crypto/encrypt/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/crypto/encrypt/service_test.go)
│   │   │   ├── hash/
│   │   │   │   ├── [cmd.go](./src/cmd/crypto/hash/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/crypto/hash/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/crypto/hash/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/crypto/hash/service_test.go)
│   │   │   ├── jwt/
│   │   │   │   ├── decode/
│   │   │   │   │   ├── [cmd.go](./src/cmd/crypto/jwt/decode/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/crypto/jwt/decode/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/crypto/jwt/decode/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/crypto/jwt/decode/service_test.go)
│   │   │   │   ├── encode/
│   │   │   │   │   ├── [cmd.go](./src/cmd/crypto/jwt/encode/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/crypto/jwt/encode/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/crypto/jwt/encode/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/crypto/jwt/encode/service_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/crypto/jwt/cmd.go)
│   │   │   │   └── [cmd_test.go](./src/cmd/crypto/jwt/cmd_test.go)
│   │   │   ├── keygen/
│   │   │   │   ├── [cmd.go](./src/cmd/crypto/keygen/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/crypto/keygen/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/crypto/keygen/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/crypto/keygen/service_test.go)
│   │   │   ├── passwd/
│   │   │   │   ├── [cmd.go](./src/cmd/crypto/passwd/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/crypto/passwd/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/crypto/passwd/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/crypto/passwd/service_test.go)
│   │   │   ├── qrcode/
│   │   │   │   ├── [cmd.go](./src/cmd/crypto/qrcode/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/crypto/qrcode/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/crypto/qrcode/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/crypto/qrcode/service_test.go)
│   │   │   ├── totp/
│   │   │   │   ├── [cmd.go](./src/cmd/crypto/totp/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/crypto/totp/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/crypto/totp/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/crypto/totp/service_test.go)
│   │   │   ├── uuid/
│   │   │   │   ├── [cmd.go](./src/cmd/crypto/uuid/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/crypto/uuid/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/crypto/uuid/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/crypto/uuid/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/crypto/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/crypto/cmd_test.go)
│   │   ├── data/
│   │   │   ├── csv/
│   │   │   │   ├── [cmd.go](./src/cmd/data/csv/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/data/csv/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/data/csv/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/data/csv/service_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [csv_service.go](./src/cmd/data/internal/csv_service.go)
│   │   │   │   ├── [csv_service_test.go](./src/cmd/data/internal/csv_service_test.go)
│   │   │   │   ├── [json_service.go](./src/cmd/data/internal/json_service.go)
│   │   │   │   ├── [json_service_test.go](./src/cmd/data/internal/json_service_test.go)
│   │   │   │   ├── [reader.go](./src/cmd/data/internal/reader.go)
│   │   │   │   ├── [reader_test.go](./src/cmd/data/internal/reader_test.go)
│   │   │   │   ├── [yml_service.go](./src/cmd/data/internal/yml_service.go)
│   │   │   │   └── [yml_service_test.go](./src/cmd/data/internal/yml_service_test.go)
│   │   │   ├── json/
│   │   │   │   ├── [cmd.go](./src/cmd/data/json/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/data/json/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/data/json/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/data/json/service_test.go)
│   │   │   ├── yml/
│   │   │   │   ├── [cmd.go](./src/cmd/data/yml/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/data/yml/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/data/yml/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/data/yml/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/data/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/data/cmd_test.go)
│   │   ├── docsify/
│   │   │   ├── cobra/
│   │   │   │   ├── [cmd.go](./src/cmd/docsify/cobra/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/docsify/cobra/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/docsify/cobra/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/docsify/cobra/service_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [extractor.go](./src/cmd/docsify/internal/extractor.go)
│   │   │   │   ├── [extractor_test.go](./src/cmd/docsify/internal/extractor_test.go)
│   │   │   │   ├── [graph.go](./src/cmd/docsify/internal/graph.go)
│   │   │   │   ├── [graph_test.go](./src/cmd/docsify/internal/graph_test.go)
│   │   │   │   ├── [walker.go](./src/cmd/docsify/internal/walker.go)
│   │   │   │   ├── [walker_test.go](./src/cmd/docsify/internal/walker_test.go)
│   │   │   │   ├── [writer.go](./src/cmd/docsify/internal/writer.go)
│   │   │   │   └── [writer_test.go](./src/cmd/docsify/internal/writer_test.go)
│   │   │   ├── obsidian/
│   │   │   │   ├── [cmd.go](./src/cmd/docsify/obsidian/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/docsify/obsidian/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/docsify/obsidian/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/docsify/obsidian/service_test.go)
│   │   │   ├── scan/
│   │   │   │   ├── [cmd.go](./src/cmd/docsify/scan/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/docsify/scan/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/docsify/scan/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/docsify/scan/service_test.go)
│   │   │   ├── tree/
│   │   │   │   ├── [cmd.go](./src/cmd/docsify/tree/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/docsify/tree/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/docsify/tree/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/docsify/tree/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/docsify/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/docsify/cmd_test.go)
│   │   ├── doi/
│   │   │   ├── cite/
│   │   │   │   ├── [cmd.go](./src/cmd/doi/cite/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/doi/cite/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/doi/cite/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/doi/cite/service_test.go)
│   │   │   ├── fetch/
│   │   │   │   ├── [cmd.go](./src/cmd/doi/fetch/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/doi/fetch/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/doi/fetch/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/doi/fetch/service_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [apa_formatter.go](./src/cmd/doi/internal/apa_formatter.go)
│   │   │   │   ├── [apa_formatter_test.go](./src/cmd/doi/internal/apa_formatter_test.go)
│   │   │   │   ├── [crossref_service.go](./src/cmd/doi/internal/crossref_service.go)
│   │   │   │   ├── [crossref_service_test.go](./src/cmd/doi/internal/crossref_service_test.go)
│   │   │   │   ├── [resolver_service.go](./src/cmd/doi/internal/resolver_service.go)
│   │   │   │   ├── [resolver_service_test.go](./src/cmd/doi/internal/resolver_service_test.go)
│   │   │   │   ├── [types.go](./src/cmd/doi/internal/types.go)
│   │   │   │   ├── [types_test.go](./src/cmd/doi/internal/types_test.go)
│   │   │   │   ├── [validator_service.go](./src/cmd/doi/internal/validator_service.go)
│   │   │   │   └── [validator_service_test.go](./src/cmd/doi/internal/validator_service_test.go)
│   │   │   ├── ref/
│   │   │   │   ├── [cmd.go](./src/cmd/doi/ref/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/doi/ref/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/doi/ref/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/doi/ref/service_test.go)
│   │   │   ├── validate/
│   │   │   │   ├── [cmd.go](./src/cmd/doi/validate/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/doi/validate/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/doi/validate/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/doi/validate/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/doi/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/doi/cmd_test.go)
│   │   ├── english/
│   │   │   ├── define/
│   │   │   │   ├── [cmd.go](./src/cmd/english/define/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/english/define/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/english/define/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/english/define/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/english/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/english/cmd_test.go)
│   │   ├── file/
│   │   │   ├── checksum/
│   │   │   │   ├── [cmd.go](./src/cmd/file/checksum/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/checksum/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/checksum/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/checksum/service_test.go)
│   │   │   ├── chmod/
│   │   │   │   ├── [cmd.go](./src/cmd/file/chmod/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/chmod/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/chmod/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/chmod/service_test.go)
│   │   │   ├── count/
│   │   │   │   ├── [cmd.go](./src/cmd/file/count/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/count/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/count/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/count/service_test.go)
│   │   │   ├── duplicates/
│   │   │   │   ├── [cmd.go](./src/cmd/file/duplicates/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/duplicates/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/duplicates/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/duplicates/service_test.go)
│   │   │   ├── edit/
│   │   │   │   ├── [cmd.go](./src/cmd/file/edit/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/edit/cmd_test.go)
│   │   │   │   ├── [diff_service.go](./src/cmd/file/edit/diff_service.go)
│   │   │   │   ├── [diff_service_test.go](./src/cmd/file/edit/diff_service_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/edit/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/edit/service_test.go)
│   │   │   ├── grep/
│   │   │   │   ├── [cmd.go](./src/cmd/file/grep/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/grep/cmd_test.go)
│   │   │   │   ├── [search_service.go](./src/cmd/file/grep/search_service.go)
│   │   │   │   ├── [search_service_test.go](./src/cmd/file/grep/search_service_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/grep/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/grep/service_test.go)
│   │   │   ├── head/
│   │   │   │   ├── [cmd.go](./src/cmd/file/head/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/head/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/head/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/head/service_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [service.go](./src/cmd/file/internal/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/internal/service_test.go)
│   │   │   ├── read/
│   │   │   │   ├── [cmd.go](./src/cmd/file/read/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/read/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/read/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/read/service_test.go)
│   │   │   ├── size/
│   │   │   │   ├── [cmd.go](./src/cmd/file/size/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/size/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/size/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/size/service_test.go)
│   │   │   ├── stats/
│   │   │   │   ├── [cmd.go](./src/cmd/file/stats/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/stats/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/stats/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/stats/service_test.go)
│   │   │   ├── tail/
│   │   │   │   ├── [cmd.go](./src/cmd/file/tail/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/tail/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/tail/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/tail/service_test.go)
│   │   │   ├── type/
│   │   │   │   ├── [cmd.go](./src/cmd/file/type/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/type/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/type/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/type/service_test.go)
│   │   │   ├── write/
│   │   │   │   ├── [cmd.go](./src/cmd/file/write/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/file/write/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/file/write/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/file/write/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/file/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/file/cmd_test.go)
│   │   ├── games/
│   │   │   ├── anagram/
│   │   │   │   ├── [cmd.go](./src/cmd/games/anagram/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/games/anagram/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/games/anagram/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/games/anagram/service_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [words.go](./src/cmd/games/internal/words.go)
│   │   │   │   └── [words_test.go](./src/cmd/games/internal/words_test.go)
│   │   │   ├── reaction/
│   │   │   │   ├── [cmd.go](./src/cmd/games/reaction/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/games/reaction/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/games/reaction/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/games/reaction/service_test.go)
│   │   │   ├── recall/
│   │   │   │   ├── [cmd.go](./src/cmd/games/recall/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/games/recall/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/games/recall/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/games/recall/service_test.go)
│   │   │   ├── typerace/
│   │   │   │   ├── [cmd.go](./src/cmd/games/typerace/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/games/typerace/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/games/typerace/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/games/typerace/service_test.go)
│   │   │   ├── wordle/
│   │   │   │   ├── [cmd.go](./src/cmd/games/wordle/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/games/wordle/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/games/wordle/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/games/wordle/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/games/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/games/cmd_test.go)
│   │   ├── gemini/
│   │   │   ├── code/
│   │   │   │   ├── [cmd.go](./src/cmd/gemini/code/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/gemini/code/cmd_test.go)
│   │   │   │   ├── [code_tui.go](./src/cmd/gemini/code/code_tui.go)
│   │   │   │   ├── [code_tui_test.go](./src/cmd/gemini/code/code_tui_test.go)
│   │   │   │   ├── [service.go](./src/cmd/gemini/code/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/gemini/code/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/gemini/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/gemini/cmd_test.go)
│   │   ├── gh/
│   │   │   ├── coc/
│   │   │   │   ├── [cmd.go](./src/cmd/gh/coc/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/gh/coc/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/gh/coc/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/gh/coc/service_test.go)
│   │   │   ├── ignore/
│   │   │   │   ├── [cmd.go](./src/cmd/gh/ignore/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/gh/ignore/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/gh/ignore/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/gh/ignore/service_test.go)
│   │   │   ├── languages/
│   │   │   │   ├── [cmd.go](./src/cmd/gh/languages/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/gh/languages/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/gh/languages/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/gh/languages/service_test.go)
│   │   │   ├── license/
│   │   │   │   ├── [cmd.go](./src/cmd/gh/license/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/gh/license/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/gh/license/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/gh/license/service_test.go)
│   │   │   ├── og/
│   │   │   │   ├── [cmd.go](./src/cmd/gh/og/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/gh/og/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/gh/og/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/gh/og/service_test.go)
│   │   │   ├── shared/
│   │   │   │   ├── [colors.go](./src/cmd/gh/shared/colors.go)
│   │   │   │   ├── [colors_test.go](./src/cmd/gh/shared/colors_test.go)
│   │   │   │   ├── [config.go](./src/cmd/gh/shared/config.go)
│   │   │   │   ├── [config_test.go](./src/cmd/gh/shared/config_test.go)
│   │   │   │   ├── [fetch.go](./src/cmd/gh/shared/fetch.go)
│   │   │   │   ├── [fetch_test.go](./src/cmd/gh/shared/fetch_test.go)
│   │   │   │   ├── [mock.go](./src/cmd/gh/shared/mock.go)
│   │   │   │   └── [shared_test.go](./src/cmd/gh/shared/shared_test.go)
│   │   │   ├── [cmd.go](./src/cmd/gh/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/gh/cmd_test.go)
│   │   ├── history/
│   │   │   ├── clear/
│   │   │   │   ├── [cmd.go](./src/cmd/history/clear/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/history/clear/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/history/clear/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/history/clear/service_test.go)
│   │   │   ├── list/
│   │   │   │   ├── [cmd.go](./src/cmd/history/list/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/history/list/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/history/list/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/history/list/service_test.go)
│   │   │   ├── search/
│   │   │   │   ├── [cmd.go](./src/cmd/history/search/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/history/search/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/history/search/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/history/search/service_test.go)
│   │   │   ├── stats/
│   │   │   │   ├── [cmd.go](./src/cmd/history/stats/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/history/stats/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/history/stats/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/history/stats/service_test.go)
│   │   │   ├── testutil/
│   │   │   │   └── [testutil.go](./src/cmd/history/testutil/testutil.go)
│   │   │   ├── [cmd.go](./src/cmd/history/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/history/cmd_test.go)
│   │   ├── image/
│   │   │   ├── convert/
│   │   │   │   ├── [cmd.go](./src/cmd/image/convert/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/image/convert/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/image/convert/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/image/convert/service_test.go)
│   │   │   ├── dominant/
│   │   │   │   ├── [cmd.go](./src/cmd/image/dominant/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/image/dominant/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/image/dominant/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/image/dominant/service_test.go)
│   │   │   ├── icons/
│   │   │   │   ├── [cmd.go](./src/cmd/image/icons/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/image/icons/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/image/icons/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/image/icons/service_test.go)
│   │   │   ├── info/
│   │   │   │   ├── [cmd.go](./src/cmd/image/info/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/image/info/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/image/info/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/image/info/service_test.go)
│   │   │   ├── testutil/
│   │   │   │   └── [testutil.go](./src/cmd/image/testutil/testutil.go)
│   │   │   ├── [cmd.go](./src/cmd/image/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/image/cmd_test.go)
│   │   ├── mcp/
│   │   │   ├── serve/
│   │   │   │   ├── [cmd.go](./src/cmd/mcp/serve/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/mcp/serve/cmd_test.go)
│   │   │   │   ├── [discover_service.go](./src/cmd/mcp/serve/discover_service.go)
│   │   │   │   ├── [discover_service_test.go](./src/cmd/mcp/serve/discover_service_test.go)
│   │   │   │   ├── [exec_service.go](./src/cmd/mcp/serve/exec_service.go)
│   │   │   │   ├── [exec_service_test.go](./src/cmd/mcp/serve/exec_service_test.go)
│   │   │   │   ├── [schema_service.go](./src/cmd/mcp/serve/schema_service.go)
│   │   │   │   ├── [schema_service_test.go](./src/cmd/mcp/serve/schema_service_test.go)
│   │   │   │   ├── [service.go](./src/cmd/mcp/serve/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/mcp/serve/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/mcp/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/mcp/cmd_test.go)
│   │   ├── net/
│   │   │   ├── cert/
│   │   │   │   ├── check/
│   │   │   │   │   ├── [cmd.go](./src/cmd/net/cert/check/cmd.go)
│   │   │   │   │   └── [cmd_test.go](./src/cmd/net/cert/check/cmd_test.go)
│   │   │   │   ├── info/
│   │   │   │   │   ├── [cmd.go](./src/cmd/net/cert/info/cmd.go)
│   │   │   │   │   └── [cmd_test.go](./src/cmd/net/cert/info/cmd_test.go)
│   │   │   │   ├── internal/
│   │   │   │   │   ├── [shared.go](./src/cmd/net/cert/internal/shared.go)
│   │   │   │   │   └── [shared_test.go](./src/cmd/net/cert/internal/shared_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/net/cert/cmd.go)
│   │   │   │   └── [cmd_test.go](./src/cmd/net/cert/cmd_test.go)
│   │   │   ├── http/
│   │   │   │   ├── [cmd.go](./src/cmd/net/http/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/net/http/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/net/http/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/net/http/service_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [internal.go](./src/cmd/net/internal/internal.go)
│   │   │   │   └── [internal_test.go](./src/cmd/net/internal/internal_test.go)
│   │   │   ├── ip/
│   │   │   │   ├── dns/
│   │   │   │   │   ├── [cmd.go](./src/cmd/net/ip/dns/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/net/ip/dns/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/net/ip/dns/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/net/ip/dns/service_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/net/ip/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/net/ip/cmd_test.go)
│   │   │   │   ├── [fetch_test.go](./src/cmd/net/ip/fetch_test.go)
│   │   │   │   ├── [providers.go](./src/cmd/net/ip/providers.go)
│   │   │   │   ├── [providers_test.go](./src/cmd/net/ip/providers_test.go)
│   │   │   │   ├── [service.go](./src/cmd/net/ip/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/net/ip/service_test.go)
│   │   │   ├── ping/
│   │   │   │   ├── [cmd.go](./src/cmd/net/ping/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/net/ping/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/net/ping/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/net/ping/service_test.go)
│   │   │   ├── serve/
│   │   │   │   ├── [cmd.go](./src/cmd/net/serve/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/net/serve/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/net/serve/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/net/serve/service_test.go)
│   │   │   ├── status/
│   │   │   │   ├── [cmd.go](./src/cmd/net/status/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/net/status/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/net/status/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/net/status/service_test.go)
│   │   │   ├── whois/
│   │   │   │   ├── [cmd.go](./src/cmd/net/whois/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/net/whois/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/net/whois/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/net/whois/service_test.go)
│   │   │   ├── wifi/
│   │   │   │   ├── [cmd.go](./src/cmd/net/wifi/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/net/wifi/cmd_test.go)
│   │   │   │   ├── [cmd_windows.go](./src/cmd/net/wifi/cmd_windows.go)
│   │   │   │   ├── [service.go](./src/cmd/net/wifi/service.go)
│   │   │   │   ├── [service_darwin.go](./src/cmd/net/wifi/service_darwin.go)
│   │   │   │   ├── [service_linux.go](./src/cmd/net/wifi/service_linux.go)
│   │   │   │   └── [service_test.go](./src/cmd/net/wifi/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/net/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/net/cmd_test.go)
│   │   ├── openapi/
│   │   │   ├── internal/
│   │   │   │   ├── [service.go](./src/cmd/openapi/internal/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/openapi/internal/service_test.go)
│   │   │   ├── postman/
│   │   │   │   ├── [cmd.go](./src/cmd/openapi/postman/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/openapi/postman/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/openapi/postman/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/openapi/postman/service_test.go)
│   │   │   ├── validate/
│   │   │   │   ├── [cmd.go](./src/cmd/openapi/validate/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/openapi/validate/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/openapi/validate/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/openapi/validate/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/openapi/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/openapi/cmd_test.go)
│   │   ├── openrouter/
│   │   │   ├── code/
│   │   │   │   ├── [cmd.go](./src/cmd/openrouter/code/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/openrouter/code/cmd_test.go)
│   │   │   │   ├── [code_tui.go](./src/cmd/openrouter/code/code_tui.go)
│   │   │   │   ├── [code_tui_test.go](./src/cmd/openrouter/code/code_tui_test.go)
│   │   │   │   ├── [service.go](./src/cmd/openrouter/code/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/openrouter/code/service_test.go)
│   │   │   ├── config/
│   │   │   │   ├── [config.go](./src/cmd/openrouter/config/config.go)
│   │   │   │   └── [config_test.go](./src/cmd/openrouter/config/config_test.go)
│   │   │   ├── hook/
│   │   │   │   ├── [cmd.go](./src/cmd/openrouter/hook/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/openrouter/hook/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/openrouter/hook/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/openrouter/hook/service_test.go)
│   │   │   ├── models/
│   │   │   │   ├── [cmd.go](./src/cmd/openrouter/models/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/openrouter/models/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/openrouter/models/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/openrouter/models/service_test.go)
│   │   │   ├── openrouterlib/
│   │   │   │   ├── [generate.go](./src/cmd/openrouter/openrouterlib/generate.go)
│   │   │   │   ├── [generate_test.go](./src/cmd/openrouter/openrouterlib/generate_test.go)
│   │   │   │   ├── [models.go](./src/cmd/openrouter/openrouterlib/models.go)
│   │   │   │   ├── [models_test.go](./src/cmd/openrouter/openrouterlib/models_test.go)
│   │   │   │   ├── [probe.go](./src/cmd/openrouter/openrouterlib/probe.go)
│   │   │   │   └── [probe_test.go](./src/cmd/openrouter/openrouterlib/probe_test.go)
│   │   │   ├── serve/
│   │   │   │   ├── [cmd.go](./src/cmd/openrouter/serve/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/openrouter/serve/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/openrouter/serve/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/openrouter/serve/service_test.go)
│   │   │   ├── status/
│   │   │   │   ├── [cmd.go](./src/cmd/openrouter/status/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/openrouter/status/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/openrouter/status/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/openrouter/status/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/openrouter/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/openrouter/cmd_test.go)
│   │   ├── port/
│   │   │   ├── check/
│   │   │   │   ├── [cmd.go](./src/cmd/port/check/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/port/check/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/port/check/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/port/check/service_test.go)
│   │   │   ├── find/
│   │   │   │   ├── [cmd.go](./src/cmd/port/find/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/port/find/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/port/find/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/port/find/service_test.go)
│   │   │   ├── portutil/
│   │   │   │   ├── [portutil.go](./src/cmd/port/portutil/portutil.go)
│   │   │   │   └── [portutil_test.go](./src/cmd/port/portutil/portutil_test.go)
│   │   │   ├── scan/
│   │   │   │   ├── [cmd.go](./src/cmd/port/scan/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/port/scan/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/port/scan/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/port/scan/service_test.go)
│   │   │   ├── testutil/
│   │   │   │   └── [testutil.go](./src/cmd/port/testutil/testutil.go)
│   │   │   ├── [cmd.go](./src/cmd/port/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/port/cmd_test.go)
│   │   ├── search/
│   │   │   ├── code/
│   │   │   │   ├── [cmd.go](./src/cmd/search/code/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/search/code/cmd_test.go)
│   │   │   │   ├── [patterns.go](./src/cmd/search/code/patterns.go)
│   │   │   │   ├── [patterns_test.go](./src/cmd/search/code/patterns_test.go)
│   │   │   │   ├── [service.go](./src/cmd/search/code/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/search/code/service_test.go)
│   │   │   ├── files/
│   │   │   │   ├── [cmd.go](./src/cmd/search/files/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/search/files/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/search/files/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/search/files/service_test.go)
│   │   │   ├── shared/
│   │   │   │   ├── [capture.go](./src/cmd/search/shared/capture.go)
│   │   │   │   ├── [walk.go](./src/cmd/search/shared/walk.go)
│   │   │   │   └── [walk_test.go](./src/cmd/search/shared/walk_test.go)
│   │   │   ├── text/
│   │   │   │   ├── [cmd.go](./src/cmd/search/text/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/search/text/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/search/text/service.go)
│   │   │   │   ├── [service_test.go](./src/cmd/search/text/service_test.go)
│   │   │   │   ├── [walk.go](./src/cmd/search/text/walk.go)
│   │   │   │   └── [walk_test.go](./src/cmd/search/text/walk_test.go)
│   │   │   ├── web/
│   │   │   │   ├── [cmd.go](./src/cmd/search/web/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/search/web/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/search/web/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/search/web/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/search/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/search/cmd_test.go)
│   │   ├── semver/
│   │   │   ├── compare/
│   │   │   │   ├── [cmd.go](./src/cmd/semver/compare/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/semver/compare/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/semver/compare/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/semver/compare/service_test.go)
│   │   │   ├── sort/
│   │   │   │   ├── [cmd.go](./src/cmd/semver/sort/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/semver/sort/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/semver/sort/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/semver/sort/service_test.go)
│   │   │   ├── validate/
│   │   │   │   ├── [cmd.go](./src/cmd/semver/validate/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/semver/validate/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/semver/validate/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/semver/validate/service_test.go)
│   │   │   ├── version/
│   │   │   │   ├── [version.go](./src/cmd/semver/version/version.go)
│   │   │   │   └── [version_test.go](./src/cmd/semver/version/version_test.go)
│   │   │   ├── [cmd.go](./src/cmd/semver/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/semver/cmd_test.go)
│   │   ├── system/
│   │   │   ├── battery/
│   │   │   │   ├── [cmd.go](./src/cmd/system/battery/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/system/battery/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/system/battery/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/system/battery/service_test.go)
│   │   │   ├── clipboard/
│   │   │   │   ├── [cmd.go](./src/cmd/system/clipboard/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/system/clipboard/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/system/clipboard/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/system/clipboard/service_test.go)
│   │   │   ├── disk/
│   │   │   │   ├── stats/
│   │   │   │   │   ├── [cmd.go](./src/cmd/system/disk/stats/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/system/disk/stats/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/system/disk/stats/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/system/disk/stats/service_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/system/disk/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/system/disk/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/system/disk/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/system/disk/service_test.go)
│   │   │   ├── env/
│   │   │   │   ├── [cmd.go](./src/cmd/system/env/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/system/env/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/system/env/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/system/env/service_test.go)
│   │   │   ├── info/
│   │   │   │   ├── [cmd.go](./src/cmd/system/info/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/system/info/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/system/info/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/system/info/service_test.go)
│   │   │   ├── monitor/
│   │   │   │   ├── [cmd.go](./src/cmd/system/monitor/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/system/monitor/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/system/monitor/service.go)
│   │   │   │   ├── [service_test.go](./src/cmd/system/monitor/service_test.go)
│   │   │   │   ├── [tui.go](./src/cmd/system/monitor/tui.go)
│   │   │   │   └── [tui_test.go](./src/cmd/system/monitor/tui_test.go)
│   │   │   ├── path/
│   │   │   │   ├── [cmd.go](./src/cmd/system/path/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/system/path/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/system/path/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/system/path/service_test.go)
│   │   │   ├── testutil/
│   │   │   │   └── [testutil.go](./src/cmd/system/testutil/testutil.go)
│   │   │   ├── [cmd.go](./src/cmd/system/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/system/cmd_test.go)
│   │   ├── telegram/
│   │   │   ├── bot/
│   │   │   │   ├── get_me/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/bot/get_me/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/bot/get_me/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/bot/get_me/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/bot/get_me/service_test.go)
│   │   │   │   ├── set_commands/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/bot/set_commands/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/bot/set_commands/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/bot/set_commands/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/bot/set_commands/service_test.go)
│   │   │   │   ├── set_description/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/bot/set_description/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/bot/set_description/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/bot/set_description/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/bot/set_description/service_test.go)
│   │   │   │   ├── set_name/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/bot/set_name/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/bot/set_name/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/bot/set_name/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/bot/set_name/service_test.go)
│   │   │   │   ├── set_short_description/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/bot/set_short_description/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/bot/set_short_description/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/bot/set_short_description/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/bot/set_short_description/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/bot/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/bot/parent_test.go)
│   │   │   ├── callback/
│   │   │   │   ├── answer/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/callback/answer/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/callback/answer/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/callback/answer/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/callback/answer/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/callback/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/callback/parent_test.go)
│   │   │   ├── chat/
│   │   │   │   ├── action/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/action/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/action/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/action/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/action/service_test.go)
│   │   │   │   ├── ban/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/ban/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/ban/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/ban/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/ban/service_test.go)
│   │   │   │   ├── create_invite_link/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/create_invite_link/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/create_invite_link/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/create_invite_link/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/create_invite_link/service_test.go)
│   │   │   │   ├── edit_invite_link/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/edit_invite_link/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/edit_invite_link/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/edit_invite_link/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/edit_invite_link/service_test.go)
│   │   │   │   ├── export_invite_link/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/export_invite_link/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/export_invite_link/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/export_invite_link/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/export_invite_link/service_test.go)
│   │   │   │   ├── get/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/get/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/get/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/get/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/get/service_test.go)
│   │   │   │   ├── leave/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/leave/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/leave/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/leave/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/leave/service_test.go)
│   │   │   │   ├── pin/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/pin/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/pin/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/pin/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/pin/service_test.go)
│   │   │   │   ├── promote/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/promote/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/promote/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/promote/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/promote/service_test.go)
│   │   │   │   ├── restrict/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/restrict/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/restrict/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/restrict/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/restrict/service_test.go)
│   │   │   │   ├── revoke_invite_link/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/revoke_invite_link/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/revoke_invite_link/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/revoke_invite_link/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/revoke_invite_link/service_test.go)
│   │   │   │   ├── unban/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/chat/unban/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/chat/unban/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/chat/unban/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/chat/unban/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/chat/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/chat/parent_test.go)
│   │   │   ├── contact/
│   │   │   │   ├── send/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/contact/send/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/contact/send/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/contact/send/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/contact/send/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/contact/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/contact/parent_test.go)
│   │   │   ├── dice/
│   │   │   │   ├── [cmd.go](./src/cmd/telegram/dice/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/dice/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/telegram/dice/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/telegram/dice/service_test.go)
│   │   │   ├── forum/
│   │   │   │   ├── close/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/forum/close/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/forum/close/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/forum/close/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/forum/close/service_test.go)
│   │   │   │   ├── create/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/forum/create/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/forum/create/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/forum/create/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/forum/create/service_test.go)
│   │   │   │   ├── delete/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/forum/delete/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/forum/delete/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/forum/delete/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/forum/delete/service_test.go)
│   │   │   │   ├── reopen/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/forum/reopen/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/forum/reopen/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/forum/reopen/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/forum/reopen/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/forum/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/forum/parent_test.go)
│   │   │   ├── game/
│   │   │   │   ├── high_scores/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/game/high_scores/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/game/high_scores/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/game/high_scores/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/game/high_scores/service_test.go)
│   │   │   │   ├── send/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/game/send/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/game/send/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/game/send/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/game/send/service_test.go)
│   │   │   │   ├── set_score/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/game/set_score/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/game/set_score/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/game/set_score/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/game/set_score/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/game/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/game/parent_test.go)
│   │   │   ├── gift/
│   │   │   │   ├── send/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/gift/send/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/gift/send/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/gift/send/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/gift/send/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/gift/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/gift/parent_test.go)
│   │   │   ├── inline/
│   │   │   │   ├── answer/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/inline/answer/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/inline/answer/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/inline/answer/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/inline/answer/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/inline/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/inline/parent_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [telegram_api.go](./src/cmd/telegram/internal/telegram_api.go)
│   │   │   │   ├── [telegram_api_test.go](./src/cmd/telegram/internal/telegram_api_test.go)
│   │   │   │   ├── [token.go](./src/cmd/telegram/internal/token.go)
│   │   │   │   └── [token_test.go](./src/cmd/telegram/internal/token_test.go)
│   │   │   ├── invoice/
│   │   │   │   ├── create/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/invoice/create/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/invoice/create/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/invoice/create/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/invoice/create/service_test.go)
│   │   │   │   ├── pre_checkout/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/invoice/pre_checkout/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/invoice/pre_checkout/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/invoice/pre_checkout/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/invoice/pre_checkout/service_test.go)
│   │   │   │   ├── shipping/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/invoice/shipping/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/invoice/shipping/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/invoice/shipping/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/invoice/shipping/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/invoice/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/invoice/parent_test.go)
│   │   │   ├── location/
│   │   │   │   ├── send/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/location/send/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/location/send/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/location/send/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/location/send/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/location/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/location/parent_test.go)
│   │   │   ├── message/
│   │   │   │   ├── animation/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/animation/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/animation/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/animation/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/animation/service_test.go)
│   │   │   │   ├── audio/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/audio/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/audio/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/audio/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/audio/service_test.go)
│   │   │   │   ├── copy/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/copy/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/copy/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/copy/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/copy/service_test.go)
│   │   │   │   ├── delete/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/delete/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/delete/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/delete/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/delete/service_test.go)
│   │   │   │   ├── document/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/document/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/document/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/document/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/document/service_test.go)
│   │   │   │   ├── edit/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/edit/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/edit/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/edit/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/edit/service_test.go)
│   │   │   │   ├── forward/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/forward/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/forward/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/forward/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/forward/service_test.go)
│   │   │   │   ├── media_group/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/media_group/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/media_group/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/media_group/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/media_group/service_test.go)
│   │   │   │   ├── photo/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/photo/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/photo/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/photo/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/photo/service_test.go)
│   │   │   │   ├── send/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/send/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/send/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/send/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/send/service_test.go)
│   │   │   │   ├── video/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/video/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/video/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/video/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/video/service_test.go)
│   │   │   │   ├── video_note/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/video_note/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/video_note/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/video_note/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/video_note/service_test.go)
│   │   │   │   ├── voice/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/message/voice/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/message/voice/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/message/voice/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/message/voice/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/message/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/message/parent_test.go)
│   │   │   ├── poll/
│   │   │   │   ├── send/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/poll/send/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/poll/send/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/poll/send/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/poll/send/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/poll/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/poll/parent_test.go)
│   │   │   ├── sticker/
│   │   │   │   ├── add_to_set/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/sticker/add_to_set/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/sticker/add_to_set/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/sticker/add_to_set/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/sticker/add_to_set/service_test.go)
│   │   │   │   ├── remove_from_set/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/sticker/remove_from_set/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/sticker/remove_from_set/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/sticker/remove_from_set/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/sticker/remove_from_set/service_test.go)
│   │   │   │   ├── replace_in_set/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/sticker/replace_in_set/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/sticker/replace_in_set/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/sticker/replace_in_set/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/sticker/replace_in_set/service_test.go)
│   │   │   │   ├── send/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/sticker/send/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/sticker/send/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/sticker/send/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/sticker/send/service_test.go)
│   │   │   │   ├── set_emoji_list/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/sticker/set_emoji_list/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/sticker/set_emoji_list/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/sticker/set_emoji_list/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/sticker/set_emoji_list/service_test.go)
│   │   │   │   ├── set_keywords/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/sticker/set_keywords/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/sticker/set_keywords/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/sticker/set_keywords/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/sticker/set_keywords/service_test.go)
│   │   │   │   ├── set_position/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/sticker/set_position/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/sticker/set_position/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/sticker/set_position/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/sticker/set_position/service_test.go)
│   │   │   │   ├── set_thumbnail/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/sticker/set_thumbnail/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/sticker/set_thumbnail/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/sticker/set_thumbnail/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/sticker/set_thumbnail/service_test.go)
│   │   │   │   ├── set_title/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/sticker/set_title/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/sticker/set_title/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/sticker/set_title/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/sticker/set_title/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/sticker/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/sticker/parent_test.go)
│   │   │   ├── venue/
│   │   │   │   ├── send/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/venue/send/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/venue/send/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/venue/send/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/venue/send/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/venue/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/venue/parent_test.go)
│   │   │   ├── webhook/
│   │   │   │   ├── delete/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/webhook/delete/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/webhook/delete/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/webhook/delete/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/webhook/delete/service_test.go)
│   │   │   │   ├── info/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/webhook/info/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/webhook/info/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/webhook/info/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/webhook/info/service_test.go)
│   │   │   │   ├── set/
│   │   │   │   │   ├── [cmd.go](./src/cmd/telegram/webhook/set/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/telegram/webhook/set/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/telegram/webhook/set/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/telegram/webhook/set/service_test.go)
│   │   │   │   ├── [parent.go](./src/cmd/telegram/webhook/parent.go)
│   │   │   │   └── [parent_test.go](./src/cmd/telegram/webhook/parent_test.go)
│   │   │   ├── [cmd.go](./src/cmd/telegram/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/telegram/cmd_test.go)
│   │   ├── time/
│   │   │   ├── age/
│   │   │   │   ├── [cmd.go](./src/cmd/time/age/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/time/age/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/time/age/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/time/age/service_test.go)
│   │   │   ├── clock/
│   │   │   │   ├── now/
│   │   │   │   │   ├── [cmd.go](./src/cmd/time/clock/now/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/time/clock/now/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/time/clock/now/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/time/clock/now/service_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/time/clock/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/time/clock/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/time/clock/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/time/clock/service_test.go)
│   │   │   ├── cron/
│   │   │   │   ├── [cmd.go](./src/cmd/time/cron/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/time/cron/cmd_test.go)
│   │   │   │   ├── [describe.go](./src/cmd/time/cron/describe.go)
│   │   │   │   ├── [describe_test.go](./src/cmd/time/cron/describe_test.go)
│   │   │   │   ├── [next.go](./src/cmd/time/cron/next.go)
│   │   │   │   ├── [next_test.go](./src/cmd/time/cron/next_test.go)
│   │   │   │   ├── [service.go](./src/cmd/time/cron/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/time/cron/service_test.go)
│   │   │   ├── epoch/
│   │   │   │   ├── [cmd.go](./src/cmd/time/epoch/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/time/epoch/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/time/epoch/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/time/epoch/service_test.go)
│   │   │   ├── internal/
│   │   │   │   ├── [datetime.go](./src/cmd/time/internal/datetime.go)
│   │   │   │   ├── [datetime_test.go](./src/cmd/time/internal/datetime_test.go)
│   │   │   │   ├── [testutil.go](./src/cmd/time/internal/testutil.go)
│   │   │   │   └── [testutil_test.go](./src/cmd/time/internal/testutil_test.go)
│   │   │   ├── pomodoro/
│   │   │   │   ├── [cmd.go](./src/cmd/time/pomodoro/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/time/pomodoro/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/time/pomodoro/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/time/pomodoro/service_test.go)
│   │   │   ├── stopwatch/
│   │   │   │   ├── [cmd.go](./src/cmd/time/stopwatch/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/time/stopwatch/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/time/stopwatch/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/time/stopwatch/service_test.go)
│   │   │   ├── timer/
│   │   │   │   ├── [cmd.go](./src/cmd/time/timer/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/time/timer/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/time/timer/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/time/timer/service_test.go)
│   │   │   ├── until/
│   │   │   │   ├── [cmd.go](./src/cmd/time/until/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/time/until/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/time/until/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/time/until/service_test.go)
│   │   │   ├── world/
│   │   │   │   ├── [cmd.go](./src/cmd/time/world/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/time/world/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/time/world/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/time/world/service_test.go)
│   │   │   ├── [cmd.go](./src/cmd/time/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/time/cmd_test.go)
│   │   ├── version/
│   │   │   ├── [cmd.go](./src/cmd/version/cmd.go)
│   │   │   ├── [cmd_test.go](./src/cmd/version/cmd_test.go)
│   │   │   ├── [service.go](./src/cmd/version/service.go)
│   │   │   └── [service_test.go](./src/cmd/version/service_test.go)
│   │   ├── web/
│   │   │   ├── shopify/
│   │   │   │   ├── detect/
│   │   │   │   │   ├── [cmd.go](./src/cmd/web/shopify/detect/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/web/shopify/detect/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/web/shopify/detect/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/web/shopify/detect/service_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/web/shopify/cmd.go)
│   │   │   │   └── [cmd_test.go](./src/cmd/web/shopify/cmd_test.go)
│   │   │   ├── simplify/
│   │   │   │   ├── csv/
│   │   │   │   │   ├── [cmd.go](./src/cmd/web/simplify/csv/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/web/simplify/csv/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/web/simplify/csv/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/web/simplify/csv/service_test.go)
│   │   │   │   ├── images/
│   │   │   │   │   ├── [cmd.go](./src/cmd/web/simplify/images/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/web/simplify/images/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/web/simplify/images/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/web/simplify/images/service_test.go)
│   │   │   │   ├── internal/
│   │   │   │   │   ├── [fetch.go](./src/cmd/web/simplify/internal/fetch.go)
│   │   │   │   │   ├── [fetch_test.go](./src/cmd/web/simplify/internal/fetch_test.go)
│   │   │   │   │   ├── [host.go](./src/cmd/web/simplify/internal/host.go)
│   │   │   │   │   └── [host_test.go](./src/cmd/web/simplify/internal/host_test.go)
│   │   │   │   ├── md/
│   │   │   │   │   ├── [cmd.go](./src/cmd/web/simplify/md/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/web/simplify/md/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/web/simplify/md/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/web/simplify/md/service_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/web/simplify/cmd.go)
│   │   │   │   └── [cmd_test.go](./src/cmd/web/simplify/cmd_test.go)
│   │   │   ├── snapshot/
│   │   │   │   ├── [cmd.go](./src/cmd/web/snapshot/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/web/snapshot/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/web/snapshot/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/web/snapshot/service_test.go)
│   │   │   ├── weather/
│   │   │   │   ├── [cmd.go](./src/cmd/web/weather/cmd.go)
│   │   │   │   ├── [cmd_test.go](./src/cmd/web/weather/cmd_test.go)
│   │   │   │   ├── [service.go](./src/cmd/web/weather/service.go)
│   │   │   │   └── [service_test.go](./src/cmd/web/weather/service_test.go)
│   │   │   ├── youtube/
│   │   │   │   ├── fetch/
│   │   │   │   │   ├── [cmd.go](./src/cmd/web/youtube/fetch/cmd.go)
│   │   │   │   │   └── [cmd_test.go](./src/cmd/web/youtube/fetch/cmd_test.go)
│   │   │   │   ├── internal/
│   │   │   │   │   ├── [video.go](./src/cmd/web/youtube/internal/video.go)
│   │   │   │   │   └── [video_test.go](./src/cmd/web/youtube/internal/video_test.go)
│   │   │   │   ├── thumbnails/
│   │   │   │   │   ├── [cmd.go](./src/cmd/web/youtube/thumbnails/cmd.go)
│   │   │   │   │   ├── [cmd_test.go](./src/cmd/web/youtube/thumbnails/cmd_test.go)
│   │   │   │   │   ├── [service.go](./src/cmd/web/youtube/thumbnails/service.go)
│   │   │   │   │   └── [service_test.go](./src/cmd/web/youtube/thumbnails/service_test.go)
│   │   │   │   ├── transcript/
│   │   │   │   │   ├── [client.go](./src/cmd/web/youtube/transcript/client.go)
│   │   │   │   │   ├── [client_test.go](./src/cmd/web/youtube/transcript/client_test.go)
│   │   │   │   │   ├── [parser.go](./src/cmd/web/youtube/transcript/parser.go)
│   │   │   │   │   ├── [parser_test.go](./src/cmd/web/youtube/transcript/parser_test.go)
│   │   │   │   │   ├── [transcript_test.go](./src/cmd/web/youtube/transcript/transcript_test.go)
│   │   │   │   │   ├── [types.go](./src/cmd/web/youtube/transcript/types.go)
│   │   │   │   │   └── [types_test.go](./src/cmd/web/youtube/transcript/types_test.go)
│   │   │   │   ├── [cmd.go](./src/cmd/web/youtube/cmd.go)
│   │   │   │   └── [cmd_test.go](./src/cmd/web/youtube/cmd_test.go)
│   │   │   ├── [cmd.go](./src/cmd/web/cmd.go)
│   │   │   └── [cmd_test.go](./src/cmd/web/cmd_test.go)
│   │   ├── [root.go](./src/cmd/root.go)
│   │   └── [root_test.go](./src/cmd/root_test.go)
│   ├── data/
│   │   └── [countries.go](./src/data/countries.go)
│   └── libs/
│       ├── browser/
│       │   ├── [browser.go](./src/libs/browser/browser.go)
│       │   └── [browser_test.go](./src/libs/browser/browser_test.go)
│       ├── chat/
│       │   ├── [chat.go](./src/libs/chat/chat.go)
│       │   ├── [chat_test.go](./src/libs/chat/chat_test.go)
│       │   └── [handle_test.go](./src/libs/chat/handle_test.go)
│       ├── colors/
│       │   ├── [colors.go](./src/libs/colors/colors.go)
│       │   └── [colors_test.go](./src/libs/colors/colors_test.go)
│       ├── history/
│       │   ├── [history.go](./src/libs/history/history.go)
│       │   └── [history_test.go](./src/libs/history/history_test.go)
│       ├── mcp/
│       │   ├── [protocol.go](./src/libs/mcp/protocol.go)
│       │   ├── [server.go](./src/libs/mcp/server.go)
│       │   └── [server_test.go](./src/libs/mcp/server_test.go)
│       ├── number/
│       │   ├── [number.go](./src/libs/number/number.go)
│       │   └── [number_test.go](./src/libs/number/number_test.go)
│       ├── requests/
│       │   ├── [requests.go](./src/libs/requests/requests.go)
│       │   └── [requests_test.go](./src/libs/requests/requests_test.go)
│       └── theme/
│           ├── [theme.go](./src/libs/theme/theme.go)
│           └── [theme_test.go](./src/libs/theme/theme_test.go)
├── tests/
│   └── [integration_test.go](./tests/integration_test.go)
├── [AGENTS.md](./AGENTS.md)
├── [LICENSE](./LICENSE)
├── [Makefile](./Makefile)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [go.mod](./go.mod)
├── [go.sum](./go.sum)
└── [main.go](./main.go)
```

400 directories, 1472 files
