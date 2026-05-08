package pomodoro

import (
	"fmt"
	"time"

	"charm.land/bubbles/v2/progress"
	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"
)

/* ----------------------------- STATE ----------------------------- */

type pomodoroState int

const (
	stateWork pomodoroState = iota
	stateBreak
	stateDone
	stateStopped
)

/* ----------------------------- MODEL ----------------------------- */

type model struct {
	workDuration     time.Duration
	breakDuration    time.Duration
	startTime        time.Time
	totalDuration    time.Duration
	accumulatedPause time.Duration
	pausedAt         time.Time

	progress progress.Model

	state    pomodoroState
	paused   bool
	quitting bool
}

/* ----------------------------- MESSAGES ----------------------------- */

type tickMsg time.Time

/* ----------------------------- INIT ----------------------------- */

func (m model) Init() tea.Cmd {
	return tick()
}

func tick() tea.Cmd {
	return tea.Tick(time.Second, func(t time.Time) tea.Msg {
		return tickMsg(t)
	})
}

/* ----------------------------- UPDATE ----------------------------- */

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {

	switch msg := msg.(type) {

	/* ----------------------------- TICK ----------------------------- */

	case tickMsg:

		if m.paused || m.state == stateStopped {
			return m, tick()
		}

		elapsed := time.Since(m.startTime) - m.accumulatedPause

		if elapsed >= m.totalDuration {

			if m.state == stateWork {
				// switch to break
				m.state = stateBreak
				m.startTime = time.Now()
				m.accumulatedPause = 0
				m.totalDuration = m.breakDuration

				m.progress.SetPercent(0)

				return m, tick()
			}

			// finished
			m.state = stateDone
			m.quitting = true
			return m, tea.Quit
		}

		pct := float64(elapsed) / float64(m.totalDuration)
		m.progress.SetPercent(pct)

		return m, tick()

	/* ----------------------------- KEYS ----------------------------- */

	case tea.KeyMsg:
		switch msg.String() {

		case "q", "ctrl+c":
			m.quitting = true
			return m, tea.Quit

		case "p":
			if !m.paused {
				m.paused = true
				m.pausedAt = time.Now()
			} else {
				m.paused = false
				m.accumulatedPause += time.Since(m.pausedAt)
			}
			return m, nil

		case "s":
			m.state = stateStopped
			m.quitting = true
			return m, tea.Quit
		}
	}

	return m, nil
}

/* ----------------------------- VIEW (v2) ----------------------------- */

func (m model) View() tea.View {

	if m.quitting {
		switch m.state {
		case stateDone:
			return tea.NewView("\n🎉 Pomodoro complete! Great job!\n\n")
		case stateStopped:
			return tea.NewView("\n⏹️ Pomodoro stopped.\n\n")
		}
	}

	title := ""
	switch m.state {
	case stateWork:
		title = "🍅 Work Session"
	case stateBreak:
		title = "🌿 Break Time"
	}

	styleTitle := lipgloss.NewStyle().Bold(true).MarginBottom(1)
	styleTime := lipgloss.NewStyle().Foreground(lipgloss.Color("205")).Bold(true)

	var remaining time.Duration

	if m.paused {
		remaining = m.totalDuration - (m.pausedAt.Sub(m.startTime) - m.accumulatedPause)
	} else {
		elapsed := time.Since(m.startTime) - m.accumulatedPause
		remaining = m.totalDuration - elapsed
	}

	if remaining < 0 {
		remaining = 0
	}

	status := "(p: pause/resume, s: stop, q: quit)"
	if m.paused {
		status = "⏸️ PAUSED — press p to resume | (s: stop, q: quit)"
	}

	view := lipgloss.JoinVertical(
		lipgloss.Left,
		styleTitle.Render(title),
		m.progress.View(),
		"",
		styleTime.Render(fmt.Sprintf("⏳ Remaining: %v", remaining.Truncate(time.Second))),
		"",
		status,
	)

	return tea.NewView(view)
}

/* ----------------------------- RUN ----------------------------- */

func RunTUI(work, rest int) {
	p := progress.New()
	m := model{
		workDuration:  time.Minute * time.Duration(work),
		breakDuration: time.Minute * time.Duration(rest),
		startTime:     time.Now(),
		totalDuration: time.Minute * time.Duration(work),
		state:         stateWork,
		progress:      p,
	}

	if _, err := tea.NewProgram(m).Run(); err != nil {
		fmt.Println("error:", err)
	}
}
