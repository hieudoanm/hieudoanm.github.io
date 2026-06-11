package statuspkg

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"charm.land/bubbles/v2/spinner"
	"charm.land/bubbles/v2/viewport"
	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"
	"github.com/hieudoanm/hieudoanm/libs/colors"
	"github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/hieudoanm/hieudoanm/libs/theme"
	"github.com/spf13/cobra"
)

var Services = map[string]map[string]string{
	"atlassian": {
		"analytics":               "https://analytics.status.atlassian.com/api/v2/status.json",
		"atlas":                   "https://atlas.status.atlassian.com/api/v2/status.json",
		"compass":                 "https://compass.status.atlassian.com/api/v2/status.json",
		"confluence":              "https://confluence.status.atlassian.com/api/v2/status.json",
		"developer":               "https://developer.status.atlassian.com/api/v2/status.json",
		"guard":                   "https://guard.status.atlassian.com/api/v2/status.json",
		"jira-service-management": "https://jira-service-management.status.atlassian.com/api/v2/status.json",
		"jira-software":           "https://jira-software.status.atlassian.com/api/v2/status.json",
		"opsgenie":                "https://opsgenie.status.atlassian.com/api/v2/status.json",
		"partners":                "https://partners.status.atlassian.com/api/v2/status.json",
		"support":                 "https://support.status.atlassian.com/api/v2/status.json",
		"trello":                  "https://trello.status.atlassian.com/api/v2/status.json",
	},
	"crypto": {
		"hedera":  "https://status.hedera.com/api/v2/status.json",
		"polygon": "https://status.polygon.technology/api/v2/status.json",
		"solana":  "https://status.solana.com/api/v2/status.json",
	},
	"serverless": {
		"cloudflare": "https://www.cloudflarestatus.com/api/v2/status.json",
		"flyio":      "https://status.flyio.net/api/v2/status.json",
		"netlify":    "https://www.netlifystatus.com/api/v2/status.json",
		"render":     "https://status.render.com/api/v2/status.json",
		"supabase":   "https://status.supabase.com/api/v2/status.json",
		"vercel":     "https://www.vercel-status.com/api/v2/status.json",
	},
	"saas": {
		"bitbucket": "https://bitbucket.status.atlassian.com/api/v2/status.json",
		"github":    "https://www.githubstatus.com/api/v2/status.json",
		"npm":       "https://status.npmjs.org/api/v2/status.json",
		"canva":     "https://www.canvastatus.com/api/v2/status.json",
		"figma":     "https://status.figma.com/api/v2/status.json",
	},
}

type Page struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	Url       string `json:"url"`
	TimeZone  string `json:"time_zone"`
	UpdatedAt string `json:"updated_at"`
}

type Status struct {
	Indicator   string `json:"indicator"`
	Description string `json:"description"`
}

type Response struct {
	Page   Page   `json:"page"`
	Status Status `json:"status"`
}

func GetStatus(url string, debug bool) (Response, error) {
	responseByte, err := requests.Get(url, requests.Options{Debug: debug})
	if err != nil {
		return Response{}, err
	}
	var response Response
	if err := json.Unmarshal(responseByte, &response); err != nil {
		return Response{}, err
	}
	return response, nil
}

func PrintFullStatus(url string, debug bool) {
	resp, err := GetStatus(url, debug)
	if err != nil {
		log.Printf("[%s] %s\n", time.Now().Format(time.RFC3339), colors.Red("Error: "+err.Error()))
		return
	}

	timestamp := time.Now().Format(time.RFC3339)
	border := colors.Blue(fmt.Sprintf("==================== STATUS PAGE ==================== [%s]", timestamp))

	fmt.Println(border)
	fmt.Printf("%sPage Name    :%s %s\n", colors.Cyan(""), "", resp.Page.Name)
	fmt.Printf("%sPage ID      :%s %s\n", colors.Cyan(""), "", resp.Page.Id)
	fmt.Printf("%sURL          :%s %s\n", colors.Cyan(""), "", resp.Page.Url)
	fmt.Printf("%sTime Zone    :%s %s\n", colors.Cyan(""), "", resp.Page.TimeZone)
	fmt.Printf("%sUpdated At   :%s %s\n", colors.Cyan(""), "", resp.Page.UpdatedAt)
	fmt.Printf("%sIndicator    :%s %s\n", colors.Green(""), "", resp.Status.Indicator)
	fmt.Printf("%sDescription  :%s %s\n", colors.Yellow(""), "", resp.Status.Description)
	fmt.Println(border)
}

func GetDescriptiveStatus(name string, url string, debug bool) string {
	resp, err := GetStatus(url, debug)
	if err != nil {
		return colors.Red("Error: " + err.Error())
	}
	if resp.Status.Indicator == "none" {
		return "Healthy"
	}
	return "Offline"
}

func PrintDescriptiveStatus(name string, url string, debug bool) {
	resp, err := GetStatus(url, debug)
	if err != nil {
		log.Printf("[%s] %s\n", time.Now().Format(time.RFC3339), colors.Red("Error: "+err.Error()))
		return
	}
	timestamp := time.Now().Format(time.RFC3339)
	fmt.Printf("[%s] %s%s : %s%s\n", timestamp, colors.Yellow(""), name, resp.Status.Description, "")
}

type ServiceStatus struct {
	Name   string
	URL    string
	Output string
}

type statusMsg ServiceStatus

type model struct {
	services []ServiceStatus
	cursor   int
	width    int
	height   int
	viewport viewport.Model
	loading  bool
	checked  int
	total    int
	spinner  spinner.Model
}

func (m model) Init() tea.Cmd {
	return tea.Batch(
		m.spinner.Tick,
		fetchStatuses(m.services),
	)
}

func fetchStatuses(services []ServiceStatus) tea.Cmd {
	return func() tea.Msg {
		if len(services) == 0 {
			return nil
		}
		s := services[0]
		out := GetDescriptiveStatus(s.Name, s.URL, debug)
		return statusMsg(ServiceStatus{
			Name:   s.Name,
			URL:    s.URL,
			Output: out,
		})
	}
}

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

func statusDot(output string) string {
	l := strings.ToLower(output)
	switch {
	case strings.Contains(l, "healthy"),
		strings.Contains(l, "up"),
		strings.Contains(l, "ok"):
		return theme.GreenDot
	case strings.Contains(l, "down"),
		strings.Contains(l, "error"),
		strings.Contains(l, "fail"):
		return theme.RedDot
	default:
		return theme.YellowDot
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
			b.WriteString(theme.SelectedRow.Render(row))
		} else {
			b.WriteString(theme.Row.Render(row))
		}
		b.WriteRune('\n')
	}
	return b.String()
}

func (m model) View() tea.View {
	if m.loading {
		return tea.NewView(theme.Box.Render(fmt.Sprintf(
			"%s Checking services... (%d/%d)",
			m.spinner.View(),
			m.checked,
			m.total,
		)))
	}

	header := theme.Header.Render("Service Status")
	body := m.viewport.View()
	footer := theme.Footer.Render(fmt.Sprintf(
		"\u2191/\u2193 Navigate \u2022 q Quit \u2022 %d services",
		len(m.services),
	))

	layout := lipgloss.JoinVertical(
		lipgloss.Left,
		header,
		body,
		footer,
	)

	return tea.NewView(
		theme.Box.
			Width(m.width - 2).
			Height(m.height - 2).
			Render(layout),
	)
}

var debug bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "status",
		Short: "Check the uptime status of cloud services",
		Long:  `Check and display the current operational status of various cloud services including Atlassian, GitHub, Vercel, and more via a Bubble Tea TUI.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			var services []ServiceStatus
			for _, servicesByGroup := range Services {
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
			return nil
		},
	}

	cmd.Flags().BoolVarP(&debug, "debug", "d", false, "Enable debug logging")
	return cmd
}
