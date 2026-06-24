package venue

import (
	"github.com/spf13/cobra"
	"github.com/hieudoanm/jack/src/cmd/telegram/venue/send"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "venue",
		Short: "Send venues",
		RunE: func(cmd *cobra.Command, args []string) error {
			return cmd.Help()
		},
	}
		cmd.AddCommand(send.NewCmd())
	return cmd
}
