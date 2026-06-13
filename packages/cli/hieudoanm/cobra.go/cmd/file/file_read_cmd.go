package file

import (
	"os"

	"github.com/spf13/cobra"
)

func newReadCmd() *cobra.Command {
	var lines int
	var offset int
	var showLineNumbers bool

	cmd := &cobra.Command{
		Use:   "read <file>",
		Short: "Read file content with line numbers",
		Long: `Read a file and display its content with optional line numbers, offset, and line limit.

Examples:
  file read main.go
  file read --lines 50 main.go
  file read --offset 10 --lines 20 main.go
  file read --no-numbers main.go`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			path := args[0]
			content, displayLines, totalLines, err := readFileContent(path, offset, lines)
			if err != nil {
				return err
			}

			if jsonOutput {
				info, _ := os.Stat(path)
				renderReadJSON(path, info, content, displayLines, totalLines, offset, lines)
				return nil
			}

			renderReadText(path, displayLines, offset, totalLines, showLineNumbers)
			return nil
		},
	}

	cmd.Flags().IntVarP(&lines, "lines", "n", 0, "Number of lines to show (0 = all)")
	cmd.Flags().IntVarP(&offset, "offset", "o", 0, "Starting line offset (0-based)")
	cmd.Flags().BoolVar(&showLineNumbers, "numbers", true, "Show line numbers")
	return cmd
}
