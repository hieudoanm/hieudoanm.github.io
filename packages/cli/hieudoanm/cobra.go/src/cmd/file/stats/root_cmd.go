package stats

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/hieudoanm/jack/src/cmd/file/internal"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var dir string
	cmd := &cobra.Command{
		Use:   "stats [--dir <path>]",
		Short: "Show file statistics by extension",
		Long:  `Walk a directory and produce statistics about files grouped by extension. Shows file count and total size per extension.`,
		Example: `  file stats --dir .
  file stats -d /path/to/project
  file stats -d . --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			extStats := make(map[string]struct {
				count int
				size  int64
			})
			var totalFiles int
			var totalSize int64

			filepath.Walk(dir, func(path string, fi os.FileInfo, err error) error {
				if err != nil || fi.IsDir() {
					return nil
				}
				totalFiles++
				totalSize += fi.Size()
				ext := strings.ToLower(filepath.Ext(path))
				if ext == "" {
					ext = "(no extension)"
				}
				s := extStats[ext]
				s.count++
				s.size += fi.Size()
				extStats[ext] = s
				return nil
			})

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				type extJSON struct {
					Extension string `json:"extension"`
					Files     int    `json:"files"`
					Size      int64  `json:"size"`
				}
				var entries []extJSON
				for ext, s := range extStats {
					entries = append(entries, extJSON{ext, s.count, s.size})
				}
				sort.Slice(entries, func(i, j int) bool {
					return entries[i].Size > entries[j].Size
				})
				b, _ := json.MarshalIndent(map[string]interface{}{
					"path":        dir,
					"totalFiles":  totalFiles,
					"totalSize":   totalSize,
					"byExtension": entries,
				}, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			fmt.Printf("Total files : %d\n", totalFiles)
			fmt.Printf("Total size  : %s\n", internal.FormatSize(totalSize))
			fmt.Println()

			type extEntry struct {
				ext   string
				count int
				size  int64
			}
			var entries []extEntry
			for ext, s := range extStats {
				entries = append(entries, extEntry{ext, s.count, s.size})
			}
			sort.Slice(entries, func(i, j int) bool {
				return entries[i].size > entries[j].size
			})

			fmt.Printf("%-20s %8s %12s\n", "Extension", "Files", "Size")
			fmt.Println(strings.Repeat("-", 42))
			for _, e := range entries {
				fmt.Printf("%-20s %8d %12s\n", e.ext, e.count, internal.FormatSize(e.size))
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&dir, "dir", "d", "", "Directory path")
	return cmd
}
