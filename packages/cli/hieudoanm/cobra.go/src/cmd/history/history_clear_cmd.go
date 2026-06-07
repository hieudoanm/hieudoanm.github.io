package history

import (
	"fmt"

	"github.com/hieudoanm/jack/src/libs/history"
	"github.com/spf13/cobra"
)

func newClearCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "clear",
		Short: "Clear all history",
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			if err := history.Clear(); err != nil {
				return err
			}
			if jsonOutput {
				fmt.Println(`{"status":"cleared"}`)
			} else {
				fmt.Println("history cleared")
			}
			return nil
		},
	}
}
