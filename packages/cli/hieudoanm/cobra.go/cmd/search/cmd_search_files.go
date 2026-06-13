package search

import (
	"github.com/spf13/cobra"
)

func newFilesCmd() *cobra.Command {
	var maxDepth int
	var fileType string
	var hidden bool

	cmd := &cobra.Command{
		Use:   "files <pattern> [root]",
		Short: "Find files by glob pattern",
		Long: `Find files matching a glob pattern starting from an optional root directory.

Patterns use glob syntax:
  *.go          - all Go files
  **/*.ts       - TypeScript files in any subdirectory
  src/**/*.ts   - TypeScript files under src/
  test_*.py     - files matching test_ prefix with .py extension

Examples:
  search files "*.go"
  search files "*.ts" src/
  search files "**/*.md" docs/
  search files "*.py" --type f
  search files "config.*" --hidden`,
		Args: cobra.RangeArgs(1, 2),
		RunE: func(cmd *cobra.Command, args []string) error {
			pattern := args[0]
			root := "."
			if len(args) > 1 {
				root = args[1]
			}

			results, err := findFilesWithGlob(pattern, root, maxDepth, fileType, hidden)
			if err != nil {
				return err
			}

			outputFileResults(results, pattern, root)
			return nil
		},
	}

	cmd.Flags().IntVarP(&maxDepth, "max-depth", "d", 0, "Maximum directory depth (0 = unlimited)")
	cmd.Flags().StringVarP(&fileType, "type", "t", "", "Filter by type: f (file) or d (directory)")
	cmd.Flags().BoolVarP(&hidden, "hidden", "H", false, "Include hidden files and directories")
	return cmd
}
