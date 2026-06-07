package code

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

func outputCodeResults(results []symbolMatch, symbol string, jsonOutput bool) error {
	if jsonOutput {
		out, err := json.MarshalIndent(map[string]interface{}{
			"symbol":  symbol,
			"results": results,
			"count":   len(results),
		}, "", "  ")
		if err != nil {
			return err
		}
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
}

func NewCommand() *cobra.Command {
	var symbol string
	var dir string
	var lang string
	var kind string
	var maxResults int

	cmd := &cobra.Command{
		Use:   "code [--symbol <symbol>] [--dir <dir>]",
		Short: "Search for code symbols (functions, types, variables)",
		Long: `Find code symbol definitions matching a name pattern.

Supports Go, TypeScript/JavaScript, Python, and Rust.`,
		Example: `  search code --symbol "ParseCard"
  search code --symbol "handle" --dir src/
  search code --symbol "NewCommand" --lang go
  search code --symbol "getUser" --kind function
  search code --symbol "fetchAPI" --lang ts`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			results, err := searchCodeSymbols(symbol, dir, lang, kind, maxResults)
			if err != nil {
				return err
			}

			return outputCodeResults(results, symbol, jsonOutput)
		},
	}

	cmd.Flags().StringVarP(&symbol, "symbol", "s", "", "Symbol name to search")
	cmd.Flags().StringVarP(&dir, "dir", "d", ".", "Root directory to search")
	cmd.Flags().StringVarP(&lang, "lang", "l", "", "Language filter (go, ts, py, rs)")
	cmd.Flags().StringVarP(&kind, "kind", "k", "", "Symbol kind (function, type, variable, method, class)")
	cmd.Flags().IntVarP(&maxResults, "max-results", "n", 0, "Maximum number of results (0 = unlimited)")
	return cmd
}
