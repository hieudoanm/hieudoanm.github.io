package chmod

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/hieudoanm/jack/src/cmd/file/internal"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var recursive bool
	var modeStr, filePath string

	cmd := &cobra.Command{
		Use:   "chmod [--mode <octal>] [--file <path>]",
		Short: "Change file permissions",
		Long:  `Change permissions of a file. Mode is an octal string (e.g. 755, 644, 600).`,
		Example: `  file chmod --mode 755 --file script.sh
  file chmod -m 644 -f README.md
  file chmod -r -m 755 -f dir/`,
		RunE: func(cmd *cobra.Command, args []string) error {
			mode, err := internal.ParseMode(modeStr)
			if err != nil {
				return err
			}

			if recursive {
				err = filepath.Walk(filePath, func(p string, fi os.FileInfo, err error) error {
					if err != nil {
						return err
					}
					return os.Chmod(p, mode)
				})
			} else {
				err = os.Chmod(filePath, mode)
			}
			if err != nil {
				return err
			}

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"file":      filePath,
					"mode":      modeStr,
					"recursive": recursive,
				}, "", "  ")
				fmt.Println(string(b))
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&modeStr, "mode", "m", "", "Octal permission mode (e.g. 755)")
	cmd.Flags().StringVarP(&filePath, "file", "f", "", "File or directory path")
	cmd.Flags().BoolVarP(&recursive, "recursive", "r", false, "Change permissions recursively")
	return cmd
}
