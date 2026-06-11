// Package doi ...
package doi

import (
	"encoding/json"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/hieudoanm/hieudoanm/libs/requests"

	"github.com/spf13/cobra"
)

var doiCiteCmd = &cobra.Command{
	Use:   "cite",
	Short: "Generate an APA citation from a DOI",
	Long:  `Fetches metadata for a given DOI from Crossref and generates an APA-formatted citation.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		var id string
		prompt := &survey.Input{Message: "DOI ID:"}
		if err := survey.AskOne(prompt, &id); err != nil {
			return err
		}
		url := fmt.Sprintf("https://api.crossref.org/works/%s", id)
		response, err := requests.Get(url, requests.Options{})
		if err != nil {
			return fmt.Errorf("fetch error: %w", err)
		}
		data := CrossRefData{}
		if err := json.Unmarshal(response, &data); err != nil {
			return fmt.Errorf("parse error: %w", err)
		}
		PrintCitation(data)
		return nil
	},
}
