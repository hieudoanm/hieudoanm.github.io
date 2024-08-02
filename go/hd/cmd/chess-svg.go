// Package cmd ...
package cmd

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/briandowns/spinner"
	constants "github.com/hieudoanm/fx/constants"
	libs "github.com/hieudoanm/fx/libs"
	"github.com/spf13/cobra"
)

// svgCmd represents the svg command
var svgCmd = &cobra.Command{
	Use:   "svg",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		fen, _ := cmd.Flags().GetString("fen")
		filename, _ := cmd.Flags().GetString("filename")
		GenerateFile(fen, filename)
	},
}

func init() {
	rootCmd.AddCommand(svgCmd)
	svgCmd.PersistentFlags().String("fen", "", "Forsyth-Edwards Notation")
	svgCmd.PersistentFlags().String("filename", "", "Filename")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// svgCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// svgCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

// GenerateFile ...
func GenerateFile(fen string, filename string) {
	s := spinner.New(spinner.CharSets[9], 100*time.Millisecond)
	s.Suffix = " : Generating"
	s.Start()
	var svg = GenerateSVG(fen)
	s.Stop()
	svgBytes := []byte(svg)
	if filename == "" {
		filename = "chess.svg"
	}
	err := os.WriteFile(filename, svgBytes, 0644)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("SVG is created successfully")
}

// GenerateSVG ...
func GenerateSVG(fen string) string {
	var url string = fmt.Sprintf("%s/svg", constants.ChessAPI)
	requestBody := []byte(fmt.Sprintf(`{"fen": "%s"}`, fen))
	var requestBodyBytes *bytes.Buffer = bytes.NewBuffer(requestBody)
	var responseBytes []byte = libs.PostRequest(url, requestBodyBytes)
	svg := string(responseBytes[:])
	return svg
}
