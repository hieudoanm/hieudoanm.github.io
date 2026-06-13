package calc

import (
	"github.com/spf13/cobra"
)

var calcJSON bool

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
	cmd.AddCommand(newUnitCmd())
	cmd.AddCommand(newPercentCmd())
	cmd.AddCommand(newMortgageCmd())
	cmd.AddCommand(newDateCalcCmd())
	cmd.AddCommand(newEvalCmd())
	cmd.AddCommand(newStatsCmd())
	cmd.AddCommand(newFactorialCmd())
	cmd.AddCommand(newRandomCmd())
	cmd.AddCommand(newPrimeCmd())
	cmd.AddCommand(newGcdCmd())
	cmd.AddCommand(newLcmCmd())
	cmd.PersistentFlags().BoolVar(&calcJSON, "json", false, "Output in JSON format")
	return cmd
}
