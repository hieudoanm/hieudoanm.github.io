package file

import (
	"bufio"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func newTailCmd() *cobra.Command {
	var lines int
	var filePath string
	cmd := &cobra.Command{
		Use:   "tail [--file <path>]",
		Short: "Show the last N lines of a file",
		Long:  `Display the last N lines of a file (like Unix tail). Uses a ring buffer to efficiently stream through the file.`,
		Example: `  file tail --file main.go
  file tail -f main.go --lines 20`,
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(filePath)
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
	cmd.Flags().StringVarP(&filePath, "file", "f", "", "File path")
	cmd.Flags().IntVarP(&lines, "lines", "n", 10, "Number of lines")
	return cmd
}
