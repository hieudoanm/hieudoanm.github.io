package user

import "github.com/spf13/cobra"

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "user",
		Short: "User information and statistics",
		Long:  `Fetch Lichess user profiles, status, activity, rating history, and performance stats.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.AddCommand(newProfileCmd())
	cmd.AddCommand(newStatusCmd())
	cmd.AddCommand(newActivityCmd())
	cmd.AddCommand(newRatingCmd())
	cmd.AddCommand(newPerfCmd())

	return cmd
}
