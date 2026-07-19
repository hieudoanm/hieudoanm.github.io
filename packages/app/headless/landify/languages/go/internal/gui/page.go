//go:build gui

package gui

import (
	"os"
	"strings"
	"time"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"

	"landify/internal/landify"
)

// page is one open document tab: the YAML editor, its live issues list, and a
// split preview of the generated page source.
type page struct {
	ctrl *controller
	doc  *Doc
	tab  *container.TabItem

	loading bool
	dirty   bool

	typeSel *widget.Select
	editor  *widget.Entry
	issues  *widget.Label
	hints   *widget.Label
	preview *widget.Entry

	lastMod  time.Time
	lastSize int64
}

func newPage(c *controller, doc *Doc) *page {
	p := &page{ctrl: c, doc: doc}

	p.typeSel = widget.NewSelect(landify.KnownTypes(), p.applyType)
	p.editor = widget.NewEntry()
	p.editor.MultiLine = true
	p.editor.Wrapping = fyne.TextWrapWord
	p.editor.OnChanged = p.onYAMLChanged
	p.editor.SetPlaceHolder("# landify.yaml — start typing…")

	p.issues = widget.NewLabel("")
	p.issues.Wrapping = fyne.TextWrapWord

	p.hints = widget.NewLabel("")
	p.hints.Wrapping = fyne.TextWrapWord

	p.preview = widget.NewEntry()
	p.preview.MultiLine = true
	p.preview.Wrapping = fyne.TextWrapWord
	p.preview.Disable()
	p.preview.SetPlaceHolder("Generated HTML appears here as you type.")

	p.renderDerived()
	return p
}

func (p *page) content() fyne.CanvasObject {
	header := container.NewHBox(
		widget.NewLabel("Page type:"),
		p.typeSel,
		widget.NewButton("Build & Preview", p.ctrl.buildPreview),
	)
	editorSide := container.NewBorder(
		header, container.NewVBox(p.issues, p.hints), nil, nil, p.editor,
	)
	previewSide := container.NewBorder(
		container.NewHBox(
			widget.NewButton("Open in Browser", p.ctrl.openBrowser),
			widget.NewLabel("Generated HTML"),
		),
		nil, nil, nil, p.preview,
	)
	return container.NewHSplit(editorSide, previewSide)
}

func (p *page) onYAMLChanged(text string) {
	if p.loading {
		return
	}
	p.doc.Replace(text)
	p.dirty = true
	p.ctrl.refreshTitle()
	p.renderDerived()
}

// applyType replaces the document with the annotated scaffold for the type
// selected in typeSel. Unsaved changes are overwritten.
func (p *page) applyType(typ string) {
	if p.loading || typ == "" {
		return
	}
	if err := p.doc.ApplyType(typ); err != nil {
		p.ctrl.statusErr("scaffold", err)
		return
	}
	p.dirty = true
	p.ctrl.setStatus("Switched to the " + typ + " layout")
	p.reloadEditor()
}

// reloadEditor pushes the document YAML into the editor without treating it
// as a user edit, then re-renders every derived pane.
func (p *page) reloadEditor() {
	p.loading = true
	defer func() { p.loading = false }()
	selected := p.typeSel.Selected
	p.editor.SetText(p.doc.YAML)
	if typ := p.doc.Type(); typ != selected {
		p.typeSel.SetSelected(typ)
	}
	p.renderDerived()
}

// renderDerived refreshes the issues, hints, preview, and tab title for the
// current document content.
func (p *page) renderDerived() {
	issues := p.doc.Issues()
	switch {
	case len(issues) == 0:
		p.issues.SetText("Valid — schema and theme OK")
	case len(issues) == 1:
		p.issues.SetText(issues[0])
	default:
		p.issues.SetText("- " + strings.Join(issues, "\n- "))
	}
	p.hints.SetText(strings.Join(MediaHints(p.doc.Type()), "\n"))

	html, err := p.doc.HTML()
	if err != nil {
		p.preview.SetText("Preview unavailable: " + err.Error())
		return
	}
	p.preview.SetText(html)
}

// pollFile reloads the document from disk when it changed and the page is not
// mid-edit, so external edits flow into the studio.
func (p *page) pollFile() {
	if p.doc.Path == "" || p.loading {
		return
	}
	fi, err := os.Stat(p.doc.Path)
	if err != nil {
		return
	}
	if p.lastSize == 0 && p.lastMod.IsZero() {
		p.lastMod, p.lastSize = fi.ModTime(), fi.Size()
		return
	}
	if fi.ModTime().Equal(p.lastMod) && fi.Size() == p.lastSize {
		return
	}
	p.lastMod, p.lastSize = fi.ModTime(), fi.Size()
	data, err := os.ReadFile(p.doc.Path)
	if err != nil {
		return
	}
	p.doc.Replace(string(data))
	p.dirty = false
	p.reloadEditor()
	p.ctrl.refreshTitle()
	if p == p.ctrl.current() {
		p.ctrl.setStatus("Reloaded " + p.doc.Path)
	}
}
