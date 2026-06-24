package poll

import (
	"github.com/spf13/cobra"
	"github.com/hieudoanm/jack/src/cmd/telegram/poll/send"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "poll",
		Short: "Send polls",
		RunE: func(cmd *cobra.Command, args []string) error {
			return cmd.Help()
		},
	}
		cmd.AddCommand(send.NewCmd())
	return cmd
}
