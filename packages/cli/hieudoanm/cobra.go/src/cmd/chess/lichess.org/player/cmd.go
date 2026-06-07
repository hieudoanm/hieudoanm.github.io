package player

import "github.com/spf13/cobra"

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "player",
		Short: "Top players and leaderboards",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newTop10Cmd())
	cmd.AddCommand(newLeaderboardCmd())
	return cmd
}
