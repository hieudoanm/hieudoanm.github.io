package graph

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
)

type Node struct {
	ID        string `json:"id"`
	Path      string `json:"path"`
	Extension string `json:"extension"`
}

type Edge struct {
	Source   string `json:"source"`
	Target   string `json:"target"`
	RawLink  string `json:"raw_link"`
	Line     int    `json:"line"`
	Fragment string `json:"fragment,omitempty"`
	Status   string `json:"status"`
}

type Stats struct {
	Files         int `json:"files"`
	IgnoredFiles  int `json:"ignored_files"`
	Links         int `json:"links"`
	BrokenLinks   int `json:"broken_links"`
	ResolvedLinks int `json:"resolved_links"`
	SelfLinks     int `json:"self_links"`
	OrphanFiles   int `json:"orphan_files"`
	Components    int `json:"components"`
}

type Graph struct {
	Version int    `json:"version"`
	Root    string `json:"root"`
	Nodes   []Node `json:"nodes"`
	Edges   []Edge `json:"edges"`
	Stats   Stats  `json:"stats"`
}

func ScanMarkdown(root string) (*Graph, error) {
	rootAbs, err := filepath.Abs(root)
	if err != nil {
		return nil, err
	}
	// collect candidate md files
	found := []string{}
	err = filepath.WalkDir(rootAbs, func(path string, d os.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}
		ext := strings.ToLower(filepath.Ext(path))
		if ext != ".md" && ext != ".mdx" {
			return nil
		}
		rel, err := filepath.Rel(rootAbs, path)
		if err != nil {
			return nil
		}
		rel = filepath.ToSlash(rel)
		// skip output artifacts
		base := filepath.Base(path)
		if base == "graph.json" || base == "graph.dot" {
			return nil
		}
		found = append(found, rel)
		return nil
	})
	if err != nil {
		return nil, err
	}

	// git ignore
	ignored := map[string]bool{}
	if len(found) > 0 {
		cmd := exec.Command("git", "-C", rootAbs, "check-ignore", "--stdin", "-z")
		in, _ := cmd.StdinPipe()
		go func() {
			fmt.Fprint(in, strings.Join(found, "\x00"))
			in.Close()
		}()
		out, _ := cmd.Output()
		for _, p := range strings.Split(string(out), "\x00") {
			if p != "" {
				ignored[p] = true
			}
		}
	}

	var files []string
	for _, f := range found {
		if ignored[f] {
			continue
		}
		files = append(files, f)
	}
	sort.Strings(files)

	g := &Graph{Version: 1, Root: rootAbs, Nodes: []Node{}, Edges: []Edge{}}
	nodeSet := map[string]bool{}
	for _, f := range files {
		id := f
		g.Nodes = append(g.Nodes, Node{ID: id, Path: id, Extension: filepath.Ext(f)})
		nodeSet[id] = true
	}

	linkRe := regexp.MustCompile(`\[[^\]]*\]\(([^)]+)\)`)
	// Matches inline code spans so they can be stripped before link scanning.
	inlineCodeRe := regexp.MustCompile("`[^`]*`")

	// parse links
	for _, f := range files {
		fp := filepath.Join(rootAbs, filepath.FromSlash(f))
		data, err := os.ReadFile(fp)
		if err != nil {
			continue
		}
		lines := strings.Split(string(data), "\n")
		inFence := false
		var fenceChar byte
		for i, line := range lines {
			// Track fenced code blocks so links inside them are ignored.
			// The fence is closed only by a line of the same fence char.
			trimmed := strings.TrimSpace(line)
			if strings.HasPrefix(trimmed, "```") || strings.HasPrefix(trimmed, "~~~") {
				fc := trimmed[0]
				if !inFence {
					inFence = true
					fenceChar = fc
				} else if fc == fenceChar {
					inFence = false
					fenceChar = 0
				}
				continue
			}
			if inFence {
				continue
			}
			// Skip indented code blocks (four spaces / one tab).
			if strings.HasPrefix(line, "    ") || strings.HasPrefix(line, "\t") {
				continue
			}
			// Strip inline code spans so link-shaped text inside backticks
			// (e.g. `[text](target)`) is not treated as a link.
			line = inlineCodeRe.ReplaceAllString(line, "")
			for _, m := range linkRe.FindAllStringSubmatch(line, -1) {
				g.addLink(f, i+1, m[1], rootAbs, nodeSet, ignored)
			}
		}
	}

	// stats
	g.Stats.Files = len(g.Nodes)
	g.Stats.IgnoredFiles = len(ignored)

	// Deduplicate edges. An edge is identified by its normalized unordered
	// pair (min,max) so A->B and B->A collapse to one undirected edge, and
	// repeated identical links are removed. The first-seen edge keeps its
	// metadata (raw link, line, fragment, status).
	seen := map[string]bool{}
	unique := make([]Edge, 0, len(g.Edges))
	for _, e := range g.Edges {
		a, b := e.Source, e.Target
		if a > b {
			a, b = b, a
		}
		key := a + "\x00" + b
		if seen[key] {
			continue
		}
		seen[key] = true
		unique = append(unique, e)
	}
	g.Edges = unique
	g.Stats.Links = len(g.Edges)
	for _, e := range g.Edges {
		if e.Status == "broken" {
			g.Stats.BrokenLinks++
		} else if e.Status == "resolved" {
			g.Stats.ResolvedLinks++
		}
		if e.Source == e.Target {
			g.Stats.SelfLinks++
		}
	}
	incoming := map[string]int{}
	for _, e := range g.Edges {
		if e.Status == "resolved" {
			incoming[e.Target]++
		}
	}
	orphans := 0
	for _, n := range g.Nodes {
		if incoming[n.ID] == 0 {
			orphans++
		}
	}
	g.Stats.OrphanFiles = orphans

	// Sort nodes and edges deterministically.
	sort.Slice(g.Nodes, func(i, j int) bool { return g.Nodes[i].ID < g.Nodes[j].ID })
	sort.Slice(g.Edges, func(i, j int) bool {
		if g.Edges[i].Source != g.Edges[j].Source {
			return g.Edges[i].Source < g.Edges[j].Source
		}
		return g.Edges[i].Target < g.Edges[j].Target
	})

	return g, nil
}

// addLink resolves a single raw link target from file f (line ln) and appends
// the resulting edge to the graph. It strips fragments/aliases, skips external
// schemes, prevents links escaping the scan root, and marks targets that do not
// resolve to a file as broken.
func (g *Graph) addLink(f string, ln int, raw string, rootAbs string, nodeSet map[string]bool, ignored map[string]bool) {
	raw = strings.TrimSpace(raw)
	if raw == "" || strings.HasPrefix(raw, "#") {
		return
	}
	if strings.HasPrefix(raw, "http://") || strings.HasPrefix(raw, "https://") ||
		strings.HasPrefix(raw, "ftp://") || strings.HasPrefix(raw, "mailto:") ||
		strings.HasPrefix(raw, "tel:") {
		return
	}

	target := raw
	frag := ""
	if idx := strings.Index(target, "#"); idx >= 0 {
		frag = target[idx+1:]
		target = target[:idx]
	}
	if idx := strings.Index(target, "?"); idx >= 0 {
		target = target[:idx]
	}

	// Resolve relative to the source file's directory.
	srcDir := filepath.Dir(filepath.Join(rootAbs, filepath.FromSlash(f)))
	cand := filepath.Clean(filepath.Join(srcDir, target))
	rel, err := filepath.Rel(rootAbs, cand)
	if err != nil {
		g.Edges = append(g.Edges, Edge{Source: f, Target: target, RawLink: raw, Line: ln, Fragment: frag, Status: "outside_root"})
		return
	}
	relSlash := filepath.ToSlash(rel)
	if strings.HasPrefix(relSlash, "..") {
		g.Edges = append(g.Edges, Edge{Source: f, Target: target, RawLink: raw, Line: ln, Fragment: frag, Status: "outside_root"})
		return
	}
	if ignored[relSlash] {
		return
	}

	status := "resolved"
	if !nodeSet[relSlash] {
		// Extensionless markdown links (e.g. [Guide](guide/index)) resolve
		// to guide/index.md when present.
		if filepath.Ext(relSlash) == "" {
			if nodeSet[relSlash+".md"] {
				relSlash = relSlash + ".md"
			} else if _, err := os.Stat(filepath.Join(rootAbs, filepath.FromSlash(relSlash+".md"))); err == nil {
				relSlash = relSlash + ".md"
			}
		}
		if !nodeSet[relSlash] {
			if _, err := os.Stat(filepath.Join(rootAbs, filepath.FromSlash(relSlash))); err != nil {
				status = "broken"
			}
		}
	}
	g.Edges = append(g.Edges, Edge{Source: f, Target: relSlash, RawLink: raw, Line: ln, Fragment: frag, Status: status})
}

func WriteJSON(g *Graph, path string) error {
	data, err := json.MarshalIndent(g, "", "  ")
	if err != nil {
		return err
	}
	data = append(data, '\n')
	return os.WriteFile(path, data, 0o644)
}

func ToDot(g *Graph) string {
	var b strings.Builder
	b.WriteString("digraph graph {\n")
	b.WriteString("  rankdir=TB;\n")
	b.WriteString("  splines=polyline;\n")
	for _, n := range g.Nodes {
		name := filepath.Base(n.ID)
		b.WriteString(fmt.Sprintf("  %q [label=%q, shape=note];\n", n.ID, name))
	}
	for _, e := range g.Edges {
		b.WriteString(fmt.Sprintf("  %q -> %q;\n", e.Source, e.Target))
	}
	b.WriteString("}\n")
	return b.String()
}

func WriteDot(g *Graph, path string) error {
	return os.WriteFile(path, []byte(ToDot(g)), 0o644)
}
