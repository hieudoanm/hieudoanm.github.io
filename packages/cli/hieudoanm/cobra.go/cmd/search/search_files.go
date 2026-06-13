package search

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/spf13/cobra"
)

func findFilesWithGlob(pattern, root string, maxDepth int, fileType string, hidden bool) ([]string, error) {
	info, err := os.Stat(root)
	if err != nil {
		return nil, err
	}
	if !info.IsDir() {
		return nil, fmt.Errorf("%q is not a directory", root)
	}

	var results []string
	absRoot, _ := filepath.Abs(root)
	hasGlobStar := strings.Contains(pattern, "**")

	walkFn := func(path string, fi os.FileInfo, err error) error {
		if err != nil {
			return nil
		}

		if !hidden && isHidden(path) {
			if fi.IsDir() {
				return filepath.SkipDir
			}
			return nil
		}

		if fileType == "d" && !fi.IsDir() {
			return nil
		}
		if fileType == "f" && fi.IsDir() {
			return nil
		}

		if hasGlobStar {
			matched, _ := filepath.Match(pattern, path)
			if matched {
				results = append(results, path)
			}
			return nil
		}

		if fi.IsDir() {
			return nil
		}

		base := fi.Name()
		matched, _ := filepath.Match(pattern, base)
		if matched {
			results = append(results, path)
		}
		return nil
	}

	if maxDepth > 0 {
		walkWithDepth(absRoot, 0, maxDepth, walkFn)
	} else {
		filepath.Walk(absRoot, walkFn)
	}

	sort.Strings(results)
	return results, nil
}

func outputFileResults(results []string, pattern, root string) {
	absRoot, _ := filepath.Abs(root)

	if jsonOutput {
		out, _ := json.MarshalIndent(map[string]interface{}{
			"pattern": pattern,
			"root":    root,
			"files":   results,
			"count":   len(results),
		}, "", "  ")
		fmt.Println(string(out))
		return
	}

	if len(results) == 0 {
		fmt.Println("(no files found)")
		return
	}

	for _, f := range results {
		rel, _ := filepath.Rel(absRoot, f)
		fmt.Println(rel)
	}

	if len(results) > 1 {
		fmt.Printf("\n%d files found\n", len(results))
	}
}

func newFilesCmd() *cobra.Command {
	var maxDepth int
	var fileType string
	var hidden bool

	cmd := &cobra.Command{
		Use:   "files <pattern> [root]",
		Short: "Find files by glob pattern",
		Long: `Find files matching a glob pattern starting from an optional root directory.

Patterns use glob syntax:
  *.go          - all Go files
  **/*.ts       - TypeScript files in any subdirectory
  src/**/*.ts   - TypeScript files under src/
  test_*.py     - files matching test_ prefix with .py extension

Examples:
  search files "*.go"
  search files "*.ts" src/
  search files "**/*.md" docs/
  search files "*.py" --type f
  search files "config.*" --hidden`,
		Args: cobra.RangeArgs(1, 2),
		RunE: func(cmd *cobra.Command, args []string) error {
			pattern := args[0]
			root := "."
			if len(args) > 1 {
				root = args[1]
			}

			results, err := findFilesWithGlob(pattern, root, maxDepth, fileType, hidden)
			if err != nil {
				return err
			}

			outputFileResults(results, pattern, root)
			return nil
		},
	}

	cmd.Flags().IntVarP(&maxDepth, "max-depth", "d", 0, "Maximum directory depth (0 = unlimited)")
	cmd.Flags().StringVarP(&fileType, "type", "t", "", "Filter by type: f (file) or d (directory)")
	cmd.Flags().BoolVarP(&hidden, "hidden", "H", false, "Include hidden files and directories")
	return cmd
}

func isHidden(path string) bool {
	for _, part := range strings.Split(path, string(filepath.Separator)) {
		if part != "" && strings.HasPrefix(part, ".") {
			return true
		}
	}
	return false
}

func walkWithDepth(root string, depth, maxDepth int, fn filepath.WalkFunc) {
	info, err := os.Stat(root)
	if err != nil {
		fn(root, nil, err)
		return
	}
	fn(root, info, nil)
	if info.IsDir() && depth < maxDepth {
		entries, err := os.ReadDir(root)
		if err != nil {
			fn(root, nil, err)
			return
		}
		for _, entry := range entries {
			path := filepath.Join(root, entry.Name())
			fi, err := entry.Info()
			if err != nil {
				fn(path, nil, err)
				continue
			}
			if fi.IsDir() {
				walkWithDepth(path, depth+1, maxDepth, fn)
			} else {
				fn(path, fi, nil)
			}
		}
	}
}
