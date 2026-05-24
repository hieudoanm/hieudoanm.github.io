// Package doi ...
package doi

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/libs/requests"
	"github.com/hieudoanm/hieudoanm/src/services/apa"

	"github.com/spf13/cobra"
)

// doiCiteCmd represents the cite command
var doiCiteCmd = &cobra.Command{
	Use:   "cite",
	Short: "Run the cite operation for the doi app",
	Long: `The cite command is a specific utility to execute operations related to cite within the doi application.

As a component of the productivity tools, this command empowers you to interact directly with doi's cite features via the CLI.`,
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
		apa.PrintCitation(data)
	},
}
