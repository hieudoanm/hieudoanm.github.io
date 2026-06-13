package file

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

func parseMode(s string) (os.FileMode, error) {
	var mode uint32
	if _, err := fmt.Sscanf(s, "%o", &mode); err != nil {
		return 0, fmt.Errorf("invalid mode %q (use octal e.g. 755)", s)
	}
	return os.FileMode(mode), nil
}

func newChmodCmd() *cobra.Command {
	var recursive bool

	cmd := &cobra.Command{
		Use:   "chmod <mode> <file>",
		Short: "Change file permissions",
		Long:  `Change permissions of a file. Mode is an octal string (e.g. 755, 644, 600).`,
		Example: `  file chmod 755 script.sh
  file chmod 644 README.md
  file chmod -r 755 dir/`,
		Args: cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			mode, err := parseMode(args[0])
			if err != nil {
				return err
			}
			path := args[1]

			if recursive {
				return filepath.Walk(path, func(p string, fi os.FileInfo, err error) error {
					if err != nil {
						return err
					}
					return os.Chmod(p, mode)
				})
			}
			return os.Chmod(path, mode)
		},
	}

	cmd.Flags().BoolVarP(&recursive, "recursive", "r", false, "Change permissions recursively")
	return cmd
}
