package docsify

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/spf13/cobra"
)

func newTreeCmd() *cobra.Command {
	var (
		treeDir string
		treeOut string
	)

	cmd := &cobra.Command{
		Use:   "tree",
		Short: "Generate directory tree as Markdown",
		Long:  `Walk the directory tree and write the structure to TREE.md, respecting .gitignore patterns.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			absDir, err := filepath.Abs(treeDir)
			if err != nil {
				return fmt.Errorf("resolve directory: %w", err)
			}
			ignore, err := loadGitignore(absDir)
			if err != nil {
				return fmt.Errorf("load .gitignore: %w", err)
			}
			out, err := os.Create(treeOut)
			if err != nil {
				return fmt.Errorf("create output: %w", err)
			}
			defer out.Close()

			fmt.Fprintln(out, "# TREE")
			fmt.Fprintln(out)
			fmt.Fprintln(out, "```text")
			dirs, files, err := writeTree(out, absDir, absDir, "", ignore)
			if err != nil {
				return err
			}
			fmt.Fprintln(out, "```")
			fmt.Fprintf(out, "\n%d directories, %d files\n", dirs, files)
			return nil
		},
	}

	cmd.Flags().StringVar(&treeDir, "dir", ".", "Root directory to tree")
	cmd.Flags().StringVar(&treeOut, "out", "TREE.md", "Output file path")

	return cmd
}

// loadGitignore reads .gitignore from dir and returns a matcher function.
func loadGitignore(dir string) (func(relPath string, isDir bool) bool, error) {
	f, err := os.Open(filepath.Join(dir, ".gitignore"))
	if err != nil {
		if os.IsNotExist(err) {
			return func(_ string, _ bool) bool { return false }, nil
		}
		return nil, err
	}
	defer f.Close()

	type rule struct {
		pattern string
		negate  bool
		dirOnly bool
	}
	var rules []rule

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		negate := false
		if strings.HasPrefix(line, "!") {
			negate = true
			line = line[1:]
		}
		dirOnly := strings.HasSuffix(line, "/")
		if dirOnly {
			line = strings.TrimSuffix(line, "/")
		}
		// Remove leading / to make pattern relative
		line = strings.TrimPrefix(line, "/")
		rules = append(rules, rule{pattern: line, negate: negate, dirOnly: dirOnly})
	}
	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return func(relPath string, isDir bool) bool {
		ignored := false
		for _, r := range rules {
			if r.dirOnly && !isDir {
				continue
			}
			matched, _ := filepath.Match(r.pattern, relPath)
			if !matched {
				// Also try matching just the base name (common in .gitignore)
				matched, _ = filepath.Match(r.pattern, filepath.Base(relPath))
			}
			if !matched && !strings.Contains(r.pattern, "/") {
				// For patterns without slash, match against any path segment
				matched = matchAnySegment(r.pattern, relPath)
			}
			if matched {
				if r.negate {
					ignored = false
				} else {
					ignored = true
				}
			}
		}
		return ignored
	}, nil
}

// matchAnySegment reports whether pattern matches any component of path.
func matchAnySegment(pattern, path string) bool {
	parts := strings.Split(path, string(filepath.Separator))
	for _, part := range parts {
		if matched, _ := filepath.Match(pattern, part); matched {
			return true
		}
	}
	return false
}

// writeTree walks dir and writes a markdown tree to w, returning dir and file counts.
// Files are rendered as [name](./relative/path) links.
func writeTree(w io.Writer, root, dir string, prefix string, ignore func(string, bool) bool) (int, int, error) {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return 0, 0, err
	}

	var dirNames, fileNames []string
	for _, e := range entries {
		name := e.Name()
		if strings.HasPrefix(name, ".") {
			continue
		}
		rel, _ := filepath.Rel(root, filepath.Join(dir, name))
		if ignore(rel, e.IsDir()) {
			continue
		}
		if e.IsDir() {
			dirNames = append(dirNames, name)
		} else {
			fileNames = append(fileNames, name)
		}
	}
	sort.Strings(dirNames)
	sort.Strings(fileNames)

	totalDirs := len(dirNames)
	totalFiles := len(fileNames)

	ordered := make([]string, 0, len(dirNames)+len(fileNames))
	ordered = append(ordered, dirNames...)
	ordered = append(ordered, fileNames...)

	for i, name := range ordered {
		isLast := i == len(ordered)-1
		isDir := i < len(dirNames)

		var connector, childPrefix string
		if isLast {
			connector = "└── "
			childPrefix = prefix + "    "
		} else {
			connector = "├── "
			childPrefix = prefix + "│   "
		}

		if isDir {
			fmt.Fprintf(w, "%s%s%s/\n", prefix, connector, name)
			subDirs, subFiles, err := writeTree(w, root, filepath.Join(dir, name), childPrefix, ignore)
			if err != nil {
				return 0, 0, err
			}
			totalDirs += subDirs
			totalFiles += subFiles
		} else {
			rel, _ := filepath.Rel(root, filepath.Join(dir, name))
			fmt.Fprintf(w, "%s%s[%s](./%s)\n", prefix, connector, name, rel)
		}
	}
	return totalDirs, totalFiles, nil
}
