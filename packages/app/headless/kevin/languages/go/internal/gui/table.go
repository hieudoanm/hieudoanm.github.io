//go:build gui

package gui

import (
	"strconv"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

func headerTemplate() fyne.CanvasObject {
	l := widget.NewLabel("")
	l.TextStyle.Bold = true
	l.Alignment = fyne.TextAlignCenter
	return l
}

func updateHeader(id widget.TableCellID, obj fyne.CanvasObject) {
	label := obj.(*widget.Label)
	switch id.Col {
	case 0:
		label.SetText("No")
	case 1:
		label.SetText("Key")
	case 2:
		label.SetText("Value")
	default:
		label.SetText("")
	}
}

func (c *controller) updateCell(row, col int, obj fyne.CanvasObject) {
	if row < 0 || row >= len(c.rows) {
		return
	}
	box := obj.(*fyne.Container)
	rw := &c.rows[row]
	if col == 0 || col >= 3 {
		box.Layout = layout.NewCenterLayout()
	} else {
		box.Layout = layout.NewHBoxLayout()
	}
	var child fyne.CanvasObject
	switch col {
	case 0:
		rw.no.SetText(strconv.Itoa(row + 1))
		child = rw.no
	case 1:
		rw.key.SetText(c.filtered[row])
		child = rw.key
	case 2:
		value, _ := c.kv.Get(c.filtered[row])
		rw.value.SetText(truncate(value, maxValueRunes))
		child = rw.value
	case 3:
		child = rw.edit
	case 4:
		child = rw.copy
	case 5:
		child = rw.del
	}
	box.Objects = []fyne.CanvasObject{child}
	box.Refresh()
}

// rebuildRows recreates the per-row widgets for the current filtered keys.
func (c *controller) rebuildRows() {
	c.rows = make([]rowWidgets, len(c.filtered))
	for i, k := range c.filtered {
		rw := &c.rows[i]
		rw.no = widget.NewLabel("")
		rw.key = widget.NewLabel("")
		rw.key.Wrapping = fyne.TextTruncate
		rw.value = widget.NewLabel("")
		rw.value.Wrapping = fyne.TextTruncate
		rw.edit = widget.NewButtonWithIcon("", theme.DocumentCreateIcon(), func() {
			c.selectKey(k)
		})
		rw.copy = widget.NewButtonWithIcon("", theme.ContentCopyIcon(), func() {
			c.doCopyKey(k)
		})
		rw.del = widget.NewButtonWithIcon("", theme.DeleteIcon(), func() {
			c.confirmDelete(k)
		})
	}
}
