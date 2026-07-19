//go:build gui

package gui

import (
	"errors"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

var errNoConfig = errors.New("cannot edit: YAML does not parse")

// formWidgets binds the section form inspector: a section selector plus one
// input per editable field, an Apply button, and the section's collection
// editors.
type formWidgets struct {
	p          *page
	secSel     *widget.Select
	sectionBox *fyne.Container

	fieldEntries map[string]*widget.Entry
	fieldSelects map[string]*widget.Select
	collections  []*collectionWidget
}

func (p *page) formPane() fyne.CanvasObject {
	fw := &formWidgets{
		p:            p,
		fieldEntries: map[string]*widget.Entry{},
		fieldSelects: map[string]*widget.Select{},
	}
	sections := ContentSections(p.doc.Type())
	names := make([]string, len(sections))
	for i, s := range sections {
		names[i] = s.Label
	}
	fw.secSel = widget.NewSelect(names, func(_ string) {
		fw.buildSection(sections)
	})
	fw.sectionBox = container.NewVBox()
	fw.buildSection(sections)
	fw.secSel.SetSelected("Site")

	return container.NewScroll(container.NewVBox(
		widget.NewLabel("Dispatch fields to the YAML section you want to edit; Apply writes them in. Items inside lists use Add / up / down / Edit / Remove below each section."),
		widget.NewLabel("Section"),
		fw.secSel,
		widget.NewSeparator(),
		fw.sectionBox,
	))
}

func (fw *formWidgets) buildSection(sections []Section) {
	fw.fieldEntries = map[string]*widget.Entry{}
	fw.fieldSelects = map[string]*widget.Select{}
	fw.collections = nil

	var body []fyne.CanvasObject
	var chosen *Section
	for i := range sections {
		if sections[i].Label == fw.secSel.Selected {
			chosen = &sections[i]
			break
		}
	}
	if chosen == nil {
		if len(sections) > 0 {
			chosen = &sections[0]
		}
	}
	if chosen == nil {
		return
	}

	for _, f := range chosen.Fields {
		row := container.NewHBox(widget.NewLabel(f.Label+":"), fw.inputFor(f))
		body = append(body, row)
	}
	apply := widget.NewButton("Apply section values", fw.applyValues)
	body = append(body, apply)

	if len(chosen.Collections) > 0 {
		body = append(body, widget.NewSeparator())
		body = append(body, widget.NewLabelWithStyle("Items", fyne.TextAlignLeading, fyne.TextStyle{Bold: true}))
		for _, path := range chosen.Collections {
			cw := newCollectionWidget(fw.p, path)
			fw.collections = append(fw.collections, cw)
			body = append(body, cw.content())
		}
	}
	fw.sectionBox.Objects = body
	fw.sectionBox.Refresh()
}

func (fw *formWidgets) inputFor(f Field) fyne.CanvasObject {
	switch f.Kind {
	case FieldSelect:
		sel := widget.NewSelect(f.Options, nil)
		fw.fieldSelects[f.Key] = sel
		return sel
	case FieldArea:
		e := widget.NewEntry()
		e.MultiLine = true
		e.Wrapping = fyne.TextWrapWord
		fw.fieldEntries[f.Key] = e
		return e
	default:
		e := widget.NewEntry()
		fw.fieldEntries[f.Key] = e
		return e
	}
}

func (fw *formWidgets) applyValues() {
	if fw.p.doc.Config() == nil {
		fw.p.ctrl.statusErr("forms", errNoConfig)
		return
	}
	values := readFieldValues(fw.fieldEntries, fw.fieldSelects)
	next, err := ApplySectionFields(fw.p.doc.YAML, values)
	if err != nil {
		fw.p.ctrl.statusErr("forms", err)
		return
	}
	fw.p.doc.Replace(next)
	fw.p.dirty = true
	fw.p.ctrl.refreshTitle()
	if fw.p.doc.Valid() {
		fw.p.reloadEditor()
		fw.p.ctrl.setStatus("Section values applied")
	} else {
		fw.p.reloadEditor()
		fw.p.ctrl.setStatus("Applied — schema still has issues")
	}
}

func readFieldValues(entries map[string]*widget.Entry, selects map[string]*widget.Select) map[string]string {
	out := map[string]string{}
	for k, e := range entries {
		out[k] = e.Text
	}
	for k, s := range selects {
		out[k] = s.Selected
	}
	return out
}
