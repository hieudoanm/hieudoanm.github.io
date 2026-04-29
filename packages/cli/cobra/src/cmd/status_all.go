package cmd

import (
	"fmt"
	"os"
	"strings"

	"github.com/hieudoanm/hieudoanm/src/configs"
	"github.com/hieudoanm/hieudoanm/src/services/status"

	"charm.land/bubbles/v2/spinner"
	"charm.land/bubbles/v2/viewport"
	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"

	"github.com/spf13/cobra"
)

var debug bool

/* ---------------- Styles ---------------- */

var (
	boxStyle = lipgloss.NewStyle().
			Border(lipgloss.RoundedBorder()).
			Padding(0, 1).
			BorderForeground(lipgloss.Color("62"))

	headerStyle = lipgloss.NewStyle().
			Bold(true).
			Foreground(lipgloss.Color("205")).
			Padding(0, 1)

	footerStyle = lipgloss.NewStyle().
			Foreground(lipgloss.Color("241")).
			Padding(0, 1)

	rowStyle = lipgloss.NewStyle().Padding(0, 1)

	selectedRowStyle = lipgloss.NewStyle().
				Padding(0, 1).
				Background(lipgloss.Color("62")).
				Foreground(lipgloss.Color("230")).
				Bold(true)

	greenDot  = lipgloss.NewStyle().Foreground(lipgloss.Color("42")).Render("●")
	redDot    = lipgloss.NewStyle().Foreground(lipgloss.Color("196")).Render("●")
	yellowDot = lipgloss.NewStyle().Foreground(lipgloss.Color("226")).Render("●")
)

/* ---------------- Model ---------------- */

type ServiceStatus struct {
	Name   string
	URL    string
	Output string
}

type statusMsg ServiceStatus

type model struct {
	services []ServiceStatus
	cursor   int

	width  int
	height int

	viewport viewport.Model

	loading bool
	checked int
	total   int
	spinner spinner.Model
}

/* ---------------- Init ---------------- */

func (m model) Init() tea.Cmd {
	return tea.Batch(
		m.spinner.Tick,
		fetchStatuses(m.services),
	)
}

/* ---------------- Fetch ---------------- */

func fetchStatuses(services []ServiceStatus) tea.Cmd {
	return func() tea.Msg {
		if len(services) == 0 {
			return nil
		}

		s := services[0]

		out := status.GetDescriptiveStatus(s.Name, s.URL, debug)

		return statusMsg(ServiceStatus{
			Name:   s.Name,
			URL:    s.URL,
			Output: out,
		})
	}
}

/* ---------------- Update ---------------- */

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {

	case tea.WindowSizeMsg:

		m.width = msg.Width
		m.height = msg.Height

		headerH := 1
		footerH := 1
		boxPadding := 2

		vpHeight := m.height - headerH - footerH - boxPadding - 4
		if vpHeight < 5 {
			vpHeight = 5
		}

		m.viewport = viewport.New(
			viewport.WithWidth(m.width-6),
			viewport.WithHeight(vpHeight),
		)

		m.viewport.SetContent(m.renderRows())
		return m, nil

	case spinner.TickMsg:
		var cmd tea.Cmd
		m.spinner, cmd = m.spinner.Update(msg)
		return m, cmd

	case statusMsg:

		m.services[m.checked].Output = msg.Output
		m.checked++

		if m.checked == m.total {
			m.loading = false
			m.viewport.SetContent(m.renderRows())
			return m, nil
		}

		m.viewport.SetContent(m.renderRows())
		return m, fetchStatuses(m.services[m.checked:])

	case tea.KeyMsg:

		switch msg.String() {

		case "ctrl+c", "q":
			return m, tea.Quit

		case "up", "k":
			if m.cursor > 0 {
				m.cursor--
				m.syncScroll()
			}

		case "down", "j":
			if m.cursor < len(m.services)-1 {
				m.cursor++
				m.syncScroll()
			}
		}
	}

	return m, nil
}

/* ---------------- Scroll Sync ---------------- */

func (m *model) syncScroll() {
	offset := m.viewport.YOffset()
	height := m.viewport.Height()

	if m.cursor < offset {
		m.viewport.SetYOffset(m.cursor)
		return
	}

	if m.cursor >= offset+height {
		m.viewport.SetYOffset(m.cursor - height + 1)
	}
}

/* ---------------- Helpers ---------------- */

func statusDot(output string) string {
	l := strings.ToLower(output)

	switch {
	case strings.Contains(l, "healthy"),
		strings.Contains(l, "up"),
		strings.Contains(l, "ok"):
		return greenDot
	case strings.Contains(l, "down"),
		strings.Contains(l, "error"),
		strings.Contains(l, "fail"):
		return redDot
	default:
		return yellowDot
	}
}

func renderRow(name, status string, width int) string {
	left := name
	right := statusDot(status) + " " + status

	gap := width - lipgloss.Width(left) - lipgloss.Width(right) - 2
	if gap < 1 {
		gap = 1
	}

	return left + strings.Repeat(" ", gap) + right
}

func (m model) renderRows() string {
	var b strings.Builder

	for i, svc := range m.services {

		row := renderRow(svc.Name, svc.Output, m.viewport.Width())

		if i == m.cursor {
			b.WriteString(selectedRowStyle.Render(row))
		} else {
			b.WriteString(rowStyle.Render(row))
		}

		b.WriteRune('\n')
	}

	return b.String()
}

/* ---------------- View (v2 FIXED) ---------------- */

func (m model) View() tea.View {

	if m.loading {
		return tea.NewView(boxStyle.Render(fmt.Sprintf(
			"%s Checking services... (%d/%d)",
			m.spinner.View(),
			m.checked,
			m.total,
		)))
	}

	header := headerStyle.Render("Service Status")

	body := m.viewport.View()

	footer := footerStyle.Render(fmt.Sprintf(
		"↑/↓ Navigate • q Quit • %d services",
		len(m.services),
	))

	layout := lipgloss.JoinVertical(
		lipgloss.Left,
		header,
		body,
		footer,
	)

	return tea.NewView(
		boxStyle.
			Width(m.width - 2).
			Height(m.height - 2).
			Render(layout),
	)
}

/* ---------------- Cobra ---------------- */

var statusAllCmd = &cobra.Command{
	Use:   "all",
	Short: "Run the all operation for the status app",
	Run: func(cmd *cobra.Command, args []string) {

		var services []ServiceStatus

		for _, servicesByGroup := range configs.Services {
			for name, url := range servicesByGroup {
				services = append(services, ServiceStatus{
					Name: name,
					URL:  url,
				})
			}
		}

		sp := spinner.New()
		sp.Spinner = spinner.Dot

		m := model{
			services: services,
			loading:  true,
			total:    len(services),
			spinner:  sp,
		}

		if _, err := tea.NewProgram(m).Run(); err != nil {
			fmt.Println("Error running TUI:", err)
			os.Exit(1)
		}
	},
}

func init() {
	statusCmd.AddCommand(statusAllCmd)

	statusAllCmd.Flags().BoolVarP(&debug, "debug", "d", false, "Enable debug logging")
}
