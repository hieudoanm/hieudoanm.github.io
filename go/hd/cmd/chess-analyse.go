// Package cmd ...
package cmd

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/briandowns/spinner"
	constants "github.com/hieudoanm/fx/constants"
	libs "github.com/hieudoanm/fx/libs"
	"github.com/spf13/cobra"
)

// analyseCmd represents the analyse command
var analyseCmd = &cobra.Command{
	Use:   "analyse",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		fen, _ := cmd.Flags().GetString("fen")
		GetTopMoves(fen)
	},
}

func init() {
	rootCmd.AddCommand(analyseCmd)
	analyseCmd.PersistentFlags().String("fen", "", "Forsyth-Edwards Notation")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// analyseCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// analyseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

// TopMove ...
type TopMove struct {
	Moves     string `json:"moves"`
	Centipawn int64  `json:"centipawn"`
}

// AnalyseResponse ...
type AnalyseResponse struct {
	Fen       string    `json:"fen"`
	Centipawn int64     `json:"centipawn"`
	TopMoves  []TopMove `json:"topMoves"`
}

// GetTopMoves ...
func GetTopMoves(fen string) {
	s := spinner.New(spinner.CharSets[9], 100*time.Millisecond)
	s.Suffix = " : Analysing"
	s.Start()
	var analyseResponse AnalyseResponse = AnalyseForsythEdwardsNotation(fen)
	s.Stop()
	fmt.Printf("Current Position   : %s\n", analyseResponse.Fen)
	fmt.Printf("Current Evaluation : %d\n", analyseResponse.Centipawn)
	for index, topMove := range analyseResponse.TopMoves {
		fmt.Printf("Next move #%d (%s) : %s\n", index+1, libs.AddZero(topMove.Centipawn), topMove.Moves)
	}
}

// AnalyseForsythEdwardsNotation ...
func AnalyseForsythEdwardsNotation(fen string) AnalyseResponse {
	var url string = fmt.Sprintf("%s/analyse/fen", constants.ChessAPI)
	requestBody := []byte(fmt.Sprintf(`{"fen": "%s"}`, fen))
	var requestBodyBytes *bytes.Buffer = bytes.NewBuffer(requestBody)
	var responseBytes []byte = libs.PostRequest(url, requestBodyBytes)
	analyseResponse := AnalyseResponse{}
	if unmarshalError := json.Unmarshal(responseBytes, &analyseResponse); unmarshalError != nil {
		log.Printf("AnalyseForsythEdwardsNotation url=%s", url)
		log.Fatalf("AnalyseForsythEdwardsNotation unmarshalError=%v", unmarshalError)
	}
	return analyseResponse
}
