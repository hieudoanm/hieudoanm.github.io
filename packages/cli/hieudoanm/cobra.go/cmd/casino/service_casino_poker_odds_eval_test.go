package casino

import (
	"testing"
)

func TestParseCard(t *testing.T) {
	tests := []struct {
		input string
		want  Card
	}{
		{"2c", Card{Rank: 2, Suit: Clubs}},
		{"3d", Card{Rank: 3, Suit: Diamonds}},
		{"4h", Card{Rank: 4, Suit: Hearts}},
		{"5s", Card{Rank: 5, Suit: Spades}},
		{"9c", Card{Rank: 9, Suit: Clubs}},
		{"Td", Card{Rank: 10, Suit: Diamonds}},
		{"Jh", Card{Rank: 11, Suit: Hearts}},
		{"Qs", Card{Rank: 12, Suit: Spades}},
		{"Kc", Card{Rank: 13, Suit: Clubs}},
		{"Ad", Card{Rank: 14, Suit: Diamonds}},
	}
	for _, tt := range tests {
		got := ParseCard(tt.input)
		if got != tt.want {
			t.Errorf("ParseCard(%q) = %+v, want %+v", tt.input, got, tt.want)
		}
	}
}

func TestCardString(t *testing.T) {
	tests := []struct {
		card Card
		want string
	}{
		{Card{Rank: 2, Suit: Clubs}, "2c"},
		{Card{Rank: 10, Suit: Diamonds}, "Td"},
		{Card{Rank: 11, Suit: Hearts}, "Jh"},
		{Card{Rank: 12, Suit: Spades}, "Qs"},
		{Card{Rank: 13, Suit: Clubs}, "Kc"},
		{Card{Rank: 14, Suit: Diamonds}, "Ad"},
	}
	for _, tt := range tests {
		got := tt.card.String()
		if got != tt.want {
			t.Errorf("Card{%+v}.String() = %q, want %q", tt.card, got, tt.want)
		}
	}
}

func TestCardParseStringRoundtrip(t *testing.T) {
	inputs := []string{"2c", "3d", "4h", "5s", "9c", "Td", "Jh", "Qs", "Kc", "Ad"}
	for _, s := range inputs {
		card := ParseCard(s)
		got := card.String()
		if got != s {
			t.Errorf("roundtrip %q: ParseCard().String() = %q", s, got)
		}
	}
}

func TestIsStraight(t *testing.T) {
	tests := []struct {
		name     string
		cards    [5]Card
		wantOk   bool
		wantHigh int
	}{
		{
			name:     "normal straight",
			cards:    [5]Card{{5, Clubs}, {6, Diamonds}, {7, Hearts}, {8, Spades}, {9, Clubs}},
			wantOk:   true,
			wantHigh: 9,
		},
		{
			name:     "wheel",
			cards:    [5]Card{{14, Clubs}, {2, Diamonds}, {3, Hearts}, {4, Spades}, {5, Clubs}},
			wantOk:   true,
			wantHigh: 5,
		},
		{
			name:     "not a straight",
			cards:    [5]Card{{2, Clubs}, {5, Diamonds}, {7, Hearts}, {9, Spades}, {13, Clubs}},
			wantOk:   false,
			wantHigh: 0,
		},
	}
	for _, tt := range tests {
		gotOk, gotHigh := isStraight(tt.cards)
		if gotOk != tt.wantOk || gotHigh != tt.wantHigh {
			t.Errorf("%s: isStraight(%+v) = (%v, %d), want (%v, %d)",
				tt.name, tt.cards, gotOk, gotHigh, tt.wantOk, tt.wantHigh)
		}
	}
}

func TestSumHighCards(t *testing.T) {
	cards := [5]Card{{2, Clubs}, {5, Diamonds}, {7, Hearts}, {9, Spades}, {13, Clubs}}
	got := sumHighCards(cards)
	// ranks sorted desc: 13, 9, 7, 5, 2
	want := ((((0*100+13)*100+9)*100+7)*100+5)*100 + 2
	if got != want {
		t.Errorf("sumHighCards(%+v) = %d, want %d", cards, got, want)
	}
}

func eval5Helper(ranks []int, suits []Suit) [5]Card {
	var cards [5]Card
	for i := range 5 {
		cards[i] = Card{Rank: ranks[i], Suit: suits[i]}
	}
	return cards
}

func TestEval5HighCard(t *testing.T) {
	cards := eval5Helper([]int{2, 5, 7, 9, 13}, []Suit{Clubs, Diamonds, Hearts, Spades, Clubs})
	r := eval5(cards)
	if r.Rank != HighCard {
		t.Errorf("expected HighCard, got %v", r.Rank)
	}
	wantScore := sumHighCards(cards)
	if r.Score != wantScore {
		t.Errorf("score = %d, want %d", r.Score, wantScore)
	}
}

func TestEval5OnePair(t *testing.T) {
	cards := eval5Helper([]int{2, 2, 7, 9, 13}, []Suit{Clubs, Diamonds, Hearts, Spades, Clubs})
	r := eval5(cards)
	if r.Rank != OnePair {
		t.Errorf("expected OnePair, got %v", r.Rank)
	}
	if r.Score != 2 {
		t.Errorf("score = %d, want 2", r.Score)
	}
}

func TestEval5TwoPair(t *testing.T) {
	cards := eval5Helper([]int{2, 2, 7, 7, 13}, []Suit{Clubs, Diamonds, Hearts, Spades, Clubs})
	r := eval5(cards)
	if r.Rank != TwoPair {
		t.Errorf("expected TwoPair, got %v", r.Rank)
	}
	// pairs sorted desc: 7, 2 => 7*100+2 = 702
	if r.Score != 702 {
		t.Errorf("score = %d, want 702", r.Score)
	}
}

func TestEval5ThreeOfAKind(t *testing.T) {
	cards := eval5Helper([]int{2, 2, 2, 7, 13}, []Suit{Clubs, Diamonds, Hearts, Spades, Clubs})
	r := eval5(cards)
	if r.Rank != ThreeOfAKind {
		t.Errorf("expected ThreeOfAKind, got %v", r.Rank)
	}
	if r.Score != 2 {
		t.Errorf("score = %d, want 2", r.Score)
	}
}

func TestEval5Straight(t *testing.T) {
	cards := eval5Helper([]int{5, 6, 7, 8, 9}, []Suit{Clubs, Diamonds, Hearts, Spades, Clubs})
	r := eval5(cards)
	if r.Rank != Straight {
		t.Errorf("expected Straight, got %v", r.Rank)
	}
	if r.Score != 9 {
		t.Errorf("score = %d, want 9", r.Score)
	}
}

func TestEval5Flush(t *testing.T) {
	cards := eval5Helper([]int{2, 5, 7, 9, 13}, []Suit{Clubs, Clubs, Clubs, Clubs, Clubs})
	r := eval5(cards)
	if r.Rank != Flush {
		t.Errorf("expected Flush, got %v", r.Rank)
	}
	wantScore := sumHighCards(cards)
	if r.Score != wantScore {
		t.Errorf("score = %d, want %d", r.Score, wantScore)
	}
}

func TestEval5FullHouse(t *testing.T) {
	cards := eval5Helper([]int{2, 2, 2, 7, 7}, []Suit{Clubs, Diamonds, Hearts, Spades, Clubs})
	r := eval5(cards)
	if r.Rank != FullHouse {
		t.Errorf("expected FullHouse, got %v", r.Rank)
	}
	if r.Score != 2*100+7 {
		t.Errorf("score = %d, want %d", r.Score, 2*100+7)
	}
}

func TestEval5FourOfAKind(t *testing.T) {
	cards := eval5Helper([]int{2, 2, 2, 2, 13}, []Suit{Clubs, Diamonds, Hearts, Spades, Clubs})
	r := eval5(cards)
	if r.Rank != FourOfAKind {
		t.Errorf("expected FourOfAKind, got %v", r.Rank)
	}
	if r.Score != 2 {
		t.Errorf("score = %d, want 2", r.Score)
	}
}

func TestEval5StraightFlush(t *testing.T) {
	cards := eval5Helper([]int{5, 6, 7, 8, 9}, []Suit{Clubs, Clubs, Clubs, Clubs, Clubs})
	r := eval5(cards)
	if r.Rank != StraightFlush {
		t.Errorf("expected StraightFlush, got %v", r.Rank)
	}
	if r.Score != 9 {
		t.Errorf("score = %d, want 9", r.Score)
	}
}

func TestEval5RoyalFlush(t *testing.T) {
	cards := eval5Helper([]int{10, 11, 12, 13, 14}, []Suit{Clubs, Clubs, Clubs, Clubs, Clubs})
	r := eval5(cards)
	if r.Rank != StraightFlush {
		t.Errorf("expected StraightFlush, got %v", r.Rank)
	}
	if r.Score != 14 {
		t.Errorf("score = %d, want 14 (royal)", r.Score)
	}
}

func TestIsStraightWheel(t *testing.T) {
	cards := eval5Helper([]int{14, 2, 3, 4, 5}, []Suit{Clubs, Diamonds, Hearts, Spades, Clubs})
	ok, high := isStraight(cards)
	if !ok {
		t.Error("isStraight: expected true for wheel")
	}
	if high != 5 {
		t.Errorf("isStraight: high = %d, want 5 for wheel", high)
	}
}

func TestBestHand5Cards(t *testing.T) {
	cards := []Card{{2, Clubs}, {2, Diamonds}, {7, Hearts}, {9, Spades}, {13, Clubs}}
	r := bestHand(cards)
	if r.Rank != OnePair {
		t.Errorf("expected OnePair from 5 cards, got %v", r.Rank)
	}
}

func TestBestHand6Cards(t *testing.T) {
	cards := []Card{
		{2, Clubs}, {2, Diamonds}, {2, Hearts},
		{7, Spades}, {7, Clubs}, {13, Diamonds},
	}
	r := bestHand(cards)
	if r.Rank != FullHouse {
		t.Errorf("expected FullHouse from 6 cards, got %v", r.Rank)
	}
}

func TestBestHand7Cards(t *testing.T) {
	cards := []Card{
		{2, Clubs}, {3, Clubs}, {4, Clubs}, {5, Clubs},
		{6, Diamonds}, {9, Hearts}, {13, Spades},
	}
	r := bestHand(cards)
	if r.Rank != Straight {
		t.Errorf("expected Straight from 7 cards, got %v", r.Rank)
	}
}
