package search

import (
	"fmt"

	"github.com/spf13/cobra"
)

func newWebCmd() *cobra.Command {
	var maxResults int
	var source string

	cmd := &cobra.Command{
		Use:   "web <query>",
		Short: "Search the internet",
		Long: `Search the web for a query. Uses DuckDuckGo by default (no API key needed).

Examples:
  search web "golang concurrency patterns"
  search web "latest AI news 2026" --max-results 10
  search web --source google "site:github.com golang cli"`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			query := args[0]

			if source == "" || source == "duckduckgo" {
				return duckDuckGoSearch(query, maxResults)
			}

			return fmt.Errorf("unsupported search source: %s (use 'duckduckgo')", source)
		},
	}

	cmd.Flags().IntVarP(&maxResults, "max-results", "n", 5, "Maximum number of results")
	cmd.Flags().StringVarP(&source, "source", "s", "duckduckgo", "Search source (duckduckgo)")
	return cmd
}
