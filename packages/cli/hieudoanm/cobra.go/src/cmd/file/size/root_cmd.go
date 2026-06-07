package size

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/hieudoanm/jack/src/cmd/file/internal"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var path string
	cmd := &cobra.Command{
		Use:   "size [--path <file-or-dir>]",
		Short: "Show file or directory size",
		Long:  `Display the size of a file or the total size of a directory (recursive).`,
		Example: `  file size --path main.go
  file size -p /path/to/directory
  file size -p . --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			info, err := os.Stat(path)
			if err != nil {
				return err
			}
			if info.IsDir() {
				var total int64
				filepath.Walk(path, func(p string, fi os.FileInfo, err error) error {
					if err != nil {
						return nil
					}
					total += fi.Size()
					return nil
				})
				if ok, _ := cmd.Flags().GetBool("json"); ok {
					b, _ := json.MarshalIndent(map[string]interface{}{
						"path": path,
						"size": total,
					}, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Printf("%s  %s\n", internal.FormatSize(total), path)
				}
			} else {
				if ok, _ := cmd.Flags().GetBool("json"); ok {
					b, _ := json.MarshalIndent(map[string]interface{}{
						"path": path,
						"size": info.Size(),
					}, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Printf("%s  %s\n", internal.FormatSize(info.Size()), path)
				}
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&path, "path", "p", "", "File or directory path")
	return cmd
}
