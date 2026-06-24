package game

import (
	"github.com/spf13/cobra"
	"github.com/hieudoanm/jack/src/cmd/telegram/game/high_scores"
	"github.com/hieudoanm/jack/src/cmd/telegram/game/send"
	"github.com/hieudoanm/jack/src/cmd/telegram/game/set_score"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "game",
		Short: "Send and manage games",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
		cmd.AddCommand(high_scores.NewCmd())
	cmd.AddCommand(send.NewCmd())
	cmd.AddCommand(set_score.NewCmd())
	return cmd
}
