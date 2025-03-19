// Package cmd ...
package cmd

import (
	"encoding/json"
	"fmt"
	"hieu-cli/utils"

	"github.com/spf13/cobra"
)

// SupabaseStatus ...
type SupabaseStatus struct {
	Indicator string `json:"indicator"`
}

// SupabaseResponse ...
type SupabaseResponse struct {
	Status SupabaseStatus `json:"status"`
}

// statusSupabaseCmd represents the statusSupabase command
var statusSupabaseCmd = &cobra.Command{
	Use:   "supabase",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		utils.LogProgramName()
		// Check Status
		var url string = "https://status.supabase.com/api/v2/status.json"
		fmt.Println(url)
		query := map[string]string{}
		responseByte, getError := utils.Get(url, query)
		if getError != nil {
			fmt.Println("Error: ", getError)
			return
		}
		// Parse response
		var response SupabaseResponse
		jsonError := json.Unmarshal(responseByte, &response)
		if jsonError != nil {
			fmt.Println("Error: ", jsonError)
			return
		}
		fmt.Println("Success")
	},
}

func init() {
	statusCmd.AddCommand(statusSupabaseCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// statusSupabaseCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// statusSupabaseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
