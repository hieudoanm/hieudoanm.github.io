package shopify

import (
	"fmt"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "shopify",
		Short: "Shopify related tools",
		Long:  `Shopify-related CLI tools for store management and development.`,
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("shopify called")
		},
	}

	cmd.AddCommand(NewDetectCommand())
	return cmd
}
