package file

import (
	"bufio"
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "file",
		Short: "File introspection and analysis tools",
		Long:  `Check file checksums, detect types, analyze sizes, and find duplicates.`,
	}
	cmd.AddCommand(newChecksumCmd())
	cmd.AddCommand(newTypeCmd())
	cmd.AddCommand(newSizeCmd())
	cmd.AddCommand(newDuplicatesCmd())
	cmd.AddCommand(newStatsCmd())
	cmd.AddCommand(newHeadCmd())
	cmd.AddCommand(newTailCmd())
	cmd.AddCommand(newCountCmd())
	cmd.PersistentFlags().BoolVar(&jsonOutput, "json", false, "Output in JSON format")
	return cmd
}

func newChecksumCmd() *cobra.Command {
	var algorithm string
	cmd := &cobra.Command{
		Use:   "checksum <file>",
		Short: "Compute file checksum",
		Example: `  file checksum document.pdf
  file checksum --algorithm sha256 document.pdf`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(args[0])
			if err != nil {
				return err
			}
			defer f.Close()

			var hash string
			switch algorithm {
			case "md5":
				h := md5.New()
				io.Copy(h, f)
				hash = hex.EncodeToString(h.Sum(nil))
			case "sha1":
				h := sha1.New()
				io.Copy(h, f)
				hash = hex.EncodeToString(h.Sum(nil))
			case "sha256":
				h := sha256.New()
				io.Copy(h, f)
				hash = hex.EncodeToString(h.Sum(nil))
			case "sha512":
				h := sha512.New()
				io.Copy(h, f)
				hash = hex.EncodeToString(h.Sum(nil))
			default:
				h := sha256.New()
				io.Copy(h, f)
				hash = hex.EncodeToString(h.Sum(nil))
			}

			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]string{
					"file":      args[0],
					"algorithm": algorithm,
					"hash":      hash,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("%s  %s\n", hash, args[0])
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&algorithm, "algorithm", "a", "sha256", "Hash algorithm: md5, sha1, sha256, sha512")
	return cmd
}

func detectMIME(path string) string {
	ext := strings.ToLower(filepath.Ext(path))
	mimes := map[string]string{
		".txt": "text/plain", ".md": "text/markdown", ".html": "text/html",
		".css": "text/css", ".js": "text/javascript", ".json": "application/json",
		".xml": "application/xml", ".yml": "application/x-yaml", ".yaml": "application/x-yaml",
		".toml": "application/toml", ".csv": "text/csv",
		".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
		".gif": "image/gif", ".svg": "image/svg+xml", ".webp": "image/webp",
		".pdf": "application/pdf", ".doc": "application/msword",
		".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		".xls":  "application/vnd.ms-excel", ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		".zip": "application/zip", ".tar": "application/x-tar", ".gz": "application/gzip",
		".mp3": "audio/mpeg", ".mp4": "video/mp4",
		".go": "text/x-go", ".py": "text/x-python", ".rs": "text/x-rust",
		".sh": "text/x-shellscript", ".swift": "text/x-swift",
	}
	if m, ok := mimes[ext]; ok {
		return m
	}
	return "application/octet-stream"
}

func newTypeCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "type <file>",
		Short: "Detect file type by extension",
		Example: `  file type image.png
  file type document.pdf`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			info, err := os.Stat(args[0])
			if err != nil {
				return err
			}
			mime := detectMIME(args[0])

			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"file":     args[0],
					"size":     info.Size(),
					"mime":     mime,
					"mode":     info.Mode().String(),
					"modified": info.ModTime().Format("2006-01-02T15:04:05Z"),
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("File     : %s\n", args[0])
				fmt.Printf("Size     : %s\n", formatSize(info.Size()))
				fmt.Printf("MIME     : %s\n", mime)
				fmt.Printf("Mode     : %s\n", info.Mode())
				if !info.IsDir() {
					fmt.Printf("Modified : %s\n", info.ModTime().Format("2006-01-02 15:04:05"))
				}
			}
			return nil
		},
	}
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

func newStatsCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "stats <directory>",
		Short: "Show file statistics by extension",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			extStats := make(map[string]struct {
				count int
				size  int64
			})
			var totalFiles int
			var totalSize int64

			filepath.Walk(args[0], func(path string, fi os.FileInfo, err error) error {
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

			if jsonOutput {
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
					"path":        args[0],
					"totalFiles":  totalFiles,
					"totalSize":   totalSize,
					"byExtension": entries,
				}, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			fmt.Printf("Total files : %d\n", totalFiles)
			fmt.Printf("Total size  : %s\n", formatSize(totalSize))
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
				fmt.Printf("%-20s %8d %12s\n", e.ext, e.count, formatSize(e.size))
			}
			return nil
		},
	}
}

func newHeadCmd() *cobra.Command {
	var lines int
	cmd := &cobra.Command{
		Use:   "head <file>",
		Short: "Show the first N lines of a file",
		Example: `  file head main.go
  file head --lines 20 main.go`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(args[0])
			if err != nil {
				return err
			}
			defer f.Close()

			sc := bufio.NewScanner(f)
			for i := 0; i < lines && sc.Scan(); i++ {
				fmt.Println(sc.Text())
			}
			return sc.Err()
		},
	}
	cmd.Flags().IntVarP(&lines, "lines", "n", 10, "Number of lines")
	return cmd
}

func newTailCmd() *cobra.Command {
	var lines int
	cmd := &cobra.Command{
		Use:   "tail <file>",
		Short: "Show the last N lines of a file",
		Example: `  file tail main.go
  file tail --lines 20 main.go`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(args[0])
			if err != nil {
				return err
			}
			defer f.Close()

			sc := bufio.NewScanner(f)
			ring := make([]string, 0, lines)
			for sc.Scan() {
				if len(ring) >= lines {
					ring = ring[1:]
				}
				ring = append(ring, sc.Text())
			}
			if err := sc.Err(); err != nil {
				return err
			}
			for _, line := range ring {
				fmt.Println(line)
			}
			return nil
		},
	}
	cmd.Flags().IntVarP(&lines, "lines", "n", 10, "Number of lines")
	return cmd
}

func newCountCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "count <file>",
		Short: "Count lines, words, and bytes in a file",
		Example: `  file count main.go
  file count main.go --json`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			data, err := os.ReadFile(args[0])
			if err != nil {
				return err
			}

			lines := 0
			for _, b := range data {
				if b == '\n' {
					lines++
				}
			}
			words := len(strings.Fields(string(data)))
			bytes := len(data)

			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"file":  args[0],
					"lines": lines,
					"words": words,
					"bytes": bytes,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("%8d %8d %8d %s\n", lines, words, bytes, args[0])
			}
			return nil
		},
	}
}

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
