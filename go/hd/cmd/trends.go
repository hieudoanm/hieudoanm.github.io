// Package cmd ...
package cmd

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/briandowns/spinner"
	constants "github.com/hieudoanm/fx/constants"
	libs "github.com/hieudoanm/fx/libs"
	"github.com/spf13/cobra"
)

// googleTrendsCmd represents the google command
var googleTrendsCmd = &cobra.Command{
	Use:   "trends",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		offset, _ := cmd.Flags().GetString("offset")
		limit, _ := cmd.Flags().GetString("limit")
		GetTopRanks(offset, limit)
	},
}

func init() {
	rootCmd.AddCommand(googleTrendsCmd)
	googleTrendsCmd.PersistentFlags().String("offset", "0", "Offset")
	googleTrendsCmd.PersistentFlags().String("limit", "10", "Limit")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// googleTrendsCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// googleTrendsCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

// Rank ...
type Rank struct {
	Rank  int64  `json:"rank"`
	Query string `json:"query"`
	Count int64  `json:"count"`
}

// GetTopRanks ...
func GetTopRanks(offset string, limit string) {
	s := spinner.New(spinner.CharSets[9], 100*time.Millisecond)
	s.Suffix = " : Fetching"
	s.Start()
	var ranks []Rank = GetGoogleRanks(offset, limit)
	s.Stop()

	for _, rank := range ranks {
		fmt.Printf("%s. (%s) %s\n", libs.AddZero(rank.Rank), libs.AddZero(rank.Count), rank.Query)
	}
}

// GetGoogleRanks ...
func GetGoogleRanks(offset string, limit string) []Rank {
	var url string = fmt.Sprintf("%s/google/ranks?offset=%s&limit=%s", constants.GoogleAPI, offset, limit)
	bytes := libs.GetRequest(url)
	ranks := []Rank{}
	if unmarshalError := json.Unmarshal(bytes, &ranks); unmarshalError != nil {
		log.Printf("GetGoogleRanks url=%s", url)
		log.Fatalf("GetGoogleRanks unmarshalError=%v", unmarshalError)
	}
	return ranks
}
