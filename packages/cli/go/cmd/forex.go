// Package cmd ...
package cmd

import (
	"encoding/json"
	"fmt"
	"nothing-cli/utils"

	"github.com/spf13/cobra"
)

// FrankfurterResponse ...
type FrankfurterResponse struct {
	Amount float64            `json:"amount"`
	Base   string             `json:"base"`
	Date   string             `json:"date"`
	Rates  map[string]float64 `json:"rates"`
}

// forexCmd represents the forex command
var forexCmd = &cobra.Command{
	Use:   "forex",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		var url string = "https://api.frankfurter.app/latest"
		fmt.Println(url)
		query := map[string]string{}
		responseByte, getError := utils.Get(url, query)
		if getError != nil {
			fmt.Println("Error: ", getError)
			return
		}
		// Parse response
		var response FrankfurterResponse
		jsonError := json.Unmarshal(responseByte, &response)
		if jsonError != nil {
			fmt.Println("Error: ", jsonError)
			return
		}
		var amount float64 = response.Amount
		var base string = response.Base
		var rates map[string]float64 = response.Rates
		fmt.Printf("%s: %f\n", base, amount)
		for currency, amount := range rates {
			fmt.Printf("%s: %f\n", currency, amount)
		}
	},
}

func init() {
	rootCmd.AddCommand(forexCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// forexCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// forexCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
