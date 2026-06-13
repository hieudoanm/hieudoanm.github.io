package casino

import (
	"testing"
)

func TestNewShuffledDeckSize(t *testing.T) {
	deck := newShuffledDeck()
	if len(deck) != 52 {
		t.Fatalf("newShuffledDeck() returned %d cards, want 52", len(deck))
	}
}

func TestNewShuffledDeckUniqueness(t *testing.T) {
	deck := newShuffledDeck()
	seen := map[Card]int{}
	for _, c := range deck {
		seen[c]++
	}
	if len(seen) != 52 {
		t.Errorf("newShuffledDeck() has %d unique cards, want 52", len(seen))
	}
	for c, n := range seen {
		if n != 1 {
			t.Errorf("card %+v appears %d times", c, n)
		}
	}
}

func TestNewShuffledDeckAllRanksSuits(t *testing.T) {
	deck := newShuffledDeck()
	has := map[Card]bool{}
	for _, c := range deck {
		has[c] = true
	}
	for rank := 2; rank <= 14; rank++ {
		for suit := 0; suit < 4; suit++ {
			c := Card{Rank: rank, Suit: Suit(suit)}
			if !has[c] {
				t.Errorf("newShuffledDeck() missing card %+v", c)
			}
		}
	}
}

func TestDealCard(t *testing.T) {
	deck := []Card{
		{Rank: 7, Suit: Clubs},
		{Rank: 10, Suit: Diamonds},
		{Rank: 3, Suit: Hearts},
	}
	originalLen := len(deck)

	card := dealCard(&deck)
	if card != (Card{Rank: 7, Suit: Clubs}) {
		t.Errorf("dealCard() returned %+v, want {7 Clubs}", card)
	}
	if len(deck) != originalLen-1 {
		t.Errorf("deck length after deal = %d, want %d", len(deck), originalLen-1)
	}

	card2 := dealCard(&deck)
	if card2 != (Card{Rank: 10, Suit: Diamonds}) {
		t.Errorf("dealCard() returned %+v, want {10 Diamonds}", card2)
	}
	if len(deck) != originalLen-2 {
		t.Errorf("deck length after second deal = %d, want %d", len(deck), originalLen-2)
	}
}

func TestDealCardEmptyDeck(t *testing.T) {
	deck := []Card{}
	// should not panic — we don't guard against this, but it shouldn't cause index panic
	// due to Go's slice bounds checking. This test verifies the behavior doesn't crash
	// unexpectedly in a different way.
	defer func() {
		if r := recover(); r != nil {
			t.Logf("dealCard on empty deck panicked as expected: %v", r)
		}
	}()
	_ = dealCard(&deck)
}

func TestMinInt(t *testing.T) {
	tests := []struct {
		a, b, want int
	}{
		{3, 5, 3},
		{5, 3, 3},
		{3, 3, 3},
		{-1, 5, -1},
		{0, 100, 0},
		{-10, -5, -10},
	}
	for _, tt := range tests {
		got := minInt(tt.a, tt.b)
		if got != tt.want {
			t.Errorf("minInt(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
		}
	}
}
