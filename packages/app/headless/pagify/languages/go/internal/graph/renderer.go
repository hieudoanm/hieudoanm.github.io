// Package renderer writes a standalone, offline-capable interactive graph
// HTML document. It uses html/template so filenames and titles are escaped
// safely, and injects graph data through template.JS inside a <script> block.
package graph

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"strings"

	"pagify/internal/graph/assets"
)

// GraphData is the view model passed to the HTML template.
type GraphData struct {
	Title     string
	Stats     GraphStats
	GraphJSON template.JS
	CSS       template.CSS
	VendorJS  template.JS
	AppJS     template.JS
}

// GraphStats is a small summary shown in the template header.
type GraphStats struct {
	Nodes int
	Edges int
}

// RenderHTML writes a standalone interactive graph HTML document to outPath.
// The graph is serialized to JSON and embedded as a single window.__GRAPH_DATA__
// object, which the embedded app.js reads. template.JS escapes the value for
// safe inclusion inside a <script> element.
func RenderHTML(g *Graph, title, outPath string) error {
	if strings.TrimSpace(title) == "" {
		title = "File Graph"
	}

	// Build the view model the template and app.js consume. Nodes carry a
	// label and degree so the UI can show filenames and connection counts.
	nodes := make([]nodeView, 0, len(g.Nodes))
	degree := make(map[string]int, len(g.Nodes))
	for _, e := range g.Edges {
		degree[e.Source]++
		degree[e.Target]++
	}
	for _, n := range g.Nodes {
		nodes = append(nodes, nodeView{
			ID:        n.ID,
			Label:     filepath.Base(n.ID),
			Path:      n.ID,
			Extension: n.Extension,
			Degree:    degree[n.ID],
		})
	}

	edges := make([]edgeView, 0, len(g.Edges))
	for _, e := range g.Edges {
		edges = append(edges, edgeView{From: e.Source, To: e.Target})
	}

	data := graphPayload{Nodes: nodes, Edges: edges}
	payload, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("marshal graph payload: %w", err)
	}

	css, err := assets.Styles()
	if err != nil {
		return fmt.Errorf("read styles: %w", err)
	}
	vjs, err := assets.VendorJS()
	if err != nil {
		return fmt.Errorf("read vendor js: %w", err)
	}
	appjs, err := assets.AppJS()
	if err != nil {
		return fmt.Errorf("read app js: %w", err)
	}
	tplSource, err := assets.Template()
	if err != nil {
		return fmt.Errorf("read template: %w", err)
	}

	tpl, err := template.New("graph").Parse(string(tplSource))
	if err != nil {
		return fmt.Errorf("parse template: %w", err)
	}

	tmplData := GraphData{
		Title:     title,
		Stats:     GraphStats{Nodes: len(nodes), Edges: len(edges)},
		GraphJSON: template.JS(payload),
		CSS:       template.CSS(css),
		VendorJS:  template.JS(vjs),
		AppJS:     template.JS(appjs),
	}

	var buf bytes.Buffer
	if err := tpl.ExecuteTemplate(&buf, "page", tmplData); err != nil {
		return fmt.Errorf("execute template: %w", err)
	}

	if err := os.MkdirAll(filepath.Dir(outPath), 0o755); err != nil {
		return fmt.Errorf("create output dir %s: %w", filepath.Dir(outPath), err)
	}
	if err := os.WriteFile(outPath, buf.Bytes(), 0o644); err != nil {
		return fmt.Errorf("write %s: %w", outPath, err)
	}
	return nil
}

// WriteHTML is a convenience wrapper used by the CLI.
func WriteHTML(g *Graph, title, outPath string) error {
	return RenderHTML(g, title, outPath)
}

// nodeView is the JSON shape the embedded app.js consumes.
type nodeView struct {
	ID        string `json:"id"`
	Label     string `json:"label"`
	Path      string `json:"path"`
	Extension string `json:"extension,omitempty"`
	Degree    int    `json:"degree"`
}

// edgeView is the JSON shape the embedded app.js consumes.
type edgeView struct {
	From string `json:"from"`
	To   string `json:"to"`
}

// graphPayload is the top-level object injected as window.__GRAPH_DATA__.
type graphPayload struct {
	Nodes []nodeView `json:"nodes"`
	Edges []edgeView `json:"edges"`
}
