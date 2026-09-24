package tui

import (
	"testing"

	tea "charm.land/bubbletea/v2"

	"github.com/hieudoanm/kevin/internal/db"
)

func TestTruncate(t *testing.T) {
	tests := []struct {
		name string
		in   string
		max  int
		want string
	}{
		{"short", "hello", 10, "hello"},
		{"exact", "12345", 5, "12345"},
		{"longer", "1234567890", 5, "12345…"},
		{"empty", "", 3, ""},
		{"unicode", "héllo wörld", 6, "héllo …"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := truncate(tt.in, tt.max); got != tt.want {
				t.Fatalf("truncate(%q, %d) = %q, want %q", tt.in, tt.max, got, tt.want)
			}
		})
	}
}

func TestRebuildFiltersAndSorts(t *testing.T) {
	kv := db.New()
	kv.Set("beta", "two")
	kv.Set("alpha", "one")
	kv.Set("gamma", "three")

	m := newModel(kv)

	m.keyIn.SetValue("")
	m.rebuild()
	if len(m.rows) != 3 || m.rows[0] != "alpha" || m.rows[2] != "gamma" {
		t.Fatalf("no filter: got %v, want [alpha beta gamma]", m.rows)
	}

	m.keyIn.SetValue("be")
	m.rebuild()
	if len(m.rows) != 1 || m.rows[0] != "beta" {
		t.Fatalf("key filter 'be': got %v, want [beta]", m.rows)
	}

	m.keyIn.SetValue("THREE")
	m.rebuild()
	if len(m.rows) != 1 || m.rows[0] != "gamma" {
		t.Fatalf("value filter 'THREE': got %v, want [gamma]", m.rows)
	}
}

func TestDoSetRequiresKey(t *testing.T) {
	kv := db.New()
	m := newModel(kv)

	m.doSet()
	if m.status != "enter a key first" {
		t.Fatalf("status = %q, want enter a key first", m.status)
	}
	if kv.Len() != 0 {
		t.Fatalf("store should stay empty, got %d keys", kv.Len())
	}

	m.keyIn.SetValue("foo")
	m.valueIn.SetValue("bar")
	m.doSet()
	if m.status != "set foo" {
		t.Fatalf("status = %q, want set foo", m.status)
	}
	if got, _ := kv.Get("foo"); got != "bar" {
		t.Fatalf("GET foo = %q, want bar", got)
	}
	m.doSet()
	if m.status != "updated foo" {
		t.Fatalf("status = %q, want updated foo", m.status)
	}
}

func TestDeleteSelected(t *testing.T) {
	kv := db.New()
	kv.Set("alpha", "one")
	kv.Set("beta", "two")
	m := newModel(kv)
	m.cursor = 1

	m.deleteSelected()
	if m.status != "deleted beta" {
		t.Fatalf("status = %q, want deleted beta", m.status)
	}
	if _, ok := kv.Get("beta"); ok {
		t.Fatalf("beta should be deleted")
	}
	if _, ok := kv.Get("alpha"); !ok {
		t.Fatalf("alpha should survive")
	}
	if m.cursor != 0 {
		t.Fatalf("cursor = %d, want clamped to 0", m.cursor)
	}
}

func TestConfirmDeleteAllRequiresTwoPresses(t *testing.T) {
	kv := db.New()
	kv.Set("alpha", "one")
	kv.Set("beta", "two")
	m := newModel(kv)
	m.focus = focusTable

	got, _ := m.Update(tea.KeyPressMsg{Code: 'D'})
	m, _ = got.(model)
	if !m.confirmDelete {
		t.Fatalf("first D should arm confirmation")
	}
	if kv.Len() != 2 {
		t.Fatalf("store should be untouched before second D, got %d keys", kv.Len())
	}

	got, _ = m.Update(tea.KeyPressMsg{Code: 'D'})
	m, _ = got.(model)
	if m.confirmDelete {
		t.Fatalf("second D should execute the delete")
	}
	if kv.Len() != 0 {
		t.Fatalf("store should be empty, got %d keys", kv.Len())
	}
	if m.status != "deleted 2 keys" {
		t.Fatalf("status = %q, want deleted 2 keys", m.status)
	}
}

func TestMoveWrapsAndClamps(t *testing.T) {
	kv := db.New()
	kv.Set("alpha", "one")
	kv.Set("beta", "two")
	m := newModel(kv)

	m.move(-1)
	if m.cursor != 1 {
		t.Fatalf("move(-1) from 0 = %d, want wrap to 1", m.cursor)
	}
	m.move(1)
	if m.cursor != 0 {
		t.Fatalf("move(1) from 1 = %d, want 0", m.cursor)
	}

	m.keyIn.SetValue("beta")
	m.rebuild()
	if m.cursor != 0 {
		t.Fatalf("filtered cursor = %d, want 0", m.cursor)
	}
}

func TestCycleFocus(t *testing.T) {
	m := newModel(db.New())
	if m.focus != focusKey {
		t.Fatalf("initial focus = %v, want focusKey", m.focus)
	}
	m.cycle()
	if m.focus != focusValue {
		t.Fatalf("after first cycle focus = %v, want focusValue", m.focus)
	}
	m.cycle()
	if m.focus != focusTable {
		t.Fatalf("after second cycle focus = %v, want focusTable", m.focus)
	}
	m.cycle()
	if m.focus != focusKey {
		t.Fatalf("after third cycle focus = %v, want focusKey", m.focus)
	}
}

func TestQuitOnlyFromTable(t *testing.T) {
	m := newModel(db.New())

	got, _ := m.Update(tea.KeyPressMsg{Code: 'q', Text: "q"})
	typing, _ := got.(model)
	if typing.keyIn.Value() != "q" {
		t.Fatalf("typing q in the key field should be input, got %q", typing.keyIn.Value())
	}

	m = newModel(db.New())
	m.focus = focusTable
	_, cmd := m.Update(tea.KeyPressMsg{Code: 'q'})
	if cmd == nil {
		t.Fatalf("q in the table should quit")
	}
}
