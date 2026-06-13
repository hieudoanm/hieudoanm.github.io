package gemini

import (
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	markdown "github.com/MichaelMure/go-term-markdown"
	"github.com/hieudoanm/api/core/gemini.google.com"
	"github.com/spf13/cobra"

	"charm.land/bubbles/v2/spinner"
	"charm.land/bubbles/v2/textarea"
	"charm.land/bubbles/v2/viewport"
	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"
)

type codeState int

const (
	codeStateChat codeState = iota
	codeStateLoading
)

type chatMessage struct {
	role    string
	content string
}

type codeModel struct {
	state codeState

	width, height int

	history  viewport.Model
	messages []gemini.Content
	display  []chatMessage

	input textarea.Model
	spin  spinner.Model

	waitingPrefix  bool
	tokenCount     int
	showCommands   bool
	thoughtStart   time.Time
	thoughtSeconds float64
}

type codeResultMsg struct {
	response *gemini.GenerateContentResponse
	err      error
}

var (
	dimColor  = lipgloss.Color("240")
	purpleClr = lipgloss.Color("99")
	greenClr  = lipgloss.Color("42")
	codeBg    = lipgloss.Color("233")

	labelUser = lipgloss.NewStyle().Foreground(purpleClr).Bold(true).Render
	labelAsst = lipgloss.NewStyle().Foreground(greenClr).Bold(true).Render
	labelErr  = lipgloss.NewStyle().Foreground(lipgloss.Color("196")).Bold(true).Render
	dimText   = lipgloss.NewStyle().Foreground(dimColor).Render
	bodyStyle = lipgloss.NewStyle().Foreground(lipgloss.Color("250"))
)

func codeInitialModel() codeModel {
	ti := textarea.New()
	ti.Placeholder = "Ask Gemini... (@ for files, ! for shell commands)"
	ti.Focus()
	ti.CharLimit = 5000
	ti.ShowLineNumbers = false
	ti.Prompt = ""
	ti.SetHeight(1)

	s := ti.Styles()
	s.Focused.Base = lipgloss.NewStyle().Background(codeBg)
	s.Focused.Text = lipgloss.NewStyle().Background(codeBg)
	s.Focused.CursorLine = lipgloss.NewStyle().Background(codeBg)
	s.Focused.Placeholder = lipgloss.NewStyle().Background(codeBg)
	s.Focused.Prompt = lipgloss.NewStyle().Background(codeBg).Foreground(codeBg)
	s.Focused.LineNumber = lipgloss.NewStyle().Background(codeBg)
	s.Focused.CursorLineNumber = lipgloss.NewStyle().Background(codeBg)
	s.Focused.EndOfBuffer = lipgloss.NewStyle().Background(codeBg)
	ti.SetStyles(s)

	vp := viewport.New(
		viewport.WithWidth(120),
		viewport.WithHeight(10),
	)

	sp := spinner.New()
	sp.Spinner = spinner.Dot

	m := codeModel{
		state:   codeStateChat,
		input:   ti,
		history: vp,
		spin:    sp,
		width:   120,
		height:  24,
	}
	m.refresh()
	return m
}

func (m codeModel) Init() tea.Cmd {
	return nil
}

func (m *codeModel) refresh() {
	var buf strings.Builder
	for _, msg := range m.display {
		buf.WriteString(m.formatMessage(msg))
		buf.WriteString("\n\n")
	}
	if m.state == codeStateLoading {
		thinkingStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("220"))
		buf.WriteString("  " + thinkingStyle.Render(m.spin.View()+" thinking..."))
	}
	m.history.SetContent(buf.String())
	m.history.GotoBottom()
}

func (m *codeModel) formatMessage(msg chatMessage) string {
	if msg.role == "thought" {
		return "  " + msg.content
	}
	var borderColor = dimColor
	switch msg.role {
	case "user":
		borderColor = lipgloss.Color("39")
	case "assistant":
		borderColor = greenClr
	case "error":
		borderColor = lipgloss.Color("196")
	}
	box := lipgloss.NewStyle().
		Background(codeBg).
		Padding(1, 1, 1, 2).
		Border(lipgloss.ThickBorder(), false, false, false, true).
		BorderForeground(borderColor).
		Width(m.width)
	return box.Render(bodyStyle.Render(msg.content))
}

func formatCodeBlock(lang, filename, code string) string {
	headerStyle := lipgloss.NewStyle().
		Background(lipgloss.Color("234")).
		Foreground(dimColor).
		Padding(0, 2)
	hl := headerStyle.Render(lang)
	if filename != "" {
		hl += dimText("  ") + headerStyle.Render(filename)
	}
	codeStyle := lipgloss.NewStyle().
		Background(codeBg).
		Foreground(lipgloss.Color("250")).
		Padding(0, 2)
	return hl + "\n" + codeStyle.Render(code)
}

func (m *codeModel) appendMessage(role, content string) {
	rendered := renderContent(content, m.width-4)
	m.display = append(m.display, chatMessage{role: role, content: rendered})
	m.refresh()
}

func renderContent(content string, width int) string {
	var blocks []string
	lines := strings.Split(content, "\n")
	inCode := false
	var codeBuf strings.Builder
	var lang, filename string

	flushCode := func() {
		if codeBuf.Len() == 0 {
			return
		}
		code := strings.TrimRight(codeBuf.String(), "\n")
		blocks = append(blocks, formatCodeBlock(lang, filename, code))
		codeBuf.Reset()
		lang = ""
		filename = ""
	}

	for _, line := range lines {
		if strings.HasPrefix(line, "```") && !inCode {
			inCode = true
			rest := strings.TrimSpace(strings.TrimPrefix(line, "```"))
			parts := strings.Fields(rest)
			if len(parts) > 0 {
				lang = parts[0]
				if len(parts) > 1 {
					filename = strings.Join(parts[1:], " ")
				}
			}
			continue
		}
		if strings.HasPrefix(line, "```") && inCode {
			inCode = false
			flushCode()
			continue
		}
		if inCode {
			codeBuf.WriteString(line + "\n")
		} else {
			blocks = append(blocks, line)
		}
	}
	if inCode {
		flushCode()
	}

	text := strings.Join(blocks, "\n")
	rendered := string(markdown.Render(text, width, 0))
	rendered = strings.ReplaceAll(rendered, "\x1b[0m", "\x1b[0;38;5;250;48;5;233m")
	return strings.TrimRight(rendered, "\n")
}

func (m *codeModel) appendUserMessage(text string) {
	m.messages = append(m.messages, gemini.Content{
		Role:  gemini.RoleUser,
		Parts: []gemini.Part{{Text: text}},
	})
	m.appendMessage("user", text)
}

func sendToGemini(model gemini.Model, messages []gemini.Content) tea.Cmd {
	return func() tea.Msg {
		apiKey := os.Getenv("GEMINI_API_KEY")
		if apiKey == "" {
			return codeResultMsg{err: fmt.Errorf("GEMINI_API_KEY not set")}
		}

		client := gemini.NewGeminiClient(apiKey)
		resp, err := client.GenerateContent(model, messages)
		if err != nil {
			return codeResultMsg{err: fmt.Errorf("API request: %w", err)}
		}

		if len(resp.Candidates) == 0 {
			return codeResultMsg{err: fmt.Errorf("no candidates returned")}
		}

		return codeResultMsg{response: resp}
	}
}

func (m codeModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.width = msg.Width
		m.height = msg.Height
		m.history.SetWidth(msg.Width)
		m.updateViewHeight(msg.Height)
		m.input.SetWidth(msg.Width - 4)
		return m, nil
	case tea.KeyMsg:
		switch m.state {
		case codeStateChat:
			if m.waitingPrefix {
				m.waitingPrefix = false
				switch msg.String() {
				case "q":
					return m, tea.Quit
				case "?":
					m.appendMessage("assistant", "Available commands:\n\n- /help  — Show help\n- /new   — Clear conversation\n- /undo  — Remove last exchange\n- /exit  — Quit\n\nKeys: enter to send, ctrl+x ? for help, ctrl+x q / esc / ctrl+c to quit")
					return m, nil
				default:
					return m, nil
				}
			}
			switch msg.String() {
			case "enter":
				text := strings.TrimSpace(m.input.Value())
				if text == "" {
					return m, nil
				}
				if strings.HasPrefix(text, "/") {
					m.handleSlash(text)
					m.input.Reset()
					return m, nil
				}
				m.appendUserMessage(text)
				m.input.Reset()
				m.state = codeStateLoading
				m.thoughtStart = time.Now()
				m.thoughtSeconds = 0
				return m, tea.Batch(
					m.spin.Tick,
					sendToGemini(gemini.Model25Flash, m.messages),
				)
			case "ctrl+x":
				m.waitingPrefix = true
				return m, nil
			case "esc", "ctrl+c":
				return m, tea.Quit
			}

		case codeStateLoading:
			if msg.String() == "esc" || msg.String() == "ctrl+c" {
				return m, tea.Quit
			}
		}
	}

	switch m.state {
	case codeStateChat:
		var cmds []tea.Cmd
		var cmd tea.Cmd
		m.input, cmd = m.input.Update(msg)
		cmds = append(cmds, cmd)
		m.showCommands = strings.HasPrefix(m.input.Value(), "/")
		m.updateViewHeight(m.height)
		m.history, cmd = m.history.Update(msg)
		cmds = append(cmds, cmd)
		return m, tea.Batch(cmds...)

	case codeStateLoading:
		switch msg := msg.(type) {
		case codeResultMsg:
			if msg.err != nil {
				m.state = codeStateChat
				m.thoughtSeconds = time.Since(m.thoughtStart).Seconds()
				thinkingStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("220"))
				thoughtMsg := chatMessage{role: "thought", content: thinkingStyle.Render(fmt.Sprintf("+ Thought: %.1f s", m.thoughtSeconds))}
				m.display = append(m.display, thoughtMsg)
				m.appendMessage("error", msg.err.Error())
				return m, nil
			}
			content := msg.response.Candidates[0].Content.Parts[0].Text
			m.messages = append(m.messages, gemini.Content{
				Role:  gemini.RoleModel,
				Parts: []gemini.Part{{Text: content}},
			})
			m.state = codeStateChat
			m.thoughtSeconds = time.Since(m.thoughtStart).Seconds()
			m.tokenCount = msg.response.UsageMetadata.TotalTokenCount
			thinkingStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("220"))
			thoughtMsg := chatMessage{role: "thought", content: thinkingStyle.Render(fmt.Sprintf("+ Thought: %.1f s", m.thoughtSeconds))}
			m.display = append(m.display, thoughtMsg)
			m.appendMessage("assistant", content)
			return m, nil
		}

		var cmd tea.Cmd
		m.spin, cmd = m.spin.Update(msg)
		m.refresh()
		var vpcmd tea.Cmd
		m.history, vpcmd = m.history.Update(msg)
		return m, tea.Batch(cmd, vpcmd)
	}

	return m, nil
}

func (m *codeModel) updateViewHeight(height int) {
	overhead := 7
	if m.showCommands {
		overhead = 11
	}
	m.history.SetHeight(height - overhead)
}

func (m *codeModel) handleSlash(cmd string) {
	switch cmd {
	case "/help":
		m.appendMessage("assistant", "Slash commands:\n- /help  — Show help\n- /new   — Clear conversation\n- /undo  — Remove last exchange\n- /exit  — Quit")
	case "/new":
		m.messages = nil
		m.display = nil
		m.refresh()
	case "/undo":
		if len(m.messages) >= 2 {
			m.messages = m.messages[:len(m.messages)-2]
		}
		if len(m.display) >= 1 {
			m.display = m.display[:len(m.display)-1]
		}
		m.refresh()
	case "/exit":
		os.Exit(0)
	default:
		m.appendMessage("error", "Unknown command: "+cmd+"\nTry /help")
	}
}

func (m codeModel) View() tea.View {
	body := m.history.View()

	inputLine := m.input.View()
	modelName := dimText("Gemini Flash 2.5 (gemini-2.5-flash)")
	promptRow := lipgloss.NewStyle().
		Background(codeBg).
		Padding(1, 1, 1, 2).
		Border(lipgloss.ThickBorder(), false, false, false, true).
		BorderForeground(purpleClr).
		Width(m.width).
		Render(inputLine + "\n\n" + modelName)
	chatHeader := dimText(fmt.Sprintf("%d messages", len(m.display)))
	statusConnected := lipgloss.NewStyle().Foreground(greenClr).Render("●") + dimText(" connected")
	exitKey := dimText("ctrl+x q to exit")
	helpKey := dimText("ctrl+x ? for help")

	statusLine := fmt.Sprintf("%s  ·  %s  ·  %s  ·  %s  ·  %s",
		statusConnected, dimText(fmt.Sprintf("%d tokens", m.tokenCount)), chatHeader, exitKey, helpKey)

	var commands string
	if strings.HasPrefix(m.input.Value(), "/") {
		cmdStyle := lipgloss.NewStyle().Background(codeBg).Padding(1, 1, 0, 2).Width(m.width)
		commands = cmdStyle.Render(
			dimText("/help  ")+"Show help"+"\n"+
				dimText("/new   ")+"Clear conversation"+"\n"+
				dimText("/undo  ")+"Remove last exchange"+"\n"+
				dimText("/exit  ")+"Quit",
		) + "\n"
	}

	v := tea.NewView(fmt.Sprintf(
		"%s\n\n%s%s\n\n%s",
		body,
		commands,
		promptRow,
		statusLine,
	))
	v.AltScreen = true
	v.MouseMode = tea.MouseModeCellMotion
	return v
}

var geminiCodeCmd = &cobra.Command{
	Use:   "code",
	Short: "Gemini-powered AI coding assistant",
	Long: `An interactive TUI coding assistant powered by Google Gemini.

Provides a chat interface with markdown rendering and code block support.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if _, err := tea.NewProgram(codeInitialModel()).Run(); err != nil {
			log.Fatal(err)
		}
		return nil
	},
}
