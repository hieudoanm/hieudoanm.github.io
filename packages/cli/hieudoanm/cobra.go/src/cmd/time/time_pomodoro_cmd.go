package time

import (
	"fmt"
	"time"

	"charm.land/bubbles/v2/progress"
	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"
	"github.com/spf13/cobra"
)

type pomodoroState int

const (
	stateWork pomodoroState = iota
	stateBreak
	stateDone
	stateStopped
)

type pomodoroModel struct {
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

type pomodoroTickMsg time.Time

func (m pomodoroModel) Init() tea.Cmd {
	return pomodoroTick()
}

func pomodoroTick() tea.Cmd {
	return tea.Tick(time.Second, func(t time.Time) tea.Msg {
		return pomodoroTickMsg(t)
	})
}

func (m pomodoroModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case pomodoroTickMsg:
		if m.paused || m.state == stateStopped {
			return m, pomodoroTick()
		}

		elapsed := time.Since(m.startTime) - m.accumulatedPause

		if elapsed >= m.totalDuration {
			if m.state == stateWork {
				m.state = stateBreak
				m.startTime = time.Now()
				m.accumulatedPause = 0
				m.totalDuration = m.breakDuration
				m.progress.SetPercent(0)
				return m, pomodoroTick()
			}

			m.state = stateDone
			m.quitting = true
			return m, tea.Quit
		}

		pct := float64(elapsed) / float64(m.totalDuration)
		m.progress.SetPercent(pct)

		return m, pomodoroTick()

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

func (m pomodoroModel) View() tea.View {
	if m.quitting {
		switch m.state {
		case stateDone:
			return tea.NewView("\n🎉 Pomodoro complete! Great job!\n\n")
		case stateStopped:
			return tea.NewView("\n⏹️ Pomodoro stopped.\n\n")
		}
	}

	var title string
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

func runPomodoroTUI(work, rest int) {
	p := progress.New()
	m := pomodoroModel{
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

func newPomodoroCmd() *cobra.Command {
	var work, rest int
	cmd := &cobra.Command{
		Use:   "pomodoro",
		Short: "Start a Pomodoro timer TUI session",
		Long:  `Launch a Bubble Tea TUI Pomodoro timer with configurable work and break durations. Press p to pause/resume, s to stop, q to quit.`,
		Example: `  time pomodoro
  time pomodoro --work 25 --rest 5`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Println("🍅 Launching Pomodoro TUI...")
			runPomodoroTUI(work, rest)
			return nil
		},
	}
	cmd.Flags().IntVarP(&work, "work", "w", 25, "work session minutes")
	cmd.Flags().IntVarP(&rest, "rest", "r", 5, "rest session minutes")
	return cmd
}
