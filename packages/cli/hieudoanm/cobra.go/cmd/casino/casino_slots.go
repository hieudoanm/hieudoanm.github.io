package casino

import (
	"github.com/spf13/cobra"
)

func newSlotsCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "slots",
		Short: "Slot machine games",
	}
	cmd.AddCommand(
		newSlotsPlayCmd(),
	)
	return cmd
}
