package history

import (
	"fmt"
	"os"

	"github.com/hieudoanm/hieudoanm/src/libs/history"
	"github.com/spf13/cobra"
)

func newListCmd() *cobra.Command {
	var limit int
	cmd := &cobra.Command{
		Use:   "list",
		Short: "List recent history entries",
		RunE: func(cmd *cobra.Command, args []string) error {
			entries, err := history.List(limit)
			if err != nil {
				return err
			}
			if len(entries) == 0 {
				fmt.Fprintln(os.Stderr, "no history entries")
				return nil
			}
			for _, e := range entries {
				fmt.Println(e.String())
			}
			return nil
		},
	}
	cmd.Flags().IntVarP(&limit, "limit", "n", 20, "max entries to show")
	return cmd
}
