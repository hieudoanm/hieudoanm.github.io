package web

import "github.com/spf13/cobra"

func newShopifyCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "shopify",
		Short: "Shopify detection and analysis tools",
	}
	cmd.AddCommand(newShopifyDetectCmd())
	return cmd
}
