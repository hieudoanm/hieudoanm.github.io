package country

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "country",
		Short: "Chess.com country data",
		Long:  `Fetch Chess.com country data: profile, players, and clubs.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newProfileCmd())
	cmd.AddCommand(newPlayersCmd())
	cmd.AddCommand(newClubsCmd())
	return cmd
}
