//go:build gui

package gui

import (
	"context"
	"errors"
	"fmt"
	"net"
	"os"
	"path/filepath"

	"fyne.io/fyne/v2/dialog"

	"landify/internal/landify"
)

// previewServer serves a directory containing the generated index.html over a
// random localhost port.
type previewServer struct {
	ctrl   *controller
	ctx    context.Context
	cancel context.CancelFunc
	ln     net.Listener
	dir    string
}

func (ps *previewServer) running() bool {
	return ps != nil && ps.ln != nil
}

func (ps *previewServer) url() string {
	if !ps.running() {
		return ""
	}
	return "http://" + ps.ln.Addr().String() + "/"
}

// start serves dir, restarting when the directory changes.
func (ps *previewServer) start(dir string) error {
	if ps.running() && ps.dir == dir {
		return nil
	}
	ps.stop()
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return fmt.Errorf("listen for preview: %w", err)
	}
	ctx, cancel := context.WithCancel(ps.ctrl.ctx)
	ps.ctx, ps.cancel = ctx, cancel
	ps.ln, ps.dir = ln, dir
	go func() { _ = landify.Serve(ctx, dir, ln) }()
	return nil
}

func (ps *previewServer) stop() {
	if ps.cancel != nil {
		ps.cancel()
	}
	if ps.ln != nil {
		ps.ln.Close()
	}
	ps.ctx, ps.cancel, ps.ln, ps.dir = nil, nil, nil, ""
}

// rebuild re-renders the current document into the served directory, keeping
// the preview in sync while only rebuilding when the document is valid.
func (ps *previewServer) rebuild(doc *Doc) {
	if !ps.running() || doc == nil {
		return
	}
	html, err := doc.HTML()
	if err != nil {
		return
	}
	_ = os.WriteFile(filepath.Join(ps.dir, "index.html"), []byte(html), 0o644)
}

// buildDir is the directory that receives index.html: beside the source file
// when the document is saved, otherwise a fresh temp dir.
func (p *page) buildDir() (string, error) {
	if p.doc.Path != "" {
		return filepath.Dir(p.doc.Path), nil
	}
	return os.MkdirTemp("", "landify-studio-")
}

// buildPreview renders the active document to index.html, starts the preview
// server, and reports the output path.
func (c *controller) buildPreview() {
	p := c.current()
	if p == nil {
		dialog.ShowInformation("landify studio", "Open or create a document first.", c.win)
		return
	}
	dir, err := p.buildDir()
	if err != nil {
		c.showError(err)
		return
	}
	output := filepath.Join(dir, "index.html")
	if err := p.doc.Build(output); err != nil {
		c.showError(err)
		return
	}
	if c.srv == nil {
		c.srv = &previewServer{ctrl: c}
	}
	if err := c.srv.start(dir); err != nil {
		c.showError(err)
		return
	}
	c.srv.rebuild(p.doc)
	c.setStatus("Built " + output + " — serving at " + c.srv.url())
}

// startPreview ensures index.html exists and a server is running for it.
func (c *controller) startPreview() error {
	p := c.current()
	if p == nil {
		return errors.New("no document open")
	}
	dir, err := p.buildDir()
	if err != nil {
		return err
	}
	if c.srv == nil {
		c.srv = &previewServer{ctrl: c}
	}
	if err := c.srv.start(dir); err != nil {
		return err
	}
	c.srv.rebuild(p.doc)
	return nil
}

// stopServer cancels a running preview server (window teardown).
func (c *controller) stopServer() {
	if c.srv != nil {
		c.srv.stop()
	}
}
