package file

import (
	"bufio"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

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
