// Package cmd ...
package cmd

import (
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"time"

	"golang.org/x/text/language"
	"golang.org/x/text/message"

	"github.com/briandowns/spinner"
	constants "github.com/hieudoanm/fx/constants"
	fetch "github.com/hieudoanm/fx/libs"
	"github.com/spf13/cobra"
)

// financeFiatCmd represents the currencies command
var financeFiatCmd = &cobra.Command{
	Use:   "forex",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		amount, _ := cmd.Flags().GetString("amount")
		from, _ := cmd.Flags().GetString("from")
		to, _ := cmd.Flags().GetString("to")
		ConvertRate(amount, from, to)
	},
}

func init() {
	rootCmd.AddCommand(financeFiatCmd)
	financeFiatCmd.PersistentFlags().String("amount", "1", "Amount")
	financeFiatCmd.PersistentFlags().String("from", "EUR", "From Code")
	financeFiatCmd.PersistentFlags().String("to", "USD", "To Code")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// financeFiatCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// financeFiatCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

// Rate ...
type Rate struct {
	Code string  `json:"code"`
	Rate float64 `json:"rate"`
}

// ConvertRate ...
func ConvertRate(amount string, from string, to string) {
	if len(from) != 3 || len(to) != 3 {
		log.Fatalf("Invalid Code")
	}

	s := spinner.New(spinner.CharSets[9], 100*time.Millisecond)
	s.Suffix = " : Converting"
	s.Start()
	var rates = GetRates()
	s.Stop()

	fromAmount, err := strconv.ParseFloat(amount, 32)
	if err != nil {
		log.Fatalf("Invalid Amount")
	}
	var fromCurrency Rate
	var toCurrency Rate
	for _, rate := range rates {
		if rate.Code == from {
			fromCurrency = rate
		} else if rate.Code == to {
			toCurrency = rate
		}
	}
	var fromRate float64 = fromCurrency.Rate
	var toRate float64 = toCurrency.Rate
	var toAmount float64 = fromAmount * toRate / fromRate
	logger := message.NewPrinter(language.English)
	logger.Printf("From Code:  %s\n", string(fromCurrency.Code))
	logger.Printf("From Rate:  %s\n", amount)
	logger.Printf("To Code:    %s\n", string(toCurrency.Code))
	logger.Printf("To Rate:    %f\n", toAmount)
}

// GetRates ...
func GetRates() []Rate {
	var url string = fmt.Sprintf("%s/currencies/rates", constants.FiatAPI)
	bytes := fetch.GetRequest(url)
	rates := []Rate{}
	if unmarshalError := json.Unmarshal(bytes, &rates); unmarshalError != nil {
		log.Printf("GetRates url=%s", url)
		log.Fatalf("GetRates unmarshalError=%v", unmarshalError)
	}
	return rates
}
