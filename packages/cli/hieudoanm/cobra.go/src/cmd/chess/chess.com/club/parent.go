package club

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "club",
		Short: "Chess.com club data",
		Long:  `Fetch Chess.com club data: profile, members, and matches.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newProfileCmd())
	cmd.AddCommand(newMembersCmd())
	cmd.AddCommand(newMatchesCmd())
	return cmd
}
