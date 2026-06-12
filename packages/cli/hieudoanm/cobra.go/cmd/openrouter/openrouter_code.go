package openrouter

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/spf13/cobra"

	markdown "github.com/MichaelMure/go-term-markdown"

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
	codeStateToolConfirm
	codeStateModelPicker
)

type chatMessage struct {
	role    string
	content string
}

type codeModel struct {
	state codeState

	width, height int
	modelChoice   string

	history  viewport.Model
	messages []map[string]interface{}
	display  []chatMessage

	input textarea.Model
	spin  spinner.Model

	pendingToolCalls []map[string]interface{}
	pendingText      string

	models        []Model
	modelPickerID string
}

type codeResultMsg struct {
	response map[string]interface{}
	err      error
}

type probeResultMsg struct {
	results []ProbeResult
	modelID string
}

var codeModelFlag string

var (
	dimColor  = lipgloss.Color("240")
	purpleClr = lipgloss.Color("99")
	purpleDim = lipgloss.Color("141")
	greenClr  = lipgloss.Color("42")
	amberClr  = lipgloss.Color("214")
	codeBg    = lipgloss.Color("233")

	labelUser = lipgloss.NewStyle().Foreground(purpleClr).Bold(true).Render
	labelAsst = lipgloss.NewStyle().Foreground(greenClr).Bold(true).Render
	labelTool = lipgloss.NewStyle().Foreground(amberClr).Bold(true).Render
	labelErr  = lipgloss.NewStyle().Foreground(lipgloss.Color("196")).Bold(true).Render
	dimText   = lipgloss.NewStyle().Foreground(dimColor).Render
	bodyStyle = lipgloss.NewStyle().Foreground(lipgloss.Color("250"))
)

func toolDefinitions() []map[string]interface{} {
	return []map[string]interface{}{
		{
			"type": "function",
			"function": map[string]interface{}{
				"name":        "read_file",
				"description": "Read the contents of a file at the given path",
				"parameters": map[string]interface{}{
					"type": "object",
					"properties": map[string]interface{}{
						"path": map[string]interface{}{"type": "string", "description": "Absolute path to the file"},
					},
					"required": []string{"path"},
				},
			},
		},
		{
			"type": "function",
			"function": map[string]interface{}{
				"name":        "write_file",
				"description": "Write content to a file (creates or overwrites)",
				"parameters": map[string]interface{}{
					"type": "object",
					"properties": map[string]interface{}{
						"path":    map[string]interface{}{"type": "string", "description": "Absolute path to the file"},
						"content": map[string]interface{}{"type": "string", "description": "Full content to write"},
					},
					"required": []string{"path", "content"},
				},
			},
		},
		{
			"type": "function",
			"function": map[string]interface{}{
				"name":        "edit_file",
				"description": "Replace exact text in a file (for surgical edits)",
				"parameters": map[string]interface{}{
					"type": "object",
					"properties": map[string]interface{}{
						"path":       map[string]interface{}{"type": "string", "description": "Absolute path to the file"},
						"old_string": map[string]interface{}{"type": "string", "description": "The exact text to replace"},
						"new_string": map[string]interface{}{"type": "string", "description": "The replacement text"},
					},
					"required": []string{"path", "old_string", "new_string"},
				},
			},
		},
		{
			"type": "function",
			"function": map[string]interface{}{
				"name":        "run_bash",
				"description": "Execute a bash command and return its output",
				"parameters": map[string]interface{}{
					"type": "object",
					"properties": map[string]interface{}{
						"command": map[string]interface{}{"type": "string", "description": "The bash command to run"},
						"workdir": map[string]interface{}{"type": "string", "description": "Working directory (default: current dir)"},
					},
					"required": []string{"command"},
				},
			},
		},
	}
}

func codeInitialModel(model string) codeModel {
	ti := textarea.New()
	ti.Placeholder = "Ask opencode... (@ for files, ! for shell commands)"
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
		state:       codeStateChat,
		input:       ti,
		history:     vp,
		spin:        sp,
		modelChoice: model,
		messages:    codeInitMessages(),
		width:       80,
		height:      24,
	}
	m.refresh()
	return m
}

func codeInitMessages() []map[string]interface{} {
	return []map[string]interface{}{
		{
			"role": "system",
			"content": `You are a coding assistant integrated into the hieudoanm CLI toolbox.

You have access to tools that let you read, write, and edit files, and run bash commands.

Rules:
- Always read a file before editing it.
- Use exact string matching for edit_file.
- When the user asks you to make changes, first read the relevant files, then make the edits.
- After making edits, verify the result (e.g. build/test the project).
- Be concise in your responses.`,
		},
	}
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
	case "tool":
		roleLabel = labelTool("TOOL")
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
	m.messages = append(m.messages, map[string]interface{}{
		"role":    "user",
		"content": text,
	})
	m.appendMessage("user", text)
}

func sendToAPI(model string, messages []map[string]interface{}, tools []map[string]interface{}) tea.Cmd {
	return func() tea.Msg {
		payload := map[string]interface{}{
			"model":    model,
			"messages": messages,
			"tools":    tools,
		}

		apiKey := resolveKey()
		if apiKey == "" {
			return codeResultMsg{err: fmt.Errorf("OpenRouter API key not set")}
		}

		body, err := requests.Post(BaseURL+"/chat/completions", requests.Options{
			Body: payload,
			Header: map[string][]string{
				"Authorization": {"Bearer " + apiKey},
				"HTTP-Referer":  {"https://github.com/hieudoanm/hieudoanm"},
				"X-Title":       {"hieudoanm"},
			},
		})
		if err != nil {
			return codeResultMsg{err: fmt.Errorf("API request: %w", err)}
		}

		var result map[string]interface{}
		if err := json.Unmarshal(body, &result); err != nil {
			return codeResultMsg{err: fmt.Errorf("parse response: %w", err)}
		}

		if errText, ok := result["error"].(map[string]interface{}); ok {
			errJSON, _ := json.MarshalIndent(errText, "", "  ")
			return codeResultMsg{err: fmt.Errorf("API error:\n%s", string(errJSON))}
		}
		if errStr, ok := result["error"].(string); ok {
			fullResp, _ := json.MarshalIndent(result, "", "  ")
			return codeResultMsg{err: fmt.Errorf("API error: %s\nFull response:\n%s", errStr, string(fullResp))}
		}

		return codeResultMsg{response: result}
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
					cmd := m.handleSlash(text)
					m.input.Reset()
					return m, cmd
				}
				m.appendUserMessage(text)
				m.input.Reset()
				m.state = codeStateLoading
				return m, tea.Batch(
					m.spin.Tick,
					sendToAPI(m.modelChoice, m.messages, toolDefinitions()),
				)
			case "esc", "ctrl+c":
				return m, tea.Quit
			}

		case codeStateLoading:
			if msg.String() == "esc" || msg.String() == "ctrl+c" {
				return m, tea.Quit
			}

		case codeStateToolConfirm:
			switch msg.String() {
			case "y", "Y":
				var results []map[string]interface{}
				for _, tc := range m.pendingToolCalls {
					fn := tc["function"].(map[string]interface{})
					name := fn["name"].(string)
					var args map[string]interface{}
					json.Unmarshal([]byte(fn["arguments"].(string)), &args)

					var toolOutput string
					switch name {
					case "read_file":
						toolOutput = toolReadFile(args["path"].(string))
					case "write_file":
						toolOutput = toolWriteFile(args["path"].(string), args["content"].(string))
					case "edit_file":
						toolOutput = toolEditFile(args["path"].(string), args["old_string"].(string), args["new_string"].(string))
					case "run_bash":
						workdir, _ := args["workdir"].(string)
						toolOutput = toolRunBash(args["command"].(string), workdir)
					default:
						toolOutput = fmt.Sprintf("unknown tool: %s", name)
					}

					results = append(results, map[string]interface{}{
						"role":         "tool",
						"content":      toolOutput,
						"tool_call_id": tc["id"].(string),
					})
				}

				m.messages = append(m.messages, results...)

				if m.pendingText != "" {
					m.appendMessage("assistant", m.pendingText)
					m.pendingText = ""
				}

				m.pendingToolCalls = nil
				m.state = codeStateLoading
				return m, tea.Batch(
					m.spin.Tick,
					sendToAPI(m.modelChoice, m.messages, toolDefinitions()),
				)

			case "n", "N":
				for _, tc := range m.pendingToolCalls {
					m.messages = append(m.messages, map[string]interface{}{
						"role":         "tool",
						"content":      "User declined to run this tool call",
						"tool_call_id": tc["id"].(string),
					})
				}
				if m.pendingText != "" {
					m.appendMessage("assistant", m.pendingText)
					m.pendingText = ""
				}
				m.pendingToolCalls = nil
				m.state = codeStateLoading
				return m, tea.Batch(
					m.spin.Tick,
					sendToAPI(m.modelChoice, m.messages, toolDefinitions()),
				)

			case "esc", "ctrl+c":
				return m, tea.Quit
			}

		case codeStateModelPicker:
			switch msg.String() {
			case "enter":
				text := strings.TrimSpace(m.input.Value())
				m.input.Reset()
				var idx int
				if n, _ := fmt.Sscanf(text, "%d", &idx); n == 1 {
					m.switchModel(idx)
				} else {
					m.appendMessage("error", "Enter a number from the model list above.")
				}
				return m, nil
			case "esc":
				m.state = codeStateChat
				m.input.Reset()
				return m, nil
			}
		}

	case probeResultMsg:
		var ok, rl, restricted, errs int
		for _, r := range msg.results {
			switch r.Status {
			case StatusOK:
				ok++
			case StatusRateLimited:
				rl++
			case StatusRestricted:
				restricted++
			case StatusError:
				errs++
			}
		}
		var buf strings.Builder
		buf.WriteString("Probe results:\n")
		buf.WriteString(fmt.Sprintf("  ✔ %d OK  ⚡ %d rate-limited  🔒 %d restricted  ✖ %d errors\n\n", ok, rl, restricted, errs))

		for _, r := range msg.results {
			line := fmt.Sprintf("  %s %s", statusIcon(r.Status), r.Model.ID)
			if r.Status == StatusOK {
				line += fmt.Sprintf("  %dms", r.Latency)
			}
			line += "  \n"
			buf.WriteString(line)
			if r.Status == StatusError && r.Message != "" {
				errMsg := r.Message
				if len(errMsg) > 60 {
					errMsg = errMsg[:57] + "..."
				}
				buf.WriteString(fmt.Sprintf("     %s  \n", errMsg))
			}
		}
		m.appendMessage("assistant", buf.String())
		return m, nil
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

	case codeStateModelPicker:
		var cmd tea.Cmd
		m.input, cmd = m.input.Update(msg)
		return m, cmd

	case codeStateLoading:
		switch msg := msg.(type) {
		case codeResultMsg:
			if msg.err != nil {
				m.appendMessage("error", msg.err.Error())
				m.state = codeStateChat
				return m, nil
			}
			choice := msg.response["choices"].([]interface{})[0].(map[string]interface{})
			finishReason := choice["finish_reason"].(string)
			assistantMsg := choice["message"].(map[string]interface{})

			m.messages = append(m.messages, assistantMsg)

			if text, ok := assistantMsg["content"].(string); ok && text != "" {
				m.pendingText = text
			}

			if finishReason == "tool_calls" || assistantMsg["tool_calls"] != nil {
				tc := assistantMsg["tool_calls"].([]interface{})
				m.pendingToolCalls = make([]map[string]interface{}, len(tc))
				for i, t := range tc {
					m.pendingToolCalls[i] = t.(map[string]interface{})
				}
				m.state = codeStateToolConfirm
				return m, nil
			}

			content := ""
			if c, ok := assistantMsg["content"].(string); ok {
				content = c
			}
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

func (m *codeModel) handleSlash(cmd string) tea.Cmd {
	parts := strings.Fields(cmd)
	base := parts[0]

	switch base {
	case "/help":
		m.appendMessage("assistant", "Slash commands:\n  /help     - Show this help\n  /models   - List available models\n  /model N  - Switch to model by number\n  /probe    - Probe models for availability\n  /new      - Clear conversation\n  /undo     - Remove last exchange\n  /exit     - Quit")
	case "/models":
		models, err := FetchFreeModels()
		if err != nil {
			m.appendMessage("error", "Failed to fetch models: "+err.Error())
			return nil
		}
		m.models = models
		var buf strings.Builder
		buf.WriteString("Available free models:\n\n")
		for i, mod := range models {
			mark := " "
			if mod.ID == m.modelChoice {
				mark = "→"
			}
			buf.WriteString(fmt.Sprintf("  %s %2d. %s\n", mark, i+1, mod.ID))
		}
		buf.WriteString(fmt.Sprintf("\nTotal: %d models\n", len(models)))
		buf.WriteString("\nType `/model N` to switch, or `/probe` to check availability.")
		m.appendMessage("assistant", strings.TrimRight(buf.String(), "\n"))
		m.state = codeStateModelPicker
	case "/probe":
		apiKey := resolveKey()
		if apiKey == "" {
			m.appendMessage("error", "API key not set")
			return nil
		}
		freeModels, err := FetchFreeModels()
		if err != nil {
			m.appendMessage("error", "Failed to fetch models: "+err.Error())
			return nil
		}
		m.appendMessage("assistant", "Probing models for availability... (this may take a moment)")
		return sendProbe(freeModels, apiKey)
	case "/model":
		if len(parts) < 2 {
			m.appendMessage("error", "Usage: /model N  (run /models first to see available models)")
			return nil
		}
		var idx int
		if n, err := fmt.Sscanf(parts[1], "%d", &idx); err != nil || n != 1 {
			m.appendMessage("error", "Usage: /model N  (N is a number)\nRun /models to see available models")
			return nil
		}
		m.switchModel(idx)
	case "/new":
		m.messages = codeInitMessages()
		m.display = nil
		m.refresh()
	case "/undo":
		if len(m.messages) >= 4 {
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
	return nil
}

func sendProbe(models []Model, apiKey string) tea.Cmd {
	return func() tea.Msg {
		return probeResultMsg{
			results: probeModels(models, apiKey),
		}
	}
}

func (m *codeModel) switchModel(idx int) {
	idx-- // 1-indexed
	if idx < 0 || idx >= len(m.models) {
		m.appendMessage("error", "Invalid model number. Run /models to see available models.")
		m.state = codeStateChat
		return
	}
	newModel := m.models[idx].ID
	if newModel == m.modelChoice {
		m.appendMessage("assistant", "Already using `"+newModel+"`")
	} else {
		m.modelChoice = newModel
		m.appendMessage("assistant", "Switched to `"+newModel+"`")
	}
	m.state = codeStateChat
}

func (m codeModel) View() tea.View {
	titleBg := lipgloss.NewStyle().Background(lipgloss.Color("234"))
	var titlebar string
	{
		red := lipgloss.NewStyle().Foreground(lipgloss.Color("196")).Render("●")
		yel := lipgloss.NewStyle().Foreground(lipgloss.Color("220")).Render("●")
		grn := lipgloss.NewStyle().Foreground(lipgloss.Color("42")).Render("●")
		dots := red + " " + yel + " " + grn

		title := lipgloss.NewStyle().Foreground(dimColor).Render("opencode — " + m.modelChoice)
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
	case codeStateToolConfirm:
		toolBlock := formatToolConfirm(m.pendingToolCalls)
		body = m.history.View() + "\n\n" + toolBlock
	default:
		body = m.history.View()
	}

	promptTools := fmt.Sprintf(
		"  %s  %s   %s  %s  %s  %s  %s",
		highlight("plan", true), highlight("build", false),
		dimText("/compact"), dimText("/sessions"), dimText("/models"), dimText("/undo"), dimText("/share"),
	)

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
	tokens := dimText("0 / 200k tokens")
	exitHint := dimText("ctrl+x q to exit  ·  ctrl+x ? for help")

	return tea.NewView(fmt.Sprintf(
		"%s\n  %s\n\n%s\n\n  %s\n  %s  %s\n\n  %s  %s  %s   %s",
		titlebar,
		chatHeader,
		body,
		promptTools,
		promptRow, keyHint+"  "+sendStyle,
		statusConnected, cwd, tokens, exitHint,
	))
}

func highlight(label string, active bool) string {
	if active {
		return lipgloss.NewStyle().
			Foreground(purpleDim).
			Border(lipgloss.RoundedBorder(), false, false, false, false).
			Render(label)
	}
	return lipgloss.NewStyle().Foreground(lipgloss.Color("236")).Render(label)
}

func formatToolConfirm(calls []map[string]interface{}) string {
	var buf strings.Builder
	padded := lipgloss.NewStyle().PaddingLeft(2)
	buf.WriteString(padded.Render(labelTool("TOOL")) + "\n")
	for i, tc := range calls {
		fn := tc["function"].(map[string]interface{})
		var args map[string]interface{}
		json.Unmarshal([]byte(fn["arguments"].(string)), &args)
		toolLine := fmt.Sprintf("  %d. %s(", i+1, fn["name"])
		first := true
		for k, v := range args {
			if !first {
				toolLine += ", "
			}
			argStr, _ := json.Marshal(v)
			toolLine += fmt.Sprintf("%s=%s", k, string(argStr))
			first = false
		}
		toolLine += ")"
		buf.WriteString(padded.Render(dimText(toolLine)) + "\n")
	}
	buf.WriteString("\n" + padded.Render(labelAsst("Approve? (y/n)")))
	return buf.String()
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

func resolveKey() string {
	return LoadAPIKey()
}

func toolReadFile(path string) string {
	if !filepath.IsAbs(path) {
		wd, _ := os.Getwd()
		path = filepath.Join(wd, path)
	}
	data, err := os.ReadFile(path)
	if err != nil {
		return fmt.Sprintf("Error: %v", err)
	}
	return string(data)
}

func toolWriteFile(path, content string) string {
	if !filepath.IsAbs(path) {
		wd, _ := os.Getwd()
		path = filepath.Join(wd, path)
	}
	if err := os.MkdirAll(filepath.Dir(path), 0755); err != nil {
		return fmt.Sprintf("Error creating directory: %v", err)
	}
	if err := os.WriteFile(path, []byte(content), 0644); err != nil {
		return fmt.Sprintf("Error: %v", err)
	}
	return fmt.Sprintf("Written %d bytes to %s", len(content), path)
}

func toolEditFile(path, oldStr, newStr string) string {
	if !filepath.IsAbs(path) {
		wd, _ := os.Getwd()
		path = filepath.Join(wd, path)
	}
	data, err := os.ReadFile(path)
	if err != nil {
		return fmt.Sprintf("Error: %v", err)
	}
	content := string(data)
	if !strings.Contains(content, oldStr) {
		return fmt.Sprintf("Error: string not found in %s", path)
	}
	content = strings.Replace(content, oldStr, newStr, 1)
	if err := os.WriteFile(path, []byte(content), 0644); err != nil {
		return fmt.Sprintf("Error: %v", err)
	}
	return fmt.Sprintf("Edited %s (replaced one occurrence)", path)
}

func toolRunBash(command, workdir string) string {
	cmd := exec.Command("bash", "-c", command)
	if workdir != "" {
		cmd.Dir = workdir
	}
	cmd.Env = os.Environ()

	timeout := 30 * time.Second
	done := make(chan struct{})
	var output []byte
	var err error

	go func() {
		output, err = cmd.CombinedOutput()
		close(done)
	}()

	select {
	case <-done:
	case <-time.After(timeout):
		cmd.Process.Kill()
		return fmt.Sprintf("Error: command timed out after %v", timeout)
	}

	outStr := string(output)
	if outStr == "" && err != nil {
		return fmt.Sprintf("Error: %v", err)
	}
	if outStr == "" {
		return "Command completed (no output)"
	}
	if len(outStr) > 5000 {
		outStr = outStr[:5000] + "\n...[truncated]"
	}
	return outStr
}

func pickToolModel() string {
	apiKey := resolveKey()
	if apiKey == "" {
		return "google/gemma-4-26b-a4b-it:free"
	}
	models, err := FetchFreeModels()
	if err != nil || len(models) == 0 {
		return "google/gemma-4-26b-a4b-it:free"
	}

	toolPatterns := []string{"gemma-4", "llama-3.2", "mistral"}
	var candidates []Model
	for _, p := range toolPatterns {
		for _, m := range models {
			if strings.Contains(strings.ToLower(m.ID), p) {
				candidates = append(candidates, m)
			}
		}
	}
	if len(candidates) == 0 {
		candidates = models[:min(10, len(models))]
	}

	results := probeModels(candidates, apiKey)
	for _, r := range results {
		if r.Status == StatusOK {
			return r.Model.ID
		}
	}

	if len(models) > 0 {
		return models[0].ID
	}
	return "google/gemma-4-26b-a4b-it:free"
}

func probeModels(models []Model, apiKey string) []ProbeResult {
	results := make([]ProbeResult, len(models))
	var mu sync.Mutex
	var wg sync.WaitGroup
	idx := 0

	jobs := make(chan Model, len(models))
	for _, m := range models {
		jobs <- m
	}
	close(jobs)

	httpClient := &http.Client{Timeout: 5 * time.Second}
	workers := 6
	for i := 0; i < workers; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for m := range jobs {
				r := quickProbeModel(m, apiKey, httpClient)
				mu.Lock()
				results[idx] = r
				idx++
				mu.Unlock()
			}
		}()
	}
	wg.Wait()

	sort.Slice(results, func(i, j int) bool {
		if results[i].Status != results[j].Status {
			return results[i].Status < results[j].Status
		}
		if results[i].Status == StatusOK {
			return results[i].Latency < results[j].Latency
		}
		return results[i].Model.ID < results[j].Model.ID
	})
	return results
}

func quickProbeModel(m Model, apiKey string, client *http.Client) ProbeResult {
	payload := map[string]any{
		"model": m.ID,
		"messages": []map[string]any{
			{"role": "user", "content": "hi"},
		},
		"max_tokens": 1,
		"provider": map[string]any{
			"allow_fallbacks": false,
			"data_collection": "allow",
		},
	}
	body, _ := json.Marshal(payload)
	req, err := http.NewRequest(http.MethodPost, BaseURL+"/chat/completions", bytes.NewReader(body))
	if err != nil {
		return ProbeResult{Model: m, Status: StatusError, Message: err.Error()}
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("HTTP-Referer", "https://github.com/hieudoanm/hieudoanm")
	req.Header.Set("X-Title", "hieudoanm")

	start := time.Now()
	resp, err := client.Do(req)
	elapsed := time.Since(start).Milliseconds()
	if err != nil {
		return ProbeResult{Model: m, Status: StatusError, Message: err.Error()}
	}
	defer resp.Body.Close()

	raw, _ := io.ReadAll(resp.Body)

	switch resp.StatusCode {
	case http.StatusOK:
		return ProbeResult{Model: m, Status: StatusOK, Latency: elapsed}
	case http.StatusTooManyRequests:
		return ProbeResult{Model: m, Status: StatusRateLimited, Message: extractMessage(raw)}
	case http.StatusNotFound:
		return ProbeResult{Model: m, Status: StatusRestricted, Message: extractMessage(raw)}
	default:
		msg := extractMessage(raw)
		if msg == "" {
			msg = fmt.Sprintf("HTTP %d", resp.StatusCode)
		}
		return ProbeResult{Model: m, Status: StatusError, Message: msg}
	}
}

func statusIcon(s ProbeStatus) string {
	switch s {
	case StatusOK:
		return "✔"
	case StatusRateLimited:
		return "⚡"
	case StatusRestricted:
		return "🔒"
	case StatusError:
		return "✖"
	default:
		return "?"
	}
}

var openrouterCodeCmd = &cobra.Command{
	Use:   "code",
	Short: "AI coding assistant with file editing and bash access",
	Long: `An interactive TUI coding assistant powered by OpenRouter.

Supports reading, writing, and editing files, as well as running bash commands.
All tool calls require your approval before execution.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		model := codeModelFlag
		if model == "" {
			model = pickToolModel()
		}
		if _, err := tea.NewProgram(codeInitialModel(model)).Run(); err != nil {
			log.Fatal(err)
		}
		return nil
	},
}

func init() {
	openrouterCodeCmd.Flags().StringVar(&codeModelFlag, "model", "", "Model ID (default: auto-select tool-capable model)")
}
