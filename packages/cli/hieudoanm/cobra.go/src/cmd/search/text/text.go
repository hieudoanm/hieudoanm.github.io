package text

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

func outputTextResults(results []textMatch, pattern string, jsonOutput bool) error {
	if jsonOutput {
		out, err := json.MarshalIndent(map[string]interface{}{
			"pattern": pattern,
			"matches": len(results),
			"results": results,
		}, "", "  ")
		if err != nil {
			return err
		}
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
}

func searchFileText(path, pattern string, re *regexp.Regexp, maxCount int) []textMatch {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil
	}
	var isBinary bool
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

func NewCommand() *cobra.Command {
	var pattern string
	var path string
	var ignoreCase bool
	var maxCount int
	var include string
	var maxDepth int

	cmd := &cobra.Command{
		Use:   "text [--pattern <pattern>] [--path <path>]",
		Short: "Search file contents using regex",
		Long:  `Search for a regex pattern inside files. If a directory is given, searches recursively.`,
		Example: `  search text --pattern "TODO" --path .
  search text --pattern "func.*error" --include "*.go"
  search text --pattern "import" --path src/ --ignore-case
  search text --pattern "panic" --max-count 5`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			rePattern := pattern
			if ignoreCase {
				rePattern = "(?i)" + pattern
			}

			re, err := regexp.Compile(rePattern)
			if err != nil {
				return fmt.Errorf("invalid regex %q: %w", pattern, err)
			}

			includePattern := includeToRegex(include)
			results, err := searchTextInRoots(pattern, []string{path}, re, includePattern, maxDepth, maxCount)
			if err != nil {
				return err
			}

			return outputTextResults(results, pattern, jsonOutput)
		},
	}

	cmd.Flags().StringVarP(&pattern, "pattern", "p", "", "Regex pattern to search")
	cmd.Flags().StringVarP(&path, "path", "P", ".", "File or directory to search")
	cmd.Flags().BoolVarP(&ignoreCase, "ignore-case", "i", false, "Case-insensitive search")
	cmd.Flags().IntVarP(&maxCount, "max-count", "m", 0, "Maximum number of matches")
	cmd.Flags().StringVar(&include, "include", "", "Glob pattern for file names (e.g. \"*.go\")")
	cmd.Flags().IntVarP(&maxDepth, "max-depth", "d", 0, "Maximum directory depth (0 = unlimited)")
	return cmd
}
