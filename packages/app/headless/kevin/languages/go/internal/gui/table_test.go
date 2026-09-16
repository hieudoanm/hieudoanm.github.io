//go:build gui

package gui

import (
	"testing"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"

	"github.com/hieudoanm/kevin/internal/db"
)

func TestUpdateHeader(t *testing.T) {
	tests := []struct {
		name  string
		col   int
		label string
	}{
		{"no", 0, "No"},
		{"key", 1, "Key"},
		{"value", 2, "Value"},
		{"edit", 3, ""},
		{"copy", 4, ""},
		{"delete", 5, ""},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			obj := headerTemplate()
			updateHeader(widget.TableCellID{Row: -1, Col: tt.col}, obj)
			label := obj.(*widget.Label)
			if label.Text != tt.label {
				t.Fatalf("col %d header = %q, want %q", tt.col, label.Text, tt.label)
			}
		})
	}
}

func TestRebuildRows(t *testing.T) {
	kv := db.New()
	kv.Set("a", "1")
	kv.Set("b", "2")
	kv.Set("c", "3")

	c := &controller{kv: kv}
	c.filtered = []string{"a", "b", "c"}
	c.rebuildRows()

	if len(c.rows) != 3 {
		t.Fatalf("rows = %d, want 3", len(c.rows))
	}
	for i, rw := range c.rows {
		if rw.no == nil || rw.key == nil || rw.value == nil || rw.edit == nil || rw.copy == nil || rw.del == nil {
			t.Fatalf("row %d has nil widget", i)
		}
	}
}

func TestBuildCell(t *testing.T) {
	kv := db.New()
	kv.Set("alpha", "one")

	c := &controller{kv: kv}
	c.filtered = []string{"alpha"}
	c.rebuildRows()

	template := func() *fyne.Container {
		return container.NewHBox(widget.NewLabel(""))
	}

	cases := []struct {
		col int
		obj *fyne.Container
	}{
		{0, template()},
		{1, template()},
		{2, template()},
		{3, template()},
		{4, template()},
		{5, template()},
	}
	for _, tt := range cases {
		c.updateCell(0, tt.col, tt.obj)
		switch tt.col {
		case 0:
			label := tt.obj.Objects[0].(*widget.Label)
			if label.Text != "1" {
				t.Fatalf("no cell = %q, want 1", label.Text)
			}
		case 1:
			label := tt.obj.Objects[0].(*widget.Label)
			if label.Text != "alpha" {
				t.Fatalf("key cell = %q, want alpha", label.Text)
			}
		case 2:
			label := tt.obj.Objects[0].(*widget.Label)
			if label.Text != "one" {
				t.Fatalf("value cell = %q, want one", label.Text)
			}
		case 3:
			assertActionCell(t, tt.obj, "edit")
		case 4:
			assertActionCell(t, tt.obj, "copy")
		case 5:
			assertActionCell(t, tt.obj, "delete")
		}
	}
}

func assertActionCell(t *testing.T, box *fyne.Container, name string) {
	t.Helper()
	btn, ok := box.Objects[0].(*widget.Button)
	if !ok || btn.OnTapped == nil {
		t.Fatalf("%s cell missing button callback", name)
	}
	box.Resize(fyne.NewSize(200, 40))
	box.Layout.Layout(box.Objects, box.Size())
	if x := box.Objects[0].Position().X; x <= 0 {
		t.Fatalf("%s button not centered: x = %v", name, x)
	}
}
