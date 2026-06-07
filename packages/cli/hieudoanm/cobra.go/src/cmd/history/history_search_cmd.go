package history

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/hieudoanm/jack/src/libs/history"
	"github.com/spf13/cobra"
)

func newSearchCmd() *cobra.Command {
	var limit int
	cmd := &cobra.Command{
		Use:   "search <query>",
		Short: "Search history entries",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			entries, err := history.Search(args[0], limit)
			if err != nil {
				return err
			}
			if len(entries) == 0 {
				if jsonOutput {
					fmt.Println("[]")
				} else {
					fmt.Fprintln(os.Stderr, "no matching entries")
				}
				return nil
			}
			if jsonOutput {
				out, _ := json.Marshal(entries)
				fmt.Println(string(out))
			} else {
				for _, e := range entries {
					fmt.Println(e.String())
				}
			}
			return nil
		},
	}
	cmd.Flags().IntVarP(&limit, "limit", "n", 20, "max entries to show")
	return cmd
}
