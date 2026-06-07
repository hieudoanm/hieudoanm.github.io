package count

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var filePath string
	cmd := &cobra.Command{
		Use:   "count [--file <path>]",
		Short: "Count lines, words, and bytes in a file",
		Long:  `Count lines, words, and bytes in a file (like Unix wc).`,
		Example: `  file count --file main.go
  file count -f main.go --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			data, err := os.ReadFile(filePath)
			if err != nil {
				return err
			}

			var lines int
			for _, b := range data {
				if b == '\n' {
					lines++
				}
			}
			words := len(strings.Fields(string(data)))
			bytes := len(data)

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"file":  filePath,
					"lines": lines,
					"words": words,
					"bytes": bytes,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("%8d %8d %8d %s\n", lines, words, bytes, filePath)
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&filePath, "file", "f", "", "File path")
	return cmd
}
