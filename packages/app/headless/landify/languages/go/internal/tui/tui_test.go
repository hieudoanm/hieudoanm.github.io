package tui

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"landify/internal/landify"
)

func TestParseCommand(t *testing.T) {
	tests := []struct {
		line string
		name string
		arg  string
	}{
		{line: "", name: "", arg: ""},
		{line: "   ", name: "", arg: ""},
		{line: "save", name: "save", arg: ""},
		{line: "  build site/index.html  ", name: "build", arg: "site/index.html"},
		{line: "generate faq", name: "generate", arg: "faq"},
		{line: "theme ocean", name: "theme", arg: "ocean"},
	}
	for _, tt := range tests {
		t.Run("line="+tt.line, func(t *testing.T) {
			name, arg := parseCommand(tt.line)
			if name != tt.name || arg != tt.arg {
				t.Errorf("parseCommand(%q) = (%q, %q), want (%q, %q)", tt.line, name, arg, tt.name, tt.arg)
			}
		})
	}
}

func TestRenderConfig(t *testing.T) {
	for _, typ := range []string{"product", "linktree", "event", "faq"} {
		t.Run(typ, func(t *testing.T) {
			scaffold, err := landify.Placeholder(typ)
			if err != nil {
				t.Fatalf("Placeholder(%q): %v", typ, err)
			}
			html, err := renderConfig(string(scaffold), "")
			if err != nil {
				t.Fatalf("renderConfig: %v", err)
			}
			if !strings.Contains(string(html), "</html>") {
				t.Errorf("renderConfig output missing </html> footer")
			}
		})
	}
}

func TestRenderConfigThemeOverride(t *testing.T) {
	t.Run("known theme is applied", func(t *testing.T) {
		scaffold, err := landify.Placeholder("product")
		if err != nil {
			t.Fatal(err)
		}
		if _, err := renderConfig(string(scaffold), "ocean"); err != nil {
			t.Errorf("renderConfig with ocean theme: %v", err)
		}
	})
	t.Run("unknown theme is rejected", func(t *testing.T) {
		scaffold, err := landify.Placeholder("product")
		if err != nil {
			t.Fatal(err)
		}
		_, err = renderConfig(string(scaffold), "banana")
		if err == nil || !strings.Contains(err.Error(), "unknown theme") {
			t.Errorf("want unknown-theme error, got %v", err)
		}
	})
}

func TestRenderConfigRejectsInvalidYAML(t *testing.T) {
	if _, err := renderConfig("{broken", ""); err == nil {
		t.Fatal("renderConfig accepted invalid YAML")
	} else if !strings.HasPrefix(err.Error(), "parse yaml") {
		t.Errorf("unexpected error wording: %v", err)
	}
}

func TestDoValidate(t *testing.T) {
	scaffold, err := landify.Placeholder("product")
	if err != nil {
		t.Fatal(err)
	}
	m := newModel(filepath.Join(t.TempDir(), "landify.yaml"))
	m.area.SetValue(string(scaffold))
	m.doValidate()
	if !strings.HasPrefix(m.status, "valid") {
		t.Errorf("valid scaffold flagged: %q", m.status)
	}

	m.area.SetValue("type: product\nbadkey: 1\n")
	m.doValidate()
	if !strings.HasPrefix(m.status, "invalid") {
		t.Errorf("invalid scaffold accepted: %q", m.status)
	}
}

func TestDoSaveWritesBuffer(t *testing.T) {
	path := filepath.Join(t.TempDir(), "landify.yaml")
	m := newModel(path)
	m.area.SetValue("type: linktree\n")
	m.dirty = true
	m.doSave()

	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("read back: %v", err)
	}
	if string(data) != "type: linktree\n" {
		t.Errorf("on-disk content = %q, want %q", data, "type: linktree\n")
	}
	if m.dirty {
		t.Error("save left model dirty")
	}
	if !strings.Contains(m.status, "Saved") {
		t.Errorf("save status = %q", m.status)
	}
}

func TestDoGenerateReplacesBuffer(t *testing.T) {
	m := newModel(filepath.Join(t.TempDir(), "landify.yaml"))
	m.doGenerate("faq")

	if !strings.Contains(m.area.Value(), "type: faq") {
		t.Errorf("buffer missing faq scaffold: %q", m.area.Value())
	}
	if m.area.Value() != m.saved {
		t.Error("saved baseline not updated after generate")
	}
	if m.dirty {
		t.Error("generate left model dirty")
	}
	if !strings.Contains(m.status, "Generated faq") {
		t.Errorf("generate status = %q", m.status)
	}
}

func TestDoGenerateUnknownType(t *testing.T) {
	m := newModel(filepath.Join(t.TempDir(), "landify.yaml"))
	m.doGenerate("wibble")
	if !strings.Contains(m.status, "not supported") {
		t.Errorf("generate status = %q, want not-supported message", m.status)
	}
}

func TestDoTheme(t *testing.T) {
	m := newModel(filepath.Join(t.TempDir(), "landify.yaml"))
	m.doTheme("ocean")
	if m.themeOverride != "ocean" {
		t.Errorf("themeOverride = %q, want ocean", m.themeOverride)
	}

	m.doTheme("yaml")
	if m.themeOverride != "" {
		t.Errorf("themeOverride = %q after yaml, want empty", m.themeOverride)
	}

	m.doTheme("banana")
	if m.themeOverride != "" || !strings.Contains(m.status, "unknown theme") {
		t.Errorf("unknown theme accepted: override=%q status=%q", m.themeOverride, m.status)
	}
}

func TestExecDispatch(t *testing.T) {
	m := newModel(filepath.Join(t.TempDir(), "landify.yaml"))

	m, quit := m.exec("help")
	if quit != nil {
		t.Fatal("help must not quit")
	}
	if !strings.Contains(m.status, "save") {
		t.Errorf("help status = %q", m.status)
	}

	m, quit = m.exec("wibble x")
	if quit != nil {
		t.Fatal("unknown command must not quit")
	}
	if !strings.Contains(m.status, "unknown command") {
		t.Errorf("unknown-command status = %q", m.status)
	}

	_, quit = m.exec("quit")
	if quit == nil {
		t.Fatal("quit must signal a shutdown")
	}
}

func TestReloadReadsDisk(t *testing.T) {
	path := filepath.Join(t.TempDir(), "landify.yaml")
	if err := os.WriteFile(path, []byte("type: status\n"), 0o644); err != nil {
		t.Fatal(err)
	}
	m := newModel(path)
	m.area.SetValue("type: product\n")
	m.saved = "type: product\n"
	m.dirty = true
	m.reload()

	if m.area.Value() != "type: status\n" {
		t.Errorf("buffer = %q, want disk content", m.area.Value())
	}
	if m.saved != "type: status\n" {
		t.Errorf("saved baseline = %q, want disk content", m.saved)
	}
	if m.dirty {
		t.Error("reload left model dirty")
	}
	if !strings.Contains(m.status, "Reloaded") {
		t.Errorf("reload status = %q", m.status)
	}
}

func TestReloadMissingFile(t *testing.T) {
	m := newModel(filepath.Join(t.TempDir(), "nope", "landify.yaml"))
	if m.dirty {
		t.Error("missing file must not mark dirty")
	}
	if !strings.Contains(m.status, "could not read") {
		t.Errorf("status = %q, want could-not-read message", m.status)
	}
}

func TestViewRendersShell(t *testing.T) {
	m := newModel(filepath.Join(t.TempDir(), "landify.yaml"))
	view := m.View()
	for _, want := range []string{"landify.yaml", "build theme: yaml", "[EDIT]", "type to edit"} {
		if !strings.Contains(view, want) {
			t.Errorf("View missing %q", want)
		}
	}

	m.dirty = true
	view = m.View()
	if !strings.Contains(view, "•") {
		t.Errorf("dirty marker missing from View")
	}

	m, _ = m.toggleMode()
	view = m.View()
	for _, want := range []string{"[COMMAND]", ": "} {
		if !strings.Contains(view, want) {
			t.Errorf("command-mode View missing %q", want)
		}
	}
}
