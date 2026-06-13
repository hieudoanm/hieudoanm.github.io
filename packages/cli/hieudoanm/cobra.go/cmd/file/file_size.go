package file

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

func formatSize(bytes int64) string {
	const unit = 1024
	if bytes < unit {
		return fmt.Sprintf("%d B", bytes)
	}
	div, exp := int64(unit), 0
	for n := bytes / unit; n >= unit; n /= unit {
		div *= unit
		exp++
	}
	sizes := []string{"KB", "MB", "GB", "TB"}
	return fmt.Sprintf("%.1f %s", float64(bytes)/float64(div), sizes[exp])
}

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
