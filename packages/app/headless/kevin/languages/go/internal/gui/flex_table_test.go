//go:build gui

package gui

import (
	"testing"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/test"
	"fyne.io/fyne/v2/theme"

	"github.com/hieudoanm/kevin/internal/db"
)

func TestFlexTableStretchColumns(t *testing.T) {
	c := newController(db.New(), func(string) {}, func(string, string, func(bool)) {}, test.NewClipboard())

	c.tableView.Resize(fyne.NewSize(800, 400))

	padding := c.keyTable.Theme().Size(theme.SizeNamePadding)
	widths := columnWidths(800, padding, c.actionWide)
	if c.tableView.keyWidth != widths[1] {
		t.Fatalf("key width = %v, want %v", c.tableView.keyWidth, widths[1])
	}
	if c.tableView.keyWidth != c.tableView.valueWidth {
		t.Fatalf("key width %v != value width %v", c.tableView.keyWidth, c.tableView.valueWidth)
	}
}

func TestFlexTableKeepsKeyValueReadableWhenNarrow(t *testing.T) {
	c := newController(db.New(), func(string) {}, func(string, string, func(bool)) {}, test.NewClipboard())

	c.tableView.Resize(fyne.NewSize(200, 400))

	if c.tableView.keyWidth != minKeyValueWidth {
		t.Fatalf("key width = %v, want %v", c.tableView.keyWidth, minKeyValueWidth)
	}
}

func TestBuildContentWiresFlexTable(t *testing.T) {
	kv := db.New()
	kv.Set("alpha", "one")
	c := newController(kv, func(string) {}, func(string, string, func(bool)) {}, test.NewClipboard())
	c.render()

	w := test.NewWindow(buildContent(c))
	w.Resize(fyne.NewSize(800, 400))

	if c.tableView.valueWidth <= minKeyValueWidth {
		t.Fatalf("flex table not resized by layout: value width = %v", c.tableView.valueWidth)
	}
}
