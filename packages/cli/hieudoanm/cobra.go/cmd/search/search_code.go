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

func newCodeCmd() *cobra.Command {
	var lang string
	var kind string
	var maxResults int

	cmd := &cobra.Command{
		Use:   "code <symbol> [dir]",
		Short: "Search for code symbols (functions, types, variables)",
		Long: `Find code symbol definitions matching a name pattern.

Supports Go, TypeScript/JavaScript, Python, and Rust.

Examples:
  search code "ParseCard"
  search code "handle" src/
  search code --lang go "NewCommand"
  search code --kind function "getUser"
  search code "fetchAPI" --lang ts`,
		Args: cobra.RangeArgs(1, 2),
		RunE: func(cmd *cobra.Command, args []string) error {
			symbol := args[0]
			root := "."
			if len(args) > 1 {
				root = args[1]
			}

			symbolRe, err := regexp.Compile(symbol)
			if err != nil {
				return fmt.Errorf("invalid symbol pattern %q: %w", symbol, err)
			}

			type symbolMatch struct {
				File     string `json:"file"`
				Line     int    `json:"line"`
				Symbol   string `json:"symbol"`
				Kind     string `json:"kind"`
				Language string `json:"language"`
			}

			var results []symbolMatch

			filepath.Walk(root, func(path string, fi os.FileInfo, err error) error {
				if err != nil || fi.IsDir() {
					return nil
				}

				langName, patterns, ok := codePatternsFor(path, lang)
				if !ok {
					return nil
				}

				if kind != "" && !containsKind(patterns, kind) {
					return nil
				}

				data, err := os.ReadFile(path)
				if err != nil {
					return nil
				}

				lines := strings.Split(string(data), "\n")
				for i, line := range lines {
					trimmed := strings.TrimSpace(line)
					for _, p := range patterns {
						matches := p.re.FindStringSubmatch(trimmed)
						if matches == nil {
							continue
						}
						name := matches[p.nameIdx]
						if !symbolRe.MatchString(name) {
							continue
						}
						if kind != "" && p.kind != kind {
							continue
						}
						results = append(results, symbolMatch{
							File:     path,
							Line:     i + 1,
							Symbol:   name,
							Kind:     p.kind,
							Language: langName,
						})
						if maxResults > 0 && len(results) >= maxResults {
							return fmt.Errorf("done")
						}
					}
				}
				return nil
			})

			if jsonOutput {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"symbol":  symbol,
					"results": results,
					"count":   len(results),
				}, "", "  ")
				fmt.Println(string(out))
				return nil
			}

			if len(results) == 0 {
				fmt.Println("(no symbols found)")
				return nil
			}

			for _, r := range results {
				fmt.Printf("%s:%d: %s %s\n", r.File, r.Line, r.Kind, r.Symbol)
			}
			fmt.Printf("\n%d symbols found\n", len(results))
			return nil
		},
	}

	cmd.Flags().StringVarP(&lang, "lang", "l", "", "Language filter (go, ts, py, rs)")
	cmd.Flags().StringVarP(&kind, "kind", "k", "", "Symbol kind (function, type, variable, method, class)")
	cmd.Flags().IntVarP(&maxResults, "max-results", "n", 0, "Maximum number of results (0 = unlimited)")
	return cmd
}

type codePattern struct {
	re      *regexp.Regexp
	nameIdx int
	kind    string
}

func codePatternsFor(path, langFilter string) (string, []codePattern, bool) {
	ext := strings.ToLower(filepath.Ext(path))

	var langName string
	var patterns []codePattern

	switch ext {
	case ".go":
		if langFilter != "" && langFilter != "go" {
			return "", nil, false
		}
		langName = "go"
		patterns = []codePattern{
			{regexp.MustCompile(`^func\s+(\w+)\s*\(`), 1, "method"},
			{regexp.MustCompile(`^func\s+(\w+)\s*\(`), 1, "function"},
			{regexp.MustCompile(`^type\s+(\w+)\s`), 1, "type"},
			{regexp.MustCompile(`^var\s+(\w+)`), 1, "variable"},
			{regexp.MustCompile(`^const\s+(\w+)`), 1, "constant"},
		}
	case ".ts", ".tsx", ".js", ".jsx":
		if langFilter != "" && langFilter != "ts" && langFilter != "js" {
			return "", nil, false
		}
		langName = "typescript"
		patterns = []codePattern{
			{regexp.MustCompile(`^(?:export\s+)?(?:async\s+)?function\s+(\w+)`), 1, "function"},
			{regexp.MustCompile(`^(?:export\s+)?class\s+(\w+)`), 1, "class"},
			{regexp.MustCompile(`^(?:export\s+)?interface\s+(\w+)`), 1, "interface"},
			{regexp.MustCompile(`^(?:export\s+)?type\s+(\w+)`), 1, "type"},
			{regexp.MustCompile(`^(?:export\s+)?const\s+(\w+)`), 1, "variable"},
			{regexp.MustCompile(`^(?:export\s+)?enum\s+(\w+)`), 1, "enum"},
		}
	case ".py":
		if langFilter != "" && langFilter != "py" {
			return "", nil, false
		}
		langName = "python"
		patterns = []codePattern{
			{regexp.MustCompile(`^(?:async\s+)?def\s+(\w+)`), 1, "function"},
			{regexp.MustCompile(`^class\s+(\w+)`), 1, "class"},
			{regexp.MustCompile(`^(\w+)\s*=\s*(?:lambda|[{(['"0-9])`), 1, "variable"},
		}
	case ".rs":
		if langFilter != "" && langFilter != "rs" {
			return "", nil, false
		}
		langName = "rust"
		patterns = []codePattern{
			{regexp.MustCompile(`^(?:pub\s+)?fn\s+(\w+)`), 1, "function"},
			{regexp.MustCompile(`^(?:pub\s+)?struct\s+(\w+)`), 1, "struct"},
			{regexp.MustCompile(`^(?:pub\s+)?trait\s+(\w+)`), 1, "trait"},
			{regexp.MustCompile(`^(?:pub\s+)?enum\s+(\w+)`), 1, "enum"},
			{regexp.MustCompile(`^(?:pub\s+)?type\s+(\w+)`), 1, "type"},
			{regexp.MustCompile(`^(?:pub\s+)?const\s+(\w+)`), 1, "constant"},
		}
	default:
		return "", nil, false
	}

	return langName, patterns, true
}

func containsKind(patterns []codePattern, kind string) bool {
	for _, p := range patterns {
		if p.kind == kind {
			return true
		}
	}
	return false
}
