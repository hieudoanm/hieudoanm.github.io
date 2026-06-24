package invoice

import (
	"github.com/spf13/cobra"
	"github.com/hieudoanm/jack/src/cmd/telegram/invoice/create"
	"github.com/hieudoanm/jack/src/cmd/telegram/invoice/pre_checkout"
	"github.com/hieudoanm/jack/src/cmd/telegram/invoice/shipping"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "invoice",
		Short: "Create and manage invoices",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
		cmd.AddCommand(create.NewCmd())
	cmd.AddCommand(pre_checkout.NewCmd())
	cmd.AddCommand(shipping.NewCmd())
	return cmd
}
