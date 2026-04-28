/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"log"

	"github.com/AlecAivazis/survey/v2"
	"github.com/hieudoanm/hieudoanm/src/configs"
	"github.com/hieudoanm/hieudoanm/src/services/status"
	"github.com/spf13/cobra"
)

// statusCmd represents the "one" status command
var statusCmd = &cobra.Command{
	Use:   "status",
	Short: "Run the one operation for the status app",
	Long: `The one command is a specific utility to execute operations related to one within the status application.

As a component of the devtools tools, this command empowers you to interact directly with status's one features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		/* ---------------- Service reference ---------------- */

		type serviceRef struct {
			Name string
			URL  string
		}

		/* ---------------- Build options ---------------- */

		serviceMap := make(map[string]serviceRef)
		options := []string{}

		for group, services := range configs.Services {
			for name, url := range services {

				// Display label with group prefix
				label := fmt.Sprintf("%s / %s", group, name)

				options = append(options, label)

				serviceMap[label] = serviceRef{
					Name: name,
					URL:  url,
				}
			}
		}

		/* ---------------- Prompt ---------------- */

		var choice string

		servicePrompt := &survey.Select{
			Message:  "Choose a service:",
			Options:  options,
			PageSize: 10,
		}

		if err := survey.AskOne(servicePrompt, &choice); err != nil {
			log.Fatalf("Failed to choose service: %v", err)
		}

		/* ---------------- Resolve selection ---------------- */

		ref, ok := serviceMap[choice]
		if !ok {
			log.Fatalf("Service not found: %s", choice)
		}

		/* ---------------- Safety guard ---------------- */

		if ref.URL == "" {
			log.Fatalf("Service URL is empty for %s", ref.Name)
		}

		/* ---------------- Print status ---------------- */

		// Updated call: pass URL explicitly
		status.PrintDescriptiveStatus(ref.Name, ref.URL, debug)
	},
}

func init() {
	rootCmd.AddCommand(statusCmd)

	// Local debug flag
	statusCmd.Flags().BoolVarP(
		&debug,
		"debug",
		"d",
		false,
		"Enable debug logging for HTTP requests",
	)
}
