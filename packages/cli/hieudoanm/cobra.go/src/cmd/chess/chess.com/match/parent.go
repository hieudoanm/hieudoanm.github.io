package match

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "match",
		Short: "Chess.com team match data",
		Long:  `Fetch Chess.com team match data: daily and live matches and boards.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newDailyCmd())
	cmd.AddCommand(newDailyBoardCmd())
	cmd.AddCommand(newLiveCmd())
	cmd.AddCommand(newLiveBoardCmd())
	return cmd
}
