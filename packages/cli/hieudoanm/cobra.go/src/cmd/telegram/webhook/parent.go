package webhook

import (
	"github.com/spf13/cobra"
	"github.com/hieudoanm/jack/src/cmd/telegram/webhook/delete"
	"github.com/hieudoanm/jack/src/cmd/telegram/webhook/info"
	"github.com/hieudoanm/jack/src/cmd/telegram/webhook/set"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "webhook",
		Short: "Manage Telegram webhooks",
		Long:  `Manage Telegram Bot webhooks: set, check info, or delete.`,
		Example: `  telegram webhook set
  telegram webhook info
  telegram webhook delete`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
		cmd.AddCommand(delete.NewCmd())
	cmd.AddCommand(info.NewCmd())
	cmd.AddCommand(set.NewCmd())
	return cmd
}
