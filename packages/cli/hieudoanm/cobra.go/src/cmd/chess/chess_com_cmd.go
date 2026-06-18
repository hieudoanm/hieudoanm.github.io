package chess

import (
	"github.com/spf13/cobra"
)

func newComCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "com",
		Short: "Chess.com integration",
		Long:  `Fetch data from Chess.com: player profiles, leaderboards, and titled player counts.`,
		Example: `  chess com player --username hikaru
  chess com leaderboards --top 10
  chess com titled`,
		Run: func(cmd *cobra.Command, args []string) {
			cmd.Help()
		},
	}

	cmd.AddCommand(newComPlayerCmd())
	cmd.AddCommand(newComLeaderboardsCmd())
	cmd.AddCommand(newComTitledCmd())

	return cmd
}
