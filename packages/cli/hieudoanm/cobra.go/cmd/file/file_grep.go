package file

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"regexp"

	"github.com/spf13/cobra"
)

func compileSearchPattern(pattern string, fixed, ignoreCase bool) (*regexp.Regexp, error) {
	if fixed {
		return regexp.Compile(regexp.QuoteMeta(pattern))
	}
	if ignoreCase {
		pattern = "(?i)" + pattern
	}
	re, err := regexp.Compile(pattern)
	if err != nil {
		return nil, fmt.Errorf("invalid regex %q: %w", pattern, err)
	}
	return re, nil
}

func compileIncludePattern(include string) *regexp.Regexp {
	if include == "" {
		return nil
	}
	return regexp.MustCompile(globToRegex(include))
}

func grepFiles(re *regexp.Regexp, searchPaths []string, include *regexp.Regexp, context, maxCount int) ([]lineMatch, int) {
	var matches []lineMatch
	totalFiles := 0

	for _, root := range searchPaths {
		info, err := os.Stat(root)
		if err != nil {
			fmt.Fprintf(os.Stderr, "error: %v\n", err)
			continue
		}

		if !info.IsDir() {
			m, f := grepFile(re, root, context, maxCount)
			matches = append(matches, m...)
			totalFiles += f
			continue
		}

		filepath.Walk(root, func(path string, fi os.FileInfo, err error) error {
			if err != nil || fi.IsDir() {
				return nil
			}
			if include != nil && !include.MatchString(fi.Name()) {
				return nil
			}
			if isBinary(path) {
				return nil
			}
			m, f := grepFile(re, path, context, maxCount)
			matches = append(matches, m...)
			totalFiles += f
			return nil
		})
	}
	return matches, totalFiles
}

func grepFile(re *regexp.Regexp, path string, context, maxCount int) ([]lineMatch, int) {
	fileMatches, err := searchFile(re, path, context, maxCount)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error searching %s: %v\n", path, err)
		return nil, 0
	}
	for i := range fileMatches {
		fileMatches[i].File = path
	}
	return fileMatches, 1
}

func outputGrepResults(matches []lineMatch, totalFiles int, pattern string) error {
	if jsonOutput {
		out, _ := json.MarshalIndent(map[string]interface{}{
			"pattern": pattern,
			"files":   totalFiles,
			"matches": len(matches),
			"results": matches,
		}, "", "  ")
		fmt.Println(string(out))
		return nil
	}

	if len(matches) == 0 {
		fmt.Println("(no matches)")
		return nil
	}

	multiFile := totalFiles > 1
	for _, m := range matches {
		prefix := ""
		if multiFile {
			prefix = m.File + ":"
		}
		if m.Before != "" {
			fmt.Printf("%s  %s\n", prefix, m.Before)
		}
		fmt.Printf("%s%d: %s\n", prefix, m.Line, m.Content)
		if m.After != "" {
			fmt.Printf("%s  %s\n", prefix, m.After)
		}
	}
	return nil
}

func newGrepCmd() *cobra.Command {
	var include string
	var context int
	var fixed bool
	var maxCount int
	var ignoreCase bool

	cmd := &cobra.Command{
		Use:   "grep <pattern> [files...]",
		Short: "Search file contents using regex or fixed strings",
		Long: `Search for a pattern in files (grep = global regular expression print). Supports recursive directory search and glob patterns.

Examples:
  file grep "TODO" main.go
  file grep --ignore-case "func" .
  file grep "error" --include "*.go"
  file grep --fixed "fmt.Println" src/ -r
  file grep --context 2 "panic" .`,
		Args: cobra.MinimumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			pattern := args[0]
			searchPaths := args[1:]
			if len(searchPaths) == 0 {
				searchPaths = []string{"."}
			}

			re, err := compileSearchPattern(pattern, fixed, ignoreCase)
			if err != nil {
				return err
			}

			includePattern := compileIncludePattern(include)
			matches, totalFiles := grepFiles(re, searchPaths, includePattern, context, maxCount)
			return outputGrepResults(matches, totalFiles, pattern)
		},
	}

	cmd.Flags().StringVarP(&include, "include", "i", "", "Glob pattern for file names (e.g. \"*.go\")")
	cmd.Flags().IntVarP(&context, "context", "C", 0, "Show N lines of context around matches")
	cmd.Flags().BoolVarP(&fixed, "fixed", "F", false, "Fixed string match (not regex)")
	cmd.Flags().IntVarP(&maxCount, "max-count", "m", 0, "Maximum number of matches")
	cmd.Flags().BoolVarP(&ignoreCase, "ignore-case", "v", false, "Case-insensitive search")
	return cmd
}
