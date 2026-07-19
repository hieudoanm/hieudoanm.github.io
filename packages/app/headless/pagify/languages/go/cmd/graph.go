package cmd

import (
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"

	"pagify/internal/graph"
)

// defaultNameFor returns the default output filename for a format.
func defaultNameFor(format string) string {
	switch strings.TrimSpace(format) {
	case "json":
		return "graph.json"
	case "dot":
		return "graph.dot"
	default:
		return "graph.html"
	}
}

// pathFor returns the concrete output path for a format. When the resolved
// output is a file (not a directory) and multiple formats are being written,
// the base name is reused so graph.html, graph.json and graph.dot share a stem.
func pathFor(output, format string, multi bool) (string, error) {
	output = strings.TrimSpace(output)
	if output == "" {
		return "", fmt.Errorf("output path is empty")
	}

	info, err := os.Stat(output)
	if err == nil && info.IsDir() {
		return filepath.Join(output, defaultNameFor(format)), nil
	}
	if err != nil && os.IsNotExist(err) {
		if strings.HasSuffix(output, string(os.PathSeparator)) ||
			strings.HasSuffix(output, "/") {
			return filepath.Join(output, defaultNameFor(format)), nil
		}
	}

	if !multi {
		return output, nil
	}

	// Reuse the stem so all formats share a base name.
	base := filepath.Base(output)
	dir := filepath.Dir(output)
	stem := base
	for _, ext := range []string{".html", ".json", ".dot", ".md"} {
		if strings.HasSuffix(strings.ToLower(base), ext) {
			stem = base[:len(base)-len(ext)]
			break
		}
	}
	return filepath.Join(dir, stem+formatExt(format)), nil
}

func formatExt(format string) string {
	switch strings.TrimSpace(format) {
	case "json":
		return ".json"
	case "dot":
		return ".dot"
	default:
		return ".html"
	}
}

// graphTotals summarises a scanned graph: total files, total links, how many
// of those links resolved to a file, and how many are broken.
func graphTotals(g *graph.Graph) string {
	s := g.Stats
	return fmt.Sprintf("%d files, %d links, %d resolved links, %d broken links",
		s.Files, s.Links, s.ResolvedLinks, s.BrokenLinks)
}

func newGraphCommand(stdout io.Writer) *cobra.Command {
	var (
		output string
		format string
		title  string
		open   bool
	)

	cmd := &cobra.Command{
		Use:   "graph [content]",
		Short: "Build a link graph of Markdown files",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(c *cobra.Command, args []string) error {
			root := "."
			if len(args) == 1 {
				root = args[0]
			}
			g, err := graph.ScanMarkdown(root)
			if err != nil {
				return err
			}

			// With no explicit --format, write every representation: dot,
			// json and html. An explicit --format writes only that one.
			formats := []string{"dot", "json", "html"}
			multi := true
			if c.Flags().Changed("format") {
				formats = []string{strings.TrimSpace(format)}
				multi = false
			}

			for _, f := range formats {
				outPath, err := pathFor(output, f, multi)
				if err != nil {
					return err
				}
				switch f {
				case "json":
					if err := graph.WriteJSON(g, outPath); err != nil {
						return err
					}
				case "dot":
					if err := graph.WriteDot(g, outPath); err != nil {
						return err
					}
				case "html":
					if err := graph.WriteHTML(g, title, outPath); err != nil {
						return err
					}
					if open {
						abs, _ := filepath.Abs(outPath)
						_ = exec.Command("open", abs).Run()
					}
				}
			}

			if len(formats) == 1 {
				outPath, _ := pathFor(output, formats[0], false)
				fmt.Fprintf(stdout, "Wrote %s (%s)\n", outPath, graphTotals(g))
			} else {
				fmt.Fprintf(stdout, "Wrote graph.dot, graph.json and graph.html (%s)\n", graphTotals(g))
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&output, "output", "o", "graph.html", "output path, or directory (default filename is appended)")
	cmd.Flags().StringVar(&format, "format", "", "output format: dot, json or html (default: all three)")
	cmd.Flags().StringVar(&title, "title", "File Graph", "graph page title")
	cmd.Flags().BoolVar(&open, "open", false, "open the generated HTML in the default browser")
	return cmd
}
