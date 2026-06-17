package history

import (
	"fmt"

	"github.com/hieudoanm/hieudoanm/libs/history"
	"github.com/spf13/cobra"
)

func newClearCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "clear",
		Short: "Clear all history",
		RunE: func(cmd *cobra.Command, args []string) error {
			if err := history.Clear(); err != nil {
				return err
			}
			fmt.Println("history cleared")
			return nil
		},
	}
}
