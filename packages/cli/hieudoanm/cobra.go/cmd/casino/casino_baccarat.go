package casino

import (
	"github.com/spf13/cobra"
)

func newBaccaratCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "baccarat",
		Short: "Baccarat games",
	}
	cmd.AddCommand(
		newBaccaratPlayCmd(),
		newBaccaratStrategyCmd(),
	)
	return cmd
}
