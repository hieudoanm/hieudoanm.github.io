package casino

import (
	"fmt"

	"github.com/spf13/cobra"
)

var baccaratStrategySims int

func baccaratSimHand(d []Card) (playerVal, bankerVal int) {
	player := []Card{d[0], d[1]}
	banker := []Card{d[2], d[3]}
	d = d[4:]

	pv := baccaratSum(player)
	bv := baccaratSum(banker)

	if pv >= 8 || bv >= 8 {
		return pv, bv
	}

	if baccaratShouldDraw(player) {
		player = append(player, d[0])
		d = d[1:]
		pv = baccaratSum(player)
		pc := player[2]
		pVal := baccaratValue(pc)
		if baccaratDrawForThird(banker, pVal) {
			banker = append(banker, d[0])
			d = d[1:]
			bv = baccaratSum(banker)
		}
	} else {
		if baccaratShouldDraw(banker) {
			banker = append(banker, d[0])
			d = d[1:]
			bv = baccaratSum(banker)
		}
	}

	return baccaratSum(player), baccaratSum(banker)
}

func newBaccaratStrategyCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "strategy",
		Short: "Baccarat strategy analysis and statistics",
		Long:  `Analyze baccarat odds and optimal betting strategy through simulation.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			sims := baccaratStrategySims
			pWins := 0
			bWins := 0
			ties := 0

			for range sims {
				deck := newShuffledDeck()
				pv, bv := baccaratSimHand(deck)
				switch {
				case pv > bv:
					pWins++
				case bv > pv:
					bWins++
				default:
					ties++
				}
			}

			total := float64(sims)
			pPct := float64(pWins) / total * 100
			bPct := float64(bWins) / total * 100
			tPct := float64(ties) / total * 100

			fmt.Println("  Baccarat Strategy Analysis")
			fmt.Println("  " + repeat("-", 38))

			out := func(label string, pct float64, payout string, edge float64) {
				fmt.Printf("  %-10s %6.2f%%   %-6s   %+.2f%%\n", label, pct, payout, edge)
			}
			out("Player", pPct, "1:1", 2*pPct+tPct-100)
			out("Banker", bPct, "0.95:1", 1.95*bPct+tPct-100)
			out("Tie", tPct, "8:1", 9*tPct-100)

			fmt.Println("  " + repeat("-", 38))
			fmt.Printf("  Simulations: %d\n", sims)
			fmt.Println()
			fmt.Println("  Optimal strategy: bet Banker (lowest house edge)")
			fmt.Println("  Avoid Tie bet (high house edge ~14%)")
			fmt.Println("  Banker bets pay 1:1 minus 5% commission")

			return nil
		},
	}

	cmd.Flags().IntVarP(&baccaratStrategySims, "simulations", "n", 100000, "Number of simulations")
	return cmd
}

func repeat(s string, n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = s[0]
	}
	return string(b)
}
