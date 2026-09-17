// Package tui implements the "landify tui" terminal editor: an editable YAML
// pane plus a :command line for save / reload / validate / build / generate /
// theme, mirroring the "studio" desktop app without requiring a GUI build.
package tui

import (
	"fmt"
	"strings"

	"github.com/charmbracelet/bubbles/textarea"
	"github.com/charmbracelet/bubbles/textinput"
	tea "github.com/charmbracelet/bubbletea"
)

// mode selects where typed characters go.
type mode int

const (
	modeEditor  mode = iota // typing edits the YAML pane
	modeCommand             // typing composes a :command
)

// model is the bubbletea application state.
type model struct {
	path          string
	area          textarea.Model
	cmd           textinput.Model
	active        mode
	saved         string // buffer at last load/save/generate/reload
	themeOverride string // non-empty = preset applied at build
	dirty         bool
	status        string
}

// Run opens the terminal editor for path, defaulting to landify.yaml.
func Run(path string) error {
	if path == "" {
		path = "landify.yaml"
	}
	if _, err := tea.NewProgram(newModel(path), tea.WithAltScreen()).Run(); err != nil {
		return fmt.Errorf("tui: %w", err)
	}
	return nil
}

func newModel(path string) model {
	area := textarea.New()
	area.Placeholder = "landify.yaml — type to edit, Esc opens the :command line, ctrl+c quits"
	area.CharLimit = 0
	area.ShowLineNumbers = true
	area.SetWidth(80)

	cmd := textinput.New()
	cmd.Placeholder = "command"
	cmd.CharLimit = 256

	m := model{path: path, area: area, cmd: cmd}
	m.reload() // load early so the editor starts with the current file
	return m
}

func (m model) Init() tea.Cmd {
	return m.area.Focus()
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.area.SetWidth(msg.Width)
		m.area.SetHeight(msg.Height - 4)
		return m, nil
	case tea.KeyMsg:
		return m.handleKey(msg)
	default:
		var cmds tea.Cmd
		m.area, cmds = m.area.Update(msg)
		return m, cmds
	}
}

func (m model) handleKey(msg tea.KeyMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "ctrl+c", "ctrl+q":
		return m, tea.Quit
	case "esc":
		return m.toggleMode()
	case "enter":
		if m.active == modeCommand {
			line := m.cmd.Value()
			m.cmd.SetValue("")
			m.cmd.Blur()
			m.area.Focus()
			m.active = modeEditor
			m, quit := m.exec(line)
			return m, quit
		}
	}
	if m.active == modeCommand {
		var cmds tea.Cmd
		m.cmd, cmds = m.cmd.Update(msg)
		return m, cmds
	}
	var cmds tea.Cmd
	m.area, cmds = m.area.Update(msg)
	if m.area.Value() != m.saved {
		m.dirty = true
	}
	return m, cmds
}

// toggleMode moves typing between the YAML pane and the :command line.
func (m model) toggleMode() (model, tea.Cmd) {
	var blink tea.Cmd
	if m.active == modeCommand {
		m.active = modeEditor
		m.cmd.Blur()
		blink = m.area.Focus()
		return m, blink
	}
	m.active = modeCommand
	m.area.Blur()
	blink = m.cmd.Focus()
	return m, blink
}

// View renders the editor: an info row, the YAML pane, and a command/status
// row. In editor mode the bottom row shows the status (or a hint); in command
// mode it becomes a ": " prompt.
func (m model) View() string {
	width := m.area.Width()
	if width < 1 {
		width = 80
	}
	rule := strings.Repeat("─", width)
	theme := m.themeOverride
	if theme == "" {
		theme = "yaml"
	}
	dirty := " "
	if m.dirty {
		dirty = "•"
	}
	info := fmt.Sprintf("%s %s  build theme: %s", m.path, dirty, theme)

	var bottom string
	if m.active == modeCommand {
		bottom = ": " + m.cmd.View()
	} else {
		bottom = m.status
		if bottom == "" {
			bottom = "type to edit — Esc for :commands, ctrl+c to quit"
		}
	}
	return info + "\n" + rule + "\n" + m.area.View() + "\n" + rule + "\n" + bottom
}
