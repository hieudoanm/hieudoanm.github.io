//go:build gui

package gui

import (
	"fmt"
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

// collectionWidget edits one YAML list (e.g. features.items) generically:
// add, remove, reorder, and per-item edit dialogs driven by the schema
// catalogue.
type collectionWidget struct {
	p    *page
	path string
	box  *fyne.Container
}

func newCollectionWidget(p *page, path string) *collectionWidget {
	return &collectionWidget{p: p, path: path, box: container.NewVBox()}
}

func (cw *collectionWidget) content() fyne.CanvasObject {
	add := widget.NewButtonWithIcon("Add", theme.ContentAddIcon(), cw.add)
	header := container.NewHBox(
		widget.NewLabelWithStyle(CollectionLabel(cw.path), fyne.TextAlignLeading, fyne.TextStyle{Bold: true}),
		add,
	)
	cw.refresh()
	return container.NewVBox(header, cw.box)
}

func (cw *collectionWidget) add() {
	next, err := AddItem(cw.p.doc.YAML, cw.path, CollectionTemplate(cw.path))
	if err != nil {
		cw.p.ctrl.statusErr("add", err)
		return
	}
	cw.commit(next)
}

func (cw *collectionWidget) remove(idx int) {
	next, err := RemoveItem(cw.p.doc.YAML, cw.path, idx)
	if err != nil {
		cw.p.ctrl.statusErr("remove", err)
		return
	}
	cw.commit(next)
}

func (cw *collectionWidget) move(idx, delta int) {
	next, err := MoveItem(cw.p.doc.YAML, cw.path, idx, delta)
	if err != nil {
		cw.p.ctrl.statusErr("move", err)
		return
	}
	cw.commit(next)
}

func (cw *collectionWidget) commit(next string) {
	if next == cw.p.doc.YAML {
		return
	}
	cw.p.doc.Replace(next)
	cw.p.dirty = true
	cw.p.ctrl.refreshTitle()
	cw.p.reloadEditor()
	cw.refresh()
	cw.p.ctrl.setStatus("Updated " + cw.path)
}

// refresh rebuilds the item rows from the current document YAML.
func (cw *collectionWidget) refresh() {
	cw.box.Objects = nil
	count, err := CollectionCount(cw.p.doc.YAML, cw.path)
	if err != nil {
		cw.box.Objects = []fyne.CanvasObject{widget.NewLabel(err.Error())}
		cw.box.Refresh()
		return
	}
	if count == 0 {
		cw.box.Objects = []fyne.CanvasObject{widget.NewLabel("(empty)")}
		cw.box.Refresh()
		return
	}
	rows := make([]fyne.CanvasObject, 0, count)
	for i := 0; i < count; i++ {
		rows = append(rows, cw.itemRow(i, count))
	}
	cw.box.Objects = rows
	cw.box.Refresh()
}

func (cw *collectionWidget) itemRow(idx, count int) fyne.CanvasObject {
	summary := cw.summary(idx)
	label := widget.NewLabel(fmt.Sprintf("%d. %s", idx+1, summary))
	label.Wrapping = fyne.TextWrapWord
	buttons := container.NewHBox(
		widget.NewButtonWithIcon("", theme.MoveUpIcon(), func() { cw.move(idx, -1) }),
		widget.NewButtonWithIcon("", theme.MoveDownIcon(), func() { cw.move(idx, 1) }),
		widget.NewButton("Edit…", func() { cw.edit(idx) }),
		widget.NewButtonWithIcon("", theme.DeleteIcon(), func() { cw.remove(idx) }),
	)
	buttons.Hide()
	if count > 1 {
		buttons.Show()
	}
	return container.NewVBox(label, buttons)
}

func (cw *collectionWidget) summary(idx int) string {
	values, err := GetItem(cw.p.doc.YAML, cw.path, idx)
	if err != nil {
		return ""
	}
	if len(values) == 0 {
		return "(empty)"
	}
	for _, key := range CollectionKeys(cw.path) {
		if v, ok := values[key]; ok && strings.TrimSpace(v) != "" {
			if len(v) > 48 {
				return v[:48] + "…"
			}
			return v
		}
	}
	// fall back to any value (nested keys not in the flat list)
	for _, v := range values {
		if strings.TrimSpace(v) != "" {
			return v
		}
	}
	return "(empty)"
}

// edit opens a dialog of per-key entries prefilled from the current item.
func (cw *collectionWidget) edit(idx int) {
	values, err := GetItem(cw.p.doc.YAML, cw.path, idx)
	if err != nil {
		cw.p.ctrl.statusErr("edit", err)
		return
	}
	keys := CollectionKeys(cw.path)
	entries := make(map[string]*widget.Entry, len(keys))
	rows := make([]fyne.CanvasObject, 0, len(keys))
	for _, key := range keys {
		label := "value"
		if key != "" {
			label = key
		}
		e := widget.NewEntry()
		e.SetText(values[key])
		entries[key] = e
		rows = append(rows, container.NewHBox(widget.NewLabel(label+":"), e))
	}
	content := container.NewVBox(rows...)
	dialog.ShowCustomConfirm(
		"Item "+fmt.Sprint(idx+1)+" — "+CollectionLabel(cw.path),
		"Save", "Cancel",
		content,
		func(ok bool) {
			if !ok {
				return
			}
			saved := make(map[string]string, len(entries))
			for k, ie := range entries {
				saved[k] = ie.Text
			}
			next, err := SetItem(cw.p.doc.YAML, cw.path, idx, CollectionTemplate(cw.path), saved)
			if err != nil {
				cw.p.ctrl.statusErr("edit", err)
				return
			}
			cw.commit(next)
		},
		cw.p.ctrl.win,
	)
}
