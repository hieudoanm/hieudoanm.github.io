package casino

import (
	"github.com/spf13/cobra"
)

func newSlotsCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "slots",
		Short:   "Slot machine games",
		Long:    `Slot machine subcommands: play a slot machine game.`,
		Example: `  casino slots play`,
	}
	cmd.AddCommand(
		newSlotsPlayCmd(),
	)
	return cmd
}
