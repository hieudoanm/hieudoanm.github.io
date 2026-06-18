package casino

import (
	"fmt"
	"math/rand"
	"sort"
	"strings"
)

type OddsResult struct {
	Win  float64
	Tie  float64
	Lose float64
}

func newPokerDeck() []Card {
	deck := make([]Card, 0, 52)
	for rank := 2; rank <= 14; rank++ {
		for suit := 0; suit < 4; suit++ {
			deck = append(deck, Card{Rank: rank, Suit: Suit(suit)})
		}
	}
	return deck
}

func removeCards(deck []Card, remove map[Card]bool) []Card {
	var out []Card
	for _, c := range deck {
		if !remove[c] {
			out = append(out, c)
		}
	}
	return out
}

func toCardMap(cards []Card) map[Card]bool {
	m := map[Card]bool{}
	for _, c := range cards {
		m[c] = true
	}
	return m
}

func CalculateOdds(hole []Card, board []Card, numOpponents, simulations int) OddsResult {
	deck := removeCards(newPokerDeck(), toCardMap(append(hole, board...)))

	wins := 0
	ties := 0

	for range simulations {
		rand.Shuffle(len(deck), func(i, j int) {
			deck[i], deck[j] = deck[j], deck[i]
		})

		fullBoard := make([]Card, len(board))
		copy(fullBoard, board)

		i := 0
		for len(fullBoard) < 5 {
			fullBoard = append(fullBoard, deck[i])
			i++
		}

		heroCards := append([]Card{}, hole...)
		heroCards = append(heroCards, fullBoard...)
		heroResult := bestHand(heroCards)

		opponentsResult := make([]EvalResult, numOpponents)
		for o := range numOpponents {
			oppCards := []Card{deck[i], deck[i+1]}
			i += 2
			oppCards = append(oppCards, fullBoard...)
			opponentsResult[o] = bestHand(oppCards)
		}

		best := heroResult
		bestCount := 1
		for _, r := range opponentsResult {
			if r.Rank > best.Rank || (r.Rank == best.Rank && r.Score > best.Score) {
				best = r
				bestCount = 1
			} else if r.Rank == best.Rank && r.Score == best.Score {
				bestCount++
			}
		}

		if heroResult.Rank == best.Rank && heroResult.Score == best.Score {
			if bestCount > 1 {
				ties++
			} else {
				wins++
			}
		}
	}

	total := float64(simulations)
	return OddsResult{
		Win:  float64(wins) / total * 100,
		Tie:  float64(ties) / total * 100,
		Lose: 100 - (float64(wins+ties))/total*100,
	}
}

func FormatCards(s string) ([]Card, error) {
	parts := strings.Fields(s)
	cards := make([]Card, 0, len(parts))
	for _, p := range parts {
		if len(p) < 2 {
			return nil, fmt.Errorf("invalid card: %q", p)
		}
		cards = append(cards, ParseCard(p))
	}
	sort.Slice(cards, func(i, j int) bool {
		if cards[i].Rank != cards[j].Rank {
			return cards[i].Rank > cards[j].Rank
		}
		return cards[i].Suit < cards[j].Suit
	})
	return cards, nil
}
