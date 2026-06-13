package search

import (
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
