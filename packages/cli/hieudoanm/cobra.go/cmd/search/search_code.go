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

type symbolMatch struct {
	File     string `json:"file"`
	Line     int    `json:"line"`
	Symbol   string `json:"symbol"`
	Kind     string `json:"kind"`
	Language string `json:"language"`
}

func searchCodeSymbols(symbol string, root string, lang string, kind string, maxResults int) ([]symbolMatch, error) {
	symbolRe, err := regexp.Compile(symbol)
	if err != nil {
		return nil, fmt.Errorf("invalid symbol pattern %q: %w", symbol, err)
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

	return results, nil
}

func outputCodeResults(results []symbolMatch, symbol string) {
	if jsonOutput {
		out, _ := json.MarshalIndent(map[string]interface{}{
			"symbol":  symbol,
			"results": results,
			"count":   len(results),
		}, "", "  ")
		fmt.Println(string(out))
		return
	}

	if len(results) == 0 {
		fmt.Println("(no symbols found)")
		return
	}

	for _, r := range results {
		fmt.Printf("%s:%d: %s %s\n", r.File, r.Line, r.Kind, r.Symbol)
	}
	fmt.Printf("\n%d symbols found\n", len(results))
}

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

			results, err := searchCodeSymbols(symbol, root, lang, kind, maxResults)
			if err != nil {
				return err
			}

			outputCodeResults(results, symbol)
			return nil
		},
	}

	cmd.Flags().StringVarP(&lang, "lang", "l", "", "Language filter (go, ts, py, rs)")
	cmd.Flags().StringVarP(&kind, "kind", "k", "", "Symbol kind (function, type, variable, method, class)")
	cmd.Flags().IntVarP(&maxResults, "max-results", "n", 0, "Maximum number of results (0 = unlimited)")
	return cmd
}
