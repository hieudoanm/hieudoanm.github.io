package search

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "search",
		Short: "Universal search for files, text, code, and the web",
		Long: `Search for files by name, text inside files, code symbols, and web content.

Search is the universal entry point for finding things:
  search files  - find files by glob pattern
  search text   - search file contents by regex
  search code   - find code symbols (functions, types, etc.)
  search web    - search the internet`,
		Example: `  search files --pattern "*.go"
  search text --pattern "TODO" --path .
  search code --symbol "NewCommand"
  search web --query "golang concurrency patterns"`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newFilesCmd())
	cmd.AddCommand(newTextCmd())
	cmd.AddCommand(newCodeCmd())
	cmd.AddCommand(newWebCmd())
	cmd.PersistentFlags().BoolVar(&jsonOutput, "json", false, "Output in JSON format")
	return cmd
}
