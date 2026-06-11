package doi

import (
	"encoding/json"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/spf13/cobra"
)

func newCiteCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "cite [doi]",
		Short: "Generate an APA citation from a DOI",
		Long:  `Fetches metadata for a given DOI from Crossref and generates an APA-formatted citation.`,
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := resolveDOI(args)
			if err != nil {
				return err
			}
			data, err := fetchCrossref(id)
			if err != nil {
				return err
			}
			PrintCitation(data)
			return nil
		},
	}
}

func newRefCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "ref [doi]",
		Short: "Generate a formatted reference from a DOI",
		Long:  `Fetches metadata for a given DOI from Crossref and generates a formatted reference entry.`,
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := resolveDOI(args)
			if err != nil {
				return err
			}
			data, err := fetchCrossref(id)
			if err != nil {
				return err
			}
			PrintReference(data)
			return nil
		},
	}
}

func newFetchCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "fetch [doi]",
		Short: "Fetch raw metadata for a DOI",
		Long:  `Fetches metadata for a given DOI from Crossref and displays the raw JSON response.`,
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := resolveDOI(args)
			if err != nil {
				return err
			}
			data, err := fetchCrossref(id)
			if err != nil {
				return err
			}
			b, _ := json.MarshalIndent(data, "", "  ")
			fmt.Println(string(b))
			return nil
		},
	}
}

func resolveDOI(args []string) (string, error) {
	if len(args) > 0 {
		return args[0], nil
	}
	var id string
	prompt := &survey.Input{Message: "DOI ID:"}
	if err := survey.AskOne(prompt, &id); err != nil {
		return "", err
	}
	return id, nil
}

func fetchCrossref(id string) (CrossRefData, error) {
	url := fmt.Sprintf("https://api.crossref.org/works/%s", id)
	response, err := requests.Get(url, requests.Options{})
	if err != nil {
		return CrossRefData{}, fmt.Errorf("fetch error: %w", err)
	}
	var data CrossRefData
	if err := json.Unmarshal(response, &data); err != nil {
		return CrossRefData{}, fmt.Errorf("parse error: %w", err)
	}
	return data, nil
}
