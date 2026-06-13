package casino

import (
	"fmt"
	"math/rand"

	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"
)

type slotsState int

const (
	slotsSpin slotsState = iota
	slotsResult
)

type slotsModel struct {
	reels   [3]int
	balance int
	bet     int
	state   slotsState
	message string
	win     int
}

var symbols = []string{"🍒", "🍋", "🔔", "💎", "7️⃣", "BAR"}

var payouts = [6]int{2, 3, 5, 10, 20, 50}

func (m *slotsModel) spin() {
	for i := range m.reels {
		m.reels[i] = rand.Intn(len(symbols))
	}
	m.win = 0
	if m.reels[0] == m.reels[1] && m.reels[1] == m.reels[2] {
		m.win = m.bet * payouts[m.reels[0]]
	}
	m.balance += m.win
}

func (m slotsModel) Init() tea.Cmd {
	return nil
}

func (m slotsModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "q", "ctrl+c":
			return m, tea.Quit
		}

		switch m.state {
		case slotsSpin:
			switch msg.String() {
			case "up":
				m.bet = minInt(m.bet+5, 100)
			case "down":
				if m.bet >= 5 {
					m.bet -= 5
				}
			case " ":
				if m.bet > 0 && m.bet <= m.balance {
					m.balance -= m.bet
					m.spin()
					m.state = slotsResult
				}
			}

		case slotsResult:
			switch msg.String() {
			case " ":
				m.message = ""
				m.state = slotsSpin
				if m.balance <= 0 {
					m.balance = 1000
				}
			}
		}
	}
	return m, nil
}

func (m slotsModel) View() tea.View {
	title := lipgloss.NewStyle().Bold(true).Foreground(lipgloss.Color("212"))
	gold := lipgloss.NewStyle().Bold(true).Foreground(lipgloss.Color("220"))
	green := lipgloss.NewStyle().Foreground(lipgloss.Color("42"))
	red := lipgloss.NewStyle().Foreground(lipgloss.Color("196"))

	var s string
	s += title.Render("🎰 Slots\n\n")
	s += fmt.Sprintf("Balance: %s      Bet: %s\n\n",
		gold.Render(fmt.Sprintf("$%d", m.balance)),
		gold.Render(fmt.Sprintf("$%d", m.bet)))

	switch m.state {
	case slotsSpin:
		s += "  [?]  [?]  [?]\n\n"
		s += "↑ ↓ adjust bet  •  Space to spin  •  q quit\n\n"

		s += "Paytable (3 of a kind):\n"
		for i, sym := range symbols {
			s += fmt.Sprintf("  %s ×3  →  $%d× bet\n", sym, payouts[i])
		}

	case slotsResult:
		s += "  "
		for _, r := range m.reels {
			s += fmt.Sprintf("[%s]  ", symbols[r])
		}
		s += "\n\n"
		if m.win > 0 {
			s += green.Render(fmt.Sprintf("  You won $%d!\n\n", m.win))
		} else {
			s += red.Render("  No win. Try again.\n\n")
		}
		s += "  Space to spin again  •  q quit\n"
	}

	return tea.NewView(s)
}
