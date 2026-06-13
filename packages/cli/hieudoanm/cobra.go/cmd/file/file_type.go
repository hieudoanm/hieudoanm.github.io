package file

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
)

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
