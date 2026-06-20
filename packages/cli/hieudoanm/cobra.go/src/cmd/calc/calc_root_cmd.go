package calc

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "calc",
		Short: "Financial and utility calculators",
		Long:  `A collection of calculator tools including tax calculation and compound interest.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
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
	cmd.AddCommand(newAgeCmd())

	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")
	return cmd
}
