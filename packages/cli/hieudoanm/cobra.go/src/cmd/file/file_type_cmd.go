package file

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func newTypeCmd() *cobra.Command {
	var filePath string
	cmd := &cobra.Command{
		Use:   "type [--file <path>]",
		Short: "Detect file type by extension",
		Long:  `Detect a file's MIME type based on its extension and display file metadata (size, mode, modification time).`,
		Example: `  file type --file image.png
  file type -f document.pdf`,
		RunE: func(cmd *cobra.Command, args []string) error {
			info, err := os.Stat(filePath)
			if err != nil {
				return err
			}
			mime := detectMIME(filePath)

			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"file":     filePath,
					"size":     info.Size(),
					"mime":     mime,
					"mode":     info.Mode().String(),
					"modified": info.ModTime().Format("2006-01-02T15:04:05Z"),
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("File     : %s\n", filePath)
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
	cmd.Flags().StringVarP(&filePath, "file", "f", "", "File path")
	return cmd
}
