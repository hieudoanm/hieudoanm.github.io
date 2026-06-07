package invoice

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "invoice",
		Short: "Create and manage invoices",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newCreateCmd())
	cmd.AddCommand(newShippingCmd())
	cmd.AddCommand(newPreCheckoutCmd())
	return cmd
}
