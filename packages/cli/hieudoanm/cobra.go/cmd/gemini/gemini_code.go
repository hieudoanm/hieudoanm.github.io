package gemini

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/hieudoanm/api/core/gemini.google.com"
	"github.com/hieudoanm/hieudoanm/libs/chat"
	"github.com/spf13/cobra"

	tea "charm.land/bubbletea/v2"
)

type codeResultMsg struct {
	response *gemini.GenerateContentResponse
	err      error
}

type codeModel struct {
	chat.BaseModel

	messages []gemini.Content
}

func codeInitialModel() codeModel {
	m := codeModel{
		BaseModel: chat.NewBaseModel("Ask Gemini... (@ for files, ! for shell commands)"),
	}
	m.Refresh()
	return m
}

func (m codeModel) Init() tea.Cmd {
	return nil
}

func (m *codeModel) appendUserMessage(text string) {
	m.messages = append(m.messages, gemini.Content{
		Role:  gemini.RoleUser,
		Parts: []gemini.Part{{Text: text}},
	})
	m.AppendMessage("user", text)
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
	if handled, cmd := m.BaseModel.HandleCommonMsg(msg, func(text string) tea.Cmd {
		m.appendUserMessage(text)
		m.Input.Reset()
		m.State = chat.StateLoading
		return tea.Batch(
			m.Spin.Tick,
			sendToGemini(gemini.Model25Flash, m.messages),
		)
	}); handled {
		if cmd != nil {
			return m, cmd
		}
		// If enter with "/" prefix, let the slash handler below process it
		if keyMsg, ok := msg.(tea.KeyMsg); ok && keyMsg.String() == "enter" {
			text := strings.TrimSpace(m.Input.Value())
			if strings.HasPrefix(text, "/") {
				m.Input.Reset()
				cmd := m.handleSlash(text)
				return m, cmd
			}
		}
		return m, nil
	}

	switch msg := msg.(type) {
	case codeResultMsg:
		if msg.err != nil {
			m.State = chat.StateChat
			m.RecordThought()
			m.AppendMessage("error", msg.err.Error())
			return m, nil
		}
		content := msg.response.Candidates[0].Content.Parts[0].Text
		m.messages = append(m.messages, gemini.Content{
			Role:  gemini.RoleModel,
			Parts: []gemini.Part{{Text: content}},
		})
		m.State = chat.StateChat
		m.TokenCount = msg.response.UsageMetadata.TotalTokenCount
		m.RecordThought()
		m.AppendMessage("assistant", content)
		return m, nil
	}

	cmd := m.BaseModel.HandleInputMsg(msg)
	return m, cmd
}

func (m *codeModel) handleSlash(cmd string) tea.Cmd {
	switch cmd {
	case "/help":
		m.AppendMessage("assistant", "Slash commands:\n- /help  — Show help\n- /new   — Clear conversation\n- /undo  — Remove last exchange\n- /exit  — Quit")
	case "/new":
		m.messages = nil
		m.Display = nil
		m.Refresh()
	case "/undo":
		if len(m.messages) >= 2 {
			m.messages = m.messages[:len(m.messages)-2]
		}
		if len(m.Display) >= 1 {
			m.Display = m.Display[:len(m.Display)-1]
		}
		m.Refresh()
	case "/exit":
		return tea.Quit
	default:
		m.AppendMessage("error", "Unknown command: "+cmd+"\nTry /help")
	}
	return nil
}

func (m codeModel) View() tea.View {
	return chat.CommonView(&m.BaseModel, chat.DimText("Gemini Flash 2.5 (gemini-2.5-flash)"), "")
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
