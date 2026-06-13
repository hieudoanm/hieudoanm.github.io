package file

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

func newSizeCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "size <file-or-dir>",
		Short: "Show file or directory size",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			info, err := os.Stat(args[0])
			if err != nil {
				return err
			}
			if info.IsDir() {
				var total int64
				filepath.Walk(args[0], func(path string, fi os.FileInfo, err error) error {
					if err != nil {
						return nil
					}
					total += fi.Size()
					return nil
				})
				if jsonOutput {
					b, _ := json.MarshalIndent(map[string]interface{}{
						"path": args[0],
						"size": total,
					}, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Printf("%s  %s\n", formatSize(total), args[0])
				}
			} else {
				if jsonOutput {
					b, _ := json.MarshalIndent(map[string]interface{}{
						"path": args[0],
						"size": info.Size(),
					}, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Printf("%s  %s\n", formatSize(info.Size()), args[0])
				}
			}
			return nil
		},
	}
}
