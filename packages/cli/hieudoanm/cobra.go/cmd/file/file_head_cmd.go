package file

import (
	"bufio"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func newHeadCmd() *cobra.Command {
	var lines int
	var filePath string
	cmd := &cobra.Command{
		Use:   "head [--file <path>]",
		Short: "Show the first N lines of a file",
		Example: `  file head --file main.go
  file head -f main.go --lines 20`,
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(filePath)
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
	cmd.Flags().StringVarP(&filePath, "file", "f", "", "File path")
	cmd.Flags().IntVarP(&lines, "lines", "n", 10, "Number of lines")
	return cmd
}
