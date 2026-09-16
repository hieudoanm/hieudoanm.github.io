//go:build gui

package gui

import (
	"context"
	"fmt"
	"net/url"
	"os"
	"time"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

// controller owns the studio window: the document tabs, the inspector
// panes, and the shared status line.
type controller struct {
	app  fyne.App
	win  fyne.Window
	view *container.AppTabs

	docs     *container.DocTabs
	docsTab  *container.TabItem
	themeTab *container.TabItem
	formTab  *container.TabItem
	pages    []*page
	status   *widget.Label

	srv *previewServer

	ctx    context.Context
	cancel context.CancelFunc
}

func newController(a fyne.App, initialPath string) *controller {
	ctx, cancel := context.WithCancel(context.Background())
	c := &controller{
		app:    a,
		ctx:    ctx,
		cancel: cancel,
		status: widget.NewLabel("Ready"),
	}
	c.docs = container.NewDocTabs()
	c.docs.OnClosed = c.closeTab
	if initialPath != "" {
		c.addFile(initialPath)
	} else {
		c.addBlank()
	}
	return c
}

// window assembles and shows the main window.
func (c *controller) window() {
	c.win = c.app.NewWindow("landify studio")
	c.win.Resize(fyne.NewSize(1280, 840))
	c.win.SetMainMenu(c.menu())

	c.docsTab = container.NewTabItem("Editor", c.docs)
	c.themeTab = container.NewTabItem("Theme Studio", widget.NewLabel(""))
	c.formTab = container.NewTabItem("Section Forms", widget.NewLabel(""))
	c.view = container.NewAppTabs(c.docsTab, c.themeTab, c.formTab)
	c.view.OnSelected = func(_ *container.TabItem) {
		c.refreshInspector()
	}

	top := widget.NewToolbar(
		widget.NewToolbarAction(theme.FileIcon(), c.newTab),
		widget.NewToolbarAction(theme.FolderOpenIcon(), c.openFile),
		widget.NewToolbarAction(theme.DocumentSaveIcon(), c.save),
		widget.NewToolbarSeparator(),
		widget.NewToolbarAction(theme.MediaPlayIcon(), c.buildPreview),
		widget.NewToolbarAction(theme.ComputerIcon(), c.openBrowser),
		widget.NewToolbarSeparator(),
		widget.NewToolbarAction(theme.ColorChromaticIcon(), c.openThemeStudio),
		widget.NewToolbarAction(theme.ListIcon(), c.openForms),
	)

	c.refreshTitle()
	c.win.SetContent(container.NewBorder(top, c.status, nil, nil, c.view))
	c.goWatch()
}

func (c *controller) run() {
	c.win.ShowAndRun()
}

func (c *controller) quit() {
	c.cancel()
	c.stopServer()
	c.win.Close()
}

// menu returns the window menu bar.
func (c *controller) menu() *fyne.MainMenu {
	file := fyne.NewMenu("File",
		fyne.NewMenuItem("New", c.newTab),
		fyne.NewMenuItem("Open...", c.openFile),
		fyne.NewMenuItemSeparator(),
		fyne.NewMenuItem("Save", c.save),
		fyne.NewMenuItem("Save As...", c.saveAs),
		fyne.NewMenuItemSeparator(),
		fyne.NewMenuItem("Build & Preview", c.buildPreview),
		fyne.NewMenuItem("Open in Browser", c.openBrowser),
		fyne.NewMenuItemSeparator(),
		fyne.NewMenuItem("Theme Studio", c.openThemeStudio),
		fyne.NewMenuItem("Section Forms", c.openForms),
		fyne.NewMenuItemSeparator(),
		fyne.NewMenuItem("Quit", c.quit),
	)
	return fyne.NewMainMenu(file)
}

// current returns the active page, or nil when no tab is open.
func (c *controller) current() *page {
	if len(c.pages) == 0 {
		return nil
	}
	sel := c.docs.Selected()
	for _, p := range c.pages {
		if p.tab == sel {
			return p
		}
	}
	return c.pages[0]
}

func (c *controller) refreshTitle() {
	if c.win == nil {
		return
	}
	p := c.current()
	if p == nil {
		c.win.SetTitle("landify studio")
		return
	}
	title := "landify studio — " + p.doc.Name()
	if p.dirty {
		title += " •"
	}
	c.win.SetTitle(title)
}

func (c *controller) setStatus(msg string) {
	c.status.SetText(msg)
}

// showError surfaces an error in a dialog once the window exists; before that
// (during startup doc loading) it falls back to stderr.
func (c *controller) showError(err error) {
	if c.win == nil {
		fmt.Fprintln(os.Stderr, "landify studio:", err)
		return
	}
	dialog.ShowError(err, c.win)
}

// statusErr reports a background error on the status line.
func (c *controller) statusErr(prefix string, err error) {
	c.setStatus(fmt.Sprintf("%s: %v", prefix, err))
}

// refreshInspector rebuilds the theme or forms pane for the page that is
// currently selected when the user switches to that inspector tab.
func (c *controller) refreshInspector() {
	p := c.current()
	if p == nil {
		return
	}
	switch c.view.Selected() {
	case c.themeTab:
		c.themeTab.Content = p.themePane()
	case c.formTab:
		c.formTab.Content = p.formPane()
	}
}

func (c *controller) openThemeStudio() {
	c.view.Select(c.themeTab)
}

func (c *controller) openForms() {
	c.view.Select(c.formTab)
}

// openBrowser serves the built page and opens it in the default browser.
func (c *controller) openBrowser() {
	p := c.current()
	if p == nil {
		return
	}
	if c.srv == nil || !c.srv.running() {
		if err := c.startPreview(); err != nil {
			c.showError(err)
			return
		}
	}
	u, err := url.Parse(c.srv.url())
	if err != nil {
		c.showError(fmt.Errorf("parse preview url: %w", err))
		return
	}
	c.app.OpenURL(u)
	c.setStatus("Opened " + c.srv.url())
}

func (c *controller) goWatch() {
	go func() {
		t := time.NewTicker(700 * time.Millisecond)
		defer t.Stop()
		for {
			select {
			case <-c.ctx.Done():
				return
			case <-t.C:
				c.watchTick()
			}
		}
	}()
}

func (c *controller) watchTick() {
	for _, p := range c.pages {
		p.pollFile()
	}
	if c.srv != nil {
		c.srv.rebuild(c.currentDoc())
	}
}

func (c *controller) currentDoc() *Doc {
	p := c.current()
	if p == nil {
		return nil
	}
	return p.doc
}
