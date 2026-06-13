package search

import (
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

type textMatch struct {
	File    string `json:"file"`
	Line    int    `json:"line"`
	Content string `json:"content"`
}

func includeToRegex(include string) *regexp.Regexp {
	if include == "" {
		return nil
	}
	globRe := strings.ReplaceAll(regexp.QuoteMeta(include), "\\*", ".*")
	globRe = "^" + globRe + "$"
	return regexp.MustCompile(globRe)
}

func searchTextInRoots(pattern string, searchRoots []string, re *regexp.Regexp, include *regexp.Regexp, maxDepth, maxCount int) ([]textMatch, error) {
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
				key := m.File + ":" + m.Content
				if seen[key] {
					continue
				}
				seen[key] = true
				results = append(results, m)
			}
			continue
		}

		walkTextFile(re, root, maxDepth, include, &results, maxCount, seen)
	}
	return results, nil
}

func outputTextResults(results []textMatch, pattern string) {
	if jsonOutput {
		out, _ := json.MarshalIndent(map[string]interface{}{
			"pattern": pattern,
			"matches": len(results),
			"results": results,
		}, "", "  ")
		fmt.Println(string(out))
		return
	}

	if len(results) == 0 {
		fmt.Println("(no matches)")
		return
	}

	for _, m := range results {
		fmt.Printf("%s:%d: %s\n", m.File, m.Line, m.Content)
	}
	if len(results) > 1 {
		fmt.Printf("\n%d matches\n", len(results))
	}
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

			searchRoots := args[1:]
			if len(searchRoots) == 0 {
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

			includePattern := includeToRegex(include)
			results, err := searchTextInRoots(pattern, searchRoots, re, includePattern, maxDepth, maxCount)
			if err != nil {
				return err
			}

			outputTextResults(results, pattern)
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
