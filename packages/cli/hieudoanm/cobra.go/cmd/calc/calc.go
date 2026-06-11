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
	cmd.AddCommand(newCurrencyCmd())
	cmd.AddCommand(newLoanCmd())
	cmd.AddCommand(newDiscountCmd())
	cmd.AddCommand(newTipCmd())
	cmd.AddCommand(newBmiCmd())
	cmd.AddCommand(newBaseCmd())
	return cmd
}
