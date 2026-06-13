package file

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

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
