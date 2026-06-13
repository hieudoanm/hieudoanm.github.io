package gh

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/AlecAivazis/survey/v2"
	requests "github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/spf13/cobra"
)

type license struct {
	Key    string `json:"key"`
	Name   string `json:"name"`
	SpdxID string `json:"spdx_id"`
	URL    string `json:"url"`
	Body   string `json:"body"`
}

func newLicenseCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "license",
		Short: "Fetch a license template from GitHub",
		Long: `Fetch and save a license template from the GitHub licenses API.

Fetches the list of available licenses, prompts the user to select
one (or uses --spdx-id), then writes the license body to a file.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			spdxID, _ := cmd.Flags().GetString("spdx-id")
			output, _ := cmd.Flags().GetString("output")

			body, err := requests.Get("https://api.github.com/licenses", requests.Options{
				Header: http.Header{
					"Accept":     {"application/json"},
					"User-Agent": {"hieudoanm-cli"},
				},
			})
			if err != nil {
				return fmt.Errorf("error fetching licenses: %w", err)
			}

			var licenses []license
			if err := json.Unmarshal(body, &licenses); err != nil {
				return fmt.Errorf("error parsing response: %w", err)
			}

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
					return fmt.Errorf("selection cancelled: %w", err)
				}
			}

			url := fmt.Sprintf("https://api.github.com/licenses/%s", selectedSpdxID)
			detailBody, err := requests.Get(url, requests.Options{
				Header: http.Header{
					"Accept":     {"application/json"},
					"User-Agent": {"hieudoanm-cli"},
				},
			})
			if err != nil {
				return fmt.Errorf("error fetching license: %w", err)
			}

			var lic license
			if err := json.Unmarshal(detailBody, &lic); err != nil {
				return fmt.Errorf("error parsing response: %w", err)
			}

			file, err := os.Create(output)
			if err != nil {
				return fmt.Errorf("error creating file: %w", err)
			}
			defer file.Close()

			if _, err := file.WriteString(lic.Body); err != nil {
				return fmt.Errorf("error writing file: %w", err)
			}

			fmt.Printf("Written %s (%s) to %s\n", lic.Name, lic.SpdxID, output)
			return nil
		},
	}

	cmd.Flags().String("spdx-id", "", "SPDX license identifier (skip prompt)")
	cmd.Flags().StringP("output", "o", "LICENSE", "Output file path")
	return cmd
}
