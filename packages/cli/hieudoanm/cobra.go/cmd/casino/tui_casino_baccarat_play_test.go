package casino

import "testing"

func TestBaccaratValue(t *testing.T) {
	tests := []struct {
		card Card
		want int
	}{
		{Card{Rank: 2}, 2},
		{Card{Rank: 9}, 9},
		{Card{Rank: 10}, 0},
		{Card{Rank: 11}, 0},
		{Card{Rank: 12}, 0},
		{Card{Rank: 13}, 0},
		{Card{Rank: 14}, 0},
	}
	for _, tt := range tests {
		got := baccaratValue(tt.card)
		if got != tt.want {
			t.Errorf("baccaratValue(%+v) = %d, want %d", tt.card, got, tt.want)
		}
	}
}

func TestBaccaratSum(t *testing.T) {
	tests := []struct {
		name  string
		cards []Card
		want  int
	}{
		{"two low cards", []Card{{Rank: 2}, {Rank: 3}}, 5},
		{"with face card", []Card{{Rank: 9}, {Rank: 10}}, 9},
		{"wrap around", []Card{{Rank: 9}, {Rank: 8}}, 7},
		{"three cards", []Card{{Rank: 2}, {Rank: 3}, {Rank: 10}}, 5},
		{"all faces", []Card{{Rank: 10}, {Rank: 11}, {Rank: 12}}, 0},
		{"mixed wrap", []Card{{Rank: 7}, {Rank: 8}, {Rank: 9}}, 4},
		{"single card", []Card{{Rank: 5}}, 5},
		{"empty hand", []Card{}, 0},
	}
	for _, tt := range tests {
		got := baccaratSum(tt.cards)
		if got != tt.want {
			t.Errorf("%s: baccaratSum(%+v) = %d, want %d", tt.name, tt.cards, got, tt.want)
		}
	}
}

func TestBaccaratShouldDraw(t *testing.T) {
	tests := []struct {
		name  string
		cards []Card
		want  bool
	}{
		{"sum 0 should draw", []Card{{Rank: 10}, {Rank: 10}}, true},
		{"sum 3 should draw", []Card{{Rank: 3}, {Rank: 10}}, true},
		{"sum 5 should draw", []Card{{Rank: 5}, {Rank: 10}}, true},
		{"sum 6 should stand", []Card{{Rank: 6}, {Rank: 10}}, false},
		{"sum 7 should stand", []Card{{Rank: 7}, {Rank: 10}}, false},
		{"sum 8 should stand", []Card{{Rank: 8}, {Rank: 10}}, false},
		{"sum 9 should stand", []Card{{Rank: 9}, {Rank: 10}}, false},
	}
	for _, tt := range tests {
		got := baccaratShouldDraw(tt.cards)
		if got != tt.want {
			t.Errorf("%s: baccaratShouldDraw(%+v) = %v, want %v", tt.name, tt.cards, got, tt.want)
		}
	}
}

func TestBaccaratDrawForThird(t *testing.T) {
	tests := []struct {
		name        string
		cards       []Card
		playerThird int
		want        bool
	}{
		// sum <= 2: always draw
		{"v=0 always", []Card{{Rank: 10, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 0, true},
		{"v=0 always pt=9", []Card{{Rank: 10, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 9, true},
		{"v=1 always", []Card{{Rank: 2, Suit: Clubs}, {Rank: 9, Suit: Diamonds}}, 0, true},
		{"v=2 always", []Card{{Rank: 2, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 0, true},

		// v == 3: draw unless playerThird == 8
		{"v=3 pt=1 draws", []Card{{Rank: 3, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 1, true},
		{"v=3 pt=8 stands", []Card{{Rank: 3, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 8, false},
		{"v=3 pt=9 draws", []Card{{Rank: 3, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 9, true},

		// v == 4: draw if 2 <= pt <= 7
		{"v=4 pt=1 stands", []Card{{Rank: 4, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 1, false},
		{"v=4 pt=2 draws", []Card{{Rank: 4, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 2, true},
		{"v=4 pt=7 draws", []Card{{Rank: 4, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 7, true},
		{"v=4 pt=8 stands", []Card{{Rank: 4, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 8, false},

		// v == 5: draw if 4 <= pt <= 7
		{"v=5 pt=3 stands", []Card{{Rank: 5, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 3, false},
		{"v=5 pt=4 draws", []Card{{Rank: 5, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 4, true},
		{"v=5 pt=7 draws", []Card{{Rank: 5, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 7, true},
		{"v=5 pt=8 stands", []Card{{Rank: 5, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 8, false},

		// v == 6: draw if pt == 6 or 7
		{"v=6 pt=5 stands", []Card{{Rank: 6, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 5, false},
		{"v=6 pt=6 draws", []Card{{Rank: 6, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 6, true},
		{"v=6 pt=7 draws", []Card{{Rank: 6, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 7, true},
		{"v=6 pt=8 stands", []Card{{Rank: 6, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 8, false},

		// v >= 7: always stand
		{"v=7 stands", []Card{{Rank: 7, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 0, false},
		{"v=8 stands", []Card{{Rank: 8, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 0, false},
		{"v=9 stands", []Card{{Rank: 9, Suit: Clubs}, {Rank: 10, Suit: Diamonds}}, 0, false},
	}
	for _, tt := range tests {
		got := baccaratDrawForThird(tt.cards, tt.playerThird)
		if got != tt.want {
			t.Errorf("%s: baccaratDrawForThird(%+v, %d) = %v, want %v",
				tt.name, tt.cards, tt.playerThird, got, tt.want)
		}
	}
}

func TestNewBaccaratDeckSize(t *testing.T) {
	deck := newBaccaratDeck()
	if len(deck) != 52 {
		t.Fatalf("newBaccaratDeck() returned %d cards, want 52", len(deck))
	}
}

func TestNewBaccaratDeckUniqueness(t *testing.T) {
	deck := newBaccaratDeck()
	seen := map[Card]int{}
	for _, c := range deck {
		seen[c]++
	}
	if len(seen) != 52 {
		t.Errorf("newBaccaratDeck() has %d unique cards, want 52", len(seen))
	}
}

func TestNewBaccaratDeckAllRanksSuits(t *testing.T) {
	deck := newBaccaratDeck()
	has := map[Card]bool{}
	for _, c := range deck {
		has[c] = true
	}
	for rank := 2; rank <= 14; rank++ {
		for suit := 0; suit < 4; suit++ {
			c := Card{Rank: rank, Suit: Suit(suit)}
			if !has[c] {
				t.Errorf("newBaccaratDeck() missing card %+v", c)
			}
		}
	}
}
