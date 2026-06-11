package docsify

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
)

var (
	dir     string
	out     string
	exclude string
	verbose bool
)

var docsifyScanCmd = &cobra.Command{
	Use:   "scan",
	Short: "Scan a codebase and generate a GraphML file",
	RunE: func(cmd *cobra.Command, args []string) error {
		absDir, err := filepath.Abs(dir)
		if err != nil {
			return fmt.Errorf("error resolving directory: %w", err)
		}

		excludeSet := parseExcludeList(exclude)

		if verbose {
			fmt.Fprintf(os.Stderr, "scanning %s\n", absDir)
		}

		// Walk the codebase
		files, err := Walk(absDir, excludeSet)
		if err != nil {
			return fmt.Errorf("walk error: %w", err)
		}

		if verbose {
			fmt.Fprintf(os.Stderr, "found %d source files\n", len(files))
		}

		// Extract symbols and calls from each file
		graph := NewGraph()

		for _, f := range files {
			if verbose {
				fmt.Fprintf(os.Stderr, "  extracting: %s\n", f.RelPath)
			}

			info, err := Extract(f)
			if err != nil {
				fmt.Fprintf(os.Stderr, "  warning: skipping %s: %v\n", f.RelPath, err)
				continue
			}

			graph.AddFile(info)
		}

		// Resolve cross-file call edges
		graph.ResolveCallEdges()

		// Write GraphML
		if err := Write(graph, out); err != nil {
			return fmt.Errorf("write error: %w", err)
		}

		fmt.Printf("graph written to %s\n", out)
		fmt.Printf("  nodes: %d  edges: %d\n", graph.NodeCount(), graph.EdgeCount())

		return nil
	},
}

func init() {
	docsifyScanCmd.Flags().StringVar(&dir, "dir", ".", "Root directory to scan")
	docsifyScanCmd.Flags().StringVar(&out, "out", "codebase.graphml", "Output .graphml file path")
	docsifyScanCmd.Flags().StringVar(&exclude, "exclude", ".git,node_modules,vendor,dist,.next,__pycache__", "Comma-separated directories to exclude")
	docsifyScanCmd.Flags().BoolVar(&verbose, "verbose", false, "Print progress to stderr")
}

func parseExcludeList(s string) map[string]bool {
	m := make(map[string]bool)
	for _, part := range strings.Split(s, ",") {
		part = strings.TrimSpace(part)
		if part != "" {
			m[part] = true
		}
	}
	return m
}
