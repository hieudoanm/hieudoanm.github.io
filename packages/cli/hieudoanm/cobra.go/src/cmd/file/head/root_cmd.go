package head

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var lines int
	var filePath string
	cmd := &cobra.Command{
		Use:   "head [--file <path>]",
		Short: "Show the first N lines of a file",
		Long:  `Display the first N lines of a file (like Unix head).`,
		Example: `  file head --file main.go
  file head -f main.go --lines 20`,
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(filePath)
			if err != nil {
				return err
			}
			defer f.Close()

			sc := bufio.NewScanner(f)
			var outputLines []string
			for i := 0; i < lines && sc.Scan(); i++ {
				outputLines = append(outputLines, sc.Text())
			}
			if err := sc.Err(); err != nil {
				return err
			}

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"file":  filePath,
					"lines": outputLines,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				for _, line := range outputLines {
					fmt.Println(line)
				}
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&filePath, "file", "f", "", "File path")
	cmd.Flags().IntVarP(&lines, "lines", "n", 10, "Number of lines")
	return cmd
}
