package file

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func newEditCmd() *cobra.Command {
	var useRegex bool
	var preview bool
	var count int

	cmd := &cobra.Command{
		Use:   "edit <file> <old> <new>",
		Short: "Find and replace text in a file",
		Long: `Replace occurrences of a string (or regex pattern) in a file.

Examples:
  file edit main.go "foo" "bar"
  file edit --regex main.go "foo.*" "bar"
  file edit --preview main.go "foo" "bar"
  file edit --count 1 main.go "foo" "bar"`,
		Args: cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			path := args[0]
			old := args[1]
			newStr := args[2]

			info, err := os.Stat(path)
			if err != nil {
				return err
			}
			if info.IsDir() {
				return fmt.Errorf("%q is a directory", path)
			}

			data, err := os.ReadFile(path)
			if err != nil {
				return err
			}

			replaced, matchCount, err := performEdit(string(data), old, newStr, useRegex, count)
			if err != nil {
				return err
			}

			outputEditResult(path, string(data), replaced, matchCount, preview, info.Mode())
			return nil
		},
	}

	cmd.Flags().BoolVarP(&useRegex, "regex", "r", false, "Interpret old as a regex pattern")
	cmd.Flags().BoolVarP(&preview, "preview", "p", false, "Preview changes without modifying the file")
	cmd.Flags().IntVarP(&count, "count", "n", 0, "Number of occurrences to replace (0 = all)")
	return cmd
}
