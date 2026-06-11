package calc

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "calc",
		Short: "Financial and utility calculators",
		Long:  `A collection of calculator tools including tax calculation and compound interest.`,
	}
	cmd.AddCommand(newTaxCmd())
	cmd.AddCommand(newCompoundCmd())
	return cmd
}
