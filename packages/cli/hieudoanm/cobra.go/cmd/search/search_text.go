package search

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

type textMatch struct {
	File    string `json:"file"`
	Line    int    `json:"line"`
	Content string `json:"content"`
}

func newTextCmd() *cobra.Command {
	var ignoreCase bool
	var maxCount int
	var include string
	var maxDepth int

	cmd := &cobra.Command{
		Use:   "text <pattern> [files-or-dirs...]",
		Short: "Search file contents using regex",
		Long: `Search for a regex pattern inside files. If a directory is given, searches recursively.

Examples:
  search text "TODO" .
  search text "func.*error" --include "*.go"
  search text "import" src/ --ignore-case
  search text "panic" --max-count 5`,
		Args: cobra.MinimumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			pattern := args[0]

			var searchRoots []string
			if len(args) > 1 {
				searchRoots = args[1:]
			} else {
				searchRoots = []string{"."}
			}

			rePattern := pattern
			if ignoreCase {
				rePattern = "(?i)" + pattern
			}

			re, err := regexp.Compile(rePattern)
			if err != nil {
				return fmt.Errorf("invalid regex %q: %w", pattern, err)
			}

			var includePattern *regexp.Regexp
			if include != "" {
				globRe := strings.ReplaceAll(regexp.QuoteMeta(include), "\\*", ".*")
				globRe = "^" + globRe + "$"
				includePattern, err = regexp.Compile(globRe)
				if err != nil {
					return fmt.Errorf("invalid include pattern %q: %w", include, err)
				}
			}

			var results []textMatch
			seen := make(map[string]bool)

			for _, root := range searchRoots {
				info, err := os.Stat(root)
				if err != nil {
					fmt.Fprintf(os.Stderr, "error: %v\n", err)
					continue
				}

				if !info.IsDir() {
					matches := searchFileText(root, pattern, re, maxCount)
					for _, m := range matches {
						if seen[m.File+":"+m.Content] {
							continue
						}
						seen[m.File+":"+m.Content] = true
						results = append(results, m)
					}
					continue
				}

				walkTextFile(re, root, maxDepth, includePattern, &results, maxCount, seen)
			}

			if jsonOutput {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"pattern": pattern,
					"matches": len(results),
					"results": results,
				}, "", "  ")
				fmt.Println(string(out))
				return nil
			}

			if len(results) == 0 {
				fmt.Println("(no matches)")
				return nil
			}

			for _, m := range results {
				fmt.Printf("%s:%d: %s\n", m.File, m.Line, m.Content)
			}
			if len(results) > 1 {
				fmt.Printf("\n%d matches\n", len(results))
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&ignoreCase, "ignore-case", "i", false, "Case-insensitive search")
	cmd.Flags().IntVarP(&maxCount, "max-count", "m", 0, "Maximum number of matches")
	cmd.Flags().StringVar(&include, "include", "", "Glob pattern for file names (e.g. \"*.go\")")
	cmd.Flags().IntVarP(&maxDepth, "max-depth", "d", 0, "Maximum directory depth (0 = unlimited)")
	return cmd
}

func searchFileText(path, pattern string, re *regexp.Regexp, maxCount int) []textMatch {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil
	}
	isBinary := false
	for _, b := range data {
		if b == 0 {
			isBinary = true
			break
		}
	}
	if isBinary {
		return nil
	}

	lines := strings.Split(string(data), "\n")
	var matches []textMatch
	for i, line := range lines {
		if re.MatchString(line) {
			matches = append(matches, textMatch{
				File:    path,
				Line:    i + 1,
				Content: line,
			})
			if maxCount > 0 && len(matches) >= maxCount {
				break
			}
		}
	}
	return matches
}

func walkTextFile(re *regexp.Regexp, root string, maxDepth int, include *regexp.Regexp, results *[]textMatch, maxCount int, seen map[string]bool) {
	if maxDepth > 0 {
		walkWithDepth(root, 0, maxDepth, func(path string, fi os.FileInfo, err error) error {
			if err != nil || fi.IsDir() {
				return nil
			}
			if include != nil && !include.MatchString(fi.Name()) {
				return nil
			}
			matches := searchFileText(path, "", re, maxCount)
			for _, m := range matches {
				key := m.File + ":" + m.Content
				if seen[key] {
					continue
				}
				seen[key] = true
				*results = append(*results, m)
				if maxCount > 0 && len(*results) >= maxCount {
					return fmt.Errorf("done")
				}
			}
			return nil
		})
		return
	}

	filepath.Walk(root, func(path string, fi os.FileInfo, err error) error {
		if err != nil || fi.IsDir() {
			return nil
		}
		if include != nil && !include.MatchString(fi.Name()) {
			return nil
		}
		matches := searchFileText(path, "", re, maxCount)
		for _, m := range matches {
			key := m.File + ":" + m.Content
			if seen[key] {
				continue
			}
			seen[key] = true
			*results = append(*results, m)
			if maxCount > 0 && len(*results) >= maxCount {
				return fmt.Errorf("done")
			}
		}
		return nil
	})
}
