package tui

import (
	"fmt"
	"os"
	"strings"

	tea "charm.land/bubbletea/v2"

	"landify/internal/landify"
)

// parseCommand splits a :command line into its name and optional argument.
// The first token is the command; everything after it is a single argument
// (theme/build output paths never contain spaces).
func parseCommand(line string) (name, arg string) {
	fields := strings.Fields(strings.TrimSpace(line))
	if len(fields) == 0 {
		return "", ""
	}
	return fields[0], strings.Join(fields[1:], " ")
}

// exec runs a :command line against the model. A non-nil command signals that
// the program should quit.
func (m model) exec(line string) (model, tea.Cmd) {
	name, arg := parseCommand(line)
	switch name {
	case "save":
		m.doSave()
	case "reload":
		m.reload()
	case "validate":
		m.doValidate()
	case "build":
		output := arg
		if output == "" {
			output = "index.html"
		}
		m.doBuild(output)
	case "generate":
		m.doGenerate(arg)
	case "theme":
		m.doTheme(arg)
	case "help":
		m.status = helpText
	case "quit", "q":
		return m, tea.Quit
	default:
		m.status = fmt.Sprintf("unknown command %q — type help", name)
	}
	return m, nil
}

// reload discards the editor buffer and reads the file from disk again.
func (m *model) reload() {
	data, err := os.ReadFile(m.path)
	if err != nil {
		m.status = "could not read " + m.path + " — " + err.Error()
		m.saved = ""
		m.dirty = false
		return
	}
	m.saved = string(data)
	m.area.SetValue(m.saved)
	m.dirty = false
	m.status = fmt.Sprintf("Reloaded %s (%d bytes)", m.path, len(m.saved))
}

func (m *model) doSave() {
	data := m.area.Value()
	if err := os.WriteFile(m.path, []byte(data), 0o644); err != nil {
		m.status = "save failed — " + err.Error()
		return
	}
	m.saved = data
	m.dirty = false
	m.status = fmt.Sprintf("Saved %s (%d bytes)", m.path, len(data))
}

func (m *model) doValidate() {
	cfg, err := landify.Load([]byte(m.area.Value()))
	if err != nil {
		m.status = "invalid — " + err.Error()
		return
	}
	if errs := landify.Errors(cfg); len(errs) > 0 {
		m.status = fmt.Sprintf("invalid (%d problems) — %s", len(errs), errs[0])
		return
	}
	m.status = "valid — landify.yaml conforms to the schema"
}

// doBuild renders the editor buffer to output. When a theme override is set it
// replaces the YAML theme section, exactly like `landify build --theme`.
func (m *model) doBuild(output string) {
	html, err := renderConfig(m.area.Value(), m.themeOverride)
	if err != nil {
		m.status = "build failed — " + err.Error()
		return
	}
	if err := os.WriteFile(output, html, 0o644); err != nil {
		m.status = "build failed — " + err.Error()
		return
	}
	m.status = fmt.Sprintf("Built %s (%d bytes)", output, len(html))
}

// renderConfig validates data against the schema, applies an optional theme
// preset, and renders the landing page HTML. Errors carry the same wording the
// `validate`/`build` commands use.
func renderConfig(data, themeOverride string) ([]byte, error) {
	cfg, err := landify.Load([]byte(data))
	if err != nil {
		return nil, err
	}
	if themeOverride != "" {
		theme, ok := landify.ThemeByName(themeOverride)
		if !ok {
			return nil, fmt.Errorf("unknown theme %q (available: %s)", themeOverride, strings.Join(landify.ThemeNames(), ", "))
		}
		cfg.Theme = theme
	}
	if errs := landify.Errors(cfg); len(errs) > 0 {
		return nil, fmt.Errorf("invalid (%d problems) — %s", len(errs), errs[0])
	}
	return landify.Render(cfg)
}

// doGenerate replaces the editor buffer with the annotated scaffold for typ
// (default product). The generated text is unsaved until the user saves.
func (m *model) doGenerate(typ string) {
	if typ == "" {
		typ = "product"
	}
	data, err := landify.Placeholder(typ)
	if err != nil {
		m.status = err.Error()
		return
	}
	m.saved = string(data)
	m.area.SetValue(m.saved)
	m.dirty = false
	m.status = fmt.Sprintf("Generated %s scaffold (unsaved)", typ)
}

// doTheme sets or clears the build theme override. "yaml", "-" or an empty
// name restores the theme: section of the YAML itself.
func (m *model) doTheme(name string) {
	if name == "" || name == "yaml" || name == "-" {
		m.themeOverride = ""
		m.status = "Build theme: from landify.yaml"
		return
	}
	if _, ok := landify.ThemeByName(name); !ok {
		m.status = fmt.Sprintf("unknown theme %q (available: %s)", name, strings.Join(landify.ThemeNames(), ", "))
		return
	}
	m.themeOverride = name
	m.status = "Build theme: " + name
}

const helpText = "save | reload | validate | build [file] | generate <type> | theme <name|yaml> | help | quit — Esc opens/closes the :command line"
