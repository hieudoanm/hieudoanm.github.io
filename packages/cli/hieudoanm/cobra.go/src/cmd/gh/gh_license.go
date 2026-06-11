package gh

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/AlecAivazis/survey/v2"
	requests "github.com/hieudoanm/hieudoanm/src/libs/requests"
	"github.com/spf13/cobra"
)

type license struct {
	Key    string `json:"key"`
	Name   string `json:"name"`
	SpdxID string `json:"spdx_id"`
	URL    string `json:"url"`
	Body   string `json:"body"`
}

var ghLicenseCmd = &cobra.Command{
	Use:   "license",
	Short: "Fetch a license template from GitHub",
	Long: `Fetch and save a license template from the GitHub licenses API.

Fetches the list of available licenses, prompts the user to select
one (or uses --spdx-id), then writes the license body to a file.`,
	Run: func(cmd *cobra.Command, args []string) {
		spdxID, _ := cmd.Flags().GetString("spdx-id")
		output, _ := cmd.Flags().GetString("output")

		// Fetch all licenses
		body, err := requests.Get("https://api.github.com/licenses", requests.Options{
			Header: http.Header{
				"Accept":     {"application/json"},
				"User-Agent": {"hieudoanm-cli"},
			},
		})
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error fetching licenses: %v\n", err)
			return
		}

		var licenses []license
		if err := json.Unmarshal(body, &licenses); err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing response: %v\n", err)
			return
		}

		// Resolve SPDX ID (prompt if not provided)
		selectedSpdxID := spdxID
		if selectedSpdxID == "" {
			var spdxIds []string
			for _, l := range licenses {
				spdxIds = append(spdxIds, l.SpdxID)
			}

			prompt := &survey.Select{
				Message: "Select a license:",
				Options: spdxIds,
			}
			if err := survey.AskOne(prompt, &selectedSpdxID); err != nil {
				fmt.Fprintf(os.Stderr, "Selection cancelled: %v\n", err)
				return
			}
		}

		// Fetch the selected license
		url := fmt.Sprintf("https://api.github.com/licenses/%s", selectedSpdxID)
		detailBody, err := requests.Get(url, requests.Options{
			Header: http.Header{
				"Accept":     {"application/json"},
				"User-Agent": {"hieudoanm-cli"},
			},
		})
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error fetching license: %v\n", err)
			return
		}

		var lic license
		if err := json.Unmarshal(detailBody, &lic); err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing response: %v\n", err)
			return
		}

		// Write to file
		file, err := os.Create(output)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error creating file: %v\n", err)
			return
		}
		defer file.Close()

		if _, err := file.WriteString(lic.Body); err != nil {
			fmt.Fprintf(os.Stderr, "Error writing file: %v\n", err)
			return
		}

		fmt.Printf("Written %s (%s) to %s\n", lic.Name, lic.SpdxID, output)
	},
}

func init() {
	ghLicenseCmd.Flags().String("spdx-id", "", "SPDX license identifier (skip prompt)")
	ghLicenseCmd.Flags().StringP("output", "o", "LICENSE", "Output file path")
}
