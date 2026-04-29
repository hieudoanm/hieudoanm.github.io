/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/libs/requests"
	"github.com/hieudoanm/hieudoanm/src/services/apa"

	"github.com/spf13/cobra"
)

// refCmd represents the ref command
var refCmd = &cobra.Command{
	Use:   "ref",
	Short: "Run the ref operation for the doi app",
	Long: `The ref command is a specific utility to execute operations related to ref within the doi application.

As a component of the productivity tools, this command empowers you to interact directly with doi's ref features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Get Id
		fmt.Print("ID: ")
		var id string
		fmt.Scanln(&id)
		var url string = fmt.Sprintf("https://api.crossref.org/works/%s", id)
		response, err := requests.Get(url, requests.Options{})
		if err != nil {
			fmt.Println("Error Response:", err)
			return
		}
		data := apa.CrossRefData{}
		err = json.Unmarshal(response, &data)
		if err != nil {
			fmt.Println("Error Unmarshal:", err)
			return
		}
		apa.PrintReference(data)
	},
}

func init() {
	doiCmd.AddCommand(refCmd)
}
