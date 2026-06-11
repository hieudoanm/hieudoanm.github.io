package casino

import "sort"

type Suit int

const (
	Clubs Suit = iota
	Diamonds
	Hearts
	Spades
)

type Card struct {
	Rank int
	Suit Suit
}

func (c Card) String() string {
	r := "23456789TJQKA"[c.Rank-2 : c.Rank-1]
	s := "cdhs"[c.Suit : c.Suit+1]
	return string(r) + string(s)
}

func ParseCard(s string) Card {
	rank := 0
	switch s[0] {
	case '2', '3', '4', '5', '6', '7', '8', '9':
		rank = int(s[0] - '0')
	case 'T':
		rank = 10
	case 'J':
		rank = 11
	case 'Q':
		rank = 12
	case 'K':
		rank = 13
	case 'A':
		rank = 14
	}
	suit := 0
	switch s[1] {
	case 'd':
		suit = 1
	case 'h':
		suit = 2
	case 's':
		suit = 3
	}
	return Card{Rank: rank, Suit: Suit(suit)}
}

type HandRank int

const (
	HighCard HandRank = iota
	OnePair
	TwoPair
	ThreeOfAKind
	Straight
	Flush
	FullHouse
	FourOfAKind
	StraightFlush
)

type EvalResult struct {
	Rank  HandRank
	Score int // for tie-breaking within a rank
}

func eval5(cards [5]Card) EvalResult {
	counts := map[int]int{}
	for _, c := range cards {
		counts[c.Rank]++
	}

	pairs := []int{}
	trips := 0
	quads := 0
	for r, n := range counts {
		switch n {
		case 2:
			pairs = append(pairs, r)
		case 3:
			trips = r
		case 4:
			quads = r
		}
	}

	flush := true
	for i := 1; i < 5; i++ {
		if cards[i].Suit != cards[0].Suit {
			flush = false
			break
		}
	}

	straight, high := isStraight(cards)

	switch {
	case flush && straight && high == 14:
		return EvalResult{StraightFlush, 14}
	case flush && straight:
		return EvalResult{StraightFlush, high}
	case quads != 0:
		return EvalResult{FourOfAKind, quads}
	case trips != 0 && len(pairs) == 1:
		return EvalResult{FullHouse, trips*100 + pairs[0]}
	case flush:
		return EvalResult{Flush, sumHighCards(cards)}
	case straight:
		return EvalResult{Straight, high}
	case trips != 0:
		return EvalResult{ThreeOfAKind, trips}
	case len(pairs) == 2:
		sort.Slice(pairs, func(i, j int) bool { return pairs[i] > pairs[j] })
		return EvalResult{TwoPair, pairs[0]*100 + pairs[1]}
	case len(pairs) == 1:
		return EvalResult{OnePair, pairs[0]}
	default:
		return EvalResult{HighCard, sumHighCards(cards)}
	}
}

func isStraight(cards [5]Card) (bool, int) {
	ranks := make([]int, 5)
	for i, c := range cards {
		ranks[i] = c.Rank
	}
	sort.Ints(ranks)

	straight := true
	for i := 1; i < 5; i++ {
		if ranks[i] != ranks[i-1]+1 {
			straight = false
			break
		}
	}
	if straight {
		return true, ranks[4]
	}

	if ranks[0] == 2 && ranks[1] == 3 && ranks[2] == 4 && ranks[3] == 5 && ranks[4] == 14 {
		return true, 5
	}
	return false, 0
}

func sumHighCards(cards [5]Card) int {
	ranks := make([]int, 5)
	for i, c := range cards {
		ranks[i] = c.Rank
	}
	sort.Slice(ranks, func(i, j int) bool { return ranks[i] > ranks[j] })
	s := 0
	for _, r := range ranks {
		s = s*100 + r
	}
	return s
}

func bestHand(cards []Card) EvalResult {
	n := len(cards)
	best := EvalResult{HighCard, 0}

	comb := make([]int, 5)
	for i := 0; i < 5; i++ {
		comb[i] = i
	}

	for {
		var five [5]Card
		for i, idx := range comb {
			five[i] = cards[idx]
		}
		r := eval5(five)
		if r.Rank > best.Rank || (r.Rank == best.Rank && r.Score > best.Score) {
			best = r
		}

		i := 4
		for i >= 0 && comb[i] == i+n-5 {
			i--
		}
		if i < 0 {
			break
		}
		comb[i]++
		for j := i + 1; j < 5; j++ {
			comb[j] = comb[j-1] + 1
		}
	}

	return best
}
