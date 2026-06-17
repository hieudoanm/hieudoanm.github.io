package history

import (
	"fmt"
	"os"

	"github.com/hieudoanm/hieudoanm/libs/history"
	"github.com/spf13/cobra"
)

func newSearchCmd() *cobra.Command {
	var limit int
	cmd := &cobra.Command{
		Use:   "search <query>",
		Short: "Search history entries",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			entries, err := history.Search(args[0], limit)
			if err != nil {
				return err
			}
			if len(entries) == 0 {
				fmt.Fprintln(os.Stderr, "no matching entries")
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
