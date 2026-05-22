// package cmd

package cmd

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/hieudoanm/hieudoanm/src/clients/chat"
	"github.com/spf13/cobra"

	markdown "github.com/MichaelMure/go-term-markdown"

	"charm.land/bubbles/v2/list"
	"charm.land/bubbles/v2/spinner"
	"charm.land/bubbles/v2/textarea"
	"charm.land/bubbles/v2/viewport"
	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"
)

type state int

const (
	stateSelectModel state = iota
	stateChat
	stateLoading
)

type item string

func (i item) Title() string       { return string(i) }
func (i item) Description() string { return "" }
func (i item) FilterValue() string { return string(i) }

type resultMsg struct {
	output string
	err    error
}

type chatModel struct {
	state state

	list        list.Model
	modelChoice string

	history  viewport.Model
	messages []string

	input textarea.Model
	spin  spinner.Model
}

// ---------------------------
// Styles
// ---------------------------

var (
	historyStyle = lipgloss.NewStyle().
			Border(lipgloss.RoundedBorder()).
			Padding(1, 1).
			Width(82)

	inputStyle = lipgloss.NewStyle().
			Border(lipgloss.RoundedBorder()).
			Padding(0, 1).
			Width(82)
)

// ---------------------------
// Init
// ---------------------------

type modelInfo struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Pricing struct {
		Prompt     string `json:"prompt"`
		Completion string `json:"completion"`
	} `json:"pricing"`
}

type modelsResponse struct {
	Data []modelInfo `json:"data"`
}

func fetchFreeModelNames() ([]string, error) {
	resp, err := http.Get("https://openrouter.ai/api/v1/models")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	var mr modelsResponse
	if err := json.NewDecoder(resp.Body).Decode(&mr); err != nil {
		return nil, err
	}
	var names []string
	for _, m := range mr.Data {
		if m.Pricing.Prompt == "0" && m.Pricing.Completion == "0" {
			names = append(names, m.Name)
		}
	}
	return names, nil
}

func initialModel() chatModel {
	modelNames, err := fetchFreeModelNames()
	if err != nil {
		log.Printf("failed to fetch models: %v", err)
		modelNames = []string{"gpt-3.5-turbo"} // fallback
	}
	items := make([]list.Item, len(modelNames))
	for i, name := range modelNames {
		items[i] = item(name)
	}

	l := list.New(items, list.NewDefaultDelegate(), 30, 10)
	l.Title = "Choose a model"
	l.SetShowHelp(false)

	ti := textarea.New()
	ti.Placeholder = "Type a message..."
	ti.Focus()
	ti.CharLimit = 5000
	ti.SetHeight(3)

	vp := viewport.New(
		viewport.WithWidth(80),
		viewport.WithHeight(20),
	)
	vp.SetContent("")

	sp := spinner.New()
	sp.Spinner = spinner.Dot

	return chatModel{
		state:   stateSelectModel,
		list:    l,
		input:   ti,
		history: vp,
		spin:    sp,
	}
}

// ---------------------------
// Commands
// ---------------------------

func generateCmd(modelChoice, text string) tea.Cmd {
	return func() tea.Msg {
		output, err := chat.Generate(modelChoice, text)
		return resultMsg{output: output, err: err}
	}
}

// ---------------------------
// Core
// ---------------------------

func (m chatModel) Init() tea.Cmd {
	return nil
}

func (m *chatModel) appendMessage(role, msg string) {
	rendered := markdown.Render(msg, 80, 6)
	entry := fmt.Sprintf("[%s]\n%s\n", strings.ToUpper(role), string(rendered))

	m.messages = append(m.messages, entry)
	m.history.SetContent(strings.Join(m.messages, "\n"))
	m.history.GotoBottom()
}

func (m chatModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch m.state {

	// ---------------------------
	case stateSelectModel:
		switch msg := msg.(type) {
		case tea.KeyMsg:
			switch msg.String() {
			case "enter":
				chosen := m.list.SelectedItem().(item)
				m.modelChoice = string(chosen)
				m.state = stateChat
				return m, nil

			case "q", "esc", "ctrl+c":
				return m, tea.Quit
			}
		}

		var cmd tea.Cmd
		m.list, cmd = m.list.Update(msg)
		return m, cmd

	// ---------------------------
	case stateChat:
		switch msg := msg.(type) {

		case tea.KeyMsg:
			switch msg.String() {

			case "enter":
				text := strings.TrimSpace(m.input.Value())
				if text == "" {
					return m, nil
				}

				m.appendMessage("user", text)
				m.input.Reset()

				m.state = stateLoading

				return m, tea.Batch(
					m.spin.Tick,
					generateCmd(m.modelChoice, text),
				)

			case "esc", "ctrl+c":
				return m, tea.Quit
			}
		}

		var cmds []tea.Cmd

		var cmd tea.Cmd
		m.input, cmd = m.input.Update(msg)
		cmds = append(cmds, cmd)

		m.history, cmd = m.history.Update(msg)
		cmds = append(cmds, cmd)

		return m, tea.Batch(cmds...)

	// ---------------------------
	case stateLoading:
		switch msg := msg.(type) {

		case resultMsg:
			if msg.err != nil {
				m.appendMessage("error", msg.err.Error())
			} else {
				m.appendMessage("assistant", msg.output)
			}

			m.state = stateChat
			return m, nil
		}

		// spinner keeps ticking
		var cmd tea.Cmd
		m.spin, cmd = m.spin.Update(msg)
		return m, cmd
	}

	return m, nil
}

// ---------------------------
// View
// ---------------------------

func (m chatModel) View() tea.View {
	switch m.state {

	case stateSelectModel:
		return tea.NewView(m.list.View())

	case stateLoading:
		return tea.NewView(fmt.Sprintf(
			"%s Generating response...\n\nPress esc to quit.",
			m.spin.View(),
		))

	case stateChat:
		return tea.NewView(fmt.Sprintf(
			"Model: %s\n\n%s\n\n%s\n\n(Enter to send, Esc to quit)",
			m.modelChoice,
			historyStyle.Render(m.history.View()),
			inputStyle.Render(m.input.View()),
		))
	}

	return tea.NewView("")
}

// ---------------------------
// Cobra
// ---------------------------

var openRouterChatCmd = &cobra.Command{
	Use:   "chat",
	Short: "Run the chat operation for the openrouter app",
	Run: func(cmd *cobra.Command, args []string) {
		if _, err := tea.NewProgram(initialModel()).Run(); err != nil {
			log.Fatal(err)
		}
	},
}

func init() {
	openrouterCmd.AddCommand(openRouterChatCmd)
}
