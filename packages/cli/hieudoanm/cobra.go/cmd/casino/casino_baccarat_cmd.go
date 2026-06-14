package casino

import (
	"github.com/spf13/cobra"
)

func newBaccaratCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "baccarat",
		Short: "Baccarat games",
		Long:  `Baccarat subcommands: play a game, or analyze betting strategy.`,
		Example: `  casino baccarat play
  casino baccarat strategy`,
	}
	cmd.AddCommand(
		newBaccaratPlayCmd(),
		newBaccaratStrategyCmd(),
	)
	return cmd
}
