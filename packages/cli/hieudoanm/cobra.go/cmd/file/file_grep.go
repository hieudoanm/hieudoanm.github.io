package file

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

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
			var searchPaths []string
			if len(args) > 1 {
				searchPaths = args[1:]
			} else {
				searchPaths = []string{"."}
			}

			var re *regexp.Regexp
			if fixed {
				re = regexp.MustCompile(regexp.QuoteMeta(pattern))
			} else {
				var err error
				if ignoreCase {
					pattern = "(?i)" + pattern
				}
				re, err = regexp.Compile(pattern)
				if err != nil {
					return fmt.Errorf("invalid regex %q: %w", pattern, err)
				}
			}

			var includePattern *regexp.Regexp
			if include != "" {
				var err error
				includePattern, err = regexp.Compile(globToRegex(include))
				if err != nil {
					return fmt.Errorf("invalid include pattern %q: %w", include, err)
				}
			}

			type match struct {
				File    string `json:"file"`
				Line    int    `json:"line"`
				Content string `json:"content"`
				Before  string `json:"before,omitempty"`
				After   string `json:"after,omitempty"`
			}

			var matches []match
			totalFiles := 0
			totalMatches := 0

			for _, root := range searchPaths {
				info, err := os.Stat(root)
				if err != nil {
					fmt.Fprintf(os.Stderr, "error: %v\n", err)
					continue
				}

				if !info.IsDir() {
					fileMatches, err := searchFile(re, root, context, maxCount)
					if err != nil {
						fmt.Fprintf(os.Stderr, "error searching %s: %v\n", root, err)
						continue
					}
					totalFiles++
					totalMatches += len(fileMatches)
					if maxCount > 0 && totalMatches > maxCount {
						fileMatches = fileMatches[:maxCount]
					}
					maxCount -= len(fileMatches)
					for _, m := range fileMatches {
						matches = append(matches, match{
							File:    root,
							Line:    m.line,
							Content: m.content,
							Before:  m.before,
							After:   m.after,
						})
					}
					continue
				}

				filepath.Walk(root, func(path string, fi os.FileInfo, err error) error {
					if err != nil || fi.IsDir() {
						return nil
					}
					if includePattern != nil && !includePattern.MatchString(fi.Name()) {
						return nil
					}
					if isBinary(path) {
						return nil
					}

					fileMatches, err := searchFile(re, path, context, maxCount)
					if err != nil {
						return nil
					}
					totalFiles++
					totalMatches += len(fileMatches)
					if maxCount > 0 && len(fileMatches) > maxCount {
						fileMatches = fileMatches[:maxCount]
					}
					maxCount -= len(fileMatches)
					for _, m := range fileMatches {
						matches = append(matches, match{
							File:    path,
							Line:    m.line,
							Content: m.content,
							Before:  m.before,
							After:   m.after,
						})
					}
					return nil
				})
			}

			if jsonOutput {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"pattern": pattern,
					"files":   totalFiles,
					"matches": totalMatches,
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
		},
	}

	cmd.Flags().StringVarP(&include, "include", "i", "", "Glob pattern for file names (e.g. \"*.go\")")
	cmd.Flags().IntVarP(&context, "context", "C", 0, "Show N lines of context around matches (use C for uppercase)")
	cmd.Flags().BoolVarP(&fixed, "fixed", "F", false, "Fixed string match (not regex)")
	cmd.Flags().IntVarP(&maxCount, "max-count", "m", 0, "Maximum number of matches")
	cmd.Flags().BoolVarP(&ignoreCase, "ignore-case", "v", false, "Case-insensitive search")
	return cmd
}

type lineMatch struct {
	line    int
	content string
	before  string
	after   string
}

func searchFile(re *regexp.Regexp, path string, context int, maxCount int) ([]lineMatch, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	lines := splitLines(string(data))
	var matches []lineMatch

	for i, line := range lines {
		if re.MatchString(line) {
			m := lineMatch{
				line:    i + 1,
				content: line,
			}
			if context > 0 {
				start := i - context
				if start < 0 {
					start = 0
				}
				end := i + context + 1
				if end > len(lines) {
					end = len(lines)
				}
				var ctxLines []string
				for j := start; j < end; j++ {
					mark := " "
					if j == i {
						mark = ">"
					}
					ctxLines = append(ctxLines, fmt.Sprintf("%s%5d| %s", mark, j+1, lines[j]))
				}
				m.before = strings.Join(ctxLines[:context], "\n")
				m.after = strings.Join(ctxLines, "\n")
			}
			matches = append(matches, m)
			if maxCount > 0 && len(matches) >= maxCount {
				break
			}
		}
	}
	return matches, nil
}

func globToRegex(pattern string) string {
	result := regexp.QuoteMeta(pattern)
	result = strings.ReplaceAll(result, "\\*", ".*")
	result = strings.ReplaceAll(result, "\\?", ".")
	return "^" + result + "$"
}

var binaryExtensions = map[string]bool{
	".exe": true, ".bin": true, ".o": true, ".a": true, ".so": true,
	".dll": true, ".dylib": true, ".jpg": true, ".jpeg": true, ".png": true,
	".gif": true, ".ico": true, ".pdf": true, ".zip": true, ".tar": true,
	".gz": true, ".bz2": true, ".7z": true, ".mp3": true, ".mp4": true,
	".mov": true, ".avi": true, ".webp": true, ".woff": true, ".woff2": true,
}

func isBinary(path string) bool {
	ext := strings.ToLower(filepath.Ext(path))
	if binaryExtensions[ext] {
		return true
	}
	return false
}
