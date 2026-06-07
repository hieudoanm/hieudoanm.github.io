package webhook

import (
	"github.com/spf13/cobra"
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
	cmd.AddCommand(newSetCmd())
	cmd.AddCommand(newInfoCmd())
	cmd.AddCommand(newDeleteCmd())
	return cmd
}
