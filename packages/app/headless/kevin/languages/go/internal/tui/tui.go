package tui

import (
	"context"
	"fmt"
	"sort"
	"strings"

	"charm.land/bubbles/v2/textinput"
	tea "charm.land/bubbletea/v2"

	"github.com/hieudoanm/kevin/internal/db"
)

// focus names the active input: the key/search field, the value field, or the
// key/value table. Mirrors the fyne GUI's control layout.
type focus int

const (
	focusKey focus = iota
	focusValue
	focusTable
)

// Run opens the key/value manager TUI backed by kv and blocks until the user
// quits. The TCP server is expected to run concurrently on the same kv.
func Run(_ context.Context, kv *db.DB) error {
	_, err := tea.NewProgram(newModel(kv)).Run()
	return err
}

func newModel(kv *db.DB) model {
	keyIn := textinput.New()
	keyIn.Placeholder = "key / search"
	valueIn := textinput.New()
	valueIn.Placeholder = "value"
	keyIn.Focus()
	m := model{
		kv:      kv,
		focus:   focusKey,
		keyIn:   keyIn,
		valueIn: valueIn,
	}
	m.rebuild()
	return m
}

type model struct {
	kv            *db.DB
	focus         focus
	keyIn         textinput.Model
	valueIn       textinput.Model
	rows          []string
	cursor        int
	status        string
	confirmDelete bool
	width         int
}

func (m model) Init() tea.Cmd {
	return nil
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.width = msg.Width
		return m, nil
	case tea.KeyMsg:
		if msg.String() == "D" {
			if m.focus == focusTable {
				m.confirmDeleteAll()
			}
			return m, nil
		}
		m.confirmDelete = false
		switch msg.String() {
		case "ctrl+c", "q":
			if msg.String() == "q" && m.focus != focusTable {
				break
			}
			return m, tea.Quit
		case "tab":
			m.cycle()
			return m, nil
		case "enter":
			if m.focus == focusTable {
				m.editSelected()
			} else {
				m.doSet()
			}
			return m, nil
		case "up":
			if m.focus == focusTable {
				m.move(-1)
			}
			return m, nil
		case "down":
			if m.focus == focusTable {
				m.move(1)
			}
			return m, nil
		case "d":
			if m.focus == focusTable {
				m.deleteSelected()
			}
			return m, nil
		case "r":
			if m.focus == focusTable {
				m.refresh()
			}
			return m, nil
		case "space":
			if m.focus == focusTable {
				m.editSelected()
			}
			return m, nil
		}
		var cmd tea.Cmd
		switch m.focus {
		case focusKey:
			m.keyIn, cmd = m.keyIn.Update(msg)
			m.rebuild()
		case focusValue:
			m.valueIn, cmd = m.valueIn.Update(msg)
		}
		return m, cmd
	}
	return m, nil
}

func (m model) View() tea.View {
	var b strings.Builder
	fmt.Fprintf(&b, "kevin — Key/Value (%d keys)\n", m.kv.Len())
	b.WriteString(strings.Repeat("─", m.lineWidth()))
	b.WriteRune('\n')

	inKeyW, inValW := m.inputWidths()
	fmt.Fprintf(&b, "Key/Search: [%s]  Value: [%s]\n", m.field(m.keyIn, inKeyW), m.field(m.valueIn, inValW))
	b.WriteString(strings.Repeat("─", m.lineWidth()))
	b.WriteRune('\n')

	keyW, valW := m.columnWidths()
	fmt.Fprintf(&b, " %4s  %s  %s\n", "No", padRight("Key", keyW), "Value")
	for i, key := range m.rows {
		marker := " "
		if i == m.cursor {
			marker = ">"
		}
		value, _ := m.kv.Get(key)
		fmt.Fprintf(&b, "%s%3d  %s  %s\n", marker, i+1, padRight(truncate(key, keyW), keyW), truncate(value, valW))
	}
	b.WriteString(strings.Repeat("─", m.lineWidth()))
	b.WriteRune('\n')
	if m.confirmDelete {
		b.WriteString("confirm: press D again to delete all keys\n")
	} else if m.status != "" {
		b.WriteString(m.status)
		b.WriteRune('\n')
	}
	b.WriteString("tab cycle focus · enter set/edit · ↑/↓ move · d delete · D delete-all · r refresh · q quit")
	return tea.NewView(b.String())
}

func (m *model) rebuild() {
	query := strings.ToLower(strings.TrimSpace(m.keyIn.Value()))
	all := m.kv.Keys()
	out := make([]string, 0, len(all))
	for _, key := range all {
		if query == "" {
			out = append(out, key)
			continue
		}
		value, _ := m.kv.Get(key)
		if strings.Contains(strings.ToLower(key), query) || strings.Contains(strings.ToLower(value), query) {
			out = append(out, key)
		}
	}
	sort.Strings(out)
	m.rows = out
	m.clamp()
}

// clamp keeps cursor within the filtered rows, moving to the nearest valid
// index when the list shrinks.
func (m *model) clamp() {
	if len(m.rows) == 0 {
		m.cursor = 0
		return
	}
	if m.cursor >= len(m.rows) {
		m.cursor = len(m.rows) - 1
	}
}

func (m *model) doSet() {
	key := m.keyIn.Value()
	if strings.TrimSpace(key) == "" {
		m.setStatus("enter a key first")
		return
	}
	value := m.valueIn.Value()
	_, existed := m.kv.Get(key)
	m.kv.Set(key, value)
	if existed {
		m.setStatus(fmt.Sprintf("updated %s", key))
	} else {
		m.setStatus(fmt.Sprintf("set %s", key))
	}
	m.rebuild()
}

func (m *model) editSelected() {
	if m.cursor >= len(m.rows) {
		return
	}
	key := m.rows[m.cursor]
	value, _ := m.kv.Get(key)
	m.keyIn.SetValue(key)
	m.valueIn.SetValue(value)
	m.setStatus("loaded " + key)
	m.focus = focusValue
}

func (m *model) deleteSelected() {
	if m.cursor >= len(m.rows) {
		return
	}
	key := m.rows[m.cursor]
	if m.kv.Del(key) {
		m.setStatus("deleted " + key)
		m.rebuild()
	}
}

func (m *model) confirmDeleteAll() {
	if m.confirmDelete {
		m.confirmDelete = false
		n := m.kv.Flush()
		m.setStatus(fmt.Sprintf("deleted %d keys", n))
		m.rebuild()
		return
	}
	m.confirmDelete = true
	m.setStatus("")
}

func (m *model) refresh() {
	m.keyIn.SetValue("")
	m.valueIn.SetValue("")
	m.setStatus("refreshed")
	m.rebuild()
}

func (m *model) move(dir int) {
	if len(m.rows) == 0 {
		return
	}
	m.cursor = (m.cursor + dir + len(m.rows)) % len(m.rows)
}

func (m *model) cycle() {
	switch m.focus {
	case focusKey:
		m.focus = focusValue
		m.keyIn.Blur()
		m.valueIn.Focus()
	case focusValue:
		m.focus = focusTable
		m.valueIn.Blur()
	case focusTable:
		m.focus = focusKey
		m.keyIn.Focus()
	}
}

func (m *model) setStatus(msg string) {
	m.status = msg
}

func (m *model) lineWidth() int {
	if m.width < 40 {
		return 80
	}
	return m.width
}

func (m *model) inputWidths() (int, int) {
	w := m.lineWidth() - len("Key/Search: [") - len("]  Value: [") - len("]")
	if w < 20 {
		w = 80
	}
	keyW := w / 3
	if keyW < 10 {
		keyW = 10
	}
	return keyW, w - keyW
}

func (m *model) columnWidths() (int, int) {
	remaining := m.lineWidth() - 7
	keyW := remaining / 3
	if keyW < 8 {
		keyW = 8
	}
	valW := remaining - keyW - 1
	if valW < 10 {
		valW = 10
	}
	return keyW, valW
}

func (m model) field(in textinput.Model, w int) string {
	in.SetWidth(w)
	view := in.View()
	if view == "" {
		return strings.Repeat(" ", w)
	}
	return padRight(truncate(view, w), w)
}

func padRight(s string, width int) string {
	runes := []rune(s)
	if len(runes) >= width {
		return s
	}
	return s + strings.Repeat(" ", width-len(runes))
}

func truncate(s string, max int) string {
	runes := []rune(s)
	if len(runes) <= max {
		return s
	}
	return string(runes[:max]) + "…"
}
