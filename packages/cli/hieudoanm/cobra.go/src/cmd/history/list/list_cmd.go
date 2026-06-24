package list

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/hieudoanm/jack/src/libs/history"
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	var limit int
	cmd := &cobra.Command{
		Use:   "list",
		Short: "List recent history entries",
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			entries, err := history.List(limit)
			if err != nil {
				return err
			}
			if len(entries) == 0 {
				if jsonOutput {
					fmt.Println("[]")
				} else {
					fmt.Fprintln(os.Stderr, "no history entries")
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
