package file

import (
	"os"

	"github.com/spf13/cobra"
)

func newWriteCmd() *cobra.Command {
	var appendMode bool
	var mkdir bool
	var permMode string

	cmd := &cobra.Command{
		Use:   "write <file> [content]",
		Short: "Write or append content to a file",
		Long: `Write content to a file. Content can be provided as an argument or piped via stdin.

Examples:
  file write hello.txt "Hello, World!"
  file write hello.txt           (reads from stdin)
  file write --append log.txt "new log entry"
  file write --mkdir newdir/file.txt "content"
  echo "data" | file write output.txt`,
		Args: cobra.RangeArgs(1, 2),
		RunE: func(cmd *cobra.Command, args []string) error {
			path := args[0]

			content, err := getWriteContent(args)
			if err != nil {
				return err
			}

			flag, mode, err := openFileForWrite(path, appendMode, mkdir, permMode)
			if err != nil {
				return err
			}

			f, err := os.OpenFile(path, flag, mode)
			if err != nil {
				return err
			}
			defer f.Close()

			n, err := f.WriteString(content)
			if err != nil {
				return err
			}

			outputWriteResult(path, n, appendMode)
			return nil
		},
	}

	cmd.Flags().BoolVarP(&appendMode, "append", "a", false, "Append to file instead of overwriting")
	cmd.Flags().BoolVarP(&mkdir, "mkdir", "p", false, "Create parent directories if needed")
	cmd.Flags().StringVarP(&permMode, "mode", "m", "", "File permissions (octal, e.g. 644)")
	return cmd
}
