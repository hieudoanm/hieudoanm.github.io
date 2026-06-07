package puzzle

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "puzzle",
		Short: "Chess.com daily puzzle",
		Long:  `Fetch the daily puzzle or a random puzzle from Chess.com.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newDailyCmd())
	cmd.AddCommand(newRandomCmd())
	return cmd
}
