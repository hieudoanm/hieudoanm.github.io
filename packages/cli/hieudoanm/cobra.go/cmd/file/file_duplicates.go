package file

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

func quickHash(path string) (string, error) {
	f, err := os.Open(path)
	if err != nil {
		return "", err
	}
	defer f.Close()
	h := sha256.New()
	io.Copy(h, f)
	return hex.EncodeToString(h.Sum(nil)), nil
}

func newDuplicatesCmd() *cobra.Command {
	var minSize int64
	cmd := &cobra.Command{
		Use:   "duplicates <directory>",
		Short: "Find duplicate files by size and partial hash",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			bySize := make(map[int64][]string)
			filepath.Walk(args[0], func(path string, fi os.FileInfo, err error) error {
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
					h, err := quickHash(p)
					if err != nil {
						continue
					}
					byHash[h] = append(byHash[h], p)
				}
				for _, dups := range byHash {
					if len(dups) < 2 {
						continue
					}
					if jsonOutput {
						dupGroups = append(dupGroups, map[string]interface{}{
							"size":  size,
							"files": dups,
						})
					} else {
						fmt.Printf("Duplicates (%s each):\n", formatSize(size))
						for _, d := range dups {
							fmt.Printf("  %s\n", d)
						}
						fmt.Println()
					}
				}
			}

			if jsonOutput {
				b, _ := json.MarshalIndent(dupGroups, "", "  ")
				fmt.Println(string(b))
			} else if len(dupGroups) == 0 {
				fmt.Println("No duplicates found.")
			}
			return nil
		},
	}
	cmd.Flags().Int64VarP(&minSize, "min-size", "m", 1, "Minimum file size to consider (bytes)")
	return cmd
}
