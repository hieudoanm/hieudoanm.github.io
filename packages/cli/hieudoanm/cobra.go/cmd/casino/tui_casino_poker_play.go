package casino

import (
	"fmt"
	"strings"

	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"
)

type street int

const (
	streetPreflop street = iota
	streetFlop
	streetTurn
	streetRiver
	streetShowdown
)

type pokerPlayModel struct {
	deck          []Card
	hero          []Card
	villain       []Card
	board         []Card
	pot           int
	heroChips     int
	villainChips  int
	street        street
	lastAction    string
	heroBet       int
	villainBet    int
	message       string
	result        string
	blindsPosted  bool
	aiFinalHand   string
	heroFinalHand string
}

func dealCards(d *[]Card, n int) []Card {
	cards := make([]Card, n)
	for i := range n {
		cards[i] = (*d)[0]
		*d = (*d)[1:]
	}
	return cards
}

func aiEvalStrength(hc []Card, bc []Card) int {
	if len(bc) == 0 {
		return aiPreflopStrength(hc)
	}
	all := append([]Card{}, hc...)
	all = append(all, bc...)
	r := bestHand(all)
	return int(r.Rank)
}

func aiPreflopStrength(hc []Card) int {
	r1, r2 := hc[0].Rank, hc[1].Rank
	if r1 == r2 {
		if r1 >= 8 {
			return 8
		}
		return 4
	}
	suited := hc[0].Suit == hc[1].Suit
	if r1+r2 >= 22 {
		if suited {
			return 7
		}
		return 6
	}
	if r1+r2 >= 18 {
		if suited {
			return 5
		}
		return 4
	}
	if r1+r2 >= 14 {
		if suited {
			return 3
		}
		return 2
	}
	return 1
}

func (m *pokerPlayModel) advanceStreet() {
	switch m.street {
	case streetPreflop:
		m.street = streetFlop
		m.board = append(m.board, dealCards(&m.deck, 3)...)
	case streetFlop:
		m.street = streetTurn
		m.board = append(m.board, dealCards(&m.deck, 1)...)
	case streetTurn:
		m.street = streetRiver
		m.board = append(m.board, dealCards(&m.deck, 1)...)
	case streetRiver:
		m.street = streetShowdown
	}
	m.heroBet = 0
	m.villainBet = 0
}

func (m *pokerPlayModel) showdown() {
	heroAll := append([]Card{}, m.hero...)
	heroAll = append(heroAll, m.board...)
	villainAll := append([]Card{}, m.villain...)
	villainAll = append(villainAll, m.board...)

	heroResult := bestHand(heroAll)
	villainResult := bestHand(villainAll)

	m.heroFinalHand = handRankName(heroResult.Rank)
	m.aiFinalHand = handRankName(villainResult.Rank)

	if heroResult.Rank > villainResult.Rank || (heroResult.Rank == villainResult.Rank && heroResult.Score > villainResult.Score) {
		m.heroChips += m.pot
		m.result = "You win!"
	} else if heroResult.Rank == villainResult.Rank && heroResult.Score == villainResult.Score {
		m.heroChips += m.pot / 2
		m.villainChips += m.pot / 2
		if m.pot%2 == 1 {
			m.villainChips++
		}
		m.result = "Split pot."
	} else {
		m.villainChips += m.pot
		m.result = "Villain wins."
	}
	m.street = streetShowdown
}

func handRankName(r HandRank) string {
	names := []string{
		"High Card", "One Pair", "Two Pair", "Three of a Kind",
		"Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush",
	}
	if int(r) < len(names) {
		return names[r]
	}
	return "Unknown"
}

func cardDisplay(c Card) string {
	r := "23456789TJQKA"[c.Rank-2 : c.Rank-1]
	s := ""
	switch c.Suit {
	case Clubs:
		s = "♣"
	case Diamonds:
		s = "♦"
	case Hearts:
		s = "♥"
	case Spades:
		s = "♠"
	}
	return "[" + string(r) + s + "]"
}

func cardsDisplay(cards []Card) string {
	var sb strings.Builder
	for _, c := range cards {
		sb.WriteString(cardDisplay(c))
		sb.WriteString(" ")
	}
	return strings.TrimSpace(sb.String())
}

func (m *pokerPlayModel) aiAct() (string, int) {
	if m.heroBet == m.villainBet {
		if m.street == streetPreflop {
			if aiPreflopStrength(m.villain) >= 5 {
				r := m.pot / 2
				if r < 10 {
					r = 10
				}
				return "raise", r
			}
			return "check", 0
		}
		str := aiEvalStrength(m.villain, m.board)
		if str >= int(OnePair) {
			r := m.pot / 2
			if r < 10 {
				r = 10
			}
			return "raise", r
		}
		return "check", 0
	}

	return m.aiRespondToRaise()
}

func (m *pokerPlayModel) aiRespondToRaise() (string, int) {
	diff := m.heroBet - m.villainBet
	if m.street == streetPreflop {
		s := aiPreflopStrength(m.villain)
		if s >= 5 {
			rAmt := m.pot / 2
			if rAmt < 10 {
				rAmt = 10
			}
			if rAmt > m.villainChips {
				rAmt = m.villainChips
			}
			return "raise", rAmt
		}
		if s >= 3 {
			if diff <= m.villainChips {
				return "call", diff
			}
			return "call", m.villainChips
		}
		return "fold", 0
	}

	str := aiEvalStrength(m.villain, m.board)
	if str >= int(TwoPair) {
		rAmt := m.pot / 2
		if rAmt > m.villainChips {
			rAmt = m.villainChips
		}
		return "raise", rAmt
	}
	if str >= int(OnePair) {
		if diff <= m.villainChips {
			return "call", diff
		}
		return "call", m.villainChips
	}
	if m.pot > 0 && float64(diff)/float64(m.pot+diff) < 0.25 {
		if diff <= m.villainChips {
			return "call", diff
		}
		return "call", m.villainChips
	}
	return "fold", 0
}

func (m *pokerPlayModel) heroWinsPot() {
	m.heroChips += m.pot
	m.result = "You win!"
	m.street = streetShowdown
	m.pot = 0
}

func (m *pokerPlayModel) villainWinsPot() {
	m.villainChips += m.pot
	m.result = "Villain wins."
	m.street = streetShowdown
	m.pot = 0
}

func (m *pokerPlayModel) postBlinds() {
	m.deck = newShuffledDeck()
	m.hero = dealCards(&m.deck, 2)
	m.villain = dealCards(&m.deck, 2)
	m.board = []Card{}
	m.pot = 30
	m.heroChips -= 10
	m.villainChips -= 20
	m.heroBet = 10
	m.villainBet = 20
	m.blindsPosted = true
	m.street = streetPreflop
	m.lastAction = "Blinds posted (SB $10, BB $20)"

	str := aiPreflopStrength(m.villain)
	if str < 3 {
		m.heroChips += m.pot
		m.pot = 0
		m.heroBet = 0
		m.villainBet = 0
		m.blindsPosted = false
		m.message = "Villain folded preflop. You win $30."
		m.lastAction = "Villain folded"
		return
	}
	if str >= 6 {
		raise := 30
		m.villainBet += raise
		m.villainChips -= raise
		m.pot += raise
		m.message = "Villain raises to $" + fmt.Sprint(m.villainBet)
		m.lastAction = "Villain raised"
		return
	}
	m.message = "Your turn."
	m.lastAction = "Villain checked"
}

func (m *pokerPlayModel) aiActsSameStreet() {
	act, amt := m.aiAct()
	switch act {
	case "check":
		m.lastAction = "Villain checked"
		m.advanceStreet()
		if m.street == streetShowdown {
			m.showdown()
		}
	case "raise":
		if amt > m.villainChips {
			amt = m.villainChips
		}
		m.villainBet += amt
		m.villainChips -= amt
		m.pot += amt
		m.lastAction = "Villain raised"
		m.message = "Villain raises to $" + fmt.Sprint(m.villainBet)
	case "fold":
		m.heroWinsPot()
		m.result = "Villain folded. You win!"
	}
}

func (m pokerPlayModel) Init() tea.Cmd {
	return nil
}

func (m pokerPlayModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "q", "ctrl+c":
			return m, tea.Quit
		}

		if m.street == streetShowdown {
			if msg.String() == "enter" {
				m.pot = 0
				m.street = streetPreflop
				m.blindsPosted = false
				m.heroBet = 0
				m.villainBet = 0
				m.lastAction = ""
				m.message = ""
				m.result = ""
				m.heroFinalHand = ""
				m.aiFinalHand = ""
				if m.heroChips <= 0 || m.villainChips <= 0 {
					m.heroChips = 1000
					m.villainChips = 1000
					m.message = "New game!"
				}
			}
			return m, nil
		}

		if !m.blindsPosted {
			m.postBlinds()
			return m, nil
		}

		if m.heroBet < m.villainBet {
			switch msg.String() {
			case "f":
				m.villainWinsPot()
			case "c":
				diff := m.villainBet - m.heroBet
				m.heroChips -= diff
				m.pot += diff
				m.heroBet = m.villainBet
				m.lastAction = "Hero called"
				m.advanceStreet()
				if m.street == streetShowdown {
					m.showdown()
				}
			case "r":
				diff := m.villainBet - m.heroBet
				raiseAmt := m.pot
				if raiseAmt > m.heroChips-diff {
					raiseAmt = m.heroChips - diff
				}
				if raiseAmt <= 0 {
					m.message = "Not enough chips."
					return m, nil
				}
				m.heroChips -= diff + raiseAmt
				m.pot += diff + raiseAmt
				m.heroBet = m.villainBet + raiseAmt
				m.lastAction = "Hero raised"

				vAct, vAmt := m.aiRespondToRaise()
				switch vAct {
				case "fold":
					m.heroWinsPot()
				case "call":
					if vAmt > m.villainChips {
						vAmt = m.villainChips
					}
					m.villainChips -= vAmt
					m.pot += vAmt
					m.villainBet = m.heroBet
					m.lastAction = "Villain called"
					m.advanceStreet()
					if m.street == streetShowdown {
						m.showdown()
					}
				case "raise":
					if vAmt > m.villainChips {
						vAmt = m.villainChips
					}
					m.villainBet += vAmt
					m.villainChips -= vAmt
					m.pot += vAmt
					m.lastAction = "Villain re-raised"
					m.message = "Villain re-raises to $" + fmt.Sprint(m.villainBet)
				}
			}
			return m, nil
		}

		switch msg.String() {
		case "c":
			m.lastAction = "Hero checked"
			m.aiActsSameStreet()
		case "b":
			betAmt := m.pot
			if betAmt > m.heroChips {
				betAmt = m.heroChips
			}
			if betAmt <= 0 {
				m.message = "Not enough chips."
				return m, nil
			}
			m.heroChips -= betAmt
			m.pot += betAmt
			m.heroBet += betAmt
			m.lastAction = "Hero bet"

			vAct, vAmt := m.aiRespondToRaise()
			switch vAct {
			case "fold":
				m.heroWinsPot()
			case "call":
				if vAmt > m.villainChips {
					vAmt = m.villainChips
				}
				m.villainChips -= vAmt
				m.pot += vAmt
				m.villainBet = m.heroBet
				m.lastAction = "Villain called"
				m.advanceStreet()
				if m.street == streetShowdown {
					m.showdown()
				}
			case "raise":
				if vAmt > m.villainChips {
					vAmt = m.villainChips
				}
				m.villainBet += vAmt
				m.villainChips -= vAmt
				m.pot += vAmt
				m.lastAction = "Villain raised"
				m.message = "Villain raises to $" + fmt.Sprint(m.villainBet)
			}
		case "f":
			m.villainWinsPot()
		}
	}
	return m, nil
}

func (m pokerPlayModel) View() tea.View {
	title := lipgloss.NewStyle().Bold(true).Foreground(lipgloss.Color("212"))
	gold := lipgloss.NewStyle().Bold(true).Foreground(lipgloss.Color("220"))
	green := lipgloss.NewStyle().Foreground(lipgloss.Color("42"))
	red := lipgloss.NewStyle().Foreground(lipgloss.Color("196"))
	info := lipgloss.NewStyle().Foreground(lipgloss.Color("51"))

	var s string
	s += title.Render("♠ ♥ ♦ ♣  TEXAS HOLD'EM  ♠ ♥ ♦ ♣\n\n")
	s += fmt.Sprintf("  You: %s      Villain: %s      Pot: %s\n",
		gold.Render(fmt.Sprintf("$%d", m.heroChips)),
		gold.Render(fmt.Sprintf("$%d", m.villainChips)),
		gold.Render(fmt.Sprintf("$%d", m.pot)))

	if len(m.board) > 0 {
		s += fmt.Sprintf("\n  Board: %s\n", cardsDisplay(m.board))
	} else {
		s += "\n  Board: —\n"
	}

	if m.street != streetShowdown {
		s += fmt.Sprintf("\n  Your hand: %s\n", cardsDisplay(m.hero))
		if m.street == streetPreflop && m.blindsPosted {
			s += "  Villain: [??] [??]\n"
		} else if m.street >= streetFlop {
			s += fmt.Sprintf("  Villain: %s\n", cardsDisplay(m.villain))
		} else {
			s += "  Villain: [??] [??]\n"
		}
	} else {
		s += fmt.Sprintf("\n  Your hand: %s (%s)\n", cardsDisplay(m.hero), m.heroFinalHand)
		s += fmt.Sprintf("  Villain: %s (%s)\n", cardsDisplay(m.villain), m.aiFinalHand)
	}

	streetName := ""
	switch m.street {
	case streetPreflop:
		streetName = "Preflop"
	case streetFlop:
		streetName = "Flop"
	case streetTurn:
		streetName = "Turn"
	case streetRiver:
		streetName = "River"
	case streetShowdown:
		streetName = "Showdown"
	}
	s += fmt.Sprintf("\n  ■ %s\n", streetName)
	if m.lastAction != "" {
		s += fmt.Sprintf("  %s\n", info.Render(m.lastAction))
	}

	if m.street == streetShowdown {
		if strings.Contains(m.result, "win") {
			s += fmt.Sprintf("\n  %s\n", green.Render("  "+m.result))
		} else if strings.Contains(m.result, "fold") || strings.Contains(m.result, "wins") {
			s += fmt.Sprintf("\n  %s\n", red.Render("  "+m.result))
		} else {
			s += fmt.Sprintf("\n  %s\n", lipgloss.NewStyle().Foreground(lipgloss.Color("227")).Render("  "+m.result))
		}
		s += "\n  Enter to play again  •  q to quit\n"
		return tea.NewView(s)
	}

	if m.message != "" {
		s += fmt.Sprintf("\n  %s\n\n", m.message)
	}

	if m.heroBet < m.villainBet {
		s += "\n  [f] Fold  [c] Call  [r] Raise\n"
	} else {
		s += "\n  [f] Fold  [c] Check  [b] Bet\n"
	}
	s += "  [q] Quit"

	return tea.NewView(s)
}
