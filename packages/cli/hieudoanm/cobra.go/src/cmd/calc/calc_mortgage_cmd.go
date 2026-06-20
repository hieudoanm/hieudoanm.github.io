package calc

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

func newMortgageCmd() *cobra.Command {
	var principal, rate, years, taxes, insurance, pmi float64

	cmd := &cobra.Command{
		Use:   "mortgage",
		Short: "Mortgage payment calculator",
		Long:  `Calculate monthly mortgage payments including taxes, insurance, and PMI.`,
		Example: `  calc mortgage --principal 300000 --rate 6.5 --years 30
  calc mortgage -p 300000 -r 6.5 -y 30 --taxes 3000 --insurance 1200`,
		RunE: func(cmd *cobra.Command, args []string) error {
			n := years * 12
			payment := calcPayment(principal, rate, years)

			monthlyTaxes := taxes / 12
			monthlyInsurance := insurance / 12
			monthlyPMI := pmi / 12
			totalMonthly := payment + monthlyTaxes + monthlyInsurance + monthlyPMI
			totalPaid := totalMonthly * n
			totalInterest := totalPaid - principal - monthlyTaxes*n - monthlyInsurance*n - monthlyPMI*n

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				out, err := json.MarshalIndent(map[string]interface{}{
					"principal":         principal,
					"rate":              rate,
					"years":             years,
					"monthly_payment":   payment,
					"monthly_taxes":     monthlyTaxes,
					"monthly_insurance": monthlyInsurance,
					"monthly_pmi":       monthlyPMI,
					"total_monthly":     totalMonthly,
					"total_paid":        totalPaid,
					"total_interest":    totalInterest,
				}, "", "  ")
				if err != nil {
					return err
				}
				fmt.Println(string(out))
				return nil
			}

			fmt.Println("=== Mortgage Calculator ===")
			fmt.Printf("Principal:           %14.2f\n", principal)
			fmt.Printf("Annual rate:         %14.2f%%\n", rate)
			fmt.Printf("Years:               %14.0f\n", years)
			fmt.Println()
			fmt.Printf("Principal & Interest: %12.2f\n", payment)
			if taxes > 0 {
				fmt.Printf("Property taxes:      %12.2f/mo\n", monthlyTaxes)
			}
			if insurance > 0 {
				fmt.Printf("Insurance:           %12.2f/mo\n", monthlyInsurance)
			}
			if pmi > 0 {
				fmt.Printf("PMI:                 %12.2f/mo\n", monthlyPMI)
			}
			fmt.Println(strings.Repeat("-", 35))
			fmt.Printf("Total monthly:       %12.2f\n", totalMonthly)
			fmt.Println()
			fmt.Printf("Total paid:          %14.2f\n", totalPaid)
			fmt.Printf("Total interest:      %14.2f\n", totalInterest)
			return nil
		},
	}

	cmd.Flags().Float64VarP(&principal, "principal", "p", 0, "Loan principal")
	cmd.Flags().Float64VarP(&rate, "rate", "r", 0, "Annual interest rate (percentage)")
	cmd.Flags().Float64VarP(&years, "years", "y", 30, "Loan term in years")
	cmd.Flags().Float64Var(&taxes, "taxes", 0, "Annual property taxes")
	cmd.Flags().Float64Var(&insurance, "insurance", 0, "Annual insurance")
	cmd.Flags().Float64Var(&pmi, "pmi", 0, "Annual PMI")
	return cmd
}
