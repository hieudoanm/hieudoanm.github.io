package game

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "game",
		Short: "Send and manage games",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newSendCmd())
	cmd.AddCommand(newSetScoreCmd())
	cmd.AddCommand(newHighScoresCmd())
	return cmd
}
