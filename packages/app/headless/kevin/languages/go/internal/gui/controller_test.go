//go:build gui

package gui

import (
	"testing"

	"fyne.io/fyne/v2/widget"

	_ "fyne.io/fyne/v2/test" // starts a dummy fyne app for widget construction

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

func TestFilterAndSort(t *testing.T) {
	kv := db.New()
	kv.Set("beta", "two")
	kv.Set("alpha", "one")
	kv.Set("gamma", "three")

	c := &controller{kv: kv, keyEntry: widget.NewEntry()}

	c.keyEntry.SetText("")
	got := c.filterAndSort()
	if len(got) != 3 || got[0] != "alpha" || got[2] != "gamma" {
		t.Fatalf("no filter: got %v, want [alpha beta gamma]", got)
	}

	c.keyEntry.SetText("be")
	got = c.filterAndSort()
	if len(got) != 1 || got[0] != "beta" {
		t.Fatalf("key filter 'be': got %v, want [beta]", got)
	}

	c.keyEntry.SetText("three")
	got = c.filterAndSort()
	if len(got) != 1 || got[0] != "gamma" {
		t.Fatalf("value filter 'three': got %v, want [gamma]", got)
	}
}

func TestDoCopyKey(t *testing.T) {
	kv := db.New()
	kv.Set("alpha", "one")
	clip := &fakeClipboard{}
	c := &controller{kv: kv, status: widget.NewLabel(""), clipboard: clip}

	c.doCopyKey("alpha")
	if clip.content != "one" {
		t.Fatalf("copied %q, want one", clip.content)
	}
}

type fakeClipboard struct {
	content string
}

func (f *fakeClipboard) Content() string { return f.content }
func (f *fakeClipboard) SetContent(content string) {
	f.content = content
}
