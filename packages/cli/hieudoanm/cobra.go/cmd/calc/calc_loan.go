package calc

import (
	"fmt"
	"math"

	"github.com/spf13/cobra"
)

func newLoanCmd() *cobra.Command {
	var principal, rate, years float64

	cmd := &cobra.Command{
		Use:   "loan",
		Short: "Loan amortization calculator",
		Example: `  calc loan --principal 30000 --rate 5 --years 5
  calc loan -p 30000 -r 5 -y 5`,
		RunE: func(cmd *cobra.Command, args []string) error {
			r := rate / 100.0 / 12
			n := years * 12
			payment := principal * r * math.Pow(1+r, n) / (math.Pow(1+r, n) - 1)
			totalPayment := payment * n
			totalInterest := totalPayment - principal

			fmt.Println("=== Loan Amortization ===")
			fmt.Printf("Principal:     %15.2f\n", principal)
			fmt.Printf("Annual rate:   %15.2f%%\n", rate)
			fmt.Printf("Years:         %15.0f\n", years)
			fmt.Printf("Monthly:       %15.2f\n", payment)
			fmt.Printf("Total paid:    %15.2f\n", totalPayment)
			fmt.Printf("Total interest:%15.2f\n", totalInterest)
			fmt.Println()
			fmt.Printf("%-6s %12s %12s %12s\n", "Month", "Payment", "Interest", "Balance")
			fmt.Println("------   ------------   ------------   ------------")
			balance := principal
			for i := 1; i <= int(n) && i <= 12; i++ {
				interest := balance * r
				principalPaid := payment - interest
				balance -= principalPaid
				fmt.Printf("%-6d %12.2f %12.2f %12.2f\n", i, payment, interest, balance)
			}
			if n > 12 {
				fmt.Printf("... (%0.f more months)\n", n-12)
			}
			return nil
		},
	}

	cmd.Flags().Float64VarP(&principal, "principal", "p", 0, "Loan principal amount")
	cmd.Flags().Float64VarP(&rate, "rate", "r", 0, "Annual interest rate (percentage)")
	cmd.Flags().Float64VarP(&years, "years", "y", 0, "Loan term in years")
	return cmd
}
