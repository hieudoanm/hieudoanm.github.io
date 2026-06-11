package casino

import (
	"math/rand"

	"github.com/spf13/cobra"
)

func newBlackjackCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "blackjack",
		Short: "Blackjack games",
	}
	cmd.AddCommand(
		newBlackjackCountCmd(),
		newBlackjackPlayCmd(),
	)
	return cmd
}

func newShuffledDeck() []Card {
	d := make([]Card, 52)
	i := 0
	for r := 2; r <= 14; r++ {
		for s := 0; s < 4; s++ {
			d[i] = Card{Rank: r, Suit: Suit(s)}
			i++
		}
	}
	rand.Shuffle(len(d), func(i, j int) {
		d[i], d[j] = d[j], d[i]
	})
	return d
}

func dealCard(d *[]Card) Card {
	c := (*d)[0]
	*d = (*d)[1:]
	return c
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}
