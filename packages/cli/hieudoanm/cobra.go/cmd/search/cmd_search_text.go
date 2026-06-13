package search

import (
	"fmt"
	"regexp"

	"github.com/spf13/cobra"
)

func newTextCmd() *cobra.Command {
	var ignoreCase bool
	var maxCount int
	var include string
	var maxDepth int

	cmd := &cobra.Command{
		Use:   "text <pattern> [files-or-dirs...]",
		Short: "Search file contents using regex",
		Long: `Search for a regex pattern inside files. If a directory is given, searches recursively.

Examples:
  search text "TODO" .
  search text "func.*error" --include "*.go"
  search text "import" src/ --ignore-case
  search text "panic" --max-count 5`,
		Args: cobra.MinimumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			pattern := args[0]

			searchRoots := args[1:]
			if len(searchRoots) == 0 {
				searchRoots = []string{"."}
			}

			rePattern := pattern
			if ignoreCase {
				rePattern = "(?i)" + pattern
			}

			re, err := regexp.Compile(rePattern)
			if err != nil {
				return fmt.Errorf("invalid regex %q: %w", pattern, err)
			}

			includePattern := includeToRegex(include)
			results, err := searchTextInRoots(pattern, searchRoots, re, includePattern, maxDepth, maxCount)
			if err != nil {
				return err
			}

			outputTextResults(results, pattern)
			return nil
		},
	}

	cmd.Flags().BoolVarP(&ignoreCase, "ignore-case", "i", false, "Case-insensitive search")
	cmd.Flags().IntVarP(&maxCount, "max-count", "m", 0, "Maximum number of matches")
	cmd.Flags().StringVar(&include, "include", "", "Glob pattern for file names (e.g. \"*.go\")")
	cmd.Flags().IntVarP(&maxDepth, "max-depth", "d", 0, "Maximum directory depth (0 = unlimited)")
	return cmd
}
