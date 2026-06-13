package file

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

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
