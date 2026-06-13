package system

import (
	"fmt"
	"time"

	tea "charm.land/bubbletea/v2"

	"github.com/hieudoanm/hieudoanm/libs/theme"
)

type sysTickMsg time.Time
type sysMetricsMsg SysMetrics

type sysModel struct {
	metrics    SysMetrics
	cpuHistory []float64
	ramHistory []float64
	width      int
	err        error
}

func (m sysModel) Init() tea.Cmd {
	return tea.Batch(sysFetchMetrics(), sysTickEvery())
}

func sysFetchMetrics() tea.Cmd {
	return func() tea.Msg {
		m, err := sysGatherMetrics()
		if err != nil {
			return err
		}
		return sysMetricsMsg(m)
	}
}

func sysTickEvery() tea.Cmd {
	return tea.Tick(time.Second, func(t time.Time) tea.Msg {
		return sysTickMsg(t)
	})
}

func (m sysModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {

	case tea.KeyMsg:
		if msg.String() == "q" || msg.String() == "ctrl+c" {
			return m, tea.Quit
		}

	case tea.WindowSizeMsg:
		m.width = msg.Width

	case sysMetricsMsg:
		m.metrics = SysMetrics(msg)
		m.cpuHistory = append(m.cpuHistory, m.metrics.CPUTotal)
		m.ramHistory = append(m.ramHistory, m.metrics.RAMPct)

	case sysTickMsg:
		return m, tea.Batch(sysFetchMetrics(), sysTickEvery())

	case error:
		m.err = msg
	}

	return m, nil
}

func (m sysModel) View() tea.View {
	if m.err != nil {
		return tea.NewView(theme.Error.Render("error: " + m.err.Error()))
	}

	uptime := time.Duration(m.metrics.Uptime) * time.Second

	content := fmt.Sprintf(
		"%s\nCPU: %.1f%%\nRAM: %.1f%%\nUptime: %s\n\nPress q to quit",
		theme.Title.Render("SYSTEM MONITOR"),
		m.metrics.CPUTotal,
		m.metrics.RAMPct,
		uptime.Truncate(time.Second),
	)

	return tea.NewView(content)
}
