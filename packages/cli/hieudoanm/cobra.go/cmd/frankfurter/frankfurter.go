package frankfurter

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/spf13/cobra"
)

type FrankfurterResponse struct {
	Amount float64            `json:"amount"`
	Base   string             `json:"base"`
	Date   string             `json:"date"`
	Rates  map[string]float64 `json:"rates"`
}

func NewCommand() *cobra.Command {
	var from, to string
	var amount float64
	var debug bool

	cmd := &cobra.Command{
		Use:   "cc",
		Short: "Convert between currencies using Frankfurter API",
		Long:  `Convert amounts between world currencies using the European Central Bank's Frankfurter exchange rate API.`,
		Run: func(cmd *cobra.Command, args []string) {
			url := fmt.Sprintf("https://api.frankfurter.app/latest?base=%s&symbols=%s", from, to)
			responseByte, err := requests.Get(url, requests.Options{Debug: debug})
			if err != nil {
				fmt.Println("Error: ", err)
				return
			}

			var response FrankfurterResponse
			if err := json.Unmarshal(responseByte, &response); err != nil {
				fmt.Println("Error: ", err)
				return
			}

			rate, ok := response.Rates[to]
			if !ok {
				fmt.Printf("Error: no rate found for %s\n", to)
				return
			}

			converted := amount * rate
			fmt.Printf("%.2f %s = %.2f %s\n", amount, from, converted, to)
		},
	}

	cmd.Flags().StringVar(&from, "from", "EUR", "Source currency (default EUR)")
	cmd.Flags().StringVar(&to, "to", "USD", "Target currency (default USD)")
	cmd.Flags().Float64Var(&amount, "amount", 1, "Amount to convert (default 1)")
	cmd.Flags().BoolVar(&debug, "debug", false, "Print response status and body")
	return cmd
}
