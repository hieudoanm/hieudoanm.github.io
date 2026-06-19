package docsify

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"

	"github.com/spf13/cobra"
)

var (
	obsidianDir     string
	obsidianOut     string
	obsidianFormat  string
	obsidianExclude string
)

type obsidianNode struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Path  string `json:"path"`
	Links int    `json:"links"`
}

type obsidianEdge struct {
	Source string `json:"source"`
	Target string `json:"target"`
}

type obsidianGraph struct {
	Root   string         `json:"root"`
	Nodes  []obsidianNode `json:"nodes"`
	Edges  []obsidianEdge `json:"edges"`
	Orphan int            `json:"orphan"`
}

func newObsidianCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "obsidian",
		Short: "Build a wiki-link graph from markdown files",
		Long: `Walk a directory tree of markdown files, extract [[wiki-link]] references,
and output a graph of how files interconnect.

Formats:
  dot     - Graphviz DOT format (default)
  json    - JSON object with nodes[] and edges[]
  edges   - Plain text edge list`,
		Example: `  docsify obsidian --dir . --format dot --out graph.dot
  docsify obsidian --dir /path/to/vault --format json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			absDir, err := filepath.Abs(obsidianDir)
			if err != nil {
				return fmt.Errorf("resolve directory: %w", err)
			}

			excludeSet := parseExcludeList(obsidianExclude)

			nodes, edges, err := buildObsidianGraph(absDir, excludeSet)
			if err != nil {
				return err
			}

			var orphan int
			for _, n := range nodes {
				if n.Links == 0 {
					orphan++
				}
			}

			switch obsidianFormat {
			case "json":
				return writeObsidianJSON(absDir, nodes, edges, orphan, obsidianOut)
			case "dot":
				return writeObsidianDOT(nodes, edges, obsidianOut)
			default:
				return writeObsidianEdges(nodes, edges, obsidianOut)
			}
		},
	}

	cmd.Flags().StringVar(&obsidianDir, "dir", ".", "Root directory to scan")
	cmd.Flags().StringVar(&obsidianOut, "out", "", "Output file path (default: stdout)")
	cmd.Flags().StringVar(&obsidianFormat, "format", "dot", "Output format: dot, json, edges")
	cmd.Flags().StringVar(&obsidianExclude, "exclude", ".git,node_modules,vendor,dist,.next,__pycache__", "Comma-separated directories to exclude")

	return cmd
}

// ─── Graph building ───────────────────────────────────────────────────────────

var wikiLinkRe = regexp.MustCompile(`\[\[([^\]|]+)(?:\|[^\]|]+)?\]\]`)

func buildObsidianGraph(root string, exclude map[string]bool) ([]obsidianNode, []obsidianEdge, error) {
	markdownFiles := make(map[string]string) // absPath -> displayName
	links := make(map[string][]string)       // absPath -> []targetName

	err := filepath.WalkDir(root, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return nil
		}
		name := d.Name()
		if name != "." && name[0] == '.' && d.IsDir() {
			return filepath.SkipDir
		}
		if d.IsDir() && exclude[name] {
			return filepath.SkipDir
		}
		if d.IsDir() {
			return nil
		}
		if !strings.EqualFold(filepath.Ext(name), ".md") {
			return nil
		}

		markdownFiles[path] = strings.TrimSuffix(name, ".md")

		f, err := os.Open(path)
		if err != nil {
			return nil
		}
		defer f.Close()

		var fileLinks []string
		scanner := bufio.NewScanner(f)
		for scanner.Scan() {
			matches := wikiLinkRe.FindAllStringSubmatch(scanner.Text(), -1)
			for _, m := range matches {
				fileLinks = append(fileLinks, m[1])
			}
		}
		if len(fileLinks) > 0 {
			links[path] = fileLinks
		}
		return nil
	})
	if err != nil {
		return nil, nil, err
	}

	// Build a lookup: displayName -> absPath (case-insensitive)
	lookup := make(map[string]string)
	for absPath, displayName := range markdownFiles {
		lookup[strings.ToLower(displayName)] = absPath
	}

	// Resolve edges
	sortedPaths := make([]string, 0, len(markdownFiles))
	for p := range markdownFiles {
		sortedPaths = append(sortedPaths, p)
	}
	sort.Strings(sortedPaths)

	relMap := make(map[string]string) // absPath -> relPath
	nodeMap := make(map[string]int)   // absPath -> index in nodes
	nodes := make([]obsidianNode, 0, len(markdownFiles))
	for _, p := range sortedPaths {
		rel, _ := filepath.Rel(root, p)
		relMap[p] = rel
		nodeMap[p] = len(nodes)
		nodes = append(nodes, obsidianNode{
			ID:   rel,
			Name: markdownFiles[p],
			Path: p,
		})
	}

	edgeSet := make(map[string]bool)
	var edges []obsidianEdge

	for sourcePath, targets := range links {
		srcIdx, srcOk := nodeMap[sourcePath]
		if !srcOk {
			continue
		}
		for _, t := range targets {
			targetPath, ok := lookup[strings.ToLower(t)]
			if !ok {
				continue
			}
			tgtIdx, ok := nodeMap[targetPath]
			if !ok {
				continue
			}
			key := fmt.Sprintf("%d->%d", srcIdx, tgtIdx)
			if edgeSet[key] {
				continue
			}
			edgeSet[key] = true
			edges = append(edges, obsidianEdge{
				Source: relMap[sourcePath],
				Target: relMap[targetPath],
			})
			nodes[srcIdx].Links++
		}
	}

	return nodes, edges, nil
}

// ─── Output writers ───────────────────────────────────────────────────────────

func writeObsidianJSON(root string, nodes []obsidianNode, edges []obsidianEdge, orphan int, path string) error {
	g := obsidianGraph{
		Root:   root,
		Nodes:  nodes,
		Edges:  edges,
		Orphan: orphan,
	}
	data, err := json.MarshalIndent(g, "", "  ")
	if err != nil {
		return err
	}
	return writeOutput(data, path)
}

func writeObsidianDOT(nodes []obsidianNode, edges []obsidianEdge, path string) error {
	var b strings.Builder
	b.WriteString("digraph obsidian {\n")
	b.WriteString("  rankdir=LR;\n")
	b.WriteString("  node [shape=box style=rounded];\n\n")

	for _, n := range nodes {
		label := strings.NewReplacer(`"`, `\"`).Replace(n.Name)
		b.WriteString(fmt.Sprintf("  %q [label=%q];\n", n.ID, label))
	}

	b.WriteString("\n")

	for _, e := range edges {
		b.WriteString(fmt.Sprintf("  %q -> %q;\n", e.Source, e.Target))
	}

	b.WriteString("}\n")
	return writeOutput([]byte(b.String()), path)
}

func writeObsidianEdges(nodes []obsidianNode, edges []obsidianEdge, path string) error {
	var b strings.Builder
	for _, e := range edges {
		b.WriteString(fmt.Sprintf("%s -> %s\n", e.Source, e.Target))
	}
	return writeOutput([]byte(b.String()), path)
}

func writeOutput(data []byte, path string) error {
	if path == "" {
		_, err := os.Stdout.Write(data)
		return err
	}
	return os.WriteFile(path, data, 0644)
}
