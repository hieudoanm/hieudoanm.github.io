package duplicates

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/hieudoanm/jack/src/cmd/file/internal"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var minSize int64
	var dir string
	cmd := &cobra.Command{
		Use:   "duplicates [--dir <path>]",
		Short: "Find duplicate files by size and partial hash",
		Long:  `Scan a directory for duplicate files by comparing SHA-256 hashes of files with the same size.`,
		Example: `  file duplicates --dir .
  file duplicates -d /path/to/files --min-size 1024
  file duplicates -d . --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			bySize := make(map[int64][]string)
			filepath.Walk(dir, func(path string, fi os.FileInfo, err error) error {
				if err != nil || fi.IsDir() || fi.Size() < minSize {
					return nil
				}
				bySize[fi.Size()] = append(bySize[fi.Size()], path)
				return nil
			})

			var dupGroups []map[string]interface{}

			for size, paths := range bySize {
				if len(paths) < 2 {
					continue
				}
				byHash := make(map[string][]string)
				for _, p := range paths {
					h, err := internal.QuickHash(p)
					if err != nil {
						continue
					}
					byHash[h] = append(byHash[h], p)
				}
				for _, dups := range byHash {
					if len(dups) < 2 {
						continue
					}
					if ok, _ := cmd.Flags().GetBool("json"); ok {
						dupGroups = append(dupGroups, map[string]interface{}{
							"size":  size,
							"files": dups,
						})
					} else {
						fmt.Printf("Duplicates (%s each):\n", internal.FormatSize(size))
						for _, d := range dups {
							fmt.Printf("  %s\n", d)
						}
						fmt.Println()
					}
				}
			}

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				b, _ := json.MarshalIndent(dupGroups, "", "  ")
				fmt.Println(string(b))
			} else if len(dupGroups) == 0 {
				fmt.Println("No duplicates found.")
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&dir, "dir", "d", "", "Directory to scan")
	cmd.Flags().Int64VarP(&minSize, "min-size", "m", 1, "Minimum file size to consider (bytes)")
	return cmd
}
