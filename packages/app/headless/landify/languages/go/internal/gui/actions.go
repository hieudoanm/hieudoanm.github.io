//go:build gui

package gui

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
)

// addTab opens a new page for doc, selects it, and refreshes the title.
func (c *controller) addTab(doc *Doc) {
	p := newPage(c, doc)
	tab := container.NewTabItem(doc.Name(), p.content())
	p.tab = tab
	c.docs.Append(tab)
	c.pages = append(c.pages, p)
	c.docs.Select(tab)
	c.refreshTitle()
	c.setStatus("Opened " + doc.Name())
}

func (c *controller) addBlank() {
	doc, err := NewBlank()
	if err != nil {
		c.showError(err)
		return
	}
	c.addTab(doc)
	c.setStatus("New document (product scaffold)")
}

func (c *controller) addFile(path string) {
	doc, err := NewFile(path)
	if err != nil {
		c.showError(err)
		return
	}
	c.addTab(doc)
}

func (c *controller) newTab() {
	c.addBlank()
}

// closeTab removes a page after its tab closes. The tab has already been
// removed from the DocTabs by the time this runs.
func (c *controller) closeTab(_ *container.TabItem) {
	removed := c.current()
	if removed == nil {
		return
	}
	for i, p := range c.pages {
		if p == removed {
			c.pages = append(c.pages[:i], c.pages[i+1:]...)
			break
		}
	}
	c.refreshTitle()
}

func (c *controller) openFile() {
	dialog.ShowFileOpen(func(rc fyne.URIReadCloser, err error) {
		if err != nil {
			c.showError(err)
			return
		}
		if rc == nil {
			return
		}
		path := rc.URI().Path()
		rc.Close()
		c.addFile(path)
	}, c.win)
}

func (c *controller) save() {
	p := c.current()
	if p == nil {
		return
	}
	if p.doc.Path == "" {
		c.saveAs()
		return
	}
	if err := p.doc.Save(); err != nil {
		c.showError(err)
		return
	}
	p.dirty = false
	c.refreshTitle()
	c.setStatus("Saved " + p.doc.Path)
}

func (c *controller) saveAs() {
	p := c.current()
	if p == nil {
		return
	}
	dialog.ShowFileSave(func(wr fyne.URIWriteCloser, err error) {
		if err != nil {
			c.showError(err)
			return
		}
		if wr == nil {
			return
		}
		path := wr.URI().Path()
		wr.Close()
		if err := p.doc.SaveAs(path); err != nil {
			c.showError(err)
			return
		}
		p.dirty = false
		p.tab.Text = p.doc.Name()
		c.refreshTitle()
		c.setStatus("Saved " + path)
	}, c.win)
}
