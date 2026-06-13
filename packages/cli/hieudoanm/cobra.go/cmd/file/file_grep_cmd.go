package file

import (
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
