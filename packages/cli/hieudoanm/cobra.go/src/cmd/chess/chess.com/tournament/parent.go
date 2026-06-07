package tournament

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "tournament",
		Short: "Chess.com tournament data",
		Long:  `Fetch Chess.com tournament data: info, rounds, and groups.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newInfoCmd())
	cmd.AddCommand(newRoundCmd())
	cmd.AddCommand(newGroupCmd())
	return cmd
}
