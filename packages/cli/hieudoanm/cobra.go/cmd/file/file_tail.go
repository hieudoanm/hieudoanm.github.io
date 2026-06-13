package file

import (
	"bufio"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

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
