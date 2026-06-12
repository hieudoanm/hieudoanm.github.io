package calc

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/spf13/cobra"
)

type frankfurterResponse struct {
	Amount float64            `json:"amount"`
	Base   string             `json:"base"`
	Date   string             `json:"date"`
	Rates  map[string]float64 `json:"rates"`
}

func newCurrencyCmd() *cobra.Command {
	var from, to string
	var amount float64

	cmd := &cobra.Command{
		Use:     "currency",
		Aliases: []string{"cc", "fx"},
		Short:   "Convert between currencies using Frankfurter API",
		Long:    `Convert amounts between world currencies using the European Central Bank's Frankfurter exchange rate API.`,
		Example: `  calc currency --from USD --to EUR --amount 100`,
		RunE: func(cmd *cobra.Command, args []string) error {
			url := fmt.Sprintf("https://api.frankfurter.app/latest?base=%s&symbols=%s", from, to)
			responseByte, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("fetch error: %w", err)
			}

			var response frankfurterResponse
			if err := json.Unmarshal(responseByte, &response); err != nil {
				return fmt.Errorf("parse error: %w", err)
			}

			rate, ok := response.Rates[to]
			if !ok {
				return fmt.Errorf("no rate found for %s", to)
			}

			converted := amount * rate
			if calcJSON {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"from":   from,
					"to":     to,
					"amount": amount,
					"rate":   rate,
					"result": converted,
					"date":   response.Date,
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				fmt.Printf("%.2f %s = %.2f %s (rate: %f)\n", amount, from, converted, to, rate)
			}
			return nil
		},
	}

	cmd.Flags().StringVar(&from, "from", "EUR", "Source currency (default EUR)")
	cmd.Flags().StringVar(&to, "to", "USD", "Target currency (default USD)")
	cmd.Flags().Float64Var(&amount, "amount", 1, "Amount to convert (default 1)")
	return cmd
}
