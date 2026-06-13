package file

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

func newSizeCmd() *cobra.Command {
	var path string
	cmd := &cobra.Command{
		Use:   "size [--path <file-or-dir>]",
		Short: "Show file or directory size",
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
				if jsonOutput {
					b, _ := json.MarshalIndent(map[string]interface{}{
						"path": path,
						"size": total,
					}, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Printf("%s  %s\n", formatSize(total), path)
				}
			} else {
				if jsonOutput {
					b, _ := json.MarshalIndent(map[string]interface{}{
						"path": path,
						"size": info.Size(),
					}, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Printf("%s  %s\n", formatSize(info.Size()), path)
				}
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&path, "path", "p", "", "File or directory path")
	return cmd
}
