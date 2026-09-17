//go:build gui

package gui

import (
	"fmt"
	"sort"
	"strconv"
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"

	"github.com/hieudoanm/kevin/internal/db"
)

const maxValueRunes = 80

// rowWidgets holds the per-row cell widgets reused by the table.
type rowWidgets struct {
	no    *widget.Label
	key   *widget.Label
	value *widget.Label
	edit  *widget.Button
	copy  *widget.Button
	del   *widget.Button
}

// controller wires the key/value manager widgets to the store.
type controller struct {
	kv       *db.DB
	focusKey func()

	keyEntry   *widget.Entry
	valueEntry *widget.Entry
	keyTable   *widget.Table
	tableView  *flexTable
	setBtn     *widget.Button
	refreshBtn *widget.Button
	delAllBtn  *widget.Button
	status     *widget.Label
	count      *widget.Label
	setTitle   func(string)
	confirm    func(string, string, func(bool))
	clipboard  fyne.Clipboard
	actionWide float32

	rows        []rowWidgets
	filtered    []string
	selectedKey string
	lastRender  string
	loading     bool
}

func newController(kv *db.DB, setTitle func(string), confirm func(string, string, func(bool)), clip fyne.Clipboard) *controller {
	c := &controller{
		kv:        kv,
		setTitle:  setTitle,
		confirm:   confirm,
		clipboard: clip,
	}
	c.status = widget.NewLabel("")
	c.status.Alignment = fyne.TextAlignTrailing
	c.status.Importance = widget.LowImportance
	c.count = widget.NewLabel("")
	c.count.TextStyle = fyne.TextStyle{Bold: true}

	c.keyEntry = widget.NewEntry()
	c.keyEntry.SetPlaceHolder("key / search")
	c.keyEntry.OnChanged = func(string) {
		if c.loading {
			return
		}
		c.render()
	}
	c.valueEntry = widget.NewEntry()
	c.valueEntry.SetPlaceHolder("value")

	c.setBtn = widget.NewButtonWithIcon("", theme.DocumentSaveIcon(), c.doSet)
	c.setBtn.Importance = widget.HighImportance
	c.refreshBtn = widget.NewButtonWithIcon("", theme.ViewRefreshIcon(), c.refresh)
	c.delAllBtn = widget.NewButtonWithIcon("", theme.ContentClearIcon(), c.confirmDeleteAll)
	c.delAllBtn.Importance = widget.DangerImportance
	c.actionWide = maxButtonWidth(c.setBtn, c.refreshBtn, c.delAllBtn)

	c.keyTable = widget.NewTableWithHeaders(
		func() (int, int) { return len(c.filtered), columnCount },
		func() fyne.CanvasObject {
			return container.NewHBox(widget.NewButton("", nil))
		},
		func(id widget.TableCellID, obj fyne.CanvasObject) {
			c.updateCell(id.Row, id.Col, obj)
		},
	)
	c.keyTable.ShowHeaderColumn = false
	c.keyTable.ShowHeaderRow = true
	c.keyTable.CreateHeader = headerTemplate
	c.keyTable.UpdateHeader = updateHeader
	c.tableView = newFlexTable(c.keyTable, c.actionWide)

	c.keyTable.OnSelected = func(id widget.TableCellID) {
		if id.Col < 3 && id.Row >= 0 && id.Row < len(c.filtered) {
			c.selectKey(c.filtered[id.Row])
		}
	}
	return c
}

func (c *controller) filterAndSort() []string {
	keys := c.kv.Keys()
	q := strings.ToLower(strings.TrimSpace(c.keyEntry.Text))
	out := keys[:0]
	for _, k := range keys {
		if q == "" {
			out = append(out, k)
			continue
		}
		v, _ := c.kv.Get(k)
		if strings.Contains(strings.ToLower(k), q) || strings.Contains(strings.ToLower(v), q) {
			out = append(out, k)
		}
	}
	sort.Strings(out)
	return out
}

func (c *controller) setStatus(msg string) {
	c.status.SetText(msg)
}

func (c *controller) selectKey(key string) {
	c.selectedKey = key
	c.loadRow(key)
}

func (c *controller) loadRow(key string) {
	c.setKeyText(key)
	value, ok := c.kv.Get(key)
	if ok {
		c.valueEntry.SetText(value)
		c.setStatus("loaded " + key)
		if c.focusKey != nil {
			c.focusKey()
		}
		return
	}
	c.valueEntry.SetText("")
	c.setStatus("key not found: " + key)
}

// setKeyText updates the key entry without treating it as a search edit.
func (c *controller) setKeyText(key string) {
	c.loading = true
	c.keyEntry.SetText(key)
	c.loading = false
}

func (c *controller) syncSelection() {
	if c.selectedKey == "" {
		c.keyTable.UnselectAll()
		return
	}
	for i, k := range c.filtered {
		if k == c.selectedKey {
			c.keyTable.Select(widget.TableCellID{Row: i, Col: 0})
			return
		}
	}
	c.keyTable.UnselectAll()
	c.selectedKey = ""
}

func (c *controller) render() {
	c.filtered = c.filterAndSort()
	snapshot := strings.Join(c.filtered, "\x00")
	if snapshot != c.lastRender {
		c.lastRender = snapshot
		c.rebuildRows()
		c.syncSelection()
	}
	c.keyTable.Refresh()

	total := len(c.kv.Keys())
	c.count.SetText(strconv.Itoa(total))
	c.setTitle(fmt.Sprintf("kevin — Key/Value (%d keys)", total))
}

func truncate(s string, max int) string {
	runes := []rune(s)
	if len(runes) <= max {
		return s
	}
	return string(runes[:max]) + "…"
}
