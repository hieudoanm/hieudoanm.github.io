package cmd

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
)

// notebook represents the JSON structure of a Jupyter notebook.
type notebook struct {
	Cells []notebookCell `json:"cells"`
}

type notebookCell struct {
	CellType string   `json:"cell_type"`
	Source   []string `json:"source"`
}

// newIpynbCommand builds the ipynb subcommand.
func newIpynbCommand(stdout io.Writer) *cobra.Command {
	command := &cobra.Command{
		Use:   "ipynb <path>",
		Short: "Convert Jupyter notebooks to Markdown",
		Long: `Convert Jupyter notebooks (.ipynb) to Markdown (.md).

If the path is a directory, all .ipynb files in that directory are converted.
If the path is a file, only that file is converted.

Output files are written with the same name and in the same location as the input.

  pagify ipynb ./notebooks
  pagify ipynb ./analysis.ipynb`,
		Args:      cobra.ExactArgs(1),
		ValidArgs: []string{"."},
		RunE: func(command *cobra.Command, args []string) error {
			return runIpynb(stdout, args[0])
		},
	}
	return command
}

// runIpynb performs the conversion and prints a summary.
func runIpynb(stdout io.Writer, path string) error {
	info, err := os.Stat(path)
	if err != nil {
		return fmt.Errorf("access path: %w", err)
	}

	var count int
	if info.IsDir() {
		count, err = convertDirectory(stdout, path)
	} else {
		err = convertFile(stdout, path)
		count = 1
	}

	if err != nil {
		return err
	}

	fmt.Fprintf(stdout, "Converted %d notebook(s) to Markdown\n", count)
	return nil
}

// convertDirectory scans a directory for .ipynb files and converts them.
func convertDirectory(stdout io.Writer, dir string) (int, error) {
	var count int

	err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		if !strings.HasSuffix(path, ".ipynb") {
			return nil
		}

		if err := convertFile(stdout, path); err != nil {
			fmt.Fprintf(stdout, "Error converting %s: %v\n", path, err)
			return nil
		}
		count++
		return nil
	})

	return count, err
}

// convertFile converts a single .ipynb file to .md.
func convertFile(stdout io.Writer, ipynbPath string) error {
	data, err := os.ReadFile(ipynbPath)
	if err != nil {
		return fmt.Errorf("read file: %w", err)
	}

	var nb notebook
	if err := json.Unmarshal(data, &nb); err != nil {
		return fmt.Errorf("parse notebook JSON: %w", err)
	}

	mdPath := strings.TrimSuffix(ipynbPath, ".ipynb") + ".md"
	markdown := notebookToMarkdown(nb)

	if err := os.WriteFile(mdPath, []byte(markdown), 0o644); err != nil {
		return fmt.Errorf("write markdown: %w", err)
	}

	return nil
}

// notebookToMarkdown converts a notebook to Markdown string.
func notebookToMarkdown(nb notebook) string {
	var builder strings.Builder

	for _, cell := range nb.Cells {
		source := parseSource(cell.Source)

		switch cell.CellType {
		case "markdown":
			builder.WriteString(source)
			if !strings.HasSuffix(source, "\n") {
				builder.WriteString("\n")
			}
			builder.WriteString("\n")
		case "code":
			builder.WriteString("```\n")
			builder.WriteString(source)
			if !strings.HasSuffix(source, "\n") {
				builder.WriteString("\n")
			}
			builder.WriteString("```\n\n")
		default:
			builder.WriteString(source)
			builder.WriteString("\n\n")
		}
	}

	return builder.String()
}

// parseSource converts the source array to a string.
func parseSource(source []string) string {
	return strings.Join(source, "")
}
