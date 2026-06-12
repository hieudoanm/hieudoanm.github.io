package gemini

import (
	"fmt"
	"log"
	"os"
	"strings"

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
	ti.SetHeight(1)

	s := ti.Styles()
	s.Focused.Base = lipgloss.NewStyle().Background(lipgloss.Color("0"))
	s.Focused.Text = lipgloss.NewStyle().Background(lipgloss.Color("0"))
	s.Focused.CursorLine = lipgloss.NewStyle().Background(lipgloss.Color("0"))
	s.Focused.Placeholder = lipgloss.NewStyle().Background(lipgloss.Color("0"))
	s.Focused.Prompt = lipgloss.NewStyle().Background(lipgloss.Color("0"))
	s.Focused.LineNumber = lipgloss.NewStyle().Background(lipgloss.Color("0"))
	s.Focused.CursorLineNumber = lipgloss.NewStyle().Background(lipgloss.Color("0"))
	s.Focused.EndOfBuffer = lipgloss.NewStyle().Background(lipgloss.Color("0"))
	ti.SetStyles(s)

	vp := viewport.New(
		viewport.WithWidth(80),
		viewport.WithHeight(10),
	)

	sp := spinner.New()
	sp.Spinner = spinner.Dot

	m := codeModel{
		state:   codeStateChat,
		input:   ti,
		history: vp,
		spin:    sp,
		width:   80,
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
	for i, msg := range m.display {
		if i > 0 {
			buf.WriteString("\n")
		}
		buf.WriteString(formatMessage(msg))
	}
	m.history.SetContent(buf.String())
	m.history.GotoBottom()
}

func formatMessage(msg chatMessage) string {
	var roleLabel string
	switch msg.role {
	case "user":
		roleLabel = labelUser("USER")
	case "assistant":
		roleLabel = labelAsst("ASSISTANT")
	case "error":
		roleLabel = labelErr("ERROR")
	default:
		roleLabel = dimText(msg.role)
	}
	inner := roleLabel + "\n" + bodyStyle.Render(msg.content)
	box := lipgloss.NewStyle().
		Background(codeBg).
		Border(lipgloss.RoundedBorder()).
		BorderForeground(lipgloss.Color("236")).
		Padding(0, 2)
	return box.Render(inner)
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
	rendered := renderContent(content, m.width-6)
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
	rendered := string(markdown.Render(text, width, 6))
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
		m.history.SetHeight(msg.Height - 14)
		m.input.SetWidth(msg.Width - 20)
		return m, nil
	case tea.KeyMsg:
		switch m.state {
		case codeStateChat:
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
				return m, tea.Batch(
					m.spin.Tick,
					sendToGemini(gemini.Model25Flash, m.messages),
				)
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
		m.history, cmd = m.history.Update(msg)
		cmds = append(cmds, cmd)
		return m, tea.Batch(cmds...)

	case codeStateLoading:
		switch msg := msg.(type) {
		case codeResultMsg:
			if msg.err != nil {
				m.appendMessage("error", msg.err.Error())
				m.state = codeStateChat
				return m, nil
			}
			content := msg.response.Candidates[0].Content.Parts[0].Text
			m.messages = append(m.messages, gemini.Content{
				Role:  gemini.RoleModel,
				Parts: []gemini.Part{{Text: content}},
			})
			m.appendMessage("assistant", content)
			m.state = codeStateChat
			return m, nil
		}

		var cmd tea.Cmd
		m.spin, cmd = m.spin.Update(msg)
		return m, cmd
	}

	return m, nil
}

func (m *codeModel) handleSlash(cmd string) {
	switch cmd {
	case "/help":
		m.appendMessage("assistant", "Slash commands:\n  /help  - Show this help\n  /new   - Clear conversation\n  /undo  - Remove last exchange\n  /exit  - Quit")
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
	titleBg := lipgloss.NewStyle().Background(lipgloss.Color("234"))
	var titlebar string
	{
		red := lipgloss.NewStyle().Foreground(lipgloss.Color("196")).Render("●")
		yel := lipgloss.NewStyle().Foreground(lipgloss.Color("220")).Render("●")
		grn := lipgloss.NewStyle().Foreground(lipgloss.Color("42")).Render("●")
		dots := red + " " + yel + " " + grn

		title := lipgloss.NewStyle().Foreground(dimColor).Render("opencode — gemini-2.5-flash")
		right := dimText("ctrl+x ?  help")
		bar := "  " + dots + "   " + title + "  "
		bar = titleBg.Render(bar)
		barWidth := m.width - lipgloss.Width(bar) - lipgloss.Width(right) - 4
		if barWidth < 0 {
			barWidth = 0
		}
		titlebar = bar + dimText(strings.Repeat(" ", barWidth)) + "  " + right
	}

	chatHeader := dimText("current session  ·  ") + dimText(fmt.Sprintf("%d messages", len(m.display)))

	var body string
	switch m.state {
	case codeStateLoading:
		body = "  " + dimText(m.spin.View()+" thinking...")
	default:
		body = m.history.View()
	}

	rowContent := lipgloss.NewStyle().Foreground(purpleClr).Bold(true).PaddingLeft(2).Render(">") + " " + m.input.View()
	rowWidth := lipgloss.Width(rowContent)
	if rowWidth < m.width {
		rowContent += strings.Repeat(" ", m.width-rowWidth)
	}
	promptRow := lipgloss.NewStyle().Background(lipgloss.Color("0")).Render(rowContent)
	keyHint := dimText("ctrl+j")
	sendStyle := lipgloss.NewStyle().Background(purpleClr).Foreground(lipgloss.Color("0")).Padding(0, 1).Render(" send ")

	statusConnected := lipgloss.NewStyle().Foreground(greenClr).Render("●") + dimText(" connected")
	cwd := dimText(osGetCwd())
	exitHint := dimText("ctrl+x q to exit  ·  ctrl+x ? for help")

	return tea.NewView(fmt.Sprintf(
		"%s\n  %s\n\n%s\n\n  %s\n  %s  %s\n\n  %s  %s  %s   %s",
		titlebar,
		chatHeader,
		body,
		"  "+dimText("/help")+"  "+dimText("/new")+"  "+dimText("/undo")+"  "+dimText("/exit"),
		promptRow, keyHint+"  "+sendStyle,
		statusConnected, cwd, dimText("0 tokens"), exitHint,
	))
}

func osGetCwd() string {
	wd, err := os.Getwd()
	if err != nil {
		return "?"
	}
	home, _ := os.UserHomeDir()
	if strings.HasPrefix(wd, home) {
		return "~" + strings.TrimPrefix(wd, home)
	}
	return wd
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
