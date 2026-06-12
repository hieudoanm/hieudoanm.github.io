package calc

import (
	"math"

	"github.com/spf13/cobra"
)

func calcPayment(principal, annualRate, years float64) float64 {
	if annualRate == 0 {
		return principal / (years * 12)
	}
	r := annualRate / 100.0 / 12
	n := years * 12
	return principal * r * math.Pow(1+r, n) / (math.Pow(1+r, n) - 1)
}

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
	cmd.PersistentFlags().BoolVar(&calcJSON, "json", false, "Output in JSON format")
	return cmd
}
